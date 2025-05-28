import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import EmailSignupForm from '../components/EmailSignupForm';

const InnerGoldPage = () => {
  return (
    <div className="bg-gradient-to-b from-dark to-gray-800 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <Link to="/waitlist" className="bg-accent text-white py-3 px-6 inline-block rounded-full mb-8 hover:bg-accent/80 transition-colors">
            JOIN THE WAITLIST
          </Link>
          
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
            Inner Gold™
          </h1>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-heading font-bold text-accent mb-4">
                Spiritual Fortitude, Frequency Mastery, and the Unshakable Knowing of Who You Are
              </h2>
              <p className="text-xl text-gray-300">
                Inner Gold™ is for visionaries, sensitives, and leaders who were always different — but who've been told to dull their shine, question their intuition, or seek safety through control. This is a spiritual reclaiming — a journey of energetic sovereignty, frequency protection, and conscious stewardship of the soul's original mission.
              </p>
              
              <Link
                to="/waitlist"
                className="mt-8 inline-block bg-accent text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-accent/80 transition-colors"
              >
                JOIN THE WAITLIST
              </Link>
            </div>
            
            <div className="md:w-1/2">
              <div className="relative mx-auto" style={{ maxWidth: '800px' }}>
                <div className="relative rounded-[2.5rem] border-[14px] border-gray-600 bg-gray-700 shadow-[0_0_40px_rgba(0,0,0,0.3)] ring-1 ring-white/10">
                  <div className="relative rounded-[1.25rem] overflow-hidden bg-white aspect-[744/1133]">
                    <img 
                      src="https://whfxjpakwumczkojrwmq.supabase.co/storage/v1/object/public/images//chelsea-studio.jpg"
                      alt="Chelsea Myers teaching Inner Gold"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-2 border-gray-400"></div>
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-gray-400"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mb-24">
          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-gray-300 mb-8">
              Through practical tools, transmission-based lessons, and experiential activations, you'll fortify your inner compass and remember how to walk this world with quiet power and non-negotiable clarity. The world may try to shake you, but gold doesn't tarnish.
            </p>
            <p className="text-gray-300 mb-12">
              This is the path of the initiated — those who came with codes, and now choose to live by them.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white/10 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-accent/20 p-2 rounded-lg">
                    <Sparkles className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-heading font-bold text-xl">Energetic Sovereignty</h3>
                </div>
                <p className="text-gray-300">
                  Develop unshakeable energetic boundaries and protect your frequency.
                </p>
              </div>
              
              <div className="bg-white/10 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-accent/20 p-2 rounded-lg">
                    <Sparkles className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-heading font-bold text-xl">Soul Mission</h3>
                </div>
                <p className="text-gray-300">
                  Connect with and honor your soul's original mission and purpose.
                </p>
              </div>
              
              <div className="bg-white/10 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-accent/20 p-2 rounded-lg">
                    <Sparkles className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-heading font-bold text-xl">Inner Compass</h3>
                </div>
                <p className="text-gray-300">
                  Strengthen your connection to inner guidance and intuitive wisdom.
                </p>
              </div>
            </div>

            <div className="text-center">
              <Link
                to="/waitlist"
                className="inline-block bg-accent text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-accent/80 transition-colors mb-12"
              >
                Join the Wait List
              </Link>
              <div className="bg-accent/10 border border-accent/20 rounded-lg p-6 inline-block">
                <p className="text-lg text-accent font-heading">
                  A portion of our proceeds from all course enrollments are donated to support efforts to combat child trafficking and provide aid to rescued survivors.
                </p>
              </div>
            </div>
          </div>
        </div>

        <EmailSignupForm />
      </div>
    </div>
  );
};

export default InnerGoldPage;