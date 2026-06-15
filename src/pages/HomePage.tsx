import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import ShowcaseSection from '../components/ShowcaseSection';
import ReviewsSection from '../components/ReviewsSection';
import HighlightsSection from '../components/HighlightsSection';
import Footer from '../components/Footer';
import { useDocumentHead } from '../hooks/useDocumentHead';

const HomePage: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.hash]);

  useDocumentHead({
    title: '10-8 — Every Fight Starts Here | Bets, News & Fantasy',
    description:
      '10-8 is the all-in-one fight app: place predictions through Polymarket, follow live fight news, join fantasy leagues, and get insider picks from ex-fighters.',
    canonical: 'https://www.10-8.gg/',
  });

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <ShowcaseSection />
        <ReviewsSection />
        <HighlightsSection />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
