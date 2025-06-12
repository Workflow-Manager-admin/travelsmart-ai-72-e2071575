import React, { useState } from 'react';

/**
 * Use Weather API Key securely via .env:
 * Define REACT_APP_WEATHER_KEY in .env, access here via process.env.REACT_APP_WEATHER_KEY.
 * Never hardcode API keys. See .env documentation for details.
 */
const OPENWEATHERMAP_API_KEY = 'c8d2c05abce0a5d7f303c425e174d820'
//process.env.REACT_APP_WEATHER_KEY;

// PUBLIC_INTERFACE
/**
 * WeatherPage - Show current and 5-day weather forecast by city, powered by OpenWeatherMap API.
 */
function formatDay(dt_txt) {
  // Returns e.g. "Mon 4/5"
  const d = new Date(dt_txt);
  return d.toLocaleDateString(undefined, { weekday: 'short', month: 'numeric', day: 'numeric' });
}

const WeatherPage = () => {
  const [city, setCity] = useState('');
  const [weatherResult, setWeatherResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetches weather data from OpenWeatherMap
  async function getWeather(e) {
    e.preventDefault();
    if (!city) {
      setError('Please enter a city name.');
      setWeatherResult(null);
      return;
    }
    setLoading(true);
    setError('');
    setWeatherResult(null);

    try {
      const urlCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${OPENWEATHERMAP_API_KEY}&units=metric`;
      const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${OPENWEATHERMAP_API_KEY}&units=metric`;

      // Parallel fetch for current and forecast
      const [currentRes, forecastRes] = await Promise.all([
        fetch(urlCurrent), fetch(urlForecast)
      ]);
      if (!currentRes.ok) throw new Error('City not found (current).');
      if (!forecastRes.ok) throw new Error('City not found (forecast).');
      const current = await currentRes.json();
      const forecastJson = await forecastRes.json();

      // Group forecast by day, pick closest to 12:00 for each day
      const forecastByDay = {};
      forecastJson.list.forEach(item => {
        const day = item.dt_txt.split(' ')[0];
        if (!forecastByDay[day] || Math.abs(item.dt_txt.indexOf('12:00')) < Math.abs(forecastByDay[day].dt_txt.indexOf('12:00'))) {
          forecastByDay[day] = item;
        }
      });
      // Get next 5 days
      const today = new Date().toISOString().split('T')[0];
      const forecastArr = Object.entries(forecastByDay)
        .filter(([day]) => day >= today)
        .slice(0, 5)
        .map(([, item]) => item);

      setWeatherResult({
        current,
        forecast: forecastArr,
      });
    } catch (e) {
      setError("Couldn't fetch weather. Please check city name and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container" style={{ maxWidth: 540 }}>
      <h2 className="title" style={{ color: "var(--heading)", fontSize: '2.1rem' }}>Weather Checker</h2>
      <form onSubmit={getWeather} style={{
        background: 'var(--surface-bg)',
        borderRadius: 10,
        padding: 24,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        border: "1.5px solid var(--border-color)",
        boxShadow: '0 3px 10px #D6E6F222',
        marginBottom: 32,
      }}>
        <label>
          City
          <input
            style={{
              width: '100%',
              padding: 9,
              borderRadius: 5,
              border: "1.5px solid var(--border-color)",
              background: "var(--primary-bg)",
              color: "var(--text-color)",
              marginTop: 3,
              fontSize: "1.1rem",
            }}
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            placeholder="e.g. London"
            type="text"
            className="input"
          />
        </label>
        <button
          className="btn btn-large"
          style={{
            background: "var(--button-bg)",
            color: "var(--button-text)",
            fontWeight: 600,
            opacity: loading ? 0.7 : 1
          }}
          disabled={loading}
          type="submit"
        >
          {loading ? 'Fetching...' : 'Show Weather'}
        </button>
        {error && <div style={{ color: "var(--danger)", fontWeight: 500, marginTop: 6 }}>{error}</div>}
      </form>
      {weatherResult && (
        <div>
          <div style={{
            background: 'var(--primary-bg)',
            borderRadius: 10,
            padding: '16px 24px',
            marginBottom: 18,
            borderLeft: "5px solid var(--accent)",
            color: "var(--text-color)",
            boxShadow: "0 1px 8px #D6E6F222"
          }}>
            <div style={{ fontWeight: 600, fontSize: 20, color: "var(--heading)" }}>{weatherResult.current.name}</div>
            <div style={{ fontSize: 14, color: "var(--secondary-text)" }}>
              {weatherResult.current.weather[0]?.main}
              <span style={{ marginLeft: 12, fontWeight: 400 }}>
                {weatherResult.current.weather[0]?.description}
              </span>
            </div>
            <div style={{ fontSize: 34, fontWeight: 600, marginTop: 0, color: "var(--accent)" }}>
              {Math.round(weatherResult.current.main.temp)}°C
            </div>
            <div style={{ color: "var(--heading)", marginTop: 2, opacity: 0.7 }}>
              Humidity: {weatherResult.current.main.humidity}%
            </div>
          </div>
          {/* Forecast */}
          <div>
            <div style={{
              fontWeight: 500,
              color: "var(--heading)",
              marginBottom: 6,
            }}>5-Day Forecast</div>
            <div style={{
              display: 'flex', gap: 12, flexWrap: 'wrap',
            }}>
              {weatherResult.forecast.map((item, i) => (
                <div key={i} style={{
                  flex: 1,
                  minWidth: 100,
                  background: 'var(--surface-bg)',
                  borderRadius: 8,
                  boxShadow: '0 2px 8px #D6E6F233',
                  border: "1px solid var(--border-color)",
                  padding: 12,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}>
                  <div style={{ color: "var(--accent)", fontWeight: 600, marginBottom: 4 }}>
                    {formatDay(item.dt_txt)}
                  </div>
                  <div style={{ fontWeight: 700, color: "var(--heading)", fontSize: 22 }}>
                    {Math.round(item.main.temp)}°C
                  </div>
                  <div style={{ fontSize: 13, color: "var(--secondary-text)" }}>
                    {item.weather[0]?.main}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--heading)", opacity: 0.65 }}>
                    Humidity: {item.main.humidity}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <div style={{ fontSize: '0.9em', margin: '24px 0', color: "var(--heading)", opacity: 0.7 }}>
        Powered by <a href="https://openweathermap.org/" style={{ color: "var(--accent)", textDecoration: "underline" }}>OpenWeatherMap</a>
      </div>
    </div>
  );
};
export default WeatherPage;
