import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Wallet from './pages/Wallet';
import { AuthProvider } from './contexts/AuthContext';
import NavigationComponent from './components/NavigationComponent';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        pauseOnHover
        toastClassName="relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"
        bodyClassName="text-sm font-white font-med block p-3" />
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-800 text-white">
            <header className="bg-gray-900 p-4">
              <h1 className="text-xl font-bold">Satoshi Test</h1>
              <NavigationComponent />
            </header>
            <main className="p-8">
              <Routes> { }
                <Route path="/" element={<Home />} /> { }
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/wallet" element={<Wallet />} />
              </Routes>
            </main>
          </div>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
