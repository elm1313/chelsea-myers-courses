import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const CookiePolicy = () => {
  return (
    <div className="bg-gradient-to-b from-dark to-gray-800 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <Link 
          to="/"
          className="inline-flex items-center text-gray-400 hover:text-white mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <div className="bg-white/10 rounded-lg p-8 md:p-12">
          <h1 className="text-4xl font-heading font-bold text-white mb-8">Cookie Policy</h1>
          
          <div className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-heading font-bold text-white mt-8 mb-4">Contact Information</h2>
            <p className="text-gray-300 mb-6">
              If you have any questions about this Cookie Policy or our use of cookies, please contact us:<br />
              <strong>Chelsea Myers Coaching LLC</strong><br />
              Email: <a href="mailto:support@chelseamyers.live" className="text-accent hover:underline">support@chelseamyers.live</a><br />
              Website: <a href="https://chelseamyers.courses" className="text-accent hover:underline">chelseamyers.courses</a>
            </p>

            <h2 className="text-2xl font-heading font-bold text-white mt-8 mb-4">Your Rights</h2>
            <p className="text-gray-300 mb-4">
              Depending on your location, you may have certain rights regarding cookies and personal data:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
              <li>Right to access information about cookies we use</li>
              <li>Right to withdraw consent for non-essential cookies</li>
              <li>Right to object to certain types of cookies</li>
              <li>Right to request deletion of data collected through cookies</li>
            </ul>

            <h2 className="text-2xl font-heading font-bold text-white mt-8 mb-4">Legal Basis</h2>
            <p className="text-gray-300 mb-4">
              Our legal basis for using cookies depends on the type of cookie:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Essential cookies: Legitimate interest in providing our service</li>
              <li>Analytics cookies: Your consent or legitimate interest</li>
              <li>Marketing cookies: Your consent</li>
              <li>Functional cookies: Your consent or legitimate interest</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;