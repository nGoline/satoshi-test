import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState({ message: '' });

  useEffect(() => {
    fetch('http://localhost:3001/')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        } else {
          return response.json();
        }
      })
      .then(data => setData(data))
      .catch(error => {
        console.error('Error fetching data:', error);
        setData({ message: 'Error fetching data' });
      });
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <h1 className="text-orange-500 text-4xl font-bold">{data.message || 'Loading...'}</h1>
    </div>
  );
}

export default App;
