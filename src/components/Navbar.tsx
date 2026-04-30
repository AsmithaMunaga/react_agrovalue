import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Leaf, LogOut, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardPath = () => {
    if (!user) return '/login';
    switch (user.role) {
      case 'admin': return '/admin';
      case 'farmer': return '/farmer-dashboard';
      case 'buyer': return '/buyer-dashboard';
      case 'landowner': return '/landowner-dashboard';
      default: return '/';
    }
  };

  const navLinks = [
    { label: 'Products', path: '/products' },
    { label: 'Farm Hotels', path: '/hotels' },
    { label: 'Transport', path: '/transport' },
    { label: 'Rent Land', path: '/land' },
    { label: 'AI Advisor', path: '/ai-advisor' },
  ];

  return (
    <nav className="sticky top-0 z-50 glass-dark border-b border-primary/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-harvest flex items-center justify-center shadow-amber group-hover:scale-105 transition-transform">
              <Leaf className="w-5 h-5 text-soil" />
            </div>
            <div>
              <span className="font-display text-xl font-bold text-primary-foreground leading-none block">
                AgroValue
              </span>
              <span className="text-[10px] text-primary-foreground/60 font-body">
                Rural Marketplace
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className="px-3 py-2 text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary/20 rounded-lg transition-all"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary/20 rounded-lg transition-all"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 text-[10px] flex items-center justify-center bg-secondary text-secondary-foreground border-0">
                  {totalItems}
                </Badge>
              )}
            </Link>

            {/* Auth */}
            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 px-3 py-1.5 bg-primary/20 hover:bg-primary/30 rounded-lg transition-all">
                    <div className="w-6 h-6 rounded-full bg-gradient-harvest flex items-center justify-center">
                      <span className="text-xs font-bold text-soil">
                        {user?.name?.[0] || "U"}
                      </span>
                    </div>
                    <span className="text-sm text-primary-foreground hidden sm:block">
                      {user?.name?.split(' ')?.[0] || "User"}
                    </span>
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => navigate(getDashboardPath())}>
                    <LayoutDashboard className="w-4 h-4 mr-2" /> Dashboard
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <User className="w-4 h-4 mr-2" /> Profile
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                    <LogOut className="w-4 h-4 mr-2" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary-foreground hover:bg-primary/20"
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>

                <Button
                  size="sm"
                  className="bg-gradient-harvest text-soil font-semibold hover:opacity-90 shadow-amber border-0"
                  onClick={() => navigate('/register')}
                >
                  Join Now
                </Button>
              </div>
            )}

            {/* Mobile toggle */}
            <button
              className="md:hidden p-2 text-primary-foreground/80 hover:bg-primary/20 rounded-lg"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-primary/20 mt-2 pt-3 animate-fade-in">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className="block px-3 py-2.5 text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary/20 rounded-lg transition-all mb-1"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};