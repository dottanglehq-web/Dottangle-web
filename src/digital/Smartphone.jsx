import React, { lazy, memo, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { apps, HomeScreen } from './PhoneHome';
const AppContent = lazy(() => import('./PhoneApps'));
function useMinuteClock(active) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    if (!active) return;
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, [active]);
  return now;
}
const StatusBar = memo(function StatusBar({ active, dark = false }) {
  const now = useMinuteClock(active);
  return <div className={`dp-status ${dark ? 'dark' : ''}`}><b>{now.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}</b><span>●●● Wi-Fi&nbsp; ▰</span></div>;
});
function LockScreen({ unlock, wallpaper, active }) {
  const now = useMinuteClock(active);
  const drag = useRef(null);
  const gesture = useRef(null);
  const frame = useRef(null);
  useEffect(() => () => cancelAnimationFrame(frame.current), []);
  const finish = e => {
    if (!gesture.current) return;
    const { distance, limit } = gesture.current;
    gesture.current = null;
    cancelAnimationFrame(frame.current);
    frame.current = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
    if (drag.current) drag.current.style.transform = '';
    if (e.type !== 'pointercancel' && distance >= limit * .85) unlock();
  };
  return <div className={`dp-lock dp-wallpaper-${wallpaper}`}>
    <StatusBar active={active}/>
    <div className="dp-lock-time"><b>{now.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}</b><span>{now.toLocaleDateString([], {weekday:'long',month:'long',day:'numeric'})}</span></div>
    <div className="dp-unlock" onPointerMove={e => {
      if (!gesture.current) return;
      gesture.current.distance = Math.max(0, Math.min(gesture.current.limit, e.clientX - gesture.current.start));
      if (!frame.current) frame.current = requestAnimationFrame(() => { frame.current = null; if (drag.current && gesture.current) drag.current.style.transform = `translateX(${gesture.current.distance}px)`; });
    }} onPointerUp={finish} onPointerCancel={finish}>
      <span>slide to unlock</span>
      <button ref={drag} aria-label="Drag to unlock" onClick={e => { if (e.detail === 0) unlock(); }} onPointerDown={e => {
        const track = e.currentTarget.parentElement;
        gesture.current = { start: e.clientX, distance: 0, limit: Math.max(1, track.clientWidth - 48) };
        track.setPointerCapture(e.pointerId);
      }}>›</button>
    </div>
  </div>;
}
export default memo(function Smartphone({ requestedService, onRequestHandled }) {
  const root = useRef(null);
  const [inView, setInView] = useState(false);
  const [visible, setVisible] = useState(() => !document.hidden);
  const [locked, setLocked] = useState(true);
  const [app, setApp] = useState(null);
  const [visited, setVisited] = useState([]);
  const [history, setHistory] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [settings, setSettings] = useState({sound:false,dark:false,wallpaper:'violet'});
  const active = inView && visible;
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: .05 });
    observer.observe(root.current);
    const visibility = () => setVisible(!document.hidden);
    document.addEventListener('visibilitychange', visibility);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', visibility); };
  }, []);
  const unlock = useCallback(() => setLocked(false), []);
  const openApp = useCallback(id => {
    if (app && app !== id) setHistory(h => [...h.slice(-9), app]);
    setApp(id);
    setVisited(ids => ids.includes(id) ? ids : [...ids, id]);
  }, [app]);
  const home = useCallback(() => { setApp(null); setHistory([]); setSelectedService(null); }, []);
  const lock = useCallback(() => { home(); setLocked(true); }, [home]);
  useEffect(() => {
    if (!requestedService) return;
    setLocked(false); openApp('services'); setSelectedService(requestedService); onRequestHandled?.();
  }, [requestedService, onRequestHandled, openApp]);
  const back = () => {
    if (selectedService && app === 'services') { setSelectedService(null); return; }
    setApp(history.at(-1) || null); setHistory(h => h.slice(0,-1));
  };
  return <div ref={root} className={`dp-phone ${settings.dark ? 'dp-dark' : ''}`} data-active={active} aria-label="Interactive Dottangle phone">
    <button className="dp-power" onClick={locked ? unlock : lock} aria-label={locked ? 'Power on and unlock' : 'Lock phone'}/>
    <div className="dp-speaker"/><div className="dp-camera-dot"/>
    <div className="dp-screen">{locked ? <LockScreen unlock={unlock} wallpaper={settings.wallpaper} active={active}/> : <div className={`dp-os dp-wallpaper-${settings.wallpaper}`}>
      <StatusBar active={active} dark={settings.dark}/>
      {!app && <HomeScreen openApp={openApp}/>}
      {visited.length > 0 && <div className="dp-app-window" hidden={!app}>
        <header><button onClick={back} aria-label="Back in app">‹</button><b>{apps.find(a => a.id === app)?.label}</b><span/></header>
        <main><Suspense fallback={<p className="dp-app-loading" role="status">Opening app…</p>}>
          {visited.map(id => <div className="dp-app-panel" key={id} hidden={app !== id}><AppContent app={id} selectedService={selectedService} setSelectedService={setSelectedService} settings={settings} setSettings={setSettings} lock={lock}/></div>)}
        </Suspense></main>
      </div>}
      <nav className="dp-phone-nav" aria-label="Phone navigation"><button onClick={back} aria-label="Back">‹</button><button onClick={home} aria-label="Home"><span/></button><button onClick={() => setApp(history.at(-1) || null)} aria-label="Recent apps">□</button></nav>
    </div>}</div>
  </div>;
});
