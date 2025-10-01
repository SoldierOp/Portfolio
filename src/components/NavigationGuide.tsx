import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * Navigation Guide Component - Subtle and Professional
 */
const NavigationGuide: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMinimized, setIsMinimized] = useState(false);

  const pages = [
    {
      path: '/lobby',
      title: 'HOME',
      icon: '◉',
      color: 'text-tactical-primary'
    },
    {
      path: '/inventory',
      title: 'PROJECTS',
      icon: '◉',
      color: 'text-holo-blue'
    },
    {
      path: '/loadout',
      title: 'SKILLS',
      icon: '◉',
      color: 'text-holo-green'
    },
    {
      path: '/scoreboard',
      title: 'ABOUT',
      icon: '◉',
      color: 'text-tactical-warning'
    },
    {
      path: '/radio',
      title: 'CONTACT',
      icon: '◉',
      color: 'text-holo-purple'
    }
  ];

  const handlePageClick = (path: string) => {
    navigate(path);
  };

  const getCurrentRoute = () => {
    const path = location.pathname.replace('/', '');
    return path || 'lobby';
  };

  if (isMinimized) {
    return (
      <div className="fixed top-32 left-4 z-30">
        <button
          onClick={() => setIsMinimized(false)}
          className="w-12 h-12 glass-panel-tactical rounded-lg flex items-center justify-center hover:bg-tactical-primary hover:text-tactical-dark transition-all duration-300 interactive-element"
        >
          <span className="text-lg font-tactical">◉</span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed top-32 left-4 z-30 max-w-xs">
      <div className="glass-panel-tactical p-4 rounded-lg border border-tactical-primary/20">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-tactical-primary font-tactical font-semibold text-sm">
            NAVIGATION
          </h3>
          <button
            onClick={() => setIsMinimized(true)}
            className="text-tactical-secondary hover:text-tactical-primary transition-colors duration-300 interactive-element"
          >
            <span className="text-xs">−</span>
          </button>
        </div>
        
        <div className="space-y-2">
          {pages.map((page) => (
            <button
              key={page.path}
              onClick={() => handlePageClick(page.path)}
              className={`w-full text-left px-3 py-2 rounded transition-all duration-200 interactive-element ${
                getCurrentRoute() === page.path.replace('/', '')
                  ? 'bg-tactical-primary text-tactical-dark'
                  : 'hover:bg-tactical-gray/50 text-tactical-secondary'
              }`}
            >
              <div className="flex items-center space-x-2">
                <span className={`text-xs ${page.color}`}>{page.icon}</span>
                <span className="font-tactical font-medium text-xs">
                  {page.title}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavigationGuide;