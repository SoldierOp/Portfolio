import React, { useEffect, useRef, useState } from 'react';

/**
 * GOOSEBUMP-INDUCING MATRIX RAIN EFFECT
 * This will absolutely SHOCK anyone who sees it!
 */
const MatrixRain: React.FC<{ isActive: boolean; onComplete: () => void }> = ({ isActive, onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showSecret, setShowSecret] = useState(false);
  const [secretMessage, setSecretMessage] = useState('');

  // Matrix characters for the rain effect
  const matrixChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
  const codeSnippets = [
    'const matrix = new Matrix();',
    'matrix.rain(); // INITIATING...',
    'status: MATRIX_ACTIVE ✓',
    'console.log("Welcome to the Matrix");',
    'if (user.isReady()) {',
    '  showSecret();',
    '}',
    '// You found the secret!',
    '// This portfolio is powered by pure magic ✨',
    '// Welcome to the future of web development!',
  ];

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const columns: HTMLDivElement[] = [];

    // Create matrix columns
    const createMatrixColumn = (x: number) => {
      const column = document.createElement('div');
      column.className = 'matrix-column';
      column.style.left = `${x}px`;
      column.style.animationDuration = `${Math.random() * 3 + 2}s`;
      column.style.animationDelay = `${Math.random() * 2}s`;
      
      // Generate random characters
      const charCount = Math.floor(Math.random() * 20) + 10;
      for (let i = 0; i < charCount; i++) {
        const char = document.createElement('div');
        char.className = 'matrix-character';
        char.textContent = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        char.style.color = Math.random() > 0.8 ? '#00ff88' : '#0088ff';
        column.appendChild(char);
      }
      
      container.appendChild(column);
      columns.push(column);
    };

    // Create columns across the screen
    const screenWidth = window.innerWidth;
    const columnWidth = 20;
    const columnCount = Math.floor(screenWidth / columnWidth);
    
    for (let i = 0; i < columnCount; i++) {
      createMatrixColumn(i * columnWidth);
    }

    // Show secret message after 3 seconds
    const secretTimer = setTimeout(() => {
      setShowSecret(true);
      setSecretMessage(codeSnippets[Math.floor(Math.random() * codeSnippets.length)]);
    }, 3000);

    // Clean up after 8 seconds
    const cleanupTimer = setTimeout(() => {
      setShowSecret(false);
      columns.forEach(col => col.remove());
      onComplete();
    }, 8000);

    return () => {
      clearTimeout(secretTimer);
      clearTimeout(cleanupTimer);
      columns.forEach(col => col.remove());
    };
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <>
      <div ref={containerRef} className="matrix-rain-overlay" />
      {showSecret && (
        <div className="secret-message">
          <div className="animate-glow">{secretMessage}</div>
          <div className="text-sm mt-2 animate-pulse">Press ESC to exit</div>
        </div>
      )}
    </>
  );
};

export default MatrixRain;



