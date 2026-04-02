'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Upload, Camera, TrendingUp, Check } from 'lucide-react';
import { toast } from 'sonner';

export default function GrowthScannerPage() {
  const [stage, setStage] = useState<'upload' | 'analyzing' | 'results'>('upload');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
        analyzeImage();
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = () => {
    setStage('analyzing');

    // Simulate AI analysis
    setTimeout(() => {
      setAnalysisResults({
        facialSymmetry: 82,
        maxillaryDevelopment: 78,
        cleftHealing: 85,
        posturquality: 88,
        overallProgress: 83,
        recommendations: [
          'Excellent facial symmetry development',
          'Maxillary growth progressing well',
          'Post-surgical healing on track',
          'Continue regular follow-ups',
        ],
      });
      setStage('results');
    }, 3000);
  };

  const resetAnalysis = () => {
    setStage('upload');
    setSelectedImage(null);
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
          <h1 className="text-3xl font-bold text-foreground">Growth & Symmetry Scanner</h1>
          <p className="text-foreground/60 mt-2">
            AI-powered facial growth tracking and analysis
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {stage === 'upload' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Instructions */}
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
              <h2 className="text-xl font-bold text-foreground mb-4">How It Works</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Take a Clear Photo</p>
                    <p className="text-sm text-foreground/60">
                      Front-facing photo in good lighting with neutral expression
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">AI Analysis</p>
                    <p className="text-sm text-foreground/60">
                      Our AI analyzes facial symmetry, growth progress, and surgical healing
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Get Insights</p>
                    <p className="text-sm text-foreground/60">
                      Detailed analysis with recommendations for continued care
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Upload Area */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-primary rounded-2xl p-12 text-center cursor-pointer hover:bg-primary/5 transition"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Camera className="w-16 h-16 text-primary mx-auto mb-4" />
              </motion.div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                Upload a Photo
              </h3>
              <p className="text-foreground/60 mb-4">
                Click to select a photo or drag and drop an image
              </p>
              <Button className="bg-primary hover:bg-primary/90 text-white rounded-lg">
                <Upload className="w-4 h-4 mr-2" />
                Choose File
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            {/* Previous Scans */}
            <div>
              <h2 className="text-xl font-bold text-foreground mb-6">Previous Scans</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    date: 'January 15, 2025',
                    age: '6 months',
                    symmetry: 78,
                    progress: 'Good',
                  },
                  {
                    date: 'October 2, 2024',
                    age: '3 months',
                    symmetry: 72,
                    progress: 'Fair',
                  },
                ].map((scan, idx) => (
                  <Card key={idx} className="p-6 hover:border-primary transition">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="font-semibold text-foreground">{scan.date}</p>
                        <p className="text-sm text-foreground/60">{scan.age}</p>
                      </div>
                      <TrendingUp className="w-6 h-6 text-secondary" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-foreground/60">Facial Symmetry</span>
                        <span className="font-semibold text-foreground">
                          {scan.symmetry}%
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                          style={{ width: `${scan.symmetry}%` }}
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {stage === 'analyzing' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="w-20 h-20 rounded-full border-4 border-primary border-t-transparent mb-8"
            />
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Analyzing Your Photo
            </h2>
            <p className="text-foreground/60 text-center max-w-sm">
              Our AI is analyzing facial geometry, symmetry, and growth progression. This may take
              a few moments.
            </p>

            {/* Progress steps */}
            <div className="mt-12 space-y-4 w-full max-w-md">
              {['Detecting facial features', 'Measuring symmetry', 'Analyzing growth', 'Generating report'].map(
                (step, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.3 }}
                    className="flex items-center gap-3"
                  >
                    {idx < 2 && <Check className="w-5 h-5 text-green-500" />}
                    {idx >= 2 && <div className="w-5 h-5" />}
                    <span className="text-foreground/70">{step}</span>
                  </motion.div>
                )
              )}
            </div>
          </motion.div>
        )}

        {stage === 'results' && analysisResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Overview */}
            <Card className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="text-5xl">✨</div>
                <div>
                  <h2 className="text-2xl font-bold text-green-900">Analysis Complete</h2>
                  <p className="text-green-700">Your child's facial growth is progressing well</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-green-700 mb-2">Overall Progress Score</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-5xl font-bold text-green-900">
                      {analysisResults.overallProgress}%
                    </p>
                    <p className="text-green-700">Excellent</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-green-700 mb-2">Analysis Date</p>
                  <p className="text-2xl font-semibold text-green-900">
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Card>

            {/* Detailed Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="font-semibold text-foreground mb-4">Facial Symmetry</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-foreground/60">Left-Right Balance</span>
                    <span className="font-semibold text-foreground">
                      {analysisResults.facialSymmetry}%
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <motion.div
                      className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${analysisResults.facialSymmetry}%` }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                  <p className="text-xs text-foreground/60 mt-2">Good symmetry development</p>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold text-foreground mb-4">Maxillary Development</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-foreground/60">Upper Jaw Growth</span>
                    <span className="font-semibold text-foreground">
                      {analysisResults.maxillaryDevelopment}%
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <motion.div
                      className="bg-gradient-to-r from-secondary to-accent h-3 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${analysisResults.maxillaryDevelopment}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
                  </div>
                  <p className="text-xs text-foreground/60 mt-2">Progressing well</p>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold text-foreground mb-4">Cleft Healing</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-foreground/60">Post-Surgical Progress</span>
                    <span className="font-semibold text-foreground">
                      {analysisResults.cleftHealing}%
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <motion.div
                      className="bg-gradient-to-r from-accent to-primary h-3 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${analysisResults.cleftHealing}%` }}
                      transition={{ duration: 1, delay: 0.4 }}
                    />
                  </div>
                  <p className="text-xs text-foreground/60 mt-2">Healing on track</p>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold text-foreground mb-4">Posture Quality</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-foreground/60">Head Position</span>
                    <span className="font-semibold text-foreground">
                      {analysisResults.posturquality}%
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <motion.div
                      className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${analysisResults.posturquality}%` }}
                      transition={{ duration: 1, delay: 0.6 }}
                    />
                  </div>
                  <p className="text-xs text-foreground/60 mt-2">Good positioning</p>
                </div>
              </Card>
            </div>

            {/* Recommendations */}
            <Card className="p-8">
              <h3 className="text-lg font-bold text-foreground mb-6">Recommendations</h3>
              <ul className="space-y-3">
                {analysisResults.recommendations.map((rec: string, idx: number) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground/70">{rec}</span>
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
                Scan Another Photo
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-primary text-primary rounded-lg"
              >
                Share with Doctor
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
