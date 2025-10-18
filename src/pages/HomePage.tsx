import React from 'react';
import Header from '../components/layout/Header';
import Hero from '../components/homepage/Hero';
import Journeys from '../components/homepage/Journeys';
import FeatureBlockA from '../components/homepage/FeatureBlockA';
import FeatureBlockB from '../components/homepage/FeatureBlockB';
import Testimonials from '../components/homepage/Testimonials';
import Subscribe from '../components/homepage/Subscribe';
import Footer from '../components/layout/Footer';
import { useWordPressHomeStore } from '@/hooks/useWordPressHomeStore';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import ErrorBoundary from '@/components/shared/ErrorBoundary';

const HomePage: React.FC = () => {
  const { data, isLoading, error, fetch } = useWordPressHomeStore();

  React.useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {isLoading && (
          <div className="py-24 flex justify-center"><LoadingSpinner /></div>
        )}
        {!isLoading && error && (
          <div className="py-12 container text-center text-red-600">{error}</div>
        )}
        {!isLoading && !error && (
          <ErrorBoundary>
            <Hero slides={data?.slides} />
            <Journeys tours={data?.tours} />
            <FeatureBlockA blocks={data?.features} />
            <FeatureBlockB />
            <Testimonials />
            <Subscribe />
          </ErrorBoundary>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;

