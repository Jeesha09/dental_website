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

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
      
      // Sign in with Supabase directly
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        console.error('Login error:', error);
        const normalizedMessage = error.message.toLowerCase();
        if (normalizedMessage.includes('invalid login credentials')) {
          throw new Error('Invalid email or password. If you just registered, verify your email first.');
        }
        if (normalizedMessage.includes('email not confirmed')) {
          throw new Error('Please verify your email before signing in.');
        }
        throw new Error(error.message);
      }

      if (!data.session) {
        throw new Error('No session created');
      }

      // Ensure profile exists for users who signed up with email confirmation enabled.
      const { error: profileError } = await supabase.from('users').upsert(
        {
          id: data.user.id,
          email: data.user.email ?? '',
          first_name: data.user.user_metadata?.first_name ?? null,
          last_name: data.user.user_metadata?.last_name ?? null,
          phone: data.user.user_metadata?.phone ?? null,
          role: 'parent',
          language_preference: 'en',
        },
        {
          onConflict: 'id',
        }
      );

      if (profileError) {
        console.error('Profile upsert on login failed:', profileError);
      }

      toast.success('Logged in successfully!');
      setTimeout(() => {
        router.push('/dashboard');
      }, 500);
    } catch (error) {
      console.error('Login error:', error);
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

      {/* Login Form */}
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
              Welcome Back
            </h1>
            <p className="text-center text-foreground/60 mb-8">
              Sign in to manage your child's care journey
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
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
                  Password
                </label>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="rounded-lg"
                  placeholder="Enter your password"
                />
              </div>

              <div className="text-right">
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary hover:bg-primary/90 text-white rounded-lg font-medium"
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </div>
            </form>

            <div className="mt-6 pt-6 border-t border-border text-center">
              <p className="text-foreground/60 text-sm">
                Don't have an account?{' '}
                <Link href="/auth/register" className="text-primary hover:underline font-medium">
                  Create one
                </Link>
              </p>
            </div>
          </div>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-white/50 rounded-lg border border-border text-center text-xs text-foreground/60 backdrop-blur-sm">
            <p className="font-medium mb-2">Demo Account</p>
            <p>Email: demo@cleftconnect.com</p>
            <p>Password: demo123456</p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
