# Security & Privacy Hardening Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make Mo Pizz fully GDPR-compliant and security-hardened: self-host fonts, consent-gated Google Maps, cookie banner, privacy policy, tightened CSP, robots.txt.

**Architecture:** Six independent changes that touch different files. Cookie banner state (localStorage) flows into Contacts component to gate Maps loading. Privacy policy is a new route. All other changes are config-level.

**Tech Stack:** React 18, Tailwind CSS, React Router DOM 7, Vite, Vercel headers.

---

## Task 1: Self-host Caveat Font & Remove Google Fonts CDN

**Files:**
- Download: `public/fonts/Caveat-Regular.woff2`, `public/fonts/Caveat-Bold.woff2`
- Modify: `src/index.css` (add @font-face)
- Modify: `index.html:14-16` (remove Google Fonts links)

**Step 1: Download Caveat font files**

Use google-webfonts-helper or download directly. Get woff2 format for weights 400 and 700.

```bash
curl -o public/fonts/Caveat-Regular.woff2 "https://fonts.gstatic.com/s/caveat/v18/WnznHAc5bAfYB2QRah7pcpNvOx-pjfJ9SIKjYBxPigs.woff2"
curl -o public/fonts/Caveat-Bold.woff2 "https://fonts.gstatic.com/s/caveat/v18/WnznHAc5bAfYB2QRah7pcpNvOx-pjfJ9eYejYBxPigs.woff2"
```

**Step 2: Add @font-face declarations in `src/index.css`**

Add after the existing @font-face blocks (after line 51):

```css
@font-face {
  font-family: 'Caveat';
  src: url('/fonts/Caveat-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Caveat';
  src: url('/fonts/Caveat-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
```

**Step 3: Remove Google Fonts links from `index.html`**

Delete lines 14-16 (the three `<link>` tags for Google Fonts preconnect and stylesheet).

**Step 4: Build and verify**

```bash
npm run build
```

Expected: Build succeeds. Font-caveat text still renders correctly in browser.

**Step 5: Commit**

```bash
git add public/fonts/Caveat-Regular.woff2 public/fonts/Caveat-Bold.woff2 src/index.css index.html
git commit -m "feat: self-host Caveat font, remove Google Fonts CDN for GDPR"
```

---

## Task 2: Consent-Gated Google Maps in Contacts

**Files:**
- Modify: `src/components/Contacts.jsx`

**Step 1: Add consent-gated Maps with placeholder**

Replace the iframe block (lines 77-87) with a placeholder that loads Maps only on click, and only if consent was given. Import `MapPin` icon from lucide-react (already imported).

```jsx
import React, { useState } from 'react';
import { MapPin, Phone, Instagram, Map } from 'lucide-react';

const Contacts = () => {
    const [mapsLoaded, setMapsLoaded] = useState(false);

    const consent = typeof window !== 'undefined'
        ? localStorage.getItem('mopizz-consent')
        : null;

    const handleLoadMaps = () => {
        if (consent === 'all') {
            setMapsLoaded(true);
        }
    };

    // ... existing JSX unchanged until the map container ...

    {/* Right Column - Map */}
    <div className="w-full lg:w-1/2 aspect-[4/3] sm:aspect-[3/2] lg:aspect-auto lg:h-[700px] h-[45vh] sm:h-auto sm:max-h-[60vh] lg:max-h-none rounded-2xl sm:rounded-[3rem] overflow-hidden shadow-2xl flex relative bg-smoke/20">
        {mapsLoaded ? (
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!..."
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                sandbox="allow-scripts allow-same-origin allow-popups"
                title="Mappa di Mo Pizz a Legnano"
            ></iframe>
        ) : (
            <button
                onClick={handleLoadMaps}
                className="absolute inset-0 w-full h-full flex flex-col items-center justify-center gap-4 bg-charcoal/90 text-cream cursor-pointer group transition-colors duration-300 hover:bg-charcoal/80"
            >
                <div className="w-16 h-16 rounded-full bg-flame/20 flex items-center justify-center group-hover:bg-flame/30 transition-colors">
                    <MapPin className="text-flame" size={28} />
                </div>
                <span className="font-sans font-semibold text-lg">
                    {consent === 'all' ? 'Carica Google Maps' : 'Accetta i cookie per vedere la mappa'}
                </span>
                <span className="font-sans text-smoke text-sm max-w-[280px] text-center">
                    {consent === 'all'
                        ? 'Cliccando, i dati verranno inviati a Google'
                        : 'La mappa richiede il consenso ai cookie di terze parti'}
                </span>
            </button>
        )}
    </div>
```

**Step 2: Build and verify**

```bash
npm run build
```

Expected: Build succeeds. Map shows placeholder. After accepting cookies and clicking, iframe loads.

**Step 3: Commit**

```bash
git add src/components/Contacts.jsx
git commit -m "feat: consent-gated Google Maps — placeholder until user accepts"
```

---

## Task 3: Cookie Banner Component

**Files:**
- Create: `src/components/CookieBanner.jsx`
- Modify: `src/components/Layout.jsx` (add CookieBanner)

**Step 1: Create CookieBanner component**

