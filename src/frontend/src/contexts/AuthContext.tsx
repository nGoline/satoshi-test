import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
    userId: string | null;
    walletId: string | null;
    isAuthenticated: boolean;
    setAuthStatus: (userId: string, walletId: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [userId, setUserId] = useState<string | null>(localStorage.getItem('userId'));
    const [walletId, setWalletId] = useState<string | null>(localStorage.getItem('walletId'));
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!userId && !!walletId);


    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const walletId = localStorage.getItem('walletId');
        if (!userId || !walletId) {
            setUserId(userId);
            setWalletId(walletId);
            setIsAuthenticated(true);
        }
    }, []);

    const setAuthStatus = (userId: string, walletId: string) => {
        setUserId(userId);
        localStorage.setItem('userId', userId);

        setWalletId(walletId);
        localStorage.setItem('walletId', walletId);

        setIsAuthenticated(true);
    };

    const logout = () => {
        setUserId(null);
        localStorage.removeItem('userId');

        setWalletId(null);
        localStorage.removeItem('walletId');

        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ userId, walletId, isAuthenticated, setAuthStatus, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
