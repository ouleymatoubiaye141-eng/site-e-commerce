
import { useState } from 'react';
import { SlidersHorizontal, X, RotateCcw } from 'lucide-react';
import type { Product } from '@/types';
import { CATEGORY_LABELS, formatFCFA, classNames } from '@/utils';

export interface Filters {
  category: string | 'all' | 'promo';
  minPrice: number;
  maxPrice: number;
  inStockOnly: boolean;
  sort: 'featured' | 'price-asc' | 'price-desc' | 'newest';
  search: string;
}

export const defaultFilters: Filters = {
  category: 'all',
  minPrice: 0,
  maxPrice: 100000,
  inStockOnly: false,
  sort: 'featured',
  search: '',
};

interface FiltersBarProps {
  filters: Filters;
  setFilters: (f: Filters) => void;
  products: Product[];
  resultCount: number;
}

export function FiltersBar({
  filters,
  setFilters,
  products,
  resultCount,
}: FiltersBarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const categories = [
    { key: 'all', label: 'Tout voir' },
    { key: 'femmes', label: CATEGORY_LABELS.femmes },
    { key: 'hommes', label: CATEGORY_LABELS.hommes },
    { key: 'beaute', label: CATEGORY_LABELS.beaute },
    { key: 'accessoires', label: CATEGORY_LABELS.accessoires },
    { key: 'promo', label: 'Promotions' },
  ];

  const stockCount = (product: Product) =>
    Object.values(product.stock).reduce(
      (total, quantity) => total + quantity,
      0,
    );

  const categoryCount = (key: string) =>
    products.filter((product) => {
      if (key === 'all') return true;

      if (key === 'promo') {
        return (
          product.promoPrice != null &&
          product.promoPrice < product.price
        );
      }

      return product.category === key;
    }).length;

  const update = (changes: Partial<Filters>) => {
    setFilters({ ...filters, ...changes });
  };

  const reset = () => {
    setFilters({ ...defaultFilters });
  };

  const body = (
    <div className="space-y-6">
      <div>
        <div className="mb-3 flex items-center justify-between">
          <p className="label">Catégorie</p>
          <span className="text-xs text-bordeaux-500">
            {categories.length - 1} catégories
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const active = filters.category === category.key;

            return (
              <button
                key={category.key}
                type="button"
                onClick={() => update({ category: category.key })}
                aria-pressed={active}
                className={classNames(
                  'rounded-full border px-3 py-2 text-xs font-medium transition',
                  active
                    ? 'border-bordeaux-800 bg-bordeaux-800 text-cream-50'
                    : 'border-cream-300 bg-cream-50 text-bordeaux-700 hover:border-bordeaux-500',
                )}
              >
                {category.label}
                <span className="ml-1 opacity-70">
                  ({categoryCount(category.key)})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="label mb-3">Budget en FCFA</p>

        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="mb-1 block text-xs text-bordeaux-500">
              Prix minimum
            </span>
            <input
              type="number"
              min={0}
              max={filters.maxPrice}
              step={500}
              value={filters.minPrice}
              onChange={(event) => {
                const value = Math.max(0, Number(event.target.value) || 0);
                update({
                  minPrice: Math.min(value, filters.maxPrice),
                });
              }}
              className="input w-full"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-xs text-bordeaux-500">
              Prix maximum
            </span>
            <input
              type="number"
              min={filters.minPrice}
              max={100000}
              step={500}
              value={filters.maxPrice}
              onChange={(event) => {
                const value = Math.max(
                  filters.minPrice,
                  Math.min(100000, Number(event.target.value) || 0),
                );
                update({ maxPrice: value });
              }}
              className="input w-full"
            />
          </label>
        </div>

        <div className="mt-2 flex items-center justify-between text-xs text-bordeaux-600">
          <span>{formatFCFA(filters.minPrice)}</span>
          <span>{formatFCFA(filters.maxPrice)}</span>
        </div>
      </div>

      <div>
        <p className="label mb-2">Trier les articles</p>
        <select
          value={filters.sort}
          onChange={(event) =>
            update({ sort: event.target.value as Filters['sort'] })
          }
          className="input w-full"
        >
          <option value="featured">Produits mis en avant</option>
          <option value="newest">Nouveautés</option>
          <option value="price-asc">Prix : du moins cher au plus cher</option>
          <option value="price-desc">Prix : du plus cher au moins cher</option>
        </select>
      </div>

      <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-cream-200 p-3">
        <input
          type="checkbox"
          checked={filters.inStockOnly}
          onChange={(event) =>
            update({ inStockOnly: event.target.checked })
          }
          className="h-4 w-4 accent-bordeaux-800"
        />
        <span className="flex-1 text-sm text-bordeaux-800">
          Articles disponibles uniquement
        </span>
      </label>

      <button
        type="button"
        onClick={reset}
        className="flex items-center gap-2 text-sm text-bordeaux-700 underline underline-offset-4 hover:text-bordeaux-950"
      >
        <RotateCcw size={14} />
        Réinitialiser les filtres
      </button>
    </div>
  );

  return (
    <div>
      <div className="hidden lg:block">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="flex items-center gap-2 font-serif text-lg text-bordeaux-900">
            <SlidersHorizontal size={18} />
            Affiner la sélection
          </h3>
          <span className="text-xs text-bordeaux-500">
            {resultCount} résultat(s)
          </span>
        </div>
        {body}
      </div>

      <div className="flex items-center justify-between lg:hidden">
        <span className="text-sm text-bordeaux-700">
          {resultCount} article(s)
        </span>
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="btn-outline px-4 py-2 text-xs"
        >
          <SlidersHorizontal size={14} />
          Filtrer et trier
        </button>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Fermer les filtres"
            className="absolute inset-0 h-full w-full bg-bordeaux-950/50"
            onClick={() => setMobileOpen(false)}
          />

          <div className="absolute inset-x-0 bottom-0 max-h-[90vh] overflow-y-auto rounded-t-3xl bg-cream-50 p-5 animate-fade-up">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-serif text-xl text-bordeaux-900">
                Filtrer les articles
              </h3>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="rounded-full p-2 hover:bg-cream-200"
                aria-label="Fermer"
              >
                <X size={20} />
              </button>
            </div>

            {body}

            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="btn-primary mt-6 w-full"
            >
              Voir les {resultCount} résultats
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
