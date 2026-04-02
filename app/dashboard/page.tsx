'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Settings, LogOut, Home } from 'lucide-react';

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <div className="flex gap-2">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
            </Link>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">Welcome Back!</h2>
            <p className="text-foreground/60">Manage your child's care journey</p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <Link href="/dashboard/register-child">
              <Card className="p-6 hover:border-primary transition cursor-pointer">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Plus className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Register a Child</h3>
                <p className="text-sm text-foreground/60">
                  Add your child to start their care journey
                </p>
              </Card>
            </Link>

            <Link href="/dashboard/journey">
              <Card className="p-6 hover:border-secondary transition cursor-pointer">
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                  <div className="w-6 h-6 text-secondary">📅</div>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Treatment Timeline</h3>
                <p className="text-sm text-foreground/60">
                  View and track your child's milestones
                </p>
              </Card>
            </Link>

            <Link href="/dashboard/games">
              <Card className="p-6 hover:border-accent transition cursor-pointer">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <div className="w-6 h-6 text-accent">🎮</div>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Speak & Shine</h3>
                <p className="text-sm text-foreground/60">
                  Practice speech with engaging games
                </p>
              </Card>
            </Link>
          </div>

          {/* Coming Soon Section */}
          <div className="bg-white rounded-2xl p-8 border border-border">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              More Features Coming Soon
            </h3>
            <p className="text-foreground/60 mb-6">
              We're building comprehensive tools to support your child's entire care journey.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm font-medium text-foreground mb-1">Growth & Symmetry Scanner</p>
                <p className="text-xs text-foreground/60">Track facial development with AI analysis</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm font-medium text-foreground mb-1">Feeding Guidance</p>
                <p className="text-xs text-foreground/60">AI-powered feeding position analysis</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm font-medium text-foreground mb-1">Find Help Near You</p>
                <p className="text-xs text-foreground/60">Locate surgeons, hospitals, and NGOs</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm font-medium text-foreground mb-1">Smile Garden</p>
                <p className="text-xs text-foreground/60">Gamified achievements and rewards</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
