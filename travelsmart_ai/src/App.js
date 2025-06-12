// PUBLIC_INTERFACE
/**
 * Main App Container for TravelSmart AI.
 * Sets up routing and navigation for Home, Itinerary, Weather, and Chat pages.
 */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import ItineraryPage from './pages/ItineraryPage';
import WeatherPage from './pages/WeatherPage';
import ChatPage from './pages/ChatPage';


function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="logo">
            <span className="logo-symbol" style={{ fontSize: 32 }}>✈️</span>
            <span>TravelSmart AI</span>
          </div>
          <div style={{ display: 'flex', gap: 20 }}>
            <Link className="navbar-link" to="/" style={{ color: "var(--heading)", textDecoration: 'none', fontWeight: 500 }}>Home</Link>
            <Link className="navbar-link" to="/itinerary" style={{ color: "var(--heading)", textDecoration: 'none' }}>Itinerary</Link>
            <Link className="navbar-link" to="/weather" style={{ color: "var(--heading)", textDecoration: 'none' }}>Weather</Link>
            <Link className="navbar-link" to="/chat" style={{ color: "var(--heading)", textDecoration: 'none' }}>Chat</Link>
          </div>
        </nav>
        <div style={{
          paddingTop: 90,
          minHeight: 'calc(100vh - 56px)',
          background: 'var(--primary-bg)'
        }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/itinerary" element={<ItineraryPage />} />
            <Route path="/weather" element={<WeatherPage />} />
            <Route path="/chat" element={<ChatPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
export default App;
