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
import MenuVideoIntro from '../components/menu/MenuVideoIntro';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {

    // Refresh ScrollTrigger and jump to top on mount
    useLayoutEffect(() => {
        window.scrollTo(0, 0);

        // Wait a tick for DOM to paint before refreshing GSAP triggers
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
            <MenuVideoIntro />
            <Reviews />
            <Contacts />
        </React.Fragment>
    );
};

export default Home;
