'use client';
import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { signatureDishes } from '../../data/menuData';
import { siteContent } from '@/data/copy';

gsap.registerPlugin(ScrollTrigger);

const { menu: menuCopy } = siteContent;

const MenuHighlight = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.signature-card', {
        y: 50,
        opacity: 0,
        scale: 0.97,
        duration: 1.4,
        stagger: 0.18,
        ease: 'expo.out',
        force3D: true,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const offsets = [
    'md:translate-y-0',
    'md:translate-y-4',
    'md:translate-y-2',
  ];

  return (
    <section
      ref={sectionRef}
      className="w-full pt-6 sm:pt-8 pb-12 sm:pb-16 px-6 sm:px-12 md:px-20 lg:px-32 bg-charcoal relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-6 sm:mb-8">
          <span className="font-caveat text-gold text-2xl sm:text-3xl block mb-4">
            {menuCopy.highlightEyebrow}
          </span>
          <h2 className="font-playfair text-cream text-4xl sm:text-5xl md:text-6xl">
            {menuCopy.highlightHeadline}
          </h2>
        </div>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 mb-8 sm:mb-10">
          {signatureDishes.map((dish, i) => (
            <div
              key={i}
              className={`signature-card group flex flex-col items-center text-center ${offsets[i]}`}
            >
              {/* Circular image */}
              <div className="relative w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 mb-8 rounded-full overflow-hidden border-2 border-gold/30 group-hover:border-gold/60 transition-all duration-500 group-hover:scale-[1.03] group-hover:rotate-2 group-hover:shadow-[0_0_40px_rgba(232,93,38,0.2)] bg-charcoal">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="relative z-10 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>

              {/* Name */}
              <h3 className="font-playfair text-cream text-2xl sm:text-3xl mb-3 group-hover:text-flame transition-colors duration-300">
                {dish.name}
              </h3>

              {/* Poetic description */}
              <p className="font-sans text-smoke italic text-sm sm:text-base leading-relaxed max-w-xs mb-4">
                {dish.poeticDesc}
              </p>

              {/* Price */}
              <span className="font-mono text-gold text-xl">
                {dish.price}
              </span>
            </div>
          ))}
        </div>

        {/* Nota coperto — chiude il menu */}
        <p className="text-center font-sans text-smoke/70 text-xs sm:text-sm">
          {menuCopy.copertoNote}
        </p>
      </div>
    </section>
  );
};

export default MenuHighlight;