```jsx
// src/components/CookieBanner.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CookieBanner = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('mopizz-consent');
        if (!consent) {
            setVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('mopizz-consent', 'all');
        setVisible(false);
        window.dispatchEvent(new Event('consent-changed'));
    };

    const handleReject = () => {
        localStorage.setItem('mopizz-consent', 'necessary');
        setVisible(false);
        window.dispatchEvent(new Event('consent-changed'));
    };

    if (!visible) return null;

    return (
        <div className="fixed bottom-0 inset-x-0 z-[9999] p-4 sm:p-6">
            <div className="max-w-2xl mx-auto bg-charcoal border border-smoke/20 rounded-[2rem] p-6 sm:p-8 shadow-2xl">
                <p className="font-sans text-cream text-sm sm:text-base mb-2">
                    Questo sito utilizza solo cookie tecnici necessari. La mappa di Google Maps richiede il tuo consenso per caricarsi, poiché invia dati a Google.
                </p>
                <p className="font-sans text-smoke text-xs sm:text-sm mb-6">
                    Leggi la nostra{' '}
                    <Link to="/privacy" className="text-flame underline hover:text-ember transition-colors">
                        Privacy Policy
                    </Link>{' '}
                    per maggiori informazioni.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        onClick={handleAccept}
                        className="magnetic-btn bg-flame hover:bg-ember text-cream font-sans font-semibold py-3 px-6 rounded-full transition-colors duration-300 text-sm sm:text-base"
                    >
                        Accetta Tutto
                    </button>
                    <button
                        onClick={handleReject}
                        className="magnetic-btn border border-smoke/30 text-smoke hover:text-cream hover:border-cream font-sans font-semibold py-3 px-6 rounded-full transition-colors duration-300 text-sm sm:text-base"
                    >
                        Solo Necessari
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookieBanner;
```

**Step 2: Add CookieBanner to Layout**

In `src/components/Layout.jsx`, import and render CookieBanner after Footer:

```jsx
import CookieBanner from './CookieBanner';

const Layout = () => {
    return (
        <div className="relative w-full min-h-screen bg-charcoal font-sans text-cream selection:bg-flame flex flex-col">
            <Navbar />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
            <CookieBanner />
        </div>
    );
};
```

**Step 3: Build and verify**

```bash
npm run build
```

Expected: Build succeeds. Banner appears on first visit. After choosing, it disappears and doesn't reappear.

**Step 4: Commit**

```bash
git add src/components/CookieBanner.jsx src/components/Layout.jsx
git commit -m "feat: add GDPR cookie consent banner"
```

---

## Task 4: Privacy Policy Page

**Files:**
- Create: `src/pages/PrivacyPolicy.jsx`
- Modify: `src/App.jsx` (add route)
- Modify: `src/components/Footer.jsx` (add link)

**Step 1: Create PrivacyPolicy page**

A full-page component styled consistently with the site. Text in Italian covering:
- Titolare del trattamento (Mo Pizz Legnano SRL, P.IVA 10529490960)
- Dati raccolti (nessun cookie proprio di profilazione)
- Google Maps (caricato solo su consenso, dati inviati a Google)
- Base giuridica (consenso per terze parti, legittimo interesse per cookie tecnici)
- Diritti dell'utente (accesso, rettifica, cancellazione, portabilita)
- Contatti del titolare

Style: bg-charcoal text-cream, max-w-3xl centered, font-sans body text, font-playfair headings. Padding and spacing consistent with other sections.

**Step 2: Add route in `src/App.jsx`**

```jsx
import PrivacyPolicy from './pages/PrivacyPolicy';

// Inside Routes, add after the menu redirect:
<Route path="privacy" element={<PrivacyPolicy />} />
```

**Step 3: Add link in Footer**

In `src/components/Footer.jsx`, in the "Social & Legal" column (around line 78), add a privacy link:

```jsx
<Link to="/privacy" className="font-sans text-smoke text-sm hover:text-cream transition-colors">
    Privacy Policy
</Link>
```

Import `Link` from `react-router-dom` at the top of Footer.

**Step 4: Build and verify**

```bash
npm run build
```

Expected: Build succeeds. `/privacy` route renders the policy page. Footer link works.

**Step 5: Commit**

```bash
git add src/pages/PrivacyPolicy.jsx src/App.jsx src/components/Footer.jsx
git commit -m "feat: add Privacy Policy page with footer link"
```

---

## Task 5: Harden CSP and Security Headers

**Files:**
- Modify: `vercel.json`
- Modify: `public/_headers`

**Step 1: Update CSP in `vercel.json`**

Updated CSP (changes: remove Google Fonts domains, add frame-ancestors, base-uri, form-action):

```
default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; font-src 'self'; img-src 'self' data:; frame-src https://www.google.com; frame-ancestors 'self'; base-uri 'self'; form-action 'self'; connect-src 'self'
```

Add new header:
```json
{ "key": "X-Permitted-Cross-Domain-Policies", "value": "none" }
```

**Step 2: Sync `public/_headers` with the same values**

Mirror all headers from vercel.json into _headers format.

**Step 3: Build and verify**

```bash
npm run build
```

**Step 4: Commit**

```bash
git add vercel.json public/_headers
git commit -m "feat: harden CSP — remove Google Fonts, add frame-ancestors/base-uri/form-action"
```

---

## Task 6: Add robots.txt

**Files:**
- Create: `public/robots.txt`

**Step 1: Create robots.txt**

```
User-agent: *
Allow: /
Disallow: /privacy
```

**Step 2: Commit**

```bash
git add public/robots.txt
git commit -m "feat: add robots.txt"
```

---

## Execution Order

Tasks 1, 5, 6 are independent of each other.
Task 2 (Maps consent) depends on Task 3 (CookieBanner) for the localStorage key.
Task 4 (Privacy Policy) should come after Task 3 (CookieBanner links to it).

Recommended order: **1 → 3 → 2 → 4 → 5 → 6**

Or parallel: Tasks 1, 5, 6 in parallel → Task 3 → Tasks 2, 4 in parallel.
