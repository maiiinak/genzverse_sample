import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function FloatingArtifacts() {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
      groupRef.current.rotation.x += delta * 0.1;
    }
  });

  const shapes = [
    { type: 'octa', pos: [-5, 3, -4], color: '#ffe600', scale: 0.8 },
    { type: 'ico', pos: [6, 2, -3], color: '#ffffff', scale: 1.1 },
    { type: 'torus', pos: [-6, -2, -2], color: '#ffe600', scale: 1.0 },
    { type: 'box', pos: [5, -1, -5], color: '#ffffff', scale: 0.7 },
    { type: 'dodeca', pos: [0, 4.5, -6], color: '#ffe600', scale: 1.2 },
    { type: 'torus', pos: [4, -4, -4], color: '#ffffff', scale: 0.9 },
  ];

  return (
    <group ref={groupRef}>
      {shapes.map((s, idx) => (
        <mesh key={idx} position={s.pos} scale={s.scale}>
          {s.type === 'octa' && <octahedronGeometry args={[1, 0]} />}
          {s.type === 'ico' && <icosahedronGeometry args={[1, 0]} />}
          {s.type === 'torus' && <torusGeometry args={[0.8, 0.3, 16, 32]} />}
          {s.type === 'box' && <boxGeometry args={[1.2, 1.2, 1.2]} />}
          {s.type === 'dodeca' && <dodecahedronGeometry args={[1, 0]} />}

          <meshStandardMaterial
            color={s.color}
            roughness={0.2}
            metalness={0.8}
            wireframe={idx % 2 === 0}
          />
        </mesh>
      ))}
    </group>
  );
}
