import { Check, MessageCircle, Home } from 'lucide-react';
import type { Order } from '@/types';
import { useShop } from '@/ShopContext';
import { formatFCFA, PAYMENT_LABELS, STATUS_LABELS } from '@/utils';
import { openWhatsApp } from '@/whatsapp';

interface OrderSuccessModalProps {
  order: Order | null;
  onClose: () => void;
  onHome: () => void;
}

export function OrderSuccessModal({ order, onClose, onHome }: OrderSuccessModalProps) {
  const { state } = useShop();
  if (!order) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-bordeaux-950/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-cream-50 w-full max-w-lg rounded-3xl shadow-soft p-6 md:p-8 animate-scale-in text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 grid place-items-center mb-4">
          <Check size={32} className="text-emerald-600" />
        </div>
        <h2 className="font-serif text-2xl text-bordeaux-900">Commande confirmée !</h2>
        <p className="text-bordeaux-600 mt-2 text-sm">
          Merci {order.customer.name.split(' ')[0]}. Votre commande <strong>{order.ref}</strong> a été enregistrée.
        </p>

        <div className="mt-5 rounded-xl bg-cream-100 border border-cream-200 p-4 text-left text-sm space-y-1.5">
          <div className="flex justify-between"><span className="text-bordeaux-600">Statut</span><span className="font-medium">{STATUS_LABELS[order.status]}</span></div>
          <div className="flex justify-between"><span className="text-bordeaux-600">Articles</span><span className="font-medium">{order.items.length}</span></div>
          <div className="flex justify-between"><span className="text-bordeaux-600">Livraison</span><span className="font-medium">{order.zone.name}</span></div>
          <div className="flex justify-between"><span className="text-bordeaux-600">Paiement</span><span className="font-medium">{PAYMENT_LABELS[order.payment]}</span></div>
          <div className="flex justify-between text-base font-semibold text-bordeaux-900 pt-1.5 border-t border-cream-200">
            <span>Total</span><span>{formatFCFA(order.total)}</span>
          </div>
        </div>

        <p className="mt-4 text-xs text-bordeaux-500">
          Pour finaliser, envoyez le récapitulatif de votre commande à la boutique via WhatsApp.
          {order.payment !== 'cash' && ' Les instructions de paiement vous seront communiquées par message.'}
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-2">
          <button
            onClick={() => openWhatsApp(order, state.settings)}
            className="btn-gold flex-1"
          >
            <MessageCircle size={16} /> Envoyer sur WhatsApp
          </button>
          <button onClick={() => { onClose(); onHome(); }} className="btn-outline flex-1">
            <Home size={16} /> Retour à la boutique
          </button>
        </div>
      </div>
    </div>
  );
}
