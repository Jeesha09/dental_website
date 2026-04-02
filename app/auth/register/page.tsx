'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Smile, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { createSupabaseClient } from '@/lib/supabase';

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const supabase = createSupabaseClient();

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            phone: formData.phone || null,
          },
        },
      });

      if (authError) {
        console.error('Auth error:', authError);
        throw new Error(authError.message);
      }

      if (!authData.user) {
        throw new Error('Failed to create user');
      }

      // Profile creation happens on first successful login to avoid RLS/session edge cases.
      if (!authData.session) {
        toast.success('Account created. Please verify your email, then sign in.');
        setTimeout(() => {
          router.push('/auth/login');
        }, 500);
        return;
      }

      toast.success('Account created successfully!');
      // Small delay to show the success message before redirecting
      setTimeout(() => {
        router.push('/auth/login');
      }, 500);
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex flex-col">
      {/* Header */}
      <div className="p-4 sm:p-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-foreground/70 hover:text-foreground transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to Home</span>
        </Link>
      </div>

      {/* Registration Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-10">
            {/* Logo */}
            <div className="flex items-center justify-center gap-2 mb-8">
              <Smile className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold text-foreground">CleftConnect</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-2">
              Create Your Account
            </h1>
            <p className="text-center text-foreground/60 mb-8">
              Join us in supporting your child's care journey
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    First Name
                  </label>
                  <Input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="rounded-lg"
                    placeholder="Your first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Last Name
                  </label>
                  <Input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="rounded-lg"
                    placeholder="Your last name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="rounded-lg"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Phone Number
                </label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="rounded-lg"
                  placeholder="+91 9876543210"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Password
                </label>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="rounded-lg"
                  placeholder="Create a strong password"
                />
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary hover:bg-primary/90 text-white rounded-lg font-medium"
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </div>
            </form>

            <div className="mt-6 pt-6 border-t border-border text-center">
              <p className="text-foreground/60 text-sm">
                Already have an account?{' '}
                <Link href="/auth/login" className="text-primary hover:underline font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-foreground/60">
            <p>
              By registering, you agree to our{' '}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>{' '}
              and{' '}
              <Link href="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
