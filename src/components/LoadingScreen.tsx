import React from 'react';
import type { BaseComponentProps } from '../types/index';

interface LoadingScreenProps extends BaseComponentProps {
  progress: number;
  text: string;
  error?: string | null;
}

/**
 * Loading screen component with tactical design
 * Shows initialization progress and handles errors
 */
const LoadingScreen: React.FC<LoadingScreenProps> = ({
  progress,
  text,
  error,
  className = '',
}) => {
  return (
    <div className={`loading-screen ${className}`}>
      <div className="loading-logo">PORTFOLIO.EXE</div>
      
      <div className="loading-bar">
        <div 
          className="loading-progress" 
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <div className="loading-text">
        {error ? (
          <span className="text-tactical-accent">ERROR: {error}</span>
        ) : (
          text
        )}
      </div>
      
      {error && (
        <button 
          className="tactical-button mt-4"
          onClick={() => window.location.reload()}
        >
          RETRY INITIALIZATION
        </button>
      )}
    </div>
  );
};

export default LoadingScreen;



