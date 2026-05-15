import React from 'react';

const Gallery = () => {
    return (
        <section id="gallery" className="w-full bg-charcoal relative overflow-hidden">
            <div className="w-full aspect-[16/9] sm:aspect-[16/8] md:aspect-[16/7] max-h-[50vh] sm:max-h-[60vh] md:max-h-[70vh] overflow-hidden">
                <img
                    src="/images/gallery-main.webp"
                    alt="Sala ristorante MO PIZZ, pizzeria napoletana a Legnano — atmosfera calda e accogliente"
                    width="1920"
                    height="1080"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    className="w-full h-full object-cover"
                />
            </div>
        </section>
    );
};

export default Gallery;
