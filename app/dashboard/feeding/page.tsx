'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Upload, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { toast } from 'sonner';

export default function FeedingGuidancePage() {
  const [stage, setStage] = useState<'menu' | 'upload' | 'analyzing' | 'results'>('menu');
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setStage('analyzing');
      toast.info('Video uploaded. Analyzing feeding technique...');

      // Simulate analysis
      setTimeout(() => {
        setAnalysisResults({
          babyPositioning: 85,
          aspirationRisk: 'Low',
          regurgitation: false,
          latchingQuality: 78,
          feedingEfficiency: 82,
          issues: [
            'Good head and neck alignment',
            'Slight elevation could improve efficiency',
          ],
          recommendations: [
            'Maintain current positioning - very good',
            'Ensure burping every 30 seconds for safety',
            'Watch for signs of feeding fatigue',
            'Continue special nipple/feeding device',
            'Monitor milk intake carefully',
          ],
          warnings: [],
        });
        setStage('results');
      }, 2000);
    }
  };

  const resetAnalysis = () => {
    setStage('menu');
    setAnalysisResults(null);
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
          <h1 className="text-3xl font-bold text-foreground">Feeding Guidance</h1>
          <p className="text-foreground/60 mt-2">
            AI-powered feeding position and technique analysis
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          {stage === 'menu' && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Welcome Card */}
              <Card className="p-8 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Safe Feeding for Your Baby
                </h2>
                <p className="text-foreground/70 mb-6">
                  Feeding a baby with cleft lip and palate requires special techniques to prevent
                  aspiration and ensure proper nutrition. Upload a video of feeding time, and our
                  AI will analyze positioning, latch, and safety.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex gap-3">
                    <div className="text-2xl">🍼</div>
                    <div>
                      <p className="font-semibold text-foreground">Positioning</p>
                      <p className="text-xs text-foreground/60">Head and body alignment</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="text-2xl">🎯</div>
                    <div>
                      <p className="font-semibold text-foreground">Latching</p>
                      <p className="text-xs text-foreground/60">Proper oral attachment</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="text-2xl">⚠️</div>
                    <div>
                      <p className="font-semibold text-foreground">Safety</p>
                      <p className="text-xs text-foreground/60">Aspiration risk assessment</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Upload Video */}
              <div>
                <h3 className="text-lg font-bold text-foreground mb-6">Upload Feeding Video</h3>

                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-primary rounded-2xl p-12 text-center cursor-pointer hover:bg-primary/5 transition"
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Upload className="w-16 h-16 text-primary mx-auto mb-4" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Upload a Video
                  </h3>
                  <p className="text-foreground/60 mb-4">
                    Record your baby feeding and upload for analysis (video: 15-30 seconds)
                  </p>
                  <Button className="bg-primary hover:bg-primary/90 text-white rounded-lg">
                    <Upload className="w-4 h-4 mr-2" />
                    Choose Video
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/*"
                    onChange={handleVideoUpload}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Tips */}
              <Card className="p-8">
                <h3 className="text-lg font-bold text-foreground mb-6">Tips for Best Results</h3>
                <div className="space-y-4">
                  {[
                    'Record in good natural lighting',
                    'Keep the camera steady and close enough to see details',
                    'Record full feeding session (15-30 seconds minimum)',
                    'Ensure baby is calm and in feeding position',
                    'Include head, neck, and bottle/breast in frame',
                  ].map((tip, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground/70">{tip}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Educational Content */}
              <Card className="p-8 bg-blue-50 border-blue-200">
                <div className="flex gap-4 items-start">
                  <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">
                      Why Special Feeding Techniques Matter
                    </h4>
                    <p className="text-sm text-blue-800 mb-4">
                      Babies with cleft palate cannot create the seal needed for normal breastfeeding.
                      Special techniques and feeding devices help prevent milk from entering the nasal
                      passages (aspiration) and ensure proper nutrition.
                    </p>
                    <Button variant="outline" className="border-blue-300 text-blue-700">
                      Learn More About Feeding
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {stage === 'analyzing' && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="w-20 h-20 rounded-full border-4 border-primary border-t-transparent mb-8"
              />
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Analyzing Feeding Video
              </h2>
              <p className="text-foreground/60 text-center max-w-sm mb-8">
                Our AI is analyzing positioning, latching, and safety. Please wait...
              </p>

              <div className="space-y-4 w-full max-w-md">
                {[
                  'Detecting baby position',
                  'Analyzing head alignment',
                  'Evaluating latching',
                  'Assessing feeding efficiency',
                  'Checking for aspiration risk',
                ].map((step, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.2 }}
                    className="flex items-center gap-3 text-foreground/70"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent flex-shrink-0"
                    />
                    {step}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {stage === 'results' && analysisResults && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Overall Assessment */}
              <Card
                className={`p-8 bg-gradient-to-br ${
                  analysisResults.aspirationRisk === 'Low'
                    ? 'from-green-50 to-emerald-50 border-green-200'
                    : 'from-yellow-50 to-amber-50 border-yellow-200'
                }`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-5xl">
                    {analysisResults.aspirationRisk === 'Low' ? '✅' : '⚠️'}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">
                      Feeding Assessment Complete
                    </h2>
                    <p className="text-foreground/70">
                      Aspiration Risk:{' '}
                      <span
                        className={`font-semibold ${
                          analysisResults.aspirationRisk === 'Low'
                            ? 'text-green-700'
                            : 'text-yellow-700'
                        }`}
                      >
                        {analysisResults.aspirationRisk}
                      </span>
                    </p>
                  </div>
                </div>
              </Card>

              {/* Detailed Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="font-semibold text-foreground mb-4">Baby Positioning</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-foreground/60">Score</span>
                      <span className="text-2xl font-bold text-primary">
                        {analysisResults.babyPositioning}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <motion.div
                        className="bg-primary h-3 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${analysisResults.babyPositioning}%` }}
                        transition={{ duration: 1 }}
                      />
                    </div>
                    <p className="text-sm text-foreground/60">Good head and body alignment</p>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="font-semibold text-foreground mb-4">Latching Quality</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-foreground/60">Score</span>
                      <span className="text-2xl font-bold text-secondary">
                        {analysisResults.latchingQuality}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <motion.div
                        className="bg-secondary h-3 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${analysisResults.latchingQuality}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                      />
                    </div>
                    <p className="text-sm text-foreground/60">Proper oral attachment</p>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="font-semibold text-foreground mb-4">Feeding Efficiency</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-foreground/60">Score</span>
                      <span className="text-2xl font-bold text-accent">
                        {analysisResults.feedingEfficiency}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <motion.div
                        className="bg-accent h-3 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${analysisResults.feedingEfficiency}%` }}
                        transition={{ duration: 1, delay: 0.4 }}
                      />
                    </div>
                    <p className="text-sm text-foreground/60">Milk intake rate</p>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="font-semibold text-foreground mb-4">Regurgitation Risk</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-foreground/60">Status</span>
                      {analysisResults.regurgitation ? (
                        <div className="flex items-center gap-2 text-red-600">
                          <AlertCircle className="w-4 h-4" />
                          Detected
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-green-600">
                          <CheckCircle className="w-4 h-4" />
                          Not Detected
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </div>

              {/* Issues Found */}
              {analysisResults.warnings.length > 0 && (
                <Card className="p-6 border-amber-200 bg-amber-50">
                  <h3 className="font-semibold text-amber-900 mb-4 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Points to Watch
                  </h3>
                  <ul className="space-y-2">
                    {analysisResults.warnings.map((warning: string, idx: number) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-amber-800 text-sm"
                      >
                        <span className="text-amber-600 font-bold mt-0.5">•</span>
                        {warning}
                      </li>
                    ))}
                  </ul>
                </Card>
              )}

              {/* Good Observations */}
              <Card className="p-6 border-green-200 bg-green-50">
                <h3 className="font-semibold text-green-900 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  What You're Doing Well
                </h3>
                <ul className="space-y-2">
                  {analysisResults.issues.map((issue: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 text-green-800 text-sm">
                      <span className="text-green-600 font-bold mt-0.5">✓</span>
                      {issue}
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Recommendations */}
              <Card className="p-8">
                <h3 className="text-lg font-bold text-foreground mb-6">
                  Recommendations for Improvement
                </h3>
                <ul className="space-y-3">
                  {analysisResults.recommendations.map((rec: string, idx: number) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                        {idx + 1}
                      </div>
                      <span className="text-foreground/70 pt-0.5">{rec}</span>
                    </motion.li>
                  ))}
                </ul>
              </Card>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={resetAnalysis}
                  className="flex-1 bg-primary hover:bg-primary/90 text-white rounded-lg"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Analyze Another Video
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-primary text-primary rounded-lg"
                >
                  Share with Lactation Consultant
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
