'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createSupabaseClient } from '@/lib/supabase';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Check } from 'lucide-react';
import { toast } from 'sonner';

export default function RegisterChildPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    childName: '',
    dateOfBirth: '',
    gender: '',
    cleftType: '',
    cleftSide: '',
    location: '',
  });

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createSupabaseClient();
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error || !session) {
        toast.error('Please log in first');
        router.push('/auth/login');
        return;
      }
    };
    
    checkUser();
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step === 1) {
      if (!formData.childName || !formData.dateOfBirth) {
        toast.error('Please fill in all required fields');
        return;
      }
      setStep(2);
      return;
    }

    if (step === 2) {
      if (!formData.cleftType || !formData.cleftSide) {
        toast.error('Please select cleft type and side');
        return;
      }
      setStep(3);
      return;
    }

    if (step === 3) {
      setIsLoading(true);
      try {
        const supabase = createSupabaseClient();
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError || !session?.access_token) {
          throw new Error('Your login session expired. Please sign in again.');
        }

        const userId = session.user.id;

        const { data: child, error: childError } = await supabase
          .from('children')
          .insert({
            parent_id: userId,
            name: formData.childName,
            date_of_birth: formData.dateOfBirth,
            gender: formData.gender || null,
            cleft_type: formData.cleftType,
            cleft_side: formData.cleftSide,
            location: formData.location || null,
            status: 'active',
          })
          .select()
          .single();

        if (childError) {
          console.error('Child insert error:', childError);
          throw new Error(childError.message);
        }

        const { error: registryError } = await supabase
          .from('registry_entries')
          .insert({
            child_id: child.id,
            cleft_classification: formData.cleftType,
            incidence_region: formData.location || null,
          });

        if (registryError) {
          console.error('Registry creation error:', registryError);
        }

        const { error: gardenError } = await supabase
          .from('smile_garden')
          .insert({
            child_id: child.id,
          });

        if (gardenError) {
          console.error('Smile Garden creation error:', gardenError);
        }

        const birthDate = new Date(formData.dateOfBirth);
        const ageMonths = Math.floor(
          (new Date().getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 30)
        );

        const milestones = [
          {
            milestone_type: 'lip_repair',
            scheduled_age_months: 3,
            purpose: 'Primary lip repair surgery',
            expected_outcomes: 'Improved appearance and feeding',
            preparation_tips: 'Ensure proper nutrition and health before surgery',
          },
          {
            milestone_type: 'palate_repair',
            scheduled_age_months: 12,
            purpose: 'Primary palate repair surgery',
            expected_outcomes: 'Better speech and swallowing',
            preparation_tips: 'Speech therapy may begin after healing',
          },
          {
            milestone_type: 'speech_assessment',
            scheduled_age_months: 60,
            purpose: 'Comprehensive speech evaluation',
            expected_outcomes: 'Identify speech therapy needs',
            preparation_tips: 'Speech therapy may continue for years',
          },
          {
            milestone_type: 'alveolar_bone_graft',
            scheduled_age_months: 96,
            purpose: 'Bone grafting for alveolar ridge',
            expected_outcomes: 'Better dental development',
            preparation_tips: 'Orthodontics may follow',
          },
          {
            milestone_type: 'orthodontics',
            scheduled_age_months: 120,
            purpose: 'Orthodontic evaluation and treatment',
            expected_outcomes: 'Proper tooth alignment',
            preparation_tips: 'Long-term commitment to treatment',
          },
        ];

        for (const milestone of milestones) {
          const scheduledDate = new Date(birthDate);
          scheduledDate.setMonth(scheduledDate.getMonth() + milestone.scheduled_age_months);

          const { error: milestoneError } = await supabase
            .from('milestones')
            .insert({
              child_id: child.id,
              milestone_type: milestone.milestone_type,
              scheduled_age_months: milestone.scheduled_age_months,
              scheduled_date: scheduledDate.toISOString().split('T')[0],
              purpose: milestone.purpose,
              expected_outcomes: milestone.expected_outcomes,
              preparation_tips: milestone.preparation_tips,
              status: ageMonths >= milestone.scheduled_age_months ? 'due' : 'scheduled',
            });

          if (milestoneError) {
            console.error('Milestone creation error:', milestoneError);
          }
        }

        toast.success('Child registered successfully!');
        setTimeout(() => {
          router.push('/dashboard');
        }, 500);
      } catch (error) {
        console.error('Child registration error:', error);
        toast.error(error instanceof Error ? error.message : 'Something went wrong');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const steps = [
    { number: 1, title: 'Basic Information', icon: '👶' },
    { number: 2, title: 'Cleft Details', icon: '🏥' },
    { number: 3, title: 'Review & Consent', icon: '✓' },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-foreground/70 hover:text-foreground transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-8">
            {steps.map((s, idx) => (
              <div key={s.number} className="flex items-center flex-1">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition ${
                    step >= s.number
                      ? 'bg-primary text-white'
                      : 'bg-muted text-foreground/40'
                  }`}
                >
                  {step > s.number ? <Check className="w-6 h-6" /> : s.number}
                </motion.div>
                {idx < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 rounded transition ${
                      step > s.number ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <h2 className="text-2xl font-bold text-foreground">
            {steps[step - 1].title}
          </h2>
        </div>

        <motion.form
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          onSubmit={handleSubmit}
        >
          {/* Step 1: Basic Information */}
          {step === 1 && (
            <Card className="p-8 mb-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Child's Name *
                  </label>
                  <Input
                    type="text"
                    name="childName"
                    value={formData.childName}
                    onChange={handleChange}
                    placeholder="Enter child's full name"
                    className="rounded-lg"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Date of Birth *
                    </label>
                    <Input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      className="rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Gender
                    </label>
                    <Select value={formData.gender} onValueChange={(val) => handleSelectChange('gender', val)}>
                      <SelectTrigger className="rounded-lg">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Step 2: Cleft Details */}
          {step === 2 && (
            <Card className="p-8 mb-8 space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-4">
                  Type of Cleft *
                </label>
                <Select
                  value={formData.cleftType}
                  onValueChange={(val) => handleSelectChange('cleftType', val)}
                >
                  <SelectTrigger className="rounded-lg">
                    <SelectValue placeholder="Select cleft type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cleft-lip-only">Cleft Lip Only</SelectItem>
                    <SelectItem value="cleft-palate-only">Cleft Palate Only</SelectItem>
                    <SelectItem value="cleft-lip-palate">Cleft Lip and Palate</SelectItem>
                    <SelectItem value="submucous-cleft">Submucous Cleft</SelectItem>
                    <SelectItem value="uncertain">Uncertain</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-4">
                  Which side? *
                </label>
                <Select
                  value={formData.cleftSide}
                  onValueChange={(val) => handleSelectChange('cleftSide', val)}
                >
                  <SelectTrigger className="rounded-lg">
                    <SelectValue placeholder="Select side" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="left">Left Side</SelectItem>
                    <SelectItem value="right">Right Side</SelectItem>
                    <SelectItem value="bilateral">Both Sides (Bilateral)</SelectItem>
                    <SelectItem value="median">Median</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Location / Region
                </label>
                <Input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="City or region"
                  className="rounded-lg"
                />
              </div>
            </Card>
          )}

          {/* Step 3: Review & Consent */}
          {step === 3 && (
            <div className="space-y-6">
              <Card className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5">
                <h3 className="font-semibold text-foreground mb-4">Review Information</h3>
                <div className="space-y-3 text-sm">
                  <p>
                    <span className="text-foreground/60">Child's Name:</span>{' '}
                    <span className="font-medium text-foreground">{formData.childName}</span>
                  </p>
                  <p>
                    <span className="text-foreground/60">Date of Birth:</span>{' '}
                    <span className="font-medium text-foreground">{formData.dateOfBirth}</span>
                  </p>
                  <p>
                    <span className="text-foreground/60">Cleft Type:</span>{' '}
                    <span className="font-medium text-foreground">{formData.cleftType}</span>
                  </p>
                  <p>
                    <span className="text-foreground/60">Side:</span>{' '}
                    <span className="font-medium text-foreground">{formData.cleftSide}</span>
                  </p>
                </div>
              </Card>

              <Card className="p-8 border-2 border-primary/20 bg-primary/5">
                <h3 className="font-semibold text-foreground mb-4">Data Privacy & Consent</h3>
                <div className="space-y-3 text-sm text-foreground/70">
                  <p>
                    We're committed to protecting your child's privacy. Your data is encrypted and secured according to HIPAA-style standards.
                  </p>
                  <div className="flex items-start gap-3 pt-4">
                    <input
                      type="checkbox"
                      defaultChecked
                      disabled
                      className="mt-1"
                    />
                    <label className="text-foreground">
                      I understand my child's medical data will be securely stored and encrypted
                    </label>
                  </div>
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      defaultChecked
                      disabled
                      className="mt-1"
                    />
                    <label className="text-foreground">
                      I agree to the{' '}
                      <Link href="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>{' '}
                      and{' '}
                      <Link href="/terms" className="text-primary hover:underline">
                        Terms of Service
                      </Link>
                    </label>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-8">
            {step > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(step - 1)}
                className="rounded-lg"
              >
                Back
              </Button>
            )}
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium"
            >
              {step === 3
                ? isLoading
                  ? 'Registering...'
                  : 'Complete Registration'
                : 'Continue'}
            </Button>
          </div>
        </motion.form>
      </div>
    </main>
  );
}
