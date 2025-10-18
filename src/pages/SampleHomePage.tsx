import React from 'react';
import Header from '../components/layout/Header';
import Hero from '../components/homepage/Hero';
import Journeys from '../components/homepage/Journeys';
import FeatureBlockA from '../components/homepage/FeatureBlockA';
import FeatureBlockB from '../components/homepage/FeatureBlockB';
import Testimonials from '../components/homepage/Testimonials';
import Subscribe from '../components/homepage/Subscribe';
import Footer from '../components/layout/Footer';

const SampleHomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Journeys />
        <FeatureBlockA />
        <FeatureBlockB />
        <Testimonials />
        <Subscribe />
      </main>
      <Footer />
    </div>
  );
};

export default SampleHomePage;


