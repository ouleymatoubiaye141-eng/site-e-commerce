import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { useShop } from '@/ShopContext';
import { Drawer } from './Drawer';
import { formatFCFA, PAYMENT_LABELS, classNames } from '@/utils';
import type { Customer, DeliveryZone, Order, PaymentMethod } from '@/types';
import { buildWhatsAppMessage } from '@/whatsapp';

interface CheckoutDrawerProps {
  open: boolean;
  onClose: () => void;
  onBack: () => void;
  onOrdered: (order: Order) => void;
}

export function CheckoutDrawer({ open, onClose, onBack, onOrdered }: CheckoutDrawerProps) {
  const { state, cart, cartSubtotal, placeOrder, toast } = useShop();
  const [step, setStep] = useState<1 | 2>(1);
  const [customer, setCustomer] = useState<Customer>({
    name: '',
    phone: '',
    address: '',
    city: '',
    notes: '',
  });
  const [zoneId, setZoneId] = useState(state.zones[0]?.id ?? '');
  const [payment, setPayment] = useState<PaymentMethod>('wave');

  const zone = state.zones.find((z) => z.id === zoneId)!;
  const freeThreshold = state.settings.freeDeliveryThreshold;
  const deliveryFee =
    freeThreshold > 0 && cartSubtotal >= freeThreshold ? 0 : zone?.fee ?? 0;
  const total = cartSubtotal + deliveryFee;

  const valid = customer.name.trim() && customer.phone.trim() && customer.address.trim() && customer.city.trim();

  const payments: PaymentMethod[] = ['wave', 'orange_money', 'free_money', 'cash'];

  const submit = () => {
    if (!valid) {
      toast('Veuillez remplir tous les champs obligatoires', 'error');
      return;
    }
    const order = placeOrder(customer, zone, payment);
    setStep(1);
    setCustomer({ name: '', phone: '', address: '', city: '', notes: '' });
    onOrdered(order);
  };

  return (
    <Drawer open={open} onClose={onClose} title="Commande">
      <div className="p-5 flex flex-col h-full">
        {/* Steps indicator */}
        <div className="flex items-center gap-2 mb-6 text-sm">
          <span className={classNames('flex items-center gap-2', step === 1 ? 'text-bordeaux-900 font-medium' : 'text-bordeaux-400')}>
            <span className="w-6 h-6 rounded-full grid place-items-center text-xs bg-bordeaux-800 text-cream-50">1</span>
            Informations
          </span>
          <div className="flex-1 h-px bg-cream-300" />
          <span className={classNames('flex items-center gap-2', step === 2 ? 'text-bordeaux-900 font-medium' : 'text-bordeaux-400')}>
            <span className="w-6 h-6 rounded-full grid place-items-center text-xs bg-bordeaux-800 text-cream-50">2</span>
            Paiement
          </span>
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="label">Nom complet *</label>
              <input
                className="input"
                value={customer.name}
                onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                placeholder="Awa Diop"
              />
            </div>
            <div>
              <label className="label">Téléphone (WhatsApp) *</label>
              <input
                className="input"
                value={customer.phone}
                onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                placeholder="77 000 00 00"
                inputMode="tel"
              />
            </div>
            <div>
              <label className="label">Adresse de livraison *</label>
              <textarea
                className="input"
                rows={2}
                value={customer.address}
                onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                placeholder="Quartier, rue, repère..."
              />
            </div>
            <div>
              <label className="label">Ville *</label>
              <input
                className="input"
                value={customer.city}
                onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                placeholder="Dakar"
              />
            </div>
            <div>
              <label className="label">Zone de livraison</label>
              <div className="space-y-2">
                {state.zones.map((z) => (
                  <button
                    key={z.id}
                    onClick={() => setZoneId(z.id)}
                    className={classNames(
                      'w-full flex items-center justify-between px-4 py-3 rounded-xl border transition text-left',
                      zoneId === z.id ? 'border-bordeaux-800 bg-bordeaux-50' : 'border-cream-300 hover:border-bordeaux-400',
                    )}
                  >
                    <div>
                      <p className="text-sm font-medium text-bordeaux-900">{z.name}</p>
                      <p className="text-xs text-bordeaux-500">Délai: {z.delay}</p>
                    </div>
                    <span className="text-sm font-semibold text-bordeaux-800">{z.fee === 0 ? 'Gratuit' : formatFCFA(z.fee)}</span>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="label">Notes (optionnel)</label>
              <textarea
                className="input"
                rows={2}
                value={customer.notes}
                onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                placeholder="Instructions de livraison, repère, etc."
              />
            </div>
            <button
              onClick={() => setStep(2)}
              disabled={!valid}
              className="btn-primary w-full"
            >
              Continuer <ArrowRight size={16} />
            </button>
            <button onClick={onBack} className="btn-ghost w-full text-sm">
              <ArrowLeft size={14} /> Retour au panier
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 flex-1 flex flex-col">
            <div>
              <label className="label">Mode de paiement</label>
              <div className="grid grid-cols-2 gap-2">
                {payments.map((p) => (
                  <button
                    key={p}
                    onClick={() => setPayment(p)}
                    className={classNames(
                      'px-4 py-3 rounded-xl border text-sm font-medium transition flex items-center gap-2',
                      payment === p ? 'border-bordeaux-800 bg-bordeaux-50 text-bordeaux-900' : 'border-cream-300 text-bordeaux-700 hover:border-bordeaux-400',
                    )}
                  >
                    {payment === p && <Check size={14} />}
                    {PAYMENT_LABELS[p]}
                  </button>
                ))}
              </div>
              <p className="text-xs text-bordeaux-500 mt-2">
                {payment === 'cash'
                  ? 'Payez en espèces à la réception du colis. Vérifiez le montant exact svp.'
                  : 'Vous recevrez les instructions de paiement par WhatsApp après confirmation de la commande.'}
              </p>
            </div>

            {/* Recap */}
            <div className="rounded-xl bg-cream-100 border border-cream-200 p-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-bordeaux-600">Sous-total</span><span className="font-medium">{formatFCFA(cartSubtotal)}</span></div>
              <div className="flex justify-between">
                <span className="text-bordeaux-600">Livraison ({zone?.name.split(' ')[0]})</span>
                <span className="font-medium">{deliveryFee === 0 ? 'Gratuit' : formatFCFA(deliveryFee)}</span>
              </div>
              <div className="flex justify-between text-base font-semibold text-bordeaux-900 pt-2 border-t border-cream-200">
                <span>Total</span><span>{formatFCFA(total)}</span>
              </div>
            </div>

            <div className="flex-1" />
            <button onClick={submit} className="btn-primary w-full">
              <Check size={16} /> Confirmer la commande
            </button>
            <button onClick={() => setStep(1)} className="btn-ghost w-full text-sm">
              <ArrowLeft size={14} /> Modifier mes infos
            </button>
          </div>
        )}
      </div>
    </Drawer>
  );
}
