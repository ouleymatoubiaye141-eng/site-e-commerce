import { Instagram, Facebook, MapPin, Phone, Mail, MessageCircle } from 'lucide-react';
import { useShop } from '@/ShopContext';

interface FooterProps {
  onNavigate: (cat: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const { state } = useShop();
  const s = state.settings;
  return (
    <footer className="bg-bordeaux-950 text-cream-200 mt-16">
      <div className="container-page py-12 grid gap-8 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-full bg-gold-400 grid place-items-center text-bordeaux-950 font-serif font-bold">T</div>
            <span className="font-serif text-xl text-cream-50">{s.shopName}</span>
          </div>
          <p className="text-sm text-cream-300/80 leading-relaxed">{s.tagline}. Mode tradi-moderne & beauté, fièrement sénégalaise.</p>
          <div className="flex gap-2 mt-4">
            {s.social?.instagram && (
              <a href={`https://instagram.com/${s.social.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-bordeaux-800 hover:bg-gold-500 hover:text-bordeaux-950 transition grid place-items-center" aria-label="Instagram">
                <Instagram size={16} />
              </a>
            )}
            {s.social?.facebook && (
              <a href="#" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-bordeaux-800 hover:bg-gold-500 hover:text-bordeaux-950 transition grid place-items-center" aria-label="Facebook">
                <Facebook size={16} />
              </a>
            )}
            <a href={`https://wa.me/${s.whatsapp}`} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-bordeaux-800 hover:bg-gold-500 hover:text-bordeaux-950 transition grid place-items-center" aria-label="WhatsApp">
              <MessageCircle size={16} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-serif text-lg text-cream-50 mb-3">Boutique</h4>
          <ul className="space-y-2 text-sm">
            {['all', 'femmes', 'hommes', 'beaute', 'accessoires', 'promo'].map((c) => (
              <li key={c}>
                <button onClick={() => onNavigate(c)} className="text-cream-300 hover:text-gold-300 transition capitalize">
                  {c === 'all' ? 'Accueil' : c === 'beaute' ? 'Beauté' : c}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-lg text-cream-50 mb-3">Aide & infos</h4>
          <ul className="space-y-2 text-sm text-cream-300">
            <li>Livraison: Dakar & régions</li>
            <li>Paiement: Wave, Orange Money, Free Money, livraison</li>
            <li>Commandes via WhatsApp</li>
            <li>Retrait sur place (Sandaga) sur RDV</li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-lg text-cream-50 mb-3">Contact</h4>
          <ul className="space-y-2 text-sm text-cream-300">
            <li className="flex items-center gap-2"><MapPin size={14} /> {s.address}</li>
            <li className="flex items-center gap-2"><Phone size={14} /> {s.phoneDisplay}</li>
            <li className="flex items-center gap-2"><Mail size={14} /> {s.email}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-bordeaux-800">
        <div className="container-page py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-cream-400">
          <p>© {new Date().getFullYear()} {s.shopName}. Tous droits réservés.</p>
          <p>Site de démonstration — données stockées localement (LocalStorage).</p>
        </div>
      </div>
    </footer>
  );
}
