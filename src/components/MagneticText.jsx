import React, { useRef, useEffect, useState } from 'react';

/**
 * MagneticText — wraps any text in an interactive hover/click effect.
 * 
 * HOW IT WORKS:
 * - On hover: each letter floats, glows, and magnetically follows the cursor slightly
 * - On click: the whole word shakes
 * - Zero dependencies beyond React
 */
export default function MagneticText({ children, className = '', tag: Tag = 'span', intensity = 1 }) {
  const ref = useRef(null);
  const [shaking, setShaking] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const letters = el.querySelectorAll('.mag-letter');

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * 0.06 * intensity;
      const dy = (e.clientY - cy) * 0.06 * intensity;

      letters.forEach((letter, i) => {
        const offset = (i - letters.length / 2) * 0.6;
        letter.style.transform = `translate(${dx + offset * 0.5}px, ${dy}px) scale(1.08)`;
        letter.style.textShadow = `0 0 12px #ffe600, 0 0 28px rgba(255,230,0,0.5)`;
        letter.style.color = '#ffe600';
      });
    };

    const handleMouseLeave = () => {
      letters.forEach((letter) => {
        letter.style.transform = '';
        letter.style.textShadow = '';
        letter.style.color = '';
      });
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [intensity]);

  const handleClick = () => {
    setShaking(true);
    setTimeout(() => setShaking(false), 450);
  };

  // Split text into individual letter spans
  const renderLetters = (text) => {
    if (typeof text !== 'string') return text;
    return text.split('').map((char, i) => (
      <span
        key={i}
        className="mag-letter inline-block transition-all duration-150 ease-out cursor-default"
        style={{ willChange: 'transform, color' }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  const processChildren = (child) => {
    if (typeof child === 'string') return renderLetters(child);
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        children: React.Children.map(child.props.children, processChildren),
      });
    }
    return child;
  };

  return (
    <Tag
      ref={ref}
      className={`${className} ${shaking ? 'mag-shake' : ''} select-none`}
      onClick={handleClick}
    >
      {React.Children.map(children, processChildren)}
    </Tag>
  );
}
