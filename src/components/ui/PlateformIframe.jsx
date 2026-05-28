'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ExternalLink, Maximize2, Minimize2 } from 'lucide-react';

/**
 * Shared Plateform iframe wrapper.
 * - Loading spinner (with 5s fallback)
 * - Fullscreen toggle via Fullscreen API (fallback: open in new tab)
 * - Mobile-tall sizing (svh) for easier interaction
 *
 * Props:
 *   src, title, sandbox, allow
 *   iframeMarginTop (number) — negative px to crop iframe top (hides Plateform header)
 *   sizeClassName — Tailwind classes controlling iframe height when NOT fullscreen
 *   theme — 'dark' | 'light' (affects spinner + bottom bar colors)
 *   showBottomBar — show "Open in new window" footer (default true)
 */
export default function PlateformIframe({
    src,
    title,
    sandbox = 'allow-same-origin allow-scripts allow-forms allow-popups',
    allow = 'clipboard-write',
    iframeMarginTop = 0,
    sizeClassName = 'h-[82svh] min-h-[560px] sm:h-[640px] md:h-[740px]',
    theme = 'dark',
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
            // iOS Safari <16.4 + some embedded browsers — fallback
            window.open(src, '_blank', 'noopener,noreferrer');
        }
    }, [src]);

    const spinnerBg = theme === 'dark' ? 'bg-charcoal' : 'bg-cream';
    const spinnerText = theme === 'dark' ? 'text-smoke/60' : 'text-smoke';
    const barBorder = theme === 'dark' ? 'border-white/5' : 'border-charcoal/10';
    const barBg = theme === 'dark' ? 'bg-charcoal/40' : 'bg-cream/60';
    const linkColor = theme === 'dark' ? 'text-smoke/60 hover:text-cream' : 'text-smoke hover:text-flame';

    const iframeStyle = iframeMarginTop
        ? {
              marginTop: `${iframeMarginTop}px`,
              height: `calc(100% + ${Math.abs(iframeMarginTop)}px)`,
          }
        : undefined;

    return (
        <div
            ref={containerRef}
            className={`relative w-full bg-charcoal ${isFullscreen ? 'h-screen flex flex-col' : ''}`}
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
                    sandbox={sandbox}
                    allow={allow}
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    onLoad={() => setLoaded(true)}
                    style={iframeStyle}
                    className={`w-full border-0 ${iframeMarginTop ? '' : 'h-full'}`}
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
