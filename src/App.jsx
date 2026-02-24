import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Layout from './components/Layout';
import Home from './pages/Home';

gsap.registerPlugin(ScrollTrigger);

function App() {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.4,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            touchMultiplier: 1.2,
        });

        // Sync Lenis with GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(lenis.raf);
            lenis.destroy();
        };
    }, []);

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="menu" element={<Navigate to="/#menu" replace />} />
            </Route>
        </Routes>
    )
}

export default App
