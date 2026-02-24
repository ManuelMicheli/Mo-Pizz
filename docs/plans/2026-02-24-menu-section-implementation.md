# Immersive Menu Section — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the existing Menu section with an Awwwards-level immersive cinematic experience featuring video background intro, GSAP horizontal scroll navigation across 4 menu categories, cursor-following dish image reveals, and a signature highlight CTA section.

**Architecture:** Three stacked sub-sections compose the full menu experience: (1) MenuIntro — full-viewport video background with scroll-triggered copy reveal, (2) MenuHorizontalScroll — GSAP ScrollTrigger pinned horizontal scroll through 4 category panels with custom cursor and hover image reveals, (3) MenuHighlight — asymmetric signature dish grid with CTA. A parent `MenuSection` component orchestrates all three. Data lives in a separate `menuData.js` file.

**Tech Stack:** React 18, GSAP 3.12 + ScrollTrigger (already installed), Tailwind CSS 3.4, Lenis smooth scroll (already integrated). No new dependencies.

**Design doc:** `docs/plans/2026-02-24-menu-section-design.md`

---

## Task 1: Create Menu Data Module

**Files:**
- Create: `src/data/menuData.js`

**Step 1: Create the data file**

Create `src/data/menuData.js` with all menu items organized into 4 category objects. Each category has: `id`, `title`, `subtitle`, `heroImage` (placeholder path), and `items` array. Each item has `name`, `desc` (ingredients), `price`, and optionally `badges` (array of "DOP"/"IGP"/"DOCG" strings) and `hoverImage` (placeholder path).

