import React, { memo } from 'react';
import Icon from './Icon';
export const apps = [
  { id: 'projects', label: 'Projects', icon: 'briefcase', color: '#ef5b3f' },
  { id: 'contact', label: 'Contact', icon: 'mail', color: '#20b15a' },
  { id: 'browser', label: 'Browser', icon: 'globe', color: '#178ce5' },
  { id: 'services', label: 'Services', icon: 'grid', color: '#7457ff' },
  { id: 'about', label: 'About Us', icon: 'info', color: '#16a085' },
  { id: 'portfolio', label: 'Portfolio', icon: 'spark', color: '#7c3aed' },
  { id: 'settings', label: 'Settings', icon: 'settings', color: '#747b87' }
];
export const HomeScreen = memo(function HomeScreen({ openApp }) {
  return <div className="dp-home"><div className="dp-home-welcome"><small>GOOD DAY</small><b>What shall we create?</b></div><div className="dp-app-grid">{apps.map(app => <button type="button" className="dp-app-icon" key={app.id} onClick={() => openApp(app.id)}><span style={{'--app-color': app.color}}><Icon name={app.icon} size={23}/></span><small>{app.label}</small></button>)}</div></div>;
});
