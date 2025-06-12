import React, { useState } from 'react';

const COLORS = {
  primary: '#65809a',
  secondary: '#e02424',
  accent: '#f39512',
};

// PUBLIC_INTERFACE
/**
 * ItineraryPage - User form for trip details, fake AI call, and itinerary display.
 */
const defaultForm = {
  destination: '',
  startDate: '',
  endDate: '',
  budget: '',
  preferences: '',
};

const exampleItinerary = (inputs) => `Day 1: Arrival in ${inputs.destination}
  - Explore downtown, check into accommodation. Enjoy local cuisine.
Day 2: 
  - ${inputs.preferences ? `Focus on "${inputs.preferences}". ` : ''}Visit famous landmarks and a museum.
Day 3: 
  - Outdoor adventure, maybe a guided tour or hiking.
Day 4: 
  - Shopping, leisure, local experiences.
Day 5: 
  - Free time and return home.
<b>Total Budget:</b> ${inputs.budget ? `$${inputs.budget}` : 'as planned'}
Happy Travels!`;


const ItineraryPage = () => {
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState('');
  const [error, setError] = useState('');

  // Simulates fake/async AI call
  async function generateItinerary(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setItinerary('');
    // Simulate basic validation
    if (!form.destination || !form.startDate || !form.endDate) {
      setError('Destination, Start Date and End Date are required.');
      setLoading(false);
      return;
    }
    // Simulate API (in real app, replace with actual call)
    setTimeout(() => {
      setItinerary(exampleItinerary(form));
      setLoading(false);
    }, 1300);
  }

  return (
    <div className="container" style={{ maxWidth: 540, paddingTop: 24 }}>
      <h2 className="title" style={{ color: COLORS.primary, fontSize: '2.2rem' }}>AI Itinerary Generator</h2>
      <form onSubmit={generateItinerary} style={{
        background: '#fff',
        borderRadius: 8,
        padding: 28,
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
        border: `1.5px solid ${COLORS.primary}22`,
        boxShadow: '0 3px 10px #0001',
        marginBottom: 26,
      }}>
        <label>
          Destination*
          <input
            required
            style={{ width: '100%', padding: 8, borderRadius: 4, border: `1px solid ${COLORS.primary}` }}
            value={form.destination}
            onChange={(e) => setForm(f => ({ ...f, destination: e.target.value }))}
            placeholder="e.g. Paris"
            type="text"
          />
        </label>
        <div style={{ display: 'flex', gap: 16 }}>
          <label style={{ flex: 1 }}>
            Start Date*
            <input
              required
              style={{ width: '100%', padding: 8, borderRadius: 4, border: `1px solid ${COLORS.primary}` }}
              value={form.startDate}
              onChange={(e) => setForm(f => ({ ...f, startDate: e.target.value }))}
              type="date"
            />
          </label>
          <label style={{ flex: 1 }}>
            End Date*
            <input
              required
              style={{ width: '100%', padding: 8, borderRadius: 4, border: `1px solid ${COLORS.primary}` }}
              value={form.endDate}
              onChange={(e) => setForm(f => ({ ...f, endDate: e.target.value }))}
              type="date"
            />
          </label>
        </div>
        <label>
          Budget (USD)
          <input
            style={{ width: '100%', padding: 8, borderRadius: 4, border: `1px solid ${COLORS.primary}` }}
            value={form.budget}
            onChange={(e) => setForm(f => ({ ...f, budget: e.target.value }))}
            placeholder="e.g. 2000"
            type="number"
            min="0"
          />
        </label>
        <label>
          Preferences/Interests
          <input
            style={{ width: '100%', padding: 8, borderRadius: 4, border: `1px solid ${COLORS.primary}` }}
            value={form.preferences}
            onChange={(e) => setForm(f => ({ ...f, preferences: e.target.value }))}
            placeholder="beach, museums, nightlife, etc."
            type="text"
          />
        </label>
        <button className="btn btn-large" style={{
          background: COLORS.primary,
          marginTop: 12,
          fontWeight: 600,
          opacity: loading ? 0.6 : 1,
        }} type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Itinerary'}
        </button>
        {error && <div style={{ color: COLORS.secondary, fontWeight: 500 }}>{error}</div>}
      </form>
      {itinerary && (
        <div style={{
          background: '#f7fafe',
          borderLeft: `5px solid ${COLORS.accent}`,
          borderRadius: 6,
          padding: 20,
        }}>
          <h3 style={{ color: COLORS.primary, marginBottom: 6, fontSize: '1.2rem' }}>Your AI-Generated Itinerary</h3>
          <pre
            style={{
              color: COLORS.primary,
              background: 'none',
              fontFamily: 'inherit',
              fontSize: '1rem',
              lineHeight: 1.6,
              whiteSpace: 'pre-wrap',
            }}
            dangerouslySetInnerHTML={{ __html: itinerary }}
          />
        </div>
      )}
    </div>
  );
};
export default ItineraryPage;
