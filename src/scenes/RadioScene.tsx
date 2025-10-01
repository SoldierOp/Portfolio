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
 * Contact Method Component
 */
const ContactMethod: React.FC<{ 
  position: [number, number, number]; 
  method: string; 
  value: string; 
  action: string; 
  color: string;
  icon: string;
}> = ({ position, method, value, action, color, icon }) => {
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
          args={[0.6, 16, 16]}
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
            emissiveIntensity={hovered ? 0.4 : 0.2}
          />
        </Sphere>
      </Float>
      
      <Html position={[0, -1.2, 0]} center>
        <div className="text-center max-w-xs html-overlay-content">
          <div className="text-xl mb-1">{icon}</div>
          <h3 className="text-sm font-bold text-tactical-primary font-display mb-1">
            {method}
          </h3>
          <p className="text-xs text-gray-300 font-tactical mb-2">
            {value}
          </p>
          <button 
            className="px-3 py-1 bg-tactical-primary text-black font-bold rounded hover:bg-holo-blue transition-colors font-tactical text-xs"
            onClick={() => {
              if (method === "Email") {
                window.open(`mailto:${value}`, '_blank');
              } else if (method === "LinkedIn") {
                window.open(`https://${value}`, '_blank');
              } else if (method === "GitHub") {
                window.open(`https://${value}`, '_blank');
              } else if (method === "LeetCode") {
                window.open(`https://${value}`, '_blank');
              } else if (method === "Phone") {
                window.open(`tel:${value}`, '_blank');
              } else if (method === "Location") {
                window.open(`https://maps.google.com/?q=${encodeURIComponent(value)}`, '_blank');
              }
            }}
          >
            {action}
          </button>
        </div>
      </Html>
    </group>
  );
};

/**
 * Main Contact Scene
 */
const RadioScene: React.FC = () => {
  const contactMethods = [
    {
      method: "Email",
      value: "mayankchahes@gmail.com",
      action: "Send Email",
      color: "#00ff88",
      icon: "📧",
      position: [-3, 2, 0] as [number, number, number]
    },
    {
      method: "LinkedIn",
      value: "linkedin.com/in/mayank-chauhan-1a1651262/",
      action: "Connect",
      color: "#0088ff",
      icon: "💼",
      position: [0, 2, 0] as [number, number, number]
    },
    {
      method: "GitHub",
      value: "github.com/SoldierOp",
      action: "View Code",
      color: "#ff4444",
      icon: "🐙",
      position: [3, 2, 0] as [number, number, number]
    },
    {
      method: "LeetCode",
      value: "leetcode.com/u/MayankO7/",
      action: "View Profile",
      color: "#ff8800",
      icon: "💻",
      position: [-3, -2, 0] as [number, number, number]
    },
    {
      method: "Phone",
      value: "+91 9306912663",
      action: "Call Now",
      color: "#cc00ff",
      icon: "📱",
      position: [0, -2, 0] as [number, number, number]
    },
    {
      method: "Location",
      value: "VIT Chennai, India",
      action: "View Map",
      color: "#00ccff",
      icon: "📍",
      position: [3, -2, 0] as [number, number, number]
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
      <TacticalBackground variant="contact" />

      {/* Contact Methods */}
      {contactMethods.map((contact, index) => (
        <ContactMethod
          key={index}
          position={contact.position}
          method={contact.method}
          value={contact.value}
          action={contact.action}
          color={contact.color}
          icon={contact.icon}
        />
      ))}

      {/* Camera Controls */}
      <OrbitControls
        enablePan={window.innerWidth < 1024 ? true : false}
        enableZoom={true}
        enableRotate={true}
        minDistance={window.innerWidth < 480 ? 8 : window.innerWidth < 768 ? 8 : window.innerWidth < 1024 ? 6 : 5}
        maxDistance={window.innerWidth < 480 ? 25 : window.innerWidth < 768 ? 20 : window.innerWidth < 1024 ? 18 : 15}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI - Math.PI / 6}
        autoRotate={false}
        touches={{
          ONE: window.innerWidth < 768 ? 2 : 1,
          TWO: window.innerWidth < 768 ? 1 : 2,
        }}
        dampingFactor={window.innerWidth < 768 ? 0.1 : 0.05}
        enableDamping={true}
      />
    </>
  );
};

export default RadioScene;