import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { canAccessDashboard } from '@/lib/dashboard';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Town Services', path: '/services' },
  { name: 'Community Board', path: '/board' },
  { name: 'Timeline', path: '/timeline' },
  { name: 'RP Resources', path: '/resources' },
  { name: 'Directory', path: '/directory' },
  { name: 'Real Estate', path: '/real-estate' },
  { name: 'Admin Panel', path: '/admin' },
  { name: 'Staff Hall', path: '/staff' },
  { name: 'Join Sol', path: '/join' },
];

export const Navigation = () => {
  const { user } = useAuth();
  const items = canAccessDashboard(user) ? [navItems[0], { name: 'Dashboard', path: '/dashboard' }, ...navItems.slice(1)] : navItems;
  return (
    <nav className="bg-primary text-primary-foreground border-b border-primary-foreground/20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-1">
          {items.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                cn(
                  'px-4 py-3 font-medium transition-colors hover:bg-primary-foreground/10',
                  isActive && 'bg-primary-foreground/20 border-b-2 border-accent'
                )
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};