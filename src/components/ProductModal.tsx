import { useEffect, useState } from 'react';
import { X, ShoppingBag, Check, Minus, Plus, AlertCircle } from 'lucide-react';
import type { Product } from '@/types';
import { useShop } from '@/ShopContext';
import { formatFCFA, classNames, CATEGORY_LABELS } from '@/utils';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const { addToCart, productStock } = useShop();
  const [size, setSize] = useState(product.sizes[0] ?? '');
  const [color, setColor] = useState(product.colors[0]?.name ?? '');
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const gallery = product.gallery?.length ? product.gallery : [product.image];
  const hasPromo = product.promoPrice != null && product.promoPrice < product.price;
  const stock = productStock(product, size, color);
  const totalStock = Object.values(product.stock).reduce((a, b) => a + b, 0);
  const outOfStock = totalStock <= 0 || stock <= 0;

  const handleAdd = () => {
    if (outOfStock) return;
    if (addToCart(product, size, color, qty)) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-bordeaux-950/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-cream-50 w-full sm:max-w-5xl sm:rounded-3xl shadow-soft max-h-screen sm:max-h-[90vh] overflow-y-auto animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-cream-50/90 grid place-items-center text-bordeaux-800 hover:bg-cream-200 transition shadow-soft"
          aria-label="Fermer"
        >
          <X size={20} />
        </button>
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image gallery */}
          <div className="bg-cream-200 relative">
            <img
              src={gallery[activeImg]}
              alt={product.name}
              className="w-full h-72 md:h-full object-cover"
            />
            {hasPromo && (
              <span className="absolute top-4 left-4 badge bg-bordeaux-800 text-cream-50">Promo</span>
            )}
            {outOfStock && (
              <span className="absolute bottom-4 left-4 badge bg-bordeaux-950 text-cream-50">Rupture de stock</span>
            )}
            {gallery.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {gallery.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={classNames(
                      'w-2.5 h-2.5 rounded-full transition',
                      i === activeImg ? 'bg-gold-400 scale-110' : 'bg-cream-50/70',
                    )}
                    aria-label={`Image ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="p-6 md:p-8 flex flex-col">
            <span className="text-xs uppercase tracking-widest text-gold-700 mb-2">
              {CATEGORY_LABELS[product.category]}
            </span>
            <h2 className="font-serif text-2xl md:text-3xl text-bordeaux-900">{product.name}</h2>
            <div className="mt-3 flex items-center gap-3">
              {hasPromo ? (
                <>
                  <span className="text-2xl font-semibold text-bordeaux-800">{formatFCFA(product.promoPrice!)}</span>
                  <span className="text-lg text-bordeaux-400 line-through">{formatFCFA(product.price)}</span>
                </>
              ) : (
                <span className="text-2xl font-semibold text-bordeaux-800">{formatFCFA(product.price)}</span>
              )}
            </div>
            <p className="mt-4 text-bordeaux-700 leading-relaxed text-sm">{product.description}</p>

            {/* Sizes */}
            {product.sizes.length > 1 && (
              <div className="mt-5">
                <p className="label">Taille</p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={classNames(
                        'min-w-[44px] px-3 h-10 rounded-xl text-sm font-medium border transition',
                        size === s
                          ? 'bg-bordeaux-800 text-cream-50 border-bordeaux-800'
                          : 'bg-cream-50 text-bordeaux-800 border-cream-300 hover:border-bordeaux-400',
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Colors */}
            {product.colors.length > 1 && (
              <div className="mt-5">
                <p className="label">Couleur: {color}</p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setColor(c.name)}
                      className={classNames(
                        'w-10 h-10 rounded-full border-2 transition flex items-center justify-center',
                        color === c.name ? 'border-gold-500' : 'border-cream-300 hover:border-bordeaux-400',
                      )}
                      style={{ background: c.hex }}
                      aria-label={c.name}
                      title={c.name}
                    >
                      {color === c.name && (
                        <Check size={16} className={c.name === 'Or' || c.name === 'Crème' ? 'text-bordeaux-900' : 'text-white'} strokeWidth={3} />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Stock status */}
            <div className="mt-5">
              {outOfStock ? (
                <p className="flex items-center gap-2 text-sm text-bordeaux-600">
                  <AlertCircle size={16} /> Rupture de stock pour cette variante.
                </p>
              ) : stock <= product.lowStockThreshold ? (
                <p className="flex items-center gap-2 text-sm text-gold-700">
                  <AlertCircle size={16} /> Plus que {stock} en stock — commandez vite !
                </p>
              ) : (
                <p className="flex items-center gap-2 text-sm text-emerald-700">
                  <Check size={16} /> En stock ({stock} disponibles)
                </p>
              )}
            </div>

            {/* Quantity + Add */}
            <div className="mt-5 flex items-center gap-3">
              <div className="flex items-center border border-cream-300 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="px-3 py-2.5 hover:bg-cream-200 transition disabled:opacity-40"
                  disabled={outOfStock}
                  aria-label="Diminuer"
                >
                  <Minus size={16} />
                </button>
                <span className="px-4 py-2.5 font-medium min-w-[3rem] text-center">{qty}</span>
                <button
                  onClick={() => setQty((q) => Math.min(stock || 99, q + 1))}
                  className="px-3 py-2.5 hover:bg-cream-200 transition disabled:opacity-40"
                  disabled={outOfStock}
                  aria-label="Augmenter"
                >
                  <Plus size={16} />
                </button>
              </div>
              <button onClick={handleAdd} disabled={outOfStock} className="btn-primary flex-1">
                <ShoppingBag size={16} /> {outOfStock ? 'Indisponible' : 'Ajouter au panier'}
              </button>
            </div>

            <p className="mt-4 text-xs text-bordeaux-400">
              Emplacement photo/vidéo réservé. Vous pourrez remplacer les images depuis l'interface d'administration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
