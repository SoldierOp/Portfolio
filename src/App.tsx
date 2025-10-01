import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';

// Components
import LoadingScreen from '@components/LoadingScreen';
import HUD from '@components/HUD';
import CustomCursor from '@components/CustomCursor';
import Header from '@components/Header';
import Footer from '@components/Footer';
import InteractiveBackground from '@components/InteractiveBackground';
import NavigationGuide from '@components/NavigationGuide';
import ErrorBoundary from '@components/ErrorBoundary';
import GlobalClickHandler from '@components/GlobalClickHandler';

// Scenes
import LobbyScene from '@scenes/LobbyScene';
import LoadoutScene from '@scenes/LoadoutScene';
import InventoryScene from '@scenes/InventoryScene';
import ScoreboardScene from '@scenes/ScoreboardScene';
import RadioScene from '@scenes/RadioScene';
import AssetViewerScene from '@scenes/AssetViewerScene';

// Styles
import './App.css';

/**
 * Main App component with routing and global state management
 */
const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing System...');

  useEffect(() => {
    // Smooth loading process
    const loadingSteps = [
      { text: 'Initializing System...', progress: 20, delay: 300 },
      { text: 'Loading 3D Engine...', progress: 40, delay: 600 },
      { text: 'Preparing Assets...', progress: 60, delay: 900 },
      { text: 'Optimizing Performance...', progress: 80, delay: 1200 },
      { text: 'Ready for Launch', progress: 100, delay: 1500 },
    ];

    let currentStep = 0;
    
    const loadStep = () => {
      if (currentStep < loadingSteps.length) {
        const step = loadingSteps[currentStep];
        setLoadingText(step.text);
        setLoadingProgress(step.progress);
        currentStep++;
        
        setTimeout(() => {
          if (currentStep === loadingSteps.length) {
            setTimeout(() => {
              setIsLoading(false);
            }, 500);
          } else {
            loadStep();
          }
        }, step.delay - (currentStep > 0 ? loadingSteps[currentStep - 1].delay : 0));
      }
    };

    loadStep();
  }, []);

  if (isLoading) {
    return (
      <LoadingScreen
        progress={loadingProgress}
        text={loadingText}
        error={null}
      />
    );
  }

  return (
    <ErrorBoundary>
      <Router>
        <div className="app">
          {/* Global Click Handler */}
          <GlobalClickHandler />
          
          {/* Custom Cursor */}
          <CustomCursor />
          
          {/* Header */}
          <Header />
          
          {/* Main 3D Canvas */}
          <Canvas
            className="main-canvas"
            camera={{
              position: [0, 0, 5],
              fov: 75,
              near: 0.1,
              far: 1000,
            }}
            gl={{
              antialias: window.innerWidth > 768,
              alpha: true,
              powerPreference: "high-performance",
            }}
            dpr={window.innerWidth < 768 ? 0.5 : window.innerWidth < 1024 ? 0.75 : 1}
            performance={{ 
              min: window.innerWidth < 480 ? 0.2 : window.innerWidth < 768 ? 0.3 : window.innerWidth < 1024 ? 0.4 : 0.5 
            }}
            style={{ touchAction: 'none' }}
          >
            <Suspense fallback={null}>
              {/* Interactive Background */}
              <InteractiveBackground />
              
              <Routes>
                <Route path="/" element={<Navigate to="/lobby" replace />} />
                <Route path="/lobby" element={<LobbyScene />} />
                <Route path="/loadout" element={<LoadoutScene />} />
                <Route path="/inventory" element={<InventoryScene />} />
                <Route path="/scoreboard" element={<ScoreboardScene />} />
                <Route path="/radio" element={<RadioScene />} />
                <Route path="/asset-viewer" element={<AssetViewerScene />} />
              </Routes>
            </Suspense>
          </Canvas>

          {/* HUD Overlay */}
          <HUD />
          
          {/* Navigation Guide */}
          <NavigationGuide />
          
          {/* Footer */}
          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  );
};

export default App;