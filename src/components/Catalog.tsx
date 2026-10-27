import { useMemo, useState } from 'react';
import type { Product } from '@/types';
import { useShop } from '@/ShopContext';
import { ProductCard } from './ProductCard';
import { FiltersBar, defaultFilters, type Filters } from './FiltersBar';
import { ProductModal } from './ProductModal';

interface CatalogProps {
  initialFilters?: Partial<Filters>;
}

export function Catalog({ initialFilters }: CatalogProps) {
  const { state } = useShop();
  const [filters, setFilters] = useState<Filters>({ ...defaultFilters, ...initialFilters });
  const [selected, setSelected] = useState<Product | null>(null);

  const filtered = useMemo(() => {
    let list = [...state.products];
    const cat = filters.category;
    if (cat === 'promo') {
      list = list.filter((p) => p.promoPrice != null && p.promoPrice < p.price);
    } else if (cat !== 'all') {
      list = list.filter((p) => p.category === cat);
    }
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q),
      );
    }
    list = list.filter((p) => (p.promoPrice ?? p.price) <= filters.maxPrice);
    if (filters.inStockOnly) {
      list = list.filter((p) => Object.values(p.stock).reduce((a, b) => a + b, 0) > 0);
    }
    switch (filters.sort) {
      case 'price-asc':
        list.sort((a, b) => (a.promoPrice ?? a.price) - (b.promoPrice ?? b.price));
        break;
      case 'price-desc':
        list.sort((a, b) => (b.promoPrice ?? b.price) - (a.promoPrice ?? a.price));
        break;
      case 'newest':
        list.reverse();
        break;
      default:
        list.sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    }
    return list;
  }, [state.products, filters]);

  return (
    <section id="catalogue" className="py-12 md:py-16">
      <div className="container-page">
        <div className="text-center mb-8">
          <h2 className="section-title">Notre Collection</h2>
          <p className="mt-2 text-bordeaux-600 max-w-2xl mx-auto">
            Découvrez nos pièces uniques — bazin, wax, soins de beauté. Chaque article est sélectionné avec soin.
          </p>
        </div>
        <FiltersBar filters={filters} setFilters={setFilters} products={state.products} resultCount={filtered.length} />
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-bordeaux-500">Aucun produit ne correspond à vos filtres.</p>
            <button onClick={() => setFilters(defaultFilters)} className="btn-outline mt-4">
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filtered.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onOpen={setSelected}
                onQuickAdd={(prod) => setSelected(prod)}
              />
            ))}
          </div>
        )}
      </div>
      {selected && <ProductModal product={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
