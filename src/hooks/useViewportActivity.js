import { useEffect, useState } from 'react';
export default function useViewportActivity(ref) {
  const [intersecting, setIntersecting] = useState(false);
  const [visible, setVisible] = useState(() => !document.hidden);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting));
    observer.observe(ref.current);
    const update = () => setVisible(!document.hidden);
    document.addEventListener('visibilitychange', update);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', update); };
  }, [ref]);
  return intersecting && visible;
}
