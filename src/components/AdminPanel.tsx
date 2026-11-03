import { useState } from 'react';
import {
  Lock,
  LogOut,
  Package,
  ClipboardList,
  Settings,
  Plus,
  Trash2,
  Pencil,
  X,
  Check,
  AlertTriangle,
  RotateCcw,
  Truck,
  BarChart3,
  TrendingUp,
  Users,
  Wallet,
  ShoppingBag,
} from 'lucide-react';
import { useShop } from '@/ShopContext';
import {
  classNames,
  formatFCFA,
  PAYMENT_LABELS,
  STATUS_LABELS,
  STATUS_COLORS,
  CATEGORY_LABELS,
  timeAgo,
} from '@/utils';
import type { Category, Order, OrderStatus, Product, Settings as SettingsType } from '@/types';
import { openWhatsApp } from '@/whatsapp';

type Tab = 'overview' | 'products' | 'orders' | 'settings';

interface AdminPanelProps {
  open: boolean;
  onClose: () => void;
}

export function AdminPanel({ open, onClose }: AdminPanelProps) {
  const { state, unlockAdmin, lockAdmin } = useShop();
  const [password, setPassword] = useState('');
  const [tab, setTab] = useState<Tab>('overview');

  if (!open) return null;

  if (!state.adminUnlocked) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-bordeaux-950/60 backdrop-blur-sm" onClick={onClose} />
        <div className="relative bg-cream-50 w-full max-w-sm rounded-3xl shadow-soft p-6 animate-scale-in text-center">
          <div className="w-14 h-14 mx-auto rounded-full bg-bordeaux-800 grid place-items-center mb-3">
            <Lock size={24} className="text-gold-300" />
          </div>
          <h2 className="font-serif text-xl text-bordeaux-900">Administration</h2>
          <p className="text-xs text-bordeaux-500 mt-1">Saisissez le mot de passe pour gérer la boutique.</p>
          <input
            type="password"
            className="input mt-4 text-center"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && unlockAdmin(password)}
            placeholder="••••••"
            autoFocus
          />
          <button
            onClick={() => { if (unlockAdmin(password)) { setPassword(''); } }}
            className="btn-primary w-full mt-3"
          >
            Déverrouiller
          </button>
          <p className="text-[10px] text-bordeaux-400 mt-3">
            Utilisez le mot de passe administrateur configuré dans les paramètres.
          </p>
          <button onClick={onClose} className="btn-ghost w-full mt-2 text-xs">Annuler</button>
        </div>
      </div>
    );
  }

  const tabs: { key: Tab; label: string; icon: typeof Package }[] = [
    { key: 'overview', label: 'Vue d’ensemble', icon: BarChart3 },
    { key: 'products', label: 'Produits & Stocks', icon: Package },
    { key: 'orders', label: 'Commandes', icon: ClipboardList },
    { key: 'settings', label: 'Paramètres', icon: Settings },
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-bordeaux-950/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative ml-auto h-full w-full max-w-4xl bg-cream-50 shadow-soft animate-slide-in flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-cream-200 bg-bordeaux-900 text-cream-50">
          <div className="flex items-center gap-2">
            <Settings size={18} className="text-gold-300" />
            <h2 className="font-serif text-xl">Panneau d'administration</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => { lockAdmin(); onClose(); }}
              className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-full bg-bordeaux-800 hover:bg-bordeaux-700 transition"
            >
              <LogOut size={14} /> Verrouiller
            </button>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-bordeaux-800 transition" aria-label="Fermer">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-5 py-3 border-b border-cream-200 bg-cream-100">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={classNames(
                'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition',
                tab === t.key ? 'bg-bordeaux-800 text-cream-50' : 'text-bordeaux-700 hover:bg-cream-200',
              )}
            >
              <t.icon size={16} /> {t.label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {tab === 'overview' && <OverviewTab />}
         {tab === 'products' && <ProductsTab />}
          {tab === 'orders' && <OrdersTab />}
          {tab === 'settings' && <SettingsTab />}
        </div>
      </div>
    </div>
  );
}


