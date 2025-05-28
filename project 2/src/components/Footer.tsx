import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Youtube, Mic, X } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white">
      {/* Social Media Section */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h3 className="font-heading font-bold mb-4 text-2xl">Follow Me</h3>
            <div className="flex justify-center gap-4">
              <a 
                href="https://www.linkedin.com/in/chelsea-myers-57345417/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-accent transition-colors p-2"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com/ChelseaMyersCo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-accent transition-colors p-2"
                aria-label="X (formerly Twitter)"
              >
                <X className="w-5 h-5" />
              </a>
              <a 
                href="https://www.youtube.com/@chelsea-myers/featured"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-accent transition-colors p-2"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a 
                href="https://open.spotify.com/show/2p88rzpvDeT1TClItmbKOY"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-accent transition-colors p-2"
                aria-label="Podcast"
              >
                <Mic className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8">
          {/* Copyright and Disclaimer */}
          <div>
            <p className="text-sm text-accent mb-4">
              © {currentYear} Chelsea Myers Coaching LLC
            </p>
            <p className="text-xs text-gray-400 leading-relaxed">
              The author of these courses, the publisher and all professionals involved do not provide medical advice or prescribe the use of any techniques as a form of treatment for physical, medical, psychological, or emotional conditions. Any references to health-related information within the courses, or in associated discussions, are based on anecdotal insights from individual experiences and client sessions and should not be interpreted as professional advice. The courses, their content, and any related conversations are not intended to diagnose, treat, cure, or prevent any medical or psychological condition, nor to replace professional medical advice, diagnosis, or treatment from a qualified healthcare provider.
            </p>
          </div>
          
          {/* Navigation Links */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <h3 className="font-heading font-bold mb-2 text-accent text-sm">Chelsea Myers Coaching</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-white hover:text-accent text-sm">Home</Link></li>
                <li><Link to="/courses" className="text-white hover:text-accent text-sm">Courses</Link></li>
                <li><Link to="/enroll" className="text-white hover:text-accent text-sm">Enroll</Link></li>
                <li><Link to="/podcast" className="text-white hover:text-accent text-sm">Podcast</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-heading font-bold mb-2 text-accent text-sm">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="/privacy" className="text-gray-400 hover:text-accent text-sm">Privacy</Link></li>
                <li><Link to="/terms" className="text-gray-400 hover:text-accent text-sm">Terms</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-heading font-bold mb-2 text-accent text-sm">Contact</h3>
              <a 
                href="mailto:support@chelseamyers.live" 
                className="text-gray-400 hover:text-accent text-sm break-all"
              >
                support@chelseamyers.live
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;