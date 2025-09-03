import './App.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Help from './pages/Help';
import JoinUpdates from './pages/JoinUpdates';
import Horoscopes from './pages/Horoscopes';
import Loader from './components/Loader';
import Footer from './components/Footer';

export default function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timeout);
  }, [location]);

  return (
    <>
      <Header />
      {loading && <Loader/>}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/horoscopes" element={<Horoscopes />} />
        <Route path="/help" element={<Help />} />
        <Route path="/sign" element={<JoinUpdates />} />
      </Routes>
      <Footer/>
    </>
  );
}
