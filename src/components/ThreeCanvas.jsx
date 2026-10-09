import React, { Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { MemeEmojiMascot } from './3d/MemeEmojiMascot';
import { TwinklingStarField } from './3d/TwinklingStarField';

function CameraController({ mousePos }) {
  const { camera } = useThree();

  useFrame((state, delta) => {
    const targetX = mousePos.current.x * 0.4;
    const targetY = mousePos.current.y * 0.3;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, delta * 3);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, delta * 3);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function Loader() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-black border border-[#ffe600] font-mono-code text-xs text-[#ffe600] brutal-shadow-yellow">
        <div className="w-5 h-5 border-2 border-[#ffe600] border-t-transparent rounded-full animate-spin" />
        <span>LOADING 3D MASCOT...</span>
      </div>
    </Html>
  );
}

export default function ThreeCanvas({ mousePos }) {
  return (
    <div className="fixed inset-0 pointer-events-auto z-0">
      <Canvas
        camera={{ position: [0, 0, 4.8], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#050505']} />

        {/* Crisp Studio Lighting tailored for yellow and skin tones */}
        <ambientLight intensity={1.5} />
        <directionalLight position={[6, 8, 8]} intensity={2.2} color="#ffffff" />
        <directionalLight position={[-6, -4, -4]} intensity={0.9} color="#ffe600" />
        <pointLight position={[0, 4, 3]} intensity={2.0} color="#ffe600" distance={12} />

        <Suspense fallback={<Loader />}>
          <MemeEmojiMascot mousePos={mousePos} />
        </Suspense>

        <TwinklingStarField count={200} />
        <CameraController mousePos={mousePos} />
      </Canvas>
    </div>
  );
}
