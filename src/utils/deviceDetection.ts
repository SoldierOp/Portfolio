import type { DeviceCapabilities } from '../types/index';

/**
 * Detects device capabilities and performance characteristics
 * Used to determine optimal rendering settings and fallbacks
 */
export class DeviceDetector {
  private static instance: DeviceDetector;
  private capabilities: DeviceCapabilities | null = null;

  private constructor() {}

  public static getInstance(): DeviceDetector {
    if (!DeviceDetector.instance) {
      DeviceDetector.instance = new DeviceDetector();
    }
    return DeviceDetector.instance;
  }

  /**
   * Detect all device capabilities
   */
  public async detectCapabilities(): Promise<DeviceCapabilities> {
    if (this.capabilities) {
      return this.capabilities;
    }

    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    const isTablet = /ipad|android(?!.*mobile)/i.test(userAgent);
    const isDesktop = !isMobile && !isTablet;

    // WebGL detection
    const webglSupport = this.detectWebGLSupport();
    const webglVersion = webglSupport ? this.getWebGLVersion() : 1;

    // Performance characteristics
    const performanceLevel = this.determinePerformanceLevel(isMobile, isTablet, isDesktop, webglVersion);

    // Memory info (if available)
    const memoryInfo = this.getMemoryInfo();

    // WebGL limits
    const { maxTextureSize, maxAnisotropy } = this.getWebGLLimits();

    this.capabilities = {
      isMobile,
      isTablet,
      isDesktop,
      webglSupport,
      webglVersion,
      maxTextureSize,
      maxAnisotropy,
      performanceLevel,
      memoryInfo,
    };

    return this.capabilities;
  }

  /**
   * Detect WebGL support
   */
  private detectWebGLSupport(): boolean {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      return !!gl;
    } catch (e) {
      return false;
    }
  }

  /**
   * Get WebGL version
   */
  private getWebGLVersion(): 1 | 2 {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2');
      return gl ? 2 : 1;
    } catch (e) {
      return 1;
    }
  }

  /**
   * Get WebGL limits
   */
  private getWebGLLimits(): { maxTextureSize: number; maxAnisotropy: number } {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('webgl2');
      
      if (!gl) {
        return { maxTextureSize: 1024, maxAnisotropy: 1 };
      }

      const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
      const maxAnisotropy = gl.getExtension('EXT_texture_filter_anisotropic') 
        ? gl.getParameter(gl.getExtension('EXT_texture_filter_anisotropic')!.MAX_TEXTURE_MAX_ANISOTROPY_EXT)
        : 1;

      return { maxTextureSize, maxAnisotropy };
    } catch (e) {
      return { maxTextureSize: 1024, maxAnisotropy: 1 };
    }
  }

  /**
   * Get memory information (if available)
   */
  private getMemoryInfo(): DeviceCapabilities['memoryInfo'] {
    try {
      // @ts-ignore - memory API is experimental
      if ('memory' in performance) {
        // @ts-ignore
        const memory = performance.memory;
        return {
          usedJSHeapSize: (memory as any).usedJSHeapSize,
          totalJSHeapSize: (memory as any).totalJSHeapSize,
          jsHeapSizeLimit: (memory as any).jsHeapSizeLimit,
        };
      }
    } catch (e) {
      // Memory API not available
    }
    return undefined;
  }

  /**
   * Determine performance level based on device characteristics
   */
  private determinePerformanceLevel(
    isMobile: boolean,
    isTablet: boolean,
    isDesktop: boolean,
    webglVersion: 1 | 2
  ): DeviceCapabilities['performanceLevel'] {
    // Mobile devices - conservative settings
    if (isMobile) {
      return 'low';
    }

    // Tablets - medium settings
    if (isTablet) {
      return 'medium';
    }

    // Desktop with WebGL 2 - high settings
    if (isDesktop && webglVersion === 2) {
      return 'high';
    }

    // Desktop with WebGL 1 - medium settings
    if (isDesktop && webglVersion === 1) {
      return 'medium';
    }

    // Fallback
    return 'low';
  }

  /**
   * Check if device supports specific features
   */
  public supportsFeature(feature: string): boolean {
    switch (feature) {
      case 'webgl2':
        return this.capabilities?.webglVersion === 2;
      case 'webgl':
        return this.capabilities?.webglSupport === true;
      case 'anisotropic':
        return (this.capabilities?.maxAnisotropy || 0) > 1;
      case 'large-textures':
        return (this.capabilities?.maxTextureSize || 0) >= 4096;
      case 'memory-api':
        return this.capabilities?.memoryInfo !== undefined;
      default:
        return false;
    }
  }

  /**
   * Get recommended settings for current device
   */
  public getRecommendedSettings() {
    const perf = this.capabilities?.performanceLevel || 'low';
    
    switch (perf) {
      case 'ultra':
        return {
          maxParticles: 5000,
          shadowMapSize: 2048,
          textureQuality: 'high',
          enablePostProcessing: true,
          enableVolumetricFog: true,
          enableBloom: true,
          enableDOF: true,
        };
      case 'high':
        return {
          maxParticles: 2000,
          shadowMapSize: 1024,
          textureQuality: 'high',
          enablePostProcessing: true,
          enableVolumetricFog: true,
          enableBloom: true,
          enableDOF: false,
        };
      case 'medium':
        return {
          maxParticles: 1000,
          shadowMapSize: 512,
          textureQuality: 'medium',
          enablePostProcessing: true,
          enableVolumetricFog: false,
          enableBloom: true,
          enableDOF: false,
        };
      case 'low':
      default:
        return {
          maxParticles: 500,
          shadowMapSize: 256,
          textureQuality: 'low',
          enablePostProcessing: false,
          enableVolumetricFog: false,
          enableBloom: false,
          enableDOF: false,
        };
    }
  }

  /**
   * Reset detection (for testing)
   */
  public reset(): void {
    this.capabilities = null;
  }
}

