import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { 
  Environment, 
  OrbitControls, 
  Box,
  Sphere,
  MeshDistortMaterial,
  ContactShadows,
  Float,
  Html,
} from '@react-three/drei';
import TacticalBackground from '@components/TacticalBackground';
import { useAppStore } from '@stores/appStore';
import * as THREE from 'three';

/**
 * Animated 3D logo component
 */
const AnimatedLogo: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null!);

      useFrame((state) => {
        if (meshRef.current) {
          meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
          meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
        }
      });

  return (
    <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.2}>
      <Box ref={meshRef} args={[2, 0.5, 0.2]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#00ff88"
          speed={0.5}
          distort={0.2}
          radius={1}
          transparent
          opacity={0.8}
        />
      </Box>
    </Float>
  );
};

/**
 * Floating particles component
 */
const FloatingParticles: React.FC = () => {
  const particlesRef = useRef<THREE.Points>(null!);

      useFrame((state) => {
        if (particlesRef.current) {
          particlesRef.current.rotation.y = state.clock.elapsedTime * 0.01;
          particlesRef.current.rotation.x = state.clock.elapsedTime * 0.008;
          particlesRef.current.rotation.z = state.clock.elapsedTime * 0.005;
          
          // Dynamic scaling for mind-blowing effect - much more subtle
          const scale = 0.9 + Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
          particlesRef.current.scale.setScalar(scale);
        }
      });

  const particleCount = window.innerWidth < 768 ? 500 : 2000; // Reduced particles on mobile
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 30;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    
    // Multi-color particles for stunning effect
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
  }

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
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        transparent
        opacity={0.8}
        sizeAttenuation
        vertexColors
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

/**
 * Professional welcome text component
 */
const WelcomeText: React.FC = () => {
  return (
    <Html position={[0, 2, 0]} center>
      <div className="text-center">
        <h1 className="text-4xl font-bold text-tactical-primary font-display mb-3 animate-neon">
          MAYANK CHAUHAN
        </h1>
        <p className="text-lg text-tactical-secondary font-tactical animate-glow">
          AI & Robotics Engineer | VIT Chennai
        </p>
        <div className="mt-3 flex justify-center space-x-3">
          <div className="w-3 h-3 bg-tactical-primary rounded-full animate-float"></div>
          <div className="w-3 h-3 bg-holo-blue rounded-full animate-float" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 bg-tactical-accent rounded-full animate-float" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </Html>
  );
};

/**
 * MIND-BLOWING INTERACTIVE ELEMENTS - ABSOLUTELY STUNNING!
 */
const InteractiveElements: React.FC = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  const elements = [
    { 
      id: 'projects', 
      position: [4, 2, 0] as [number, number, number], 
      color: '#00ff88', 
      label: 'PROJECTS',
      icon: '🚀',
      description: 'Interactive 3D Portfolio'
    },
    { 
      id: 'skills', 
      position: [-4, 2, 0] as [number, number, number], 
      color: '#0088ff', 
      label: 'SKILLS',
      icon: '⚡',
      description: 'Technical Expertise'
    },
    { 
      id: 'about', 
      position: [0, 4, 0] as [number, number, number], 
      color: '#ff4444', 
      label: 'ABOUT',
      icon: '👨‍💻',
      description: 'My Journey'
    },
    { 
      id: 'contact', 
      position: [0, -4, 0] as [number, number, number], 
      color: '#ff8800', 
      label: 'CONTACT',
      icon: '📡',
      description: 'Let\'s Connect'
    },
    // ADDITIONAL MIND-BLOWING ELEMENTS
    { 
      id: 'tech', 
      position: [3, -2, 0] as [number, number, number], 
      color: '#cc00ff', 
      label: 'TECH',
      icon: '🔬',
      description: 'Cutting Edge'
    },
    { 
      id: 'ai', 
      position: [-3, -2, 0] as [number, number, number], 
      color: '#00ccff', 
      label: 'AI',
      icon: '🤖',
      description: 'Future Ready'
    },
  ];

  return (
    <>
      {elements.map((element) => (
            <group key={element.id} position={element.position}>
              <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.15}>
                <Box
                  args={[0.8, 0.8, 0.8]}
                  onPointerOver={() => setHovered(element.id)}
                  onPointerOut={() => setHovered(null)}
                >
                  <meshStandardMaterial
                    color={element.color}
                    metalness={0.9}
                    roughness={0.1}
                    transparent
                    opacity={hovered === element.id ? 0.9 : 0.6}
                    emissive={element.color}
                    emissiveIntensity={hovered === element.id ? 0.6 : 0.3}
                  />
                </Box>
              </Float>
          
          {/* HOLOGRAPHIC PROJECTION EFFECT */}
          <Html position={[0, -1.5, 0]} center>
            <div className="text-center glass-morphism p-3 rounded-lg neon-border animate-tactical-pulse">
              <div className="text-lg mb-1">{element.icon}</div>
              <div className="text-xs font-tactical text-tactical-primary font-semibold uppercase tracking-wider animate-glow">
                {element.label}
              </div>
              <div className="text-xs text-gray-400 font-tactical">
                {element.description}
              </div>
            </div>
          </Html>
        </group>
      ))}
    </>
  );
};

