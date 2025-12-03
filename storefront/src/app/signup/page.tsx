import AuthForm from '@/components/AuthForm';

export default function SignupPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black px-4">
            <AuthForm type="signup" />
        </div>
    );
}
