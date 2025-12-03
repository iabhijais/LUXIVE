import { Suspense } from 'react';
import AuthForm from '@/components/AuthForm';

function LoginContent() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black px-4">
            <AuthForm type="login" />
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black dark:border-white"></div>
            </div>
        }>
            <LoginContent />
        </Suspense>
    );
}