/**
 * MIND-BLOWING HOLOGRAPHIC PROJECTIONS - ABSOLUTELY STUNNING!
 */
const HolographicProjections: React.FC = () => {
  const projections = [
    { position: [6, 0, 0] as [number, number, number], color: '#00ff88', text: 'REACT' },
    { position: [-6, 0, 0] as [number, number, number], color: '#0088ff', text: 'THREE.JS' },
    { position: [0, 6, 0] as [number, number, number], color: '#ff4444', text: 'WEBGL' },
    { position: [0, -6, 0] as [number, number, number], color: '#ff8800', text: 'TYPESCRIPT' },
  ];

  return (
        <>
          {projections.map((projection, index) => (
            <group key={index} position={projection.position}>
              <Float speed={0.3} rotationIntensity={0.1} floatIntensity={0.05}>
                <Box args={[0.1, 2, 0.1]}>
                  <meshStandardMaterial
                    color={projection.color}
                    metalness={0.9}
                    roughness={0.1}
                    transparent
                    opacity={0.7}
                    emissive={projection.color}
                    emissiveIntensity={0.5}
                  />
                </Box>
              </Float>
          
          <Html position={[0, 0, 0]} center>
            <div className="text-center glass-morphism p-2 rounded-lg neon-border animate-tactical-pulse">
              <div className="text-xs font-tactical text-tactical-primary font-bold animate-glow">
                {projection.text}
              </div>
            </div>
          </Html>
        </group>
      ))}
    </>
  );
};

/**
 * ABSOLUTELY STUNNING 3D TECH ELEMENTS - MIND-BLOWING!
 */
const TechElements: React.FC = () => {
  const techElements = [
    { position: [2, 1, 2] as [number, number, number], color: '#00ff88', shape: 'box' },
    { position: [-2, 1, 2] as [number, number, number], color: '#0088ff', shape: 'sphere' },
    { position: [2, 1, -2] as [number, number, number], color: '#ff4444', shape: 'box' },
    { position: [-2, 1, -2] as [number, number, number], color: '#ff8800', shape: 'sphere' },
  ];

  return (
        <>
          {techElements.map((element, index) => (
            <group key={index} position={element.position}>
              <Float speed={0.4} rotationIntensity={0.15} floatIntensity={0.1}>
                {element.shape === 'box' ? (
                  <Box args={[0.3, 0.3, 0.3]}>
                    <meshStandardMaterial
                      color={element.color}
                      metalness={0.9}
                      roughness={0.1}
                      transparent
                      opacity={0.8}
                      emissive={element.color}
                      emissiveIntensity={0.4}
                    />
                  </Box>
                ) : (
                  <Sphere args={[0.2, 16, 16]}>
                    <meshStandardMaterial
                      color={element.color}
                      metalness={0.9}
                      roughness={0.1}
                      transparent
                      opacity={0.8}
                      emissive={element.color}
                      emissiveIntensity={0.4}
                    />
                  </Sphere>
                )}
              </Float>
        </group>
      ))}
    </>
  );
};

/**
 * Main Lobby Scene
 */
