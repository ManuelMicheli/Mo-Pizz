import Hero from '@/components/Hero';
import Statement from '@/components/Statement';
import Gallery from '@/components/Gallery';
import ReviewCta from '@/components/ReviewCta';
import Reviews from '@/components/Reviews';
import SeoContent from '@/components/SeoContent';
import Contacts from '@/components/Contacts';
import ClientGroupA from './ClientGroupA';
import ClientGroupB from './ClientGroupB';
import ClientGroupC from './ClientGroupC';
import { homeFaqSchema, homeBreadcrumbSchema } from '@/lib/constants';

export default function HomePage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(homeBreadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqSchema) }}
            />
            <Hero />
            <ClientGroupA />
            <Statement />
            <Gallery />
            <ClientGroupB />
            <ReviewCta />
            <Reviews />
            <ClientGroupC />
            <SeoContent />
            <Contacts />
        </>
    );
}
