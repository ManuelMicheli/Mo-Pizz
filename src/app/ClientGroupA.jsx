'use client';

import dynamic from 'next/dynamic';

const MenuFisso = dynamic(() => import('@/components/MenuFisso'));
const MenuSection = dynamic(() => import('@/components/menu/MenuSection'), { ssr: false });

export default function ClientGroupA() {
    return (
        <>
            <MenuFisso />
            <MenuSection />
        </>
    );
}
