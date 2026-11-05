import React, { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';
import BrandLogo from './BrandLogos';
import { projects, services } from './servicesData';
import ContactForm from '../components/ContactForm';

function BrowserApp() {
  const [value, setValue] = useState(''); const [result, setResult] = useState(null);
  const submit = e => { e.preventDefault(); const q = value.trim(); if (!q) return; const safeUrl = /^https?:\/\//i.test(q) ? q : null; setResult(safeUrl ? { title: 'External website', text: 'For your safety, external pages open in a separate browser tab.', url: safeUrl } : { title: `Search: ${q}`, text: 'Try our internal destinations below or continue the search securely in a new tab.', url: `https://www.google.com/search?q=${encodeURIComponent(q)}` }); };
  return <div className="dp-browser"><form onSubmit={submit}><input value={value} onChange={e=>setValue(e.target.value)} placeholder="Search or enter website"/><button>Go</button></form>{result ? <div className="dp-web-card"><Icon name="globe" size={32}/><h3>{result.title}</h3><p>{result.text}</p><a href={result.url} target="_blank" rel="noreferrer">Continue safely ↗</a></div> : <div className="dp-browser-start"><b>Dottangle</b><p>Design. Technology. Growth.</p><div><Link to="/work">Work</Link><Link to="/services">Services</Link><Link to="/contact">Contact</Link></div></div>}</div>;
}

function ServicesApp({selectedService,setSelectedService}){const active=services.find(s=>s.id===selectedService);if(active)return <div className="dp-service-detail" style={{'--service-color':active.color,'--service-soft':active.colorSoft}}><button onClick={()=>setSelectedService(null)}>← All services</button><div className="dp-mini-circle"><BrandLogo name={active.id} size={28}/></div><h3>{active.title}</h3><p>{active.description}</p><a href={`mailto:dottanglehq@gmail.com?subject=${encodeURIComponent(active.title+' enquiry')}`}>Start an enquiry</a></div>;return <div className="dp-services-list"><h3>Our services</h3><Link className="dp-primary-link" to="/services">Explore full catalog</Link>{services.map(s=><button key={s.id} style={{color:s.color}} onClick={()=>setSelectedService(s.id)}><span className="dp-phone-list-logo"><BrandLogo name={s.id} size={18}/></span><span>{s.title}</span><b>›</b></button>)}</div>}

function SettingsApp({settings,setSettings,lock}){return <div className="dp-settings"><h3>Settings</h3><label><span>Sound<small>Interface feedback</small></span><input type="checkbox" checked={settings.sound} onChange={e=>setSettings({...settings,sound:e.target.checked})}/></label><label><span>Dark appearance<small>Apps and home screen</small></span><input type="checkbox" checked={settings.dark} onChange={e=>setSettings({...settings,dark:e.target.checked})}/></label><div className="dp-wallpapers"><span>Wallpaper</span><section>{['violet','sunset','ocean'].map(w=><button aria-label={`${w} wallpaper`} className={settings.wallpaper===w?'active':''} data-wallpaper={w} key={w} onClick={()=>setSettings({...settings,wallpaper:w})}/>)}</section></div><button className="dp-lock-now" onClick={lock}>Lock phone</button></div>}


function ContactApp() {
  return <div className="dp-contact-app"><h3>Contact Dottangle</h3>
    <a href="tel:+917973574376">Call +91 7973574376</a>
    <a href="mailto:dottanglehq@gmail.com">dottanglehq@gmail.com</a>
    <ContactForm compact />
  </div>;
}
function AboutApp() {
  return <div className="dp-copy-app"><span>DOTTANGLE DIGITAL</span><h2>Senior craft.<br/>Real partnership.</h2><p>We unite strategy, design and engineering to build brands and digital products people remember.</p><div className="dp-stat-row"><b>8+<small>years</small></b><b>99+<small>speed</small></b><b>1:1<small>team</small></b></div><a className="dp-primary-link" href="/#studio-overview">Meet our studio</a></div>;
}
function ProjectsApp({ portfolio = false }) {
  return <div className="dp-projects"><h3>{portfolio ? 'Selected portfolio' : 'Recent projects'}</h3>{projects.map(p => <a key={p.title} href={p.url} target="_blank" rel="noreferrer" aria-label={`View ${p.title}`}><article><img src={p.image} alt={p.title} loading="lazy" width="260" height="105"/><div><b>{p.title}</b><small>{p.type}</small></div></article></a>)}<Link className="dp-primary-link" to="/work">View all case studies</Link></div>;
}
export default memo(function AppContent({ app, selectedService, setSelectedService, settings, setSettings, lock }) {
  if (app === 'browser') return <BrowserApp/>;
  if (app === 'contact') return <ContactApp/>;
  if (app === 'services') return <ServicesApp selectedService={selectedService} setSelectedService={setSelectedService}/>;
  if (app === 'about') return <AboutApp/>;
  if (app === 'projects' || app === 'portfolio') return <ProjectsApp portfolio={app === 'portfolio'}/>;
  if (app === 'settings') return <SettingsApp settings={settings} setSettings={setSettings} lock={lock}/>;
  return null;
});
