# Chi Siamo — Animazione percorso tratteggiato con GSAP MotionPath

## Obiettivo

Inserire dentro la sezione `#features` ("Chi Siamo") un'animazione GSAP scroll-linked con:
- Un **percorso SVG tratteggiato** che attraversa la sezione in diagonale (alto-destra → basso-sinistra).
- Un **placeholder animato** (icona/cerchio tematico) che segue il path durante lo scroll.
- Il tutto **senza rompere** il layout esistente della sezione (testo leggibile, card flip funzionanti).

---

## Contesto architetturale

### File da modificare

**`src/components/Features.jsx`** — è il componente "Chi Siamo". Attualmente:
- Ha `id="features"` e `ref={sectionRef}`.
- Desktop: scroll orizzontale con pinning GSAP (5 card flip con `containerAnimation`).
- Mobile: card impilate verticalmente con entrance + flip individuali via `ScrollTrigger`.
- Struttura: header (titolo "Chi Siamo") + track orizzontale di card + progress bar.

### Rendering order in `Home.jsx` (riga 34-45)

```
Hero → MenuSection → Statement → Gallery → Chef → Features → MenuVideoIntro → Reviews → Contacts
```

Features è preceduto da Chef (sfondo charcoal/flour split) e seguito da MenuVideoIntro (video con overlay scuro).

### Vincoli ScrollTrigger

- Features usa già un pinned ScrollTrigger su desktop con `containerAnimation` per le card flip.
- Il path animation deve essere **coordinato** con il pin esistente, non creare un secondo pin.
- Usare `gsap.context()` dentro `useEffect`/`useLayoutEffect` e restituire `ctx.revert()` per cleanup.
- `refreshPriority: -1` è già impostato sulla scrollTween esistente — rispettare l'ordine di refresh.

### Design system

