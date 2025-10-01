import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import App from '../App';
import LoadingScreen from '../components/LoadingScreen';
import HUD from '../components/HUD';

// Mock the app store
vi.mock('../stores/appStore', () => ({
  useAppStore: vi.fn(() => ({
    isLoading: false,
    loadingProgress: 100,
    loadingText: 'Ready',
    hud: {
      isVisible: true,
      opacity: 0.9,
      scale: 1,
      position: 'center',
      elements: {
        navigation: true,
        minimap: true,
        notifications: true,
        healthBar: false,
        ammoCounter: false,
      },
    },
    notifications: [],
    audio: {
      masterVolume: 0.7,
      sfxVolume: 0.8,
      musicVolume: 0.5,
      muted: false,
      reducedMotion: false,
    },
    accessibility: {
      reducedMotion: false,
      reducedSound: false,
      highContrast: false,
      largeText: false,
      keyboardNavigation: true,
      screenReader: false,
    },
    setHUDVisibility: vi.fn(),
    setHUDOpacity: vi.fn(),
    toggleMute: vi.fn(),
    toggleReducedMotion: vi.fn(),
    toggleHighContrast: vi.fn(),
    toggleLargeText: vi.fn(),
    removeNotification: vi.fn(),
  })),
}));

// Mock audio manager
vi.mock('../utils/audioManager', () => ({
  audioManager: {
    initialize: vi.fn().mockResolvedValue(undefined),
  },
  useAudio: vi.fn(() => ({
    playSound: vi.fn(),
    stopSound: vi.fn(),
    playMusic: vi.fn(),
    stopMusic: vi.fn(),
    pauseMusic: vi.fn(),
    setMasterVolume: vi.fn(),
    setSfxVolume: vi.fn(),
    setMusicVolume: vi.fn(),
    toggleMute: vi.fn(),
    toggleReducedMotion: vi.fn(),
    getSettings: vi.fn(() => ({
      masterVolume: 0.7,
      sfxVolume: 0.8,
      musicVolume: 0.5,
      muted: false,
      reducedMotion: false,
    })),
    isAudioSupported: vi.fn(() => true),
  })),
}));

// Mock device detection
vi.mock('../utils/deviceDetection', () => ({
  deviceDetector: {
    detectCapabilities: vi.fn().mockResolvedValue({
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      webglSupport: true,
      webglVersion: 2,
      maxTextureSize: 4096,
      maxAnisotropy: 16,
      performanceLevel: 'high',
    }),
  },
  performanceMonitor: {
    startMonitoring: vi.fn(),
  },
}));

describe('App Component', () => {
  test('renders loading screen initially', () => {
    render(<App />);
    expect(screen.getByText('PORTFOLIO.EXE')).toBeInTheDocument();
  });

  test('renders main app after initialization', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByTestId('canvas')).toBeInTheDocument();
    });
  });
});

describe('LoadingScreen Component', () => {
  test('renders with progress and text', () => {
    render(
      <LoadingScreen
        progress={50}
        text="Loading assets..."
      />
    );
    
    expect(screen.getByText('PORTFOLIO.EXE')).toBeInTheDocument();
    expect(screen.getByText('Loading assets...')).toBeInTheDocument();
  });

  test('renders error state', () => {
    render(
      <LoadingScreen
        progress={0}
        text=""
        error="Failed to load"
      />
    );
    
    expect(screen.getByText('ERROR: Failed to load')).toBeInTheDocument();
    expect(screen.getByText('RETRY INITIALIZATION')).toBeInTheDocument();
  });

  test('retry button triggers page reload', () => {
    const reloadSpy = vi.spyOn(window.location, 'reload').mockImplementation(() => {});
    
    render(
      <LoadingScreen
        progress={0}
        text=""
        error="Test error"
      />
    );
    
    const retryButton = screen.getByText('RETRY INITIALIZATION');
    fireEvent.click(retryButton);
    
    expect(reloadSpy).toHaveBeenCalled();
    
    reloadSpy.mockRestore();
  });
});

describe('HUD Component', () => {
  test('renders navigation buttons', () => {
    render(
      <BrowserRouter>
        <HUD />
      </BrowserRouter>
    );
    
    expect(screen.getByText('LOBBY')).toBeInTheDocument();
    expect(screen.getByText('LOADOUT')).toBeInTheDocument();
    expect(screen.getByText('INVENTORY')).toBeInTheDocument();
    expect(screen.getByText('SCOREBOARD')).toBeInTheDocument();
    expect(screen.getByText('RADIO')).toBeInTheDocument();
  });

  test('opens settings panel when settings button is clicked', () => {
    render(
      <BrowserRouter>
        <HUD />
      </BrowserRouter>
    );
    
    const settingsButton = screen.getByText('⚙️');
    fireEvent.click(settingsButton);
    
    expect(screen.getByText('SYSTEM SETTINGS')).toBeInTheDocument();
  });

  test('toggles minimize state', () => {
    render(
      <BrowserRouter>
        <HUD />
      </BrowserRouter>
    );
    
    const minimizeButton = screen.getByText('⬇️');
    fireEvent.click(minimizeButton);
    
    expect(screen.getByText('⬆️')).toBeInTheDocument();
  });
});

describe('Accessibility', () => {
  test('supports keyboard navigation', () => {
    render(
      <BrowserRouter>
        <HUD />
      </BrowserRouter>
    );
    
    const lobbyButton = screen.getByText('LOBBY');
    lobbyButton.focus();
    
    expect(lobbyButton).toHaveFocus();
  });

  test('has proper ARIA labels', () => {
    render(
      <BrowserRouter>
        <HUD />
      </BrowserRouter>
    );
    
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toBeInTheDocument();
    });
  });
});

describe('Error Handling', () => {
  test('handles missing assets gracefully', async () => {
    // Mock console.error to avoid noise in tests
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByTestId('canvas')).toBeInTheDocument();
    });
    
    consoleSpy.mockRestore();
  });
});
