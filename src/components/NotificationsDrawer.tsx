import { Bell, CheckCheck, Package, Truck, AlertTriangle, Info } from 'lucide-react';
import { useShop } from '@/ShopContext';
import { Drawer } from './Drawer';
import { classNames, timeAgo } from '@/utils';

interface NotificationsDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function NotificationsDrawer({ open, onClose }: NotificationsDrawerProps) {
  const { notifications, markAllNotificationsRead, markNotificationRead } = useShop();

  const icon = (type: string) => {
    switch (type) {
      case 'order': return <Package size={16} />;
      case 'delivery': return <Truck size={16} />;
      case 'stock': return <AlertTriangle size={16} />;
      default: return <Info size={16} />;
    }
  };

  return (
    <Drawer open={open} onClose={onClose} title="Notifications">
      <div className="p-4">
        {notifications.length > 0 && (
          <button onClick={markAllNotificationsRead} className="btn-ghost text-xs px-3 py-1.5 mb-3">
            <CheckCheck size={14} /> Tout marquer comme lu
          </button>
        )}
        {notifications.length === 0 ? (
          <div className="text-center py-16">
            <Bell size={32} className="mx-auto text-bordeaux-300" />
            <p className="text-bordeaux-500 text-sm mt-3">Aucune notification pour le moment.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {notifications.map((n) => (
              <button
                key={n.id}
                onClick={() => markNotificationRead(n.id)}
                className={classNames(
                  'w-full text-left p-3 rounded-xl border transition flex gap-3',
                  n.read ? 'border-cream-200 bg-cream-50' : 'border-gold-300 bg-gold-50 hover:bg-gold-100',
                )}
              >
                <span className={classNames(
                  'w-9 h-9 rounded-full grid place-items-center shrink-0',
                  n.read ? 'bg-cream-200 text-bordeaux-600' : 'bg-gold-200 text-bordeaux-800',
                )}>
                  {icon(n.type)}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-bordeaux-900">{n.title}</p>
                    {!n.read && <span className="w-2 h-2 rounded-full bg-gold-500 shrink-0" />}
                  </div>
                  <p className="text-xs text-bordeaux-600 mt-0.5 line-clamp-2">{n.message}</p>
                  <p className="text-[10px] text-bordeaux-400 mt-1">{timeAgo(n.createdAt)}</p>
                </div>
              </button>
            ))}
          </div>
        )}
        <p className="mt-4 text-[10px] text-bordeaux-400 text-center">
          Notifications de démonstration — stockées localement sur cet appareil uniquement.
        </p>
      </div>
    </Drawer>
  );
}
