import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, useAnimations, Html } from '@react-three/drei';
import * as THREE from 'three';
import { soundFx } from '../../utils/audio';
import { RotateCw, Zap, Sparkles, Eye, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

// ─── EXACT WORLD COORDINATES (computed via offline analysis) ─────────────────
// The character faces in the +Z direction (front face at Z ≈ 0.15–0.31)
// Character Y range: 0.083–0.618 → center Y = 0.35
// Character Z range: 0.064–1.38  → center Z = 0.72
// Camera must be at NEGATIVE Z to look at the face
const CHARACTER_CENTER = new THREE.Vector3(0.003, 0.35, 0.72);
const CAMERA_START = new THREE.Vector3(0.003, 0.35, -1.8);
// ─────────────────────────────────────────────────────────────────────────────

function MemeEmojiModel({ isHyperSpin, bounceSignal, onModelClick }) {
  const groupRef = useRef();
  const { scene, animations } = useGLTF('/meme_emoji.glb');
  const { actions, names } = useAnimations(animations, groupRef);
  const bounceLerp = useRef(1);

  useEffect(() => {
    if (!scene) return;

    // Strip embedded lights & cameras that corrupt the coordinate space
    const toRemove = [];
    scene.traverse((child) => {
      if (child.isCamera || child.isLight ||
          child.name.toLowerCase().includes('camera') ||
          child.name.toLowerCase().includes('light')) {
        toRemove.push(child);
      }
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    toRemove.forEach((c) => c.parent?.remove(c));

    // Play the main arm animation
    const mainAction = actions[names[0]];
    if (mainAction) mainAction.reset().fadeIn(0.3).play();
  }, [scene, actions, names]);

  useEffect(() => {
    if (bounceSignal > 0) bounceLerp.current = 0;
  }, [bounceSignal]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Bounce recovery
    bounceLerp.current = Math.min(1, bounceLerp.current + delta * 6);
    const sx = 1 + (1.2 - 1) * (1 - bounceLerp.current);
    const sy = 1 + (0.8 - 1) * (1 - bounceLerp.current);
    groupRef.current.scale.set(sx, sy, sx);

    // Hyper spin
    if (isHyperSpin) {
      groupRef.current.rotation.y += delta * 16;
    }

    // Gentle float — oscillates along character's Y axis
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2.4) * 0.04;
  });

  return (
    <group ref={groupRef}>
      <primitive
        object={scene}
        onClick={(e) => { e.stopPropagation(); onModelClick(); }}
      />
    </group>
  );
}

function Loader() {
  return (
    <Html center>
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        padding: 16, borderRadius: 12, background: '#000',
        border: '2px solid #ffe600', fontFamily: 'monospace', fontSize: 11, color: '#ffe600'
      }}>
        <div style={{
          width: 20, height: 20, border: '2px solid #ffe600',
          borderTopColor: 'transparent', borderRadius: '50%',
          animation: 'spin 0.8s linear infinite'
        }} />
        LOADING EMOJI...
      </div>
    </Html>
  );
}

