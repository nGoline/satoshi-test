import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';

interface LoginProps {
}

interface LoginState {
    email: string;
    password: string;
}

const Login: React.FC<LoginProps> = () => {
    const [credentials, setCredentials] = useState<LoginState>({ email: '', password: '' });
    const navigate = useNavigate();
    const { setAuthStatus } = useAuth();

    const handleLogin = async (event: FormEvent) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Login successful:', data);
                // set auth status
                setAuthStatus(data);
                // redirect to wallet page
                navigate('/wallet');
            } else {
                toast.error(data.message || 'Failed to login');
            }
        } catch (error) {
            toast.error('Login failed. Please check your connection and try again.');
            console.error('Login error:', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="w-full max-w-md">
                <form onSubmit={handleLogin} className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h2 className="mb-6 text-3xl font-bold text-center text-orange-500">Login</h2>
                    <div className="mb-4">
                        <label className="block text-orange-300 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="Email"
                            value={credentials.email}
                            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                            required />
                    </div>
                    <div className="mb-6">
                        <label className="block text-orange-300 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="******************"
                            value={credentials.password}
                            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                            required />
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit">
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
