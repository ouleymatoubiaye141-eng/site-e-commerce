import { useEffect, useState } from 'react';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Truck,
  ShieldCheck,
  Headset,
  Gift,
} from 'lucide-react';

type HeroProps = {
  onShop: () => void;
  onPromos: () => void;
};

const images = {
  woman: '/images/biwali/collection-femme.png',
  man: '/images/biwali/collection-homme.png',
  fashion: '/images/biwali/hero-mannequins.png',
  beauty: '/images/biwali/univers-beaute.png',
};

const slides = [
  {
    eyebrow: 'BIWALI · COUTURE & BEAUTY',
    title: 'L’élégance',
    italic: 'à votre image.',
    description: 'Mode, beauté et style africain, entre tradition et modernité.',
    button: 'Explorer la boutique',
    image: images.fashion,
  },
  {
    eyebrow: 'COLLECTIONS BIWALI',
    title: 'Affirmez',
    italic: 'votre style.',
    description: 'Des pièces sélectionnées pour révéler votre personnalité.',
    button: 'Découvrir les collections',
    image: images.woman,
  },
  {
    eyebrow: 'BEAUTÉ & BIEN-ÊTRE',
    title: 'Révélez',
    italic: 'votre éclat.',
    description: 'Découvrez notre sélection beauté et nos essentiels du quotidien.',
    button: 'Découvrir la beauté',
    image: images.beauty,
  },
];

export function Hero({ onShop, onPromos }: HeroProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrent((previous) => (previous + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  const slide = slides[current];

  const previous = () =>
    setCurrent((value) => (value - 1 + slides.length) % slides.length);

  const next = () =>
    setCurrent((value) => (value + 1) % slides.length);

  return (
    <div className="overflow-hidden bg-[#fff5f5] text-[#501426]">

      {/* HERO CARROUSEL */}
      <section className="relative min-h-[470px] overflow-hidden bg-[#f4a9bb] lg:min-h-[490px]">

        {/* Fond rose satiné */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 65% 35%, #ffe0e7 0%, transparent 45%),
              linear-gradient(125deg, #f7b8c7, #e987a2 50%, #f8c6d0)
            `,
          }}
        />

        <div className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(120deg, transparent 20%, rgba(255,255,255,.7) 42%, transparent 53%),
              linear-gradient(25deg, transparent 45%, rgba(255,255,255,.45) 52%, transparent 65%)
            `,
          }}
        />

        <div className="relative mx-auto grid min-h-[470px] max-w-[1500px] grid-cols-1 items-center lg:min-h-[490px] lg:grid-cols-[0.9fr_1.1fr]">

          {/* TEXTE */}
          <div className="relative z-20 px-7 py-14 sm:px-12 lg:pl-20 lg:pr-0">
            <p className="mb-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#941c43]">
              <span className="h-px w-8 bg-[#941c43]" />
              {slide.eyebrow}
            </p>

            <h1 className="font-serif text-5xl leading-[0.98] tracking-tight text-[#501426] sm:text-6xl xl:text-7xl">
              {slide.title}
              <span className="mt-1 block italic text-[#9e244e]">
                {slide.italic}
              </span>
            </h1>

            <p className="mt-6 max-w-md text-sm leading-6 text-[#542b38] sm:text-base">
              {slide.description}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <button
                onClick={onShop}
                className="inline-flex items-center gap-4 rounded-full bg-[#710e32] px-7 py-4 text-xs font-semibold text-white transition hover:bg-[#4e1026]"
              >
                {slide.button}
                <ArrowRight size={17} />
              </button>

              <button
                onClick={onPromos}
                className="rounded-full border border-[#8f2447] px-7 py-4 text-xs font-semibold text-[#701b38] transition hover:bg-white/40"
              >
                Voir les offres
              </button>
            </div>
          </div>

          {/* MANNEQUINS À DROITE */}
          <div className="absolute inset-y-0 right-0 hidden w-[56%] overflow-hidden lg:block">
            <img
              src={slide.image}
              alt="Collection BIWALI"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#ef9fb3]/30 via-transparent to-transparent" />
          </div>

          {/* FLÈCHES */}
          <button
            onClick={previous}
            aria-label="Diapositive précédente"
            className="absolute left-4 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#68152e] shadow transition hover:bg-white"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={next}
            aria-label="Diapositive suivante"
            className="absolute right-4 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#68152e] shadow transition hover:bg-white"
          >
            <ChevronRight size={24} />
          </button>

          {/* INDICATEURS */}
          <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 gap-2 lg:left-[68%]">
            {slides.map((item, index) => (
              <button
                key={item.eyebrow}
                onClick={() => setCurrent(index)}
                aria-label={`Afficher la diapositive ${index + 1}`}
                className={`h-2.5 rounded-full transition-all ${
                  current === index ? 'w-8 bg-white' : 'w-2.5 bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* BANDEAU SERVICES */}
      <section className="border-b border-[#f0c4cf] bg-[#fbe0e5]">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-5 px-5 py-5 md:grid-cols-4 md:px-10">

          {[
            { icon: Truck, title: 'Livraison rapide', detail: 'Partout au Sénégal' },
            { icon: ShieldCheck, title: 'Paiement sécurisé', detail: '100% fiable' },
            { icon: Headset, title: 'Service client', detail: 'À votre écoute' },
            { icon: Gift, title: 'Retours faciles', detail: 'Sous 7 jours' },
          ].map(({ icon: Icon, title, detail }) => (
            <div key={title} className="flex items-center justify-center gap-3">
              <Icon className="shrink-0 text-[#a51c4b]" size={29} />
              <div>
                <p className="text-xs font-bold text-[#501426]">{title}</p>
                <p className="mt-1 text-[11px] text-[#79515c]">{detail}</p>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* UNIVERS BIWALI */}
      <section className="relative mx-auto max-w-[1500px] px-5 py-12 sm:px-10 lg:px-12">

        <div className="mb-8 text-center">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#b12a55]">
            À découvrir
          </p>
          <h2 className="font-serif text-4xl text-[#501426] sm:text-5xl">
            Les univers BIWALI
          </h2>
          <div className="mx-auto mt-4 h-px w-20 bg-[#d58a9e]" />
        </div>

        <div className="grid gap-5 md:grid-cols-3">

          {[
            {
              title: 'Femme',
              description: 'Découvrez notre collection élégante',
              image: images.woman,
            },
            {
              title: 'Homme',
              description: 'Style et distinction au masculin',
              image: images.man,
            },
            {
              title: 'Beauté',
              description: 'Prenez soin de vous avec BIWALI',
              image: images.beauty,
            },
          ].map((category) => (
            <button
              key={category.title}
              onClick={onShop}
              className="group relative h-[220px] overflow-hidden rounded-2xl bg-[#8c294a] text-left"
            >
              <img
                src={category.image}
                alt={category.title}
                className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-[#68152f]/95 via-[#68152f]/55 to-transparent" />

              <div className="absolute bottom-0 left-0 p-7 text-white">
                <h3 className="font-serif text-4xl">{category.title}</h3>
                <p className="mt-2 max-w-[170px] text-xs leading-5 text-white/90">
                  {category.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 border-b border-white/70 pb-1 text-xs">
                  Découvrir <ArrowRight size={14} />
                </span>
              </div>
            </button>
          ))}

        </div>
      </section>
    </div>
  );
}
