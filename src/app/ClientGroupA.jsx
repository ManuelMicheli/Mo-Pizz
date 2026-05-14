'use client';

import dynamic from 'next/dynamic';

const ServicesDrawer = dynamic(() => import('@/components/ServicesDrawer'), { ssr: false });
const MenuFisso = dynamic(() => import('@/components/MenuFisso'));
const MenuSection = dynamic(() => import('@/components/menu/MenuSection'), { ssr: false });

export default function ClientGroupA() {
    return (
        <>
            <ServicesDrawer />
            <MenuFisso />
            <MenuSection />
        </>
    );
}
