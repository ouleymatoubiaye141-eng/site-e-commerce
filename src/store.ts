
import type { AppState } from './types';
import { getInitialState } from './data';

const STORAGE_KEY = 'teranga-boutique-v1';

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return getInitialState();
    }

    const parsed = JSON.parse(raw) as Partial<AppState>;
    const base = getInitialState();

    return {
      settings: { ...base.settings, ...(parsed.settings ?? {}) },
      products: parsed.products ?? base.products,
      orders: parsed.orders ?? base.orders,
      notifications: parsed.notifications ?? base.notifications,
      zones: parsed.zones ?? base.zones,
      adminUnlocked: false,
    };
  } catch (error) {
    console.error('Erreur lors du chargement de la boutique :', error);
    return getInitialState();
  }
}

export function saveState(state: AppState): void {
  try {
    const { adminUnlocked, ...rest } = state;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(rest));
  } catch (error) {
    console.error('Erreur lors de la sauvegarde de la boutique :', error);
  }
}

export function resetState(): AppState {
  localStorage.removeItem(STORAGE_KEY);
  return getInitialState();
}
