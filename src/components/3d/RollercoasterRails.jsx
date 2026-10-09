import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function RollercoasterRails() {
  const cartRef = useRef();

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(-12, 1, -5),
        new THREE.Vector3(-8, 5, -2),
        new THREE.Vector3(-3, 2, 2),
        new THREE.Vector3(2, -2, 4),
        new THREE.Vector3(7, 3, 1),
        new THREE.Vector3(12, 0, -4),
        new THREE.Vector3(6, -4, -6),
        new THREE.Vector3(-2, -1, -5),
        new THREE.Vector3(-8, 3, -4),
        new THREE.Vector3(-12, 1, -5),
      ],
      true
    );
  }, []);

  const tubeGeometry = useMemo(() => {
    return new THREE.TubeGeometry(curve, 120, 0.08, 8, true);
  }, [curve]);

  useFrame((state) => {
    if (cartRef.current) {
      const time = state.clock.getElapsedTime() * 0.08;
      const point = curve.getPointAt(time % 1);
      const tangent = curve.getTangentAt(time % 1);

      cartRef.current.position.copy(point);
      cartRef.current.lookAt(point.clone().add(tangent));
    }
  });

  return (
    <group>
      <mesh geometry={tubeGeometry}>
        <meshStandardMaterial
          color="#ffe600"
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      <group ref={cartRef}>
        <mesh position={[0, 0.25, 0]}>
          <boxGeometry args={[0.5, 0.3, 0.9]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} />
        </mesh>

        <pointLight color="#ffe600" intensity={2.0} distance={4} />
      </group>
    </group>
  );
}
