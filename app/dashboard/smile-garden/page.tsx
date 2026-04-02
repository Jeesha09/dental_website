'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Star, Trophy, Zap } from 'lucide-react';

export default function SmileGardenPage() {
  const [flowers, setFlowers] = useState(12);
  const [stars, setStars] = useState(45);
  const [streak, setStreak] = useState(7);
  const [mascotLevel, setMascotLevel] = useState(2);
  const [selectedTab, setSelectedTab] = useState<'garden' | 'achievements' | 'mascot'>(
    'garden'
  );

  const achievements = [
    { id: 1, name: 'Speech Champion', icon: '🗣️', earned: true, date: 'Jan 15' },
    { id: 2, name: 'Growth Tracker', icon: '📈', earned: true, date: 'Jan 10' },
    { id: 3, name: 'Feeding Master', icon: '🍼', earned: false },
    { id: 4, name: 'Consistency Hero', icon: '⭐', earned: true, date: 'Jan 20' },
    { id: 5, name: 'Perfect Week', icon: '🎯', earned: false },
    { id: 6, name: 'Smile Legendary', icon: '✨', earned: false },
  ];

  const milestoneRewards = [
    { id: 1, flowers: 10, stars: 10, label: 'Complete Speech Game Level' },
    { id: 2, flowers: 15, stars: 20, label: 'Take Growth Scanner Photo' },
    { id: 3, flowers: 12, stars: 15, label: 'Upload Feeding Video' },
    { id: 4, flowers: 8, stars: 10, label: 'Daily Milestone Check-in' },
    { id: 5, flowers: 20, stars: 30, label: 'Complete Care Milestone' },
  ];

  const mascotFacts = [
    {
      level: 1,
      name: 'Sunny Sprout',
      description: 'Your journey companion starts here',
      unlocked: mascotLevel >= 1,
    },
    {
      level: 2,
      name: 'Blooming Buddy',
      description: 'Unlocked after 20 stars',
      unlocked: mascotLevel >= 2,
    },
    {
      level: 3,
      name: 'Rainbow Friend',
      description: 'Unlocked after 50 stars',
      unlocked: mascotLevel >= 3,
    },
    {
      level: 4,
      name: 'Smile Legend',
      description: 'Unlocked after 100 stars',
      unlocked: mascotLevel >= 4,
    },
  ];

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
          <h1 className="text-3xl font-bold text-foreground">Smile Garden</h1>
          <p className="text-foreground/60 mt-2">
            Grow flowers, earn stars, and unlock rewards for your care journey
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0 }}
          >
            <Card className="p-6 text-center bg-gradient-to-br from-pink-50 to-rose-50 border-pink-200">
              <motion.p
                className="text-4xl mb-2"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🌸
              </motion.p>
              <p className="text-3xl font-bold text-pink-700 mb-1">{flowers}</p>
              <p className="text-sm text-pink-600">Flowers Grown</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6 text-center bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200">
              <motion.p
                className="text-4xl mb-2"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ⭐
              </motion.p>
              <p className="text-3xl font-bold text-yellow-700 mb-1">{stars}</p>
              <p className="text-sm text-yellow-600">Stars Earned</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6 text-center bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
              <motion.p
                className="text-4xl mb-2"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                🔥
              </motion.p>
              <p className="text-3xl font-bold text-blue-700 mb-1">{streak}</p>
              <p className="text-sm text-blue-600">Day Streak</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6 text-center bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
              <motion.p
                className="text-4xl mb-2"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ✨
              </motion.p>
              <p className="text-3xl font-bold text-purple-700 mb-1">{mascotLevel}</p>
              <p className="text-sm text-purple-600">Mascot Level</p>
            </Card>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border">
          {[
            { id: 'garden', label: 'My Garden', icon: '🌷' },
            { id: 'achievements', label: 'Achievements', icon: '🏆' },
            { id: 'mascot', label: 'My Friend', icon: '🌈' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id as any)}
              className={`px-6 py-3 font-medium transition border-b-2 ${
                selectedTab === tab.id
                  ? 'text-primary border-primary'
                  : 'text-foreground/60 border-transparent hover:text-foreground'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {selectedTab === 'garden' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Garden Visualization */}
            <Card className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
                Your Flower Garden
              </h2>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-6 mb-8">
                {Array(flowers)
                  .fill(0)
                  .map((_, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex flex-col items-center"
                    >
                      <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{
                          duration: 2 + Math.random() * 2,
                          repeat: Infinity,
                          delay: idx * 0.1,
                        }}
                        className="text-4xl mb-2"
                      >
                        {['🌸', '🌺', '🌻', '🌹', '💐'][idx % 5]}
                      </motion.div>
                      <span className="text-xs text-foreground/50">Day {idx + 1}</span>
                    </motion.div>
                  ))}
              </div>
              <p className="text-center text-foreground/70">
                Each flower represents a day of care activities completed. Keep growing your garden!
              </p>
            </Card>

            {/* How to Earn Flowers */}
            <div>
              <h3 className="text-xl font-bold text-foreground mb-6">How to Earn Flowers & Stars</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {milestoneRewards.map((reward, idx) => (
                  <motion.div
                    key={reward.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Card className="p-6 hover:border-primary transition">
                      <h4 className="font-semibold text-foreground mb-3">
                        {reward.label}
                      </h4>
                      <div className="flex gap-4">
                        <div className="flex items-center gap-2 bg-pink-50 rounded-lg px-3 py-2">
                          <span className="text-lg">🌸</span>
                          <span className="font-bold text-pink-700">+{reward.flowers}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-yellow-50 rounded-lg px-3 py-2">
                          <span className="text-lg">⭐</span>
                          <span className="font-bold text-yellow-700">+{reward.stars}</span>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {selectedTab === 'achievements' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <h2 className="text-2xl font-bold text-foreground">Your Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((achievement, idx) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card
                    className={`p-6 text-center transition ${
                      achievement.earned
                        ? 'bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200'
                        : 'bg-muted/50 border-border opacity-60'
                    }`}
                  >
                    <div className="text-5xl mb-4">{achievement.icon}</div>
                    <h3 className="font-bold text-foreground mb-1">{achievement.name}</h3>
                    {achievement.earned ? (
                      <p className="text-sm text-yellow-700 font-medium">
                        Earned on {achievement.date}
                      </p>
                    ) : (
                      <p className="text-sm text-foreground/50">Locked - Keep practicing!</p>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {selectedTab === 'mascot' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Current Mascot */}
            <Card className="p-12 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 text-center">
              <motion.div
                className="text-9xl mb-8"
                animate={{ scale: [1, 1.1, 1], rotate: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {['🌱', '🌼', '🌈', '✨'][mascotLevel - 1]}
              </motion.div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                {mascotFacts[mascotLevel - 1].name}
              </h2>
              <p className="text-foreground/70 mb-6">
                {mascotFacts[mascotLevel - 1].description}
              </p>
              <p className="text-sm text-foreground/60">
                Your friendly companion cheering you on every step of your care journey
              </p>
            </Card>

            {/* Mascot Evolution */}
            <div>
              <h3 className="text-xl font-bold text-foreground mb-6">Unlock Mascot Forms</h3>
              <div className="space-y-4">
                {mascotFacts.map((mascot, idx) => (
                  <motion.div
                    key={mascot.level}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Card
                      className={`p-6 ${
                        mascot.unlocked
                          ? 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200'
                          : 'bg-muted/50 opacity-60'
                      }`}
                    >
                      <div className="flex items-center gap-6">
                        <div className="text-6xl">
                          {['🌱', '🌼', '🌈', '✨'][idx]}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-foreground text-lg">
                            {mascot.name}
                          </h4>
                          <p className="text-sm text-foreground/70 mb-3">
                            {mascot.description}
                          </p>
                          {mascot.unlocked && (
                            <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                              <span>✓ Unlocked</span>
                            </div>
                          )}
                        </div>
                        <motion.div
                          animate={{
                            scale: mascot.unlocked ? 1 : [1, 1.2, 1],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Trophy className="w-6 h-6 text-yellow-600" />
                        </motion.div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Mascot Messages */}
            <Card className="p-8 bg-blue-50 border-blue-200">
              <h3 className="font-bold text-foreground mb-4">
                {mascotFacts[mascotLevel - 1].name}'s Message
              </h3>
              <p className="text-foreground/70 italic mb-4">
                {mascotLevel === 1 &&
                  '"I\'m so excited to grow with you on this journey! Every step counts. Let\'s make amazing progress together!"'}
                {mascotLevel === 2 &&
                  '"You\'re doing wonderfully! Your consistency and care are blooming into a beautiful journey. Keep shining!"'}
                {mascotLevel === 3 &&
                  '"Look at all the colors of your journey! You\'ve overcome so much. Your smile is already legendary!"'}
                {mascotLevel === 4 &&
                  '"You\'ve reached the peak of your journey. Your dedication, strength, and love have created something truly special. Forever proud of you!"'}
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                <Zap className="w-4 h-4 mr-2" />
                Share Your Journey
              </Button>
            </Card>
          </motion.div>
        )}
      </div>
    </main>
  );
}
