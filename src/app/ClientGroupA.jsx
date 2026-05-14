'use client';

import dynamic from 'next/dynamic';

const ServicesGrid = dynamic(() => import('@/components/ServicesGrid'));
const MenuFisso = dynamic(() => import('@/components/MenuFisso'));
const MenuSection = dynamic(() => import('@/components/menu/MenuSection'), { ssr: false });

export default function ClientGroupA() {
    return (
        <>
            <ServicesGrid />
            <MenuFisso />
            <MenuSection />
        </>
    );
}
