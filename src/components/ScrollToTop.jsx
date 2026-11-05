import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const prevPathRef = useRef(pathname);

  useEffect(() => {
    // Keep context when opening/closing a sub-service modal, but reset for category pages.
    const serviceCategory = path => path.match(/^\/services\/([^/]+)/)?.[1];
    const isServiceInternalRoute = serviceCategory(pathname) &&
      serviceCategory(pathname) === serviceCategory(prevPathRef.current);

    if (!isServiceInternalRoute) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
    prevPathRef.current = pathname;
  }, [pathname]);

  return null;
}
