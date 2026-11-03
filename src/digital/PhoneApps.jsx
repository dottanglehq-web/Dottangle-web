import React, { useEffect, useRef, useState } from 'react';
import Icon from './Icon';
import BrandLogo from './BrandLogos';
import { projects, services } from './servicesData';

export const apps = [
  { id: 'browser', label: 'Browser', icon: 'globe', color: '#178ce5' },
  { id: 'camera', label: 'Camera', icon: 'camera', color: '#30343b' },
  { id: 'calculator', label: 'Calculator', icon: 'calculator', color: '#ff9f0a' },
  { id: 'gallery', label: 'Gallery', icon: 'gallery', color: '#ec4899' },
  { id: 'services', label: 'Services', icon: 'grid', color: '#7457ff' },
  { id: 'about', label: 'About Us', icon: 'info', color: '#16a085' },
  { id: 'contact', label: 'Contact', icon: 'mail', color: '#20b15a' },
  { id: 'settings', label: 'Settings', icon: 'settings', color: '#747b87' },
  { id: 'projects', label: 'Projects', icon: 'briefcase', color: '#ef5b3f' },
  { id: 'portfolio', label: 'Portfolio', icon: 'spark', color: '#7c3aed' }
];

export function HomeScreen({ openApp }) {
  return <div className="dp-home"><div className="dp-home-welcome"><small>GOOD DAY</small><b>What shall we create?</b></div><div className="dp-app-grid">{apps.map(app => <button className="dp-app-icon" key={app.id} onClick={() => openApp(app.id)}><span style={{'--app-color': app.color}}><Icon name={app.icon} size={23}/></span><small>{app.label}</small></button>)}</div></div>;
}

function BrowserApp() {
  const [value, setValue] = useState(''); const [result, setResult] = useState(null);
  const submit = e => { e.preventDefault(); const q = value.trim(); if (!q) return; const safeUrl = /^https?:\/\//i.test(q) ? q : null; setResult(safeUrl ? { title: 'External website', text: 'For your safety, external pages open in a separate browser tab.', url: safeUrl } : { title: `Search: ${q}`, text: 'Try our internal destinations below or continue the search securely in a new tab.', url: `https://www.google.com/search?q=${encodeURIComponent(q)}` }); };
  return <div className="dp-browser"><form onSubmit={submit}><input value={value} onChange={e=>setValue(e.target.value)} placeholder="Search or enter website"/><button>Go</button></form>{result ? <div className="dp-web-card"><Icon name="globe" size={32}/><h3>{result.title}</h3><p>{result.text}</p><a href={result.url} target="_blank" rel="noreferrer">Continue safely ↗</a></div> : <div className="dp-browser-start"><b>Saarthi</b><p>Design. Technology. Growth.</p><div><span>Work</span><span>Services</span><span>Contact</span></div></div>}</div>;
}

export function CameraApp({ addPhoto }) {
  const videoRef = useRef(null); const canvasRef = useRef(null); const streamRef = useRef(null); const [status,setStatus]=useState('ready'); const [shot,setShot]=useState(null);
  const start = async () => { setStatus('loading'); try { const stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:'user'},audio:false}); streamRef.current=stream; if(videoRef.current){videoRef.current.srcObject=stream; await videoRef.current.play();} setStatus('live'); } catch { setStatus('denied'); } };
  const stop = () => { streamRef.current?.getTracks().forEach(t=>t.stop()); streamRef.current=null; };
  useEffect(()=>stop,[]);
  const capture=()=>{const v=videoRef.current,c=canvasRef.current;if(!v||!v.videoWidth)return;c.width=v.videoWidth;c.height=v.videoHeight;c.getContext('2d').drawImage(v,0,0);const data=c.toDataURL('image/jpeg',.86);setShot(data);addPhoto(data);};
  return <div className="dp-camera"><video ref={videoRef} muted playsInline/><canvas ref={canvasRef}/>{status==='ready'&&<button className="dp-camera-permission" onClick={start}><Icon name="camera" size={35}/><b>Open camera</b><small>Camera access is used only on this device.</small></button>}{status==='loading'&&<p className="dp-camera-note">Waiting for permission…</p>}{status==='denied'&&<div className="dp-camera-permission"><b>Camera unavailable</b><small>Allow camera access in your browser settings, then try again.</small><button onClick={start}>Try again</button></div>}{status==='live'&&<button aria-label="Capture photo" className="dp-shutter" onClick={capture}/>} {shot&&<img className="dp-shot-preview" src={shot} alt="Latest capture"/>}</div>;
}

