import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { 
  Environment, 
  OrbitControls, 
  Box,
  Html,
  Float,
} from '@react-three/drei';
import TacticalBackground from '@components/TacticalBackground';
import * as THREE from 'three';

/**
 * Timeline Item Component
 */
const TimelineItem: React.FC<{ 
  position: [number, number, number]; 
  title: string; 
  company: string; 
  period: string; 
  description: string; 
  color: string;
  icon: string;
}> = ({ position, title, company, period, description, color, icon }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = React.useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3 + position[0]) * 0.03;
    }
  });

  return (
    <group position={position}>
      <Float speed={0.4} rotationIntensity={0.15} floatIntensity={0.1}>
        <Box
          ref={meshRef}
          args={[3, 0.8, 0.2]}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <meshStandardMaterial
            color={color}
            metalness={0.7}
            roughness={0.3}
            transparent
            opacity={hovered ? 0.9 : 0.7}
            emissive={color}
            emissiveIntensity={hovered ? 0.3 : 0.1}
          />
        </Box>
      </Float>
      
      <Html position={[0, -1.2, 0]} center>
        <div className="text-center max-w-xs html-overlay-content">
          <div className="text-xl mb-1">{icon}</div>
          <h3 className="text-sm font-bold text-tactical-primary font-display mb-1">
            {title}
          </h3>
          <div className="text-xs text-holo-blue font-tactical mb-1">
            {company}
          </div>
          <div className="text-xs text-tactical-warning font-mono mb-1">
            {period}
          </div>
          <p className="text-xs text-gray-300 font-tactical leading-tight">
            {description}
          </p>
        </div>
      </Html>
    </group>
  );
};

/**
 * Main About Scene
 */
const ScoreboardScene: React.FC = () => {
  const experiences = [
    {
      title: "About Me",
      company: "Personal Introduction",
      period: "2024 - Present",
      description: "Motivated and disciplined individual pursuing B.Tech in Computer Science with AI and Robotics specialization at VIT Chennai.",
      color: "#00ff88",
      icon: "👨‍💻",
      position: [-4, 2, 0] as [number, number, number]
    },
    {
      title: "Academic Excellence",
      company: "VIT Chennai",
      period: "Expected May 2027",
      description: "B.Tech Computer Science with AI and Robotics specialization. Interested in technology and problem-solving.",
      color: "#0088ff",
      icon: "🎓",
      position: [0, 2, 0] as [number, number, number]
    },
    {
      title: "Leadership & Growth",
      company: "Personal Development",
      period: "2024 - Present",
      description: "Developing leadership and communication skills. Vice President of Haryana Hood, contributing to teamwork.",
      color: "#ff4444",
      icon: "🚀",
      position: [4, 2, 0] as [number, number, number]
    },
    {
      title: "Fitness & Discipline",
      company: "Personal Philosophy",
      period: "2024 - Present",
      description: "Passionate about fitness and discipline, training regularly. Believe in living a balanced life.",
      color: "#ff8800",
      icon: "💪",
      position: [-4, -2, 0] as [number, number, number]
    },
    {
      title: "Future Vision",
      company: "Long-term Goals",
      period: "2024 - Future",
      description: "Forward-looking mindset, aiming to evolve daily. Dedicated to long-term goals while maintaining balance.",
      color: "#cc00ff",
      icon: "🌟",
      position: [0, -2, 0] as [number, number, number]
    },
    {
      title: "Vice President",
      company: "Haryana Hood, VIT",
      period: "2024 - Present",
      description: "Strengthening leadership abilities through active role in cultural organization. Contributing to teamwork.",
      color: "#00ccff",
      icon: "🎭",
      position: [4, -2, 0] as [number, number, number]
    }
  ];

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-5, -5, -5]} intensity={0.3} color="#00ff88" />
      <pointLight position={[5, -5, -5]} intensity={0.3} color="#0088ff" />

      {/* Environment */}
      <Environment preset="night" />

      {/* Tactical Background */}
      <TacticalBackground variant="about" />

      {/* Experience Timeline */}
      {experiences.map((exp, index) => (
        <TimelineItem
          key={index}
          position={exp.position}
          title={exp.title}
          company={exp.company}
          period={exp.period}
          description={exp.description}
          color={exp.color}
          icon={exp.icon}
        />
      ))}

      {/* CENTERED MAIN ABOUT PANEL - REMOVED AS REQUESTED */}

      {/* Camera Controls */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={window.innerWidth < 768 ? 8 : 5}
        maxDistance={window.innerWidth < 768 ? 20 : 15}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI - Math.PI / 6}
        autoRotate={false}
        touches={{
          ONE: window.innerWidth < 768 ? 2 : 1,
          TWO: window.innerWidth < 768 ? 1 : 2,
        }}
      />
    </>
  );
};

export default ScoreboardScene;