import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAudio } from '@utils/audioManager';
import { useAppStore } from '@stores/appStore';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import TacticalBackground from '@components/TacticalBackground';

/**
 * Login page with tactical design
 */
const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { playSound } = useAudio();
  const { addNotification } = useAppStore();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    playSound('ui-click');

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      addNotification({
        type: 'success',
        title: 'LOGIN SUCCESSFUL',
        message: 'Welcome to PORTFOLIO.EXE',
        duration: 3000,
      });
      navigate('/lobby');
    }, 1500);
  };

  const handleBackToLobby = () => {
    playSound('ui-click');
    navigate('/lobby');
  };

  return (
    <div className="min-h-screen bg-tactical-darker flex items-center justify-center p-4 relative overflow-hidden">
      {/* 3D Background Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{
            position: [0, 0, 5],
            fov: 75,
            near: 0.1,
            far: 1000,
          }}
          gl={{
            antialias: true,
            alpha: true,
          }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.2} />
            <directionalLight position={[5, 5, 5]} intensity={0.8} />
            <pointLight position={[-5, -5, -5]} intensity={0.3} color="#00ff88" />
            <pointLight position={[5, -5, -5]} intensity={0.3} color="#0088ff" />
            <TacticalBackground variant="login" />
          </Suspense>
        </Canvas>
      </div>

      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-tactical-primary opacity-10 rounded-full blur-3xl animate-tactical-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-holo-blue opacity-10 rounded-full blur-3xl animate-tactical-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-holo-green opacity-5 rounded-full blur-3xl animate-glow"></div>
        
        {/* Matrix-style background lines */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-px bg-tactical-primary animate-tactical-scan"></div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-tactical-primary animate-tactical-scan" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-0 left-0 w-px h-full bg-tactical-primary animate-tactical-scan" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute top-0 right-0 w-px h-full bg-tactical-primary animate-tactical-scan" style={{animationDelay: '1.5s'}}></div>
        </div>
      </div>

      {/* Login Form */}
      <div className="relative z-20 w-full max-w-md">
        <div className="glass-panel-tactical p-8 rounded-xl animate-tactical-pulse">
          {/* Enhanced Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-tactical-primary to-holo-green rounded-2xl flex items-center justify-center mx-auto mb-6 animate-glow">
              <span className="text-tactical-dark font-display font-bold text-3xl">P</span>
            </div>
            <h1 className="text-4xl font-display font-bold text-tactical-primary mb-3 animate-glow">
              PORTFOLIO.EXE
            </h1>
            <p className="text-tactical-secondary font-mono text-lg mb-2">
              SECURE ACCESS REQUIRED
            </p>
            <div className="flex justify-center space-x-4 text-sm font-mono">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-tactical-primary rounded-full animate-tactical-blink"></div>
                <span className="text-tactical-primary">ENCRYPTED</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-holo-green rounded-full animate-tactical-blink" style={{animationDelay: '0.5s'}}></div>
                <span className="text-holo-green">SECURE</span>
              </div>
            </div>
          </div>

          {/* Enhanced Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-tactical-primary font-mono text-sm font-bold mb-3">
                USERNAME
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-4 py-4 bg-tactical-gray border-2 border-tactical-primary rounded-lg text-white font-mono focus:outline-none focus:border-holo-green focus:ring-2 focus:ring-tactical-primary transition-all duration-300 interactive-element"
                placeholder="Enter username"
                required
                onFocus={() => playSound('ui-hover')}
              />
            </div>

            <div>
              <label className="block text-tactical-primary font-mono text-sm font-bold mb-3">
                PASSWORD
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-4 bg-tactical-gray border-2 border-tactical-primary rounded-lg text-white font-mono focus:outline-none focus:border-holo-green focus:ring-2 focus:ring-tactical-primary transition-all duration-300 interactive-element"
                placeholder="Enter password"
                required
                onFocus={() => playSound('ui-hover')}
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                className="w-5 h-5 text-tactical-primary bg-tactical-gray border-tactical-primary rounded focus:ring-tactical-primary focus:ring-2 interactive-element"
              />
              <label className="ml-3 text-tactical-secondary font-mono text-sm">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full tactical-button py-4 text-lg font-mono font-bold disabled:opacity-50 disabled:cursor-not-allowed interactive-element"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-5 h-5 border-2 border-tactical-dark border-t-transparent rounded-full animate-spin"></div>
                  <span>AUTHENTICATING...</span>
                </div>
              ) : (
                '🔐 LOGIN'
              )}
            </button>
          </form>

          {/* Enhanced Demo Credentials */}
          <div className="mt-8 p-6 bg-tactical-gray rounded-lg border border-tactical-primary">
            <div className="text-tactical-warning font-mono text-sm font-bold mb-3 animate-tactical-blink">
              DEMO CREDENTIALS:
            </div>
            <div className="text-tactical-secondary font-mono text-sm space-y-2">
              <div className="flex justify-between">
                <span>Username:</span>
                <span className="text-tactical-primary font-bold">demo</span>
              </div>
              <div className="flex justify-between">
                <span>Password:</span>
                <span className="text-tactical-primary font-bold">password</span>
              </div>
            </div>
          </div>

          {/* Enhanced Back Button */}
          <div className="mt-6 text-center">
            <button
              onClick={handleBackToLobby}
              className="text-tactical-secondary hover:text-tactical-primary font-mono text-sm transition-colors duration-200 interactive-element"
              onMouseEnter={() => playSound('ui-hover')}
            >
              ← Back to Portfolio
            </button>
          </div>
        </div>

        {/* Enhanced Security Notice */}
        <div className="mt-6 text-center">
          <div className="text-sm font-mono text-tactical-secondary animate-tactical-blink">
            🔒 SECURE CONNECTION • ENCRYPTED TRANSMISSION • SSL/TLS PROTECTED
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
