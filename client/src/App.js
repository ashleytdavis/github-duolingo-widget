import React, { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [widgetUrl, setWidgetUrl] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const encodedUsername = encodeURIComponent(username);
    const url = `http://localhost:3001/duolingo-badge?username=${encodedUsername}&darkMode=${darkMode}`;

    try {
      const response = await fetch(url);
      if (response.status === 404) {
        setError('User not found');
        setWidgetUrl('');
      } else {
        setError('');
        setWidgetUrl(url);
      }
    } catch (err) {
      setError('Failed to fetch user data');
      setWidgetUrl('');
    }
  };

  const copyToClipboard = () => {
    const markdownText = `![Duolingo Stats](http://localhost:3001/duolingo-badge?username=${username}&darkMode=${darkMode})`;
    navigator.clipboard.writeText(markdownText);
  };

  return (
    <div className="container">
      <div className="left-column">
        <h1>Duolingo Widget Builder</h1>
        <div className="toggle-container">
          <label className="switch">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            <span className="slider round"></span>
          </label>
          <span>Dark Mode</span>
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Enter your Duolingo username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <button type="submit">Get Widget</button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>

      <div className="right-column">
        {widgetUrl && (
          <>
            <div className="widget-preview">
              <h2>Preview:</h2>
              <img src={widgetUrl} alt="Duolingo Badge" />
            </div>
            <div className="markdown-box">
              <h2>Copy Markdown:</h2>
              <div className="copy-container" onClick={copyToClipboard}>
                <code>{`![Duolingo Stats](http://localhost:3001/duolingo-badge?username=${username}&darkMode=${darkMode})`}</code>
                <span className="copy-tooltip">Click to copy</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;