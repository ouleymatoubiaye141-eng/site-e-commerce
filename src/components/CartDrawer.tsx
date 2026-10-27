import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useShop } from '@/ShopContext';
import { Drawer } from './Drawer';
import { formatFCFA } from '@/utils';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export function CartDrawer({ open, onClose, onCheckout }: CartDrawerProps) {
  const { cart, updateCartQty, removeFromCart, cartSubtotal, state } = useShop();

  const freeThreshold = state.settings.freeDeliveryThreshold;
  const remaining = freeThreshold > 0 ? freeThreshold - cartSubtotal : 0;
  const progress = freeThreshold > 0 ? Math.min(100, (cartSubtotal / freeThreshold) * 100) : 0;

  return (
    <Drawer open={open} onClose={onClose} title={`Panier (${cart.reduce((s, i) => s + i.qty, 0)})`}>
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full py-20 text-center px-6">
          <div className="w-20 h-20 rounded-full bg-cream-200 grid place-items-center mb-4">
            <ShoppingBag size={32} className="text-bordeaux-400" />
          </div>
          <p className="text-bordeaux-700 font-medium">Votre panier est vide</p>
          <p className="text-sm text-bordeaux-500 mt-1">Ajoutez des articles pour continuer.</p>
          <button onClick={onClose} className="btn-primary mt-6">Continuer mes achats</button>
        </div>
      ) : (
        <div className="flex flex-col h-full">
          <div className="flex-1 p-5 space-y-4">
            {freeThreshold > 0 && remaining > 0 && (
              <div className="rounded-xl bg-gold-100 border border-gold-200 p-3 text-sm text-bordeaux-800">
                Plus que <strong>{formatFCFA(remaining)}</strong> pour la livraison gratuite !
                <div className="mt-2 h-2 rounded-full bg-cream-200 overflow-hidden">
                  <div className="h-full bg-gold-400 transition-all" style={{ width: `${progress}%` }} />
                </div>
              </div>
            )}
            {freeThreshold > 0 && remaining <= 0 && (
              <div className="rounded-xl bg-emerald-100 border border-emerald-200 p-3 text-sm text-emerald-800">
                Livraison gratuite débloquée !
              </div>
            )}

            {cart.map((item) => (
              <div key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-3">
                <img src={item.image} alt={item.name} className="w-20 h-24 object-cover rounded-xl" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-serif text-bordeaux-900 text-sm leading-tight line-clamp-2">{item.name}</h4>
                  <p className="text-xs text-bordeaux-500 mt-0.5">
                    {item.size !== 'Unique' && item.size !== 'Coffret' && `T. ${item.size} · `}
                    {item.color}
                  </p>
                  <p className="text-sm font-semibold text-bordeaux-800 mt-1">{formatFCFA(item.price * item.qty)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center border border-cream-300 rounded-lg overflow-hidden">
                      <button
                        onClick={() => updateCartQty(item.productId, item.size, item.color, item.qty - 1)}
                        className="px-2 py-1 hover:bg-cream-200"
                        aria-label="Diminuer"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="px-2 text-sm min-w-[2rem] text-center">{item.qty}</span>
                      <button
                        onClick={() => updateCartQty(item.productId, item.size, item.color, item.qty + 1)}
                        className="px-2 py-1 hover:bg-cream-200"
                        aria-label="Augmenter"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.productId, item.size, item.color)}
                      className="text-bordeaux-400 hover:text-bordeaux-600"
                      aria-label="Supprimer"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-cream-200 p-5 space-y-3 bg-cream-100">
            <div className="flex items-center justify-between text-sm">
              <span className="text-bordeaux-600">Sous-total</span>
              <span className="font-semibold text-bordeaux-900">{formatFCFA(cartSubtotal)}</span>
            </div>
            <p className="text-xs text-bordeaux-500">
              Frais de livraison calculés à l'étape suivante. Paiement Wave, Orange Money, Free Money ou à la livraison.
            </p>
            <button onClick={onCheckout} className="btn-primary w-full">
              Passer commande <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </Drawer>
  );
}
