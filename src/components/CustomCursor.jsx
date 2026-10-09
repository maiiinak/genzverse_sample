import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      const target = e.target;
      const isClickable = target.closest('button') || target.closest('a') || target.closest('.cursor-pointer') || target.closest('input') || target.closest('textarea');
      setIsPointer(!!isClickable);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* Outer Yellow/White Ring */}
      <div
        className={`fixed pointer-events-none z-50 rounded-full transition-all duration-100 ease-out hidden md:block ${
          isPointer
            ? 'w-12 h-12 -translate-x-6 -translate-y-6 bg-[#ffe600]/20 border-2 border-[#ffe600] scale-125'
            : 'w-8 h-8 -translate-x-4 -translate-y-4 border-2 border-white'
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          boxShadow: isPointer ? '0 0 16px #ffe600' : '0 0 8px rgba(255, 255, 255, 0.4)',
        }}
      />
      {/* Center Yellow Dot */}
      <div
        className="fixed pointer-events-none z-50 w-2 h-2 -translate-x-1 -translate-y-1 bg-[#ffe600] rounded-full hidden md:block"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
    </>
  );
}
