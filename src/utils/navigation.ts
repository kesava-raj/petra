import { useState, useEffect } from 'react';

export type AppRoute = 
  | '/' 
  | '/industries/dental' 
  | '/industries/medical'
  | '/industries/salons'
  | '/industries/spas'
  | '/industries/med-spa' 
  | '/industries/legal'
  | '/industries/real-estate'
  | '/industries/home-services' 
  | '/industries/auto-services'
  | '/industries/wellness'
  | '/pricing' 
  | '/integrations' 
  | '/customers' 
  | '/about' 
  | '/privacy' 
  | '/terms' 
  | '/security'
  | '/404';

// Listeners for route changes
const listeners: Array<() => void> = [];

export function getCurrentRoute(): AppRoute {
  if (typeof window === 'undefined') return '/';
  const path = window.location.pathname.toLowerCase().replace(/\/$/, '');
  
  if (!path || path === '') return '/';
  if (path === '/industries/dental' || path === '/industries/dental-ai-receptionist') return '/industries/dental';
  if (path === '/industries/medical' || path === '/industries/medical-practices') return '/industries/medical';
  if (path === '/industries/salons' || path === '/industries/salon' || path === '/industries/hair-salons') return '/industries/salons';
  if (path === '/industries/spas' || path === '/industries/spa' || path === '/industries/luxury-spas') return '/industries/spas';
  if (path === '/industries/med-spa' || path === '/industries/med-spa-ai-receptionist' || path === '/industries/medspa') return '/industries/med-spa';
  if (path === '/industries/legal' || path === '/industries/law-firms' || path === '/industries/legal-intake') return '/industries/legal';
  if (path === '/industries/real-estate' || path === '/industries/realestate') return '/industries/real-estate';
  if (path === '/industries/home-services' || path === '/industries/home-services-ai-answering' || path === '/industries/hvac') return '/industries/home-services';
  if (path === '/industries/auto-services' || path === '/industries/auto-repair' || path === '/industries/automotive') return '/industries/auto-services';
  if (path === '/industries/wellness' || path === '/industries/physical-therapy' || path === '/industries/chiropractic') return '/industries/wellness';
  if (path === '/pricing') return '/pricing';
  if (path === '/integrations') return '/integrations';
  if (path === '/customers') return '/customers';
  if (path === '/about') return '/about';
  if (path === '/privacy') return '/privacy';
  if (path === '/terms') return '/terms';
  if (path === '/security') return '/security';
  
  // Known hash anchor paths on home:
  if (path.startsWith('/#') || path === '') return '/';

  // Unknown route returns 404
  return '/404';
}

export function navigateTo(path: string, options?: { replace?: boolean; scrollToTop?: boolean }) {
  if (typeof window === 'undefined') return;

  const target = path.trim();

  // If hash-only link on the same home page
  if (target.startsWith('#')) {
    const currentRoute = getCurrentRoute();
    if (currentRoute !== '/') {
      // Navigate to home with hash
      window.history.pushState({}, '', '/' + target);
      notifyListeners();
      setTimeout(() => {
        const id = target.slice(1);
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    const id = target.slice(1);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      window.history.replaceState({}, '', target);
    }
    return;
  }

  // Path with possible hash: e.g. "/security#security-by-design"
  const [pathname, hash] = target.split('#');

  if (options?.replace) {
    window.history.replaceState({}, '', target);
  } else {
    window.history.pushState({}, '', target);
  }

  notifyListeners();

  if (hash) {
    setTimeout(() => {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  } else if (options?.scrollToTop !== false) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function notifyListeners() {
  listeners.forEach((fn) => fn());
}

export function useCurrentRoute(): AppRoute {
  const [route, setRoute] = useState<AppRoute>(getCurrentRoute);

  useEffect(() => {
    const handleLocationChange = () => {
      setRoute(getCurrentRoute());
    };

    listeners.push(handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);

    return () => {
      const idx = listeners.indexOf(handleLocationChange);
      if (idx !== -1) listeners.splice(idx, 1);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  return route;
}
