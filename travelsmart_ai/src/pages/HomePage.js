import React from 'react';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
/**
 * TravelSmart AI Home Page: brief intro and navigation links.
 */
const COLORS = {
  primary: '#65809a',
  secondary: '#e02424',
  accent: '#f39512',
};
const HomePage = () => (
  <div className="container">
    <div className="hero">
      <h1 className="title" style={{ color: COLORS.primary }}>TravelSmart AI</h1>
      <div className="subtitle" style={{ color: COLORS.secondary, fontSize: '1.3rem' }}>
        Plan smarter. Explore further. All with AI.
      </div>
      <p className="description">
        Welcome to TravelSmart AI — your personalized travel assistant.
        Effortlessly create bespoke trip itineraries, chat with our smart travel bot,
        and get up-to-date weather for any destination.
      </p>
      <div style={{
        display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', marginTop: 20,
      }}>
        <Link to="/itinerary">
          <button className="btn btn-large" style={{ background: COLORS.primary }}>Generate Itinerary</button>
        </Link>
        <Link to="/weather">
          <button className="btn btn-large" style={{ background: COLORS.accent }}>Check Weather</button>
        </Link>
        <Link to="/chat">
          <button className="btn btn-large" style={{ background: COLORS.secondary }}>AI Chatbot</button>
        </Link>
      </div>
    </div>
  </div>
);
export default HomePage;