```js
// src/data/menuData.js

export const menuCategories = [
  {
    id: 'pizzeria',
    title: 'La Pizzeria',
    subtitle: 'Fiordilatte del Matese IGP, San Marzano dell\'Agro Sarnese IGP, 48 ore di doppia lievitazione',
    heroImage: '/images/menu/pizzeria-hero.jpg',
    sections: [
      {
        heading: 'Le Classiche',
        items: [
          { name: 'Margherita', desc: 'San Marzano, fiordilatte del Matese, basilico, olio EVO', price: '7.00', badges: ['IGP'] },
          { name: 'Margherita Sbagliata', desc: 'Pomodoro giallo, fiordilatte, basilico', price: '7.50' },
          { name: 'Marinara', desc: 'San Marzano, aglio, origano, olio EVO', price: '6.00' },
          { name: 'Margherita DOP', desc: 'Caciocavallo, pomodorini confit, basilico', price: '8.50', badges: ['DOP'] },
          { name: 'Margherita Reale', desc: 'Bufala Campana DOP, San Marzano, basilico', price: '8.50', badges: ['DOP'] },
          { name: 'Cosacca', desc: 'Pecorino romano, olio piccante, pomodoro', price: '6.50' },
          { name: 'Diavola', desc: 'Spianata piccante, fiordilatte, San Marzano', price: '8.00' },
          { name: 'Quattro Stagioni', desc: 'Carciofi, funghi, prosciutto, olive', price: '9.00' },
          { name: 'Capricciosa', desc: 'Prosciutto cotto, funghi, carciofi, olive', price: '9.50' },
          { name: 'Cotto e Funghi', desc: 'Prosciutto cotto, champignon, fiordilatte', price: '8.50' },
          { name: 'Rustica', desc: 'Gorgonzola, spianata, olive taggiasche', price: '9.00' },
          { name: 'Stamm Lontan', desc: 'Tonno, cipolla rossa di Tropea', price: '8.00' },
          { name: 'Fantasia dell\'Orto', desc: 'Verdure al forno di stagione, fiordilatte', price: '8.00' },
          { name: 'Quattro Formaggi', desc: 'Fiordilatte, gorgonzola, parmigiano, provola', price: '8.50' },
          { name: 'Ricca', desc: 'Panna, speck del Trentino, fiordilatte', price: '8.50' },
          { name: 'Tirolese', desc: 'Porcini, gorgonzola, speck', price: '10.00' },
          { name: 'Ardita', desc: 'Peperoni, salsiccia casertana', price: '10.00' },
          { name: 'Napoli', desc: 'Acciuga, origano, San Marzano', price: '8.00' },
          { name: 'Romana', desc: 'Cappero, olive taggiasche, acciuga', price: '8.50' },
          { name: 'Parmigiana', desc: 'Melanzane fritte, pomodoro, fiordilatte', price: '9.00' },
          { name: 'Provola e Pepe', desc: 'Provola di Agerola, pepe nero', price: '8.00' },
        ]
      },
      {
        heading: 'Le Mo Pizz dello Chef',
        items: [
          { name: 'Bronte 2.0', desc: 'Burrata, mortadella, pistacchio di Bronte', price: '14.00', hoverImage: '/images/menu/bronte.jpg' },
          { name: 'Superlativa', desc: 'Parma 24 mesi, burrata pugliese', price: '14.00', hoverImage: '/images/menu/superlativa.jpg' },
          { name: 'Friarielli e Co.', desc: 'Friarielli napoletani, provola, salsiccia', price: '11.00' },
          { name: 'Mugnano del Cardinale', desc: 'Salame artigianale, caciocavallo', price: '13.00' },
          { name: 'Vesuviana', desc: 'Parma, caciocavallo, stracciata', price: '14.00' },
          { name: 'Nduja e Co.', desc: 'N\'duja calabrese, burrata', price: '14.00' },
          { name: 'Primavera', desc: 'Parma, bufala DOP, rughetta', price: '17.00', badges: ['DOP'], hoverImage: '/images/menu/primavera.jpg' },
          { name: 'Ariccia', desc: 'Porchetta di Ariccia, datterino del Vesuvio', price: '14.00' },
          { name: 'Campana', desc: 'Provola, salsiccia, patate al forno', price: '12.00' },
          { name: 'Pig', desc: 'Salsiccia, patate, cheddar', price: '12.00' },
          { name: 'Castelli Romani', desc: 'Porchetta, patata, rosmarino', price: '14.00' },
          { name: 'Sole Mio', desc: 'Acciuga, pesto genovese, ricotta', price: '11.00' },
          { name: 'Nerano', desc: 'Vellutata di zucchine, caciocavallo', price: '12.00' },
          { name: 'Fi.Ca', desc: 'Focaccia, parma, confettura di fichi, stracciata', price: '15.00' },
          { name: 'Autunno', desc: 'Pere, speck, taleggio DOP, noci di Sorrento', price: '13.00', badges: ['DOP'] },
          { name: 'Poker', desc: '4 quarti: Friarielli, Regina, Primavera, Montanara', price: '20.00', hoverImage: '/images/menu/poker.jpg' },
        ]
      },
      {
        heading: 'Fritti & Ripieni',
        items: [
          { name: 'Fritta Classica', desc: 'Provola, cicoli, ricotta, pepe', price: '11.00' },
          { name: 'Fritta', desc: 'Pomodoro, fior di latte, provola, pepe', price: '10.00' },
          { name: 'Fritta Semplice', desc: 'Pomodoro, fior di latte, ricotta', price: '10.00' },
          { name: 'Ripieno Classico', desc: 'Pomodoro, fior di latte, prosciutto cotto', price: '8.00' },
          { name: 'Tronchetto Napoletano', desc: 'Bufala DOP, parma 24 mesi, rughetta, datterino', price: '16.00', badges: ['DOP'] },
          { name: 'Ionica', desc: 'Carciofo, pancetta, n\'duja, stracciata', price: '14.00' },
          { name: 'Crocchè', desc: 'Cotto, crocchè sbriciolati, provola', price: '12.00' },
        ]
      }
    ]
  },
  {
    id: 'cucina',
    title: 'La Cucina',
    subtitle: 'Antipasti, primi e secondi della tradizione napoletana',
    heroImage: '/images/menu/cucina-hero.jpg',
    sections: [
      {
        heading: 'Antipasti',
        items: [
          { name: 'Fritturine Napoletane', desc: 'Crocchè, arancini, frittatine artigianali', price: '12.00' },
          { name: 'Crudo e Bufala', desc: 'Crudo di Parma 24 mesi con Bufala Campana', price: '15.00', badges: ['DOP'] },
          { name: 'Tagliere Campano', desc: 'Salumi selezionati da piccoli artigiani del territorio', price: '15.00' },
        ]
      },
      {
        heading: 'Primi',
        items: [
          { name: 'Spaghetto & Bisque', desc: 'Spaghetto trafilato a bronzo, bisque di crostacei', price: '14.00', hoverImage: '/images/menu/spaghetto.jpg' },
          { name: 'Mezzemaniche e Purptiell', desc: 'Pasta corta, polpo verace napoletano', price: '14.00' },
          { name: 'La Nerano', desc: 'Spaghetti trafilati a bronzo, crema di zucchine, menta, provolone del Monaco', price: '13.00', badges: ['DOP'], hoverImage: '/images/menu/nerano.jpg' },
        ]
      },
      {
        heading: 'Secondi',
        items: [
          { name: 'Fritto Misto', desc: 'Calamari, gamberi, verdure di stagione', price: '18.00' },
          { name: 'Porchettato Disossato', desc: 'Porchetta artigianale con contorno', price: '14.00' },
        ]
      }
    ]
  },
  {
    id: 'dolci',
    title: 'I Dolci',
    subtitle: 'Il finale perfetto — pasticceria campana d\'autore',
    heroImage: '/images/menu/dolci-hero.jpg',
    sections: [
      {
        heading: 'Dolci della Tradizione',
        items: [
          { name: 'Delizia al Limone', desc: 'Crema al limone Costa d\'Amalfi, pan di Spagna soffice', price: '7.00', badges: ['IGP'], hoverImage: '/images/menu/delizia.jpg' },
          { name: 'Babà Napoletano', desc: 'Soffice e bagnato al rhum, panna montata', price: '6.00', hoverImage: '/images/menu/baba.jpg' },
          { name: 'Pastiera Napoletana', desc: 'Ricetta classica con grano cotto e canditi', price: '6.00' },
          { name: 'Cannolo Siciliano', desc: 'Ricotta di pecora, gocce di cioccolato fondente', price: '6.00' },
          { name: 'Tiramisù', desc: 'Fatto in casa, mascarpone, caffè Izzo', price: '7.00' },
        ]
      }
    ]
  },
  {
    id: 'bevande',
    title: 'Birre & Vini',
    subtitle: 'Artigianali, selezionate, italiane',
    heroImage: '/images/menu/bevande-hero.jpg',
    sections: [
      {
        heading: 'Birre Artigianali',
        items: [
          { name: 'Birra Artigianale cl. 50', desc: '5 varietà selezionate, produzione artigianale italiana', price: '8.00' },
          { name: 'Birra Artigianale cl. 33', desc: '5 varietà selezionate, produzione artigianale italiana', price: '6.00' },
        ]
      },
      {
        heading: 'Vini Bianchi',
        items: [
          { name: 'Grillo Maleca DOC', desc: 'Cantina Paolini — Sicilia, fresco e minerale', price: '22.00', badges: ['DOC'] },
          { name: 'Ribolla Gialla DOC', desc: 'Cantina Norina — Friuli, elegante e floreale', price: '24.00', badges: ['DOC'] },
        ]
      },
      {
        heading: 'Vini Rossi',
        items: [
          { name: 'Barbera d\'Alba', desc: 'Cantina Malabaila — Piemonte, strutturato e vellutato', price: '21.00' },
          { name: 'Etta Focu Rosso IGT', desc: 'Cantina Paolini — Sicilia, intenso e speziato', price: '22.00', badges: ['IGT'] },
        ]
      },
      {
        heading: 'Bollicine',
        items: [
          { name: 'Calice di Bollicine', desc: 'Prosecco selezionato, fresco e brioso', price: '4.00' },
        ]
      }
    ]
  }
];

export const signatureDishes = [
  {
    name: 'Bronte 2.0',
    poeticDesc: 'Burrata che si scioglie, mortadella che sussurra, pistacchio di Bronte che incorona.',
    price: '14.00',
    image: '/images/menu/signature-bronte.jpg',
  },
  {
    name: 'La Nerano',
    poeticDesc: 'Spaghetti avvolti nella crema di zucchine, un profumo di menta, il Monaco che benedice.',
    price: '13.00',
    image: '/images/menu/signature-nerano.jpg',
  },
  {
    name: 'Delizia al Limone',
    poeticDesc: 'Il sole della Costiera racchiuso in un cucchiaio. Limone d\'Amalfi, dolcezza infinita.',
    price: '7.00',
    image: '/images/menu/signature-delizia.jpg',
  },
];
```

