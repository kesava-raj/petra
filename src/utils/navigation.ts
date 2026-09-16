import { useState, useEffect } from 'react';

export type AppRoute = '/' | '/about' | '/privacy' | '/terms' | '/security';

// Listeners for route changes
const listeners: Array<() => void> = [];

export function getCurrentRoute(): AppRoute {
  if (typeof window === 'undefined') return '/';
  const path = window.location.pathname.toLowerCase().replace(/\/$/, '');
  if (path === '/about') return '/about';
  if (path === '/privacy') return '/privacy';
  if (path === '/terms') return '/terms';
  if (path === '/security') return '/security';
  return '/';
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
