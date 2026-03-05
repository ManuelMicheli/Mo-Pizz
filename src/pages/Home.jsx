import React, { lazy, Suspense, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Hero from '../components/Hero';

// Lazy-load all below-fold sections to reduce initial bundle / TBT
const ServicesGrid = lazy(() => import('../components/ServicesGrid'));
const MenuFisso = lazy(() => import('../components/MenuFisso'));
const MenuSection = lazy(() => import('../components/menu/MenuSection'));
const Statement = lazy(() => import('../components/Statement'));
const Gallery = lazy(() => import('../components/Gallery'));
const Chef = lazy(() => import('../components/Chef'));
const Staff = lazy(() => import('../components/Staff'));
const Features = lazy(() => import('../components/Features'));
const ReviewCta = lazy(() => import('../components/ReviewCta'));
const Reviews = lazy(() => import('../components/Reviews'));
const PrenotaSection = lazy(() => import('../components/PrenotaSection'));
const SeoContent = lazy(() => import('../components/SeoContent'));
const Contacts = lazy(() => import('../components/Contacts'));

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
            <Suspense fallback={<div className="min-h-screen bg-charcoal" />}>
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
            </Suspense>
        </div>
    );
};

export default Home;
