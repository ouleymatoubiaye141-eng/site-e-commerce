export type Category = 'femmes' | 'hommes' | 'beaute' | 'accessoires';

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number; // FCFA
  promoPrice?: number | null;
  description: string;
  image: string;
  gallery?: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  stock: Record<string, number>; // key: "size|color" or "default"
  lowStockThreshold: number;
  featured?: boolean;
}

export interface CartItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  size: string;
  color: string;
  qty: number;
}

export type PaymentMethod = 'wave' | 'orange_money' | 'free_money' | 'cash';
export type OrderStatus =
  | 'en_attente'
  | 'confirmee'
  | 'en_preparation'
  | 'expediee'
  | 'livree'
  | 'annulee';

export interface DeliveryZone {
  id: string;
  name: string;
  fee: number;
  delay: string;
}

export interface Customer {
  name: string;
  phone: string;
  address: string;
  city: string;
  notes?: string;
}

export interface Order {
  id: string;
  ref: string;
  items: CartItem[];
  customer: Customer;
  zone: DeliveryZone;
  payment: PaymentMethod;
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  createdAt: number;
  updatedAt: number;
  readByAdmin?: boolean;
  deliveryConfirmed?: boolean;
}

export interface AppNotification {
  id: string;
  type: 'order' | 'delivery' | 'stock' | 'system';
  title: string;
  message: string;
  createdAt: number;
  read: boolean;
  orderId?: string;
}

export interface Settings {
  shopName: string;
  tagline: string;
  whatsapp: string; // phone with country code, no +
  email: string;
  phoneDisplay: string;
  address: string;
  heroImage: string;
  primaryColor: string;
  currency: string;
  adminPassword: string;
  social: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
  };
  freeDeliveryThreshold: number; // 0 = disabled
}

export interface AppState {
  settings: Settings;
  products: Product[];
  orders: Order[];
  notifications: AppNotification[];
  zones: DeliveryZone[];
  adminUnlocked: boolean;
}
