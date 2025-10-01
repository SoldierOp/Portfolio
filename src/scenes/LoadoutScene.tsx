import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { 
  Environment, 
  OrbitControls, 
  Sphere,
  Html,
  Float,
} from '@react-three/drei';
import TacticalBackground from '@components/TacticalBackground';
import * as THREE from 'three';

/**
 * Skill Orb Component
 */
const SkillOrb: React.FC<{ 
  position: [number, number, number]; 
  skill: string; 
  level: number; 
  color: string;
  icon: string;
}> = ({ position, skill, level, color, icon }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = React.useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3 + position[0]) * 0.05;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2 + position[1]) * 0.05;
    }
  });

  return (
    <group position={position}>
      <Float speed={0.4} rotationIntensity={0.15} floatIntensity={0.1}>
        <Sphere
          ref={meshRef}
          args={[0.8, 16, 16]}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <meshStandardMaterial
            color={color}
            metalness={0.9}
            roughness={0.1}
            transparent
            opacity={hovered ? 0.9 : 0.7}
            emissive={color}
            emissiveIntensity={hovered ? 0.4 : 0.2}
          />
        </Sphere>
      </Float>
      
      <Html position={[0, -1.2, 0]} center>
        <div className="text-center max-w-xs html-overlay-content">
          <div className="text-xl mb-1">{icon}</div>
          <h3 className="text-sm font-bold text-tactical-primary font-display mb-1">
            {skill}
          </h3>
          <div className="w-24 h-1.5 bg-tactical-gray/50 rounded-full mx-auto mb-1">
            <div 
              className="h-full bg-gradient-to-r from-tactical-primary to-holo-blue rounded-full transition-all duration-500"
              style={{ width: `${level}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-300 font-tactical">
            {level}%
          </div>
        </div>
      </Html>
    </group>
  );
};

/**
 * Main Skills Scene
 */
const LoadoutScene: React.FC = () => {
  const skills = [
    // Programming Languages
    {
      skill: "Python",
      level: 95,
      color: "#00ff88",
      icon: "🐍",
      position: [-4, 3, 0] as [number, number, number]
    },
    {
      skill: "C/C++",
      level: 90,
      color: "#0088ff",
      icon: "⚙️",
      position: [-2, 3, 0] as [number, number, number]
    },
    {
      skill: "JavaScript",
      level: 85,
      color: "#ff4444",
      icon: "🟨",
      position: [0, 3, 0] as [number, number, number]
    },
    {
      skill: "HTML/CSS",
      level: 80,
      color: "#ff8800",
      icon: "🌐",
      position: [2, 3, 0] as [number, number, number]
    },
    {
      skill: "Java",
      level: 75,
      color: "#cc00ff",
      icon: "☕",
      position: [4, 3, 0] as [number, number, number]
    },
    
    // AI & Machine Learning
    {
      skill: "AI/ML",
      level: 88,
      color: "#00ff88",
      icon: "🤖",
      position: [-4, 1, 0] as [number, number, number]
    },
    {
      skill: "OpenCV",
      level: 85,
      color: "#0088ff",
      icon: "👁️",
      position: [-2, 1, 0] as [number, number, number]
    },
    {
      skill: "PyTorch",
      level: 82,
      color: "#ff4444",
      icon: "🔥",
      position: [0, 1, 0] as [number, number, number]
    },
    {
      skill: "TensorFlow",
      level: 78,
      color: "#ff8800",
      icon: "🧠",
      position: [2, 1, 0] as [number, number, number]
    },
    {
      skill: "NLP",
      level: 80,
      color: "#cc00ff",
      icon: "💬",
      position: [4, 1, 0] as [number, number, number]
    },
    
    // Web Development
    {
      skill: "React",
      level: 82,
      color: "#00ff88",
      icon: "⚛️",
      position: [-4, -1, 0] as [number, number, number]
    },
    {
      skill: "Node.js",
      level: 80,
      color: "#0088ff",
      icon: "🟢",
      position: [-2, -1, 0] as [number, number, number]
    },
    {
      skill: "Express.js",
      level: 78,
      color: "#ff4444",
      icon: "🚀",
      position: [0, -1, 0] as [number, number, number]
    },
    {
      skill: "Three.js",
      level: 85,
      color: "#ff8800",
      icon: "🎮",
      position: [2, -1, 0] as [number, number, number]
    },
    {
      skill: "WebGL",
      level: 80,
      color: "#cc00ff",
      icon: "🎨",
      position: [4, -1, 0] as [number, number, number]
    },
    
    // Tools & Technologies
    {
      skill: "Git/GitHub",
      level: 80,
      color: "#00ff88",
      icon: "📚",
      position: [-4, -3, 0] as [number, number, number]
    },
    {
      skill: "VS Code",
      level: 90,
      color: "#0088ff",
      icon: "💻",
      position: [-2, -3, 0] as [number, number, number]
    },
    {
      skill: "Docker",
      level: 75,
      color: "#ff4444",
      icon: "🐳",
      position: [0, -3, 0] as [number, number, number]
    },
    {
      skill: "MySQL",
      level: 70,
      color: "#ff8800",
      icon: "🗄️",
      position: [2, -3, 0] as [number, number, number]
    },
    {
      skill: "Matlab",
      level: 65,
      color: "#cc00ff",
      icon: "📊",
      position: [4, -3, 0] as [number, number, number]
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
      <TacticalBackground variant="skills" />

      {/* Skill Orbs */}
      {skills.map((skill, index) => (
        <SkillOrb
          key={index}
          position={skill.position}
          skill={skill.skill}
          level={skill.level}
          color={skill.color}
          icon={skill.icon}
        />
      ))}

      {/* CENTERED MAIN SKILLS PANEL - REMOVED AS REQUESTED */}

      {/* Camera Controls */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={window.innerWidth < 768 ? 12 : 8}
        maxDistance={window.innerWidth < 768 ? 25 : 20}
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

export default LoadoutScene;