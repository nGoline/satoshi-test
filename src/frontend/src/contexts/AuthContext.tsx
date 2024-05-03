import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
    user: any | null;
    isAuthenticated: boolean;
    setAuthStatus: (user: any) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<any | null>(JSON.parse(localStorage.getItem('user') || '{}'));
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!user && !!user.id && !!user.walletId);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (!user || !user.id || !user.walletId) {
            console.log('User is not authenticated');
        } else {
            setUser(user);
            setIsAuthenticated(true);
        }
    }, []);

    const setAuthStatus = (user: any) => {
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));

        setIsAuthenticated(true);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');

        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, setAuthStatus, logout }}>
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
