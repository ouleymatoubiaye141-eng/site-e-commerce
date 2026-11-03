
import type { AppState, Product } from './types';

// Images de BIWALI Couture&Beauty
const img = {
  femmeBazin:
    'https://images.pexels.com/photos/33293788/pexels-photo-33293788.jpeg?auto=compress&cs=tinysrgb&w=900',
  femmeWax:
    'https://images.pexels.com/photos/16169342/pexels-photo-16169342.jpeg?auto=compress&cs=tinysrgb&w=900',
  femmePagne:
    'https://images.pexels.com/photos/33806684/pexels-photo-33806684.jpeg?auto=compress&cs=tinysrgb&w=900',
  femmeElegant:
    'https://images.pexels.com/photos/33293788/pexels-photo-33293788.jpeg?auto=compress&cs=tinysrgb&w=900',
  femmeField:
    'https://images.pexels.com/photos/33806684/pexels-photo-33806684.jpeg?auto=compress&cs=tinysrgb&w=900',
  femmeGreen:
    'https://images.pexels.com/photos/16169342/pexels-photo-16169342.jpeg?auto=compress&cs=tinysrgb&w=900',
  femmeNigerian:
    'https://images.pexels.com/photos/33806684/pexels-photo-33806684.jpeg?auto=compress&cs=tinysrgb&w=900',
  femmeDark:
    'https://images.pexels.com/photos/33293788/pexels-photo-33293788.jpeg?auto=compress&cs=tinysrgb&w=900',

  hommeLavender:
    'https://images.pexels.com/photos/37766536/pexels-photo-37766536.jpeg?auto=compress&cs=tinysrgb&w=900',
  hommeDashiki:
    'https://images.pexels.com/photos/8526759/pexels-photo-8526759.jpeg?auto=compress&cs=tinysrgb&w=900',
  hommeRwandan:
    'https://images.pexels.com/photos/34417801/pexels-photo-34417801.jpeg?auto=compress&cs=tinysrgb&w=900',
  hommeBaz:
    'https://images.pexels.com/photos/35013624/pexels-photo-35013624.jpeg?auto=compress&cs=tinysrgb&w=900',

  beautyCream:
    'https://images.pexels.com/photos/16008945/pexels-photo-16008945.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  beautyFlat:
    'https://images.pexels.com/photos/5632335/pexels-photo-5632335.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  beautySerum:
    'https://images.pexels.com/photos/16233812/pexels-photo-16233812.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  beautyGel:
    'https://images.pexels.com/photos/23940099/pexels-photo-23940099.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  beautyPrimer:
    'https://images.pexels.com/photos/30836145/pexels-photo-30836145.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  beautySalon:
    'https://images.pexels.com/photos/17891766/pexels-photo-17891766.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',

  fabric:
    'https://images.pexels.com/photos/38487457/pexels-photo-38487457.jpeg?auto=compress&cs=tinysrgb&w=900',
  fabricMarket:
    'https://images.pexels.com/photos/39916892/pexels-photo-39916892.jpeg?auto=compress&cs=tinysrgb&w=900',
  fabricBright:
    'https://images.pexels.com/photos/33293788/pexels-photo-33293788.jpeg?auto=compress&cs=tinysrgb&w=900',
};

export const heroImage = img.fabricBright;

