import { useState } from 'react';
import { ShopProvider } from '@/ShopContext';
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
import type { Category } from '@/types';
import type { Order } from '@/types';
import { defaultFilters, type Filters } from '@/components/FiltersBar';

type View = 'shop' | 'orders';

function AppContent() {
  const [view, setView] = useState<View>('shop');
  const [activeCat, setActiveCat] = useState<Category | 'all' | 'promo'>('all');
  const [search, setSearch] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [notifsOpen, setNotifsOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [successOrder, setSuccessOrder] = useState<Order | null>(null);

  const catalogFilters: Partial<Filters> = {
    ...defaultFilters,
    category: activeCat,
    search,
  };

  const navigate = (cat: Category | 'all' | 'promo') => {
    setView('shop');
    setActiveCat(cat);
    setSearch('');
    document.getElementById('catalogue')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSearch = (q: string) => {
    setView('shop');
    setSearch(q);
    setActiveCat('all');
    document.getElementById('catalogue')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream-50">
      <Header
        onOpenCart={() => setCartOpen(true)}
        onOpenNotifs={() => setNotifsOpen(true)}
        onNavigate={navigate}
        active={activeCat}
        onOpenAdmin={() => setAdminOpen(true)}
        onSearch={handleSearch}
      />

      <main className="flex-1">
        {view === 'shop' && (
          <>
            <Hero
              onShop={() => document.getElementById('catalogue')?.scrollIntoView({ behavior: 'smooth' })}
              onPromos={() => navigate('promo')}
            />
            <Catalog initialFilters={catalogFilters} />
          </>
        )}

        {view === 'orders' && <OrdersView />}
      </main>

      <Footer onNavigate={(c) => { setView('shop'); navigate(c as Category | 'all'); }} />

      {/* Sticky "Suivi commande" quick access */}
      {view === 'shop' && (
        <button
          onClick={() => setView('orders')}
          className="fixed bottom-5 left-5 z-30 btn-ghost bg-cream-50 shadow-soft text-xs px-4 py-2.5 border border-cream-300 hover:bg-cream-100"
        >
          Suivi de commande
        </button>
      )}

      {/* Drawers & modals */}
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={() => { setCartOpen(false); setCheckoutOpen(true); }}
      />
      <CheckoutDrawer
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        onBack={() => { setCheckoutOpen(false); setCartOpen(true); }}
        onOrdered={(o) => { setCheckoutOpen(false); setSuccessOrder(o); }}
      />
      <NotificationsDrawer open={notifsOpen} onClose={() => setNotifsOpen(false)} />
      <AdminPanel open={adminOpen} onClose={() => setAdminOpen(false)} />
      <OrderSuccessModal
        order={successOrder}
        onClose={() => setSuccessOrder(null)}
        onHome={() => { setView('shop'); setActiveCat('all'); }}
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
