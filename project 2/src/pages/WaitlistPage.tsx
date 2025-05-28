import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const WaitlistPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-dark to-gray-800 py-16">
      <div className="container mx-auto px-4">
        <Link 
          to="/courses"
          className="inline-flex items-center text-gray-400 hover:text-white mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Courses
        </Link>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white/10 rounded-lg p-8">
            <h1 className="text-3xl font-heading font-bold text-white mb-4 text-center">
              Join the Waitlist
            </h1>
            <p className="text-gray-300 text-center mb-8">
              Be the first to know when new transformative courses become available
            </p>

            <div className="bg-white/5 rounded-lg p-6">
              <script src="https://f.convertkit.com/ckjs/ck.5.js"></script>
              <form 
                action="https://app.kit.com/forms/8086370/subscriptions" 
                className="seva-form formkit-form" 
                method="post" 
                data-sv-form="8086370" 
                data-uid="0e50f5f42b" 
                data-format="inline" 
                data-version="5"
              >
                <div className="flex flex-col gap-4">
                  <input 
                    type="email"
                    name="email_address" 
                    className="bg-white/5 border border-accent/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                    placeholder="Enter your email address"
                    required
                  />
                  <button 
                    type="submit"
                    className="bg-accent text-white px-8 py-3 rounded-lg hover:bg-accent/80 transition-colors font-semibold"
                  >
                    Join Waitlist
                  </button>
                </div>
                <p className="text-sm text-gray-400 text-center mt-4">
                  Join our community. Unsubscribe anytime.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitlistPage;