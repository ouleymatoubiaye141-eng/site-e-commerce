import { useState } from 'react';
import { Menu, ShoppingBag, Bell, Lock, X, Search } from 'lucide-react';
import { useShop } from '@/ShopContext';
import { CATEGORY_LABELS, classNames, timeAgo } from '@/utils';
import type { Category } from '@/types';

interface HeaderProps {
  onOpenCart: () => void;
  onOpenNotifs: () => void;
  onNavigate: (cat: Category | 'all' | 'promo') => void;
  active: string;
  onOpenAdmin: () => void;
  onSearch: (q: string) => void;
}

export function Header({ onOpenCart, onOpenNotifs, onNavigate, active, onOpenAdmin, onSearch }: HeaderProps) {
  const { state, cartCount, notifications } = useShop();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState('');
  const unread = notifications.filter((n) => !n.read).length;

  const navItems: { key: Category | 'all' | 'promo'; label: string }[] = [
    { key: 'all', label: 'Accueil' },
    { key: 'femmes', label: 'Femmes' },
    { key: 'hommes', label: 'Hommes' },
    { key: 'beaute', label: 'Beauté' },
    { key: 'accessoires', label: 'Accessoires' },
    { key: 'promo', label: 'Promos' },
  ];

  const go = (k: string) => {
    onNavigate(k as Category | 'all' | 'promo');
    setMobileOpen(false);
  };

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(q);
    setSearchOpen(false);
    setMobileOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-cream-50/90 backdrop-blur-md border-b border-cream-200">
        <div className="container-page flex items-center justify-between h-16 md:h-20 gap-4">
          {/* Mobile menu */}
          <button
            className="lg:hidden p-2 -ml-2 text-bordeaux-800"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <button
            onClick={() => go('all')}
            className="flex items-center gap-2 shrink-0"
          >
            <div className="w-10 h-10 rounded-full bg-bordeaux-800 grid place-items-center text-gold-300 font-serif font-bold text-xl shadow-soft">
              T
            </div>
            <div className="text-left hidden sm:block leading-tight">
              <div className="font-serif text-xl text-bordeaux-900 font-semibold">{state.settings.shopName}</div>
              <div className="text-[10px] uppercase tracking-widest text-gold-700">{state.settings.tagline}</div>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => go(item.key)}
                className={classNames(
                  'px-4 py-2 rounded-full text-sm font-medium transition',
                  active === item.key
                    ? 'bg-bordeaux-800 text-cream-50'
                    : 'text-bordeaux-800 hover:bg-cream-200',
                item.key === 'promo' && !active && 'text-gold-700 hover:bg-gold-100',
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setSearchOpen((o) => !o)}
              className="p-2.5 rounded-full text-bordeaux-800 hover:bg-cream-200 transition"
              aria-label="Rechercher"
            >
              <Search size={20} />
            </button>
            <button
              onClick={onOpenNotifs}
              className="p-2.5 rounded-full text-bordeaux-800 hover:bg-cream-200 transition relative"
              aria-label="Notifications"
            >
              <Bell size={20} />
              {unread > 0 && (
                <span className="absolute top-1 right-1 bg-gold-500 text-bordeaux-950 text-[10px] font-bold rounded-full min-w-[16px] h-4 px-1 grid place-items-center">
                  {unread}
                </span>
              )}
            </button>
            <button
              onClick={onOpenAdmin}
              className="p-2.5 rounded-full text-bordeaux-800 hover:bg-cream-200 transition"
              aria-label="Administration"
              title="Administration"
            >
              <Lock size={18} />
            </button>
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full bg-bordeaux-800 text-cream-50 hover:bg-bordeaux-700 transition"
              aria-label="Panier"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold-400 text-bordeaux-950 text-[11px] font-bold rounded-full min-w-[18px] h-[18px] px-1 grid place-items-center border-2 border-cream-50">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="border-t border-cream-200 bg-cream-100 animate-fade-up">
            <form onSubmit={submitSearch} className="container-page py-3 flex gap-2">
              <Search size={20} className="text-bordeaux-400 self-center" />
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Rechercher un produit..."
                className="flex-1 bg-transparent outline-none text-bordeaux-900 placeholder:text-bordeaux-300"
              />
              <button type="submit" className="btn-gold text-xs px-4 py-2">Chercher</button>
            </form>
          </div>
        )}
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-bordeaux-950/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-72 bg-cream-50 shadow-soft animate-slide-in p-4 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <span className="font-serif text-xl text-bordeaux-900">Menu</span>
              <button onClick={() => setMobileOpen(false)} className="p-2"><X size={20} /></button>
            </div>
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => go(item.key)}
                className={classNames(
                  'px-4 py-3 rounded-xl text-left text-sm font-medium transition mb-1',
                  active === item.key ? 'bg-bordeaux-800 text-cream-50' : 'text-bordeaux-800 hover:bg-cream-200',
                )}
              >
                {item.label}
              </button>
            ))}
            <div className="mt-auto pt-6 border-t border-cream-200 text-xs text-bordeaux-600">
              <p>{state.settings.address}</p>
              <p className="mt-1">{state.settings.phoneDisplay}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
