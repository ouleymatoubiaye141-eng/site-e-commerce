export function formatFCFA(n: number): string {
  return new Intl.NumberFormat('fr-FR').format(n) + ' FCFA';
}

export function genRef(): string {
  const d = new Date();
  const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  const rnd = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `TB-${ymd}-${rnd}`;
}

export function uid(prefix = 'id'): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

export function classNames(...xs: (string | false | null | undefined)[]): string {
  return xs.filter(Boolean).join(' ');
}

export function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  if (m < 1) return "à l'instant";
  if (m < 60) return `il y a ${m} min`;
  const h = Math.floor(m / 60);
  if (h < 24) return `il y a ${h} h`;
  const d = Math.floor(h / 24);
  if (d < 30) return `il y a ${d} j`;
  return new Date(ts).toLocaleDateString('fr-FR');
}

export const CATEGORY_LABELS: Record<string, string> = {
  femmes: 'Femmes',
  hommes: 'Hommes',
  beaute: 'Beauté',
  accessoires: 'Accessoires',
};

export const PAYMENT_LABELS: Record<string, string> = {
  wave: 'Wave',
  orange_money: 'Orange Money',
  free_money: 'Free Money',
  cash: 'Paiement à la livraison',
};

export const STATUS_LABELS: Record<string, string> = {
  en_attente: 'En attente',
  confirmee: 'Confirmée',
  en_preparation: 'En préparation',
  expediee: 'Expédiée',
  livree: 'Livrée',
  annulee: 'Annulée',
};

export const STATUS_COLORS: Record<string, string> = {
  en_attente: 'bg-cream-300 text-bordeaux-900',
  confirmee: 'bg-gold-300 text-bordeaux-900',
  en_preparation: 'bg-gold-400 text-bordeaux-900',
  expediee: 'bg-bordeaux-300 text-cream-50',
  livree: 'bg-emerald-200 text-emerald-900',
  annulee: 'bg-bordeaux-200 text-bordeaux-900',
};
