// ═══════════════════════════════════════════════════════
// menuFissoData.js — Dati Menu Fisso Pranzo
// ═══════════════════════════════════════════════════════

export const MENU_FISSO_CONFIG = {
  disponibilita: 'Da martedì a venerdì, solo a pranzo',
  sempreIncluso: 'Acqua, servizio e caffè',
  escluso: 'Vino, birra, amari e dolci',
};

export const menuFissoFormule = [
  {
    id: 'primo-contorno',
    nome: 'Primo e Contorno',
    prezzo: 9,
    piatti: ['Un primo a scelta', 'Un contorno a scelta'],
    badge: null,
    featured: false,
  },
  {
    id: 'completo',
    nome: 'Menu Completo',
    prezzo: 13,
    piatti: ['Un primo a scelta', 'Un secondo a scelta', 'Un contorno a scelta'],
    badge: 'Popolare',
    featured: true,
  },
  {
    id: 'secondo-contorno',
    nome: 'Secondo e Contorno',
    prezzo: 11,
    piatti: ['Un secondo a scelta', 'Un contorno a scelta'],
    badge: null,
    featured: false,
  },
];
