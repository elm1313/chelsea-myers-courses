import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { supabase } from '../lib/supabase';
import { Settings, Menu, X } from 'lucide-react';
import AuthModal from './AuthModal';

const Navbar = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-beige py-3 shadow-sm relative z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <div className="flex flex-col">
              <span className="font-heading text-lg md:text-2xl font-black tracking-wider text-dark">
                CHELSEA MYERS
              </span>
              <span className="font-heading text-xs tracking-[0.3em] text-accent/90">
                COACHING
              </span>
            </div>
          </Link>

          {/* Mobile Menu Button and Sign In/Enroll */}
          <div className="flex items-center gap-3 md:hidden">
            {user ? (
              <Link 
                to="/dashboard" 
                className="text-accent px-3 py-1.5 rounded text-sm"
              >
                Dashboard
              </Link>
            ) : (
              <Link 
                to="/enroll" 
                className="bg-accent text-white px-3 py-1.5 rounded text-sm"
              >
                Enroll
              </Link>
            )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1.5 text-gray-700 hover:text-gray-900"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {user ? (
              <>
                <button
                  onClick={handleSignOut}
                  className="text-gray-700 hover:text-gray-900 tracking-wider"
                >
                  Sign out
                </button>
                <Link 
                  to="/dashboard" 
                  className="border-2 border-accent text-accent px-4 py-2 rounded hover:bg-accent hover:text-white tracking-wider"
                >
                  Dashboard
                </Link>
                <Link
                  to="/account"
                  className="text-accent hover:text-accent/80 transition-colors"
                  title="Account Settings"
                >
                  <Settings className="w-6 h-6" />
                </Link>
              </>
            ) : (
              <>
                <Link to="/about" className="text-gray-700 hover:text-gray-900 tracking-wider">
                  About Chelsea
                </Link>
                <Link to="/courses" className="text-gray-700 hover:text-gray-900 tracking-wider">
                  Courses
                </Link>
                <Link to="/podcast" className="text-gray-700 hover:text-gray-900 tracking-wider">
                  Podcast
                </Link>
                <Link to="/enroll" className="bg-accent text-white px-4 py-2 rounded hover:bg-accent/80 tracking-wider">
                  Enroll
                </Link>
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="border-2 border-accent text-accent px-4 py-2 rounded hover:bg-accent hover:text-white tracking-wider"
                >
                  Sign in
                </button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-beige shadow-lg py-4 px-4 space-y-3 md:hidden">
            {user ? (
              <>
                <Link
                  to="/account"
                  className="block text-center text-accent hover:text-accent/80 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Account Settings
                </Link>
                <button
                  onClick={handleSignOut}
                  className="block w-full text-center text-gray-700 hover:text-gray-900 tracking-wider py-2"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/about" 
                  className="block text-center text-gray-700 hover:text-gray-900 tracking-wider py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About Chelsea
                </Link>
                <Link 
                  to="/courses" 
                  className="block text-center text-gray-700 hover:text-gray-900 tracking-wider py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Courses
                </Link>
                <Link 
                  to="/podcast" 
                  className="block text-center text-gray-700 hover:text-gray-900 tracking-wider py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Podcast
                </Link>
                <button
                  onClick={() => {
                    setIsAuthModalOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-center text-accent hover:text-accent/80 py-2"
                >
                  Sign in
                </button>
              </>
            )}
          </div>
        )}
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </nav>
  );
}

export default Navbar;