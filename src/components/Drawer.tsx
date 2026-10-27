import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { X } from 'lucide-react';
import { classNames } from '@/utils';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  children: ReactNode;
  side?: 'right' | 'bottom';
  width?: string;
}

export function Drawer({ open, onClose, title, children, side = 'right', width = 'max-w-md' }: DrawerProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex" role="dialog" aria-modal="true">
      <div
        className="absolute inset-0 bg-bordeaux-950/50 backdrop-blur-sm animate-fade-up"
        onClick={onClose}
      />
      <div
        className={classNames(
          'relative z-10 bg-cream-50 shadow-soft animate-slide-in flex flex-col',
          side === 'right' ? `h-full w-full ${width} ml-auto` : 'w-full mt-auto rounded-t-3xl max-h-[90vh]',
        )}
      >
        {title && (
          <div className="flex items-center justify-between px-5 py-4 border-b border-cream-200 shrink-0">
            <div className="font-serif text-xl text-bordeaux-900">{title}</div>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-bordeaux-700 hover:bg-cream-200 transition"
              aria-label="Fermer"
            >
              <X size={20} />
            </button>
          </div>
        )}
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
