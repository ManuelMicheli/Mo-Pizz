import React, { useState } from 'react';
import { Flame } from 'lucide-react';

const pizzas = {
    classiche: [
        { name: "Margherita Verace", desc: "San Marzano DOP, fiordilatte del Matese, basilico fresco, olio EVO" },
        { name: "Bufala Campana", desc: "San Marzano DOP, Bufala Campana DOCG, basilico, olio EVO" },
        { name: "Capricciosa DOP", desc: "San Marzano DOP, fiordilatte del Matese, prosciutto cotto DOP, champignon freschi, taggiasche, carciofino alla romana, basilico, olio EVO" },
        { name: "Salsiccia & Friarielli", desc: "Fiordilatte del Matese, salsiccia del nero casertano, friarielli napoletani, provola di Agerola affumicata con paglia, basilico, olio EVO" },
        { name: "Salsiccia Peperoni", desc: "San Marzano DOP, fiordilatte del Matese, salsiccia del nero casertano, taggiasche, peperoni arrostiti, basilico, olio EVO" }
    ],
    chef: [
        { name: "La Cetarese", desc: "Pelato San Marzano DOP, mousse di ricotta di bufala, alici di Cetara, origano di Sicilia, basilico, olio EVO" },
        { name: "La Porchetta", desc: "Fiordilatte del Matese, porchetta di Ariccia, rossa di Tropea stufata, rughetta croccante, catterino del Vesuvio" },
        { name: "La Burrata", desc: "Fiordilatte del Matese, basilico, olio EVO, burratina di Murgia DOP, mortadella, granella di pistacchio di Bronte" },
        { name: "Pera & Taleggio", desc: "Fiordilatte del Matese, pere confit, Taleggio DOP, speck del Trentino, noci di Sorrento, miele" },
        { name: "La Bresaolina", desc: "Bordo ripieno di ricotta e menta, San Marzano DOP, fiordilatte del Matese, bresaola di bufala, rughetta croccante, scaglie di Parmigiano Reggiano 24 mesi" }
    ],
    fritti: [
        { name: "Fritturine napoletane miste", desc: "Crocchè, arancini, frittatine di pasta artigianali" },
        { name: "Patatine fritte artigianali", desc: "Tagliate a mano e fritte al momento" },
        { name: "Crudo di Parma 24 mesi", desc: "Con Bufala Campana DOCG" },
        { name: "Tagliere di salumi campani", desc: "Selezionati da piccoli artigiani del territorio" }
    ],
    dolci: [
        { name: "Delizia al limone", desc: "Crema al limone, Costa d'Amalfi IGP (Pasticceria Sal De Riso)" },
        { name: "Babà napoletano", desc: "Morbido e bagnato al rhum originale" },
        { name: "Pastiera napoletana", desc: "Ricetta classica con grano cotto e canditi" },
        { name: "Cannolo", desc: "Ricotta di pecora e gocce di cioccolato" },
        { name: "Tiramisù", desc: "Fatto in casa, morbido e cremoso" }
    ],
};

const businessLunch = [
    { icon: "🍕", title: "Pizza Lunch", desc: "Una pizza da 'Le Classiche' + bibita/acqua/birra + caffè" },
    { icon: "🥗", title: "Soft Lunch", desc: "Insalatona mista + bibita/acqua/birra + caffè" },
    { icon: "🧀", title: "Crudo & Bufala", desc: "Crudo di Parma 24 mesi + Bufala Campana DOCG + bibita/acqua/birra + caffè" }
];

const tabs = [
    { id: 'classiche', label: 'Le Classiche Rivisitate' },
    { id: 'chef', label: 'Le Mo Pizz dello Chef' },
    { id: 'fritti', label: 'Fritti & Antipasti' },
    { id: 'dolci', label: 'Dolci' },
    { id: 'business', label: 'Business Lunch' }
];

