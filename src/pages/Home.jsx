import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Hero from '../components/Hero';
import MenuSection from '../components/menu/MenuSection';
import Features from '../components/Features';
import Chef from '../components/Chef';
import Staff from '../components/Staff';
import Statement from '../components/Statement';
import Gallery from '../components/Gallery';
import Reviews from '../components/Reviews';
import ReviewCta from '../components/ReviewCta';
import PrenotaSection from '../components/PrenotaSection';
import ServicesGrid from '../components/ServicesGrid';
import MenuFisso from '../components/MenuFisso';
import SeoContent from '../components/SeoContent';
import Contacts from '../components/Contacts';


gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    const pageRef = useRef(null);

    useLayoutEffect(() => {
        window.scrollTo(0, 0);

        const ctx = gsap.context(() => {
            requestAnimationFrame(() => {
                ScrollTrigger.refresh();
            });
        }, pageRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={pageRef}>
            <Hero />
            <ServicesGrid />
            <MenuFisso />
            <MenuSection />
            <Statement />
            <Gallery />
            <Chef />
            <Staff />
            <Features />
            <ReviewCta />
            <Reviews />
            <PrenotaSection />
            <SeoContent />
            <Contacts />
        </div>
    );
};

export default Home;
