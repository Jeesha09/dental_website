'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { createSupabaseClient } from '@/lib/supabase';
import type { EmailOtpType } from '@supabase/supabase-js';

export default function ConfirmEmailPage() {
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Confirming your email...');

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        const supabase = createSupabaseClient();
        const url = new URL(window.location.href);
        const code = url.searchParams.get('code');
        const tokenHash = url.searchParams.get('token_hash');
        const type = url.searchParams.get('type') as EmailOtpType | null;

        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) throw error;
        } else if (tokenHash && type) {
          const { error } = await supabase.auth.verifyOtp({
            token_hash: tokenHash,
            type,
          });
          if (error) throw error;
        }

        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          setStatus('error');
          setMessage('Email confirmed, but no login session was created. Please sign in manually.');
          return;
        }

        setStatus('success');
        setMessage('Email confirmed successfully! Redirecting to dashboard...');
        toast.success('Email verified successfully!');

        setTimeout(() => {
          router.replace('/dashboard');
        }, 800);
      } catch (error) {
        const err = error as Error;
        setStatus('error');
        setMessage(err.message || 'Email confirmation failed. Please try signing in.');
      }
    };

    confirmEmail();
  }, [router]);

  return (
    <main className="min-h-screen bg-background text-foreground px-4 py-10 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-sm text-center">
        <h1 className="text-2xl font-bold mb-3">Email Confirmation</h1>
        <p className="text-foreground/70 mb-6">{message}</p>

        {status !== 'loading' && (
          <Link href="/auth/login" className="text-primary hover:underline font-medium">
            Go to Sign In
          </Link>
        )}
      </div>
    </main>
  );
}
