import { menuCategories as staticMenu } from '../data/menuData';

/**
 * Returns menu data from the static menuData.js.
 * Previously attempted to fetch from /api/menu, but no API exists.
 */
export function useMenu() {
  return { menuCategories: staticMenu, loading: false, error: null };
}
