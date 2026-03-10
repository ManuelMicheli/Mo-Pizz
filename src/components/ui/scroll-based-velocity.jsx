'use client';
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
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
        window.addEventListener('resize', calculateRepetitions);
        return () => window.removeEventListener('resize', calculateRepetitions);
    }, [children]);

    useEffect(() => {
        if (!innerRef.current || repetitions <= 1) return;

        let lastScrollY = window.scrollY;
        let scrollVelocity = 0;
        let smoothVelocity = 0;

        const setter = gsap.quickSetter(innerRef.current, 'x', '%');

        const onTick = (_time, deltaTime) => {
            const dt = deltaTime / 1000;

            // Track scroll velocity
            const currentScrollY = window.scrollY;
            scrollVelocity = dt > 0 ? (currentScrollY - lastScrollY) / dt : 0;
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

            setter(xRef.current);
        };

        gsap.ticker.add(onTick);

        return () => {
            gsap.ticker.remove(onTick);
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
