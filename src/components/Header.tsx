import { useState } from 'react';
import {
  Menu,
  ShoppingBag,
  Bell,
  Lock,
  X,
  Search,
} from 'lucide-react';
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

const navItems: {
  key: Category | 'all' | 'promo';
  label: string;
}[] = [
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

  const iconButton =
    'relative flex h-10 w-10 items-center justify-center text-[#542d3b] transition-colors hover:text-[#b56f83] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c58d99]';

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[#eee4e2] bg-[#fffdfb]">
        {/* Barre d'annonce */}
        <div className="hidden border-b border-[#eee4e2] bg-[#542d3b] px-4 py-2 text-center text-[10px] font-medium uppercase tracking-[0.19em] text-white sm:block">
          BIWALI — L'élégance, au quotidien
        </div>

        {/* En-tête principal */}
        <div className="mx-auto flex h-[76px] max-w-[1500px] items-center justify-between px-4 sm:px-7 lg:h-[88px] lg:px-10">
          {/* Menu mobile */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className={`${iconButton} lg:hidden`}
            aria-label="Ouvrir le menu"
          >
            <Menu size={23} strokeWidth={1.5} />
          </button>

          {/* Logo */}
          <button
            type="button"
            onClick={() => go('all')}
            className="flex shrink-0 flex-col items-center text-center"
            aria-label="BIWALI Couture and Beauty - Accueil"
          >
            <span className="font-serif text-[27px] font-semibold leading-none tracking-[0.16em] text-[#542d3b] sm:text-[31px]">
              BIWALI
            </span>
            <span className="mt-1.5 text-[8px] font-medium uppercase tracking-[0.29em] text-[#98747d] sm:text-[9px]">
              C O U T U R E &nbsp; B E A U T Y
            </span>
          </button>

          {/* Navigation ordinateur */}
          <nav
            className="hidden h-full items-center gap-5 lg:flex xl:gap-8"
            aria-label="Navigation principale"
          >
            {navItems.map((item) => {
              const selected = active === item.key;

              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => go(item.key)}
                  aria-current={selected ? 'page' : undefined}
                  className={`relative flex h-full items-center whitespace-nowrap text-[12px] font-medium tracking-[0.035em] transition-colors xl:text-[13px] ${
                    selected
                      ? 'text-[#542d3b]'
                      : 'text-[#65565a] hover:text-[#b56f83]'
                  }`}
                >
                  {item.label}

                  <span
                    className={`absolute bottom-[23px] left-0 h-[1.5px] bg-[#b56f83] transition-all duration-300 ${
                      selected ? 'w-full' : 'w-0'
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen((open) => !open)}
              className={iconButton}
              aria-label="Rechercher"
              aria-expanded={searchOpen}
            >
              <Search size={20} strokeWidth={1.5} />
            </button>

            <button
              type="button"
              onClick={onOpenNotifs}
              className={iconButton}
              aria-label={`Notifications, ${unread} non lues`}
            >
              <Bell size={19} strokeWidth={1.5} />
              {unread > 0 && (
                <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#b56f83] px-1 text-[9px] text-white">
                  {unread > 9 ? '9+' : unread}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={onOpenAdmin}
              className={`${iconButton} hidden sm:flex`}
              aria-label="Administration"
              title="Administration"
            >
              <Lock size={17} strokeWidth={1.5} />
            </button>

            <button
              type="button"
              onClick={onOpenCart}
              className={`${iconButton} ml-1`}
              aria-label={`Panier, ${cartCount} article(s)`}
            >
              <ShoppingBag size={21} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute right-0 top-0 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#542d3b] px-1 text-[9px] font-semibold text-white">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Navigation mobile */}
        <nav
          className="flex items-center justify-center gap-5 overflow-x-auto border-t border-[#f0e8e6] px-4 py-3 lg:hidden"
          aria-label="Catégories"
        >
          {navItems.map((item) => {
            const selected = active === item.key;

            return (
              <button
                key={item.key}
                type="button"
                onClick={() => go(item.key)}
                aria-current={selected ? 'page' : undefined}
                className={`shrink-0 whitespace-nowrap text-[11px] font-medium tracking-wide transition-colors ${
                  selected
                    ? 'text-[#542d3b]'
                    : 'text-[#76676b] hover:text-[#b56f83]'
                }`}
              >
                {item.label}
                {selected && (
                  <span className="mx-auto mt-1 block h-[2px] w-4 bg-[#b56f83]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Barre de recherche */}
        {searchOpen && (
          <div className="border-t border-[#eee4e2] bg-[#fffdfb]">
            <form
              onSubmit={submitSearch}
              className="mx-auto flex max-w-4xl items-center gap-3 px-4 py-5 sm:px-8"
            >
              <Search size={19} className="shrink-0 text-[#98747d]" />

              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Rechercher un article..."
                className="min-w-0 flex-1 border-b border-[#dfd1d1] bg-transparent px-1 py-3 text-sm text-[#542d3b] outline-none placeholder:text-[#aa9b9d] focus:border-[#b56f83]"
                aria-label="Rechercher dans le catalogue"
              />

              <button
                type="submit"
                className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[#542d3b] transition-colors hover:text-[#b56f83]"
              >
                Rechercher
              </button>

              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="p-2 text-[#76676b] hover:text-[#542d3b]"
                aria-label="Fermer la recherche"
              >
                <X size={19} />
              </button>
            </form>
          </div>
        )}
      </header>

      {/* Menu latéral mobile */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 h-full w-full bg-[#24151b]/50"
            onClick={() => setMobileOpen(false)}
            aria-label="Fermer le menu"
          />

          <aside className="absolute left-0 top-0 flex h-full w-[min(340px,88vw)] flex-col bg-[#fffdfb] px-6 py-7 shadow-2xl">
            <div className="mb-9 flex items-center justify-between border-b border-[#eee4e2] pb-6">
              <div>
                <p className="font-serif text-2xl font-semibold tracking-[0.15em] text-[#542d3b]">
                  BIWALI
                </p>
                <p className="mt-1 text-[9px] uppercase tracking-[0.22em] text-[#98747d]">
                  Couture & Beauty
                </p>
              </div>

              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="p-2 text-[#542d3b]"
                aria-label="Fermer"
              >
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>

            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ad8991]">
              Découvrir nos collections
            </p>

            <nav className="flex flex-col" aria-label="Menu mobile">
              {navItems.map((item) => {
                const selected = active === item.key;

                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => go(item.key)}
                    aria-current={selected ? 'page' : undefined}
                    className={`flex items-center justify-between border-b border-[#f0e8e6] py-4 text-left font-serif text-lg transition-colors ${
                      selected
                        ? 'text-[#b56f83]'
                        : 'text-[#542d3b] hover:text-[#b56f83]'
                    }`}
                  >
                    {item.label}
                    {selected && (
                      <span className="h-1.5 w-1.5 rounded-full bg-[#b56f83]" />
                    )}
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
              className="mt-6 flex items-center gap-3 py-3 text-sm text-[#76676b] sm:hidden"
            >
              <Lock size={16} />
              Administration
            </button>

            <div className="mt-auto border-t border-[#eee4e2] pt-5">
              <p className="font-serif text-base text-[#542d3b]">
                BIWALI Couture & Beauty
              </p>
              <p className="mt-3 text-xs leading-6 text-[#85777a]">
                {state.settings.address}
                <br />
                {state.settings.phoneDisplay}
              </p>
              <p className="mt-4 font-serif text-sm italic text-[#b56f83]">
                L'authenticité africaine, une touche de modernité.
              </p>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
