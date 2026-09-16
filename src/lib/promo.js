// Helpers per le promo settimanali. Il giorno è sempre quello di Legnano
// (Europe/Rome), non quello del dispositivo del visitatore.

const WEEKDAYS = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

export function romeWeekday(date = new Date()) {
    const short = new Intl.DateTimeFormat('en-US', { timeZone: 'Europe/Rome', weekday: 'short' }).format(date);
    return WEEKDAYS[short];
}

// YYYY-MM-DD a Roma — chiave per ricordare che il popup di oggi è già stato visto.
export function romeDateKey(date = new Date()) {
    return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Rome' }).format(date);
}

export function promoForToday(items, date = new Date()) {
    const day = romeWeekday(date);
    return items.find((item) => item.weekday === day) ?? null;
}
