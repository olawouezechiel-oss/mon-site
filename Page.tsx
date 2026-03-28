/**
 * Page wrapper template to be used as a base for all pages.
 */

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSession } from 'modelence/client';
import LoadingSpinner from '@/client/components/LoadingSpinner';
import { Button } from '@/client/components/ui/Button';
import { cn } from '@/client/lib/utils';
import logo from '@/client/assets/logo.png';

interface PageProps {
  children?: React.ReactNode;
  isLoading?: boolean;
  className?: string;
}

function Header() {
  const { user } = useSession();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-black border-b border-yellow-500/10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="OME-PROD" className="h-10 w-auto" />
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            <NavLink to="/" active={isActive('/')}>Accueil</NavLink>
            <NavLink to="/a-propos" active={isActive('/a-propos')}>A propos</NavLink>
            <NavLink to="/services" active={isActive('/services')}>Services</NavLink>
            <NavLink to="/contact" active={isActive('/contact')}>Contact</NavLink>
          </nav>
        </div>

        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-sm text-white/60">
              {user.handle}
            </span>
            <Link to="/logout">
              <Button variant="outline" className="border-white/20 text-white/70 hover:bg-white/5 hover:text-white hover:border-white/30">
                Deconnexion
              </Button>
            </Link>
          </div>
        ) : (
          <Link to="/login">
            <Button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black font-semibold shadow-lg shadow-yellow-500/20">
              Connexion
            </Button>
          </Link>
        )}
      </div>

      {/* Mobile Navigation */}
      <nav className="md:hidden border-t border-yellow-500/10 px-4 py-3 flex justify-center gap-2 bg-neutral-950">
        <NavLink to="/" active={isActive('/')} mobile>Accueil</NavLink>
        <NavLink to="/a-propos" active={isActive('/a-propos')} mobile>A propos</NavLink>
        <NavLink to="/services" active={isActive('/services')} mobile>Services</NavLink>
        <NavLink to="/contact" active={isActive('/contact')} mobile>Contact</NavLink>
      </nav>
    </header>
  );
}

function NavLink({ to, active, children, mobile }: { to: string; active: boolean; children: React.ReactNode; mobile?: boolean }) {
  return (
    <Link
      to={to}
      className={cn(
        "font-medium rounded-lg transition-all",
        mobile ? "px-3 py-2 text-xs" : "px-4 py-2 text-sm",
        active
          ? "text-yellow-500 bg-yellow-500/10"
          : "text-white/60 hover:text-yellow-500 hover:bg-yellow-500/5"
      )}
    >
      {children}
    </Link>
  );
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col min-h-screen max-w-full overflow-x-hidden bg-black">{children}</div>;
}

function PageBody({ children, className, isLoading = false }: PageProps) {
  return (
    <div className="flex flex-1 w-full min-h-0">
      <main className={cn("flex flex-col flex-1 overflow-x-hidden", className)}>
        {isLoading ? (
          <div className="flex items-center justify-center w-full h-full bg-black">
            <LoadingSpinner />
          </div>
        ) : (
          children
        )}
      </main>
    </div>
  );
}

export default function Page({ children, className, isLoading = false }: PageProps) {
  return (
    <PageWrapper>
      <Header />
      <PageBody className={className} isLoading={isLoading}>{children}</PageBody>
    </PageWrapper>
  );
}
