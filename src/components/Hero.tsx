import { useEffect, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Category } from '@/types';

type HeroProps = {
  onShop: () => void;
  onPromos: () => void;
  onCategory?: (category: Category) => void;
};

const slides = [
  {
    title: 'L’Afrique, dans toute son élégance.',
    subtitle: 'L’allure qui raconte une histoire.',
    image: '/images/biwali/editorial-africain-femme.jpg',
    position: 'center 42%',
  },
  {
    title: 'L’élégance est un héritage.',
    subtitle: 'Des silhouettes qui ne passent pas inaperçues.',
    image: '/images/biwali/collection-femme-africaine.jpg',
    position: 'center 35%',
  },
  {
    title: 'Le style a son caractère.',
    subtitle: 'Une autre vision de l’élégance masculine.',
    image: '/images/biwali/collection-homme-africain.jpg',
    position: 'center 35%',
  },
];

const collections = [
  {
    title: 'Femme',
    subtitle: 'Élégance & caractère',
    image: '/images/biwali/collection-femme-africaine.jpg',
    category: 'femmes' as Category,
  },
  {
    title: 'Homme',
    subtitle: 'Style & distinction',
    image: '/images/biwali/collection-homme-africain.jpg',
    category: 'hommes' as Category,
  },
  {
    title: 'Beauté',
    subtitle: 'L’art de prendre soin de soi',
    image: '/images/biwali/editorial-beaute.jpg',
    category: 'beaute' as Category,
  },
];

export function Hero({ onShop, onPromos, onCategory }: HeroProps) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;

    const timer = window.setInterval(() => {
      setCurrent((value) => (value + 1) % slides.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, [paused]);

  const previous = () =>
    setCurrent((value) => (value - 1 + slides.length) % slides.length);

  const next = () =>
    setCurrent((value) => (value + 1) % slides.length);

  const slide = slides[current];

  return (
    <div className="overflow-hidden bg-white">
      <style>{`
        @keyframes biwaliFadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes biwaliKenBurns {
          from { transform: scale(1.04); }
          to { transform: scale(1.12); }
        }
        .biwali-fade-up {
          animation: biwaliFadeUp .8s cubic-bezier(.2,.7,.2,1) both;
        }
        .biwali-hero-image {
          animation: biwaliKenBurns 7s ease-out both;
        }
        .biwali-collection-card img {
          transition: transform .9s cubic-bezier(.2,.7,.2,1), filter .5s ease;
        }
        .biwali-collection-card:hover img {
          transform: scale(1.07);
          filter: saturate(1.08);
        }
        @media (prefers-reduced-motion: reduce) {
          .biwali-fade-up, .biwali-hero-image {
            animation: none !important;
          }
          .biwali-collection-card img {
            transition: none !important;
          }
        }
      `}</style>

      {/* Grande campagne éditoriale */}
      <section
        className="relative h-[min(76vh,720px)] min-h-[470px] overflow-hidden bg-[#292321]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {slides.map((item, index) => (
          <img
            key={item.image}
            src={item.image}
            alt={item.title}
            fetchPriority={index === 0 ? 'high' : 'auto'}
            loading={index === 0 ? 'eager' : 'lazy'}
            style={{ objectPosition: item.position }}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ${
              current === index ? 'opacity-100 biwali-hero-image' : 'opacity-0'
            }`}
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />

        <div
          key={current}
          className="absolute inset-x-0 bottom-0 px-6 pb-20 pt-24 text-white sm:px-12 sm:pb-24 lg:px-20"
        >
          <div className="biwali-fade-up max-w-2xl">
            <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.32em] text-white/80 sm:text-xs">
              BIWALI · COUTURE & BEAUTY
            </p>

            <h1 className="max-w-2xl font-serif text-[2.65rem] leading-[1.08] sm:text-6xl lg:text-7xl">
              {slide.title}
            </h1>

            <p className="mt-4 max-w-md text-sm text-white/85 sm:text-base">
              {slide.subtitle}
            </p>

            <button
              type="button"
              onClick={onShop}
              className="mt-8 inline-flex items-center gap-4 border-b border-white/80 pb-3 text-[10px] font-semibold uppercase tracking-[0.2em] transition-all duration-300 hover:gap-7"
            >
              Découvrir la collection
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Commandes du carrousel */}
        <div className="absolute bottom-7 right-5 flex items-center gap-3 sm:right-10">
          <span className="text-[11px] tracking-widest text-white/90">
            0{current + 1} <span className="text-white/50">/ 0{slides.length}</span>
          </span>

          <button
            type="button"
            onClick={previous}
            aria-label="Image précédente"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/50 text-white backdrop-blur-sm transition duration-300 hover:bg-white hover:text-black"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            type="button"
            onClick={next}
            aria-label="Image suivante"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/50 text-white backdrop-blur-sm transition duration-300 hover:bg-white hover:text-black"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Indicateurs */}
        <div className="absolute bottom-10 left-6 flex gap-2 sm:left-12 lg:left-20">
          {slides.map((item, index) => (
            <button
              key={item.image}
              type="button"
              onClick={() => setCurrent(index)}
              aria-label={`Afficher l'image ${index + 1}`}
              className={`h-[2px] transition-all duration-500 ${
                current === index ? 'w-9 bg-white' : 'w-4 bg-white/40'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Collections */}
      <section className="mx-auto max-w-[1500px] px-4 py-12 sm:px-8 sm:py-16 lg:px-12">
        <div className="mb-7 flex items-end justify-between sm:mb-9">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#71394d]">
              L’univers BIWALI
            </p>
            <h2 className="mt-2 font-serif text-3xl text-[#241b1e] sm:text-4xl">
              Nos collections
            </h2>
          </div>

          <button
            type="button"
            onClick={onShop}
            className="mb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#71394d] transition hover:tracking-[0.2em]"
          >
            Tout explorer →
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-5 lg:gap-7">
          {collections.map((item, index) => (
            <button
              key={item.title}
              type="button"
              onClick={() =>
                onCategory ? onCategory(item.category) : onShop()
              }
              className="biwali-collection-card group relative aspect-[3/4] overflow-hidden bg-[#eee9e4] text-left"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <img
                src={item.image}
                alt={`Collection ${item.title} BIWALI`}
                loading="lazy"
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent transition-opacity duration-500 group-hover:from-black/75" />

              <div className="absolute inset-x-0 bottom-0 p-3 text-white sm:p-6">
                <p className="mb-1 hidden text-[9px] uppercase tracking-[0.18em] text-white/75 sm:block">
                  {item.subtitle}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-serif text-lg sm:text-3xl">
                    {item.title}
                  </span>
                  <span className="grid h-7 w-7 place-items-center rounded-full border border-white/70 transition-all duration-300 group-hover:translate-x-1 group-hover:bg-white group-hover:text-black sm:h-9 sm:w-9">
                    <ArrowRight size={15} />
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Signature */}
      <div className="mx-auto flex max-w-[1500px] items-center justify-between border-y border-black/5 px-4 py-6 sm:px-8 sm:py-8 lg:px-12">
        <div>
          <p className="font-serif text-xl text-[#241b1e] sm:text-2xl">
            Une sélection. Votre style.
          </p>
          <p className="mt-1 text-[10px] tracking-wide text-gray-500 sm:text-xs">
            L’élégance se porte, elle se raconte.
          </p>
        </div>

        <button
          type="button"
          onClick={onPromos}
          className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#71394d] transition hover:tracking-[0.2em]"
        >
          Voir les offres →
        </button>
      </div>
    </div>
  );
}
