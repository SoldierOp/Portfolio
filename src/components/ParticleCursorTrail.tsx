import React, { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * MIND-BLOWING INTERACTIVE PARTICLE CURSOR TRAIL
 * This will absolutely SHOCK anyone who sees it!
 */
const ParticleCursorTrail: React.FC = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      });
      setIsActive(true);
    };

    const handleMouseLeave = () => {
      setIsActive(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Create particle system
  const particleCount = 100;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const sizes = new Float32Array(particleCount);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = 0;
    positions[i * 3 + 1] = 0;
    positions[i * 3 + 2] = 0;

    // Multi-color particles
    const colorChoice = Math.random();
    if (colorChoice < 0.25) {
      colors[i * 3] = 0; colors[i * 3 + 1] = 1; colors[i * 3 + 2] = 0.53; // Tactical Primary
    } else if (colorChoice < 0.5) {
      colors[i * 3] = 0; colors[i * 3 + 1] = 0.53; colors[i * 3 + 2] = 1; // Holo Blue
    } else if (colorChoice < 0.75) {
      colors[i * 3] = 1; colors[i * 3 + 1] = 0.27; colors[i * 3 + 2] = 0.27; // Tactical Accent
    } else {
      colors[i * 3] = 0.8; colors[i * 3 + 1] = 0.53; colors[i * 3 + 2] = 0; // Tactical Warning
    }

    sizes[i] = Math.random() * 0.1 + 0.05;
  }

  useFrame((state) => {
    if (particlesRef.current && isActive) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      const colors = particlesRef.current.geometry.attributes.color.array as Float32Array;

      // Update particle positions to follow mouse
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // Smooth interpolation to mouse position
        positions[i3] += (mousePosition.x * 5 - positions[i3]) * 0.1;
        positions[i3 + 1] += (mousePosition.y * 5 - positions[i3 + 1]) * 0.1;
        positions[i3 + 2] += (Math.sin(state.clock.elapsedTime + i) * 0.5 - positions[i3 + 2]) * 0.05;

        // Add some randomness for trail effect
        positions[i3] += (Math.random() - 0.5) * 0.1;
        positions[i3 + 1] += (Math.random() - 0.5) * 0.1;
        positions[i3 + 2] += (Math.random() - 0.5) * 0.1;

        // Dynamic color changes
        const time = state.clock.elapsedTime;
        colors[i3] = Math.sin(time * 2 + i) * 0.5 + 0.5;
        colors[i3 + 1] = Math.sin(time * 2 + i + 1) * 0.5 + 0.5;
        colors[i3 + 2] = Math.sin(time * 2 + i + 2) * 0.5 + 0.5;
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true;
      particlesRef.current.geometry.attributes.color.needsUpdate = true;
    }
  });

  if (!isActive) return null;

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={particleCount}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        transparent
        opacity={0.8}
        sizeAttenuation
        vertexColors
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default ParticleCursorTrail;



