import React from 'react';
import { MapPin, Phone, Instagram, Map } from 'lucide-react';

const Contacts = () => {
    return (
        <section id="contatti" className="py-12 sm:py-24 md:py-32 px-4 sm:px-8 md:px-16 lg:px-32 bg-flour text-charcoal relative">
            <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-16 xl:gap-24 items-start">

                {/* Left Column - Info */}
                <div className="w-full lg:w-1/2 flex flex-col">
                    <div className="font-caveat text-charcoal/80 text-2xl sm:text-3xl mb-4">
                        Contatti
                    </div>
                    <h2 className="font-playfair font-bold text-charcoal text-4xl sm:text-5xl md:text-6xl mb-12">
                        Vieni a Trovarci
                    </h2>

                    <div className="flex flex-col gap-6 mb-12">
                        <div className="flex items-start gap-4">
                            <MapPin className="text-flame mt-1 shrink-0" size={24} />
                            <div className="font-sans text-xl font-medium">
                                Via Cadore 4, <br />20025 Legnano (MI)
                            </div>
                        </div>

                        <a href="tel:+390331024363" className="group flex items-center gap-4 hover:opacity-80 transition-opacity w-max">
                            <Phone className="text-flame shrink-0" size={24} />
                            <div className="font-sans text-xl font-medium border-b border-transparent group-hover:border-flame transition-colors">
                                0331 024363
                            </div>
                        </a>

                        <a href="https://instagram.com/mo_pizz" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 hover:opacity-80 transition-opacity w-max">
                            <Instagram className="text-flame shrink-0" size={24} />
                            <div className="font-sans text-xl font-medium border-b border-transparent group-hover:border-flame transition-colors">
                                @mo_pizz
                            </div>
                        </a>
                    </div>

                    <div className="bg-white rounded-[2rem] border border-smoke/10 p-6 sm:p-8 shadow-lg shadow-charcoal/5 mb-10 w-full sm:max-w-md">
                        <h3 className="font-sans font-bold text-xl mb-6 text-charcoal uppercase tracking-wide">Orari di Apertura</h3>
                        <div className="flex flex-col gap-4 font-sans text-charcoal">
                            <div className="flex justify-between items-center py-2 border-b border-smoke/10">
                                <span className="font-medium">Lunedì</span>
                                <span className="text-ember font-bold">Chiuso</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-smoke/10">
                                <span className="font-medium">Martedì — Giovedì</span>
                                <span>18:00 – 22:30</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-smoke/10">
                                <span className="font-medium">Venerdì — Sabato</span>
                                <span className="text-right">12:00 – 14:30 <br /> 18:00 – 22:30</span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <span className="font-medium">Domenica</span>
                                <span>18:00 – 22:30</span>
                            </div>
                        </div>
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <a href="tel:+390331024363" className="magnetic-btn w-full sm:w-auto bg-flame hover:bg-ember text-cream font-sans font-semibold py-4 px-8 rounded-full flex items-center justify-center gap-2 transition-colors duration-300">
                            <Phone size={20} />
                            Chiama Ora
                        </a>
                        <a href="https://maps.google.com/?q=Mo+Pizz+Via+Cadore+4+Legnano" target="_blank" rel="noopener noreferrer" className="magnetic-btn w-full sm:w-auto border-2 border-charcoal text-charcoal hover:bg-charcoal hover:text-white font-sans font-semibold py-4 px-8 rounded-full flex items-center justify-center gap-2 transition-colors duration-300">
                            <Map size={20} />
                            Indicazioni Stradali
                        </a>
                    </div>
                </div>

                {/* Right Column - Map IFRAME */}
                <div className="w-full lg:w-1/2 aspect-[4/3] sm:aspect-[3/2] lg:aspect-auto lg:h-[700px] max-h-[50vh] sm:max-h-[60vh] lg:max-h-none rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-2xl flex relative bg-smoke/20">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2793.6338006679586!2d8.903960076296!3d45.597950371077366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4786915df0000000%3A0x1d36cbede0802c6b!2sMo%20pizz!5e0!3m2!1sen!2sit!4v1700000000000!5m2!1sen!2sit"
                        className="absolute inset-0 w-full h-full border-0"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        sandbox="allow-scripts allow-same-origin allow-popups"
                        title="Mappa di Mo Pizz a Legnano"
                    ></iframe>
                </div>

            </div>
        </section>
    );
};

export default Contacts;