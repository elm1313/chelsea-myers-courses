import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Crown, Shield, Zap } from 'lucide-react';
import EmailSignupForm from '../components/EmailSignupForm';

const SovereignFrequencyPage = () => {
  return (
    <div className="bg-gradient-to-b from-dark to-gray-800 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <Link to="/waitlist" className="bg-accent text-white py-3 px-6 inline-block rounded-full mb-8 hover:bg-accent/80 transition-colors">
            JOIN THE WAITLIST
          </Link>
          
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
            Sovereign Frequency™
          </h1>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-heading font-bold text-accent mb-4">
                Unlocking Your True Timeline, Voice, and Vision
              </h2>
              <p className="text-xl text-gray-300">
                This course is a remembrance container, a frequency recalibration, and a timeline alignment tool. It's for people who know they're meant for more — they feel it in their body — but they're still looping in subtle compromises, inherited patterns, or stuck timelines.
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
                      alt="Chelsea Myers teaching Sovereign Frequency"
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
              They may be spiritual or newly awakening. They may be high-functioning but misaligned. They're searching for a way to access their true power without force. You are the bridge.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white/10 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-accent/20 p-2 rounded-lg">
                    <Crown className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-heading font-bold text-xl">Timeline Alignment</h3>
                </div>
                <p className="text-gray-300">
                  Step into your highest timeline and break free from limiting patterns.
                </p>
              </div>
              
              <div className="bg-white/10 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-accent/20 p-2 rounded-lg">
                    <Shield className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-heading font-bold text-xl">Frequency Reset</h3>
                </div>
                <p className="text-gray-300">
                  Recalibrate your energy and align with your authentic power.
                </p>
              </div>
              
              <div className="bg-white/10 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-accent/20 p-2 rounded-lg">
                    <Zap className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-heading font-bold text-xl">True Voice</h3>
                </div>
                <p className="text-gray-300">
                  Discover and embody your authentic voice and vision.
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

export default SovereignFrequencyPage;