import React, { useRef, useEffect } from 'react';
import { Star } from 'lucide-react';

const reviewsData = [
    "Pizza eccezionale! Senza dubbio una delle più buone di Legnano. Sono anni che mi servo da loro, la consiglio fortemente!",
    "La nostra pizzeria preferita! Pizza buonissima, leggera e con ingredienti di qualità. Lo staff gentilissimo e molto simpatico!",
    "Ottima pizza gustosissima, personale cordiale e simpatico, sala molto accogliente. Più che consigliato!",
    "Impasto eccezionale, materie prime ottime. I frittini come antipasto preparati alla perfezione. Consigliatissimo."
];

const Reviews = () => {
    const scrollRef = useRef(null);

    useEffect(() => {
        let interval;
        const container = scrollRef.current;

        if (container) {
            interval = setInterval(() => {
                // Prevent scroll if user is interacting
                if (container.matches(':hover')) return;

                const scrollLeft = container.scrollLeft;
                const width = container.offsetWidth;
                const scrollWidth = container.scrollWidth;

                if (scrollLeft + width >= scrollWidth - 10) {
                    container.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    container.scrollBy({ left: width < 600 ? width : 400, behavior: 'smooth' });
                }
            }, 5000);
        }

        return () => clearInterval(interval);
    }, []);

    return (
        <section id="reviews" className="py-24 sm:py-32 px-6 sm:px-12 md:px-20 lg:px-32 bg-charcoal relative">
            <div className="max-w-7xl mx-auto flex flex-col items-center">

                {/* Header */}
                <div className="flex flex-col items-center text-center mb-10">
                    <div className="font-caveat text-gold text-2xl sm:text-3xl mb-4">
                        Dicono Di Noi
                    </div>
                    <h2 className="font-playfair font-bold text-cream text-4xl sm:text-5xl md:text-6xl text-balance mb-6">
                        Cosa Dicono i Nostri Clienti
                    </h2>

                    <div className="flex flex-col sm:flex-row items-center gap-3 font-sans text-sm sm:text-base">
                        <div className="bg-[#242424] px-5 py-2 rounded-full border border-gold/30 text-gold flex items-center gap-2 font-medium">
                            ⭐ 4.2/5 su Google — 620+ recensioni
                        </div>
                        <div className="bg-[#242424] px-5 py-2 rounded-full border border-gold/30 text-gold flex items-center gap-2 font-medium">
                            🏆 Travellers' Choice Tripadvisor
                        </div>
                    </div>
                </div>

                {/* Carousel */}
                <div className="relative w-full overflow-hidden mt-10">
                    <div
                        ref={scrollRef}
                        className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide w-full"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {reviewsData.map((rev, i) => (
                            <div
                                key={i}
                                className="snap-center sm:snap-start shrink-0 w-[90vw] sm:w-[45vw] lg:w-[350px] xl:w-[400px] bg-[#242424] border border-gold/20 rounded-[2rem] p-8 sm:p-10 relative flex flex-col my-4 hover:-translate-y-2 transition-transform duration-300"
                            >
                                <div className="absolute top-6 left-6 text-gold opacity-30 text-6xl font-serif leading-none">"</div>
                                <div className="flex text-gold mb-6 relative z-10 space-x-1">
                                    {[...Array(5)].map((_, j) => (
                                        <Star key={j} className="fill-gold" size={18} />
                                    ))}
                                </div>
                                <p className="font-sans text-cream text-lg italic leading-relaxed mb-6 relative z-10">
                                    {rev}
                                </p>
                                <div className="mt-auto font-caveat text-smoke text-xl">
                                    — Cliente Google
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center mt-4 space-x-2">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-gold' : 'bg-smoke/30'}`}></div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Reviews;
