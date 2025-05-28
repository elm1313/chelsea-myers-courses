import React from 'react';

const EmailSignupForm = () => {
  return (
    <div className="max-w-4xl mx-auto mb-12">
      <div className="bg-white/10 rounded-lg p-8 border border-accent/20">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-heading font-bold text-white mb-4">
            Stay Updated on New Courses
          </h2>
        </div>
        
        <div className="max-w-lg mx-auto">
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
            <div className="flex flex-col md:flex-row gap-4">
              <input 
                type="email"
                name="email_address" 
                className="flex-grow bg-white/5 border border-accent/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                placeholder="Enter your email address"
                required
              />
              <button 
                type="submit"
                className="bg-accent text-white px-8 py-3 rounded-lg hover:bg-accent/80 transition-colors font-semibold whitespace-nowrap"
              >
                Subscribe
              </button>
            </div>
            <p className="text-sm text-gray-400 text-center mt-4">
              Join our community. Unsubscribe anytime.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmailSignupForm;