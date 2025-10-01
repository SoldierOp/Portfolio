import React, { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';

/**
 * MIND-BLOWING 3D TEXT ANIMATIONS ON SCROLL
 * This will create absolutely stunning text effects!
 */
const ScrollTextAnimations: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const [scrollY, setScrollY] = useState(0);
  const { } = useThree();

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      // Animate text based on scroll position
      const scrollFactor = scrollY / window.innerHeight;
      
      // Rotate and scale based on scroll
      groupRef.current.rotation.y = scrollFactor * Math.PI;
      groupRef.current.scale.setScalar(1 + scrollFactor * 0.5);
      
      // Move text in 3D space
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime + scrollFactor) * 2;
      groupRef.current.position.z = Math.cos(state.clock.elapsedTime + scrollFactor) * 2;
    }
  });

  const textElements = [
    { text: 'REACT', position: [-4, 2, 0], color: '#00ff88' },
    { text: 'THREE.JS', position: [4, 2, 0], color: '#0088ff' },
    { text: 'WEBGL', position: [-4, -2, 0], color: '#ff4444' },
    { text: 'TYPESCRIPT', position: [4, -2, 0], color: '#ff8800' },
    { text: 'PORTFOLIO', position: [0, 0, 0], color: '#cc00ff', size: 2 },
  ];

  return (
    <group ref={groupRef}>
      {textElements.map((element, index) => (
        <Float
          key={index}
          speed={0.5 + index * 0.1}
          rotationIntensity={0.2}
          floatIntensity={0.3}
        >
          <Text
            position={element.position as [number, number, number]}
            fontSize={element.size || 1}
            color={element.color}
            anchorX="center"
            anchorY="middle"
            font="/fonts/Orbitron-Bold.woff"
            material-toneMapped={false}
            material-emissive={element.color}
            material-emissiveIntensity={0.3}
          >
            {element.text}
          </Text>
        </Float>
      ))}
    </group>
  );
};

/**
 * INTERACTIVE CODE RAIN EFFECT
 * This will create a stunning Matrix-style code rain!
 */
const CodeRain: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const [codeLines, setCodeLines] = useState<string[]>([]);

  // Generate random code lines
  useEffect(() => {
    const codeSnippets = [
      'const portfolio = new Portfolio();',
      'portfolio.render(); // RENDERING...',
      'status: ONLINE ✓',
      'console.log("Welcome to the Matrix");',
      'if (user.isReady()) {',
      '  showSecret();',
      '}',
      '// You found the secret!',
      '// This portfolio is powered by pure magic ✨',
      '// Welcome to the future of web development!',
      'const matrix = new Matrix();',
      'matrix.rain(); // INITIATING...',
      'status: MATRIX_ACTIVE ✓',
      'const projects = await loadProjects();',
      'projects.forEach(render); // RENDERING...',
      'status: ACTIVE ✓',
      'const skills = await loadSkills();',
      'skills.forEach(levelUp); // LEVELING...',
      'status: MASTERED ✓',
      'const experience = await loadExperience();',
      'experience.forEach(grow); // GROWING...',
      'status: EXPERT ✓',
      'const connection = await establishConnection();',
      'connection.send(message); // SENDING...',
      'status: CONNECTED ✓',
    ];

    const generateCodeLines = () => {
      const lines = [];
      for (let i = 0; i < 20; i++) {
        lines.push(codeSnippets[Math.floor(Math.random() * codeSnippets.length)]);
      }
      setCodeLines(lines);
    };

    generateCodeLines();
    const interval = setInterval(generateCodeLines, 3000);

    return () => clearInterval(interval);
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      {codeLines.map((line, index) => (
        <Float
          key={index}
          speed={0.3 + index * 0.05}
          rotationIntensity={0.1}
          floatIntensity={0.2}
        >
          <Text
            position={[
              (Math.random() - 0.5) * 20,
              (Math.random() - 0.5) * 20,
              (Math.random() - 0.5) * 20
            ]}
            fontSize={0.3}
            color="#00ff88"
            anchorX="center"
            anchorY="middle"
            font="/fonts/JetBrainsMono-Regular.woff"
            material-toneMapped={false}
            material-emissive="#00ff88"
            material-emissiveIntensity={0.5}
          >
            {line}
          </Text>
        </Float>
      ))}
    </group>
  );
};

/**
 * HOLOGRAPHIC DATA VISUALIZATION
 * This will create stunning data visualization effects!
 */
const HolographicDataViz: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const [dataPoints, setDataPoints] = useState<Array<{ x: number; y: number; z: number; value: number }>>([]);

  useEffect(() => {
    const generateDataPoints = () => {
      const points = [];
      for (let i = 0; i < 50; i++) {
        points.push({
          x: (Math.random() - 0.5) * 10,
          y: (Math.random() - 0.5) * 10,
          z: (Math.random() - 0.5) * 10,
          value: Math.random() * 100
        });
      }
      setDataPoints(points);
    };

    generateDataPoints();
    const interval = setInterval(generateDataPoints, 2000);

    return () => clearInterval(interval);
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <group ref={groupRef}>
      {dataPoints.map((point, index) => (
        <Float
          key={index}
          speed={0.2 + index * 0.01}
          rotationIntensity={0.1}
          floatIntensity={0.1}
        >
          <mesh position={[point.x, point.y, point.z]}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshStandardMaterial
              color="#00ff88"
              emissive="#00ff88"
              emissiveIntensity={point.value / 100}
              transparent
              opacity={0.8}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

export { ScrollTextAnimations, CodeRain, HolographicDataViz };