- Colori: `charcoal` (#1A1A1A) bg, `flame` (#E85D26) accento, `cream` (#FFF8F0) testo, `gold` (#D4A853) badge/highlight, `smoke` (#8A8278) muted.
- Font: `font-playfair` heading, `font-sans` body, `font-caveat` accenti.
- Border radius: `rounded-[2rem]` a `rounded-[4rem]`.
- Testo in italiano.

---

## Specifiche di implementazione

### 1. SVG Path tratteggiato (layer di background)

Inserire un `<svg>` posizionato `absolute inset-0` all'interno della sezione `#features`, con `pointer-events-none` e `z-index` sotto il contenuto ma sopra il bg.

```jsx
<svg
  className="absolute inset-0 w-full h-full pointer-events-none"
  viewBox="0 0 1440 900"
  preserveAspectRatio="none"
  style={{ zIndex: 1 }}
>
  <path
    id="chi-siamo-path"
    d="M 1400,50 C 1100,150 800,300 700,450 S 200,700 40,850"
    fill="none"
    stroke="#D4A853"          /* gold */
    strokeWidth="2"
    strokeDasharray="12 8"    /* tratteggiato: 12px tratto, 8px gap */
    opacity="0.25"
  />
</svg>
```

**Path**: curva cubica di Bézier da angolo alto-destra a angolo basso-sinistra, con una morbida diagonale curvilinea. Il `viewBox` è `0 0 1440 900` con `preserveAspectRatio="none"` per adattarsi alla sezione indipendentemente dalla dimensione.

**Stile tratteggio**: `strokeDasharray="12 8"` per un look elegante. Colore `gold` (#D4A853) a bassa opacità (0.2–0.3) per non interferire col testo.

### 2. Placeholder che segue il path

Aggiungere un elemento DOM (cerchio o icona tematica) che si muove lungo il path tramite GSAP `MotionPathPlugin`.

```jsx
<div
  ref={followerRef}
  className="absolute pointer-events-none"
  style={{ zIndex: 2, width: 48, height: 48 }}
>
  {/* Cerchio con icona fiamma/pizza */}
  <div className="w-12 h-12 rounded-full bg-flame/90 border-2 border-gold shadow-lg shadow-flame/30 flex items-center justify-center">
    <span className="text-cream text-lg">🔥</span>
    {/* Oppure usa un'icona Lucide: <Flame size={20} className="text-cream" /> */}
  </div>
</div>
```

**Alternative per il placeholder** (scegliere una):
- Cerchio `flame` con bordo `gold` e icona fiamma (Lucide `Flame`).
- Pallina minimal `gold` con glow.
- Piccola pizza stilizzata (emoji 🍕 o SVG custom).

### 3. Animazione GSAP scroll-linked

Registrare `MotionPathPlugin` e animare il follower lungo il path SVG, sincronizzato con lo scroll della sezione.

```js
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
```

**Strategia di integrazione con il pin desktop esistente:**

#### Desktop (min-width: 768px)

La sezione è già pinnata per lo scroll orizzontale. Il path animation deve usare **la stessa ScrollTrigger** (o un trigger coordinato) per avanzare il follower lungo il path in parallelo con il progresso dello scroll orizzontale.

Opzione consigliata: agganciare l'animazione del follower allo stesso range di scroll del pin, usando un `ScrollTrigger` separato con `scrub: true` sullo stesso trigger/range:

```js
gsap.to(followerRef.current, {
  motionPath: {
    path: '#chi-siamo-path',
    align: '#chi-siamo-path',
    alignOrigin: [0.5, 0.5],
    autoRotate: false,
  },
  ease: 'none',
  scrollTrigger: {
    trigger: sectionRef.current,
    start: 'top top',
    end: () => `+=${totalScrollWidth}`,   // Stesso range del pin
    scrub: 0.6,
  },
});
```

**Nota**: l'SVG e il follower dovrebbero essere posizionati **dentro l'area pinnata ma fuori dal track scorrevole**, in modo che restino fissi sullo schermo mentre le card scorrono orizzontalmente. Cioè: sono figli diretti della `<section>`, non del `<div ref={trackRef}>`.

#### Mobile (max-width: 767px)

Su mobile non c'è il pin. Usare un `ScrollTrigger` standard con `scrub: true`:

```js
gsap.to(followerRef.current, {
  motionPath: {
    path: '#chi-siamo-path',
    align: '#chi-siamo-path',
    alignOrigin: [0.5, 0.5],
    autoRotate: false,
  },
  ease: 'none',
  scrollTrigger: {
    trigger: sectionRef.current,
    start: 'top 80%',
    end: 'bottom 20%',
    scrub: 0.6,
  },
});
```

Su mobile, la sezione è più alta (card impilate verticalmente), quindi il path viene naturalmente percorso durante lo scroll verticale.

### 4. Animazione progressiva del tratteggio (draw-on)

Per un effetto extra: animare il `strokeDashoffset` del path SVG per "disegnare" il tratteggio progressivamente durante lo scroll, rivelando il percorso man mano che il follower lo percorre.

```js
const pathEl = document.getElementById('chi-siamo-path');
const pathLength = pathEl.getTotalLength();

// Imposta il path come completamente nascosto
gsap.set(pathEl, {
  strokeDasharray: pathLength,
  strokeDashoffset: pathLength,
});

// Rivela progressivamente
gsap.to(pathEl, {
  strokeDashoffset: 0,
  ease: 'none',
  scrollTrigger: {
    trigger: sectionRef.current,
    start: 'top top',      // desktop: top top (pinned)
    end: () => `+=${totalScrollWidth}`,
    scrub: 0.6,
  },
});
```

**Nota**: se si usa il draw-on, lo `strokeDasharray` iniziale nel JSX va rimosso (sarà impostato da GSAP).

### 5. Requisiti di layout e altezza

- **Desktop**: la sezione è già pinnata con altezza sufficiente (`end: +=${totalScrollWidth}`). Il path/follower vivono nel viewport pinnato → nessuna modifica di altezza necessaria.
- **Mobile**: la sezione ha `py-24 sm:py-32` e 5 card impilate (~220px ciascuna + gap). Altezza totale circa `1400px` — sufficiente per un percorso fluido. Se necessario, aggiungere `min-h-[120vh]` su mobile per garantire percorso completo.

### 6. Struttura JSX risultante

```jsx
<section id="features" ref={sectionRef} className="... relative overflow-hidden z-10">
  {/* ① SVG Path overlay — dietro il contenuto */}
  <svg className="absolute inset-0 w-full h-full pointer-events-none z-[1]" ...>
    <path id="chi-siamo-path" ... />
  </svg>

  {/* ② Follower — si muove lungo il path */}
  <div ref={followerRef} className="absolute pointer-events-none z-[2]" ...>
    <div className="w-12 h-12 rounded-full bg-flame/90 ...">
      <Flame size={20} className="text-cream" />
    </div>
  </div>

  {/* ③ Contenuto esistente (invariato, z-index più alto) */}
  <div className="w-full flex flex-col relative z-[5]">
    {/* Header "Chi Siamo" */}
    ...
    {/* Card track */}
    ...
    {/* Progress bar */}
    ...
  </div>
</section>
```

Il contenuto esistente va wrappato (se non lo è già) con `relative z-[5]` per stare sopra path e follower.

---

## Dipendenze

### Plugin GSAP necessario

```bash
# MotionPathPlugin è incluso nel pacchetto gsap core (nessun install aggiuntivo)
```

`MotionPathPlugin` è già incluso in `gsap@3.12.5`. Basta importarlo:

```js
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
```

---

## Checklist di implementazione

1. [ ] Aggiungere `import { MotionPathPlugin } from 'gsap/MotionPathPlugin'` e registrarlo.
2. [ ] Creare il ref `followerRef = useRef(null)`.
3. [ ] Inserire l'SVG con il `<path>` tratteggiato come primo figlio della section.
4. [ ] Inserire il follower DOM (cerchio flame con icona).
5. [ ] Wrappare il contenuto esistente con `relative z-[5]`.
6. [ ] Nel `useEffect`, dentro `gsap.context()`, nel blocco `mm.add('(min-width: 768px)')`:
   - Aggiungere animazione draw-on del path SVG.
   - Aggiungere animazione MotionPath del follower, con `scrub` sincronizzato al range del pin.
7. [ ] Nel blocco `mm.add('(max-width: 767px)')`:
   - Aggiungere le stesse animazioni con trigger/range adatti al layout mobile.
8. [ ] Verificare che le card flip e lo scroll orizzontale funzionino ancora correttamente.
9. [ ] Testare su mobile: assicurarsi che il path sia visibile e il follower percorra tutto il tracciato.
10. [ ] Eseguire `npm run build` — zero errori.
11. [ ] Visual review su desktop e mobile.

---

## Note di stile

- Il path deve essere **sottile e discreto**: `strokeWidth: 2`, opacità 0.2–0.3, colore `gold`.
- Il follower deve essere **piccolo e riconoscibile**: 40–48px, colore `flame`, bordo `gold`.
- Non aggiungere testo extra o didascalie — è un puro elemento decorativo/cinetico.
- Mantenere la coerenza con il linguaggio visivo del sito: curve morbide, colori caldi, eleganza minimale.
