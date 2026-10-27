import { formatFCFA, PAYMENT_LABELS } from './utils';
import type { Order, Settings } from './types';

export function buildWhatsAppMessage(order: Order, settings: Settings): string {
  const lines = [
    `*Nouvelle commande — ${settings.shopName}*`,
    `Réf: ${order.ref}`,
    ``,
    `*Client:* ${order.customer.name}`,
    `*Tél:* ${order.customer.phone}`,
    `*Adresse:* ${order.customer.address}, ${order.customer.city}`,
    order.customer.notes ? `*Notes:* ${order.customer.notes}` : '',
    ``,
    `*Articles:*`,
    ...order.items.map(
      (i) => `• ${i.name} (T.${i.size}, ${i.color}) ×${i.qty} = ${formatFCFA(i.price * i.qty)}`,
    ),
    ``,
    `*Zone:* ${order.zone.name}`,
    `*Livraison:* ${formatFCFA(order.deliveryFee)}`,
    `*Paiement:* ${PAYMENT_LABELS[order.payment]}`,
    ``,
    `*Total: ${formatFCFA(order.total)}*`,
  ].filter(Boolean);
  return encodeURIComponent(lines.join('\n'));
}

export function openWhatsApp(order: Order, settings: Settings): void {
  const msg = buildWhatsAppMessage(order, settings);
  window.open(`https://wa.me/${settings.whatsapp}?text=${msg}`, '_blank', 'noopener,noreferrer');
}
