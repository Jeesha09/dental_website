'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Heart, MapPin, Users, TrendingUp, Smile } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Smile className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold text-foreground">CleftConnect</span>
          </div>
          <div className="hidden md:flex gap-8">
            <Link href="#about" className="text-sm text-foreground/80 hover:text-primary transition">
              About
            </Link>
            <Link href="#features" className="text-sm text-foreground/80 hover:text-primary transition">
              Features
            </Link>
            <Link href="#contact" className="text-sm text-foreground/80 hover:text-primary transition">
              Contact
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
                Every Cleft Child,{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  Connected
                </span>
                . Every Smile,{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">
                  Tracked.
                </span>
              </h1>
              <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
                A digital care navigator guiding children with cleft lip and palate from birth to adulthood. Comprehensive, compassionate, connected.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link href="/auth/register">
                  <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white rounded-full">
                    Register a Child
                  </Button>
                </Link>
                <Link href="/journey">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-2 border-secondary text-secondary hover:bg-secondary/5 rounded-full"
                  >
                    Explore Care Journey
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-primary" />
                  <span className="text-sm text-foreground/60">Trusted by 10,000+ families</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-secondary" />
                  <span className="text-sm text-foreground/60">98% care adherence rate</span>
                </div>
              </div>
            </motion.div>

            {/* Hero Illustration */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-full h-96 sm:h-full">
                <Image
                  src="/hero-child-smile.jpg"
                  alt="Smiling child with warm glow"
                  fill
                  className="object-cover rounded-3xl shadow-2xl"
                  priority
                />
                <motion.div
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-3xl pointer-events-none"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Animated background elements */}
        <motion.div
          className="absolute top-20 right-10 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl"
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-64 h-64 bg-secondary/10 rounded-full filter blur-3xl"
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </section>

      {/* Key Features Overview */}
      <section id="features" className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Complete Care Ecosystem
            </h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Everything families and doctors need for lifetime cleft care management
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-gradient-to-br from-muted to-background border border-border hover:border-primary/50 transition"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-foreground/60 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Start Your Child's Care Journey Today
            </h2>
            <p className="text-lg text-foreground/60 mb-8">
              Join thousands of families already connected to expert care
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full">
                  Register Your Child
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-2 border-primary text-primary rounded-full">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Smile className="w-6 h-6" />
                <span className="font-bold">CleftConnect</span>
              </div>
              <p className="text-sm text-white/70">
                Lifelong care for children with cleft lip and palate
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Links</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>
                  <Link href="/" className="hover:text-white transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#about" className="hover:text-white transition">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>
                  <Link href="/privacy" className="hover:text-white transition">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Professionals</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>
                  <Link href="/doctors" className="hover:text-white transition">
                    Doctor Portal
                  </Link>
                </li>
                <li>
                  <Link href="/ngo" className="hover:text-white transition">
                    For NGOs
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center text-sm text-white/60">
            <p className="mb-2">
              Because every child deserves a confident smile.
            </p>
            <p>
              © 2024 CleftConnect. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

const features = [
  {
    title: 'Treatment Timeline',
    description: 'Personalized care roadmap from birth through adulthood with milestone tracking and reminders',
    icon: TrendingUp,
  },
  {
    title: 'Speech Therapy',
    description: 'Speak & Shine: Gamified speech practice with AI-powered phoneme detection and feedback',
    icon: Users,
  },
  {
    title: 'Growth Tracking',
    description: 'Facial symmetry and development monitoring with AI-powered growth analysis',
    icon: TrendingUp,
  },
  {
    title: 'Find Help',
    description: 'Discover nearby surgeons, hospitals, NGOs, and speech therapists in your area',
    icon: MapPin,
  },
  {
    title: 'Parent Support',
    description: 'Educational resources, FAQ, financial aid information, and community support',
    icon: Heart,
  },
  {
    title: 'Doctor Dashboard',
    description: 'Professional patient management, follow-up alerts, and outcome analytics',
    icon: Users,
  },
];
