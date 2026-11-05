import React, { useEffect, useRef, useState } from 'react';
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const media = matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)');
    let frame = null, visible = false, x = -100, y = -100, ringX = -100, ringY = -100;
    const render = () => {
      ringX += (x - ringX) * .18; ringY += (y - ringY) * .18;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${ringX}px,${ringY}px,0)`;
      frame = Math.abs(x-ringX) + Math.abs(y-ringY) > .2 ? requestAnimationFrame(render) : null;
    };
    const move = e => {
      if (!media.matches || document.hidden) return;
      x = e.clientX; y = e.clientY;
      if (!visible) { visible = true; setIsVisible(true); }
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${x}px,${y}px,0)`;
      setIsHovered(Boolean(e.target.closest('a,button,[role="button"]')));
      if (frame === null) frame = requestAnimationFrame(render);
    };
    const leave = () => { visible = false; setIsVisible(false); cancelAnimationFrame(frame); frame = null; };
    const change = () => { setEnabled(media.matches); if (!media.matches) leave(); };
    const visibility = () => { if (document.hidden) leave(); };
    change();
    media.addEventListener('change', change);
    window.addEventListener('mousemove', move, { passive:true });
    document.addEventListener('mouseleave', leave);
    document.addEventListener('visibilitychange', visibility);
    return () => { cancelAnimationFrame(frame); media.removeEventListener('change',change); window.removeEventListener('mousemove',move); document.removeEventListener('mouseleave',leave); document.removeEventListener('visibilitychange',visibility); };
  }, []);
  if (!enabled) return null;
  return <><div ref={dotRef} className={`custom-cursor-dot ${isVisible?'is-visible':''} ${isHovered?'is-hovered':''}`} aria-hidden="true"/><div ref={ringRef} className={`custom-cursor-ring ${isVisible?'is-visible':''} ${isHovered?'is-hovered':''}`} aria-hidden="true"/></>;
}
