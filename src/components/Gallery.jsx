import React from 'react';

const Gallery = () => {
    return (
        <section id="gallery" className="w-full bg-charcoal relative overflow-hidden">
            <div className="w-full">
                <img
                    src="/images/wmremove-transformed-gallery.png"
                    alt="Gallery"
                    className="w-full h-auto object-cover"
                />
            </div>
        </section>
    );
};

export default Gallery;
