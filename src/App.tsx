import { Routes, Route, Navigate } from 'react-router-dom';
import TourPage from './pages/TourPage';
import LuxuryPage from './pages/LuxuryPage';
import SampleHomePage from './pages/SampleHomePage';
import ToursArchivePage from './pages/ToursArchivePage';
import ToursArchiveDemoPage from './pages/ToursArchiveDemoPage';

function App() {
  return (
    <Routes>
      {/* Temporary redirect to sample homepage */}
      <Route path="/" element={<Navigate to="/sample" replace />} />
      <Route path="/sample" element={<SampleHomePage />} />
      <Route path="/tour/:slug" element={<TourPage />} />
      <Route path="/luxury" element={<LuxuryPage />} />
      <Route path="/tours" element={<ToursArchivePage />} />
      <Route path="/tours-demo" element={<ToursArchiveDemoPage />} />
    </Routes>
  );
}

export default App;
