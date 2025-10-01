import '@testing-library/jest-dom';
import { vi } from 'vitest';
import React from 'react';

// Mock WebGL context for testing
const mockWebGLContext = {
  getParameter: vi.fn((param) => {
    switch (param) {
      case 3379: // MAX_TEXTURE_SIZE
        return 4096;
      case 34047: // MAX_TEXTURE_MAX_ANISOTROPY_EXT
        return 16;
      default:
        return 0;
    }
  }),
  getExtension: vi.fn((name) => {
    if (name === 'EXT_texture_filter_anisotropic') {
      return {
        MAX_TEXTURE_MAX_ANISOTROPY_EXT: 34047,
      };
    }
    return null;
  }),
};

// Mock canvas
HTMLCanvasElement.prototype.getContext = vi.fn((contextType) => {
  if (contextType === 'webgl' || contextType === 'webgl2') {
    return mockWebGLContext;
  }
  return null;
});

// Mock performance API
Object.defineProperty(window, 'performance', {
  value: {
    now: vi.fn(() => Date.now()),
    memory: {
      usedJSHeapSize: 1000000,
      totalJSHeapSize: 2000000,
      jsHeapSizeLimit: 4000000,
    },
  },
  writable: true,
});

// Mock Howler.js
vi.mock('howler', () => ({
  Howl: vi.fn().mockImplementation(() => ({
    play: vi.fn(),
    stop: vi.fn(),
    pause: vi.fn(),
    volume: vi.fn(),
    loop: vi.fn(),
    unload: vi.fn(),
  })),
  Howler: {
    volume: vi.fn(),
    mute: vi.fn(),
    ctx: mockWebGLContext,
  },
}));

// Mock Three.js
vi.mock('three', () => ({
  ...vi.importActual('three'),
  WebGLRenderer: vi.fn().mockImplementation(() => ({
    setSize: vi.fn(),
    render: vi.fn(),
    dispose: vi.fn(),
  })),
}));

// Mock react-three-fiber
vi.mock('@react-three/fiber', () => ({
  Canvas: ({ children }: { children: React.ReactNode }) => <div data-testid="canvas">{children}</div>,
  useFrame: vi.fn(),
  useThree: vi.fn(() => ({
    scene: {},
    camera: {},
    gl: {},
  })),
}));

// Mock react-three-drei
vi.mock('@react-three/drei', () => ({
  Environment: () => <div data-testid="environment" />,
  OrbitControls: () => <div data-testid="orbit-controls" />,
  Text: () => <div data-testid="text" />,
  Box: () => <div data-testid="box" />,
  Sphere: () => <div data-testid="sphere" />,
  MeshDistortMaterial: () => <div data-testid="mesh-distort-material" />,
  ContactShadows: () => <div data-testid="contact-shadows" />,
  Float: ({ children }: { children: React.ReactNode }) => <div data-testid="float">{children}</div>,
  Html: ({ children }: { children: React.ReactNode }) => <div data-testid="html">{children}</div>,
}));

// Mock zustand
vi.mock('zustand', () => ({
  create: vi.fn(() => vi.fn()),
}));

// Global test setup
beforeEach(() => {
  // Clear all mocks before each test
  vi.clearAllMocks();
});

// Suppress console warnings during tests
const originalWarn = console.warn;
const originalError = console.error;

beforeAll(() => {
  console.warn = vi.fn();
  console.error = vi.fn();
});

afterAll(() => {
  console.warn = originalWarn;
  console.error = originalError;
});