**Step 2: Create placeholder image directory**

Run: `mkdir -p public/images/menu`

**Step 3: Commit**

```bash
git add src/data/menuData.js
git commit -m "feat(menu): add structured menu data from PDF with all categories"
```

---

## Task 2: Create MenuIntro Component (Video Background + Scroll Reveal)

**Files:**
- Create: `src/components/menu/MenuIntro.jsx`

**Step 1: Build the component**

This component renders a full-viewport section with:
- `<video>` background (autoplay, muted, loop, playsInline) with slow-motion control
- Dark overlay with radial ember gradient from bottom center
- SVG noise grain filter (matching existing site pattern)
- Copy that reveals line-by-line via GSAP ScrollTrigger
- Parallax: text moves slower than the video on scroll
- Animated scroll indicator at bottom

```jsx
// src/components/menu/MenuIntro.jsx
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const MenuIntro = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;

    let ctx = gsap.context(() => {
      // Slow down video when section is in viewport
      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        onEnter: () => { if (video) video.playbackRate = 0.3; },
        onLeave: () => { if (video) video.playbackRate = 1; },
        onEnterBack: () => { if (video) video.playbackRate = 0.3; },
        onLeaveBack: () => { if (video) video.playbackRate = 1; },
      });

      // Parallax on text container (moves slower than scroll)
      gsap.to('.menu-intro-content', {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Line-by-line text reveal
      gsap.from('.menu-intro-line', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[100dvh] overflow-hidden flex items-center justify-center"
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        /* User will place their video at this path */
        src="/videos/menu-intro.mp4"
      />

      {/* Dark overlay + radial ember glow */}
      <div className="absolute inset-0 bg-charcoal/70" />
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 90%, rgba(232,93,38,0.25) 0%, transparent 60%)',
        }}
      />

      {/* SVG Noise Grain */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04]">
        <filter id="menuNoise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#menuNoise)" />
      </svg>

      {/* Content */}
      <div className="menu-intro-content relative z-10 flex flex-col items-center text-center px-6 sm:px-12 max-w-4xl">
        <span className="menu-intro-line font-caveat text-gold text-xl sm:text-2xl md:text-3xl mb-6">
          Dal 2016, Legnano
        </span>

        <h2 className="menu-intro-line font-playfair font-black text-cream text-[clamp(2.5rem,7vw,7rem)] leading-[0.95] mb-2">
          Ogni pizza è un racconto
        </h2>
        <h2 className="menu-intro-line font-playfair font-black italic text-flame text-[clamp(2.5rem,8vw,8rem)] leading-[0.95] mb-8">
          scritto col fuoco.
        </h2>

        <p className="menu-intro-line font-sans text-smoke text-[clamp(1rem,1.5vw,1.25rem)] max-w-2xl leading-relaxed">
          48 ore di doppia lievitazione. Farine selezionate.
          Ingredienti DOP, IGP, Slow Food.
          Il menu di Cristian Moschiano, classe '94.
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="font-caveat text-cream/40 text-sm tracking-widest uppercase">Esplora il Menu</span>
        <ChevronDown size={28} className="text-cream/40 animate-bounce-slow" />
      </div>
    </section>
  );
};

export default MenuIntro;
```

