import type { AppState, Category, Product } from './types';
import { getInitialState } from './data';

const STORAGE_KEY = 'teranga-boutique-v1';

function normalizeCategory(value: unknown): Category {
  const category = String(value ?? '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  if (category === 'hommes') return 'hommes';
  if (category === 'beaute') return 'beaute';
  if (category === 'accessoires') return 'accessoires';

  return 'femmes';
}

function normalizeProduct(value: unknown, fallback?: Product): Product {
  const raw = value && typeof value === 'object'
    ? value as Record<string, unknown>
    : {};

  const rawStock = raw.stock;
  let stock: Record<string, number> = {};

  if (typeof rawStock === 'number' && Number.isFinite(rawStock)) {
    stock = { default: Math.max(0, rawStock) };
  } else if (rawStock && typeof rawStock === 'object' && !Array.isArray(rawStock)) {
    for (const [key, quantity] of Object.entries(rawStock)) {
      const number = Number(quantity);
      stock[key] = Number.isFinite(number) ? Math.max(0, number) : 0;
    }
  } else if (fallback) {
    stock = { ...fallback.stock };
  } else {
    stock = { default: 0 };
  }

  const sizes = Array.isArray(raw.sizes)
    ? raw.sizes.filter((item): item is string => typeof item === 'string')
    : fallback?.sizes ?? [];

  const colors = Array.isArray(raw.colors)
    ? raw.colors.filter(
        (item): item is { name: string; hex: string } =>
          !!item &&
          typeof item === 'object' &&
          typeof (item as Record<string, unknown>).name === 'string' &&
          typeof (item as Record<string, unknown>).hex === 'string',
      )
    : fallback?.colors ?? [];

  const price = Number(raw.price);
  const threshold = Number(raw.lowStockThreshold);

  return {
    id: String(raw.id ?? fallback?.id ?? `product-${Date.now()}`),
    name: String(raw.name ?? fallback?.name ?? 'Produit sans nom'),
    category: normalizeCategory(raw.category ?? fallback?.category),
    price: Number.isFinite(price) ? price : fallback?.price ?? 0,
    promoPrice: raw.promoPrice == null ? null : Number(raw.promoPrice),
    description: String(raw.description ?? fallback?.description ?? ''),
    image: String(raw.image ?? fallback?.image ?? ''),
    gallery: Array.isArray(raw.gallery)
      ? raw.gallery.filter((item): item is string => typeof item === 'string')
      : fallback?.gallery ?? [],
    sizes,
    colors,
    stock,
    lowStockThreshold: Number.isFinite(threshold)
      ? Math.max(0, threshold)
      : fallback?.lowStockThreshold ?? 3,
    featured: Boolean(raw.featured),
  };
}

export function loadState(): AppState {
  const base = getInitialState();

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return base;

    const parsed = JSON.parse(raw) as Partial<AppState>;

    const savedProducts = Array.isArray(parsed.products)
      ? parsed.products
      : base.products;

    const fallbackById = new Map(base.products.map((p) => [p.id, p]));

    return {
      settings: { ...base.settings, ...(parsed.settings ?? {}) },
      products: savedProducts.map((product) => {
        const id = product && typeof product === 'object'
          ? (product as Product).id
          : undefined;
        return normalizeProduct(product, id ? fallbackById.get(id) : undefined);
      }),
      orders: Array.isArray(parsed.orders) ? parsed.orders : base.orders,
      notifications: Array.isArray(parsed.notifications)
        ? parsed.notifications
        : base.notifications,
      zones: Array.isArray(parsed.zones) ? parsed.zones : base.zones,
      adminUnlocked: false,
    };
  } catch (error) {
    console.error('Erreur lors du chargement de la boutique :', error);
    return base;
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
