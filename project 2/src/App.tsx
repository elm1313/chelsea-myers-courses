import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import CoursesPage from './pages/CoursesPage';
import QuantumUpgradePage from './pages/QuantumUpgradePage';
import CommunicationBlueprintPage from './pages/CommunicationBlueprintPage';
import DentalIntelligencePage from './pages/DentalIntelligencePage';
import InnerGoldPage from './pages/InnerGoldPage';
import SovereignFrequencyPage from './pages/SovereignFrequencyPage';
import LightArchitectPage from './pages/LightArchitectPage';
import AboutPage from './pages/AboutPage';
import PodcastPage from './pages/PodcastPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import CookiePolicy from './pages/CookiePolicy';
import EnrollPage from './pages/EnrollPage';
import PaymentPage from './pages/PaymentPage';
import DashboardPage from './pages/DashboardPage';
import CoursePage from './pages/CoursePage';
import AccountPage from './pages/AccountPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import WaitlistPage from './pages/WaitlistPage';
import TroubleshootLoginPage from './pages/TroubleshootLoginPage';
import CookieConsent from './components/CookieConsent';
import AuthModal from './components/AuthModal';
import { AuthProvider, useAuth } from './components/AuthProvider';

// ScrollToTop component to handle scrolling on route changes
const ScrollToTop = () => {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  return null;
};

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

function AppContent() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navbar onSignInClick={() => setIsAuthModalOpen(true)} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/quantum" element={<QuantumUpgradePage />} />
            <Route path="/courses/communication" element={<CommunicationBlueprintPage />} />
            <Route path="/courses/dental" element={<DentalIntelligencePage />} />
            <Route path="/courses/inner-gold" element={<InnerGoldPage />} />
            <Route path="/courses/sovereign-frequency" element={<SovereignFrequencyPage />} />
            <Route path="/courses/light-architect" element={<LightArchitectPage />} />
            <Route path="/podcast" element={<PodcastPage />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="/cookies" element={<CookiePolicy />} />
            <Route path="/enroll" element={<EnrollPage />} />
            <Route path="/payment/:courseId" element={<PaymentPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/waitlist" element={<WaitlistPage />} />
            <Route path="/troubleshoot-login" element={<TroubleshootLoginPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/account"
              element={
                <ProtectedRoute>
                  <AccountPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/course/:slug"
              element={
                <ProtectedRoute>
                  <CoursePage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
        <CookieConsent />
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
        />
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;