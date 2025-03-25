"use client";
import { LoginForm } from "./login/login-form";
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Auth() {
    const router = useRouter();
    const { user, isAuthenticated } = useSelector((state: any) => state.auth);

    // useEffect(() => {
    //     if (isAuthenticated) {
    //         router.push('/dashboard');
    //     }

    // }, [isAuthenticated, user, router]);

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <LoginForm />
            </div>
        </div>
    );
}
