import type { AppState } from './types';
import { getInitialState } from './data';

const STORAGE_KEY = 'teranga-boutique-v1';

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getInitialState();
    const parsed = JSON.parse(raw) as Partial<AppState>;
    const base = getInitialState();
    // Merge with defaults so new fields exist if missing
    return {
      settings: { ...base.settings, ...(parsed.settings ?? {}) },
      products: parsed.products ?? base.products,
      orders: parsed.orders ?? base.orders,
      notifications: parsed.notifications ?? base.notifications,
      zones: parsed.zones ?? base.zones,
      adminUnlocked: false,
    };
  } catch {
    return getInitialState();
  }
}

export function saveState(state: AppState): void {
  try {
    // Never persist the admin-unlocked flag; force re-auth each session
    const { adminUnlocked, ...rest } = state;
    void adminUnlocked;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rest));
  } catch {
    // ignore quota errors
  }
}

export function resetState(): AppState {
  localStorage.removeItem(STORAGE_KEY);
  return getInitialState();
}
