import { Instagram, Facebook, MapPin, Phone, Mail, MessageCircle } from 'lucide-react';
import { useShop } from '@/ShopContext';

interface FooterProps { onNavigate: (cat: string) => void; }

export function Footer({ onNavigate }: FooterProps) {
  const { state } = useShop();
  const s = state.settings;
  return (
    <footer className="mt-0 bg-[#512b3a] text-[#f9eeee]">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-6 py-16 sm:px-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-16">
        <div>
          <p className="font-serif text-3xl tracking-[0.08em]">BIWALI</p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-[#e2b9c0]">Couture & Beauty</p>
          <p className="mt-6 max-w-xs text-sm leading-7 text-[#ead6da]">{s.tagline} Mode, beauté et élégance africaine contemporaine.</p>
          <div className="mt-6 flex gap-3">
            {s.social?.instagram && <a href={`https://instagram.com/${s.social.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="border border-white/25 p-2.5 hover:bg-white/10"><Instagram size={16}/></a>}
            {s.social?.facebook && <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="border border-white/25 p-2.5 hover:bg-white/10"><Facebook size={16}/></a>}
            {!!s.whatsapp && <a href={`https://wa.me/${s.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="border border-white/25 p-2.5 hover:bg-white/10"><MessageCircle size={16}/></a>}
          </div>
        </div>
        <div>
          <h4 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#e2b9c0]">La boutique</h4>
          <ul className="space-y-3 text-sm text-[#f5e6e8]">
            {['all','femmes','hommes','beaute','accessoires','promo'].map(c => <li key={c}><button onClick={() => onNavigate(c)} className="transition hover:text-white">{c === 'all' ? 'Accueil' : c === 'beaute' ? 'Beauté' : c === 'promo' ? 'Promotions' : c[0].toUpperCase()+c.slice(1)}</button></li>)}
          </ul>
        </div>
        <div>
          <h4 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#e2b9c0]">Informations</h4>
          <ul className="space-y-3 text-sm leading-6 text-[#f5e6e8]"><li>Livraison à Dakar et en régions</li><li>Paiement selon les options proposées à la commande</li><li>Commandes et renseignements sur WhatsApp</li></ul>
        </div>
        <div>
          <h4 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#e2b9c0]">Nous contacter</h4>
          <ul className="space-y-4 text-sm text-[#f5e6e8]">
            <li className="flex items-start gap-3"><MapPin size={15} className="mt-1 shrink-0"/> {s.address}</li>
            {s.phoneDisplay && <li className="flex items-center gap-3"><Phone size={15}/> {s.phoneDisplay}</li>}
            {s.email && <li className="flex items-center gap-3"><Mail size={15}/> {s.email}</li>}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-2 px-6 py-5 text-[11px] text-[#e2cbd0] sm:flex-row sm:px-10 lg:px-16">
          <p>© {new Date().getFullYear()} {s.shopName}. Tous droits réservés.</p>
          <p>BIWALI Couture & Beauty · Sénégal</p>
        </div>
      </div>
    </footer>
  );
}
