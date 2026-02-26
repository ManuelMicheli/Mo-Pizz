# Security & Privacy Hardening — Mo Pizz

**Data:** 2026-02-25
**Stato:** Approvato

## Contesto

Audit di sicurezza completo del sito Mo Pizz. Il sito e tecnicamente pulito (zero segreti, zero tracking, zero XSS), ma manca di conformita GDPR: Google Fonts caricati da CDN, Google Maps iframe senza consenso, nessuna privacy policy o cookie banner.

## Interventi

### 1. Self-hosting Google Fonts

- Scaricare Caveat, DM Mono, DM Sans, Playfair Display in `/public/fonts/`
- Aggiungere `@font-face` in `src/index.css` per ogni peso/stile usato
- Rimuovere i 3 tag `<link>` a Google Fonts da `index.html`
- Aggiornare CSP: rimuovere `fonts.googleapis.com` da `style-src` e `fonts.gstatic.com` da `font-src`

### 2. Google Maps con consenso

- In `Contacts.jsx`: sostituire l'iframe con un placeholder
- Placeholder: immagine statica della zona + overlay scuro con testo "Carica Google Maps" e icona
- Al click dell'utente: setState per caricare l'iframe reale
- Se l'utente ha rifiutato i cookie nel banner, Maps resta bloccato
- Stile coerente col design (rounded corners, colori brand)

### 3. Cookie Banner

- Nuovo componente `CookieBanner.jsx` — banner fisso in basso
- Due opzioni: "Accetta" e "Solo necessari"
- Salva preferenza in `localStorage` (chiave `mopizz-consent`)
- Se rifiuta: Google Maps bloccato nel placeholder
- Se accetta: Maps puo caricarsi al click
- Banner non riappare dopo la scelta (check localStorage)
- Design: sfondo charcoal, bordi arrotondati, font del sito, bottone flame

### 4. Privacy Policy

- Nuova route `/privacy` con componente `PrivacyPolicy.jsx`
- Testo in italiano: dati raccolti, Google Maps su consenso, diritti utente, contatti titolare, base giuridica
- Link alla privacy nel Footer e nel Cookie Banner
- Design coerente con palette, tipografia, layout del sito

### 5. Hardening CSP e Headers

- Aggiungere `frame-ancestors 'self'` alla CSP
- Aggiungere `base-uri 'self'` e `form-action 'self'` alla CSP
- Aggiungere header `X-Permitted-Cross-Domain-Policies: none`
- Sincronizzare `vercel.json` e `public/_headers`

### 6. robots.txt

- Creare `public/robots.txt` con regole base
