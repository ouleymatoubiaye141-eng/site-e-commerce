import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import type {
  AppNotification,
  AppState,
  CartItem,
  Customer,
  DeliveryZone,
  Order,
  OrderStatus,
  PaymentMethod,
  Product,
  Settings,
} from './types';
import { loadState, resetState, saveState } from './store';
import { genRef, uid } from './utils';

interface Toast {
  id: string;
  message: string;
  kind: 'success' | 'info' | 'error';
}

interface ShopContextValue {
  state: AppState;
  cart: CartItem[];
  toasts: Toast[];
  // cart
  addToCart: (product: Product, size: string, color: string, qty: number) => boolean;
  updateCartQty: (productId: string, size: string, color: string, qty: number) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  // stock
  productStock: (product: Product, size: string, color: string) => number;
  decrementStock: (items: CartItem[]) => void;
  // orders
  placeOrder: (customer: Customer, zone: DeliveryZone, payment: PaymentMethod) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  confirmDelivery: (orderId: string) => void;
  markOrderReadByAdmin: (orderId: string) => void;
  // notifications
  notifications: AppNotification[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  pushNotification: (n: Omit<AppNotification, 'id' | 'createdAt' | 'read'>) => void;
  // admin
  unlockAdmin: (password: string) => boolean;
  lockAdmin: () => void;
  // settings & products
  updateSettings: (s: Settings) => void;
  addProduct: (p: Omit<Product, 'id'>) => void;
  updateProduct: (p: Product) => void;
  deleteProduct: (id: string) => void;
  restockProduct: (id: string, variant: string, qty: number) => void;
  resetShop: () => void;
  // toast helper
  toast: (message: string, kind?: Toast['kind']) => void;
  dismissToast: (id: string) => void;
}

const ShopContext = createContext<ShopContextValue | null>(null);

const CART_KEY = 'teranga-cart-v1';

export function ShopProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(() => loadState());
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY) ?? '[]') as CartItem[];
    } catch {
      return [];
    }
  });
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  // Persist state (debounced via effect)
  useEffect(() => {
    saveState(state);
  }, [state]);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  const toast = useCallback((message: string, kind: Toast['kind'] = 'success') => {
    const id = uid('toast');
    setToasts((t) => [...t, { id, message, kind }]);
    toastTimers.current[id] = setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
      delete toastTimers.current[id];
    }, 3500);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((t) => t.filter((x) => x.id !== id));
    if (toastTimers.current[id]) {
      clearTimeout(toastTimers.current[id]);
      delete toastTimers.current[id];
    }
  }, []);

  const productStock = useCallback(
    (product: Product, size: string, color: string): number => {
      const key = product.sizes.length <= 1 && product.colors.length <= 1 ? 'default' : `${size}|${color}`;
      return product.stock[key] ?? 0;
    },
    [],
  );

  const addToCart = useCallback(
    (product: Product, size: string, color: string, qty: number): boolean => {
      const key = `${size}|${color}`;
      const available = product.stock[key] ?? product.stock['default'] ?? 0;
      if (available < qty) {
        toast(`Stock insuffisant pour ${product.name}`, 'error');
        return false;
      }
      setCart((prev) => {
        const idx = prev.findIndex(
          (i) => i.productId === product.id && i.size === size && i.color === color,
        );
        if (idx >= 0) {
          const next = [...prev];
          const newQty = next[idx].qty + qty;
          if (newQty > available) {
            toast('Quantité dépasse le stock disponible', 'error');
            return prev;
          }
          next[idx] = { ...next[idx], qty: newQty };
          return next;
        }
        return [
          ...prev,
          {
            productId: product.id,
            name: product.name,
            image: product.image,
            price: product.promoPrice ?? product.price,
            size,
            color,
            qty,
          },
        ];
      });
      toast(`${product.name} ajouté au panier`);
      return true;
    },
    [toast],
  );

  const updateCartQty = useCallback((productId: string, size: string, color: string, qty: number) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.productId === productId && i.size === size && i.color === color
            ? { ...i, qty: Math.max(0, qty) }
            : i,
        )
        .filter((i) => i.qty > 0),
    );
  }, []);

  const removeFromCart = useCallback((productId: string, size: string, color: string) => {
    setCart((prev) => prev.filter((i) => !(i.productId === productId && i.size === size && i.color === color)));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const decrementStock = useCallback((items: CartItem[]) => {
    setState((prev) => ({
      ...prev,
      products: prev.products.map((p) => {
        if (!items.some((i) => i.productId === p.id)) return p;
        const stock = { ...p.stock };
        for (const it of items) {
          if (it.productId !== p.id) continue;
          const key = `${it.size}|${it.color}`;
          stock[key] = Math.max(0, (stock[key] ?? 0) - it.qty);
        }
        return { ...p, stock };
      }),
    }));
  }, []);

  const pushNotification = useCallback(
    (n: Omit<AppNotification, 'id' | 'createdAt' | 'read'>) => {
      setState((prev) => ({
        ...prev,
        notifications: [
          { ...n, id: uid('notif'), createdAt: Date.now(), read: false },
          ...prev.notifications,
        ].slice(0, 60),
      }));
    },
    [],
  );

  const makeNotif = (
    type: AppNotification['type'],
    title: string,
    message: string,
    orderId?: string,
  ): AppNotification => ({
    id: uid('notif'),
    type,
    title,
    message,
    createdAt: Date.now(),
    read: false,
    orderId,
  });

  const placeOrder = useCallback(
    (customer: Customer, zone: DeliveryZone, payment: PaymentMethod): Order => {
      const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
      const deliveryFee =
        state.settings.freeDeliveryThreshold > 0 && subtotal >= state.settings.freeDeliveryThreshold
          ? 0
          : zone.fee;
      const total = subtotal + deliveryFee;
      const order: Order = {
        id: uid('order'),
        ref: genRef(),
        items: cart,
        customer,
        zone,
        payment,
        subtotal,
        deliveryFee,
        total,
        status: 'en_attente',
        createdAt: Date.now(),
        updatedAt: Date.now(),
        readByAdmin: false,
      };
      decrementStock(cart);
      setCart([]);
      setState((prev) => ({
        ...prev,
        orders: [order, ...prev.orders],
        notifications: [
          makeNotif(
            'order',
            'Nouvelle commande reçue',
            `Commande ${order.ref} — ${order.items.length} article(s), total ${total.toLocaleString('fr-FR')} FCFA.`,
            order.id,
          ),
          ...prev.notifications,
        ].slice(0, 60),
      }));
      return order;
    },
    [cart, decrementStock, state.settings.freeDeliveryThreshold],
  );

  const updateOrderStatus = useCallback(
    (orderId: string, status: OrderStatus) => {
      setState((prev) => ({
        ...prev,
        orders: prev.orders.map((o) =>
          o.id === orderId ? { ...o, status, updatedAt: Date.now() } : o,
        ),
        notifications:
          status === 'confirmee'
            ? [
                makeNotif('order', 'Commande confirmée', `Votre commande a été confirmée. Statut: ${status}.`, orderId),
                ...prev.notifications,
              ].slice(0, 60)
            : prev.notifications,
      }));
    },
    [],
  );

  const confirmDelivery = useCallback((orderId: string) => {
    setState((prev) => ({
      ...prev,
      orders: prev.orders.map((o) =>
        o.id === orderId ? { ...o, deliveryConfirmed: true, status: 'livree', updatedAt: Date.now() } : o,
      ),
      notifications: [
        makeNotif('delivery', 'Livraison confirmée', 'Le client a confirmé la bonne réception de la commande.', orderId),
        ...prev.notifications,
      ].slice(0, 60),
    }));
  }, []);

  const markOrderReadByAdmin = useCallback((orderId: string) => {
    setState((prev) => ({
      ...prev,
      orders: prev.orders.map((o) => (o.id === orderId ? { ...o, readByAdmin: true } : o)),
    }));
  }, []);

  const markNotificationRead = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      notifications: prev.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    }));
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setState((prev) => ({
      ...prev,
      notifications: prev.notifications.map((n) => ({ ...n, read: true })),
    }));
  }, []);

  const unlockAdmin = useCallback(
    (password: string): boolean => {
      if (password === state.settings.adminPassword) {
        setState((prev) => ({ ...prev, adminUnlocked: true }));
        return true;
      }
      toast('Mot de passe incorrect', 'error');
      return false;
    },
    [state.settings.adminPassword, toast],
  );

  const lockAdmin = useCallback(() => setState((prev) => ({ ...prev, adminUnlocked: false })), []);

  const updateSettings = useCallback((s: Settings) => {
    setState((prev) => ({ ...prev, settings: s }));
  }, []);

  const addProduct = useCallback((p: Omit<Product, 'id'>) => {
    setState((prev) => ({ ...prev, products: [{ ...p, id: uid('prod') }, ...prev.products] }));
  }, []);

  const updateProduct = useCallback((p: Product) => {
    setState((prev) => ({ ...prev, products: prev.products.map((x) => (x.id === p.id ? p : x)) }));
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setState((prev) => ({ ...prev, products: prev.products.filter((x) => x.id !== id) }));
  }, []);

  const restockProduct = useCallback((id: string, variant: string, qty: number) => {
    setState((prev) => ({
      ...prev,
      products: prev.products.map((p) =>
        p.id === id ? { ...p, stock: { ...p.stock, [variant]: (p.stock[variant] ?? 0) + qty } } : p,
      ),
    }));
  }, []);

  const resetShop = useCallback(() => {
    setState(resetState());
    setCart([]);
  }, []);

  const cartCount = useMemo(() => cart.reduce((s, i) => s + i.qty, 0), [cart]);
  const cartSubtotal = useMemo(() => cart.reduce((s, i) => s + i.price * i.qty, 0), [cart]);

  const value: ShopContextValue = {
    state,
    cart,
    toasts,
    addToCart,
    updateCartQty,
    removeFromCart,
    clearCart,
    cartCount,
    cartSubtotal,
    productStock,
    decrementStock,
    placeOrder,
    updateOrderStatus,
    confirmDelivery,
    markOrderReadByAdmin,
    notifications: state.notifications,
    markNotificationRead,
    markAllNotificationsRead,
    pushNotification,
    unlockAdmin,
    lockAdmin,
    updateSettings,
    addProduct,
    updateProduct,
    deleteProduct,
    restockProduct,
    resetShop,
    toast,
    dismissToast,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop(): ShopContextValue {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error('useShop must be used within ShopProvider');
  return ctx;
}
