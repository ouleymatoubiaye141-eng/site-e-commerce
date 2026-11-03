
import { useEffect, useMemo, useState } from 'react';
import type { Product } from '@/types';
import { useShop } from '@/ShopContext';
import { ProductCard } from './ProductCard';
import { FiltersBar, defaultFilters, type Filters } from './FiltersBar';
import { ProductModal } from './ProductModal';

interface CatalogProps {
  initialFilters?: Partial<Filters>;
  favoriteIds: string[];
  onToggleFavorite: (productId: string) => void;
  favoritesOnly?: boolean;
}

const PRODUCTS_PER_PAGE = 12;

export function Catalog({
  initialFilters,
  favoriteIds,
  onToggleFavorite,
  favoritesOnly = false,
}: CatalogProps) {
  const { state } = useShop();

  const [filters, setFilters] = useState<Filters>({
    ...defaultFilters,
    ...initialFilters,
  });

  const [selected, setSelected] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setFilters((previous) => ({
      ...previous,
      category: initialFilters?.category ?? previous.category,
      search: initialFilters?.search ?? previous.search,
    }));
  }, [initialFilters?.category, initialFilters?.search]);

  // Revenir à la première page quand les filtres changent.
  useEffect(() => {
    setCurrentPage(1);
  }, [
    filters.category,
    filters.search,
    filters.minPrice,
    filters.maxPrice,
    filters.inStockOnly,
    filters.sort,
  ]);

  const filtered = useMemo(() => {
    let list = [...state.products];

    if (favoritesOnly) {
      list = list.filter((product) => favoriteIds.includes(product.id));
    }

    if (filters.category === 'promo') {
      list = list.filter(
        (product) =>
          product.promoPrice != null &&
          product.promoPrice < product.price,
      );
    } else if (filters.category !== 'all') {
      list = list.filter(
        (product) => product.category === filters.category,
      );
    }

    const query = filters.search.trim().toLowerCase();

    if (query) {
      list = list.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query),
      );
    }

    list = list.filter((product) => {
      const price = product.promoPrice ?? product.price;
      return price >= filters.minPrice && price <= filters.maxPrice;
    });

    if (filters.inStockOnly) {
      list = list.filter(
        (product) =>
          Object.values(product.stock).reduce(
            (total, quantity) => total + quantity,
            0,
          ) > 0,
      );
    }

    switch (filters.sort) {
      case 'price-asc':
        list.sort(
          (a, b) =>
            (a.promoPrice ?? a.price) -
            (b.promoPrice ?? b.price),
        );
        break;

      case 'price-desc':
        list.sort(
          (a, b) =>
            (b.promoPrice ?? b.price) -
            (a.promoPrice ?? a.price),
        );
        break;

      case 'newest':
        // Sans date de création, on utilise l'ordre inverse des produits.
        list.reverse();
        break;

      case 'featured':
      default:
        list.sort(
          (a, b) =>
            Number(Boolean(b.featured)) -
            Number(Boolean(a.featured)),
        );
        break;
    }

    return list;
  }, [state.products, filters, favoriteIds, favoritesOnly]);

  const totalPages = Math.ceil(filtered.length / PRODUCTS_PER_PAGE);
  const safePage = Math.min(currentPage, Math.max(1, totalPages));

  const visibleProducts = useMemo(() => {
    const start = (safePage - 1) * PRODUCTS_PER_PAGE;
    return filtered.slice(start, start + PRODUCTS_PER_PAGE);
  }, [filtered, safePage]);

  const quickCategories = [
    { label: 'Tout voir', value: 'all' },
    { label: 'Nouveautés', value: 'newest' },
    { label: 'Promotions', value: 'promo' },
  ] as const;

  const selectQuickCategory = (
    value: (typeof quickCategories)[number]['value'],
  ) => {
    setCurrentPage(1);

    if (value === 'newest') {
      setFilters((previous) => ({
        ...previous,
        category: 'all',
        sort: 'newest',
      }));
      return;
    }

    setFilters((previous) => ({
      ...previous,
      category: value,
      sort: 'featured',
    }));
  };

  const activeQuickCategory = () => {
    if (filters.category === 'promo') return 'promo';

    if (filters.category === 'all' && filters.sort === 'newest') {
      return 'newest';
    }

    if (filters.category === 'all') return 'all';

    return '';
  };

  const resetFilters = () => {
    setFilters({
      ...defaultFilters,
      category: initialFilters?.category ?? 'all',
      search: initialFilters?.search ?? '',
    });
    setCurrentPage(1);
  };

  const hasActiveFilters =
    filters.search.trim() !== '' ||
    filters.category !== 'all' ||
    filters.inStockOnly ||
    filters.minPrice !== defaultFilters.minPrice ||
    filters.maxPrice !== defaultFilters.maxPrice ||
    filters.sort !== defaultFilters.sort;

  const firstResult =
    filtered.length === 0 ? 0 : (safePage - 1) * PRODUCTS_PER_PAGE + 1;

  const lastResult = Math.min(
    safePage * PRODUCTS_PER_PAGE,
    filtered.length,
  );

  return (
    <section id="catalogue" className="bg-white py-8 md:py-14">
      <div className="container-page">
        <div className="mb-6 text-left md:mb-9">
          <div className="mb-2 flex items-center gap-3">
            <span className="h-px w-8 bg-bordeaux-400" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-bordeaux-700">
              BIWALI Couture&Beauty
            </span>
            <span className="h-px w-8 bg-bordeaux-400" />
          </div>

          <h2 className="font-serif text-2xl text-[#171717] sm:text-3xl">
            {favoritesOnly ? 'Mes favoris' : 'À découvrir'}
          </h2>

          
        </div>

        <div className="mb-5 flex gap-2 overflow-x-auto pb-2 md:mb-7">
          {quickCategories.map((item) => {
            const active = activeQuickCategory() === item.value;

            return (
              <button
                key={item.value}
                type="button"
                onClick={() => selectQuickCategory(item.value)}
                aria-pressed={active}
                className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? 'border-bordeaux-800 bg-bordeaux-800 text-white'
                    : 'border-cream-300 bg-white text-bordeaux-800 hover:border-bordeaux-600 hover:bg-cream-100'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="mb-5 border-y border-black/5 bg-white py-3 md:mb-7">
          <FiltersBar
            filters={filters}
            setFilters={setFilters}
            products={state.products}
            resultCount={filtered.length}
          />
        </div>

        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-bordeaux-700">
            Affichage de{' '}
            <span className="font-semibold text-bordeaux-900">
              {firstResult}–{lastResult}
            </span>{' '}
            sur{' '}
            <span className="font-semibold text-bordeaux-900">
              {filtered.length}
            </span>{' '}
            article(s)
          </p>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-sm font-medium text-bordeaux-700 underline underline-offset-4 hover:text-bordeaux-950"
            >
              Effacer les filtres
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-cream-200 bg-white px-5 py-16 text-center md:py-20">
            <div className="mb-4 text-4xl text-bordeaux-400" aria-hidden="true">
              ♡
            </div>

            <h3 className="text-lg font-semibold text-bordeaux-900">
              {favoritesOnly
                ? 'Aucun favori pour le moment'
                : 'Aucun article trouvé'}
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-bordeaux-600">
              {favoritesOnly
                ? 'Ajoutez des articles à vos favoris en touchant le cœur sur leur fiche.'
                : 'Essayez une autre catégorie ou modifiez votre budget pour découvrir nos articles.'}
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="btn-outline mt-5"
            >
              Voir toute la collection
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-x-2 gap-y-7 sm:grid-cols-3 sm:gap-x-5 sm:gap-y-9 lg:grid-cols-4 lg:gap-x-7">
              {visibleProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOpen={setSelected}
                  onQuickAdd={setSelected}
                  isFavorite={favoriteIds.includes(product.id)}
                  onToggleFavorite={onToggleFavorite}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <nav
                className="mt-10 flex flex-wrap items-center justify-center gap-2"
                aria-label="Pagination du catalogue"
              >
                <button
                  type="button"
                  disabled={safePage === 1}
                  onClick={() => {
                    setCurrentPage((page) => Math.max(1, page - 1));
                    document.getElementById('catalogue')?.scrollIntoView({
                      behavior: 'smooth',
                    });
                  }}
                  className="rounded-full border border-cream-300 px-4 py-2 text-sm text-bordeaux-800 transition hover:bg-cream-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Précédent
                </button>

                {Array.from({ length: totalPages }, (_, index) => index + 1)
                  .filter(
                    (page) =>
                      page === 1 ||
                      page === totalPages ||
                      Math.abs(page - safePage) <= 1,
                  )
                  .reduce<(number | 'dots')[]>((pages, page, index, all) => {
                    if (index > 0 && page - all[index - 1] > 1) {
                      pages.push('dots');
                    }
                    pages.push(page);
                    return pages;
                  }, [])
                  .map((page, index) =>
                    page === 'dots' ? (
                      <span key={`dots-${index}`} className="px-1 text-bordeaux-500">
                        …
                      </span>
                    ) : (
                      <button
                        key={page}
                        type="button"
                        aria-current={safePage === page ? 'page' : undefined}
                        onClick={() => {
                          setCurrentPage(page);
                          document.getElementById('catalogue')?.scrollIntoView({
                            behavior: 'smooth',
                          });
                        }}
                        className={`h-10 min-w-10 rounded-full border px-3 text-sm transition ${
                          safePage === page
                            ? 'border-bordeaux-800 bg-bordeaux-800 text-white'
                            : 'border-cream-300 text-bordeaux-800 hover:bg-cream-100'
                        }`}
                      >
                        {page}
                      </button>
                    ),
                  )}

                <button
                  type="button"
                  disabled={safePage === totalPages}
                  onClick={() => {
                    setCurrentPage((page) => Math.min(totalPages, page + 1));
                    document.getElementById('catalogue')?.scrollIntoView({
                      behavior: 'smooth',
                    });
                  }}
                  className="rounded-full border border-cream-300 px-4 py-2 text-sm text-bordeaux-800 transition hover:bg-cream-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Suivant
                </button>
              </nav>
            )}
          </>
        )}

        <div className="mt-12 border-t border-cream-300 pt-7 text-center md:mt-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-bordeaux-700">
            BIWALI Couture&Beauty
          </p>
          <p className="mt-2 text-sm text-bordeaux-600">
            L'authenticité africaine, une touche de modernité.
          </p>
        </div>
      </div>

      {selected && (
        <ProductModal
          product={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}
