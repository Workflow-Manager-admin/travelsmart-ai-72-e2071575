// PUBLIC_INTERFACE
/**
 * Main App Container for TravelSmart AI.
 * Sets up routing and navigation for Home, Itinerary, Weather, and Chat pages.
 */
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

import HomePage from './pages/HomePage';
import ItineraryPage from './pages/ItineraryPage';
import WeatherPage from './pages/WeatherPage';
import ChatPage from './pages/ChatPage';

// App-wide color palette (matches spec)
const COLORS = {
  primary: '#65809a',
  secondary: '#e02424',
  accent: '#f39512',
};

function App() {
  return (
    <Router>
      <div className="app">
        <nav
          className="navbar"
          style={{
            backgroundColor: '#fff',
            borderBottom: `2px solid ${COLORS.primary}`,
            color: COLORS.primary,
          }}
        >
          <div className="logo" style={{ color: COLORS.primary }}>
            <span className="logo-symbol" style={{ color: COLORS.secondary, fontSize: 32 }}>✈️</span>
            <span>TravelSmart AI</span>
          </div>
          <div style={{ display: 'flex', gap: 20 }}>
            <Link className="navbar-link" to="/" style={{ color: COLORS.primary, textDecoration: 'none', fontWeight: 500 }}>Home</Link>
            <Link className="navbar-link" to="/itinerary" style={{ color: COLORS.primary, textDecoration: 'none' }}>Itinerary</Link>
            <Link className="navbar-link" to="/weather" style={{ color: COLORS.primary, textDecoration: 'none' }}>Weather</Link>
            <Link className="navbar-link" to="/chat" style={{ color: COLORS.primary, textDecoration: 'none' }}>Chat</Link>
          </div>
        </nav>
        <div style={{ paddingTop: 90, minHeight: 'calc(100vh - 56px)', background: '#f8fafc' }}>
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