/**
 * Performance monitoring utilities
 */
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number[]> = new Map();
  private observers: PerformanceObserver[] = [];

  private constructor() {}

  public static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  /**
   * Start monitoring performance
   */
  public startMonitoring(): void {
    // Monitor frame rate
    this.startFrameRateMonitoring();
    
    // Monitor memory usage
    this.startMemoryMonitoring();
    
    // Monitor WebGL performance
    this.startWebGLMonitoring();
  }

  /**
   * Stop monitoring
   */
  public stopMonitoring(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }

  /**
   * Monitor frame rate
   */
  private startFrameRateMonitoring(): void {
    let lastTime = performance.now();
    let frameCount = 0;
    
    const measureFrameRate = () => {
      const currentTime = performance.now();
      frameCount++;
      
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        this.recordMetric('fps', fps);
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(measureFrameRate);
    };
    
    requestAnimationFrame(measureFrameRate);
  }

  /**
   * Monitor memory usage
   */
  private startMemoryMonitoring(): void {
    if ('memory' in performance) {
      const monitorMemory = () => {
        // @ts-ignore
        const memory = performance.memory;
        this.recordMetric('memory-used', memory.usedJSHeapSize / 1024 / 1024); // MB
        this.recordMetric('memory-total', memory.totalJSHeapSize / 1024 / 1024); // MB
        
        setTimeout(monitorMemory, 5000); // Check every 5 seconds
      };
      
      monitorMemory();
    }
  }

  /**
   * Monitor WebGL performance
   */
  private startWebGLMonitoring(): void {
    // This would be implemented with WebGL context monitoring
    // For now, we'll just track basic metrics
  }

  /**
   * Record a performance metric
   */
  public recordMetric(name: string, value: number): void {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }
    
    const values = this.metrics.get(name)!;
    values.push(value);
    
    // Keep only last 100 measurements
    if (values.length > 100) {
      values.shift();
    }
  }

  /**
   * Get average metric value
   */
  public getAverageMetric(name: string): number {
    const values = this.metrics.get(name);
    if (!values || values.length === 0) return 0;
    
    return values.reduce((sum, value) => sum + value, 0) / values.length;
  }

  /**
   * Get current performance status
   */
  public getPerformanceStatus(): 'good' | 'warning' | 'critical' {
    const avgFps = this.getAverageMetric('fps');
    const avgMemory = this.getAverageMetric('memory-used');
    
    if (avgFps < 30 || avgMemory > 500) {
      return 'critical';
    } else if (avgFps < 45 || avgMemory > 300) {
      return 'warning';
    } else {
      return 'good';
    }
  }
}

// Export singleton instances
export const deviceDetector = DeviceDetector.getInstance();
export const performanceMonitor = PerformanceMonitor.getInstance();



