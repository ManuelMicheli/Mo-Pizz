import Hero from '@/components/Hero';
import Statement from '@/components/Statement';
import Gallery from '@/components/Gallery';
import ReviewCta from '@/components/ReviewCta';
import SeoContent from '@/components/SeoContent';
import Contacts from '@/components/Contacts';
import ClientGroupA from './ClientGroupA';
import ClientGroupB from './ClientGroupB';
import ClientGroupC from './ClientGroupC';

export default function HomePage() {
    return (
        <>
            <Hero />
            <ClientGroupA />
            <Statement />
            <Gallery />
            <ClientGroupB />
            <ReviewCta />
            <ClientGroupC />
            <SeoContent />
            <Contacts />
        </>
    );
}