function CalculatorApp(){const [display,setDisplay]=useState('0');const press=k=>{if(k==='C')return setDisplay('0');if(k==='⌫')return setDisplay(display.length>1?display.slice(0,-1):'0');if(k==='%'){const n=Number(display);return setDisplay(Number.isFinite(n)?String(n/100):display)}if(k==='='){try{const safe=display.replace(/×/g,'*').replace(/÷/g,'/');if(!/^[\d+\-*/.() ]+$/.test(safe))throw Error();setDisplay(String(Function(`"use strict";return (${safe})`)()));}catch{setDisplay('Error');}return;}setDisplay(display==='0'||display==='Error'?k:display+k)};const keys=['C','⌫','%','÷','7','8','9','×','4','5','6','-','1','2','3','+','0','.','='];return <div className="dp-calc"><div>{display}</div><section>{keys.map(k=><button className={['÷','×','-','+','='].includes(k)?'op':''} key={k} onClick={()=>press(k)}>{k}</button>)}</section></div>}

function GalleryApp({photos}){const [selected,setSelected]=useState(null);if(selected)return <div className="dp-gallery-preview"><button onClick={()=>setSelected(null)}>← Gallery</button><img src={selected} alt="Captured photograph"/></div>;return <div className="dp-gallery"><h3>Recent photos</h3>{photos.length?<div>{photos.map((p,i)=><button key={i} onClick={()=>setSelected(p)}><img src={p} alt={`Capture ${i+1}`}/></button>)}</div>:<p>Photos captured with the Camera app will appear here.</p>}</div>}

function ServicesApp({selectedService,setSelectedService}){const active=services.find(s=>s.id===selectedService);if(active)return <div className="dp-service-detail" style={{'--service-color':active.color,'--service-soft':active.colorSoft}}><button onClick={()=>setSelectedService(null)}>← All services</button><div className="dp-mini-circle"><BrandLogo name={active.id} size={28}/></div><h3>{active.title}</h3><p>{active.description}</p><a href={`mailto:hello@dottangle.com?subject=${encodeURIComponent(active.title+' enquiry')}`}>Start an enquiry</a></div>;return <div className="dp-services-list"><h3>Our services</h3>{services.map(s=><button key={s.id} style={{color:s.color}} onClick={()=>setSelectedService(s.id)}><span className="dp-phone-list-logo"><BrandLogo name={s.id} size={18}/></span><span>{s.title}</span><b>›</b></button>)}</div>}

function InfoApp({type}){if(type==='about')return <div className="dp-copy-app"><span>SAARTHI DIGITAL</span><h2>Senior craft.<br/>Real partnership.</h2><p>We unite strategy, design and engineering to build brands and digital products people remember.</p><div className="dp-stat-row"><b>8+<small>years</small></b><b>99+<small>speed</small></b><b>1:1<small>team</small></b></div></div>;if(type==='contact')return <div className="dp-copy-app"><span>LET'S TALK</span><h2>Bring us your boldest idea.</h2><p>Tell us what you are building and we will come back with honest, practical next steps.</p><a className="dp-contact-link" href="mailto:hello@dottangle.com">hello@dottangle.com</a><a className="dp-contact-link" href="tel:+917717453630">+91 77174 53630</a><a className="dp-primary-link" href="/contact">Open enquiry form</a></div>;return <div className="dp-projects"><h3>{type==='portfolio'?'Selected portfolio':'Recent projects'}</h3>{projects.map(p=><article key={p.title}><img src={p.image} alt=""/><div><b>{p.title}</b><small>{p.type}</small></div></article>)}</div>}

function SettingsApp({settings,setSettings,lock}){return <div className="dp-settings"><h3>Settings</h3><label><span>Sound<small>Interface feedback</small></span><input type="checkbox" checked={settings.sound} onChange={e=>setSettings({...settings,sound:e.target.checked})}/></label><label><span>Dark appearance<small>Apps and home screen</small></span><input type="checkbox" checked={settings.dark} onChange={e=>setSettings({...settings,dark:e.target.checked})}/></label><div className="dp-wallpapers"><span>Wallpaper</span><section>{['violet','sunset','ocean'].map(w=><button aria-label={`${w} wallpaper`} className={settings.wallpaper===w?'active':''} data-wallpaper={w} key={w} onClick={()=>setSettings({...settings,wallpaper:w})}/>)}</section></div><button className="dp-lock-now" onClick={lock}>Lock phone</button></div>}

export default function AppContent({app,photos,addPhoto,selectedService,setSelectedService,settings,setSettings,lock}) {
  if(app==='browser')return <BrowserApp/>;if(app==='camera')return <CameraApp addPhoto={addPhoto}/>;if(app==='calculator')return <CalculatorApp/>;if(app==='gallery')return <GalleryApp photos={photos}/>;if(app==='services')return <ServicesApp selectedService={selectedService} setSelectedService={setSelectedService}/>;if(['about','contact','projects','portfolio'].includes(app))return <InfoApp type={app}/>;if(app==='settings')return <SettingsApp settings={settings} setSettings={setSettings} lock={lock}/>;return null;
}
