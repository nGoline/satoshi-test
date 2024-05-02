import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home'; // Assuming you have a Home component
import Login from './Login';
import Signup from './Signup';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-800 text-white">
        <header className="bg-gray-900 p-4">
          <h1 className="text-xl font-bold">Satoshi Test</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link to="/" className="hover:text-orange-500">Home</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-orange-500">Login</Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-orange-500">Signup</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main className="p-8">
          <Routes> {/* Changed from Switch to Routes */}
            <Route path="/" element={<Home />} /> {/* Updated Route syntax */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
