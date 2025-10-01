import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * HUD (Heads-Up Display) component with tactical UI design
 * Provides navigation, notifications, and system controls
 */
const HUD: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isMinimized, setIsMinimized] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Navigation routes
  const routes = [
    { route: 'lobby', label: 'HOME', icon: '🏠' },
    { route: 'inventory', label: 'PROJECTS', icon: '📦' },
    { route: 'loadout', label: 'SKILLS', icon: '⚡' },
    { route: 'scoreboard', label: 'ABOUT', icon: '📊' },
    { route: 'radio', label: 'CONTACT', icon: '📡' },
  ];

  const handleNavigation = (route: string) => {
    navigate(`/${route}`);
  };

  const handleSettingsToggle = () => {
    setShowSettings(!showSettings);
  };

  const handleMinimizeToggle = () => {
    setIsMinimized(!isMinimized);
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  const getCurrentRoute = () => {
    const path = location.pathname.replace('/', '');
    return path || 'lobby';
  };

  return (
    <div className={`hud-container ${isMinimized ? 'minimized' : ''}`}>
      {/* Main HUD Panel */}
      <div className="hud-panel glass-morphism neon-border animate-scan">
        {/* Navigation Bar */}
        <div className="hud-nav">
          <div className="nav-buttons">
            {routes.map(({ route, label, icon }) => (
              <button
                key={route}
                className={`nav-button ${getCurrentRoute() === route ? 'active animate-glow' : ''}`}
                onClick={() => handleNavigation(route)}
              >
                <span className="nav-icon">{icon}</span>
                <span className="nav-label">{label}</span>
              </button>
            ))}
          </div>
          
          {/* Control Buttons */}
          <div className="hud-controls">
            <button
              className="control-button"
              onClick={handleSettingsToggle}
              title="Settings"
            >
              ⚙️
            </button>
            <button
              className="control-button"
              onClick={handleMuteToggle}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? '🔇' : '🔊'}
            </button>
            <button
              className="control-button"
              onClick={handleMinimizeToggle}
              title={isMinimized ? 'Expand' : 'Minimize'}
            >
              {isMinimized ? '⬆️' : '⬇️'}
            </button>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="settings-panel">
            <div className="settings-section">
              <h3>Audio Settings</h3>
              <div className="setting-item">
                <label>Master Volume</label>
                <input type="range" min="0" max="100" defaultValue="70" />
              </div>
              <div className="setting-item">
                <label>SFX Volume</label>
                <input type="range" min="0" max="100" defaultValue="80" />
              </div>
            </div>
            
            <div className="settings-section">
              <h3>Display Settings</h3>
              <div className="setting-item">
                <label>
                  <input type="checkbox" defaultChecked />
                  Enable Shadows
                </label>
              </div>
              <div className="setting-item">
                <label>
                  <input type="checkbox" defaultChecked />
                  Enable Bloom
                </label>
              </div>
            </div>
          </div>
        )}

        {/* System Status */}
        <div className="system-status">
          <div className="status-item">
            <span className="status-label">SYS:</span>
            <span className="status-value online">ONLINE</span>
          </div>
          <div className="status-item">
            <span className="status-label">FPS:</span>
            <span className="status-value">60</span>
          </div>
          <div className="status-item">
            <span className="status-label">PING:</span>
            <span className="status-value">12ms</span>
          </div>
        </div>
      </div>

      {/* Control Instructions */}
      <div className="control-instructions">
        <div className="instruction-item">
          <span className="instruction-key">WASD</span>
          <span className="instruction-desc">Move Camera</span>
        </div>
        <div className="instruction-item">
          <span className="instruction-key">MOUSE</span>
          <span className="instruction-desc">Look Around</span>
        </div>
        <div className="instruction-item">
          <span className="instruction-key">ESC</span>
          <span className="instruction-desc">Menu</span>
        </div>
      </div>
    </div>
  );
};

export default HUD;