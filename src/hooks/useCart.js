'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'mopizz-cart-v1';
const CartContext = createContext(null);

const parsePrice = (price) => {
    if (typeof price === 'number') return price;
    const n = parseFloat(String(price).replace(',', '.').replace(/[^\d.]/g, ''));
    return Number.isFinite(n) ? n : 0;
};

const itemKey = (item) => `${item.categoryId}::${item.sectionHeading}::${item.name}`;

export function CartProvider({ children }) {
    const [items, setItems] = useState([]);
    const [hydrated, setHydrated] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) setItems(JSON.parse(raw));
        } catch {}
        setHydrated(true);
    }, []);

    useEffect(() => {
        if (!hydrated) return;
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        } catch {}
    }, [items, hydrated]);

    const add = useCallback((item) => {
        setItems((prev) => {
            const key = itemKey(item);
            const existing = prev.find((it) => itemKey(it) === key);
            if (existing) {
                return prev.map((it) =>
                    itemKey(it) === key ? { ...it, qty: it.qty + 1 } : it
                );
            }
            return [...prev, { ...item, qty: 1 }];
        });
    }, []);

    const decrement = useCallback((item) => {
        setItems((prev) => {
            const key = itemKey(item);
            const existing = prev.find((it) => itemKey(it) === key);
            if (!existing) return prev;
            if (existing.qty <= 1) {
                return prev.filter((it) => itemKey(it) !== key);
            }
            return prev.map((it) =>
                itemKey(it) === key ? { ...it, qty: it.qty - 1 } : it
            );
        });
    }, []);

    const remove = useCallback((item) => {
        setItems((prev) => prev.filter((it) => itemKey(it) !== itemKey(item)));
    }, []);

    const clear = useCallback(() => setItems([]), []);

    const quantityFor = useCallback(
        (item) => items.find((it) => itemKey(it) === itemKey(item))?.qty ?? 0,
        [items]
    );

    const { totalCount, totalPrice } = useMemo(() => {
        let count = 0;
        let price = 0;
        for (const it of items) {
            count += it.qty;
            price += parsePrice(it.price) * it.qty;
        }
        return { totalCount: count, totalPrice: price };
    }, [items]);

    const value = useMemo(
        () => ({
            items,
            add,
            decrement,
            remove,
            clear,
            quantityFor,
            totalCount,
            totalPrice,
            open,
            setOpen,
        }),
        [items, add, decrement, remove, clear, quantityFor, totalCount, totalPrice, open]
    );

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) {
        // Safe no-op fallback so menu items can render before/outside the provider during dev.
        return {
            items: [],
            add: () => {},
            decrement: () => {},
            remove: () => {},
            clear: () => {},
            quantityFor: () => 0,
            totalCount: 0,
            totalPrice: 0,
            open: false,
            setOpen: () => {},
        };
    }
    return ctx;
}
