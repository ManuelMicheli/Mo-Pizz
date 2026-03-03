import { useState, useEffect } from 'react';
import { menuCategories as staticMenu } from '../data/menuData';

/**
 * Fetches menu data from the Plateform-connected API.
 * Initializes with the static menuData.js so the page renders instantly,
 * then updates with fresh data from /api/menu when available.
 *
 * Falls back to static data if the API is unreachable.
 */
export function useMenu() {
  const [menuCategories, setMenuCategories] = useState(staticMenu);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchMenu() {
      try {
        const res = await fetch('/api/menu');
        if (!res.ok) throw new Error(`API returned ${res.status}`);
        const data = await res.json();

        if (!cancelled && data.menuCategories?.length) {
          setMenuCategories(data.menuCategories);
        }
      } catch (err) {
        // Keep static data on error — site still works
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchMenu();
    return () => { cancelled = true; };
  }, []);

  return { menuCategories, loading, error };
}
