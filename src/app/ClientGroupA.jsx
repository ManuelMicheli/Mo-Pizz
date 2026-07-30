'use client';

import dynamic from 'next/dynamic';
import DeferMount from '@/components/DeferMount';

const MenuSection = dynamic(() => import('@/components/menu/MenuSection'), { ssr: false });

export default function ClientGroupA() {
    return (
        <DeferMount anchorId="menu" rootMargin="1200px 0px">
            <MenuSection />
        </DeferMount>
    );
}
