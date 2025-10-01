import React, { useState, useEffect } from 'react';

/**
 * MIND-BLOWING DYNAMIC BACKGROUND MUSIC SYSTEM
 * This will create an immersive audio experience!
 */
const BackgroundMusic: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [currentTrack, setCurrentTrack] = useState(0);

  // Ambient sound tracks (using Web Audio API for procedural generation)
  const tracks = [
    {
      name: 'Tactical Ambient',
      description: 'Cyberpunk atmosphere',
      color: '#00ff88'
    },
    {
      name: 'Neon Dreams',
      description: 'Futuristic vibes',
      color: '#0088ff'
    },
    {
      name: 'Matrix Rain',
      description: 'Digital downpour',
      color: '#ff4444'
    },
    {
      name: 'Holographic',
      description: 'Sci-fi ambiance',
      color: '#ff8800'
    }
  ];

  useEffect(() => {
    if (isPlaying) {
      // Generate procedural ambient music using Web Audio API
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Create multiple oscillators for rich sound
      const oscillators: OscillatorNode[] = [];
      const gainNodes: GainNode[] = [];

      for (let i = 0; i < 4; i++) {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Different frequencies for each oscillator
        oscillator.frequency.setValueAtTime(60 + i * 20, audioContext.currentTime);
        oscillator.type = 'sine';
        
        // Low volume for ambient effect
        gainNode.gain.setValueAtTime(volume * 0.1, audioContext.currentTime);
        
        // Add subtle modulation
        const lfo = audioContext.createOscillator();
        const lfoGain = audioContext.createGain();
        lfo.connect(lfoGain);
        lfoGain.connect(oscillator.frequency);
        lfo.frequency.setValueAtTime(0.1 + i * 0.05, audioContext.currentTime);
        lfoGain.gain.setValueAtTime(5, audioContext.currentTime);
        
        oscillators.push(oscillator);
        gainNodes.push(gainNode);
        lfo.start();
      }

      // Start all oscillators
      oscillators.forEach(osc => osc.start());

      // Cleanup function
      return () => {
        oscillators.forEach(osc => osc.stop());
        audioContext.close();
      };
    }
  }, [isPlaying, volume, currentTrack]);

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
  };

  return (
    <div className="fixed top-4 right-4 z-50 glass-morphism p-3 rounded-lg neon-border">
      <div className="flex items-center space-x-3">
        {/* Play/Pause Button */}
        <button
          onClick={toggleMusic}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
            isPlaying 
              ? 'bg-tactical-primary text-tactical-dark animate-pulse' 
              : 'bg-tactical-gray/50 text-tactical-primary hover:bg-tactical-primary hover:text-tactical-dark'
          }`}
        >
          {isPlaying ? '⏸️' : '▶️'}
        </button>

        {/* Track Info */}
        <div className="text-xs">
          <div className="font-tactical font-bold text-tactical-primary">
            {tracks[currentTrack].name}
          </div>
          <div className="text-gray-400">
            {tracks[currentTrack].description}
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-tactical-secondary">🔊</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-16 h-1 bg-tactical-gray/50 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, var(--tactical-primary) 0%, var(--tactical-primary) ${volume * 100}%, var(--tactical-gray) ${volume * 100}%, var(--tactical-gray) 100%)`
            }}
          />
        </div>

        {/* Next Track Button */}
        <button
          onClick={nextTrack}
          className="w-6 h-6 rounded-full bg-tactical-gray/50 text-tactical-primary hover:bg-tactical-primary hover:text-tactical-dark transition-all duration-300 flex items-center justify-center text-xs"
        >
          ⏭️
        </button>
      </div>

      {/* Visualizer */}
      {isPlaying && (
        <div className="mt-2 flex space-x-1">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="w-1 bg-tactical-primary rounded-full animate-pulse"
              style={{
                height: `${Math.random() * 20 + 5}px`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: `${0.5 + Math.random() * 0.5}s`
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BackgroundMusic;



