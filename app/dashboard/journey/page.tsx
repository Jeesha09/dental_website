'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronDown,
  ArrowLeft,
  Bell,
} from 'lucide-react';

export default function JourneyPage() {
  const [expandedMilestone, setExpandedMilestone] = useState<number | null>(0);

  // Mock data - in production, fetch from API
  const milestones = [
    {
      id: 1,
      title: 'Lip Repair',
      ageMonths: 3,
      date: 'March 2025',
      status: 'upcoming',
      purpose: 'Primary lip repair surgery to improve appearance and feeding ability',
      outcomes: [
        'Improved facial appearance',
        'Better feeding efficiency',
        'Foundation for future surgeries',
      ],
      preparation: [
        'Ensure proper nutrition before surgery',
        'Schedule pre-operative health check',
        'Arrange post-operative care support',
        'Discuss anesthesia safety with surgeon',
      ],
      icon: '💉',
    },
    {
      id: 2,
      title: 'Palate Repair',
      ageMonths: 9,
      date: 'September 2025',
      status: 'upcoming',
      purpose: 'Primary palate repair to improve speech and swallowing',
      outcomes: [
        'Better speech development',
        'Improved swallowing',
        'Reduced ear infections',
        'Normal eating function',
      ],
      preparation: [
        'Post-lip repair recovery complete',
        'Speech therapy may begin after healing',
        'Maintain good nutrition',
        'Regular follow-ups with surgeon',
      ],
      icon: '🗣️',
    },
    {
      id: 3,
      title: 'Speech Assessment',
      ageMonths: 60,
      date: 'March 2029',
      status: 'future',
      purpose: 'Comprehensive speech evaluation by speech-language pathologist',
      outcomes: [
        'Assessment of speech clarity',
        'Evaluation for hypernasality',
        'Personalized therapy plan',
        'Regular progress monitoring',
      ],
      preparation: [
        'Earlier palate repair healed',
        'Child can follow instructions',
        'Speech therapy if needed',
        'Documentation of speech development',
      ],
      icon: '📢',
    },
    {
      id: 4,
      title: 'Alveolar Bone Graft',
      ageMonths: 96,
      date: 'March 2033',
      status: 'future',
      purpose: 'Bone grafting to support dental development',
      outcomes: [
        'Better tooth root development',
        'Improved dental alignment',
        'Foundation for future orthodontics',
        'Long-term oral health',
      ],
      preparation: [
        'Assessment of dental development',
        'Orthodontist consultation',
        'Planning for future treatments',
        'Explanation to child about procedure',
      ],
      icon: '🦷',
    },
    {
      id: 5,
      title: 'Orthodontics & Final Evaluation',
      ageMonths: 120,
      date: 'March 2035',
      status: 'future',
      purpose: 'Orthodontic treatment and final facial evaluation',
      outcomes: [
        'Proper tooth alignment',
        'Improved bite function',
        'Aesthetic facial appearance',
        'Long-term oral health',
      ],
      preparation: [
        'Alveolar bone graft healed',
        'Tooth development monitoring',
        'Adolescent readiness for treatment',
        'Commitment to long-term care',
      ],
      icon: '✨',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 border-green-300 text-green-700';
      case 'upcoming':
        return 'bg-blue-100 border-blue-300 text-blue-700';
      case 'future':
        return 'bg-gray-100 border-gray-300 text-gray-700';
      default:
        return 'bg-yellow-100 border-yellow-300 text-yellow-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5" />;
      case 'upcoming':
        return <AlertCircle className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-foreground/70 hover:text-foreground transition mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Dashboard</span>
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Your Child's Care Timeline</h1>
          <p className="text-foreground/60 mt-2">
            Personalized milestones from birth to adulthood
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-foreground/60">Completed</p>
                <p className="text-2xl font-bold text-foreground">0</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-foreground/60">Upcoming</p>
                <p className="text-2xl font-bold text-foreground">1</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                <Clock className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-foreground/60">Future</p>
                <p className="text-2xl font-bold text-foreground">4</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-secondary to-accent hidden md:block" />

          {/* Milestones */}
          <div className="space-y-6">
            {milestones.map((milestone, idx) => (
              <motion.div
                key={milestone.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  className={`cursor-pointer transition hover:shadow-lg ${
                    expandedMilestone === idx ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() =>
                    setExpandedMilestone(expandedMilestone === idx ? null : idx)
                  }
                >
                  {/* Timeline dot and header */}
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      {/* Dot */}
                      <div className="hidden md:flex flex-col items-center">
                        <div className="w-4 h-4 rounded-full bg-white border-4 border-primary absolute left-2" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 md:ml-8">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-3xl">{milestone.icon}</span>
                              <div>
                                <h3 className="text-xl font-bold text-foreground">
                                  {milestone.title}
                                </h3>
                                <p className="text-sm text-foreground/60">
                                  {milestone.ageMonths} months • {milestone.date}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <div
                              className={`px-3 py-1 rounded-full border flex items-center gap-2 text-sm font-medium ${getStatusColor(
                                milestone.status
                              )}`}
                            >
                              {getStatusIcon(milestone.status)}
                              <span className="capitalize">{milestone.status}</span>
                            </div>
                            <ChevronDown
                              className={`w-5 h-5 text-foreground/40 transition ${
                                expandedMilestone === idx ? 'rotate-180' : ''
                              }`}
                            />
                          </div>
                        </div>

                        {/* Expanded Content */}
                        {expandedMilestone === idx && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            transition={{ duration: 0.3 }}
                            className="mt-6 pt-6 border-t border-border space-y-6"
                          >
                            {/* Purpose */}
                            <div>
                              <h4 className="font-semibold text-foreground mb-2">
                                Purpose
                              </h4>
                              <p className="text-foreground/70">{milestone.purpose}</p>
                            </div>

                            {/* Expected Outcomes */}
                            <div>
                              <h4 className="font-semibold text-foreground mb-2">
                                Expected Outcomes
                              </h4>
                              <ul className="space-y-2">
                                {milestone.outcomes.map((outcome, i) => (
                                  <li
                                    key={i}
                                    className="flex items-center gap-2 text-foreground/70"
                                  >
                                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                    {outcome}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Preparation Tips */}
                            <div>
                              <h4 className="font-semibold text-foreground mb-2">
                                Preparation Tips
                              </h4>
                              <ul className="space-y-2">
                                {milestone.preparation.map((tip, i) => (
                                  <li
                                    key={i}
                                    className="flex items-center gap-2 text-foreground/70"
                                  >
                                    <span className="w-2 h-2 rounded-full bg-secondary flex-shrink-0" />
                                    {tip}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Action Buttons */}
                            {milestone.status === 'upcoming' && (
                              <div className="flex gap-3 pt-4">
                                <Button className="flex-1 bg-primary hover:bg-primary/90 text-white rounded-lg">
                                  <Bell className="w-4 h-4 mr-2" />
                                  Set Reminder
                                </Button>
                                <Button
                                  variant="outline"
                                  className="flex-1 border-primary text-primary rounded-lg"
                                >
                                  Contact Doctor
                                </Button>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Support Section */}
        <Card className="mt-12 p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
          <h3 className="text-xl font-bold text-foreground mb-4">
            Questions About the Care Journey?
          </h3>
          <p className="text-foreground/60 mb-6">
            Our specialists are here to guide you through each step. Connect with healthcare
            professionals and other families for support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-lg">
              Talk to a Specialist
            </Button>
            <Button variant="outline" className="border-primary text-primary rounded-lg">
              Join Support Community
            </Button>
          </div>
        </Card>
      </div>
    </main>
  );
}