/* ============ Overview tab ============ */

function OverviewTab() {
  const stats = [
    {
      label: 'Chiffre d’affaires',
      value: '1 250 000',
      suffix: 'FCFA',
      icon: Wallet,
      detail: 'Ventes simulées',
    },
    {
      label: 'Commandes',
      value: '48',
      suffix: '',
      icon: ShoppingBag,
      detail: 'Commandes simulées',
    },
    {
      label: 'Clients',
      value: '36',
      suffix: '',
      icon: Users,
      detail: 'Clients simulés',
    },
    {
      label: 'Produits',
      value: '14',
      suffix: '',
      icon: Package,
      detail: 'Catalogue de démonstration',
    },
    {
      label: 'Bénéfice estimé',
      value: '425 000',
      suffix: 'FCFA',
      icon: TrendingUp,
      detail: 'Estimation fictive',
    },
  ];

  const sales = [
    { day: 'Lun', amount: 120000 },
    { day: 'Mar', amount: 185000 },
    { day: 'Mer', amount: 95000 },
    { day: 'Jeu', amount: 240000 },
    { day: 'Ven', amount: 175000 },
    { day: 'Sam', amount: 290000 },
    { day: 'Dim', amount: 145000 },
  ];

  const maxSales = Math.max(...sales.map((item) => item.amount));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="font-serif text-2xl text-bordeaux-900">
            Vue d’ensemble
          </h2>
          <p className="text-sm text-bordeaux-500 mt-1">
            Aperçu de l’activité de BIWALI Couture & Beauty.
          </p>
        </div>
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-gold-100 px-3 py-2 text-xs font-medium text-bordeaux-800">
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          Données de démonstration
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="card p-4 border border-cream-200"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-bordeaux-500">{stat.label}</p>
              <div className="w-10 h-10 rounded-xl bg-bordeaux-100 text-bordeaux-800 grid place-items-center">
                <stat.icon size={19} />
              </div>
            </div>
            <p className="font-serif text-2xl text-bordeaux-900 mt-3">
              {stat.value}
            </p>
            {stat.suffix && (
              <p className="text-xs text-bordeaux-600 mt-0.5">{stat.suffix}</p>
            )}
            <p className="text-[11px] text-bordeaux-400 mt-2">{stat.detail}</p>
          </div>
        ))}
      </div>

      <section className="card p-5 border border-cream-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
          <div>
            <h3 className="font-serif text-lg text-bordeaux-900">
              Activité des ventes
            </h3>
            <p className="text-xs text-bordeaux-500 mt-1">
              Répartition illustrative sur les 7 derniers jours
            </p>
          </div>
          <span className="text-xs text-bordeaux-500 bg-cream-100 rounded-full px-3 py-2">
            Cette semaine
          </span>
        </div>

        <div className="flex items-end justify-between gap-2 h-48">
          {sales.map((item) => (
            <div key={item.day} className="flex-1 h-full flex flex-col justify-end items-center gap-2">
              <div className="text-[10px] text-bordeaux-500">
                {Math.round(item.amount / 1000)}k
              </div>
              <div
                className="w-full max-w-12 rounded-t-lg bg-bordeaux-700 hover:bg-bordeaux-500 transition-colors"
                style={{ height: `${(item.amount / maxSales) * 100}%` }}
                title={`${item.amount.toLocaleString('fr-FR')} FCFA`}
              />
              <span className="text-xs text-bordeaux-500">{item.day}</span>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-bordeaux-400 mt-5 text-center">
          Les montants présentés sont fictifs et ne correspondent pas aux ventes réelles.
        </p>
      </section>

      <div className="rounded-2xl bg-bordeaux-900 text-cream-50 p-5">
        <p className="text-xs text-gold-300 uppercase tracking-widest">
          BIWALI Couture & Beauty
        </p>
        <h3 className="font-serif text-xl mt-2">
          Gérez votre boutique en toute simplicité.
        </h3>
        <p className="text-sm text-cream-200 mt-2 leading-relaxed">
          Retrouvez vos produits, vos stocks, vos commandes et les paramètres
          de votre boutique depuis un seul espace.
        </p>
      </div>
    </div>
  );
}

/* ============ Products tab ============ */

function ProductsTab() {
  const { state, deleteProduct, restockProduct, toast } = useShop();
  const [editing, setEditing] = useState<Product | null>(null);
  const [creating, setCreating] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-bordeaux-600">{state.products.length} produits</p>
        <button onClick={() => setCreating(true)} className="btn-primary text-xs px-4 py-2">
          <Plus size={14} /> Ajouter un produit
        </button>
      </div>

      <div className="space-y-3">
        {state.products.map((p) => {
          const totalStock = Object.values(p.stock).reduce((a, b) => a + b, 0);
          const low = totalStock > 0 && totalStock <= p.lowStockThreshold;
          const out = totalStock <= 0;
          return (
            <div key={p.id} className="card p-4 flex gap-4">
              <img src={p.image} alt={p.name} className="w-20 h-24 object-cover rounded-xl shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-serif text-bordeaux-900 line-clamp-1">{p.name}</h3>
                    <p className="text-xs text-bordeaux-500">{CATEGORY_LABELS[p.category]}</p>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => setEditing(p)} className="p-2 rounded-lg hover:bg-cream-200 text-bordeaux-700" aria-label="Modifier">
                      <Pencil size={15} />
                    </button>
                    <button
                      onClick={() => { if (confirm(`Supprimer "${p.name}" ?`)) { deleteProduct(p.id); toast('Produit supprimé'); } }}
                      className="p-2 rounded-lg hover:bg-bordeaux-100 text-bordeaux-600"
                      aria-label="Supprimer"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-semibold text-bordeaux-800 text-sm">{formatFCFA(p.promoPrice ?? p.price)}</span>
                  {p.promoPrice && <span className="text-xs line-through text-bordeaux-400">{formatFCFA(p.price)}</span>}
                </div>
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  {out ? (
                    <span className="badge bg-bordeaux-100 text-bordeaux-800"><AlertTriangle size={11} /> Rupture</span>
                  ) : low ? (
                    <span className="badge bg-gold-200 text-bordeaux-900"><AlertTriangle size={11} /> Stock bas ({totalStock})</span>
                  ) : (
                    <span className="badge bg-emerald-100 text-emerald-800"><Check size={11} /> {totalStock} en stock</span>
                  )}
                  {p.featured && <span className="badge bg-bordeaux-800 text-cream-50">Vedette</span>}
                </div>
                {/* Quick restock default */}
                <RestockInline product={p} onRestock={(v, q) => { restockProduct(p.id, v, q); toast('Stock réapprovisionné'); }} />
              </div>
            </div>
          );
        })}
      </div>

      {(editing || creating) && (
        <ProductForm
          product={editing}
          onClose={() => { setEditing(null); setCreating(false); }}
        />
      )}
    </div>
  );
}

