import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Lightbulb, Wand2, Compass } from 'lucide-react';
import EmailSignupForm from '../components/EmailSignupForm';

const LightArchitectPage = () => {
  return (
    <div className="bg-gradient-to-b from-dark to-gray-800 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <Link to="/waitlist" className="bg-accent text-white py-3 px-6 inline-block rounded-full mb-8 hover:bg-accent/80 transition-colors">
            JOIN THE WAITLIST
          </Link>
          
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
            Light Architect™
          </h1>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-heading font-bold text-accent mb-4">
                Designing Reality Through Frequency, Vision, and Inner Technology
              </h2>
              <p className="text-xl text-gray-300">
                This course is about designing your reality from the inside out as a co-creator, rather than a fixer, striver, or survivor. It's for visionaries, innovators, spiritual entrepreneurs, or initiates stepping into their creative power — not through hustle, but through harmonics.
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
                      alt="Chelsea Myers teaching Light Architect"
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
              Each module unveils a new layer of creative authorship. You're not here to react to life — you're here to design it. Reality is made of light, and you are the architect.
            </p>
            <p className="text-gray-300 mb-12">
              Build a life and legacy from your inner light grid.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white/10 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-accent/20 p-2 rounded-lg">
                    <Lightbulb className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-heading font-bold text-xl">Light Intelligence</h3>
                </div>
                <p className="text-gray-300">
                  Harness the power of frequency and light to shape your reality.
                </p>
              </div>
              
              <div className="bg-white/10 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-accent/20 p-2 rounded-lg">
                    <Wand2 className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-heading font-bold text-xl">Creative Mastery</h3>
                </div>
                <p className="text-gray-300">
                  Access your innate ability to create through harmonics, not hustle.
                </p>
              </div>
              
              <div className="bg-white/10 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-accent/20 p-2 rounded-lg">
                    <Compass className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-heading font-bold text-xl">Inner Technology</h3>
                </div>
                <p className="text-gray-300">
                  Activate and utilize your internal creative technologies.
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

export default LightArchitectPage;