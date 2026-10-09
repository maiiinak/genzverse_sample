import React, { useRef, useEffect, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations, Float, Text } from '@react-three/drei';
import * as THREE from 'three';
import { soundFx } from '../../utils/audio';

export function MemeEmojiMascot({ mousePos }) {
  const groupRef = useRef();
  const modelWrapperRef = useRef();
  const { scene, animations } = useGLTF('/meme_emoji.glb');
  const { actions, names } = useAnimations(animations, modelWrapperRef);

  const [hovered, setHovered] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [isHyperMode, setIsHyperMode] = useState(false);
  const [comboLabel, setComboLabel] = useState('');

  // Drag rotation state
  const isDragging = useRef(false);
  const previousPointerPos = useRef({ x: 0, y: 0 });
  const dragRotation = useRef({ x: 0, y: 0 });
  const dragVelocity = useRef({ x: 0, y: 0 });

  // Bones refs
  const headBoneRef = useRef(null);
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);

  // Auto-normalize and center the model regardless of its raw coordinates
  useEffect(() => {
    if (!scene) return;

    // Traverse and locate bones & configure materials
    scene.traverse((node) => {
      if (node.isBone) {
        const name = node.name.toLowerCase();
        if (name.includes('head')) headBoneRef.current = node;
        if (name.includes('leye')) leftEyeRef.current = node;
        if (name.includes('reye')) rightEyeRef.current = node;
      }
      if (node.isMesh) {
        node.castShadow = true;
        node.receiveShadow = true;
      }
    });

    // Compute bounding box to auto-center & auto-scale
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) {
      // Normalize to 2.4 units height/width
      const targetScale = 2.4 / maxDim;
      scene.scale.set(targetScale, targetScale, targetScale);
      scene.position.set(
        -center.x * targetScale,
        -center.y * targetScale,
        -center.z * targetScale
      );
    }

    // Play default animation
    if (names.length > 0 && actions[names[0]]) {
      actions[names[0]].reset().fadeIn(0.5).play();
    }

    return () => {
      names.forEach((name) => {
        if (actions[name]) actions[name].stop();
      });
    };
  }, [scene, actions, names]);

  // Click combo timer
  useEffect(() => {
    if (clickCount === 0) return;
    const timer = setTimeout(() => {
      setClickCount(0);
      setIsHyperMode(false);
      setComboLabel('');
    }, 1600);
    return () => clearTimeout(timer);
  }, [clickCount]);

  // Pointer drag listeners for 360-degree interactive rotation
  const handlePointerDown = (e) => {
    e.stopPropagation();
    isDragging.current = true;
    previousPointerPos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    const handleMove = (e) => {
      if (!isDragging.current) return;
      const deltaX = e.clientX - previousPointerPos.current.x;
      const deltaY = e.clientY - previousPointerPos.current.y;
      previousPointerPos.current = { x: e.clientX, y: e.clientY };

      dragVelocity.current.y = deltaX * 0.008;
      dragVelocity.current.x = deltaY * 0.008;
      dragRotation.current.y += dragVelocity.current.y;
      dragRotation.current.x += dragVelocity.current.x;
    };

    const handleUp = () => {
      isDragging.current = false;
    };

    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerup', handleUp);
    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleUp);
    };
  }, []);

  const handleClick = (e) => {
    e.stopPropagation();
    soundFx.pop();

    setClickCount((prev) => {
      const next = prev + 1;
      if (next >= 4) {
        setIsHyperMode(true);
        setComboLabel(`COMBO x${next}! HYPER SPIN`);
        soundFx.laser();
        if (names.length > 0 && actions[names[0]]) {
          actions[names[0]].setEffectiveTimeScale(3.0);
        }
      } else {
        setComboLabel(`CLICK x${next}`);
        if (names.length > 0 && actions[names[0]]) {
          actions[names[0]].setEffectiveTimeScale(1.8);
          setTimeout(() => {
            if (actions[names[0]]) actions[names[0]].setEffectiveTimeScale(1.0);
          }, 800);
        }
      }
      return next;
    });
  };

  // Render loop: head tracking, drag inertia, and hyper-spin
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Apply drag inertia with dampening
    if (!isDragging.current) {
      dragVelocity.current.x *= 0.92;
      dragVelocity.current.y *= 0.92;
      dragRotation.current.x += dragVelocity.current.x;
      dragRotation.current.y += dragVelocity.current.y;
    }

    const mx = mousePos.current.x;
    const my = mousePos.current.y;

    if (isHyperMode) {
      // Rapid hyper spin when clicked repeatedly
      groupRef.current.rotation.y += delta * 12;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 15) * 0.25;
    } else {
      // Base orientation combines mouse look-at and user drag rotation
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        dragRotation.current.y + mx * 0.45,
        delta * 6
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        dragRotation.current.x - my * 0.3,
        delta * 6
      );

      // Smooth floating oscillation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2.2) * 0.08;
    }

    // Independent Head Bone mouse tracking
    if (headBoneRef.current) {
      headBoneRef.current.rotation.y = THREE.MathUtils.lerp(
        headBoneRef.current.rotation.y,
        mx * 0.7,
        delta * 8
      );
      headBoneRef.current.rotation.x = THREE.MathUtils.lerp(
        headBoneRef.current.rotation.x,
        -my * 0.5,
        delta * 8
      );
    }

    // Eye bone tracking
    if (leftEyeRef.current && rightEyeRef.current) {
      leftEyeRef.current.rotation.y = THREE.MathUtils.lerp(leftEyeRef.current.rotation.y, mx * 0.4, delta * 10);
      rightEyeRef.current.rotation.y = THREE.MathUtils.lerp(rightEyeRef.current.rotation.y, mx * 0.4, delta * 10);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* 3D Mascot Model Group */}
      <group
        ref={groupRef}
        onClick={handleClick}
        onPointerDown={handlePointerDown}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
        cursor="grab"
      >
        <group ref={modelWrapperRef}>
          <primitive object={scene} />
        </group>

        {/* Floating click combo label */}
        {comboLabel && (
          <Text
            position={[0, 1.6, 0]}
            fontSize={0.22}
            color="#ffe600"
            font="/fonts/SpaceGrotesk.ttf"
            anchorX="center"
            anchorY="middle"
          >
            {comboLabel}
          </Text>
        )}
      </group>

      {/* Rotating Electric Yellow Pedestal Ring (Inspired by Globe Snippet) */}
      <group position={[0, -1.35, 0]} rotation={[Math.PI / 2.2, 0, 0]}>
        <mesh>
          <ringGeometry args={[1.5, 1.55, 64]} />
          <meshBasicMaterial color="#ffe600" side={THREE.DoubleSide} transparent opacity={0.6} />
        </mesh>
        <mesh>
          <ringGeometry args={[1.7, 1.72, 64]} />
          <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} transparent opacity={0.3} />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload('/meme_emoji.glb');
