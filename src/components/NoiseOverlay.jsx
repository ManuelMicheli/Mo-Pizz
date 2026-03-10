const NoiseOverlay = () => (
    <div
        className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.05] hidden sm:block"
        style={{
            mixBlendMode: 'overlay',
            backgroundImage: "url('/images/noise.png')",
            backgroundSize: '128px 128px',
            backgroundRepeat: 'repeat',
            contain: 'strict',
        }}
        aria-hidden="true"
    />
);

export default NoiseOverlay;
