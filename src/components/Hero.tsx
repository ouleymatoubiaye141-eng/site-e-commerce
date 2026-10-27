import { ArrowRight, Sparkles, Truck, ShieldCheck } from 'lucide-react';
import { useShop } from '@/ShopContext';

interface HeroProps {
  onShop: () => void;
  onPromos: () => void;
}

export function Hero({ onShop, onPromos }: HeroProps) {
  const { state } = useShop();
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={state.settings.heroImage}
          alt="Tissus africains"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bordeaux-950/90 via-bordeaux-900/70 to-bordeaux-900/30" />
      </div>

      <div className="relative container-page py-20 md:py-32 lg:py-40">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-gold-400/20 text-gold-200 px-4 py-1.5 text-xs font-medium uppercase tracking-widest border border-gold-400/30 animate-fade-up">
            <Sparkles size={14} /> Nouvelle collection 2026
          </span>
          <h1 className="mt-5 font-serif text-4xl md:text-6xl lg:text-7xl text-cream-50 leading-[1.05] animate-fade-up">
            L'élégance sénégalaise,<br />
            <span className="text-gold-300">tradi-moderne &</span> lumineuse.
          </h1>
          <p className="mt-5 text-cream-200 text-lg max-w-xl animate-fade-up leading-relaxed">
            Vêtements bazin & wax, soins de beauté naturels. Confectionnés avec passion,
            livrés partout au Sénégal. Paiement Wave, Orange Money, Free Money ou à la livraison.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 animate-fade-up">
            <button onClick={onShop} className="btn-gold">
              Découvrir le catalogue <ArrowRight size={16} />
            </button>
            <button onClick={onPromos} className="btn-ghost text-cream-50 hover:bg-bordeaux-700 border border-cream-200/40">
              Voir les promotions
            </button>
          </div>

          <div className="mt-10 flex flex-wrap gap-6 text-cream-200 text-sm animate-fade-up">
            <span className="flex items-center gap-2"><Truck size={16} className="text-gold-300" /> Livraison Dakar & régions</span>
            <span className="flex items-center gap-2"><ShieldCheck size={16} className="text-gold-300" /> Paiement sécurisé à la livraison</span>
          </div>
        </div>
      </div>
    </section>
  );
}
