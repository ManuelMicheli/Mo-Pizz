import React from 'react';

const Gallery = () => {
    return (
        <section id="gallery" className="w-full bg-charcoal relative overflow-hidden">
            <div className="w-full">
                <img
                    src="/images/gallery-main.webp"
                    alt="Sala ristorante MO PIZZ, pizzeria napoletana a Legnano — atmosfera calda e accogliente"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto object-cover max-h-[50vh] sm:max-h-[60vh] md:max-h-[70vh]"
                />
            </div>
        </section>
    );
};

export default Gallery;
