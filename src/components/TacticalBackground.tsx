import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Box, Torus, Cylinder, Octahedron, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Tactical-themed 3D background system
 */
const TacticalBackground: React.FC<{ variant?: 'lobby' | 'projects' | 'skills' | 'about' | 'contact' | 'login' }> = ({ 
  variant = 'lobby' 
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Mesh[]>([]);
  const shapesRef = useRef<THREE.Mesh[]>([]);

      useFrame((state) => {
        if (groupRef.current) {
          groupRef.current.rotation.y = state.clock.elapsedTime * 0.01;
          
          // Advanced particle animation - much slower and more subtle
          particlesRef.current.forEach((particle, index) => {
            if (particle) {
              const time = state.clock.elapsedTime;
              particle.position.y = Math.sin(time * 0.2 + index * 0.3) * 2;
              particle.position.x = Math.cos(time * 0.15 + index * 0.2) * 1.5;
              particle.position.z = Math.sin(time * 0.1 + index * 0.15) * 1.5;
              particle.rotation.x = time * 0.2;
              particle.rotation.y = time * 0.15;
              particle.rotation.z = time * 0.1;
              
              // Dynamic scaling - much more subtle
              const scale = 0.9 + Math.sin(time * 1 + index) * 0.1;
              particle.scale.setScalar(scale);
            }
          });

          // Advanced shape animation - much slower and more subtle
          shapesRef.current.forEach((shape, index) => {
            if (shape) {
              const time = state.clock.elapsedTime;
              shape.position.y = Math.sin(time * 0.2 + index * 0.4) * 1.5;
              shape.position.x = Math.cos(time * 0.15 + index * 0.3) * 1;
              shape.position.z = Math.sin(time * 0.1 + index * 0.2) * 1;
              shape.rotation.x = time * 0.25;
              shape.rotation.y = time * 0.35;
              shape.rotation.z = time * 0.15;
              
              // Dynamic scaling and opacity - much more subtle
              const scale = 0.95 + Math.sin(time * 0.8 + index) * 0.05;
              shape.scale.setScalar(scale);
            }
          });
        }
      });

  const getVariantConfig = () => {
    switch (variant) {
      case 'lobby':
        return {
          colors: ['#00ff88', '#0088ff', '#ff4444', '#ff8800', '#cc00ff'],
          shapes: ['sphere', 'box', 'torus'],
          count: 15
        };
      case 'projects':
        return {
          colors: ['#00ff88', '#0088ff', '#ff4444', '#ff8800', '#cc00ff', '#00ccff'],
          shapes: ['box', 'cylinder', 'octahedron'],
          count: 12
        };
      case 'skills':
        return {
          colors: ['#00ff88', '#0088ff', '#ff4444', '#ff8800', '#cc00ff', '#00ccff', '#ff00ff'],
          shapes: ['sphere', 'icosahedron', 'torus'],
          count: 18
        };
      case 'about':
        return {
          colors: ['#00ff88', '#0088ff', '#ff4444', '#ff8800'],
          shapes: ['cylinder', 'box', 'sphere'],
          count: 10
        };
      case 'contact':
        return {
          colors: ['#00ff88', '#0088ff', '#ff4444', '#ff8800', '#cc00ff'],
          shapes: ['torus', 'sphere', 'cylinder'],
          count: 14
        };
      case 'login':
        return {
          colors: ['#00ff88', '#0088ff', '#ff4444'],
          shapes: ['sphere', 'box', 'torus'],
          count: 8
        };
      default:
        return {
          colors: ['#00ff88', '#0088ff', '#ff4444'],
          shapes: ['sphere', 'box'],
          count: 10
        };
    }
  };

  const config = getVariantConfig();

  const createShape = (shapeType: string, index: number) => {
    const color = config.colors[index % config.colors.length];
    const position: [number, number, number] = [
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20,
    ];

    const commonProps = {
      position,
      ref: (el: THREE.Mesh) => {
        if (el) shapesRef.current[index] = el;
      },
    };

    switch (shapeType) {
      case 'sphere':
        return (
          <Sphere key={index} args={[0.3, 8, 8]} {...commonProps}>
            <meshStandardMaterial
              color={color}
              metalness={0.8}
              roughness={0.2}
              transparent
              opacity={0.6}
              emissive={color}
              emissiveIntensity={0.1}
            />
          </Sphere>
        );
      case 'box':
        return (
          <Box key={index} args={[0.4, 0.4, 0.4]} {...commonProps}>
            <meshStandardMaterial
              color={color}
              metalness={0.7}
              roughness={0.3}
              transparent
              opacity={0.5}
              emissive={color}
              emissiveIntensity={0.15}
            />
          </Box>
        );
      case 'torus':
        return (
          <Torus key={index} args={[0.3, 0.1, 8, 16]} {...commonProps}>
            <meshStandardMaterial
              color={color}
              metalness={0.9}
              roughness={0.1}
              transparent
              opacity={0.4}
              emissive={color}
              emissiveIntensity={0.2}
            />
          </Torus>
        );
      case 'cylinder':
        return (
          <Cylinder key={index} args={[0.2, 0.2, 0.6, 8]} {...commonProps}>
            <meshStandardMaterial
              color={color}
              metalness={0.6}
              roughness={0.4}
              transparent
              opacity={0.5}
              emissive={color}
              emissiveIntensity={0.1}
            />
          </Cylinder>
        );
      case 'octahedron':
        return (
          <Octahedron key={index} args={[0.3]} {...commonProps}>
            <meshStandardMaterial
              color={color}
              metalness={0.8}
              roughness={0.2}
              transparent
              opacity={0.6}
              emissive={color}
              emissiveIntensity={0.15}
            />
          </Octahedron>
        );
      case 'icosahedron':
        return (
          <Icosahedron key={index} args={[0.25]} {...commonProps}>
            <meshStandardMaterial
              color={color}
              metalness={0.9}
              roughness={0.1}
              transparent
              opacity={0.5}
              emissive={color}
              emissiveIntensity={0.2}
            />
          </Icosahedron>
        );
      default:
        return null;
    }
  };

  return (
    <group ref={groupRef}>
      {/* Floating Particles */}
      {Array.from({ length: config.count }, (_, i) => (
        <Sphere
          key={`particle-${i}`}
          ref={(el) => {
            if (el) particlesRef.current[i] = el;
          }}
          args={[0.05, 4, 4]}
          position={[
            (Math.random() - 0.5) * 30,
            (Math.random() - 0.5) * 30,
            (Math.random() - 0.5) * 30,
          ]}
        >
          <meshBasicMaterial
            color={config.colors[i % config.colors.length]}
            transparent
            opacity={0.4}
          />
        </Sphere>
      ))}

      {/* Interactive Shapes */}
      {config.shapes.map((shapeType, index) => 
        createShape(shapeType, index)
      )}

      {/* Grid Lines */}
      <gridHelper
        args={[25, 25, config.colors[0], config.colors[1]]}
        position={[0, -5, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  );
};

export default TacticalBackground;
