"use client";

import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ProtectedRoute = ({ children, roles }: { children: React.ReactNode; roles?: string[] }) => {
    const router = useRouter();
    const { user, isAuthenticated } = useSelector((state: any) => state.auth);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/');
        }

        if (isAuthenticated && roles && !roles.includes(user.role)) {
            router.push('/');
        }
    }, [isAuthenticated, user, roles, router]);

    if (isAuthenticated && (!roles || roles.includes(user.role))) {
        return children;
    }

    return null;
};

export default ProtectedRoute;