import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { 
  AppState, 
  NavigationState, 
  AudioSettings, 
  DeviceCapabilities, 
  SceneSettings, 
  HUDState, 
  AccessibilitySettings, 
  Notification, 
  AppError,
  Route 
} from '../types/index';

interface AppStore extends AppState {
  // Scan line visibility
  showScanLine: boolean;
  setScanLineVisibility: (visible: boolean) => void;
  
  // Navigation actions
  setCurrentRoute: (route: Route) => void;
  setTransitioning: (isTransitioning: boolean) => void;
  
  // Audio actions
  setMasterVolume: (volume: number) => void;
  setSfxVolume: (volume: number) => void;
  setMusicVolume: (volume: number) => void;
  toggleMute: () => void;
  
  // Device and performance actions
  setDeviceCapabilities: (capabilities: DeviceCapabilities) => void;
  setPerformanceLevel: (level: DeviceCapabilities['performanceLevel']) => void;
  
  // Scene settings actions
  setSceneQuality: (quality: SceneSettings['quality']) => void;
  toggleShadows: () => void;
  toggleBloom: () => void;
  toggleDOF: () => void;
  toggleVolumetricFog: () => void;
  toggleParticles: () => void;
  
  // HUD actions
  setHUDVisibility: (visible: boolean) => void;
  setHUDOpacity: (opacity: number) => void;
  setHUDScale: (scale: number) => void;
  
  // Accessibility actions
  toggleReducedMotion: () => void;
  toggleReducedSound: () => void;
  toggleHighContrast: () => void;
  toggleLargeText: () => void;
  
  // Notification actions
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  
  // Error handling
  addError: (error: Omit<AppError, 'timestamp'>) => void;
  clearErrors: () => void;
  
  // Loading state
  setLoading: (loading: boolean) => void;
  setLoadingProgress: (progress: number) => void;
  setLoadingText: (text: string) => void;
}

const initialNavigationState: NavigationState = {
  currentRoute: 'lobby',
  isTransitioning: false,
  transitionType: 'camera',
};

const initialAudioSettings: AudioSettings = {
  masterVolume: 0.7,
  sfxVolume: 0.8,
  musicVolume: 0.5,
  muted: false,
  reducedMotion: false,
};

const initialDeviceCapabilities: DeviceCapabilities = {
  isMobile: false,
  isTablet: false,
  isDesktop: true,
  webglSupport: true,
  webglVersion: 2,
  maxTextureSize: 4096,
  maxAnisotropy: 16,
  performanceLevel: 'high',
};

const initialSceneSettings: SceneSettings = {
  quality: 'high',
  enableShadows: true,
  enableBloom: true,
  enableDOF: true,
  enableVolumetricFog: true,
  enableParticles: true,
  maxParticles: 1000,
  lodDistance: 50,
  textureCompression: 'webp',
};

const initialHUDState: HUDState = {
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
};

const initialAccessibilitySettings: AccessibilitySettings = {
  reducedMotion: false,
  reducedSound: false,
  highContrast: false,
  largeText: false,
  keyboardNavigation: true,
  screenReader: false,
};