const highlightKeywords = (text) => {
    const keywords = ['DOP', 'DOCG', 'IGP', 'Slow Food'];
    let result = text;
    keywords.forEach(kw => {
        const rx = new RegExp(`\\b${kw}\\b`, 'g');
        result = result.replace(rx, `<span class="text-gold font-caveat text-lg ml-1 px-1.5 py-0 border border-gold/30 rounded inline-block translate-y-[1px] bg-gold/5">${kw}</span>`);
    });
    return <span dangerouslySetInnerHTML={{ __html: result }} />;
};

const Menu = () => {
    const [activeTab, setActiveTab] = useState('classiche');

    return (
        <section id="menu" className="w-full py-24 sm:py-32 px-6 sm:px-12 md:px-20 lg:px-32 bg-charcoal relative">
            <div className="max-w-7xl mx-auto flex flex-col">
                {/* Section Header */}
                <div className="flex flex-col items-center text-center mb-16">
                    <div className="font-caveat text-gold text-2xl sm:text-3xl mb-4">
                        Il Menù
                    </div>
                    <h2 className="font-playfair font-bold text-cream text-4xl sm:text-5xl md:text-6xl mb-4">
                        Le Nostre Pizze
                    </h2>
                    <h3 className="font-caveat text-gold text-2xl sm:text-3xl max-w-lg">
                        "Tradizione napoletana, ingredienti d'eccellenza"
                    </h3>
                </div>

                {/* Tab Navigation */}
                <div className="w-full overflow-x-auto pb-6 mb-12 scroll-smooth scrollbar-hide snap-x flex justify-start lg:justify-center border-b border-smoke/20">
                    <div className="flex gap-8 px-4 sm:px-0 min-w-max">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`snap-center pb-4 relative font-sans text-lg transition-colors duration-300 w-max
                  ${activeTab === tab.id ? 'text-cream font-bold' : 'text-smoke hover:text-cream/80'}`}
                            >
                                {tab.label}
                                {activeTab === tab.id && (
                                    <span className="absolute bottom-0 left-0 w-full h-1 bg-flame rounded-t-full layout-enter" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tab Content */}
                <div className="w-full">
                    {activeTab === 'business' ? (
                        <div className="bg-flour rounded-[2rem] p-8 sm:p-12 shadow-2xl w-full max-w-4xl mx-auto flex flex-col items-center text-center">
                            <span className="font-caveat text-xl text-charcoal mb-6 bg-gold/20 px-4 py-2 rounded-full border border-gold/40">Solo Venerdì e Sabato, 12:00–14:30</span>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                                {businessLunch.map((b, i) => (
                                    <div key={i} className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm border border-black/5 hover:-translate-y-2 transition-transform duration-300">
                                        <span className="text-4xl mb-4">{b.icon}</span>
                                        <h4 className="font-playfair font-bold text-xl text-charcoal mb-2">{b.title}</h4>
                                        <p className="font-sans text-smoke text-sm">{b.desc}</p>
                                    </div>
                                ))}
                            </div>
                            <p className="mt-10 font-sans italic text-charcoal font-medium">Tutti i Business Lunch includono una bevanda e un Caffè Izzo — premiato Espresso dell'Anno.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                            {pizzas[activeTab]?.map((pizza, idx) => (
                                <div
                                    key={idx}
                                    className="group bg-[#242424] rounded-[2rem] overflow-hidden flex flex-col border border-white/5 hover:border-l-4 hover:border-l-flame hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/60 transition-all duration-300"
                                >
                                    {/* Decorative Placeholder */}
                                    <div className="w-full h-32 relative flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity" style={{ background: 'radial-gradient(circle at 50% 100%, #C94A1A 0%, #242424 70%)' }}>
                                        <Flame className="text-flame/40 group-hover:text-flame transition-colors w-8 h-8" />
                                    </div>
                                    {/* Info */}
                                    <div className="p-6 sm:p-8 flex flex-col flex-1">
                                        <h4 className="font-playfair font-bold text-cream text-2xl mb-3 group-hover:text-flame transition-colors">{pizza.name}</h4>
                                        <p className="font-sans text-smoke italic font-medium leading-relaxed mt-auto">
                                            {highlightKeywords(pizza.desc)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Menu;
