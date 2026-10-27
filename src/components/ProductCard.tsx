import { ShoppingBag, Star, Tag } from 'lucide-react';
import type { Product } from '@/types';
import { formatFCFA, classNames } from '@/utils';

interface ProductCardProps {
  product: Product;
  onOpen: (p: Product) => void;
  onQuickAdd: (p: Product) => void;
}

export function ProductCard({ product, onOpen, onQuickAdd }: ProductCardProps) {
  const hasPromo = product.promoPrice != null && product.promoPrice < product.price;
  const totalStock = Object.values(product.stock).reduce((a, b) => a + b, 0);
  const outOfStock = totalStock <= 0;
  const lowStock = !outOfStock && totalStock <= product.lowStockThreshold;

  return (
    <article
      className="group card overflow-hidden hover:shadow-soft transition-all duration-300 cursor-pointer flex flex-col animate-fade-up"
      onClick={() => onOpen(product)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-cream-200">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className={classNames(
            'w-full h-full object-cover transition-transform duration-500 group-hover:scale-105',
            outOfStock && 'opacity-60',
          )}
        />
        {hasPromo && (
          <span className="absolute top-3 left-3 badge bg-bordeaux-800 text-cream-50 gap-1 shadow-soft">
            <Tag size={11} /> Promo
          </span>
        )}
        {outOfStock && (
          <span className="absolute top-3 right-3 badge bg-bordeaux-950 text-cream-50">Rupture</span>
        )}
        {lowStock && !outOfStock && (
          <span className="absolute top-3 right-3 badge bg-gold-300 text-bordeaux-900">Bientôt épuisé</span>
        )}
        {!outOfStock && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickAdd(product);
            }}
            className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-bordeaux-800 text-cream-50 grid place-items-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all hover:bg-bordeaux-700 shadow-soft"
            aria-label="Ajouter au panier"
          >
            <ShoppingBag size={18} />
          </button>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-1 text-gold-500 mb-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} size={11} fill="currentColor" strokeWidth={0} />
          ))}
          <span className="text-[10px] text-bordeaux-400 ml-1">Nouveau</span>
        </div>
        <h3 className="font-serif text-lg text-bordeaux-900 leading-tight line-clamp-2">{product.name}</h3>
        <p className="text-xs text-bordeaux-500 mt-1 line-clamp-2 flex-1">{product.description}</p>
        <div className="mt-3 flex items-center gap-2">
          {hasPromo ? (
            <>
              <span className="font-semibold text-bordeaux-800">{formatFCFA(product.promoPrice!)}</span>
              <span className="text-sm text-bordeaux-400 line-through">{formatFCFA(product.price)}</span>
            </>
          ) : (
            <span className="font-semibold text-bordeaux-800">{formatFCFA(product.price)}</span>
          )}
        </div>
        <div className="mt-2 flex items-center gap-1">
          {product.colors.slice(0, 4).map((c) => (
            <span
              key={c.name}
              className="w-4 h-4 rounded-full border border-cream-300"
              style={{ background: c.hex }}
              title={c.name}
            />
          ))}
          {product.colors.length > 4 && (
            <span className="text-[10px] text-bordeaux-400">+{product.colors.length - 4}</span>
          )}
        </div>
      </div>
    </article>
  );
}
