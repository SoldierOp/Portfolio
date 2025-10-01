import React, { useEffect } from 'react';
import { useAppStore } from '@stores/appStore';
import { useLocation } from 'react-router-dom';

/**
 * Global Click Handler Component
 * Removes scan line animation when user clicks anywhere on the screen
 * Only works on the home page (LobbyScene)
 */
const GlobalClickHandler: React.FC = () => {
  const { showScanLine, setScanLineVisibility } = useAppStore();
  const location = useLocation();
  
  // Only enable click handler on home page
  const isHomePage = location.pathname === '/' || location.pathname === '/lobby';

  useEffect(() => {
    if (!isHomePage) return;
    
    const handleGlobalClick = (_event: MouseEvent) => {
      if (showScanLine) {
        console.log('🎯 Scan line disabled by click on home page!');
        setScanLineVisibility(false);
      }
    };

    // Add click event listener to the document
    document.addEventListener('click', handleGlobalClick, { once: false });

    // Cleanup function
    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, [showScanLine, setScanLineVisibility, isHomePage]);

  // This component doesn't render anything
  return null;
};

export default GlobalClickHandler;
