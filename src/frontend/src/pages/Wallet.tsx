import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Wallet = () => {
    const { user, isAuthenticated } = useAuth();
    const [balance, setBalance] = useState(0);
    const [amount, setAmount] = useState('');
    const [receiverId, setReceiverId] = useState('');

    useEffect(() => {
        if (!isAuthenticated || !user || !user.id || !user.walletId) return;

        fetchBalance();
    }, [user, isAuthenticated]);

    const fetchBalance = async () => {
        if (!user || !user.walletId) return;

        const response = await fetch(`http://localhost:3001/wallets/${user.walletId}/balance`);
        const data = await response.json();
        setBalance(data.balance);
    };

    const handleSendTokens = async () => {
        if (!user || !user.id || !user.walletId || !receiverId) return;

        const response = await fetch('http://localhost:3001/transactions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ senderId: user.id, receiverId, amount: Number(amount) })
        });
        if (response.ok) {
            setAmount('');
            setReceiverId('');
            fetchBalance();
        } else {
            alert('Failed to send tokens');
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold text-gray-700 mb-4">Balance: {balance}</h1>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={fetchBalance}>Refresh Balance</button>
            <div className="mt-8">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">Amount</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Amount"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="receiverId">Receiver ID</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="receiverId"
                        type="text"
                        value={receiverId}
                        onChange={(e) => setReceiverId(e.target.value)}
                        placeholder="Receiver ID"
                    />
                </div>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={handleSendTokens}>Send Tokens</button>
            </div>
        </div>
    );
};

export default Wallet;