**Step 2: Create video placeholder directory**

Run: `mkdir -p public/videos`
Then tell user: place your slow-motion video at `public/videos/menu-intro.mp4`

**Step 3: Verify renders**

Run: `cd /d/Manum/mopizz2 && npm run dev`
Open browser, navigate to homepage. The component should render (even without the video file — it will show overlays on black).

**Step 4: Commit**

```bash
git add src/components/menu/MenuIntro.jsx
git commit -m "feat(menu): add cinematic intro with video bg and scroll-triggered text reveal"
```

---

## Task 3: Create Custom Cursor Component

**Files:**
- Create: `src/components/menu/CustomCursor.jsx`

**Step 1: Build the custom cursor**

A fixed-position circle with "Scorri" text that follows the mouse with elastic delay. It only appears when the parent section (horizontal scroll) is in viewport. Uses GSAP `quickTo` for smooth elastic tracking.

```jsx
// src/components/menu/CustomCursor.jsx
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
```

**Step 2: Commit**

```bash
git add src/components/menu/CustomCursor.jsx
git commit -m "feat(menu): add elastic custom cursor for horizontal scroll section"
```

---

## Task 4: Create MenuHorizontalScroll Component

**Files:**
- Create: `src/components/menu/MenuHorizontalScroll.jsx`

**Step 1: Build the horizontal scroll section**

This is the core component. It uses GSAP ScrollTrigger to pin the section and translate panels horizontally as the user scrolls vertically. Contains 4 full-viewport panels, each with a category hero image (left 40%) and a destructured menu grid (right 60%).

