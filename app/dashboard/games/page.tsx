'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mic, RotateCcw, Volume2, Star } from 'lucide-react';
import { toast } from 'sonner';

export default function SpeechGamePage() {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'results'>('menu');
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [stars, setStars] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  const levelData = {
    1: {
      title: 'Level 1: Vowel Sounds',
      difficulty: 'Beginner',
      words: ['aa', 'ee', 'ii', 'oo', 'uu'],
    },
    2: {
      title: 'Level 2: Consonants',
      difficulty: 'Easy',
      words: ['pa', 'ba', 'ma', 'ta', 'da'],
    },
    3: {
      title: 'Level 3: Word Combinations',
      difficulty: 'Medium',
      words: ['papa', 'mama', 'baby', 'ball', 'water'],
    },
    4: {
      title: 'Level 4: Sentences',
      difficulty: 'Advanced',
      words: ['I like to play', 'Hello my friend', 'How are you', 'Thank you', 'Good morning'],
    },
  };

  const currentLevel = levelData[level as keyof typeof levelData];
  const currentWord = currentLevel.words[currentWordIndex];

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setCurrentWordIndex(0);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      setIsRecording(true);

      // Setup audio context for analysis
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaStreamAudioProcessor(stream);
      source.connect(analyserRef.current);

      mediaRecorderRef.current.start();

      // Auto-stop after 3 seconds
      setTimeout(() => {
        stopRecording();
      }, 3000);
    } catch (error) {
      toast.error('Microphone access denied');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      // Simulate speech analysis
      setTimeout(() => {
        handleSpeechResult(currentWordIndex);
      }, 500);
    }
  };

  const handleSpeechResult = (wordIdx: number) => {
    // Simulate AI speech recognition
    const accuracy = Math.random() * 100;
    let points = 0;
    let starsEarned = 0;

    if (accuracy > 85) {
      points = 100;
      starsEarned = 3;
      toast.success('Excellent pronunciation!');
    } else if (accuracy > 70) {
      points = 50;
      starsEarned = 2;
      toast.success('Good job! Keep practicing.');
    } else {
      points = 25;
      starsEarned = 1;
      toast.info('Try again with proper focus.');
    }

    setScore((prev) => prev + points);
    setStars((prev) => prev + starsEarned);

    // Move to next word or complete level
    if (wordIdx < currentLevel.words.length - 1) {
      setCurrentWordIndex(wordIdx + 1);
    } else {
      // Complete level
      setTimeout(() => {
        setGameState('results');
      }, 500);
    }
  };

  const nextLevel = () => {
    if (level < 4) {
      setLevel(level + 1);
      setGameState('menu');
    } else {
      toast.success('Congratulations! You completed all levels!');
    }
  };

  const playAudio = (word: string) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
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
          <h1 className="text-3xl font-bold text-foreground">Speak & Shine</h1>
          <p className="text-foreground/60 mt-2">
            Fun speech practice games with AI feedback
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          {/* Menu State */}
          {gameState === 'menu' && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Level Selection */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Select a Level
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map((lv) => (
                    <motion.div
                      key={lv}
                      onClick={() => setLevel(lv)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Card
                        className={`p-8 cursor-pointer transition ${
                          level === lv
                            ? 'ring-2 ring-primary bg-primary/5'
                            : 'hover:border-primary'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-bold text-foreground">
                            Level {lv}
                          </h3>
                          <div className="text-2xl">
                            {lv === 1 && '🎤'}
                            {lv === 2 && '🔊'}
                            {lv === 3 && '💬'}
                            {lv === 4 && '🎯'}
                          </div>
                        </div>
                        <p className="text-foreground/60 text-sm mb-2">
                          {['Vowel Sounds', 'Consonants', 'Word Combinations', 'Sentences'][
                            lv - 1
                          ]}
                        </p>
                        <p className="text-xs text-foreground/40">
                          {['Beginner', 'Easy', 'Medium', 'Advanced'][lv - 1]}
                        </p>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Level Description */}
              {currentLevel && (
                <Card className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    {currentLevel.title}
                  </h3>
                  <p className="text-foreground/70 mb-6">
                    In this level, you'll practice {currentLevel.words.length} different{' '}
                    {currentLevel.title.split(':')[1].toLowerCase()}. Listen to the word, repeat
                    it clearly, and our AI will give you feedback. Try to earn 3 stars for each
                    word!
                  </p>
                  <Button
                    onClick={startGame}
                    className="bg-primary hover:bg-primary/90 text-white rounded-lg w-full"
                  >
                    Start Level {level}
                  </Button>
                </Card>
              )}

              {/* Progress Stats */}
              <div className="grid grid-cols-3 gap-4">
                <Card className="p-6 text-center">
                  <p className="text-3xl font-bold text-primary mb-2">{level}</p>
                  <p className="text-sm text-foreground/60">Current Level</p>
                </Card>
                <Card className="p-6 text-center">
                  <p className="text-3xl font-bold text-secondary mb-2">{score}</p>
                  <p className="text-sm text-foreground/60">Total Score</p>
                </Card>
                <Card className="p-6 text-center">
                  <p className="text-3xl font-bold text-accent mb-2 flex items-center justify-center gap-1">
                    {stars} <Star className="w-6 h-6 fill-accent" />
                  </p>
                  <p className="text-sm text-foreground/60">Stars Earned</p>
                </Card>
              </div>
            </motion.div>
          )}

          {/* Playing State */}
          {gameState === 'playing' && (
            <motion.div
              key="playing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="space-y-8"
            >
              {/* Progress Bar */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-semibold text-foreground">
                    {currentLevel.title}
                  </h2>
                  <span className="text-sm text-foreground/60">
                    {currentWordIndex + 1} of {currentLevel.words.length}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${((currentWordIndex + 1) / currentLevel.words.length) * 100}%`,
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Game Card */}
              <Card className="p-12 text-center bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
                <motion.div
                  key={currentWordIndex}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="space-y-8"
                >
                  <p className="text-sm text-foreground/60 uppercase tracking-wide font-medium">
                    Say this word
                  </p>

                  <div className="relative">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-7xl font-bold text-primary mb-8"
                    >
                      {currentWord}
                    </motion.div>
                  </div>

                  {/* Audio Button */}
                  <Button
                    onClick={() => playAudio(currentWord)}
                    className="bg-secondary hover:bg-secondary/90 text-white rounded-full w-20 h-20 mx-auto"
                  >
                    <Volume2 className="w-8 h-8" />
                  </Button>

                  <p className="text-foreground/60">
                    Tap the speaker icon to hear the pronunciation
                  </p>

                  {/* Mic Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`w-32 h-32 rounded-full mx-auto flex items-center justify-center text-white transition-all ${
                      isRecording
                        ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                        : 'bg-primary hover:bg-primary/90'
                    }`}
                  >
                    <Mic className="w-12 h-12" />
                  </motion.button>

                  <p className="text-foreground/60">
                    {isRecording ? 'Recording... Speak clearly' : 'Click mic and repeat the word'}
                  </p>

                  {/* Stars Display */}
                  <div className="flex justify-center gap-2">
                    {[1, 2, 3].map((s) => (
                      <motion.div
                        key={s}
                        animate={{
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 0.6,
                          delay: s * 0.1,
                          repeat: Infinity,
                        }}
                      >
                        <Star className="w-8 h-8 text-accent fill-accent opacity-30" />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </Card>

              {/* Score */}
              <div className="text-center">
                <p className="text-4xl font-bold text-foreground mb-2">{score} pts</p>
                <p className="text-foreground/60">
                  {stars}{' '}
                  <Star className="w-4 h-4 inline fill-accent text-accent" />
                  {' '}stars earned
                </p>
              </div>
            </motion.div>
          )}

          {/* Results State */}
          {gameState === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center space-y-8"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1 }}
                className="text-9xl"
              >
                🎉
              </motion.div>

              <h2 className="text-4xl font-bold text-foreground">
                Level {level} Completed!
              </h2>

              <Card className="p-12 bg-gradient-to-br from-primary/10 to-secondary/10">
                <p className="text-6xl font-bold text-primary mb-4">{score}</p>
                <p className="text-xl text-foreground/70 mb-8">Points Earned</p>

                <div className="flex justify-center gap-2 mb-8">
                  {Array(stars)
                    .fill(0)
                    .map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ rotate: 360, scale: [1, 1.3, 1] }}
                        transition={{ delay: i * 0.1, duration: 1 }}
                      >
                        <Star className="w-10 h-10 fill-accent text-accent" />
                      </motion.div>
                    ))}
                </div>
              </Card>

              {/* Analysis */}
              <Card className="p-8 text-left bg-muted">
                <h3 className="font-bold text-foreground mb-4">Your Performance</h3>
                <div className="space-y-3 text-sm text-foreground/70">
                  <p>
                    Average Clarity: <span className="font-semibold text-primary">82%</span>
                  </p>
                  <p>
                    Speech Rate: <span className="font-semibold text-primary">Good</span>
                  </p>
                  <p>
                    Hypernasality: <span className="font-semibold text-primary">None detected</span>
                  </p>
                  <p className="pt-4 text-foreground/60">
                    Keep practicing daily for best results. Your speech is improving!
                  </p>
                </div>
              </Card>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                {level < 4 && (
                  <Button
                    onClick={nextLevel}
                    className="flex-1 bg-primary hover:bg-primary/90 text-white rounded-lg"
                  >
                    Next Level
                  </Button>
                )}
                <Button
                  onClick={() => {
                    setGameState('menu');
                    setCurrentWordIndex(0);
                  }}
                  variant="outline"
                  className="flex-1 border-primary text-primary rounded-lg"
                >
                  Play Again
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