export default function MemeEmojiViewer() {
  const [clickCount, setClickCount] = useState(0);
  const [isHyperSpin, setIsHyperSpin] = useState(false);
  const [bounceSignal, setBounceSignal] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const controlsRef = useRef();
  const pointerDown = useRef(null);

  // Kill hyper-spin after 3 sec
  useEffect(() => {
    if (!isHyperSpin) return;
    const t = setTimeout(() => setIsHyperSpin(false), 3000);
    return () => clearTimeout(t);
  }, [isHyperSpin]);

  // Reset combo counter
  useEffect(() => {
    if (!clickCount) return;
    const t = setTimeout(() => setClickCount(0), 1800);
    return () => clearTimeout(t);
  }, [clickCount]);

  const fireClick = () => {
    soundFx.pop();
    setBounceSignal((n) => n + 1);
    setClickCount((prev) => {
      const next = prev + 1;
      if (next >= 4) {
        setIsHyperSpin(true);
        soundFx.laser();
        confetti({ particleCount: 70, spread: 90, colors: ['#ffe600', '#ffffff'] });
        return 0;
      }
      return next;
    });
  };

  const fireHyperSpin = () => {
    soundFx.laser();
    setIsHyperSpin(true);
    confetti({ particleCount: 60, spread: 80, colors: ['#ffe600', '#ffffff'] });
  };

  const resetView = () => {
    soundFx.warp();
    const ctrl = controlsRef.current;
    if (ctrl) {
      ctrl.object.position.copy(CAMERA_START);
      ctrl.target.copy(CHARACTER_CENTER);
      ctrl.update();
    }
  };

  // Distinguish tap vs drag on canvas
  const handlePointerDown = (e) => {
    pointerDown.current = { x: e.clientX, y: e.clientY, t: Date.now() };
  };
  const handlePointerUp = (e) => {
    if (!pointerDown.current) return;
    const dx = Math.abs(e.clientX - pointerDown.current.x);
    const dy = Math.abs(e.clientY - pointerDown.current.y);
    const dt = Date.now() - pointerDown.current.t;
    if (dx < 8 && dy < 8 && dt < 400) fireClick();
    pointerDown.current = null;
  };

  return (
    <div className="relative w-full h-[520px] sm:h-[620px] lg:h-[680px] rounded-3xl bg-[#080808] border-2 border-[#ffe600] overflow-hidden brutal-shadow-white flex flex-col select-none">
      {/* ── Top status bar ── */}
      <div className="z-20 flex items-center justify-between px-4 py-3 bg-black/80 backdrop-blur-md border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#ffe600] animate-ping" />
          <span className="font-mono-code text-xs font-bold text-white uppercase">3D EMOJI MASCOT // INTERACTIVE</span>
        </div>
        <div className="flex items-center gap-2">
          {clickCount > 0 && !isHyperSpin && (
            <span className="px-2.5 py-1 rounded bg-[#ffe600] text-black font-mono-code font-black text-xs animate-pulse">
              COMBO x{clickCount} {clickCount >= 3 ? '→ NEXT: HYPER SPIN!' : ''}
            </span>
          )}
          {isHyperSpin && (
            <span className="px-2.5 py-1 rounded bg-white text-black font-display font-black text-xs animate-bounce">
              HYPER SPIN!
            </span>
          )}
        </div>
      </div>

      {/* ── 3D Canvas ── */}
      <div
        className="flex-1 cursor-grab active:cursor-grabbing"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        <Canvas
          camera={{ position: CAMERA_START.toArray(), fov: 52 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true }}
        >
          <color attach="background" args={['#080808']} />

          <ambientLight intensity={2.0} />
          <directionalLight position={[3, 2, -4]} intensity={2.8} color="#ffffff" />
          <directionalLight position={[-3, 1, 3]} intensity={1.0} color="#ffe600" />
          <pointLight position={[0, 0.5, -2]} intensity={3.0} color="#ffe600" distance={6} />

          <Suspense fallback={<Loader />}>
            <MemeEmojiModel
              isHyperSpin={isHyperSpin}
              bounceSignal={bounceSignal}
              onModelClick={fireClick}
            />
          </Suspense>

          {/* OrbitControls: target at character CENTER, allowing infinite 360° drag */}
          <OrbitControls
            ref={controlsRef}
            target={CHARACTER_CENTER.toArray()}
            enableZoom={false}
            enablePan={false}
            autoRotate={autoRotate && !isHyperSpin}
            autoRotateSpeed={2.5}
            rotateSpeed={1.0}
            dampingFactor={0.1}
            enableDamping
          />
        </Canvas>
      </div>

      {/* ── Bottom toolbar ── */}
      <div className="z-20 px-4 py-3 bg-black/90 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 font-mono-code text-[10px] text-gray-400">
          <RotateCw className="w-3 h-3 text-[#ffe600]" />
          <span>DRAG 360° // CLICK EMOJI TO ANIMATE // 4× FOR HYPER SPIN</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fireClick}
            className="px-3 py-1.5 rounded-lg bg-[#ffe600] text-black font-display font-black text-xs uppercase flex items-center gap-1.5 hover:bg-white transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" /> CLICK ACTION
          </button>
          <button
            onClick={fireHyperSpin}
            className="px-3 py-1.5 rounded-lg bg-white text-black font-display font-black text-xs uppercase flex items-center gap-1.5 hover:bg-[#ffe600] transition-colors"
          >
            <Zap className="w-3.5 h-3.5" /> HYPER SPIN
          </button>
          <button
            onClick={resetView}
            className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700 text-gray-300 font-mono-code text-xs font-bold flex items-center gap-1.5 hover:border-white transition-colors"
          >
            <Eye className="w-3.5 h-3.5" /> FRONT VIEW
          </button>
          <button
            onClick={() => { soundFx.pop(); setAutoRotate(!autoRotate); }}
            className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700 text-gray-300 font-mono-code text-xs font-bold flex items-center gap-1.5 hover:border-white transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>{autoRotate ? 'AUTO: ON' : 'AUTO: OFF'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

useGLTF.preload('/meme_emoji.glb');
