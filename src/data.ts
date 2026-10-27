import type { AppState, Product, Settings, DeliveryZone } from './types';

const img = {
  // Femmes — robes & tenues tradi-modernes
  femmeBazin: 'https://images.pexels.com/photos/20009925/pexels-photo-20009925.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  femmeWax: 'https://images.pexels.com/photos/10698019/pexels-photo-10698019.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  femmePagne: 'https://images.pexels.com/photos/38400973/pexels-photo-38400973.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  femmeElegant: 'https://images.pexels.com/photos/32730554/pexels-photo-32730554.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  femmeField: 'https://images.pexels.com/photos/33536933/pexels-photo-33536933.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  femmeGreen: 'https://images.pexels.com/photos/33287569/pexels-photo-33287569.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  femmeNigerian: 'https://images.pexels.com/photos/17747713/pexels-photo-17747713.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  femmeDark: 'https://images.pexels.com/photos/40414986/pexels-photo-40414986.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  // Hommes
  hommeLavender: 'https://images.pexels.com/photos/39731536/pexels-photo-39731536.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  hommeDashiki: 'https://images.pexels.com/photos/6190984/pexels-photo-6190984.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  hommeRwandan: 'https://images.pexels.com/photos/39660537/pexels-photo-39660537.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  hommeBaz: 'https://images.pexels.com/photos/30729642/pexels-photo-30729642.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  // Beauté
  beautyCream: 'https://images.pexels.com/photos/16008945/pexels-photo-16008945.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  beautyFlat: 'https://images.pexels.com/photos/5632335/pexels-photo-5632335.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  beautySerum: 'https://images.pexels.com/photos/16233812/pexels-photo-16233812.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  beautyGel: 'https://images.pexels.com/photos/23940099/pexels-photo-23940099.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  beautyPrimer: 'https://images.pexels.com/photos/30836145/pexels-photo-30836145.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  beautySalon: 'https://images.pexels.com/photos/17891766/pexels-photo-17891766.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  // Tissus / hero
  fabric: 'https://images.pexels.com/photos/38487457/pexels-photo-38487457.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  fabricMarket: 'https://images.pexels.com/photos/39916892/pexels-photo-39916892.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  fabricBright: 'https://images.pexels.com/photos/35633192/pexels-photo-35633192.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
};

export const heroImage = img.fabricBright;

const defaultSettings: Settings = {
  shopName: 'Téranga Boutique',
  tagline: 'Mode tradi-moderne & beauté sénégalaise',
  whatsapp: '221770000000',
  email: 'contact@teranga-boutique.sn',
  phoneDisplay: '+221 77 000 00 00',
  address: 'Marché Sandaga, Dakar, Sénégal',
  heroImage,
  primaryColor: '#5e1a1a',
  currency: 'FCFA',
  adminPassword: 'admin',
  social: {
    instagram: '@teranga.boutique',
    facebook: 'Téranga Boutique',
    tiktok: '@teranga.boutique',
  },
  freeDeliveryThreshold: 50000,
};

const defaultZones: DeliveryZone[] = [
  { id: 'dakar', name: 'Dakar (intra-ville)', fee: 1500, delay: '24 à 48h' },
  { id: 'banlieue', name: 'Banlieue dakaroise (Pikine, Guédiawaye)', fee: 2500, delay: '48 à 72h' },
  { id: 'regions', name: 'Régions (Thiès, Saint-Louis, Ziguinchor...)', fee: 4000, delay: '3 à 5 jours' },
  { id: 'rettrait', name: 'Retrait sur place (Sandaga)', fee: 0, delay: 'Sous 24h, sur rendez-vous' },
];

const SIZES_CLOTHES = ['S', 'M', 'L', 'XL', 'XXL'];
const SIZES_DRESS = ['34', '36', '38', '40', '42', '44'];
const COLORS_BAZIN = [
  { name: 'Bordeaux', hex: '#7d2323' },
  { name: 'Or', hex: '#d49a1f' },
  { name: 'Émeraude', hex: '#1f6b4a' },
  { name: 'Indigo', hex: '#2d3a6b' },
];

function stockFull(sizes: string[], colors: { name: string; hex: string }[], qty = 8): Record<string, number> {
  const s: Record<string, number> = {};
  for (const sz of sizes) {
    for (const c of colors) {
      s[`${sz}|${c.name}`] = qty + Math.floor(Math.random() * 6);
    }
  }
  return s;
}

