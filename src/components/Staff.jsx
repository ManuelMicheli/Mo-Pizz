import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users } from 'lucide-react';

const splitIntoWords = (text) =>
    text.split(' ').map((word, i) => (
        <span key={i} className="staff-word inline-block mr-[0.3em]">
            {word}
        </span>
    ));

const Staff = () => {
    const sRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const words = gsap.utils.toArray('.staff-word');

            // Set initial state
            gsap.set(words, { opacity: 0.08, y: 12 });

            // Animate each word appearing on scroll
            gsap.to(words, {
                scrollTrigger: {
                    trigger: sRef.current,
                    start: 'top 80%',
                    end: 'bottom 40%',
                    scrub: 0.6,
                },
                opacity: 1,
                y: 0,
                stagger: 0.03,
                ease: 'none',
            });

            // Image parallax
            gsap.to('.staff-photo', {
                scrollTrigger: {
                    trigger: '.staff-photo',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                },
                y: -40,
                ease: 'none',
            });
        }, sRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sRef}
            className="w-full bg-charcoal relative py-24 sm:py-32 lg:py-40 overflow-hidden"
        >
            {/* Noise overlay */}
            <div className="absolute inset-0 opacity-5 mix-blend-multiply noise-overlay pointer-events-none" />

            {/* Staff image — full width, taller on mobile */}
            <div className="staff-photo relative w-full aspect-[4/3] sm:aspect-[16/6] md:aspect-[16/4] lg:aspect-[16/3.5] overflow-hidden mb-16 sm:mb-20 bg-charcoal border-y border-cream/10">
                {/* Placeholder gradient + icon */}
                <div className="absolute inset-0 bg-gradient-to-br from-ember/30 via-charcoal to-flame/20" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                    <Users size={64} className="text-cream/20" />
                    <span className="font-mono text-cream/20 text-sm tracking-widest uppercase">
                        Foto Staff
                    </span>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">

                {/* Section label */}
                <div className="font-caveat text-gold text-2xl sm:text-3xl mb-12">
                    {splitIntoWords('Lo Staff')}
                </div>

                {/* Main text blocks */}
                <div className="space-y-10">
                    <p className="font-sans text-cream/90 text-lg sm:text-xl lg:text-2xl leading-relaxed">
                        {splitIntoWords(
                            'Varcare la soglia di Mo Pizz significa lasciarsi alle spalle il rumore della città e ritrovarsi immersi in un\'atmosfera sospesa tra il contemporaneo e la tradizione più genuina. Le luci soffuse avvolgono la sala come un abbraccio, calde e ambrate, mentre il profumo della legna che brucia nel forno a cuore del locale si mescola all\'aria con la stessa naturalezza di un ricordo d\'infanzia. È un posto che parla prima ancora che qualcuno apra la bocca — e quando lo fa, lo fa con il calore di chi sa davvero ricevere gli ospiti.'
                        )}
                    </p>

                    <p className="font-sans text-cream/90 text-lg sm:text-xl lg:text-2xl leading-relaxed">
                        {splitIntoWords(
                            'Al centro di tutto c\'è Cristian Moschiano, classe 1994, fondatore e anima di Mo Pizz: un ragazzo cresciuto con l\'impasto tra le mani e la Napoli nel cuore, capace di trasformare ogni serata in qualcosa che vale la pena ricordare. Dopo anni di lavoro e formazione al Made in Sud di Gorla Minore, ha deciso di portare a Legnano la sua visione — non una pizzeria qualunque, ma un luogo dove la verace napoletana non è un\'etichetta da appendere al muro, ma una pratica quotidiana, quasi un rito.'
                        )}
                    </p>

                    <p className="font-sans text-cream/90 text-lg sm:text-xl lg:text-2xl leading-relaxed">
                        {splitIntoWords(
                            'Attorno a lui si muove uno staff giovane, affiatato, costruito nel tempo come si costruisce una famiglia — con fiducia, rispetto e qualche litigata bonaria alle ore piccole. Ognuno porta il proprio pezzo di personalità in sala: c\'è chi accoglie con una battuta pronta, chi ricorda le preferenze dei clienti abituali senza che nessuno glielo abbia chiesto, chi porta i piatti con quella leggerezza elegante che non si insegna sui manuali. Non è un servizio formale e distaccato — è attenzione autentica, quella che si sente sulla pelle.'
                        )}
                    </p>

                    <p className="font-sans text-cream/90 text-lg sm:text-xl lg:text-2xl leading-relaxed">
                        {splitIntoWords(
                            'La sala è pensata per farti stare bene senza chiederti di cambiare registro: tavoli in legno scuro, linee pulite, dettagli curati con quella sobria eleganza che non urla ma si fa notare. In sottofondo, una selezione musicale che scorre senza imporsi — jazz soul, qualche traccia indie italiana, a volte il silenzio quasi perfetto di una serata infrasettimanale dove ogni parola sembra più vera. Il forno domina la scena con la sua presenza fisica, con il bagliore vivo della brace che cambia colore nel corso della notte e diventa quasi ipnotico mentre aspetti la tua pizza.'
                        )}
                    </p>

                    <p className="font-sans text-cream/90 text-lg sm:text-xl lg:text-2xl leading-relaxed">
                        {splitIntoWords(
                            'Essere un cliente di Mo Pizz non significa sedersi, ordinare e andarsene: significa entrare a far parte, anche per un\'ora sola, di qualcosa di più grande di una cena fuori. Lo staff lavora perché tu ti senta visto, non solo servito — e c\'è una differenza enorme tra le due cose. Che tu venga per la prima volta o sia un habitué di lunga data, troverai sempre qualcuno pronto ad ascoltarti, a consigliarti senza pressione, a farti sentire che il tuo tempo qui vale ogni minuto.'
                        )}
                    </p>

                    <p className="font-sans text-cream/90 text-lg sm:text-xl lg:text-2xl leading-relaxed">
                        {splitIntoWords(
                            'Mo Pizz è, alla fine, il ritratto di una generazione che ha scelto di fare le cose con serietà e con gioia allo stesso tempo — senza nostalgia finta, senza artifici, senza compromessi. Cristian e il suo team portano ogni giorno in sala quella fame di fare bene le cose che si vede negli occhi di chi ha davvero scelto il proprio mestiere, non lo ha subito. E si percepisce, eccome se si percepisce — nel profumo della pizza appena sfornata, nel sorriso di chi ti porge il piatto, in quella sensazione rara di aver mangiato qualcosa di vero.'
                        )}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Staff;
