import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";

// Loader component using pure Tailwind CSS
function Loader() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                    flex flex-col items-center text-white font-sans">
      <div
        className="w-12 h-12 border-[6px] border-white/20 border-t-white 
                   rounded-full animate-spin"
      />
      <p className="mt-3 text-sm tracking-wide text-gray-200">
        Loading 3D model...
      </p>
      
    </div>
  );
}

// 3D model loader
function Model({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1.5} />;
}

// Main Model Viewer
export default function ModelViewer({ filename }) {
  const fileUrl = `http://localhost:5000/download/${filename}`;

  return (
    <div className="w-80 h-80 relative bg-gray-900 
                    flex items-center justify-center rounded-xl shadow-lg overflow-hidden">
      <Suspense fallback={<Loader />}>
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 5, 5]} />
          <Model url={fileUrl} />
          <Environment preset="city" />
          <OrbitControls enableZoom={true} />
        </Canvas>
      </Suspense>
    </div>
  );
}