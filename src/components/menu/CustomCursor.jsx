import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = ({ isActive }) => {
  const cursorRef = useRef(null);
  const xTo = useRef(null);
  const yTo = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    xTo.current = gsap.quickTo(cursor, 'x', { duration: 0.6, ease: 'power3' });
    yTo.current = gsap.quickTo(cursor, 'y', { duration: 0.6, ease: 'power3' });

    const onMove = (e) => {
      xTo.current(e.clientX);
      yTo.current(e.clientY);
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    gsap.to(cursor, {
      scale: isActive ? 1 : 0,
      opacity: isActive ? 1 : 0,
      duration: 0.4,
      ease: 'power2.inOut',
    });
  }, [isActive]);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden lg:flex"
      style={{ willChange: 'transform' }}
    >
      <div className="w-20 h-20 rounded-full border border-cream/60 flex items-center justify-center">
        <span className="font-caveat text-cream text-sm tracking-wider">Scorri</span>
      </div>
    </div>
  );
};

export default CustomCursor;
