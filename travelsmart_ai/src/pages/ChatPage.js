import React, { useRef, useState } from 'react';

const COLORS = {
  primary: '#65809a',
  secondary: '#e02424',
  accent: '#f39512',
};
// Simple fake AI reply generator (replace with Cohere or real LLM API)
async function fakeAIReply(question) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (/weather/i.test(question)) {
        resolve("You can check the local weather using our Weather tab! Where would you like to go?");
      } else if (/budget/i.test(question)) {
        resolve("A good backpacker's budget is $50–$70/day in Southeast Asia, $100–$150/day in Europe, excluding flights.");
      } else if (/paris/i.test(question)) {
        resolve("Paris is renowned for the Eiffel Tower, Louvre, and charming neighborhoods. Spring/Fall brings mild weather!");
      } else if (/food|cuisine/i.test(question)) {
        resolve("Try some local street food and check TripAdvisor for top restaurants in your destination!");
      } else {
        resolve("I'm TravelSmart – ask me anything about travel, destinations, or planning tips!");
      }
    }, 1100);
  });
}

// PUBLIC_INTERFACE
/**
 * Travel Chatbot Page - input field, chat transcript, and AI (placeholder) response.
 */
const ChatPage = () => {
  const [input, setInput] = useState('');
  const [chats, setChats] = useState([
    { sender: 'bot', text: "Hi! I'm your AI travel assistant. Ask me anything about your trip or a destination!" }
  ]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

  async function handleSend(e) {
    e.preventDefault();
    if (!input.trim()) return;
    const q = input.trim();
    setChats(c => [...c, { sender: 'user', text: q }]);
    setInput('');
    setLoading(true);
    // Fake AI response
    const aiReply = await fakeAIReply(q);
    setChats(c => [...c, { sender: 'bot', text: aiReply }]);
    setLoading(false);
    inputRef.current?.focus();
  }

  return (
    <div className="container" style={{ maxWidth: 540 }}>
      <h2 className="title" style={{ color: COLORS.primary, fontSize: '2.1rem' }}>Chat with TravelSmart AI</h2>
      <div style={{
        background: '#fff',
        borderRadius: 8,
        border: `1.5px solid ${COLORS.primary}22`,
        minHeight: 320,
        maxHeight: 400,
        overflowY: 'auto',
        padding: '18px 16px 8px 16px',
        marginBottom: 18,
        boxShadow: '0 2px 8px #0001'
      }}>
        {chats.map((msg, idx) => (
          <div
            key={idx}
            style={{
              marginBottom: 12,
              display: 'flex',
              flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row',
              gap: 7,
              alignItems: 'flex-start'
            }}>
            <div
              style={{
                background: msg.sender === 'bot' ? '#f7fafe' : COLORS.accent,
                color: msg.sender === 'bot' ? COLORS.primary : '#fff',
                padding: '7px 13px',
                borderRadius: 18,
                maxWidth: 360,
                fontSize: '1rem',
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{
            marginBottom: 8, color: COLORS.secondary, fontStyle: 'italic', fontSize: 15
          }}>TravelSmart AI is typing...</div>
        )}
      </div>
      <form
        onSubmit={handleSend}
        style={{ display: 'flex', gap: 10 }}
        autoComplete="off"
      >
        <input
          ref={inputRef}
          style={{
            flex: 1,
            padding: 11,
            borderRadius: 18,
            border: `1px solid ${COLORS.primary}`,
            fontSize: '1.07rem',
          }}
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your travel question..."
          disabled={loading}
        />
        <button
          className="btn"
          type="submit"
          disabled={loading || !input.trim()}
          style={{
            borderRadius: 16,
            background: COLORS.primary,
            fontWeight: 600,
            minWidth: 85,
          }}
        >
          {loading ? '...' : 'Send'}
        </button>
      </form>
    </div>
  );
};
export default ChatPage;
