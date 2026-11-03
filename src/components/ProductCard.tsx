import { Heart, ShoppingBag, Tag } from 'lucide-react';
import type { Product } from '@/types';
import { formatFCFA, classNames } from '@/utils';

interface ProductCardProps {
  product: Product;
  onOpen: (p: Product) => void;
  onQuickAdd: (p: Product) => void;
  isFavorite: boolean;
  onToggleFavorite: (productId: string) => void;
}

export function ProductCard({
  product,
  onOpen,
  onQuickAdd,
  isFavorite,
  onToggleFavorite,
}: ProductCardProps) {
  const hasPromo = product.promoPrice != null && product.promoPrice < product.price;
  const totalStock = Object.values(product.stock).reduce((a, b) => a + b, 0);
  const outOfStock = totalStock <= 0;
  const lowStock = !outOfStock && totalStock <= product.lowStockThreshold;

  return (
    <article className="group flex cursor-pointer flex-col" onClick={() => onOpen(product)}>
      <div className="relative aspect-[3/4] overflow-hidden bg-[#f3f3f1]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className={classNames(
            'h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.035]',
            outOfStock && 'opacity-60',
          )}
        />

        {hasPromo && (
          <span className="absolute left-2 top-2 inline-flex items-center gap-1 bg-white px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider text-[#171717] sm:left-3 sm:top-3">
            <Tag size={11} /> Promo
          </span>
        )}

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onToggleFavorite(product.id);
          }}
          className="absolute right-2 top-2 grid h-9 w-9 place-items-center rounded-full bg-white/95 text-[#171717] shadow-sm transition hover:bg-white sm:right-3 sm:top-3"
          aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          aria-pressed={isFavorite}
        >
          <Heart size={17} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>

        {outOfStock && (
          <span className="absolute bottom-2 left-2 bg-black px-2.5 py-1 text-[9px] uppercase tracking-wider text-white sm:bottom-3 sm:left-3">
            Rupture
          </span>
        )}

        {lowStock && !outOfStock && (
          <span className="absolute bottom-2 left-2 bg-white px-2.5 py-1 text-[9px] uppercase tracking-wider text-black sm:bottom-3 sm:left-3">
            Stock limité
          </span>
        )}

        {!outOfStock && (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onQuickAdd(product);
            }}
            className="absolute bottom-2 right-2 grid h-10 w-10 place-items-center rounded-full bg-white text-black shadow-sm transition hover:bg-black hover:text-white sm:bottom-3 sm:right-3"
            aria-label="Choisir et ajouter au panier"
          >
            <ShoppingBag size={17} />
          </button>
        )}
      </div>

      <div className="flex flex-1 flex-col px-1 py-3 sm:p-4">
        <h3 className="line-clamp-2 font-serif text-base leading-tight text-[#171717] sm:text-lg">
          {product.name}
        </h3>
        <p className="mt-1 line-clamp-2 flex-1 text-[11px] leading-5 text-[#777777] sm:text-xs">
          {product.description}
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          {hasPromo ? (
            <>
              <span className="text-sm font-semibold text-[#171717] sm:text-base">
                {formatFCFA(product.promoPrice!)}
              </span>
              <span className="text-xs text-[#999999] line-through">
                {formatFCFA(product.price)}
              </span>
            </>
          ) : (
            <span className="text-sm font-semibold text-[#171717] sm:text-base">
              {formatFCFA(product.price)}
            </span>
          )}
        </div>

        {product.colors.length > 0 && (
          <div className="mt-2 flex items-center gap-1.5">
            {product.colors.slice(0, 4).map((color) => (
              <span
                key={color.name}
                className="h-3.5 w-3.5 rounded-full border border-[#e6d9d9]"
                style={{ background: color.hex }}
                title={color.name}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-[10px] text-[#98747d]">+{product.colors.length - 4}</span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
