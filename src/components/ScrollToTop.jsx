import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const prevPathRef = useRef(pathname);

  useEffect(() => {
    // Prevent scrolling to top when exploring sub-routes within /services
    const isServiceInternalRoute =
      pathname.startsWith('/services') && prevPathRef.current.startsWith('/services');

    if (!isServiceInternalRoute) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
    prevPathRef.current = pathname;
  }, [pathname]);

  return null;
}
