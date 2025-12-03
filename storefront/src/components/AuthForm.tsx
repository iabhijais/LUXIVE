"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCart } from '@/context/CartContext';

type AuthFormProps = {
    type: 'login' | 'signup';
};

export default function AuthForm({ type }: AuthFormProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const supabase = createClient();
    const { user } = useCart();

    // Redirect if already logged in
    useEffect(() => {
        if (user) {
            router.push('/');
        }
    }, [user, router]);

    // Check for message in URL params (from signup redirect)
    useEffect(() => {
        const urlMessage = searchParams.get('message');
        if (urlMessage) {
            setMessage(urlMessage);
        }
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMessage(null);

        try {
            if (type === 'signup') {
                const { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            full_name: fullName,
                            phone: phone,
                        },
                    },
                });
                
                if (error) throw error;

                if (data.user && !data.session) {
                    router.push('/login?message=Account created successfully! Please check your email to verify your account.');
                } else {
                    router.push('/');
                }
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                
                if (error) throw error;
                window.location.href = '/';
            }
        } catch (err: any) {
            console.error('Authentication error:', err);
            setError(err.message || 'An error occurred during authentication.');
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md mx-auto p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800">
            <h2 className="text-2xl font-bold text-center mb-4 text-zinc-900 dark:text-white">
                {type === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>

            {error && (
                <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm border border-red-200">
                    {error}
                </div>
            )}

            {message && (
                <div className="bg-green-50 text-green-600 p-3 rounded-md text-sm border border-green-200">
                    {message}
                </div>
            )}

            {type === 'signup' && (
                <>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Full Name</label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                            className="p-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-transparent text-zinc-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition-all"
                            placeholder="John Doe"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Phone Number</label>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="p-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-transparent text-zinc-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition-all"
                            placeholder="+91 98765 43210"
                        />
                    </div>
                </>
            )}

            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="p-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-transparent text-zinc-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition-all"
                    placeholder="you@example.com"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="p-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-transparent text-zinc-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition-all"
                    placeholder="••••••••"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="mt-4 bg-black dark:bg-white text-white dark:text-black py-2 rounded-md font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? 'Processing...' : (type === 'login' ? 'Sign In' : 'Sign Up')}
            </button>

            <div className="text-center text-sm text-zinc-500 mt-2">
                {type === 'login' ? (
                    <>
                        Don't have an account?{' '}
                        <a href="/signup" className="text-black dark:text-white hover:underline">Sign up</a>
                    </>
                ) : (
                    <>
                        Already have an account?{' '}
                        <a href="/login" className="text-black dark:text-white hover:underline">Log in</a>
                    </>
                )}
            </div>
        </form>
    );
}
