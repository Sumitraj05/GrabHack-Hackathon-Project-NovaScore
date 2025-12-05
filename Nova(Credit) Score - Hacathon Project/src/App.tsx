import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import PredictionPage from './pages/PredictionPage';
import TeamPage from './pages/TeamPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PredictionResultPage from './pages/PredictionResultPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading Nova Score...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {user && <Navbar />}
        <Routes>
          <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/signup" element={!user ? <SignupPage /> : <Navigate to="/" />} />
          <Route path="/" element={user ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/about" element={user ? <AboutPage /> : <Navigate to="/login" />} />
          <Route path="/prediction" element={user ? <PredictionPage /> : <Navigate to="/login" />} />
          <Route path="/team" element={user ? <TeamPage /> : <Navigate to="/login" />} />
          <Route path="/prediction-result" element={user ? <PredictionResultPage /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;