Key features:
- ScrollTrigger `pin: true` with horizontal `x` tween
- Category indicator dots at top (fixed within pinned section)
- Progress bar (thin flame line at top)
- Hover on dish name → cursor-following circular image reveal
- DOP/IGP badges with gold glow

```jsx
// src/components/menu/MenuHorizontalScroll.jsx
import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { menuCategories } from '../../data/menuData';
import CustomCursor from './CustomCursor';

gsap.registerPlugin(ScrollTrigger);

const badgeKeywords = ['DOP', 'DOCG', 'IGP', 'DOC', 'IGT', 'Slow Food'];

const HighlightBadges = ({ text }) => {
  let result = text;
  badgeKeywords.forEach((kw) => {
    const rx = new RegExp(`\\b${kw}\\b`, 'g');
    result = result.replace(
      rx,
      `<span class="inline-block text-gold font-caveat text-base ml-1 px-1.5 py-0 border border-gold/30 rounded bg-gold/5 badge-glow">${kw}</span>`
    );
  });
  return <span dangerouslySetInnerHTML={{ __html: result }} />;
};

const MenuHorizontalScroll = () => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cursorActive, setCursorActive] = useState(false);
  const [hoverImage, setHoverImage] = useState(null);
  const hoverImgRef = useRef(null);
  const imgXTo = useRef(null);
  const imgYTo = useRef(null);

  // Cursor-following image reveal setup
  useEffect(() => {
    const imgEl = hoverImgRef.current;
    if (!imgEl) return;

    imgXTo.current = gsap.quickTo(imgEl, 'x', { duration: 0.4, ease: 'power3' });
    imgYTo.current = gsap.quickTo(imgEl, 'y', { duration: 0.4, ease: 'power3' });

    const onMove = (e) => {
      if (imgXTo.current) imgXTo.current(e.clientX);
      if (imgYTo.current) imgYTo.current(e.clientY);
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Show/hide hover image
  useEffect(() => {
    const imgEl = hoverImgRef.current;
    if (!imgEl) return;
    gsap.to(imgEl, {
      scale: hoverImage ? 1 : 0,
      opacity: hoverImage ? 1 : 0,
      duration: 0.3,
      ease: 'power2.out',
    });
  }, [hoverImage]);

  // GSAP horizontal scroll
  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    let ctx = gsap.context(() => {
      const panels = gsap.utils.toArray('.menu-panel');
      const totalWidth = track.scrollWidth - window.innerWidth;

      // Horizontal scroll tween
      const scrollTween = gsap.to(track, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.round(self.progress * (panels.length - 1));
            setActiveIndex(idx);
          },
          onEnter: () => setCursorActive(true),
          onLeave: () => setCursorActive(false),
          onEnterBack: () => setCursorActive(true),
          onLeaveBack: () => setCursorActive(false),
        },
      });

      // Parallax on hero images (move slower than panels)
      panels.forEach((panel) => {
        const img = panel.querySelector('.panel-hero-img');
        if (!img) return;
        gsap.fromTo(
          img,
          { xPercent: -15 },
          {
            xPercent: 15,
            ease: 'none',
            scrollTrigger: {
              trigger: panel,
              containerAnimation: scrollTween,
              start: 'left right',
              end: 'right left',
              scrub: true,
            },
          }
        );
      });

      // Stagger item entrance per panel
      panels.forEach((panel) => {
        const items = panel.querySelectorAll('.menu-item');
        gsap.from(items, {
          y: 30,
          opacity: 0,
          stagger: 0.05,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: panel,
            containerAnimation: scrollTween,
            start: 'left 80%',
          },
        });
      });
    }, container);

    return () => ctx.revert();
  }, []);

  const handleDishHover = useCallback((img) => {
    setHoverImage(img || null);
  }, []);

  return (
    <>
      <CustomCursor isActive={cursorActive} />

      {/* Cursor-following dish image */}
      <div
        ref={hoverImgRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none -translate-x-1/2 -translate-y-1/2 hidden lg:block"
        style={{ willChange: 'transform' }}
      >
        {hoverImage && (
          <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gold/40 shadow-2xl">
            <img src={hoverImage} alt="" className="w-full h-full object-cover" />
          </div>
        )}
      </div>

      <section ref={containerRef} className="relative bg-charcoal overflow-hidden">
        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 z-30 h-[3px] bg-white/5">
          <div
            className="h-full bg-flame transition-all duration-300 ease-out"
            style={{ width: `${((activeIndex + 1) / menuCategories.length) * 100}%` }}
          />
        </div>

        {/* Category indicators */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 flex gap-6 sm:gap-8">
          {menuCategories.map((cat, i) => (
            <div
              key={cat.id}
              className={`flex items-center gap-2 transition-all duration-500 ${
                i === activeIndex ? 'opacity-100' : 'opacity-30'
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full transition-colors duration-500 ${
                  i === activeIndex ? 'bg-flame' : 'bg-smoke'
                }`}
              />
              <span
                className={`font-sans text-xs sm:text-sm uppercase tracking-widest transition-colors duration-500 ${
                  i === activeIndex ? 'text-cream' : 'text-smoke'
                }`}
              >
                {cat.title}
              </span>
            </div>
          ))}
        </div>

        {/* Horizontal track */}
        <div ref={trackRef} className="flex h-screen" style={{ width: `${menuCategories.length * 100}vw` }}>
          {menuCategories.map((category) => (
            <div
              key={category.id}
              className="menu-panel flex w-screen h-screen flex-shrink-0"
            >
              {/* Left: Hero Image (40%) */}
              <div className="hidden md:flex w-[40%] h-full relative overflow-hidden items-center justify-center">
                <div className="panel-hero-img absolute inset-[-20%] bg-cover bg-center"
                  style={{
                    backgroundImage: `url('${category.heroImage}')`,
                  }}
                />
                {/* Dark edge gradient for text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-charcoal/80" />

                {/* Category title overlay on image */}
                <div className="relative z-10 p-12 flex flex-col items-start justify-end h-full pb-24">
                  <h3 className="font-playfair font-black text-cream text-[clamp(2rem,4vw,5rem)] leading-none drop-shadow-lg">
                    {category.title}
                  </h3>
                  <p className="font-sans text-cream/60 text-sm sm:text-base mt-3 max-w-xs leading-relaxed">
                    {category.subtitle}
                  </p>
                </div>
              </div>

              {/* Right: Menu Grid (60% desktop, 100% mobile) */}
              <div className="w-full md:w-[60%] h-full overflow-y-auto px-6 sm:px-10 md:px-16 pt-20 pb-12 flex flex-col">
                {/* Mobile category title */}
                <div className="md:hidden mb-8">
                  <h3 className="font-playfair font-black text-cream text-4xl leading-none">
                    {category.title}
                  </h3>
                  <p className="font-sans text-smoke text-sm mt-2">
                    {category.subtitle}
                  </p>
                </div>

                {category.sections.map((section, sIdx) => (
                  <div key={sIdx} className="mb-10">
                    <h4 className="font-caveat text-gold text-2xl sm:text-3xl mb-6">
                      {section.heading}
                    </h4>
                    <div className="space-y-1">
                      {section.items.map((item, iIdx) => (
                        <div
                          key={iIdx}
                          className="menu-item group flex items-baseline justify-between py-3 border-b border-white/5 hover:border-flame/30 transition-colors duration-300 cursor-default"
                          onMouseEnter={() => handleDishHover(item.hoverImage)}
                          onMouseLeave={() => handleDishHover(null)}
                        >
                          <div className="flex-1 mr-4">
                            <span className="font-playfair font-bold text-cream text-lg sm:text-xl group-hover:text-flame transition-colors duration-300">
                              {item.name}
                            </span>
                            <span className="block font-sans text-smoke text-sm italic mt-0.5 leading-relaxed">
                              <HighlightBadges text={item.desc} />
                            </span>
                          </div>
                          <span className="font-mono text-gold text-base sm:text-lg flex-shrink-0 tabular-nums">
                            {item.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default MenuHorizontalScroll;
```

**Step 2: Add badge glow animation to index.css**

Append to `src/index.css`:

```css
/* Menu badge glow */
@keyframes badgeGlow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(212, 168, 83, 0); }
  50% { box-shadow: 0 0 8px 2px rgba(212, 168, 83, 0.3); }
}
.badge-glow {
  animation: badgeGlow 3s ease-in-out infinite;
}
```

**Step 3: Verify in browser**

Run dev server, check that:
- Section pins when scrolled to
- Horizontal movement works on vertical scroll
- Category indicators update
- Progress bar fills
- Hover on items with `hoverImage` shows floating circle (placeholder for now)
- Custom cursor appears on desktop

**Step 4: Commit**

```bash
git add src/components/menu/MenuHorizontalScroll.jsx src/components/menu/CustomCursor.jsx src/index.css
git commit -m "feat(menu): add horizontal scroll navigation with custom cursor and dish hover reveals"
```

---

## Task 5: Create MenuHighlight Component (Signature Dishes + CTA)

**Files:**
- Create: `src/components/menu/MenuHighlight.jsx`

**Step 1: Build the component**

Asymmetric destructured grid with 3 signature dishes and a CTA to download the full PDF menu.

```jsx
// src/components/menu/MenuHighlight.jsx
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { signatureDishes } from '../../data/menuData';

gsap.registerPlugin(ScrollTrigger);

const MenuHighlight = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Staggered entrance for signature cards
      gsap.from('.signature-card', {
        y: 80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
        },
      });

      // CTA fade-in
      gsap.from('.menu-cta', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.menu-cta',
          start: 'top 85%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Asymmetric grid offsets for destructured layout
  const offsets = [
    'md:translate-y-0',
    'md:translate-y-16',
    'md:translate-y-6',
  ];

  return (
    <section
      ref={sectionRef}
      className="w-full py-24 sm:py-32 px-6 sm:px-12 md:px-20 lg:px-32 bg-charcoal relative overflow-hidden"
    >
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, rgba(232,93,38,0.08) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-16 sm:mb-24">
          <span className="font-caveat text-gold text-2xl sm:text-3xl block mb-4">
            La Firma dello Chef
          </span>
          <h2 className="font-playfair font-black text-cream text-4xl sm:text-5xl md:text-6xl">
            I Piatti Iconici
          </h2>
        </div>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-20 sm:mb-28">
          {signatureDishes.map((dish, i) => (
            <div
              key={i}
              className={`signature-card group flex flex-col items-center text-center ${offsets[i]}`}
            >
              {/* Circular image */}
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 mb-8 rounded-full overflow-hidden border-2 border-gold/30 group-hover:border-gold/60 transition-all duration-500 group-hover:scale-[1.03] group-hover:rotate-2 group-hover:shadow-[0_0_40px_rgba(232,93,38,0.2)]">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent" />
              </div>

              {/* Name */}
              <h3 className="font-playfair font-black text-cream text-2xl sm:text-3xl mb-3 group-hover:text-flame transition-colors duration-300">
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

        {/* CTA */}
        <div className="menu-cta flex flex-col items-center text-center">
          <span className="font-caveat text-gold text-xl sm:text-2xl mb-6">
            Vuoi scoprire tutto?
          </span>
          <a
            href="/brand-assets/mo pizza menu 2026 WEB.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="magnetic-btn bg-flame hover:bg-ember text-cream font-sans font-bold py-4 px-10 rounded-full transition-colors duration-300 text-lg"
          >
            Scarica il Menu Completo
          </a>
        </div>
      </div>
    </section>
  );
};

export default MenuHighlight;
```

**Step 2: Commit**

```bash
git add src/components/menu/MenuHighlight.jsx
git commit -m "feat(menu): add signature dishes highlight section with asymmetric grid and CTA"
```

---

## Task 6: Create Parent MenuSection Orchestrator + Wire Into Home

**Files:**
- Create: `src/components/menu/MenuSection.jsx`
- Modify: `src/pages/Home.jsx` — add MenuSection after Hero
- Modify: `src/pages/MenuPage.jsx` — redirect to homepage menu section (or keep as is)

**Step 1: Create the orchestrator component**

```jsx
// src/components/menu/MenuSection.jsx
import React from 'react';
import MenuIntro from './MenuIntro';
import MenuHorizontalScroll from './MenuHorizontalScroll';
import MenuHighlight from './MenuHighlight';

const MenuSection = () => {
  return (
    <div id="menu">
      <MenuIntro />
      <MenuHorizontalScroll />
      <MenuHighlight />
    </div>
  );
};

export default MenuSection;
```

**Step 2: Update Home.jsx**

Add `MenuSection` right after `Hero`:

```jsx
// src/pages/Home.jsx
import React, { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Hero from '../components/Hero';
import MenuSection from '../components/menu/MenuSection';
import Features from '../components/Features';
import Chef from '../components/Chef';
import Statement from '../components/Statement';
import Gallery from '../components/Gallery';
import Reviews from '../components/Reviews';
import Contacts from '../components/Contacts';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
        const timer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 100);
        return () => {
            clearTimeout(timer);
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <React.Fragment>
            <Hero />
            <MenuSection />
            <Statement />
            <Gallery />
            <Chef />
            <Features />
            <Reviews />
            <Contacts />
        </React.Fragment>
    );
};

export default Home;
```

**Step 3: Verify in browser**

Run dev server and verify:
- Menu section appears directly after Hero
- All 3 sub-sections render in order (Intro → Horizontal Scroll → Highlight)
- Horizontal scroll pins and scrolls correctly
- ScrollTrigger doesn't conflict with other sections
- Page flow: Hero → Menu (Intro → HScroll → Highlight) → Statement → Gallery → ...

**Step 4: Commit**

```bash
git add src/components/menu/MenuSection.jsx src/pages/Home.jsx
git commit -m "feat(menu): wire MenuSection into homepage after Hero"
```

---

## Task 7: Generate AI Placeholder Images

**Files:**
- Modify: `src/components/menu/MenuHorizontalScroll.jsx` — add fallback gradient for missing images
- Modify: `src/components/menu/MenuHighlight.jsx` — add fallback gradient for missing images

**Step 1: Add fallback styling for missing images**

In both components, wrap image elements with a fallback gradient so they look premium even without real images:

For hero images in MenuHorizontalScroll, add to the `.panel-hero-img` div a fallback:
```jsx
style={{
  backgroundImage: `url('${category.heroImage}'), radial-gradient(circle at 50% 100%, #C94A1A, #1A1A1A)`,
}}
```

For signature dish images in MenuHighlight, add an `onError` handler:
```jsx
<img
  src={dish.image}
  alt={dish.name}
  className="w-full h-full object-cover ..."
  onError={(e) => { e.target.style.display = 'none'; }}
