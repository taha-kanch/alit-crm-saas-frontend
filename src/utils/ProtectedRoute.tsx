"use client"
import { useAppSelector } from '@/hooks/useAppSelector';
import { useRouter } from 'next/navigation';
import React from 'react';

const ProtectedRoute = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
    const AuthComponent = (props: P) => {
        const { data: { token } } = useAppSelector((state) => state.auth);
        const router = useRouter();
        const [isClient, setIsClient] = React.useState(false);

        React.useEffect(() => {
            setIsClient(true);
        }, []);

        React.useEffect(() => {
            if (isClient && !token) {
                router.push("/signin");
            }
        }, [isClient, token, router]);

        if (!isClient) return null;

        return <WrappedComponent {...props} />
    }
    return AuthComponent;
}

export default ProtectedRoute;