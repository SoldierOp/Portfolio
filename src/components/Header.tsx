import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MatrixRain from './MatrixRain';

/**
 * Professional Header Component with SECRET EASTER EGG!
 */
const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [logoClickCount, setLogoClickCount] = useState(0);
  const [showMatrixRain, setShowMatrixRain] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogoClick = () => {
    navigate('/lobby');
    
    // SECRET EASTER EGG: Click logo 5 times to trigger Matrix Rain!
    setLogoClickCount(prev => {
      const newCount = prev + 1;
      if (newCount >= 5) {
        setShowMatrixRain(true);
        setLogoClickCount(0);
        console.log('🎉 SECRET EASTER EGG ACTIVATED! 🎉');
      }
      return newCount;
    });
  };

  const handleMatrixComplete = () => {
    setShowMatrixRain(false);
  };

  // Reset click count after 3 seconds
  useEffect(() => {
    if (logoClickCount > 0) {
      const timer = setTimeout(() => setLogoClickCount(0), 3000);
      return () => clearTimeout(timer);
    }
  }, [logoClickCount]);

  // Handle ESC key to exit Matrix Rain
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showMatrixRain) {
        setShowMatrixRain(false);
      }
    };

    if (showMatrixRain) {
      document.addEventListener('keydown', handleKeyPress);
      return () => document.removeEventListener('keydown', handleKeyPress);
    }
  }, [showMatrixRain]);

  const getCurrentRoute = () => {
    const path = location.pathname.replace('/', '');
    return path || 'lobby';
  };

  const navigationItems = [
    { route: 'lobby', label: 'HOME' },
    { route: 'inventory', label: 'PROJECTS' },
    { route: 'loadout', label: 'SKILLS' },
    { route: 'scoreboard', label: 'ABOUT' },
    { route: 'radio', label: 'CONTACT' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-tactical-dark/95 backdrop-blur-md border-b border-tactical-primary/30 shadow-lg">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group interactive-element"
            onClick={handleLogoClick}
          >
            <div className={`w-10 h-10 tactical-gradient rounded-lg flex items-center justify-center group-hover:scale-110 transition-all duration-300 neon-border ${logoClickCount > 0 ? 'easter-egg-active' : ''}`}>
              <span className="text-tactical-dark font-display font-bold text-lg animate-glow">M</span>
            </div>
            <div>
              <h1 className="text-xl font-display font-bold text-tactical-primary group-hover:text-holo-green transition-colors duration-300 animate-neon">
                MAYANK.EXE
              </h1>
              <p className="text-xs font-tactical text-tactical-secondary group-hover:text-tactical-primary transition-colors duration-300">
                AI & Robotics Engineer
              </p>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <button
                key={item.route}
                className={`px-4 py-2 rounded-md font-tactical font-medium text-sm transition-all duration-300 interactive-element ${
                  getCurrentRoute() === item.route
                    ? 'bg-tactical-primary text-tactical-dark shadow-md neon-border animate-glow'
                    : 'text-tactical-secondary hover:text-tactical-primary hover:bg-tactical-gray/30 hover:neon-border'
                }`}
                onClick={() => navigate(`/${item.route}`)}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Status Indicator */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-tactical-primary rounded-full animate-float neon-border"></div>
              <span className="text-xs font-tactical text-tactical-secondary animate-glow">ONLINE</span>
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 text-tactical-primary hover:text-holo-green transition-colors duration-300 interactive-element"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-tactical-dark/95 backdrop-blur-md border-t border-tactical-primary/30">
          <div className="container mx-auto px-6 py-4">
            <nav className="flex flex-col space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.route}
                  className={`px-4 py-3 rounded-md font-tactical font-medium text-sm transition-all duration-300 interactive-element text-left ${
                    getCurrentRoute() === item.route
                      ? 'bg-tactical-primary text-tactical-dark shadow-md neon-border animate-glow'
                      : 'text-tactical-secondary hover:text-tactical-primary hover:bg-tactical-gray/30 hover:neon-border'
                  }`}
                  onClick={() => {
                    navigate(`/${item.route}`);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
      
      {/* SECRET EASTER EGG: Matrix Rain Effect */}
      <MatrixRain isActive={showMatrixRain} onComplete={handleMatrixComplete} />
    </header>
  );
};

export default Header;