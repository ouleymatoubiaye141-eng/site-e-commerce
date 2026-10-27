import { useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import type { Product } from '@/types';
import { CATEGORY_LABELS, formatFCFA, classNames } from '@/utils';

export interface Filters {
  category: string | 'all' | 'promo';
  maxPrice: number;
  inStockOnly: boolean;
  sort: 'featured' | 'price-asc' | 'price-desc' | 'newest';
  search: string;
}

export const defaultFilters: Filters = {
  category: 'all',
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

export function FiltersBar({ filters, setFilters, products, resultCount }: FiltersBarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const categories: { key: string; label: string }[] = [
    { key: 'all', label: 'Tout' },
    { key: 'femmes', label: CATEGORY_LABELS.femmes },
    { key: 'hommes', label: CATEGORY_LABELS.hommes },
    { key: 'beaute', label: CATEGORY_LABELS.beaute },
    { key: 'accessoires', label: CATEGORY_LABELS.accessoires },
    { key: 'promo', label: 'Promos' },
  ];

  const body = (
    <div className="space-y-5">
      {/* Categories */}
      <div>
        <p className="label">Catégorie</p>
        <div className="flex lg:flex-wrap gap-2 overflow-x-auto no-scrollbar pb-1">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => setFilters({ ...filters, category: c.key })}
              className={classNames(
                'px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition',
                filters.category === c.key
                  ? 'bg-bordeaux-800 text-cream-50'
                  : 'bg-cream-100 text-bordeaux-700 hover:bg-cream-200',
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {/* Price */}
        <div>
          <p className="label">Prix max: {formatFCFA(filters.maxPrice)}</p>
          <input
            type="range"
            min={5000}
            max={100000}
            step={2500}
            value={filters.maxPrice}
            onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
            className="w-full accent-bordeaux-800"
          />
        </div>
        {/* Sort */}
        <div>
          <p className="label">Trier par</p>
          <select
            value={filters.sort}
            onChange={(e) => setFilters({ ...filters, sort: e.target.value as Filters['sort'] })}
            className="input"
          >
            <option value="featured">Mis en avant</option>
            <option value="price-asc">Prix croissant</option>
            <option value="price-desc">Prix décroissant</option>
            <option value="newest">Nouveautés</option>
          </select>
        </div>
      </div>

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={filters.inStockOnly}
          onChange={(e) => setFilters({ ...filters, inStockOnly: e.target.checked })}
          className="w-4 h-4 accent-bordeaux-800"
        />
        <span className="text-sm text-bordeaux-800">Disponible uniquement</span>
      </label>
    </div>
  );

  return (
    <div className="mb-6">
      <div className="hidden lg:block card p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif text-lg text-bordeaux-900 flex items-center gap-2">
            <SlidersHorizontal size={16} /> Filtres
          </h3>
          <span className="text-xs text-bordeaux-500">{resultCount} produit(s)</span>
        </div>
        {body}
      </div>

      <div className="lg:hidden flex items-center justify-between mb-3">
        <span className="text-xs text-bordeaux-500">{resultCount} produit(s)</span>
        <button onClick={() => setMobileOpen(true)} className="btn-outline text-xs px-4 py-2">
          <SlidersHorizontal size={14} /> Filtres
        </button>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-bordeaux-950/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-cream-50 rounded-t-3xl p-5 max-h-[85vh] overflow-y-auto animate-fade-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-xl text-bordeaux-900">Filtres</h3>
              <button onClick={() => setMobileOpen(false)} className="p-2"><X size={20} /></button>
            </div>
            {body}
            <button onClick={() => setMobileOpen(false)} className="btn-primary w-full mt-5">
              Voir {resultCount} produit(s)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
