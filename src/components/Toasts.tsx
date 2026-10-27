import { CheckCircle2, Info, X, AlertCircle } from 'lucide-react';
import { useShop } from '@/ShopContext';
import { classNames } from '@/utils';

export function Toasts() {
  const { toasts, dismissToast } = useShop();
  if (!toasts.length) return null;
  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 w-[calc(100vw-2rem)] max-w-sm pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={classNames(
            'pointer-events-auto flex items-start gap-3 rounded-2xl px-4 py-3 shadow-soft animate-slide-in border',
            t.kind === 'success' && 'bg-emerald-50 border-emerald-200 text-emerald-900',
            t.kind === 'info' && 'bg-cream-50 border-cream-300 text-bordeaux-900',
            t.kind === 'error' && 'bg-bordeaux-50 border-bordeaux-200 text-bordeaux-900',
          )}
        >
          {t.kind === 'success' && <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-600" />}
          {t.kind === 'info' && <Info size={18} className="mt-0.5 shrink-0 text-gold-600" />}
          {t.kind === 'error' && <AlertCircle size={18} className="mt-0.5 shrink-0 text-bordeaux-600" />}
          <p className="flex-1 text-sm">{t.message}</p>
          <button onClick={() => dismissToast(t.id)} className="opacity-50 hover:opacity-100" aria-label="Fermer">
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
