import { Link, useLocation } from 'react-router-dom';
import { Heart, UtensilsCrossed, Info } from 'lucide-react';
import { useFavorites } from '@/context/FavoritesContext';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const location = useLocation();
  const { favorites } = useFavorites();

  const navItems = [
    { path: '/', label: 'Find Recipes', icon: UtensilsCrossed },
    { path: '/favorites', label: 'Favorites', icon: Heart, badge: favorites.length },
    { path: '/about', label: 'About', icon: Info },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl gradient-coral flex items-center justify-center shadow-soft group-hover:shadow-glow transition-shadow duration-300">
            <UtensilsCrossed className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-xl text-foreground">
            Munch<span className="text-gradient">AI</span>
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          {navItems.map(({ path, label, icon: Icon, badge }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={cn(
                  'relative flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200',
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-soft'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{label}</span>
                {badge !== undefined && badge > 0 && (
                  <span className={cn(
                    'absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center',
                    isActive ? 'bg-background text-primary' : 'bg-primary text-primary-foreground'
                  )}>
                    {badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
