import { useEffect, useState } from 'react';
import {
  Compass, Heart, Home, ShoppingBag, User,
  Package, MessageCircle, Mail, MapPin,
} from 'lucide-react';

import { ShopProvider, useShop } from '@/ShopContext';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Catalog } from '@/components/Catalog';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { CheckoutDrawer } from '@/components/CheckoutDrawer';
import { NotificationsDrawer } from '@/components/NotificationsDrawer';
import { OrderSuccessModal } from '@/components/OrderSuccessModal';
import { OrdersView } from '@/components/OrdersView';
import { AdminPanel } from '@/components/AdminPanel';
import { Toasts } from '@/components/Toasts';

import type { Category, Order } from '@/types';
import { defaultFilters, type Filters } from '@/components/FiltersBar';

type View = 'shop' | 'explore' | 'orders' | 'favorites' | 'profile';

const FAVORITES_KEY = 'biwali-favorites-v1';

function AppContent() {
  const { state, cartCount } = useShop();

  const [view, setView] = useState<View>('shop');
  const [activeCat, setActiveCat] = useState<Category | 'all' | 'promo'>('all');
  const [search, setSearch] = useState('');

  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_KEY);
      return saved ? JSON.parse(saved) as string[] : [];
    } catch {
      return [];
    }
  });

  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [notifsOpen, setNotifsOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [successOrder, setSuccessOrder] = useState<Order | null>(null);

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  const catalogFilters: Partial<Filters> = {
    ...defaultFilters,
    category: activeCat,
    search,
  };

  const navigate = (category: Category | 'all' | 'promo') => {
    setView('shop');
    setActiveCat(category);
    setSearch('');

    window.setTimeout(() => {
      document.getElementById('catalogue')?.scrollIntoView({
        behavior: 'smooth',
      });
    }, 0);
  };

  const handleSearch = (query: string) => {
    setView('shop');
    setSearch(query);
    setActiveCat('all');

    window.setTimeout(() => {
      document.getElementById('catalogue')?.scrollIntoView({
        behavior: 'smooth',
      });
    }, 0);
  };

  const toggleFavorite = (productId: string) => {
    setFavoriteIds((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId],
    );
  };

  const openShop = () => {
    setView('shop');
    setActiveCat('all');
    setSearch('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openExplore = () => {
    setView('explore');
    setActiveCat('all');
    setSearch('');

    window.setTimeout(() => {
      document.getElementById('catalogue')?.scrollIntoView({
        behavior: 'smooth',
      });
    }, 0);
  };

  const whatsapp = state.settings.whatsapp.replace(/\D/g, '');

  const mobileNav = [
    {
      id: 'shop' as const,
      label: 'Accueil',
      icon: Home,
      action: openShop,
    },
    {
      id: 'explore' as const,
      label: 'Explorer',
      icon: Compass,
      action: openExplore,
    },
    {
      id: 'favorites' as const,
      label: 'Favoris',
      icon: Heart,
      action: () => setView('favorites'),
      badge: favoriteIds.length,
    },
    {
      id: 'cart' as const,
      label: 'Panier',
      icon: ShoppingBag,
      action: () => setCartOpen(true),
      badge: cartCount,
    },
    {
      id: 'profile' as const,
      label: 'Profil',
      icon: User,
      action: () => setView('profile'),
    },
  ];

  const showShop = view === 'shop' || view === 'explore';

  return (
    <div className="min-h-screen flex flex-col bg-cream-50 pb-20 md:pb-0">

      <Header
        onOpenCart={() => setCartOpen(true)}
        onOpenNotifs={() => setNotifsOpen(true)}
        onNavigate={navigate}
        active={activeCat}
        onOpenAdmin={() => setAdminOpen(true)}
        onSearch={handleSearch}
      />

      <main className="flex-1">

        {showShop && (
          <>
            {view === 'shop' && (
              <Hero
                onShop={openExplore}
                onPromos={() => navigate('promo')}
                onCategory={navigate}
              />
            )}

            <Catalog
              initialFilters={catalogFilters}
              favoriteIds={favoriteIds}
              onToggleFavorite={toggleFavorite}
            />
          </>
        )}

        {view === 'favorites' && (
          <Catalog
            initialFilters={{
              ...defaultFilters,
              category: 'all',
              search: '',
            }}
            favoriteIds={favoriteIds}
            onToggleFavorite={toggleFavorite}
            favoritesOnly
          />
        )}

        {view === 'orders' && <OrdersView />}

        {view === 'profile' && (
          <section className="container-page max-w-3xl py-12 md:py-16">

            <div className="mb-8 text-center">
              <span className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-[#f1e2e3] text-[#512b3a]">
                <User size={28} strokeWidth={1.5} />
              </span>

              <h1 className="section-title">Votre espace</h1>

              <p className="mt-2 text-sm text-bordeaux-600">
                Retrouvez vos commandes et les informations de BIWALI.
              </p>
            </div>

            <div className="space-y-3">

              <button
                type="button"
                onClick={() => setView('orders')}
                className="flex w-full items-center gap-4 rounded-2xl border border-cream-200 bg-white p-5 text-left shadow-sm transition hover:border-[#c99ba5]"
              >
                <span className="grid h-11 w-11 place-items-center rounded-full bg-[#f8eff0] text-[#71394d]">
                  <Package size={20} />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-bordeaux-900">
                    Suivi de commande
                  </span>
                  <span className="mt-1 block text-xs text-bordeaux-500">
                    Consultez vos commandes sur cet appareil.
                  </span>
                </span>

                <span className="text-sm font-semibold text-bordeaux-700">
                  {state.orders.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setView('favorites')}
                className="flex w-full items-center gap-4 rounded-2xl border border-cream-200 bg-white p-5 text-left shadow-sm transition hover:border-[#c99ba5]"
              >
                <span className="grid h-11 w-11 place-items-center rounded-full bg-[#f8eff0] text-[#71394d]">
                  <Heart size={20} />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-bordeaux-900">
                    Mes favoris
                  </span>
                  <span className="mt-1 block text-xs text-bordeaux-500">
                    Vos articles enregistrés.
                  </span>
                </span>

                <span className="text-sm font-semibold text-bordeaux-700">
                  {favoriteIds.length}
                </span>
              </button>

            </div>

            <div className="mt-8 rounded-2xl border border-cream-200 bg-white p-5 sm:p-6">
              <h2 className="font-serif text-xl text-bordeaux-900">
                Contacter BIWALI
              </h2>

              <p className="mt-1 text-sm text-bordeaux-600">
                Une question sur un article ou une commande ?
              </p>

              <div className="mt-5 flex flex-wrap gap-3">

                {whatsapp && (
                  <a
                    href={`https://wa.me/${whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary"
                  >
                    <MessageCircle size={16} /> WhatsApp
                  </a>
                )}

                {state.settings.email && (
                  <a
                    href={`mailto:${state.settings.email}`}
                    className="btn-outline"
                  >
                    <Mail size={16} /> E-mail
                  </a>
                )}

                {state.settings.address && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-cream-100 px-4 py-2 text-xs text-bordeaux-700">
                    <MapPin size={15} /> {state.settings.address}
                  </span>
                )}

                {!whatsapp && !state.settings.email && (
                  <p className="text-sm text-bordeaux-500">
                    Les coordonnées de contact seront bientôt disponibles.
                  </p>
                )}

              </div>
            </div>

            <p className="mt-5 text-center text-xs leading-5 text-bordeaux-400">
              Espace de démonstration : vos favoris et commandes sont
              enregistrés localement sur cet appareil. Aucun compte client
              n’est créé.
            </p>

          </section>
        )}

      </main>

      <Footer
        onNavigate={(category) => {
          setView('shop');
          navigate(category as Category | 'all');
        }}
      />

      {/* Navigation mobile fixe */}
      <nav
        className="fixed inset-x-0 bottom-0 z-40 border-t border-[#eadfdd] bg-[#fffdfb] px-1 pb-[max(env(safe-area-inset-bottom),8px)] pt-2 shadow-[0_-5px_24px_rgba(63,37,45,0.07)] md:hidden"
        aria-label="Navigation mobile"
      >
        <div className="mx-auto grid max-w-lg grid-cols-5">

          {mobileNav.map((item) => {
            const Icon = item.icon;
            const active = item.id === view;

            return (
              <button
                key={item.id}
                type="button"
                onClick={item.action}
                aria-current={active ? 'page' : undefined}
                className={`relative flex min-h-14 flex-col items-center justify-center gap-1 text-[10px] font-medium transition-colors ${
                  active ? 'text-[#71394d]' : 'text-[#8a777d]'
                }`}
              >
                <span className="relative">
                  <Icon size={20} strokeWidth={active ? 2 : 1.6} />

                  {'badge' in item && (item.badge ?? 0) > 0 && (
                    <span className="absolute -right-2 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-[#b56f83] px-1 text-[9px] font-semibold text-white">
                      {(item.badge ?? 0) > 9 ? '9+' : (item.badge ?? 0)}
                    </span>
                  )}
                </span>

                <span>{item.label}</span>

                {active && (
                  <span className="absolute bottom-0 h-0.5 w-5 rounded-full bg-[#b56f83]" />
                )}
              </button>
            );
          })}

        </div>
      </nav>

      {/* Fenêtres et panneaux */}
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />

      <CheckoutDrawer
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        onBack={() => {
          setCheckoutOpen(false);
          setCartOpen(true);
        }}
        onOrdered={(order) => {
          setCheckoutOpen(false);
          setSuccessOrder(order);
        }}
      />

      <NotificationsDrawer
        open={notifsOpen}
        onClose={() => setNotifsOpen(false)}
      />

      <AdminPanel
        open={adminOpen}
        onClose={() => setAdminOpen(false)}
      />

      <OrderSuccessModal
        order={successOrder}
        onClose={() => setSuccessOrder(null)}
        onHome={openShop}
      />

      <Toasts />
    </div>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}
