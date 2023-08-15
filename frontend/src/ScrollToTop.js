import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Scroll to top of window, on pathname change
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}