const defaultProducts: Product[] = [
  {
    id: 'p1',
    name: 'Robe Bazin Riche — "Sapaye"',
    category: 'femmes',
    price: 45000,
    promoPrice: 38000,
    description:
      'Robe bazin riche brodée à la main, coupe tradi-moderne ajustée. Tissu premium importé, finitions dorées. Idéale pour cérémonies, mariages et fêtes religieuses.',
    image: img.femmeBazin,
    gallery: [img.femmeBazin, img.femmeElegant, img.fabric],
    sizes: SIZES_DRESS,
    colors: COLORS_BAZIN,
    stock: stockFull(SIZES_DRESS, COLORS_BAZIN),
    lowStockThreshold: 3,
    featured: true,
  },
  {
    id: 'p2',
    name: 'Ensemble Wax Print — Tendance',
    category: 'femmes',
    price: 32000,
    description:
      'Ensemble deux pièces en wax 100% coton, motifs authentiques. Haut ajustable et jupe taille haute. Style afro-contemporain.',
    image: img.femmeWax,
    gallery: [img.femmeWax, img.femmeNigerian],
    sizes: SIZES_CLOTHES,
    colors: COLORS_BAZIN,
    stock: stockFull(SIZES_CLOTHES, COLORS_BAZIN, 6),
    lowStockThreshold: 3,
    featured: true,
  },
  {
    id: 'p3',
    name: 'Boubou Tradi-Moderne Femme',
    category: 'femmes',
    price: 28000,
    description:
      'Boubou ample et élégant, confort optimal. Parfait pour le quotidien chic ou les sorties. Tissu léger et respirant.',
    image: img.femmePagne,
    gallery: [img.femmePagne, img.femmeGreen],
    sizes: SIZES_CLOTHES,
    colors: COLORS_BAZIN,
    stock: stockFull(SIZES_CLOTHES, COLORS_BAZIN, 5),
    lowStockThreshold: 3,
    featured: false,
  },
  {
    id: 'p4',
    name: 'Tenue Cérémonie — Édition Or',
    category: 'femmes',
    price: 65000,
    promoPrice: 55000,
    description:
      'Tenue de cérémonie haut de gamme avec broderies dorées. Pièce unique, confectionnée sur mesure possible.',
    image: img.femmeElegant,
    gallery: [img.femmeElegant, img.femmeDark],
    sizes: SIZES_DRESS,
    colors: [
      { name: 'Bordeaux', hex: '#7d2323' },
      { name: 'Or', hex: '#d49a1f' },
    ],
    stock: stockFull(SIZES_DRESS, [{ name: 'Bordeaux', hex: '#7d2323' }, { name: 'Or', hex: '#d49a1f' }], 4),
    lowStockThreshold: 2,
    featured: true,
  },
  {
    id: 'p5',
    name: 'Robe Wax Champêtre',
    category: 'femmes',
    price: 24500,
    description: 'Robe légère en wax pour un look décontracté et lumineux. Idéale en saison sèche.',
    image: img.femmeField,
    sizes: SIZES_CLOTHES,
    colors: COLORS_BAZIN,
    stock: stockFull(SIZES_CLOTHES, COLORS_BAZIN, 7),
    lowStockThreshold: 3,
  },
  {
    id: 'p6',
    name: 'Grand Boubou Homme — Bazin',
    category: 'hommes',
    price: 38000,
    description:
      'Grand boubou bazin homme, broderie discrète. Élégance sénégalaise pour prières, cérémonies et événements officiels.',
    image: img.hommeLavender,
    gallery: [img.hommeLavender, img.hommeBaz],
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Bordeaux', hex: '#7d2323' },
      { name: 'Indigo', hex: '#2d3a6b' },
      { name: 'Crème', hex: '#ddc28f' },
    ],
    stock: stockFull(['M', 'L', 'XL', 'XXL'], [{ name: 'Bordeaux', hex: '#7d2323' }, { name: 'Indigo', hex: '#2d3a6b' }, { name: 'Crème', hex: '#ddc28f' }], 6),
    lowStockThreshold: 2,
    featured: true,
  },
  {
    id: 'p7',
    name: 'Dashiki Slim Homme',
    category: 'hommes',
    price: 22000,
    promoPrice: 18500,
    description: 'Dashiki coupe slim, motifs traditionnels. Look afro-urbain pour les sorties décontractées.',
    image: img.hommeDashiki,
    sizes: SIZES_CLOTHES,
    colors: [
      { name: 'Émeraude', hex: '#1f6b4a' },
      { name: 'Bordeaux', hex: '#7d2323' },
      { name: 'Or', hex: '#d49a1f' },
    ],
    stock: stockFull(SIZES_CLOTHES, [{ name: 'Émeraude', hex: '#1f6b4a' }, { name: 'Bordeaux', hex: '#7d2323' }, { name: 'Or', hex: '#d49a1f' }], 8),
    lowStockThreshold: 3,
  },
  {
    id: 'p8',
    name: 'Ensemble Tradi Homme — Style Rwandais',
    category: 'hommes',
    price: 30000,
    description: 'Ensemble tradi-moderne avec pantalon et tunique structurée. Coupe contemporaine.',
    image: img.hommeRwandan,
    sizes: ['M', 'L', 'XL'],
    colors: [
      { name: 'Indigo', hex: '#2d3a6b' },
      { name: 'Crème', hex: '#ddc28f' },
    ],
    stock: stockFull(['M', 'L', 'XL'], [{ name: 'Indigo', hex: '#2d3a6b' }, { name: 'Crème', hex: '#ddc28f' }], 5),
    lowStockThreshold: 2,
  },
  {
    id: 'p9',
    name: 'Crème Hydratante Karité',
    category: 'beaute',
    price: 8500,
    promoPrice: 6500,
    description:
      'Crème hydratante au beurre de karité pur. Nourrit la peau en profondeur, éclat durable. Fabriqué au Sénégal.',
    image: img.beautyCream,
    gallery: [img.beautyCream, img.beautySalon],
    sizes: ['100ml', '200ml'],
    colors: [{ name: 'Standard', hex: '#cea965' }],
    stock: stockFull(['100ml', '200ml'], [{ name: 'Standard', hex: '#cea965' }], 12),
    lowStockThreshold: 4,
    featured: true,
  },
  {
    id: 'p10',
    name: "Coffret Soin Éclat — Édition Or",
    category: 'beaute',
    price: 19000,
    description: "Coffret complet : sérum éclat, crème jour, masque. Routine beauté éclatante en 3 étapes.",
    image: img.beautyFlat,
    sizes: ['Coffret'],
    colors: [{ name: 'Standard', hex: '#d49a1f' }],
    stock: stockFull(['Coffret'], [{ name: 'Standard', hex: '#d49a1f' }], 9),
    lowStockThreshold: 3,
    featured: true,
  },
  {
    id: 'p11',
    name: 'Sérum Visage Éclat',
    category: 'beaute',
    price: 12000,
    description: 'Sérum concentré vitamine C et actifs naturels. Unifie le teint et illumine.',
    image: img.beautySerum,
    sizes: ['30ml', '50ml'],
    colors: [{ name: 'Standard', hex: '#cea965' }],
    stock: stockFull(['30ml', '50ml'], [{ name: 'Standard', hex: '#cea965' }], 10),
    lowStockThreshold: 4,
  },
  {
    id: 'p12',
    name: 'Gel Nettoyant Doux',
    category: 'beaute',
    price: 6000,
    description: 'Gel nettoyant sans savon, respecte la barrière cutanée. Peaux sensibles.',
    image: img.beautyGel,
    sizes: ['150ml'],
    colors: [{ name: 'Standard', hex: '#cea965' }],
    stock: stockFull(['150ml'], [{ name: 'Standard', hex: '#cea965' }], 15),
    lowStockThreshold: 5,
  },
  {
    id: 'p13',
    name: 'Primer Base Teint',
    category: 'beaute',
    price: 9500,
    promoPrice: 7500,
    description: 'Base de teint grip primer. Tenue longue durée, fini lisse et lumineux.',
    image: img.beautyPrimer,
    sizes: ['30ml'],
    colors: [{ name: 'Standard', hex: '#cea965' }],
    stock: stockFull(['30ml'], [{ name: 'Standard', hex: '#cea965' }], 7),
    lowStockThreshold: 3,
  },
  {
    id: 'p14',
    name: 'Foulard Wax Premium',
    category: 'accessoires',
    price: 7500,
    description: 'Foulard en wax premium, idéal pour accessoires et coiffure. Couleurs vives et durables.',
    image: img.fabric,
    sizes: ['Unique'],
    colors: [
      { name: 'Bordeaux', hex: '#7d2323' },
      { name: 'Or', hex: '#d49a1f' },
      { name: 'Émeraude', hex: '#1f6b4a' },
    ],
    stock: stockFull(['Unique'], [{ name: 'Bordeaux', hex: '#7d2323' }, { name: 'Or', hex: '#d49a1f' }, { name: 'Émeraude', hex: '#1f6b4a' }], 14),
    lowStockThreshold: 5,
    featured: false,
  },
];

export function getInitialState(): AppState {
  return {
    settings: defaultSettings,
    products: defaultProducts,
    orders: [],
    notifications: [
      {
        id: 'n0',
        type: 'system',
        title: 'Bienvenue sur Téranga Boutique',
        message: 'Boutique de démonstration — explorez le catalogue et passez commande via WhatsApp.',
        createdAt: Date.now(),
        read: false,
      },
    ],
    zones: defaultZones,
    adminUnlocked: false,
  };
}