// Produits de démonstration BIWALI
const defaultProducts: Product[] = [
  {
    id: 'p1', name: 'Boubou Bazin Royal',
    description: 'Boubou élégant pour les grandes occasions.',
    price: 45000, category: 'femmes', image: img.femmeBazin,
    gallery: [img.femmeBazin], sizes: [], colors: [],
    stock: { default: 10 }, lowStockThreshold: 3,
  },
  {
    id: 'p2', name: 'Robe Wax Élégante',
    description: 'Robe en wax aux motifs africains.',
    price: 25000, category: 'femmes', image: img.femmeWax,
    gallery: [img.femmeWax], sizes: [], colors: [],
    stock: { default: 12 }, lowStockThreshold: 3,
  },
  {
    id: 'p3', name: 'Ensemble Pagne Chic',
    description: 'Ensemble traditionnel pour vos cérémonies.',
    price: 35000, category: 'femmes', image: img.femmePagne,
    gallery: [img.femmePagne], sizes: [], colors: [],
    stock: { default: 8 }, lowStockThreshold: 3,
  },
  {
    id: 'p4', name: 'Tenue de Cérémonie',
    description: 'Une tenue raffinée pour les événements.',
    price: 40000, category: 'femmes', image: img.femmeElegant,
    gallery: [img.femmeElegant], sizes: [], colors: [],
    stock: { default: 6 }, lowStockThreshold: 3,
  },
  {
    id: 'p5', name: 'Boubou Homme Premium',
    description: 'Tenue traditionnelle masculine et élégante.',
    price: 40000, category: 'hommes', image: img.hommeLavender,
    gallery: [img.hommeLavender], sizes: [], colors: [],
    stock: { default: 10 }, lowStockThreshold: 3,
  },
  {
    id: 'p6', name: 'Ensemble Dashiki',
    description: 'Style africain moderne et confortable.',
    price: 30000, category: 'hommes', image: img.hommeDashiki,
    gallery: [img.hommeDashiki], sizes: [], colors: [],
    stock: { default: 7 }, lowStockThreshold: 3,
  },
  {
    id: 'p7', name: 'Tenue Traditionnelle',
    description: 'Une tenue soignée pour les occasions spéciales.',
    price: 38000, category: 'hommes', image: img.hommeRwandan,
    gallery: [img.hommeRwandan], sizes: [], colors: [],
    stock: { default: 5 }, lowStockThreshold: 3,
  },
  {
    id: 'p8', name: 'Bazin Homme Prestige',
    description: 'Bazin élégant avec une finition raffinée.',
    price: 42000, category: 'hommes', image: img.hommeBaz,
    gallery: [img.hommeBaz], sizes: [], colors: [],
    stock: { default: 6 }, lowStockThreshold: 3,
  },
  {
    id: 'p9', name: 'Crème de Beauté',
    description: 'Soin quotidien pour votre routine beauté.',
    price: 8000, category: 'beaute', image: img.beautyCream,
    gallery: [img.beautyCream], sizes: [], colors: [],
    stock: { default: 20 }, lowStockThreshold: 3,
  },
  {
    id: 'p10', name: 'Kit Beauté',
    description: 'Accessoires pour compléter votre routine.',
    price: 12000, category: 'beaute', image: img.beautyFlat,
    gallery: [img.beautyFlat], sizes: [], colors: [],
    stock: { default: 15 }, lowStockThreshold: 3,
  },
  {
    id: 'p11', name: 'Sérum Visage',
    description: 'Sérum pour votre routine de soin.',
    price: 10000, category: 'beaute', image: img.beautySerum,
    gallery: [img.beautySerum], sizes: [], colors: [],
    stock: { default: 18 }, lowStockThreshold: 3,
  },
  {
    id: 'p12', name: 'Gel de Soin',
    description: 'Gel pour compléter vos soins quotidiens.',
    price: 6500, category: 'beaute', image: img.beautyGel,
    gallery: [img.beautyGel], sizes: [], colors: [],
    stock: { default: 20 }, lowStockThreshold: 3,
  },
  {
    id: 'p13', name: 'Primer Beauté',
    description: 'Base de maquillage pour une finition soignée.',
    price: 9000, category: 'beaute', image: img.beautyPrimer,
    gallery: [img.beautyPrimer], sizes: [], colors: [],
    stock: { default: 10 }, lowStockThreshold: 3,
  },
  {
    id: 'p14', name: 'Soin Salon',
    description: 'Produit de soin pour votre routine beauté.',
    price: 15000, category: 'beaute', image: img.beautySalon,
    gallery: [img.beautySalon], sizes: [], colors: [],
    stock: { default: 10 }, lowStockThreshold: 3,
  },
];

export function getInitialState(): AppState {
  return {
    settings: {
      shopName: 'BIWALI Couture&Beauty',
      tagline: 'L’élégance au quotidien.',
      whatsapp: '',
      email: '',
      phoneDisplay: '',
      address: 'Sénégal',
      heroImage,
      primaryColor: '#7d2323',
      currency: 'FCFA',
      adminPassword: 'BIWALI2026',
      social: {},
      freeDeliveryThreshold: 0,
    },
    products: defaultProducts,
    orders: [],
    notifications: [],
    zones: [],
    adminUnlocked: false,
  };
}