function RestockInline({ product, onRestock }: { product: Product; onRestock: (variant: string, qty: number) => void }) {
  const variants = Object.keys(product.stock);
  const [variant, setVariant] = useState(variants[0] ?? 'default');
  const [qty, setQty] = useState(10);
  if (variants.length === 0) return null;
  return (
    <div className="mt-2 flex items-center gap-2 flex-wrap">
      {variants.length > 1 && (
        <select value={variant} onChange={(e) => setVariant(e.target.value)} className="text-xs rounded-lg border border-cream-300 px-2 py-1 bg-cream-50">
          {variants.map((v) => (
            <option key={v} value={v}>{v} ({product.stock[v]})</option>
          ))}
        </select>
      )}
      <input
        type="number"
        min={1}
        value={qty}
        onChange={(e) => setQty(Number(e.target.value))}
        className="w-16 text-xs rounded-lg border border-cream-300 px-2 py-1 bg-cream-50"
      />
      <button onClick={() => onRestock(variant, qty)} className="btn-ghost text-xs px-3 py-1.5">
        <RotateCcw size={12} /> Réapprovisionner
      </button>
    </div>
  );
}

/* ============ Product form ============ */

function ProductForm({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const { addProduct, updateProduct, toast } = useShop();
  const isNew = !product;
  const [form, setForm] = useState<Product>(
    product ?? {
      id: '',
      name: '',
      category: 'femmes',
      price: 10000,
      promoPrice: null,
      description: '',
      image: 'https://images.pexels.com/photos/10698019/pexels-photo-10698019.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      gallery: [],
      sizes: ['S', 'M', 'L', 'XL'],
      colors: [{ name: 'Bordeaux', hex: '#7d2323' }],
      stock: {},
      lowStockThreshold: 3,
      featured: false,
    },
  );
  const [sizesText, setSizesText] = useState(form.sizes.join(', '));
  const [colorsText, setColorsText] = useState(form.colors.map((c) => `${c.name}:${c.hex}`).join(', '));
  const [stockText, setStockText] = useState(
    Object.entries(form.stock).map(([k, v]) => `${k}=${v}`).join(', '),
  );

  const save = () => {
    if (!form.name.trim()) { toast('Le nom est requis', 'error'); return; }
    const sizes = sizesText.split(',').map((s) => s.trim()).filter(Boolean);
    const colors = colorsText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .map((s) => {
        const [name, hex] = s.split(':');
        return { name: name?.trim() || 'Standard', hex: (hex?.trim() || '#7d2323') };
      });
    let stock: Record<string, number> = {};
    if (stockText.trim()) {
      stock = Object.fromEntries(
        stockText.split(',').map((s) => {
          const [k, v] = s.split('=');
          return [k.trim(), Number(v) || 0];
        }),
      );
    } else {
      for (const sz of sizes) for (const c of colors) stock[`${sz}|${c.name}`] = 5;
    }
    const finalProduct = { ...form, sizes, colors, stock };
    if (isNew) { addProduct(finalProduct); toast('Produit ajouté'); }
    else { updateProduct(finalProduct); toast('Produit modifié'); }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-bordeaux-950/60" onClick={onClose} />
      <div className="relative bg-cream-50 w-full max-w-2xl rounded-3xl shadow-soft max-h-[90vh] overflow-y-auto p-6 animate-scale-in">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif text-xl text-bordeaux-900">{isNew ? 'Nouveau produit' : 'Modifier le produit'}</h3>
          <button onClick={onClose} className="p-2"><X size={20} /></button>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="label">Nom *</label>
            <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <label className="label">Catégorie</label>
            <select className="input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as Category })}>
              {Object.entries(CATEGORY_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Prix (FCFA)</label>
            <input type="number" className="input" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
          </div>
          <div>
            <label className="label">Prix promo (optionnel)</label>
            <input type="number" className="input" value={form.promoPrice ?? ''} onChange={(e) => setForm({ ...form, promoPrice: e.target.value ? Number(e.target.value) : null })} />
          </div>
          <div>
            <label className="label">Seuil stock bas</label>
            <input type="number" className="input" value={form.lowStockThreshold} onChange={(e) => setForm({ ...form, lowStockThreshold: Number(e.target.value) })} />
          </div>
          <div className="sm:col-span-2">
            <label className="label">Description</label>
            <textarea rows={3} className="input" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <div className="sm:col-span-2">
            <label className="label">URL image (emplacement photo/vidéo)</label>
            <input className="input" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://..." />
          </div>
          <div>
            <label className="label">Tailles (séparées par virgules)</label>
            <input className="input" value={sizesText} onChange={(e) => setSizesText(e.target.value)} />
          </div>
          <div>
            <label className="label">Couleurs (nom:hex, séparées par virgules)</label>
            <input className="input" value={colorsText} onChange={(e) => setColorsText(e.target.value)} />
          </div>
          <div className="sm:col-span-2">
            <label className="label">Stock (variant=qté, séparées par virgules) — vide = auto</label>
            <input className="input" value={stockText} onChange={(e) => setStockText(e.target.value)} placeholder="S|Bordeaux=5, M|Bordeaux=3..." />
          </div>
          <label className="flex items-center gap-2 sm:col-span-2 cursor-pointer">
            <input type="checkbox" checked={!!form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="w-4 h-4 accent-bordeaux-800" />
            <span className="text-sm text-bordeaux-800">Mettre en vedette</span>
          </label>
        </div>
        <div className="flex gap-2 mt-5">
          <button onClick={save} className="btn-primary flex-1"><Check size={16} /> Enregistrer</button>
          <button onClick={onClose} className="btn-outline">Annuler</button>
        </div>
      </div>
    </div>
  );
}

/* ============ Orders tab ============ */

function OrdersTab() {
  const { state, updateOrderStatus, markOrderReadByAdmin, toast } = useShop();
  const [filter, setFilter] = useState<string>('all');
  const statuses: OrderStatus[] = ['en_attente', 'confirmee', 'en_preparation', 'expediee', 'livree', 'annulee'];

  const orders = filter === 'all' ? state.orders : state.orders.filter((o) => o.status === filter);

  return (
    <div>
      <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar pb-1">
        <button onClick={() => setFilter('all')} className={classNames('px-3 py-1.5 rounded-full text-xs whitespace-nowrap', filter === 'all' ? 'bg-bordeaux-800 text-cream-50' : 'bg-cream-200 text-bordeaux-700')}>Toutes ({state.orders.length})</button>
        {statuses.map((s) => {
          const count = state.orders.filter((o) => o.status === s).length;
          return (
            <button key={s} onClick={() => setFilter(s)} className={classNames('px-3 py-1.5 rounded-full text-xs whitespace-nowrap', filter === s ? 'bg-bordeaux-800 text-cream-50' : 'bg-cream-200 text-bordeaux-700')}>
              {STATUS_LABELS[s]} ({count})
            </button>
          );
        })}
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-16 text-bordeaux-500">
          <ClipboardList size={32} className="mx-auto mb-2 opacity-50" />
          Aucune commande.
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((o) => {
            const unread = !o.readByAdmin;
            return (
              <div key={o.id} className={classNames('card p-4', unread && 'border-gold-300')}>
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-serif text-bordeaux-900">{o.ref}</p>
                      {unread && <span className="w-2 h-2 rounded-full bg-gold-500" />}
                    </div>
                    <p className="text-xs text-bordeaux-500">{timeAgo(o.createdAt)} · {new Date(o.createdAt).toLocaleString('fr-FR')}</p>
                  </div>
                  <span className={classNames('badge', STATUS_COLORS[o.status])}>{STATUS_LABELS[o.status]}</span>
                </div>
                <div className="mt-2 text-sm text-bordeaux-700">
                  <p><strong>{o.customer.name}</strong> · {o.customer.phone}</p>
                  <p className="text-xs">{o.customer.address}, {o.customer.city}</p>
                  <p className="text-xs mt-1">{o.items.length} article(s) · {PAYMENT_LABELS[o.payment]} · <strong>{formatFCFA(o.total)}</strong></p>
                  <p className="text-xs text-bordeaux-500 mt-0.5">Zone: {o.zone.name} ({o.zone.delay})</p>
                  {o.customer.notes && <p className="text-xs text-bordeaux-500 italic mt-1">« {o.customer.notes} »</p>}
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <select
                    value={o.status}
                    onChange={(e) => { updateOrderStatus(o.id, e.target.value as OrderStatus); toast('Statut mis à jour'); if (unread) markOrderReadByAdmin(o.id); }}
                    className="text-xs rounded-lg border border-cream-300 px-2 py-1.5 bg-cream-50"
                  >
                    {statuses.map((s) => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
                  </select>
                  <button onClick={() => openWhatsApp(o, state.settings)} className="btn-ghost text-xs px-3 py-1.5">
                    <Truck size={12} /> WhatsApp
                  </button>
                  {unread && (
                    <button onClick={() => markOrderReadByAdmin(o.id)} className="btn-ghost text-xs px-3 py-1.5">
                      <Check size={12} /> Marquer lue
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ============ Settings tab ============ */

function SettingsTab() {
  const { state, updateSettings, resetShop, toast } = useShop();
  const [form, setForm] = useState<SettingsType>(state.settings);

  const save = () => {
    updateSettings(form);
    toast('Paramètres enregistrés');
  };

  return (
    <div className="space-y-5 max-w-xl">
      <div>
        <h3 className="font-serif text-lg text-bordeaux-900 mb-3">Informations boutique</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          <div><label className="label">Nom de la boutique</label><input className="input" value={form.shopName} onChange={(e) => setForm({ ...form, shopName: e.target.value })} /></div>
          <div><label className="label">Slogan</label><input className="input" value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} /></div>
          <div><label className="label">Téléphone WhatsApp (avec indicatif, sans +)</label><input className="input" value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} /></div>
          <div><label className="label">Téléphone affiché</label><input className="input" value={form.phoneDisplay} onChange={(e) => setForm({ ...form, phoneDisplay: e.target.value })} /></div>
          <div className="sm:col-span-2"><label className="label">Adresse</label><input className="input" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} /></div>
          <div><label className="label">Email</label><input className="input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
          <div><label className="label">Image hero (URL)</label><input className="input" value={form.heroImage} onChange={(e) => setForm({ ...form, heroImage: e.target.value })} /></div>
          <div><label className="label">Seuil livraison gratuite (FCFA, 0 = désactivé)</label><input type="number" className="input" value={form.freeDeliveryThreshold} onChange={(e) => setForm({ ...form, freeDeliveryThreshold: Number(e.target.value) })} /></div>
          <div><label className="label">Mot de passe admin</label><input className="input" value={form.adminPassword} onChange={(e) => setForm({ ...form, adminPassword: e.target.value })} /></div>
        </div>
      </div>

      <div>
        <h3 className="font-serif text-lg text-bordeaux-900 mb-3">Réseaux sociaux</h3>
        <div className="grid sm:grid-cols-3 gap-3">
          <div><label className="label">Instagram</label><input className="input" value={form.social?.instagram ?? ''} onChange={(e) => setForm({ ...form, social: { ...form.social, instagram: e.target.value } })} /></div>
          <div><label className="label">Facebook</label><input className="input" value={form.social?.facebook ?? ''} onChange={(e) => setForm({ ...form, social: { ...form.social, facebook: e.target.value } })} /></div>
          <div><label className="label">TikTok</label><input className="input" value={form.social?.tiktok ?? ''} onChange={(e) => setForm({ ...form, social: { ...form.social, tiktok: e.target.value } })} /></div>
        </div>
      </div>

      <div className="flex gap-2 pt-2">
        <button onClick={save} className="btn-primary"><Check size={16} /> Enregistrer</button>
      </div>

      <div className="border-t border-cream-200 pt-5">
        <h3 className="font-serif text-lg text-bordeaux-900 mb-1">Zone dangereuse</h3>
        <p className="text-xs text-bordeaux-500 mb-3">Réinitialise toutes les données (produits, commandes, paramètres) aux valeurs d'origine. Action irréversible.</p>
        <button
          onClick={() => { if (confirm('Réinitialiser TOUTES les données de démonstration ? Cette action est irréversible.')) { resetShop(); toast('Données réinitialisées'); } }}
          className="btn-outline text-bordeaux-700 border-bordeaux-400 hover:bg-bordeaux-50"
        >
          <RotateCcw size={14} /> Réinitialiser les données
        </button>
      </div>
    </div>
  );
}
