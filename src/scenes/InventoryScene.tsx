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
 * Project Card Component
 */
const ProjectCard: React.FC<{ 
  position: [number, number, number]; 
  title: string; 
  description: string; 
  tech: string[]; 
  color: string;
  icon: string;
}> = ({ position, title, description, tech, color, icon }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = React.useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3 + position[0]) * 0.05;
    }
  });

  return (
    <group position={position}>
      <Float speed={0.4} rotationIntensity={0.15} floatIntensity={0.1}>
        <Box
          ref={meshRef}
          args={[2, 1.5, 0.2]}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <meshStandardMaterial
            color={color}
            metalness={0.8}
            roughness={0.2}
            transparent
            opacity={hovered ? 0.9 : 0.7}
            emissive={color}
            emissiveIntensity={hovered ? 0.3 : 0.1}
          />
        </Box>
      </Float>
      
      <Html position={[0, -1.5, 0]} center>
        <div className="text-center max-w-xs html-overlay-content">
          <div className="text-2xl mb-1">{icon}</div>
          <h3 className="text-sm font-bold text-tactical-primary font-display mb-1">
            {title}
          </h3>
          <p className="text-xs text-gray-300 mb-2 font-tactical">
            {description}
          </p>
          <div className="flex flex-wrap justify-center gap-1">
            {tech.slice(0, 3).map((t, i) => (
              <span 
                key={i}
                className="px-1 py-0.5 text-xs bg-tactical-gray/50 text-tactical-primary rounded font-mono"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </Html>
    </group>
  );
};

/**
 * Main Projects Scene
 */
const InventoryScene: React.FC = () => {
  const projects = [
    {
      title: "AI Powered PDF Intelligence Suite",
      description: "Adobe Hackathon Finalist - Intelligent document analysis pipeline with NLP and embeddings",
      tech: ["Python", "NLP", "Embeddings", "Docker"],
      color: "#00ff88",
      icon: "📄",
      position: [-4, 2, 0] as [number, number, number]
    },
    {
      title: "AuraAutnomus Treasury Analyst",
      description: "AI-powered financial analytics platform with Gemini AI and predictive insights",
      tech: ["FastAPI", "Pandas", "Gemini AI", "React"],
      color: "#0088ff",
      icon: "💰",
      position: [0, 2, 0] as [number, number, number]
    },
    {
      title: "FloatChat Ocean Intelligence",
      description: "AI-driven ocean data intelligence platform with multilingual processing",
      tech: ["Python", "AI", "Multilingual", "Analytics"],
      color: "#ff4444",
      icon: "🌊",
      position: [4, 2, 0] as [number, number, number]
    },
    {
      title: "MedVisionAI Anomaly Detection",
      description: "Deep learning system for real-time organ and anomaly detection in medical images",
      tech: ["PyTorch", "CNN", "U-Net", "OpenCV"],
      color: "#ff8800",
      icon: "🏥",
      position: [-4, -2, 0] as [number, number, number]
    },
    {
      title: "3D Interactive Portfolio",
      description: "Immersive 3D portfolio built with React Three Fiber, featuring interactive 3D scenes and animations",
      tech: ["React", "Three.js", "TypeScript", "WebGL"],
      color: "#cc00ff",
      icon: "🎨",
      position: [0, -2, 0] as [number, number, number]
    },
    {
      title: "Smart Stick Project",
      description: "Best Tech Project - Innovative assistive technology solution",
      tech: ["Hardware", "Sensors", "Arduino", "Innovation"],
      color: "#00ccff",
      icon: "🦯",
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
      <TacticalBackground variant="projects" />

      {/* Project Cards */}
      {projects.map((project, index) => (
        <ProjectCard
          key={index}
          position={project.position}
          title={project.title}
          description={project.description}
          tech={project.tech}
          color={project.color}
          icon={project.icon}
        />
      ))}

      {/* CENTERED MAIN PROJECTS PANEL - REMOVED AS REQUESTED */}

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

export default InventoryScene;