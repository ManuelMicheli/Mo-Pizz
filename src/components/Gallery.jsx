import React from 'react';
import Image from 'next/image';

const Gallery = () => {
    return (
        <section id="gallery" className="w-full bg-charcoal relative overflow-hidden">
            <div className="relative w-full aspect-[16/9] sm:aspect-[16/8] md:aspect-[16/7] max-h-[50vh] sm:max-h-[60vh] md:max-h-[70vh] overflow-hidden">
                <Image
                    src="/images/gallery-main.webp"
                    alt="Sala ristorante MO PIZZ, pizzeria napoletana a Legnano — atmosfera calda e accogliente"
                    fill
                    sizes="100vw"
                    className="object-cover"
                />
            </div>
        </section>
    );
};

export default Gallery;
