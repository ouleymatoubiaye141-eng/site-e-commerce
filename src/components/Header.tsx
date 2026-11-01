
import { useState } from 'react';
import {
  Menu,
  ShoppingBag,
  Bell,
  Lock,
  X,
  Search,
  Crown,
  Home,
  UsersRound,
  Shirt,
  Sparkles,
  ShoppingBasket,
  Tag,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useShop } from '@/ShopContext';
import { CATEGORY_LABELS, classNames } from '@/utils';
import type { Category } from '@/types';

interface HeaderProps {
  onOpenCart: () => void;
  onOpenNotifs: () => void;
  onNavigate: (cat: Category | 'all' | 'promo') => void;
  active: string;
  onOpenAdmin: () => void;
  onSearch: (q: string) => void;
}

const navItems: {
  key: Category | 'all' | 'promo';
  label: string;
  icon: LucideIcon;
}[] = [
  { key: 'all', label: 'Accueil', icon: Home },
  { key: 'femmes', label: 'Femmes', icon: UsersRound },
  { key: 'hommes', label: 'Hommes', icon: Shirt },
  { key: 'beaute', label: 'Beauté', icon: Sparkles },
  { key: 'accessoires', label: 'Accessoires', icon: ShoppingBasket },
  { key: 'promo', label: 'Promos', icon: Tag },
];

