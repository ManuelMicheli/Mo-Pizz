'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ExternalLink, Maximize2, Minimize2 } from 'lucide-react';

/**
 * Generic third-party embed iframe (ordering widgets, ecc.).
 * - Loading spinner (con fallback 5s)
 * - Toggle schermo intero via Fullscreen API (fallback: apre in nuova scheda)
 * - Sizing alto su mobile (svh) per interazione più comoda
 *
 * Props: src, title, allow, sizeClassName, theme ('dark'|'light'), showBottomBar
 */
export default function EmbedIframe({
    src,
    title,
    allow = 'payment; clipboard-write',
    sizeClassName = 'h-[82svh] min-h-[560px] sm:h-[640px] md:h-[760px]',
    theme = 'light',
    showBottomBar = true,
}) {
    const [loaded, setLoaded] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const onChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
        document.addEventListener('fullscreenchange', onChange);
        document.addEventListener('webkitfullscreenchange', onChange);
        return () => {
            document.removeEventListener('fullscreenchange', onChange);
            document.removeEventListener('webkitfullscreenchange', onChange);
        };
    }, []);

    useEffect(() => {
        const t = setTimeout(() => setLoaded(true), 5000);
        return () => clearTimeout(t);
    }, []);

    const toggleFullscreen = useCallback(async () => {
        const el = containerRef.current;
        if (!el) return;
        try {
            if (!document.fullscreenElement) {
                if (el.requestFullscreen) await el.requestFullscreen();
                else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
                else throw new Error('fullscreen-unsupported');
            } else {
                if (document.exitFullscreen) await document.exitFullscreen();
                else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
            }
        } catch {
            window.open(src, '_blank', 'noopener,noreferrer');
        }
    }, [src]);

    const spinnerBg = theme === 'dark' ? 'bg-charcoal' : 'bg-cream';
    const spinnerText = theme === 'dark' ? 'text-smoke/60' : 'text-smoke';
    const barBorder = theme === 'dark' ? 'border-white/5' : 'border-charcoal/10';
    const barBg = theme === 'dark' ? 'bg-charcoal/40' : 'bg-cream/60';
    const linkColor = theme === 'dark' ? 'text-smoke/60 hover:text-cream' : 'text-smoke hover:text-flame';

    return (
        <div
            ref={containerRef}
            className={`relative w-full bg-white ${isFullscreen ? 'h-screen flex flex-col' : ''}`}
        >
            <div className={`relative w-full overflow-hidden ${isFullscreen ? 'flex-1' : sizeClassName}`}>
                {!loaded && (
                    <div className={`absolute inset-0 flex items-center justify-center ${spinnerBg} z-10`}>
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-10 h-10 border-2 border-flame border-t-transparent rounded-full animate-spin" />
                            <span className={`font-sans ${spinnerText} text-sm`}>Caricamento...</span>
                        </div>
                    </div>
                )}

                <button
                    type="button"
                    onClick={toggleFullscreen}
                    aria-label={isFullscreen ? 'Esci da schermo intero' : 'Apri a schermo intero'}
                    className="absolute top-3 right-3 z-20 inline-flex items-center gap-1.5 rounded-full bg-charcoal/90 hover:bg-flame text-cream backdrop-blur-md pl-3 pr-3.5 py-2.5 text-xs sm:text-sm font-sans font-semibold shadow-lg border border-white/10 transition-colors active:scale-95"
                >
                    {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                    <span>{isFullscreen ? 'Riduci' : 'Schermo intero'}</span>
                </button>

                <iframe
                    src={src}
                    title={title}
                    allow={allow}
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    onLoad={() => setLoaded(true)}
                    className="w-full h-full border-0"
                />
            </div>

            {showBottomBar && !isFullscreen && (
                <div className={`flex items-center justify-center gap-3 px-4 py-3 border-t ${barBorder} ${barBg}`}>
                    <a
                        href={src}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`font-sans text-xs sm:text-sm inline-flex items-center gap-1.5 transition-colors ${linkColor}`}
                    >
                        Apri in una nuova finestra <ExternalLink size={13} />
                    </a>
                </div>
            )}
        </div>
    );
}