/>
{/* Fallback gradient behind image */}
<div className="absolute inset-0 bg-gradient-to-br from-ember/60 to-charcoal -z-10" />
```

For hover images in MenuHorizontalScroll, same pattern.

**Step 2: Commit**

```bash
git add src/components/menu/MenuHorizontalScroll.jsx src/components/menu/MenuHighlight.jsx
git commit -m "feat(menu): add gradient fallbacks for placeholder images"
```

---

## Task 8: Polish & Responsive Testing

**Files:**
- Modify: `src/components/menu/MenuHorizontalScroll.jsx` — responsive tweaks
- Modify: `src/components/menu/MenuIntro.jsx` — responsive tweaks

**Step 1: Mobile horizontal scroll fallback**

On mobile (< 768px), the horizontal scroll pinning can feel broken. Add a check: on mobile, instead of horizontal scroll hijack, show the categories as a vertical stack with swipeable tabs or a simpler layout.

In `MenuHorizontalScroll.jsx`, use a `useEffect` with `window.matchMedia` to conditionally apply the horizontal scroll only on `md+` screens. On mobile, render a vertical layout with collapsible category sections.

**Step 2: Test breakpoints**

Verify at:
- 375px (iPhone SE)
- 390px (iPhone 14)
- 768px (iPad)
- 1024px (iPad Pro)
- 1440px (Desktop)
- 1920px (Full HD)

**Step 3: Commit**

```bash
git add -A
git commit -m "feat(menu): responsive polish for mobile and tablet"
```

---

## Task 9: Final Integration Cleanup

**Files:**
- Modify: `src/App.jsx` — remove `/menu` route if no longer needed, or redirect to `/#menu`
- Delete or archive: `src/components/Menu.jsx` (old component)
- Delete or archive: `src/pages/MenuPage.jsx` (old page)

**Step 1: Update routing**

If the `/menu` route should redirect to the homepage menu section:

```jsx
// In App.jsx, replace the MenuPage route:
import { Navigate } from 'react-router-dom';

<Route path="menu" element={<Navigate to="/#menu" replace />} />
```

Or remove the route entirely if not needed.

**Step 2: Clean up old files**

Delete `src/components/Menu.jsx` and `src/pages/MenuPage.jsx` if they are fully replaced.

**Step 3: Final scroll test**

Verify the full page flow works end-to-end:
Hero → MenuIntro → MenuHorizontalScroll → MenuHighlight → Statement → Gallery → Chef → Features → Reviews → Contacts

Check that:
- "Scopri il Menu" CTA in Hero scrolls to `#menu`
- Navbar "Menu" link scrolls to `#menu`
- All ScrollTrigger animations fire at the right times
- No jank or layout shifts
- Lenis smooth scroll works throughout

**Step 4: Commit**

```bash
git add -A
git commit -m "feat(menu): remove old menu component, finalize integration"
```