export function Header({
  onOpenCart,
  onOpenNotifs,
  onNavigate,
  active,
  onOpenAdmin,
  onSearch,
}: HeaderProps) {
  const { state, cartCount, notifications } = useShop();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState('');

  const unread = notifications.filter((n) => !n.read).length;

  const go = (key: Category | 'all' | 'promo') => {
    onNavigate(key);
    setMobileOpen(false);
  };

  const submitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(q);
    setSearchOpen(false);
    setMobileOpen(false);
  };

  const actionStyle =
    'relative grid h-10 w-10 shrink-0 place-items-center rounded-full text-[#52191c] transition-all duration-300 hover:bg-[#f2e5d4] hover:text-[#8c6020] hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c69a3b] sm:h-11 sm:w-11';

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[#e8d7b9] bg-[#fffaf5]/95 shadow-[0_4px_20px_rgba(72,25,25,0.07)] backdrop-blur-xl">
        {/* Ligne décorative supérieure */}
        <div className="h-[3px] bg-gradient-to-r from-[#451316] via-[#d4aa4e] to-[#451316]" />

        <div className="mx-auto flex min-h-[82px] max-w-[1600px] items-center justify-between gap-3 px-3 sm:px-5 lg:px-8 xl:px-10">
          {/* Bouton mobile */}
          <button
            type="button"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-[#52191c] transition hover:bg-[#f2e5d4] xl:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Logo de la marque */}
          <button
            type="button"
            onClick={() => go('all')}
            className="group flex shrink-0 items-center gap-2.5 text-left sm:gap-3.5"
            aria-label="BIWALI Couture&Beauty - Accueil"
          >
            <div className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#d0a343] bg-gradient-to-br from-[#641d21] to-[#351013] text-[#e9c66d] shadow-[0_3px_10px_rgba(69,19,22,0.16)] transition duration-300 group-hover:scale-105 group-hover:shadow-lg sm:h-12 sm:w-12">
              <Crown
                size={13}
                strokeWidth={1.8}
                className="absolute top-[5px]"
              />
              <span className="mt-1 font-serif text-[27px] font-bold leading-none">
                B
              </span>
            </div>

            <div className="leading-none">
              <span className="block font-serif text-[19px] font-semibold tracking-[0.035em] text-[#491619] sm:text-[23px]">
                BIWALI
              </span>
              <span className="mt-1.5 block whitespace-nowrap font-serif text-[10px] text-[#84564b] sm:text-[12px]">
                Couture&Beauty
              </span>
              <span className="mt-2 hidden whitespace-nowrap text-[8px] font-medium uppercase tracking-[0.19em] text-[#a27629] sm:block">
                Mode · Beauté · Tradition
              </span>
            </div>
          </button>

          {/* Navigation ordinateur */}
          <nav
            className="hidden items-center gap-1 xl:flex 2xl:gap-2"
            aria-label="Navigation principale"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const selected = active === item.key;

              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => go(item.key)}
                  aria-current={selected ? 'page' : undefined}
                  className={classNames(
                    'group relative flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-3 text-[13px] font-medium transition-all duration-300 2xl:px-4 2xl:text-sm',
                    selected
                      ? 'bg-gradient-to-r from-[#54191d] to-[#3d1115] text-[#fff9f0] shadow-[0_4px_12px_rgba(75,20,25,0.20)] ring-1 ring-[#d2aa55]/70'
                      : 'text-[#542126] hover:bg-[#f4e9da] hover:text-[#9a6a20]',
                    item.key === 'promo' &&
                      !selected &&
                      'text-[#a36c17]',
                  )}
                >
                  <Icon
                    size={17}
                    strokeWidth={selected ? 2 : 1.7}
                    className={classNames(
                      'transition-transform duration-300 group-hover:-translate-y-0.5',
                      selected
                        ? 'text-[#f1ce78]'
                        : item.key === 'promo'
                          ? 'text-[#bd8b2f]'
                          : 'text-current',
                    )}
                  />
                  {item.label}

                  {selected && (
                    <span className="absolute -bottom-[9px] left-1/2 h-[3px] w-7 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#b78427] to-[#e9c96e]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Actions : recherche, notifications, admin, panier */}
          <div className="ml-auto flex shrink-0 items-center gap-0.5 sm:gap-1.5">
            <button
              type="button"
              onClick={() => setSearchOpen((open) => !open)}
              className={actionStyle}
              aria-label="Rechercher un produit"
              aria-expanded={searchOpen}
            >
              <Search size={20} strokeWidth={1.8} />
            </button>

            <button
              type="button"
              onClick={onOpenNotifs}
              className={actionStyle}
              aria-label={`Notifications, ${unread} non lues`}
            >
              <Bell size={20} strokeWidth={1.8} />
              {unread > 0 && (
                <span className="absolute right-0.5 top-0.5 grid h-[17px] min-w-[17px] place-items-center rounded-full border-2 border-[#fffaf5] bg-[#d9ad42] px-1 text-[9px] font-bold text-[#451316]">
                  {unread > 9 ? '9+' : unread}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={onOpenAdmin}
              className={`${actionStyle} hidden sm:grid`}
              aria-label="Administration"
              title="Administration"
            >
              <Lock size={18} strokeWidth={1.8} />
            </button>

            <button
              type="button"
              onClick={onOpenCart}
              className="relative ml-1 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#6a2828] bg-gradient-to-br from-[#641d21] to-[#3b1014] text-[#fffaf2] shadow-[0_4px_12px_rgba(69,19,22,0.18)] transition duration-300 hover:-translate-y-0.5 hover:border-[#d1a343] hover:shadow-[0_6px_16px_rgba(69,19,22,0.24)] sm:ml-2 sm:h-12 sm:w-12"
              aria-label={`Ouvrir le panier, ${cartCount} article(s)`}
            >
              <ShoppingBag size={20} strokeWidth={1.8} />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 grid h-[18px] min-w-[18px] place-items-center rounded-full border-2 border-[#fffaf5] bg-[#e0b84e] px-1 text-[10px] font-bold text-[#451316]">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Navigation mobile et tablette */}
        <nav
          className="flex gap-2 overflow-x-auto border-t border-[#eadcc8] bg-[#fffaf5] px-3 py-2.5 no-scrollbar xl:hidden"
          aria-label="Catégories"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const selected = active === item.key;

            return (
              <button
                key={item.key}
                type="button"
                onClick={() => go(item.key)}
                aria-current={selected ? 'page' : undefined}
                className={classNames(
                  'flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-2 text-xs font-medium transition-all duration-200',
                  selected
                    ? 'border-[#6d2a2d] bg-[#50171b] text-[#fff8ee] shadow-sm'
                    : 'border-[#eadcc8] bg-white/70 text-[#562127] hover:border-[#c6a04e] hover:bg-[#f5ead9]',
                )}
              >
                <Icon size={14} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Recherche */}
        {searchOpen && (
          <div className="animate-fade-up border-t border-[#eadcc8] bg-[#fffaf5]">
            <form
              onSubmit={submitSearch}
              className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-4 sm:px-6"
            >
              <Search
                size={20}
                className="shrink-0 text-[#8b632a]"
              />

              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Rechercher une tenue, un produit beauté..."
                className="min-w-0 flex-1 rounded-xl border border-[#eadcc8] bg-white px-4 py-3 text-sm text-[#491619] outline-none transition placeholder:text-[#b5a197] focus:border-[#bd9138] focus:ring-2 focus:ring-[#d9bd7b]/30"
                aria-label="Rechercher dans le catalogue"
              />

              <button
                type="submit"
                className="rounded-full bg-gradient-to-r from-[#651e22] to-[#421216] px-5 py-3 text-xs font-semibold text-white shadow-sm transition hover:shadow-md"
              >
                Chercher
              </button>

              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-[#542126] transition hover:bg-[#f1e5d4]"
                aria-label="Fermer la recherche"
              >
                <X size={18} />
              </button>
            </form>
          </div>
        )}
      </header>

      {/* Menu latéral mobile */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 xl:hidden">
          <button
            type="button"
            className="absolute inset-0 h-full w-full bg-[#260b0d]/60 backdrop-blur-[2px]"
            onClick={() => setMobileOpen(false)}
            aria-label="Fermer le menu"
          />

          <aside className="animate-slide-in absolute left-0 top-0 flex h-full w-[min(330px,88vw)] flex-col border-r border-[#d8b76b]/50 bg-[#fffaf5] p-5 shadow-2xl">
            <div className="mb-7 flex items-center justify-between border-b border-[#eadcc8] pb-5">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-full border border-[#d0a343] bg-[#50171b] text-[#e9c66d]">
                  <Crown size={12} className="absolute -translate-y-2.5" />
                  <span className="font-serif text-2xl font-bold">B</span>
                </div>
                <div>
                  <p className="font-serif text-xl font-semibold tracking-wide text-[#491619]">
                    BIWALI
                  </p>
                  <p className="mt-1 font-serif text-xs text-[#916b50]">
                    Couture&Beauty
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full text-[#542126] hover:bg-[#f2e5d4]"
                aria-label="Fermer le menu"
              >
                <X size={21} />
              </button>
            </div>

            <nav className="flex flex-col gap-2" aria-label="Menu mobile">
              {navItems.map((item) => {
                const Icon = item.icon;
                const selected = active === item.key;

                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => go(item.key)}
                    className={classNames(
                      'flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition',
                      selected
                        ? 'border-[#6d2a2d] bg-[#50171b] text-white shadow-md'
                        : 'border-transparent text-[#542126] hover:border-[#eadcc8] hover:bg-[#f5ead9]',
                    )}
                  >
                    <Icon
                      size={18}
                      className={selected ? 'text-[#e9c66d]' : 'text-[#a17a35]'}
                    />
                    {item.label}
                  </button>
                );
              })}
            </nav>

            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenAdmin();
              }}
              className="mt-4 flex items-center gap-3 rounded-xl border border-[#eadcc8] px-4 py-3 text-left text-sm text-[#542126] transition hover:bg-[#f5ead9] sm:hidden"
            >
              <Lock size={17} className="text-[#a17a35]" />
              Administration
            </button>

            <div className="mt-auto rounded-2xl border border-[#e6d4b6] bg-gradient-to-br from-[#f9f0e3] to-[#fffaf5] p-4 text-xs leading-6 text-[#79574b]">
              <p className="font-serif text-base font-semibold text-[#491619]">
                BIWALI Couture&Beauty
              </p>
              <div className="my-2 h-px bg-[#e4d0a8]" />
              <p>{state.settings.address}</p>
              <p>{state.settings.phoneDisplay}</p>
              <p className="mt-2 font-medium italic text-[#a27629]">
                L'authenticité africaine, une touche de modernité.
              </p>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
