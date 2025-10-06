import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const LuxuryPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <div className="container py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="display-font text-4xl lg:text-6xl mb-6" style={{ color: 'var(--tu-navy)' }}>
              LUXURY GOLF TOURS
            </h1>
            <p className="text-lg lg:text-xl leading-relaxed mb-8" style={{ color: 'var(--tu-ink)' }}>
              Experience the pinnacle of luxury golf travel with our premium tour collection.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="display-font text-lg mb-3" style={{ color: 'var(--tu-navy)' }}>
                  Premium Accommodations
                </h3>
                <p style={{ color: 'var(--tu-ink)' }}>
                  Stay at the world's most prestigious hotels and resorts.
                </p>
              </div>
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="display-font text-lg mb-3" style={{ color: 'var(--tu-navy)' }}>
                  Exclusive Access
                </h3>
                <p style={{ color: 'var(--tu-ink)' }}>
                  Play on private courses and enjoy VIP experiences.
                </p>
              </div>
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="display-font text-lg mb-3" style={{ color: 'var(--tu-navy)' }}>
                  Personalized Service
                </h3>
                <p style={{ color: 'var(--tu-ink)' }}>
                  Dedicated concierge and personal tour host.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LuxuryPage;

