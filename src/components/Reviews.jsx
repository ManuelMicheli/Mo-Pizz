import React from 'react';
import { Star } from 'lucide-react';

const reviewsData = [
    {
        text: "Sabato sera ho cercato su Google 'pizza napoletana' e sono capitata per caso da Mo Pizz: una vera scoperta! Locale super accogliente, atmosfera familiare e rilassante, e soprattutto una pizza eccezionale, con ingredienti di altissima qualità e un impasto davvero perfetto.",
        author: "Antonella Pederzani",
        source: "Google",
    },
    {
        text: "Ottima atmosfera, personale molto gentile e pizza davvero fantastica! Consigliatissimo.",
        author: "Fadia Awwad",
        source: "Google",
    },
    {
        text: "Ottima pizza napoletana sia per gli ingredienti che per l'impasto.",
        author: "Diego Bonata",
        source: "Google",
    },
    {
        text: "Ottime pizze e accoglienza calorosa. Anche il caffè macchiato è eccellente!",
        author: "Philou Ren",
        source: "Google",
    },
    {
        text: "Pizza deliziosa, leggera e con ingredienti di qualità! Il personale è molto gentile e simpatico! La migliore pizza a Legnano e dintorni.",
        author: "Laura B.",
        source: "Tripadvisor",
    },
    {
        text: "Ottima pizza gustosissima, personale cordiale e simpatico, sala molto accogliente. Più che consigliato!",
        author: "Simone T.",
        source: "Tripadvisor",
    },
    {
        text: "Un'ottima proposta, degna delle migliori pizzerie di Milano e con un ottimo potenziale. Impasto leggero e ben lievitato, cottura perfetta nel forno a legna.",
        author: "Alessandro Trezzi",
        source: "Dissapore",
    },
    {
        text: "Tutte buonissime, torneremo sicuramente a provarne altre. Il personale attento e positivo rende il locale ottimo. Servizio rapido, un vero punto forte!",
        author: "Valentina C.",
        source: "Google",
    },
];

const ReviewCard = ({ review }) => (
    <div className="shrink-0 w-[320px] sm:w-[370px]">
        <div className="relative bg-gradient-to-br from-[#222222] to-[#1a1a1a] rounded-[1.5rem] p-7 sm:p-8 h-full flex flex-col overflow-hidden transition-shadow duration-500 hover:shadow-[0_8px_48px_rgba(212,168,83,0.07)]">
            {/* Subtle top accent */}
            <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />

            {/* Stars */}
            <div className="flex mb-5 space-x-0.5">
                {[...Array(5)].map((_, j) => (
                    <Star key={j} className="fill-gold stroke-gold" size={14} />
                ))}
            </div>

            {/* Quote */}
            <p className="font-sans text-cream/85 text-[15px] leading-[1.75] mb-6 flex-1">
                &ldquo;{review.text}&rdquo;
            </p>

            {/* Author */}
            <div className="flex items-center gap-3 mt-auto pt-5 border-t border-white/[0.04]">
                <div className="w-9 h-9 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                    <span className="text-gold font-sans text-sm font-bold leading-none">
                        {review.author[0]}
                    </span>
                </div>
                <div>
                    <div className="font-sans text-cream/90 text-sm font-medium">{review.author}</div>
                    <div className="font-sans text-smoke text-xs">{review.source}</div>
                </div>
            </div>
        </div>
    </div>
);

const Reviews = () => {
    // Triple reviews for seamless infinite loop on all screen sizes
    const tripled = [...reviewsData, ...reviewsData, ...reviewsData];

    return (
        <section id="reviews" className="py-24 sm:py-32 bg-charcoal relative overflow-hidden">
            {/* Header */}
            <div className="px-6 sm:px-12 md:px-20 lg:px-32 max-w-7xl mx-auto flex flex-col items-center text-center mb-14">
                <div className="font-caveat text-gold text-2xl sm:text-3xl mb-4">
                    Dicono Di Noi
                </div>
                <h2 className="font-playfair font-bold text-cream text-4xl sm:text-5xl md:text-6xl text-balance mb-8">
                    Cosa Dicono i Nostri Clienti
                </h2>
                <div className="flex flex-col sm:flex-row items-center gap-3 font-sans text-sm">
                    <div className="bg-[#222] px-5 py-2.5 rounded-full text-gold/80 flex items-center gap-2 border border-gold/10">
                        <span>4.2/5 su Google — 620+ recensioni</span>
                    </div>
                    <div className="bg-[#222] px-5 py-2.5 rounded-full text-gold/80 flex items-center gap-2 border border-gold/10">
                        <span>Travellers' Choice Tripadvisor</span>
                    </div>
                </div>
            </div>

            {/* Infinite marquee — edge to edge */}
            <div className="relative">
                {/* Soft edge fades */}
                <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-charcoal to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-charcoal to-transparent z-10 pointer-events-none" />

                <div className="flex gap-5 animate-marquee w-max">
                    {tripled.map((review, i) => (
                        <ReviewCard key={i} review={review} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Reviews;
