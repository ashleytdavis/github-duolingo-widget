import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [bgColor, setBgColor] = useState('');
  const [textColor, setTextColor] = useState('');
  const [width, setWidth] = useState(275);
  const [height, setHeight] = useState(160);
  const [widgetUrl, setWidgetUrl] = useState('');
  const [error, setError] = useState('');
  const [useGradient, setUseGradient] = useState(false);
  const [gradientStart, setGradientStart] = useState('#ffffff');
  const [gradientEnd, setGradientEnd] = useState('#ffffff');
  const [activeTab, setActiveTab] = useState('background');
  const [headerColor, setHeaderColor] = useState('');
  const [valuesColor, setValuesColor] = useState('');


  useEffect(() => {
    updateWidgetUrl();
  }, [username, darkMode, bgColor, textColor, headerColor, valuesColor, width, height, useGradient, gradientStart, gradientEnd]);

  const updateWidgetUrl = () => {
    if (!username) {
      setWidgetUrl('');
      return;
    }

    const encodedUsername = encodeURIComponent(username);
    let url = `https://github-duolingo-widget.onrender.com/api/duolingo-badge?username=${encodedUsername}`;

    if (darkMode) url += `&darkMode=true`;

    if (useGradient) {
      url += `&gradientStart=${gradientStart.replace('#', '')}`;
      url += `&gradientEnd=${gradientEnd.replace('#', '')}`;
    } else if (bgColor) {
      url += `&bgColor=${bgColor.replace('#', '')}`;
    }

    if (textColor) url += `&textColor=${textColor.replace('#', '')}`;
    if (headerColor) url += `&headerColor=${headerColor.replace('#', '')}`;
    if (valuesColor) url += `&valuesColor=${valuesColor.replace('#', '')}`;
    if (width !== 275) url += `&width=${width}`;
    if (height !== 160) url += `&height=${height}`;

    setWidgetUrl(url);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!widgetUrl) return;

    try {
      const response = await fetch(widgetUrl);
      if (response.status === 404) {
        setError('User not found');
      } else {
        setError('');
      }
    } catch (err) {
      setError('Failed to fetch user data');
    }
  };

  const copyToClipboard = () => {
    const markdownText = `![Duolingo Stats](${widgetUrl})`;
    navigator.clipboard.writeText(markdownText);
  };

  return (
    <div className="container">
      <div className="left-column">
        <h1>Duolingo Widget Builder</h1>
        <label htmlFor="username">Enter your Duolingo username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          requiredbackground
        />


        <div className="tabs">
          <button
            className={`tab ${activeTab === 'background' ? 'active' : ''}`}
            onClick={() => setActiveTab('background')}
          >
            Background
          </button>
          <button
            className={`tab ${activeTab === 'text' ? 'active' : ''}`}
            onClick={() => setActiveTab('text')}
          >
            Text
          </button>
          <button
            className={`tab ${activeTab === 'size' ? 'active' : ''}`}
            onClick={() => setActiveTab('size')}
          >
            Size
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {activeTab === 'background' && (
            <div className="tab-content">
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

              {/* Add gradient toggle here */}
              <div className="toggle-container">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={useGradient}
                    onChange={() => setUseGradient(!useGradient)}
                  />
                  <span className="slider round"></span>
                </label>
                <span>Use Gradient</span>
              </div>

              {/* Show solid background color only if gradient is disabled */}
              {!useGradient && (
                <div className="color-input-group">
                  <label htmlFor="bgColor">Background Color:</label>
                  <input
                    type="color"
                    id="bgColor"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                  />
                </div>
              )}

              {/* Show gradient inputs only if gradient is enabled */}
              {useGradient && (
                <div className="gradient-input-group">
                  <label>Gradient Colors:</label>
                  <div className="gradient-colors">
                    <input
                      type="color"
                      id="gradientStart"
                      value={gradientStart}
                      onChange={(e) => setGradientStart(e.target.value)}
                    />
                    <input
                      type="color"
                      id="gradientEnd"
                      value={gradientEnd}
                      onChange={(e) => setGradientEnd(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>
          )}


          {activeTab === 'text' && (
            <div className="tab-content">
              <div className="color-input-group">
                <label htmlFor="textColor">Labels:</label>
                <input
                  type="color"
                  id="textColor"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                />
              </div>
              <div className="color-input-group">
                <label htmlFor="headerColor">Header Text:</label>
                <input
                  type="color"
                  id="headerColor"
                  value={headerColor}
                  onChange={(e) => setHeaderColor(e.target.value)}
                />
              </div>
              <div className="color-input-group">
                <label htmlFor="valuesColor">Values Text:</label>
                <input
                  type="color"
                  id="valuesColor"
                  value={valuesColor}
                  onChange={(e) => setValuesColor(e.target.value)}
                />
              </div>
            </div>
          )}


          {activeTab === 'size' && (
            <div className="tab-content">
              <div className="input-group">
                <label htmlFor="width">Width:</label>
                <input
                  type="number"
                  id="width"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  min="200"
                  max="500"
                />
              </div>

              <div className="input-group">
                <label htmlFor="height">Height:</label>
                <input
                  type="number"
                  id="height"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  min="100"
                  max="300"
                />
              </div>
            </div>
          )}

          <button type="submit">Verify Widget</button>
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
                <code>{`![Duolingo Stats](${widgetUrl})`}</code>
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
