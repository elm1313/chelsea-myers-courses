import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, MessageCircle, Sparkles, Heart, Zap, Lightbulb, ArrowRight, Users, Target, TrendingUp } from 'lucide-react';
import EmailSignupForm from '../components/EmailSignupForm';

const DentalIntelligencePage = () => {
  return (
    <div className="bg-gradient-to-b from-dark to-gray-800 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <Link to="/payment/dental" className="bg-accent text-white py-3 px-6 inline-block rounded-full mb-8 hover:bg-accent/80 transition-colors">
            TRANSFORM YOUR LIFE
          </Link>
          
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
            Entrepreneurial Intelligence for Dentists™
          </h1>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-heading font-bold text-accent mb-4">
                Elevate Your Success Through Entrepreneurial Mastery
              </h2>
              <p className="text-xl text-gray-300">
                Entrepreneurship is a specialty within dentistry, and not everyone has the entrepreneurial interests or advanced mindset to excel. Designed for dental professionals ready to step into their potential, this professional LMS course offers interactive video lessons and hands-on strategies to unlock the skills needed to transform your practice and elevate your life as a visionary leader.
              </p>
              
              <Link
                to="/payment/dental"
                className="mt-8 inline-block bg-accent text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-accent/80 transition-colors"
              >
                BEGIN YOUR TRANSFORMATION
              </Link>
            </div>
            
            <div className="md:w-1/2">
              <div className="relative mx-auto" style={{ maxWidth: '800px' }}>
                <div className="relative rounded-[2.5rem] border-[14px] border-gray-600 bg-gray-700 shadow-[0_0_40px_rgba(0,0,0,0.3)] ring-1 ring-white/10">
                  <div className="relative rounded-[1.25rem] overflow-hidden bg-white aspect-[744/1133]">
                    <img 
                      src="https://whfxjpakwumczkojrwmq.supabase.co/storage/v1/object/public/images//chelsea-studio.jpg"
                      alt="Chelsea Myers teaching dental professionals"
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white mb-24">
          <div className="bg-white/10 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-accent/20 p-2 rounded-lg">
                <Brain className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-heading font-bold text-xl">Mindset Mastery</h3>
            </div>
            <p className="text-gray-300">
              Develop an entrepreneurial mindset that drives success and sustainable growth in your practice.
            </p>
          </div>
          
          <div className="bg-white/10 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-accent/20 p-2 rounded-lg">
                <Target className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-heading font-bold text-xl">Strategic Growth</h3>
            </div>
            <p className="text-gray-300">
              Learn proven strategies for practice development, team leadership, and financial success.
            </p>
          </div>
          
          <div className="bg-white/10 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-accent/20 p-2 rounded-lg">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-heading font-bold text-xl">Team Excellence</h3>
            </div>
            <p className="text-gray-300">
              Build and lead high-performing teams that drive practice success and patient satisfaction.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-heading font-bold text-white mb-4">Course Impact</h2>
            <p className="text-xl text-accent mb-6">Ignite Lasting Growth in Your Dental Practice</p>
            <p className="text-gray-300 mb-8">
              This program is a transformative experience tailored specifically for dentists with entrepreneurial aspirations. By fully investing in these processes, you'll uncover the unique opportunities to redefine your path—both professionally and personally. The impact you'll experience is directly tied to the dedication, consistency, and intentionality you bring to this journey, equipping you with the tools to navigate challenges, foster an abundant mindset, and lead with unwavering clarity.
            </p>
          </div>

          <div className="mb-16">
            <div className="flex flex-col md:flex-row items-center gap-12 mb-12">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-heading font-bold text-white mb-4">
                  Why This Course?
                </h2>
                <p className="text-xl text-accent mb-6">
                  Transform Your Life Through Strategic Leadership
                </p>
                <img 
                  src="https://whfxjpakwumczkojrwmq.supabase.co/storage/v1/object/public/images//Chelsea%20Arms%20Crossed.jpg"
                  alt="Chelsea Myers coaching"
                  className="rounded-lg shadow-xl w-full"
                />
              </div>
              <div className="md:w-1/2">
                <div className="space-y-6">
                  <div className="bg-white/5 rounded-lg p-6">
                    <div className="flex items-center gap-4 mb-3">
                      <ArrowRight className="w-6 h-6 text-accent" />
                      <h3 className="text-xl font-heading font-bold text-white">Discover Your Entrepreneurial Identity</h3>
                    </div>
                    <p className="text-gray-300">
                      Uncover your strengths, identify areas for growth, and define the direction of your practice with a clear vision for success.
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-lg p-6">
                    <div className="flex items-center gap-4 mb-3">
                      <ArrowRight className="w-6 h-6 text-accent" />
                      <h3 className="text-xl font-heading font-bold text-white">Master Financial Clarity</h3>
                    </div>
                    <p className="text-gray-300">
                      Gain a deeper understanding of your beliefs around money, set ambitious financial goals, and create a strategic plan to achieve them with confidence.
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-lg p-6">
                    <div className="flex items-center gap-4 mb-3">
                      <ArrowRight className="w-6 h-6 text-accent" />
                      <h3 className="text-xl font-heading font-bold text-white">Lead with Purpose</h3>
                    </div>
                    <p className="text-gray-300">
                      Learn to manage your time, energy, and focus effectively, making decisions that align with your vision and drive meaningful change in your life.
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-lg p-6">
                    <div className="flex items-center gap-4 mb-3">
                      <ArrowRight className="w-6 h-6 text-accent" />
                      <h3 className="text-xl font-heading font-bold text-white">Build a Thriving Practice Culture</h3>
                    </div>
                    <p className="text-gray-300">
                      Foster connection, accountability, and growth within your team through strategic delegation, effective meetings, and a mindset that embraces challenges as opportunities for learning.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/payment/dental"
              className="inline-block bg-accent text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-accent/80 transition-colors mb-12"
            >
              Start Your Journey Today
            </Link>
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-6 inline-block">
              <p className="text-lg text-accent font-heading">
                A portion of our proceeds from all course enrollments are donated to support efforts to combat child trafficking and provide aid to rescued survivors.
              </p>
            </div>
          </div>
        </div>

        <EmailSignupForm />
      </div>
    </div>
  );
}

export default DentalIntelligencePage;