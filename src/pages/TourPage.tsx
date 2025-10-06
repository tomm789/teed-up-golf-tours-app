import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTourBySlug } from '@/data/tours';
import { useWordPressTourStore } from '@/hooks/useWordPressTourStore';
import { mapSingleTourToTour } from '@/lib/wpTourMapper';
import { useAppStore } from '@/hooks/useStore';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import TourHeader from '../components/tour/TourHeader';
import TourDetails from '../components/tour/TourDetails';
import AboutCard from '../components/tour/AboutCard';
import Highlights from '../components/tour/Highlights';
import CollectionCarousels from '../components/tour/CollectionCarousels';
import DaySelector from '../components/tour/DaySelector';
import FaqSection from '../components/tour/FaqSection';
import HostSection from '../components/tour/HostSection';
import SimilarTours from '../components/tour/SimilarTours';
import Modal from '../components/shared/Modal';
import BookingFlow from '../components/booking/BookingFlow';
import { WooService } from '@/services/woocommerceService';
import { Card } from '@/components/ui/card';

const TourPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { selectedDay, activeModal, setSelectedDay, setActiveModal } = useAppStore();
  const [tour, setTour] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error] = useState<string | null>(null);
  const { tour: wpTour, isLoading: isWPLoading, error: wpError, fetchTour } = useWordPressTourStore();
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    let isActive = true;
    const boot = async () => {
      try {
        setLoading(true);
        // Always try WP first (unless it's the special sample tour which we want preserved)
        if (slug && slug !== 'portugal-spain-golf-tour') {
          await fetchTour(slug);
        }
        // Fallback to sample content if WP missing or for the Portugal/Spain preserved page
        if (isActive) {
          const fallback = getTourBySlug(slug || 'portugal-spain-golf-tour');
          if (fallback) setTour(fallback);
        }
      } catch (e) {
        // ignore, handled via state
      } finally {
        if (isActive) setLoading(false);
      }
    };
    boot();
    return () => { isActive = false; };
  }, [slug, fetchTour]);

  // If WP data exists, map it onto the existing Tour shape for rendering
  const effectiveTour = React.useMemo(() => {
    if (wpTour && slug !== 'portugal-spain-golf-tour') {
      try {
        return mapSingleTourToTour(wpTour);
      } catch {
        return tour;
      }
    }
    return tour;
  }, [wpTour, tour, slug]);

  const handleModalOpen = (modalId: string) => {
    setActiveModal(modalId);
  };

  const handleModalClose = () => {
    setActiveModal(null);
  };

  const handleBookingOpen = () => {
    // Try to initiate WooCommerce booking if product mapping is known; fallback to local flow
    try {
      const woo = new WooService();
      // TEMP: use tour id as product id assumption; in real mapping, fetch from ACF/Woo metadata
      woo.initiateBooking(String(effectiveTour.id)).catch(() => setIsBookingOpen(true));
    } catch {
      setIsBookingOpen(true);
    }
  };

  const handleBookingClose = () => {
    setIsBookingOpen(false);
  };

  if (loading || isWPLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2" style={{ borderColor: 'var(--tu-gold)' }}></div>
          <p className="mt-4 text-lg" style={{ color: 'var(--tu-navy)' }}>Loading tour...</p>
        </div>
      </div>
    );
  }

  if (error || (!effectiveTour && !wpError)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4" style={{ color: 'var(--tu-navy)' }}>Tour Not Found</h1>
          <p className="mb-6" style={{ color: 'var(--tu-ink)' }}>{error || 'The requested tour could not be found.'}</p>
          <button 
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  const currentDay = effectiveTour.itinerary?.find((day: any) => day.id === selectedDay) || effectiveTour.itinerary?.[0];
  const currentModalData = effectiveTour.modalData?.find((modal: any) => modal.id === activeModal) || null;

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--tu-warmgray)' }}>
      <Header />
      <div className="container py-8">
        
        {/* 1. Tour Header + Details */}
        <section className="mb-12">
          <TourHeader tour={effectiveTour} />
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              <AboutCard tour={effectiveTour} />
              <Highlights tour={effectiveTour} />
            </div>
            
            {/* Right Column - Sticky on Desktop */}
            <div className="lg:col-span-1">
              <TourDetails tour={effectiveTour} onBookNow={handleBookingOpen} />
            </div>
          </div>
        </section>

        {/* 2. Collections Carousels */}
        <CollectionCarousels tour={effectiveTour} onModalOpen={handleModalOpen} />

        {/* 3. Day-by-Day Itinerary + FAQ */}
        <section className="mb-12">
          <Card className="p-6 rounded-none sm:rounded-2xl shadow-sm mb-8">
            <h2 className="text-2xl font-bold mb-6">Itinerary</h2>
            
            <DaySelector
              selectedDay={selectedDay}
              totalDays={tour.itinerary?.length || 0}
              onDaySelect={setSelectedDay}
            />
            
            <div className="space-y-6">
              <Card className="p-6 rounded-none sm:rounded-2xl shadow-sm border border-gray-200">
                <h4 className="text-lg font-bold mb-3">Day {currentDay.id}: {currentDay.title}</h4>
                <p className="text-gray-600 mb-6">{currentDay.description}</p>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h5 className="font-semibold text-sm mb-3 text-[#D2CB97]">Activities</h5>
                    <ul className="space-y-2">
                      {currentDay.activities.map((activity: string, index: number) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <div className="h-1.5 w-1.5 bg-[#D2CB97] rounded-full mt-2 flex-shrink-0" />
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-semibold text-sm mb-3 text-[#949371]">Meals Included</h5>
                    <ul className="space-y-2">
                      {currentDay.meals.map((meal: string, index: number) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <div className="h-1.5 w-1.5 bg-[#949371] rounded-full mt-2 flex-shrink-0" />
                          {meal}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-semibold text-sm mb-3 text-[#222136]">Accommodation</h5>
                    <ul className="space-y-2">
                      {currentDay.accommodation.map((acc: string, index: number) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <div className="h-1.5 w-1.5 bg-[#222136] rounded-full mt-2 flex-shrink-0" />
                          {acc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </Card>
          
          <FaqSection tour={effectiveTour} />
        </section>

        {/* 4. Tour Host Section */}
        <HostSection tour={effectiveTour} />

        {/* 5. Similar Tours */}
        <div className="px-6 sm:px-0">
          <SimilarTours tour={effectiveTour} />
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
      
      {/* Modal */}
      <Modal
        isOpen={activeModal !== null}
        onClose={handleModalClose}
        data={currentModalData}
      />
      
      {/* Booking Flow */}
      <BookingFlow
        tour={effectiveTour}
        isOpen={isBookingOpen}
        onClose={handleBookingClose}
      />
    </div>
  );
};

export default TourPage;

