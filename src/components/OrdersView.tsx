import { useState } from 'react';
import { Search, Package, Check, Truck, Clock, X } from 'lucide-react';
import { useShop } from '@/ShopContext';
import { formatFCFA, PAYMENT_LABELS, STATUS_LABELS, STATUS_COLORS, classNames, timeAgo } from '@/utils';

export function OrdersView() {
  const { state, confirmDelivery, toast } = useShop();
  const [phone, setPhone] = useState('');
  const [searched, setSearched] = useState(false);
  const [foundOrders, setFoundOrders] = useState(state.orders);

  const search = () => {
    setSearched(true);
    const q = phone.trim().toLowerCase();
    setFoundOrders(
      q ? state.orders.filter((o) => o.customer.phone.toLowerCase().includes(q)) : state.orders,
    );
  };

  return (
    <section className="py-12 md:py-16">
      <div className="container-page max-w-3xl">
        <div className="text-center mb-8">
          <h2 className="section-title">Suivi de commande</h2>
          <p className="mt-2 text-bordeaux-600">
            Retrouvez vos commandes et confirmez la bonne réception de votre colis.
          </p>
        </div>

        <div className="card p-5 mb-6">
          <label className="label">Votre numéro de téléphone</label>
          <div className="flex gap-2">
            <input
              className="input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && search()}
              placeholder="Ex: 77 000 00 00"
              inputMode="tel"
            />
            <button onClick={search} className="btn-primary">
              <Search size={16} /> Rechercher
            </button>
          </div>
          <p className="text-xs text-bordeaux-400 mt-2">
            Laissez vide pour voir toutes les commandes de démonstration enregistrées sur cet appareil.
          </p>
        </div>

        {searched && foundOrders.length === 0 ? (
          <div className="text-center py-12 text-bordeaux-500">
            <Package size={32} className="mx-auto mb-2 opacity-50" />
            Aucune commande trouvée pour ce numéro.
          </div>
        ) : (
          <div className="space-y-4">
            {foundOrders.map((o) => (
              <div key={o.id} className="card p-5">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="font-serif text-lg text-bordeaux-900">{o.ref}</p>
                    <p className="text-xs text-bordeaux-500">{new Date(o.createdAt).toLocaleString('fr-FR')}</p>
                  </div>
                  <span className={classNames('badge', STATUS_COLORS[o.status])}>{STATUS_LABELS[o.status]}</span>
                </div>

                {/* Timeline */}
                <div className="flex items-center gap-1 mb-4 overflow-x-auto no-scrollbar">
                  {[
                    { k: 'en_attente', icon: Clock, label: 'Reçue' },
                    { k: 'confirmee', icon: Check, label: 'Confirmée' },
                    { k: 'expediee', icon: Truck, label: 'Expédiée' },
                    { k: 'livree', icon: Package, label: 'Livrée' },
                  ].map((step, i) => {
                    const statusOrder = ['en_attente', 'confirmee', 'en_preparation', 'expediee', 'livree'];
                    const currentIdx = statusOrder.indexOf(o.status);
                    const stepIdx = statusOrder.indexOf(step.k);
                    const done = stepIdx <= currentIdx && o.status !== 'annulee';
                    const Icon = step.icon;
                    return (
                      <div key={step.k} className="flex items-center shrink-0">
                        <div className={classNames(
                          'w-8 h-8 rounded-full grid place-items-center text-xs border-2 transition',
                          done ? 'bg-bordeaux-800 border-bordeaux-800 text-cream-50' : 'bg-cream-100 border-cream-300 text-bordeaux-400',
                        )}>
                          <Icon size={14} />
                        </div>
                        <span className="text-[10px] ml-1 text-bordeaux-600 hidden sm:inline">{step.label}</span>
                        {i < 3 && <div className={classNames('w-6 h-0.5 mx-1', done ? 'bg-bordeaux-800' : 'bg-cream-300')} />}
                      </div>
                    );
                  })}
                  {o.status === 'annulee' && (
                    <span className="badge bg-bordeaux-200 text-bordeaux-900 ml-2"><X size={11} /> Annulée</span>
                  )}
                </div>

                <div className="space-y-1.5 text-sm">
                  {o.items.map((it) => (
                    <div key={`${it.productId}-${it.size}-${it.color}`} className="flex justify-between">
                      <span className="text-bordeaux-700">{it.name} ×{it.qty}</span>
                      <span className="text-bordeaux-600">{formatFCFA(it.price * it.qty)}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-3 pt-3 border-t border-cream-200 flex flex-wrap justify-between gap-2 text-sm">
                  <div className="text-bordeaux-600">
                    {o.zone.name} · {PAYMENT_LABELS[o.payment]} · <span className="font-semibold text-bordeaux-900">{formatFCFA(o.total)}</span>
                  </div>
                  {(o.status === 'expediee' || o.status === 'livree') && !o.deliveryConfirmed && (
                    <button
                      onClick={() => { confirmDelivery(o.id); toast('Réception confirmée. Merci !'); }}
                      className="btn-gold text-xs px-4 py-2"
                    >
                      <Check size={14} /> Confirmer la réception
                    </button>
                  )}
                  {o.deliveryConfirmed && (
                    <span className="flex items-center gap-1 text-xs text-emerald-700 font-medium">
                      <Check size={14} /> Réception confirmée
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-bordeaux-400 mt-2">Dernière mise à jour {timeAgo(o.updatedAt)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
