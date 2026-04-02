'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Heart, Users, HelpCircle, DollarSign, BookOpen } from 'lucide-react';

export default function CommunityPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What is the best age for cleft lip surgery?',
      answer:
        'Cleft lip surgery is typically performed between 3-6 months of age, often referred to as the "rule of tens": 10 weeks old, weighs 10 pounds, and has a hemoglobin of 10 grams. This timing allows for good healing and proper facial growth.',
    },
    {
      question: 'How long does cleft palate surgery take?',
      answer:
        'Primary palate repair usually takes 2-3 hours under general anesthesia. The exact duration depends on the complexity of the cleft and the surgeon\'s approach. Recovery typically takes 2-3 weeks.',
    },
    {
      question: 'Will my child need multiple surgeries?',
      answer:
        'Yes, most children with cleft lip and palate require multiple surgeries spanning 15-20 years, including lip repair, palate repair, alveolar bone graft, and possible orthognathic surgery. Regular follow-ups with a multidisciplinary cleft team are essential.',
    },
    {
      question: 'Can my baby be breastfed with cleft palate?',
      answer:
        'While direct breastfeeding may be challenging due to the inability to create proper suction, many babies can still receive breast milk through special feeding devices or bottles designed for cleft-affected infants. A lactation consultant can provide guidance.',
    },
    {
      question: 'What is the long-term outlook for children with cleft?',
      answer:
        'With proper multidisciplinary care including surgery, speech therapy, and orthodontics, most children with cleft achieve excellent functional and aesthetic outcomes. Many go on to lead normal, healthy lives with minimal visible differences.',
    },
  ];

  const resources = [
    {
      category: 'Financial Assistance',
      items: [
        {
          name: 'Smile Train - Free Surgical Care',
          description: 'International NGO providing free cleft surgeries in low-income countries',
          link: '#',
        },
        {
          name: 'Operation Smile - Global Care',
          description: 'International medical charitable organization offering free cleft care',
          link: '#',
        },
        {
          name: 'Government Schemes - India',
          description: 'PMJAY and other health schemes covering cleft treatment costs',
          link: '#',
        },
        {
          name: 'CSR Sponsorship Programs',
          description: 'Corporate Social Responsibility programs supporting cleft care',
          link: '#',
        },
      ],
    },
    {
      category: 'Educational Resources',
      items: [
        {
          name: 'Understanding Cleft Lip & Palate',
          description: 'Comprehensive guide for parents on cleft conditions',
          link: '#',
        },
        {
          name: 'Speech Development Guide',
          description: 'Resources for supporting speech development in cleft children',
          link: '#',
        },
        {
          name: 'Feeding Your Child',
          description: 'Safe feeding techniques and nutritional guidelines',
          link: '#',
        },
        {
          name: 'Post-Surgery Care Manual',
          description: 'Step-by-step guide for post-operative care and recovery',
          link: '#',
        },
      ],
    },
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      child: 'Aditya (4 years)',
      text: 'CleftConnect has been a lifesaver. From surgery scheduling to speech therapy tracking, everything is organized in one place. My child is now speaking clearly and smiling confidently!',
      avatar: '👩',
    },
    {
      name: 'Rajesh Kumar',
      child: 'Diya (2 years)',
      text: 'The Speak & Shine game made speech therapy fun for our daughter. She looks forward to playing every day. The AI feedback is incredibly helpful.',
      avatar: '👨',
    },
    {
      name: 'Meera Patel',
      child: 'Rohan (6 years)',
      text: 'Finding nearby specialists through CleftConnect was so easy. The registry of doctors, NGOs, and therapists saved us weeks of research.',
      avatar: '👩',
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-foreground/70 hover:text-foreground transition mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Home</span>
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Community & Support</h1>
          <p className="text-foreground/60 mt-2">
            Resources, FAQs, and family support for your cleft care journey
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12"
        >
          {[
            { icon: Users, label: 'Join Community', color: 'from-pink-50 to-rose-50' },
            { icon: Heart, label: 'Emotional Support', color: 'from-red-50 to-pink-50' },
            { icon: DollarSign, label: 'Financial Aid', color: 'from-green-50 to-emerald-50' },
            { icon: BookOpen, label: 'Resources', color: 'from-blue-50 to-cyan-50' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className={`p-6 cursor-pointer hover:shadow-lg transition bg-gradient-to-br ${item.color}`}>
                <item.icon className="w-8 h-8 text-primary mb-3" />
                <p className="font-semibold text-foreground">{item.label}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Parent Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-foreground mb-8">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 bg-white hover:shadow-lg transition">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-3xl">{testimonial.avatar}</div>
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-xs text-foreground/60">{testimonial.child}</p>
                    </div>
                  </div>
                  <p className="text-foreground/70 italic">"{testimonial.text}"</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-foreground mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div key={idx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.05 }}>
                <Card
                  className="cursor-pointer transition hover:border-primary"
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-semibold text-foreground text-lg">
                        {faq.question}
                      </h3>
                      <motion.div
                        animate={{ rotate: expandedFaq === idx ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <HelpCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      </motion.div>
                    </div>

                    {expandedFaq === idx && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                        className="mt-6 pt-6 border-t border-border"
                      >
                        <p className="text-foreground/70 leading-relaxed">{faq.answer}</p>
                      </motion.div>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-foreground mb-8">Resources & Assistance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {resources.map((section, sIdx) => (
              <div key={sIdx} className="space-y-4">
                <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  {sIdx === 0 ? <DollarSign className="w-5 h-5 text-green-600" /> : <BookOpen className="w-5 h-5 text-blue-600" />}
                  {section.category}
                </h3>
                <div className="space-y-3">
                  {section.items.map((item, iIdx) => (
                    <motion.div
                      key={iIdx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: iIdx * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Card className="p-4 hover:border-primary transition cursor-pointer">
                        <p className="font-semibold text-foreground text-sm mb-1">
                          {item.name}
                        </p>
                        <p className="text-xs text-foreground/60 mb-3">
                          {item.description}
                        </p>
                        <Button size="sm" variant="outline" className="text-xs rounded-lg">
                          Learn More
                        </Button>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center py-12 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl border border-primary/20"
        >
          <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Start?</h2>
          <p className="text-foreground/70 mb-8">
            Join thousands of families already using CleftConnect for comprehensive care management
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button className="bg-primary hover:bg-primary/90 text-white rounded-lg">
                Register Your Child
              </Button>
            </Link>
            <Button variant="outline" className="border-primary text-primary rounded-lg">
              Learn More
            </Button>
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 pt-16 border-t border-border text-center"
        >
          <h2 className="text-2xl font-bold text-foreground mb-4">Need Help?</h2>
          <p className="text-foreground/70 mb-8 max-w-2xl mx-auto">
            Our support team is here to help. Contact us via email, phone, or live chat for any questions or concerns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-lg">
              support@cleftconnect.com
            </Button>
            <Button variant="outline" className="border-primary text-primary rounded-lg">
              +91 9876543210
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Footer Message */}
      <div className="mt-20 py-8 text-center border-t border-border">
        <p className="text-foreground/60">
          Because every child deserves a confident smile.
        </p>
      </div>
    </main>
  );
}
