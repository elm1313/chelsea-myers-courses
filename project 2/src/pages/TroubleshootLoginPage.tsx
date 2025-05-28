import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, AlertCircle, Mail, Key, RefreshCw, Globe, Shield, HelpCircle } from 'lucide-react';

const TroubleshootLoginPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-dark to-gray-800 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <Link 
            to="/"
            className="inline-flex items-center text-gray-400 hover:text-white mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <div className="bg-white/10 rounded-lg p-8">
            <h1 className="text-3xl font-heading font-bold text-white mb-6">
              Having Trouble Logging In?
            </h1>

            <div className="space-y-8">
              {/* Email Issues */}
              <div className="bg-white/5 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-accent/20 p-2 rounded-lg">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <h2 className="text-xl font-heading font-bold text-white">
                    Email Address Issues
                  </h2>
                </div>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <span>Double-check that you're using the exact email address you used during registration</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <span>Check for any typos or extra spaces in your email address</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <span>If you've changed your email address recently, use your previous email</span>
                  </li>
                </ul>
              </div>

              {/* Password Issues */}
              <div className="bg-white/5 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-accent/20 p-2 rounded-lg">
                    <Key className="w-5 h-5 text-accent" />
                  </div>
                  <h2 className="text-xl font-heading font-bold text-white">
                    Password Issues
                  </h2>
                </div>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <span>Ensure Caps Lock is not enabled when entering your password</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <span>Try resetting your password if you can't remember it</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <span>Make sure your password meets all requirements: at least 8 characters, including uppercase, lowercase, number, and special character</span>
                  </li>
                </ul>
              </div>

              {/* Browser Issues */}
              <div className="bg-white/5 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-accent/20 p-2 rounded-lg">
                    <Globe className="w-5 h-5 text-accent" />
                  </div>
                  <h2 className="text-xl font-heading font-bold text-white">
                    Browser Issues
                  </h2>
                </div>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <span>Clear your browser's cache and cookies</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <span>Try using a different browser (we recommend Chrome)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <span>Disable any ad blockers or privacy extensions that might interfere with login</span>
                  </li>
                </ul>
              </div>

              {/* Security Issues */}
              <div className="bg-white/5 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-accent/20 p-2 rounded-lg">
                    <Shield className="w-5 h-5 text-accent" />
                  </div>
                  <h2 className="text-xl font-heading font-bold text-white">
                    Security Issues
                  </h2>
                </div>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <span>If you're using a VPN, try disabling it temporarily</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <span>Ensure you're not using a shared or public network that might block authentication</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <span>Check if your firewall or security software is blocking the login process</span>
                  </li>
                </ul>
              </div>

              {/* Still Having Issues */}
              <div className="bg-white/5 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-accent/20 p-2 rounded-lg">
                    <HelpCircle className="w-5 h-5 text-accent" />
                  </div>
                  <h2 className="text-xl font-heading font-bold text-white">
                    Still Having Issues?
                  </h2>
                </div>
                <p className="text-gray-300 mb-6">
                  If you've tried all the above solutions and still can't log in, we're here to help:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link
                    to="/"
                    onClick={(e) => {
                      e.preventDefault();
                      window.history.back();
                    }}
                    className="flex items-center justify-center gap-2 bg-accent text-white px-6 py-3 rounded-lg hover:bg-accent/80 transition-colors text-center"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Try Logging In Again
                  </Link>
                  <a
                    href="mailto:support@chelseamyers.live"
                    className="flex items-center justify-center gap-2 bg-white/10 text-white px-6 py-3 rounded-lg hover:bg-white/20 transition-colors text-center"
                  >
                    <Mail className="w-4 h-4" />
                    Contact Support
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TroubleshootLoginPage;