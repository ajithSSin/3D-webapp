import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";

// Loader
function Loader() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 text-white">
      <div className="w-12 h-12 border-4 border-gray-400 border-t-blue-500 rounded-full animate-spin" />
      <p className="mt-3 text-sm text-gray-300">Loading 3D model...</p>
    </div>
  );
}

// Model loader
function Model({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1.2} />;
}

export default function ModelViewer({ filename }) {
  const [fileUrl, setFileUrl] = useState(null);

  useEffect(() => {
    if (filename) {
      setFileUrl(`/download/${filename}`);
    }
  }, [filename]);

  if (!fileUrl) {
    return <div className="text-center text-gray-400">Select a model to view.</div>;
  }

  return (
    <div className="relative w-full h-[500px] bg-gray-500 rounded-xl shadow-lg overflow-hidden">
      <Suspense fallback={<Loader />}>
        <Canvas camera={{ position: [0, 1, 6], fov: 50 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} />
          <Model url={fileUrl} />
          <Environment preset="city" />
          <OrbitControls enableZoom enablePan />
        </Canvas>
      </Suspense>
    </div>
  );
}