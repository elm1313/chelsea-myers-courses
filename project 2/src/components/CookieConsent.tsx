import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between">
        <div className="text-sm text-gray-600 mb-4 sm:mb-0">
          We use cookies to enhance your experience and analyze our website traffic. 
          By clicking "Accept," you consent to our use of cookies. View our{' '}
          <Link to="/cookies" className="text-accent hover:underline">Cookie Policy</Link> for more information.
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handleDecline}
            className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 text-sm bg-accent text-white rounded hover:bg-accent/80 transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;