export const useAppStore = create<AppStore>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        showScanLine: true, // Show scan line by default on page load
        navigation: initialNavigationState,
        audio: initialAudioSettings,
        device: initialDeviceCapabilities,
        scene: initialSceneSettings,
        hud: initialHUDState,
        accessibility: initialAccessibilitySettings,
        notifications: [],
        errors: [],
        isLoading: true,
        loadingProgress: 0,
        loadingText: 'Initializing systems...',

        // Scan line actions
        setScanLineVisibility: (visible: boolean) => {
          set({ showScanLine: visible });
        },

        // Navigation actions
        setCurrentRoute: (route: Route) => {
          const currentRoute = get().navigation.currentRoute;
          set((state) => ({
            navigation: {
              ...state.navigation,
              previousRoute: currentRoute,
              currentRoute: route,
            },
          }));
        },

        setTransitioning: (isTransitioning: boolean) => {
          set((state) => ({
            navigation: {
              ...state.navigation,
              isTransitioning,
            },
          }));
        },

        // Audio actions
        setMasterVolume: (volume: number) => {
          set((state) => ({
            audio: {
              ...state.audio,
              masterVolume: Math.max(0, Math.min(1, volume)),
            },
          }));
        },

        setSfxVolume: (volume: number) => {
          set((state) => ({
            audio: {
              ...state.audio,
              sfxVolume: Math.max(0, Math.min(1, volume)),
            },
          }));
        },

        setMusicVolume: (volume: number) => {
          set((state) => ({
            audio: {
              ...state.audio,
              musicVolume: Math.max(0, Math.min(1, volume)),
            },
          }));
        },

        toggleMute: () => {
          set((state) => ({
            audio: {
              ...state.audio,
              muted: !state.audio.muted,
            },
          }));
        },

        // Device and performance actions
        setDeviceCapabilities: (capabilities: DeviceCapabilities) => {
          set({ device: capabilities });
        },

        setPerformanceLevel: (level: DeviceCapabilities['performanceLevel']) => {
          set((state) => ({
            device: {
              ...state.device,
              performanceLevel: level,
            },
          }));
        },

        // Scene settings actions
        setSceneQuality: (quality: SceneSettings['quality']) => {
          set((state) => ({
            scene: {
              ...state.scene,
              quality,
            },
          }));
        },

        toggleShadows: () => {
          set((state) => ({
            scene: {
              ...state.scene,
              enableShadows: !state.scene.enableShadows,
            },
          }));
        },

        toggleBloom: () => {
          set((state) => ({
            scene: {
              ...state.scene,
              enableBloom: !state.scene.enableBloom,
            },
          }));
        },

        toggleDOF: () => {
          set((state) => ({
            scene: {
              ...state.scene,
              enableDOF: !state.scene.enableDOF,
            },
          }));
        },

        toggleVolumetricFog: () => {
          set((state) => ({
            scene: {
              ...state.scene,
              enableVolumetricFog: !state.scene.enableVolumetricFog,
            },
          }));
        },

        toggleParticles: () => {
          set((state) => ({
            scene: {
              ...state.scene,
              enableParticles: !state.scene.enableParticles,
            },
          }));
        },

        // HUD actions
        setHUDVisibility: (visible: boolean) => {
          set((state) => ({
            hud: {
              ...state.hud,
              isVisible: visible,
            },
          }));
        },

        setHUDOpacity: (opacity: number) => {
          set((state) => ({
            hud: {
              ...state.hud,
              opacity: Math.max(0, Math.min(1, opacity)),
            },
          }));
        },

        setHUDScale: (scale: number) => {
          set((state) => ({
            hud: {
              ...state.hud,
              scale: Math.max(0.5, Math.min(2, scale)),
            },
          }));
        },

        // Accessibility actions
        toggleReducedMotion: () => {
          set((state) => ({
            accessibility: {
              ...state.accessibility,
              reducedMotion: !state.accessibility.reducedMotion,
            },
          }));
        },

        toggleReducedSound: () => {
          set((state) => ({
            accessibility: {
              ...state.accessibility,
              reducedSound: !state.accessibility.reducedSound,
            },
          }));
        },

        toggleHighContrast: () => {
          set((state) => ({
            accessibility: {
              ...state.accessibility,
              highContrast: !state.accessibility.highContrast,
            },
          }));
        },

        toggleLargeText: () => {
          set((state) => ({
            accessibility: {
              ...state.accessibility,
              largeText: !state.accessibility.largeText,
            },
          }));
        },

        // Notification actions
        addNotification: (notification) => {
          const newNotification: Notification = {
            ...notification,
            id: `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            timestamp: Date.now(),
          };
          
          set((state) => ({
            notifications: [...state.notifications, newNotification],
          }));

          // Auto-remove notification after duration
          if (notification.duration > 0) {
            setTimeout(() => {
              get().removeNotification(newNotification.id);
            }, notification.duration);
          }
        },

        removeNotification: (id: string) => {
          set((state) => ({
            notifications: state.notifications.filter((n) => n.id !== id),
          }));
        },

        clearNotifications: () => {
          set({ notifications: [] });
        },

        // Error handling
        addError: (error) => {
          const newError: AppError = {
            ...error,
            timestamp: Date.now(),
          };
          
          set((state) => ({
            errors: [...state.errors, newError],
          }));

          // Log error to console
          console.error('App Error:', newError);
        },

        clearErrors: () => {
          set({ errors: [] });
        },

        // Loading state
        setLoading: (loading: boolean) => {
          set({ isLoading: loading });
        },

        setLoadingProgress: (progress: number) => {
          set({ loadingProgress: Math.max(0, Math.min(100, progress)) });
        },

        setLoadingText: (text: string) => {
          set({ loadingText: text });
        },
      }),
      {
        name: 'hyperrealistic-portfolio-storage',
        partialize: (state) => ({
          audio: state.audio,
          accessibility: state.accessibility,
          scene: state.scene,
          hud: state.hud,
        }),
      }
    ),
    {
      name: 'hyperrealistic-portfolio-store',
    }
  )
);

