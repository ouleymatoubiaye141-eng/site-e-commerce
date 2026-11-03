import { useState } from 'react';
import { ShoppingBag, Bell, Lock, Search, X } from 'lucide-react';
import { useShop } from '@/ShopContext';
import type { Category } from '@/types';

interface HeaderProps {
  onOpenCart: () => void;
  onOpenNotifs: () => void;
  onNavigate: (cat: Category | 'all' | 'promo') => void;
  active: string;
  onOpenAdmin: () => void;
  onSearch: (q: string) => void;
}

const navItems: { key: Category | 'all' | 'promo'; label: string }[] = [
  { key: 'all', label: 'Accueil' },
  { key: 'femmes', label: 'Femme' },
  { key: 'hommes', label: 'Homme' },
  { key: 'beaute', label: 'Beauté' },
  { key: 'accessoires', label: 'Accessoires' },
  { key: 'promo', label: 'Promotions' },
];

export function Header({
  onOpenCart,
  onOpenNotifs,
  onNavigate,
  active,
  onOpenAdmin,
  onSearch,
}: HeaderProps) {
  const { cartCount, notifications } = useShop();
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState('');
  const unread = notifications.filter((n) => !n.read).length;

  const submitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(q);
    setSearchOpen(false);
  };

  const iconClass =
    'relative grid h-10 w-10 place-items-center text-[#171717] transition hover:text-[#71394d]';

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-[58px] max-w-[1500px] items-center justify-between px-4 sm:px-7 lg:h-[66px] lg:px-10">
        <button
          type="button"
          onClick={() => onNavigate('all')}
          aria-label="BIWALI - Accueil"
          className="font-serif text-[25px] font-semibold tracking-[0.17em] text-[#171717] sm:text-[28px]"
        >
          BIWALI<span className="text-[#71394d]">.</span>
        </button>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navigation principale">
          {navItems.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => onNavigate(item.key)}
              aria-current={active === item.key ? 'page' : undefined}
              className={`text-[12px] transition ${
                active === item.key
                  ? 'font-semibold text-[#71394d]'
                  : 'text-[#555] hover:text-black'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setSearchOpen((value) => !value)}
            className={iconClass}
            aria-label="Rechercher"
            aria-expanded={searchOpen}
          >
            {searchOpen ? <X size={20} /> : <Search size={20} strokeWidth={1.6} />}
          </button>

          <button
            type="button"
            onClick={onOpenNotifs}
            className={`${iconClass} hidden sm:grid`}
            aria-label={`Notifications, ${unread} non lues`}
          >
            <Bell size={19} strokeWidth={1.6} />
            {unread > 0 && (
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[#71394d]" />
            )}
          </button>

          <button
            type="button"
            onClick={onOpenAdmin}
            className={`${iconClass} hidden sm:grid`}
            aria-label="Administration"
            title="Administration"
          >
            <Lock size={17} />
          </button>

          <button
            type="button"
            onClick={onOpenCart}
            className={iconClass}
            aria-label={`Panier, ${cartCount} article(s)`}
          >
            <ShoppingBag size={21} strokeWidth={1.6} />
            {cartCount > 0 && (
              <span className="absolute right-0 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-[#71394d] px-1 text-[9px] font-semibold text-white">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {searchOpen && (
        <form
          onSubmit={submitSearch}
          className="flex items-center gap-3 border-t border-black/5 bg-white px-4 py-3 sm:px-8"
        >
          <Search size={18} className="text-gray-400" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Rechercher un article..."
            className="min-w-0 flex-1 bg-transparent py-2 text-sm text-black outline-none placeholder:text-gray-400"
            aria-label="Rechercher un article"
          />
          <button type="submit" className="text-xs font-semibold uppercase tracking-wider text-[#71394d]">
            OK
          </button>
        </form>
      )}
    </header>
  );
}
