import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProblemSolution from './components/ProblemSolution';
import InteractiveSimulator from './components/InteractiveSimulator';
import RolesExplorer from './components/RolesExplorer';
import CorporateGallery from './components/CorporateGallery';
import TechStackSection from './components/TechStackSection';
import TeamSection from './components/TeamSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import TrackingPage from './components/TrackingPage';
import VideoSection from './components/VideoSection';
import './App.css';

function getRouteInfo() {
  const path = window.location.pathname;
  const hash = window.location.hash;
  
  // Check path: /seguimiento or /seguimiento/:id
  if (path.startsWith('/seguimiento')) {
    const parts = path.split('/').filter(Boolean);
    const ticketId = parts[1] ? decodeURIComponent(parts[1]) : 'SOL-2026-1004';
    return { view: 'tracking', ticketId };
  }
  
  // Check hash: #/seguimiento/:id or #seguimiento
  if (hash.includes('seguimiento')) {
    const cleanHash = hash.replace(/^#\/?/, '');
    const parts = cleanHash.split('/').filter(Boolean);
    const ticketId = parts[1] ? decodeURIComponent(parts[1]) : 'SOL-2026-1004';
    return { view: 'tracking', ticketId };
  }

  // Check query params: ?seguimiento=SOL-2026-1004
  const params = new URLSearchParams(window.location.search);
  const queryTicket = params.get('seguimiento') || params.get('track') || params.get('id');
  if (queryTicket) {
    return { view: 'tracking', ticketId: queryTicket };
  }
  
  return { view: 'home', ticketId: null };
}

function App() {
  const [route, setRoute] = useState(getRouteInfo);
  const [simulatorTrigger, setSimulatorTrigger] = useState(0);

  useEffect(() => {
    const handlePopState = () => {
      setRoute(getRouteInfo());
    };
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const navigateToTracking = (ticketId = 'SOL-2026-1004') => {
    window.history.pushState(null, '', `/seguimiento/${ticketId}`);
    setRoute({ view: 'tracking', ticketId });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    window.history.pushState(null, '', '/');
    setRoute({ view: 'home', ticketId: null });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenSimulator = () => {
    if (route.view !== 'home') {
      navigateToHome();
      setTimeout(() => {
        const el = document.getElementById('simulador');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('simulador');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        setSimulatorTrigger(prev => prev + 1);
      }
    }
  };

  // If currently in tracking view (/seguimiento/SOL-2026-XXXX)
  if (route.view === 'tracking') {
    return (
      <div className="app-root">
        <TrackingPage 
          initialTicketId={route.ticketId} 
          onNavigateHome={navigateToHome}
        />
        <Footer onNavigateTracking={navigateToTracking} />
      </div>
    );
  }

  // Home Landing Page view
  return (
    <div className="app-root">
      {/* Navigation Header */}
      <Navbar 
        onOpenDemo={handleOpenSimulator} 
        onNavigateTracking={navigateToTracking}
      />

      {/* Main Content */}
      <main>
        <Hero 
          onOpenSimulator={handleOpenSimulator} 
          onNavigateTracking={navigateToTracking}
        />
        <ProblemSolution />
        <VideoSection onOpenSimulator={handleOpenSimulator} />
        <InteractiveSimulator 
          key={simulatorTrigger} 
          onNavigateTracking={navigateToTracking}
        />
        <RolesExplorer />
        <CorporateGallery />
        <TechStackSection />
        <TeamSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onNavigateTracking={navigateToTracking} />
    </div>
  );
}

export default App;
