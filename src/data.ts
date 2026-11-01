
import type { AppState } from './types';

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

// Produits de démonstration
const defaultProducts = [
  {
    id: 'p1',
    name: 'Boubou Bazin Royal',
    description: 'Boubou élégant pour les grandes occasions.',
    price: 45000,
    category: 'Femmes',
    image: img.femmeBazin,
    gallery: [img.femmeBazin],
    stock: 10,
  },
  {
    id: 'p2',
    name: 'Robe Wax Élégante',
    description: 'Robe en wax aux motifs africains.',
    price: 25000,
    category: 'Femmes',
    image: img.femmeWax,
    gallery: [img.femmeWax],
    stock: 12,
  },
  {
    id: 'p3',
    name: 'Ensemble Pagne Chic',
    description: 'Ensemble traditionnel pour vos cérémonies.',
    price: 35000,
    category: 'Femmes',
    image: img.femmePagne,
    gallery: [img.femmePagne],
    stock: 8,
  },
  {
    id: 'p4',
    name: 'Tenue de Cérémonie',
    description: 'Une tenue raffinée pour les événements.',
    price: 40000,
    category: 'Femmes',
    image: img.femmeElegant,
    gallery: [img.femmeElegant],
    stock: 6,
  },
  {
    id: 'p5',
    name: 'Boubou Homme Premium',
    description: 'Tenue traditionnelle masculine et élégante.',
    price: 40000,
    category: 'Hommes',
    image: img.hommeLavender,
    gallery: [img.hommeLavender],
    stock: 10,
  },
  {
    id: 'p6',
    name: 'Ensemble Dashiki',
    description: 'Style africain moderne et confortable.',
    price: 30000,
    category: 'Hommes',
    image: img.hommeDashiki,
    gallery: [img.hommeDashiki],
    stock: 7,
  },
  {
    id: 'p7',
    name: 'Tenue Traditionnelle',
    description: 'Une tenue soignée pour les occasions spéciales.',
    price: 38000,
    category: 'Hommes',
    image: img.hommeRwandan,
    gallery: [img.hommeRwandan],
    stock: 5,
  },
  {
    id: 'p8',
    name: 'Bazin Homme Prestige',
    description: 'Bazin élégant avec une finition raffinée.',
    price: 42000,
    category: 'Hommes',
    image: img.hommeBaz,
    gallery: [img.hommeBaz],
    stock: 6,
  },
  {
    id: 'p9',
    name: 'Crème de Beauté',
    description: 'Soin quotidien pour votre routine beauté.',
    price: 8000,
    category: 'Beauté',
    image: img.beautyCream,
    gallery: [img.beautyCream],
    stock: 20,
  },
  {
    id: 'p10',
    name: 'Kit Beauté',
    description: 'Accessoires pour compléter votre routine.',
    price: 12000,
    category: 'Beauté',
    image: img.beautyFlat,
    gallery: [img.beautyFlat],
    stock: 15,
  },
  {
    id: 'p11',
    name: 'Sérum Visage',
    description: 'Sérum pour votre routine de soin.',
    price: 10000,
    category: 'Beauté',
    image: img.beautySerum,
    gallery: [img.beautySerum],
    stock: 18,
  },
  {
    id: 'p12',
    name: 'Gel de Soin',
    description: 'Gel pour compléter vos soins quotidiens.',
    price: 6500,
    category: 'Beauté',
    image: img.beautyGel,
    gallery: [img.beautyGel],
    stock: 20,
  },
  {
    id: 'p13',
    name: 'Primer Beauté',
    description: 'Base de maquillage pour une finition soignée.',
    price: 9000,
    category: 'Beauté',
    image: img.beautyPrimer,
    gallery: [img.beautyPrimer],
    stock: 10,
  },
  {
    id: 'p14',
    name: 'Soin Salon',
    description: 'Produit de soin pour votre routine beauté.',
    price: 15000,
    category: 'Beauté',
    image: img.beautySalon,
    gallery: [img.beautySalon],
    stock: 10,
  },
];

export function getInitialState(): AppState {
  return {
    settings: {
      storeName: 'BIWALI Couture&Beauty',
      heroImage,
    },
    products: defaultProducts,
    orders: [],
    notifications: [],
    zones: [],
    adminUnlocked: false,
  } as unknown as AppState;
}