const LobbyScene: React.FC = () => {
  const { showScanLine } = useAppStore();
  
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
      <TacticalBackground variant="lobby" />

      {/* Main Content */}
      <AnimatedLogo />
      <FloatingParticles />
      <WelcomeText />
      <InteractiveElements />
      
      {/* MIND-BLOWING HOLOGRAPHIC PROJECTIONS */}
      <HolographicProjections />
      
      {/* ABSOLUTELY STUNNING 3D TECH ELEMENTS */}
      <TechElements />
      
      {/* CENTERED MAIN WELCOME PANEL - THE STAR OF THE SHOW */}
      <Html position={[0, 0, 0]} center>
        <div className={`text-center glass-morphism p-6 rounded-xl max-w-lg neon-border animate-scan-conditional ${!showScanLine ? 'scan-disabled' : ''}`}>
          <div className="mb-4">
            <div className="w-16 h-16 mx-auto mb-3 tactical-gradient rounded-full flex items-center justify-center neon-border animate-float">
              <span className="text-2xl font-display font-bold text-tactical-dark animate-glow">M</span>
            </div>
            <h2 className="text-2xl font-bold text-tactical-primary font-display mb-2 animate-neon">
              MAYANK CHAUHAN
            </h2>
            <p className="text-sm text-tactical-secondary font-tactical mb-4">
              AI & Robotics Engineer | B.Tech CSE with AI Specialization
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-3 text-xs font-tactical">
            <div className="p-3 bg-tactical-gray/30 rounded-lg neon-border hover:bg-tactical-primary/20 transition-all duration-300 interactive-element group">
              <div className="font-semibold text-tactical-primary animate-glow group-hover:scale-110 transition-transform">PROJECTS</div>
              <div className="text-gray-500 group-hover:text-tactical-primary transition-colors">AI Solutions</div>
            </div>
            <div className="p-3 bg-tactical-gray/30 rounded-lg neon-border hover:bg-holo-blue/20 transition-all duration-300 interactive-element group">
              <div className="font-semibold text-holo-blue animate-glow group-hover:scale-110 transition-transform">SKILLS</div>
              <div className="text-gray-500 group-hover:text-holo-blue transition-colors">Python & AI</div>
            </div>
            <div className="p-3 bg-tactical-gray/30 rounded-lg neon-border hover:bg-tactical-warning/20 transition-all duration-300 interactive-element group">
              <div className="font-semibold text-tactical-warning animate-glow group-hover:scale-110 transition-transform">ABOUT</div>
              <div className="text-gray-500 group-hover:text-tactical-warning transition-colors">VIT Chennai</div>
            </div>
            <div className="p-3 bg-tactical-gray/30 rounded-lg neon-border hover:bg-holo-purple/20 transition-all duration-300 interactive-element group">
              <div className="font-semibold text-holo-purple animate-glow group-hover:scale-110 transition-transform">CONTACT</div>
              <div className="text-gray-500 group-hover:text-holo-purple transition-colors">Connect</div>
            </div>
          </div>
          
          {/* MIND-BLOWING FEATURE: LIVE CODE STREAM */}
          <div className="mt-4 p-3 bg-tactical-darker/50 rounded-lg border border-tactical-primary/20 mind-blowing-effect">
            <div className="text-xs font-mono text-tactical-primary mb-2 animate-glow">LIVE CODE STREAM</div>
            <div className="text-xs font-mono text-holo-green animate-matrix-code">
              <div className="animate-hologram-flicker">const mayank = new AIEngineer();</div>
              <div className="animate-hologram-flicker" style={{ animationDelay: '0.5s' }}>mayank.specialize('AI', 'Robotics');</div>
              <div className="animate-hologram-flicker" style={{ animationDelay: '1s' }}>status: VIT CHENNAI ✓</div>
            </div>
          </div>
        </div>
      </Html>

      {/* Ground */}
      <ContactShadows
        position={[0, -2, 0]}
        opacity={0.4}
        scale={20}
        blur={2}
        far={4.5}
        resolution={256}
        color="#000000"
      />

      {/* Camera Controls */}
      <OrbitControls
        enablePan={window.innerWidth < 768 ? true : false}
        enableZoom={true}
        enableRotate={true}
        minDistance={window.innerWidth < 768 ? 5 : 3}
        maxDistance={window.innerWidth < 768 ? 15 : 10}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI - Math.PI / 6}
        autoRotate={false}
        autoRotateSpeed={0.5}
        touches={{
          ONE: window.innerWidth < 768 ? 2 : 1, // Two-finger rotation on mobile
          TWO: window.innerWidth < 768 ? 1 : 2, // One-finger pan on mobile
        }}
      />
    </>
  );
};

export default LobbyScene;