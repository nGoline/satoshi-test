import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const NavigationComponent: React.FC = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    }

    return (
        <nav>
            <ul className="flex space-x-4">
                {isAuthenticated ? (
                    <>
                        <li>
                            <Link to="/wallet">Wallet</Link>
                        </li>
                        <li>
                            My user ID: {user?.id}
                        </li>
                        <li>
                            <button onClick={handleLogout}>Logout</button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/signup">Signup</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default NavigationComponent;
