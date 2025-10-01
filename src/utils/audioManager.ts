import { Howl, Howler } from 'howler';
import type { AudioSettings, SoundEffect } from '../types/index';

/**
 * Audio manager using Howler.js for sound effects and music
 * Provides global audio controls and accessibility features
 */
export class AudioManager {
  private static instance: AudioManager;
  private sounds: Map<string, Howl> = new Map();
  private music: Howl | null = null;
  private settings: AudioSettings;
  private isInitialized = false;

  private constructor() {
    this.settings = {
      masterVolume: 0.7,
      sfxVolume: 0.8,
      musicVolume: 0.5,
      muted: false,
      reducedMotion: false,
    };
  }

  public static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  /**
   * Initialize the audio system
   */
  public async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Set global Howler settings
      Howler.volume(this.settings.masterVolume);
      Howler.mute(this.settings.muted);

      // Preload essential sound effects
      await this.preloadEssentialSounds();

      this.isInitialized = true;
      console.log('Audio system initialized successfully');
    } catch (error) {
      console.error('Failed to initialize audio system:', error);
      throw error;
    }
  }

  /**
   * Preload essential sound effects
   */
  private async preloadEssentialSounds(): Promise<void> {
    const essentialSounds: SoundEffect[] = [
      {
        id: 'ui-hover',
        path: '/assets/sounds/ui-hover.mp3',
        volume: 0.3,
        loop: false,
        preload: true,
      },
      {
        id: 'ui-click',
        path: '/assets/sounds/ui-click.mp3',
        volume: 0.4,
        loop: false,
        preload: true,
      },
      {
        id: 'ui-open',
        path: '/assets/sounds/ui-open.mp3',
        volume: 0.5,
        loop: false,
        preload: true,
      },
      {
        id: 'ui-close',
        path: '/assets/sounds/ui-close.mp3',
        volume: 0.5,
        loop: false,
        preload: true,
      },
      {
        id: 'transition-start',
        path: '/assets/sounds/transition-start.mp3',
        volume: 0.6,
        loop: false,
        preload: true,
      },
      {
        id: 'transition-end',
        path: '/assets/sounds/transition-end.mp3',
        volume: 0.6,
        loop: false,
        preload: true,
      },
      {
        id: 'notification',
        path: '/assets/sounds/notification.mp3',
        volume: 0.4,
        loop: false,
        preload: true,
      },
      {
        id: 'weapon-switch',
        path: '/assets/sounds/weapon-switch.mp3',
        volume: 0.7,
        loop: false,
        preload: true,
      },
    ];

    for (const soundConfig of essentialSounds) {
      await this.loadSound(soundConfig);
    }
  }

  /**
   * Load a sound effect
   */
  public async loadSound(soundConfig: SoundEffect): Promise<void> {
    return new Promise((resolve) => {
      const howl = new Howl({
        src: [soundConfig.path],
        volume: soundConfig.volume * this.settings.sfxVolume,
        loop: soundConfig.loop,
        preload: soundConfig.preload,
        onload: () => {
          this.sounds.set(soundConfig.id, howl);
          resolve();
        },
        onloaderror: (_id, _error) => {
          console.warn(`Failed to load sound ${soundConfig.id}:`, _error);
          // Create a silent placeholder to prevent errors
          const silentHowl = new Howl({
            src: ['data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA='],
            volume: 0,
          });
          this.sounds.set(soundConfig.id, silentHowl);
          resolve();
        },
      });
    });
  }

  /**
   * Play a sound effect
   */
  public playSound(soundId: string, options?: { volume?: number; loop?: boolean }): void {
    if (this.settings.muted || this.settings.reducedMotion) return;

    const sound = this.sounds.get(soundId);
    if (!sound) {
      console.warn(`Sound ${soundId} not found`);
      return;
    }

    const volume = options?.volume !== undefined 
      ? options.volume * this.settings.sfxVolume 
      : sound.volume();

    sound.volume(volume);
    sound.loop(options?.loop || false);
    sound.play();
  }

  /**
   * Stop a sound effect
   */
  public stopSound(soundId: string): void {
    const sound = this.sounds.get(soundId);
    if (sound) {
      sound.stop();
    }
  }

  /**
   * Load and play background music
   */
  public async loadMusic(path: string): Promise<void> {
    return new Promise((resolve) => {
      this.music = new Howl({
        src: [path],
        volume: this.settings.musicVolume,
        loop: true,
        preload: true,
        onload: () => resolve(),
        onloaderror: (_id, _error) => {
          console.warn('Failed to load music:', _error);
          resolve();
        },
      });
    });
  }

  /**
   * Play background music
   */
  public playMusic(): void {
    if (this.settings.muted || this.settings.reducedMotion) return;
    
    if (this.music) {
      this.music.play();
    }
  }

  /**
   * Stop background music
   */
  public stopMusic(): void {
    if (this.music) {
      this.music.stop();
    }
  }

  /**
   * Pause background music
   */
  public pauseMusic(): void {
    if (this.music) {
      this.music.pause();
    }
  }

  /**
   * Update audio settings
   */
  public updateSettings(newSettings: Partial<AudioSettings>): void {
    this.settings = { ...this.settings, ...newSettings };
    
    // Apply settings to Howler
    Howler.volume(this.settings.masterVolume);
    Howler.mute(this.settings.muted);

    // Update music volume
    if (this.music) {
      this.music.volume(this.settings.musicVolume);
    }

    // Update all sound volumes
    this.sounds.forEach((sound) => {
      const baseVolume = sound.volume() / this.settings.sfxVolume;
      sound.volume(baseVolume * this.settings.sfxVolume);
    });
  }

  /**
   * Get current audio settings
   */
  public getSettings(): AudioSettings {
    return { ...this.settings };
  }

  /**
   * Set master volume
   */
  public setMasterVolume(volume: number): void {
    this.settings.masterVolume = Math.max(0, Math.min(1, volume));
    Howler.volume(this.settings.masterVolume);
  }

  /**
   * Set SFX volume
   */
  public setSfxVolume(volume: number): void {
    this.settings.sfxVolume = Math.max(0, Math.min(1, volume));
    
    // Update all sound volumes
    this.sounds.forEach((sound) => {
      const baseVolume = sound.volume() / this.settings.sfxVolume;
      sound.volume(baseVolume * this.settings.sfxVolume);
    });
  }

  /**
   * Set music volume
   */
  public setMusicVolume(volume: number): void {
    this.settings.musicVolume = Math.max(0, Math.min(1, volume));
    
    if (this.music) {
      this.music.volume(this.settings.musicVolume);
    }
  }

  /**
   * Toggle mute
   */
  public toggleMute(): void {
    this.settings.muted = !this.settings.muted;
    Howler.mute(this.settings.muted);
  }

  /**
   * Toggle reduced motion (disables most audio)
   */
  public toggleReducedMotion(): void {
    this.settings.reducedMotion = !this.settings.reducedMotion;
    
    if (this.settings.reducedMotion) {
      // Stop all sounds and music
      this.sounds.forEach((sound) => sound.stop());
      if (this.music) {
        this.music.pause();
      }
    }
  }

  /**
   * Check if audio is supported
   */
  public isAudioSupported(): boolean {
    return Howler.ctx !== null;
  }

  /**
   * Get audio context (for advanced usage)
   */
  public getAudioContext(): AudioContext | null {
    return Howler.ctx;
  }

  /**
   * Clean up resources
   */
  public dispose(): void {
    this.sounds.forEach((sound) => sound.unload());
    this.sounds.clear();
    
    if (this.music) {
      this.music.unload();
      this.music = null;
    }
    
    this.isInitialized = false;
  }
}

// Export singleton instance
export const audioManager = AudioManager.getInstance();

/**
 * Hook for using audio manager in React components
 */
export const useAudio = () => {
  return {
    playSound: (soundId: string, options?: { volume?: number; loop?: boolean }) => 
      audioManager.playSound(soundId, options),
    stopSound: (soundId: string) => audioManager.stopSound(soundId),
    playMusic: () => audioManager.playMusic(),
    stopMusic: () => audioManager.stopMusic(),
    pauseMusic: () => audioManager.pauseMusic(),
    setMasterVolume: (volume: number) => audioManager.setMasterVolume(volume),
    setSfxVolume: (volume: number) => audioManager.setSfxVolume(volume),
    setMusicVolume: (volume: number) => audioManager.setMusicVolume(volume),
    toggleMute: () => audioManager.toggleMute(),
    toggleReducedMotion: () => audioManager.toggleReducedMotion(),
    getSettings: () => audioManager.getSettings(),
    isAudioSupported: () => audioManager.isAudioSupported(),
  };
};



