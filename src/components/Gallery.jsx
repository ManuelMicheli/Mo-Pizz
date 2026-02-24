import React from 'react';

const Gallery = () => {
    return (
        <section id="gallery" className="w-full bg-charcoal relative overflow-hidden">
            <div className="w-full">
                <img
                    src="/images/wmremove-transformed-gallery.png"
                    alt="Gallery"
                    loading="lazy"
                    className="w-full h-auto object-cover max-h-[40vh] sm:max-h-[60vh] md:max-h-[70vh]"
                />
            </div>
        </section>
    );
};

export default Gallery;
