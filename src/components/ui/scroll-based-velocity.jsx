'use client';
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export const wrap = (min, max, v) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export function ParallaxText({ children, baseVelocity = 100, className }) {
    const [repetitions, setRepetitions] = useState(1);
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const innerRef = useRef(null);
    const xRef = useRef(0);
    const directionRef = useRef(1);

    useEffect(() => {
        const calculateRepetitions = () => {
            if (containerRef.current && textRef.current) {
                const containerWidth = containerRef.current.offsetWidth;
                const textWidth = textRef.current.offsetWidth;
                const newRepetitions = Math.ceil(containerWidth / textWidth) + 2;
                setRepetitions(newRepetitions);
            }
        };
        calculateRepetitions();
        let t;
        const onResize = () => {
            clearTimeout(t);
            t = setTimeout(calculateRepetitions, 150);
        };
        window.addEventListener('resize', onResize, { passive: true });
        return () => {
            clearTimeout(t);
            window.removeEventListener('resize', onResize);
        };
    }, [children]);

    useEffect(() => {
        const inner = innerRef.current;
        const container = containerRef.current;
        if (!inner || !container || repetitions <= 1) return;
        // Decorative motion only — skip entirely under reduced-motion.
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        let lastScrollY = window.scrollY;
        let smoothVelocity = 0;
        let lastTime = 0;
        let rafId = 0;
        let running = false;

        const frame = (time) => {
            const dt = lastTime ? (time - lastTime) / 1000 : 0;
            lastTime = time;

            // Track scroll velocity
            const currentScrollY = window.scrollY;
            const scrollVelocity = dt > 0 ? (currentScrollY - lastScrollY) / dt : 0;
            lastScrollY = currentScrollY;

            // Smooth the velocity (spring-like damping)
            smoothVelocity += (scrollVelocity - smoothVelocity) * 0.05;

            // Map scroll speed to animation speed multiplier
            const velocityFactor = Math.max(-5, Math.min(5, smoothVelocity / 200));

            if (velocityFactor < 0) {
                directionRef.current = -1;
            } else if (velocityFactor > 0) {
                directionRef.current = 1;
            }

            let moveBy = directionRef.current * baseVelocity * dt;
            moveBy += directionRef.current * moveBy * Math.abs(velocityFactor);

            xRef.current += moveBy;
            xRef.current = wrap(-100 / repetitions, 0, xRef.current);

            inner.style.transform = `translateX(${xRef.current}%)`;
            rafId = requestAnimationFrame(frame);
        };

        const start = () => {
            if (running) return;
            running = true;
            lastTime = 0;
            lastScrollY = window.scrollY;
            rafId = requestAnimationFrame(frame);
        };
        const stop = () => {
            running = false;
            if (rafId) cancelAnimationFrame(rafId);
            rafId = 0;
        };

        // Only animate while the marquee is on screen — no main-thread work otherwise.
        const io = new IntersectionObserver(
            ([entry]) => (entry.isIntersecting ? start() : stop()),
            { threshold: 0 }
        );
        io.observe(container);

        return () => {
            io.disconnect();
            stop();
        };
    }, [baseVelocity, repetitions]);

    return (
        <div className="w-full overflow-hidden whitespace-nowrap" ref={containerRef}>
            <div ref={innerRef} className={cn('inline-block', className)}>
                {Array.from({ length: repetitions }).map((_, i) => (
                    <span key={i} ref={i === 0 ? textRef : null}>
                        {children}{' '}
                    </span>
                ))}
            </div>
        </div>
    );
}

export function VelocityScroll({ text, default_velocity = 5, className }) {
    return (
        <section className="relative w-full">
            <ParallaxText baseVelocity={default_velocity} className={className}>
                {text}
            </ParallaxText>
            <ParallaxText baseVelocity={-default_velocity} className={className}>
                {text}
            </ParallaxText>
        </section>
    );
}
