// Core application types and interfaces

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  previewMedia: {
    image: string;
    video?: string;
    gif?: string;
  };
  modelPath?: string; // Path to 3D model
  category: 'web' | 'mobile' | 'desktop' | 'game' | 'ai' | 'other';
  featured: boolean;
  year: number;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string;
  technologies: string[];
  achievements: string[];
  logo?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'mobile' | 'devops' | 'design' | 'other';
  level: number; // 1-100
  icon?: string;
  description?: string;
}

export interface ContactInfo {
  email: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  website?: string;
  phone?: string;
}

// Navigation and routing
export type Route = 'lobby' | 'loadout' | 'inventory' | 'scoreboard' | 'radio' | 'asset-viewer';

export interface NavigationState {
  currentRoute: Route;
  previousRoute?: Route;
  isTransitioning: boolean;
  transitionType: 'camera' | 'particle' | 'morph' | 'fade';
}

// Audio system
export interface AudioSettings {
  masterVolume: number;
  sfxVolume: number;
  musicVolume: number;
  muted: boolean;
  reducedMotion: boolean;
}

export interface SoundEffect {
  id: string;
  path: string;
  volume: number;
  loop: boolean;
  preload: boolean;
}

// Performance and device detection
export interface DeviceCapabilities {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  webglSupport: boolean;
  webglVersion: 1 | 2;
  maxTextureSize: number;
  maxAnisotropy: number;
  performanceLevel: 'ultra' | 'high' | 'medium' | 'low';
  memoryInfo?: {
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
  };
}

// 3D Scene and rendering
export interface SceneSettings {
  quality: 'ultra' | 'high' | 'medium' | 'low';
  enableShadows: boolean;
  enableBloom: boolean;
  enableDOF: boolean;
  enableVolumetricFog: boolean;
  enableParticles: boolean;
  maxParticles: number;
  lodDistance: number;
  textureCompression: 'basis' | 'webp' | 'png';
}

export interface CameraSettings {
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
  near: number;
  far: number;
  transitionDuration: number;
  easing: 'linear' | 'easeInOut' | 'easeIn' | 'easeOut' | 'spring';
}

// UI and HUD
export interface HUDState {
  isVisible: boolean;
  opacity: number;
  scale: number;
  position: 'top' | 'bottom' | 'left' | 'right' | 'center';
  elements: {
    navigation: boolean;
    minimap: boolean;
    notifications: boolean;
    healthBar: boolean;
    ammoCounter: boolean;
  };
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  duration: number;
  timestamp: number;
}

// Accessibility
export interface AccessibilitySettings {
  reducedMotion: boolean;
  reducedSound: boolean;
  highContrast: boolean;
  largeText: boolean;
  keyboardNavigation: boolean;
  screenReader: boolean;
}

// Animation and transitions
export interface TransitionConfig {
  type: 'camera' | 'particle' | 'morph' | 'fade' | 'slide';
  duration: number;
  easing: string;
  delay?: number;
  onComplete?: () => void;
}

export interface AnimationState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  progress: number;
}

// Particle systems
export interface ParticleConfig {
  count: number;
  lifetime: number;
  velocity: [number, number, number];
  acceleration: [number, number, number];
  size: number;
  color: string;
  opacity: number;
  texture?: string;
}

// Material and lighting
export interface MaterialConfig {
  type: 'standard' | 'physical' | 'toon' | 'custom';
  color: string;
  metalness: number;
  roughness: number;
  normalMap?: string;
  aoMap?: string;
  emissiveMap?: string;
  envMap?: string;
}

export interface LightConfig {
  type: 'directional' | 'point' | 'spot' | 'ambient';
  color: string;
  intensity: number;
  position?: [number, number, number];
  target?: [number, number, number];
  castShadow: boolean;
  shadowMapSize: number;
}

// Asset management
export interface AssetManifest {
  models: {
    [key: string]: {
      path: string;
      format: 'gltf' | 'glb' | 'fbx' | 'obj';
      size: number;
      lod?: string[];
    };
  };
  textures: {
    [key: string]: {
      path: string;
      format: 'jpg' | 'png' | 'webp' | 'basis';
      size: number;
      compression?: string;
    };
  };
  sounds: {
    [key: string]: {
      path: string;
      format: 'mp3' | 'ogg' | 'wav';
      size: number;
      duration: number;
    };
  };
  environments: {
    [key: string]: {
      path: string;
      format: 'hdr' | 'exr';
      size: number;
    };
  };
}

// Error handling
export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: number;
  stack?: string;
}

// Global application state
export interface AppState {
  navigation: NavigationState;
  audio: AudioSettings;
  device: DeviceCapabilities;
  scene: SceneSettings;
  hud: HUDState;
  accessibility: AccessibilitySettings;
  notifications: Notification[];
  errors: AppError[];
  isLoading: boolean;
  loadingProgress: number;
  loadingText: string;
}

// Component props interfaces
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
  'data-testid'?: string;
}

export interface ThreeComponentProps extends BaseComponentProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  visible?: boolean;
}

export interface InteractiveComponentProps extends BaseComponentProps {
  onClick?: () => void;
  onHover?: () => void;
  onFocus?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

// Event types
export interface CustomEvent<T = any> extends Event {
  detail: T;
}

export type AppEventType = 
  | 'route-change'
  | 'audio-toggle'
  | 'quality-change'
  | 'notification'
  | 'error'
  | 'loading-progress'
  | 'device-detected'
  | 'webgl-error'
  | 'asset-loaded'
  | 'transition-start'
  | 'transition-end';

export interface AppEvent<T = any> {
  type: AppEventType;
  data: T;
  timestamp: number;
}



