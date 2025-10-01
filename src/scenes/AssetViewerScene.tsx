import React from 'react';
import { Html } from '@react-three/drei';

/**
 * Asset Viewer Scene - 3D model viewer
 */
const AssetViewerScene: React.FC = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      
      <Html center>
        <div className="text-center">
          <h1 className="text-4xl font-bold text-tactical-primary font-display mb-4">
            ASSET VIEWER
          </h1>
          <p className="text-lg text-tactical-secondary font-mono">
            3D Model Inspector
          </p>
          <p className="text-sm text-gray-400 mt-4">
            Coming Soon - Interactive 3D model viewer
          </p>
        </div>
      </Html>
    </>
  );
};

export default AssetViewerScene;



