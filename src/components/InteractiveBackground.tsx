import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Box, Torus, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Interactive background particles
 */
const BackgroundParticles: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const particles = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      
      particles.current.forEach((particle, index) => {
        particle.position.y = Math.sin(state.clock.elapsedTime + index) * 0.5;
        particle.rotation.x = state.clock.elapsedTime * 0.5;
        particle.rotation.z = state.clock.elapsedTime * 0.3;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: 20 }, (_, i) => (
        <Sphere
          key={i}
          ref={(el) => {
            if (el) particles.current[i] = el;
          }}
          args={[0.1, 8, 8]}
          position={[
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
          ]}
        >
          <meshBasicMaterial
            color={['#00ff88', '#0088ff', '#ff4444', '#ff8800', '#cc00ff'][i % 5]}
            transparent
            opacity={0.3}
          />
        </Sphere>
      ))}
    </group>
  );
};

/**
 * Floating geometric shapes
 */
const FloatingShapes: React.FC = () => {
  const shapes = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    shapes.current.forEach((shape, index) => {
      shape.position.y = Math.sin(state.clock.elapsedTime * 0.5 + index) * 2;
      shape.rotation.x = state.clock.elapsedTime * 0.2;
      shape.rotation.y = state.clock.elapsedTime * 0.3;
    });
  });

  return (
    <group>
      {/* Floating Cubes */}
      {Array.from({ length: 5 }, (_, i) => (
        <Box
          key={`cube-${i}`}
          ref={(el) => {
            if (el) shapes.current[i] = el;
          }}
          args={[0.5, 0.5, 0.5]}
          position={[
            (Math.random() - 0.5) * 15,
            Math.random() * 10 - 5,
            (Math.random() - 0.5) * 15,
          ]}
        >
          <meshStandardMaterial
            color={['#00ff88', '#0088ff', '#ff4444', '#ff8800', '#cc00ff'][i]}
            metalness={0.8}
            roughness={0.2}
            transparent
            opacity={0.6}
            emissive={['#00ff88', '#0088ff', '#ff4444', '#ff8800', '#cc00ff'][i]}
            emissiveIntensity={0.1}
          />
        </Box>
      ))}
      
      {/* Floating Torus */}
      {Array.from({ length: 3 }, (_, i) => (
        <Torus
          key={`torus-${i}`}
          args={[0.3, 0.1, 8, 16]}
          position={[
            (Math.random() - 0.5) * 12,
            Math.random() * 8 - 4,
            (Math.random() - 0.5) * 12,
          ]}
        >
          <meshStandardMaterial
            color={['#00ccff', '#ff8800', '#cc00ff'][i]}
            metalness={0.9}
            roughness={0.1}
            transparent
            opacity={0.5}
            emissive={['#00ccff', '#ff8800', '#cc00ff'][i]}
            emissiveIntensity={0.2}
          />
        </Torus>
      ))}
      
      {/* Floating Cylinders */}
      {Array.from({ length: 4 }, (_, i) => (
        <Cylinder
          key={`cylinder-${i}`}
          args={[0.2, 0.2, 1, 8]}
          position={[
            (Math.random() - 0.5) * 10,
            Math.random() * 6 - 3,
            (Math.random() - 0.5) * 10,
          ]}
        >
          <meshStandardMaterial
            color={['#00ff88', '#0088ff', '#ff4444', '#ff8800'][i]}
            metalness={0.7}
            roughness={0.3}
            transparent
            opacity={0.4}
            emissive={['#00ff88', '#0088ff', '#ff4444', '#ff8800'][i]}
            emissiveIntensity={0.15}
          />
        </Cylinder>
      ))}
    </group>
  );
};

/**
 * Animated grid lines
 */
const GridLines: React.FC = () => {
  const gridRef = useRef<THREE.GridHelper>(null);

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <gridHelper
      ref={gridRef}
      args={[20, 20, '#00ff88', '#0088ff']}
      position={[0, -5, 0]}
    />
  );
};

/**
 * Main interactive background component
 */
const InteractiveBackground: React.FC = () => {
  return (
    <>
      <BackgroundParticles />
      <FloatingShapes />
      <GridLines />
    </>
  );
};

export default InteractiveBackground;



