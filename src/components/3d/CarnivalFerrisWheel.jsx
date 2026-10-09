import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';

const CARTS = [
  { name: 'SAMSUNG', color: '#ffe600' },
  { name: 'DELL', color: '#ffffff' },
  { name: 'ROYAL ENFIELD', color: '#ffe600' },
  { name: 'EATSURE', color: '#ffffff' },
  { name: 'ASUS ROG', color: '#ffe600' },
  { name: 'GEMINI AI', color: '#ffffff' },
];

export default function CarnivalFerrisWheel({ position = [0, 0, 0], scale = 1 }) {
  const wheelRef = useRef();
  const radius = 4.5;
  const numCarts = CARTS.length;

  useFrame((state, delta) => {
    if (wheelRef.current) {
      wheelRef.current.rotation.z += delta * 0.25;
    }
  });

  return (
    <group position={position} scale={scale}>
      <group ref={wheelRef}>
        <mesh>
          <torusGeometry args={[radius, 0.08, 16, 64]} />
          <meshStandardMaterial color="#ffe600" roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh>
          <torusGeometry args={[radius * 0.7, 0.05, 16, 64]} />
          <meshStandardMaterial color="#ffffff" roughness={0.4} />
        </mesh>

        {CARTS.map((cart, idx) => {
          const angle = (idx / numCarts) * Math.PI * 2;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          return (
            <group key={idx}>
              <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.03, 0.03, radius, 8]} />
                <meshStandardMaterial color="#262626" />
              </mesh>

              <group position={[x, y, 0]}>
                <mesh>
                  <boxGeometry args={[1.2, 0.8, 0.8]} />
                  <meshStandardMaterial color={cart.color} roughness={0.2} />
                </mesh>
                <Text
                  position={[0, 0, 0.42]}
                  fontSize={0.22}
                  color="#000000"
                  font="/fonts/SpaceGrotesk-Bold.ttf"
                  anchorX="center"
                  anchorY="middle"
                >
                  {cart.name}
                </Text>
              </group>
            </group>
          );
        })}
      </group>

      <mesh position={[0, -radius * 1.1, 0]}>
        <cylinderGeometry args={[0.3, 1.8, radius * 1.2, 4]} />
        <meshStandardMaterial color="#171717" roughness={0.6} />
      </mesh>
    </group>
  );
}
