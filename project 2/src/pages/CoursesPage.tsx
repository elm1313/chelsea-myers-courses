import React from 'react';
import { Link } from 'react-router-dom';
import { Unlink, MessageCircle, TrendingUp, Star, Globe, Sparkles } from 'lucide-react';
import CoachingCard from '../components/CoachingCard';

const CoursesPage = () => {
  return (
    <div className="bg-gradient-to-b from-dark to-gray-800 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
            Transform Your Life
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Choose from our selection of transformative courses designed to help you reach your full potential.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <img
                src="https://whfxjpakwumczkojrwmq.supabase.co/storage/v1/object/public/images//Chelsea%20Speaking.jpg"
                alt="Chelsea Myers speaking"
                className="rounded-lg shadow-xl w-full"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-heading font-bold text-white mb-4">
                Learn with Chelsea Myers
              </h2>
              <p className="text-gray-300">
                Join Chelsea's professional, interactive courses—each designed to support a key area of growth:
              </p>
              <ul className="mt-4 space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-accent text-2xl leading-none">•</span>
                  <span className="text-gray-300">Master Communication with expert video coaching and real-world practice.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent text-2xl leading-none">•</span>
                  <span className="text-gray-300">Overcome Personal Challenges through guided self-reflection and empowering strategies. Finally be free from the grip of pornography.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent text-2xl leading-none">•</span>
                  <span className="text-gray-300">Magnify Your Dental Entrepreneur Mindset with targeted tools to fuel innovation and leadership.</span>
                </li>
              </ul>
              <p className="text-gray-300 mt-4">
                Elevate your career and strengthen your life with tools designed to support your growth—personally and professionally.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white/10 rounded-lg overflow-hidden">
            <div className="aspect-video bg-accent/20 flex items-center justify-center">
              <Unlink className="w-16 h-16 text-accent" />
            </div>
            <div className="p-6">
              <h3 className="font-heading font-bold text-2xl text-white mb-2">
                Quantum Upgrade Personal Transformation™
              </h3>
              <p className="text-gray-300 mb-6">
                Kick pornography to the curb - born from deep, private work with people seeking freedom – a course rooted in energetics, self-leadership, and sustainable freedom.
              </p>
              <div className="flex items-center gap-4">
                <Link
                  to="/payment/quantum"
                  className="flex-grow bg-accent text-white px-6 py-2 rounded-lg hover:bg-accent/80 transition-colors text-center"
                >
                  Enroll Now
                </Link>
                <Link
                  to="/courses/quantum"
                  className="text-accent hover:text-accent/80 transition-colors"
                >
                  Learn More →
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white/10 rounded-lg overflow-hidden">
            <div className="aspect-video bg-accent/20 flex items-center justify-center">
              <MessageCircle className="w-16 h-16 text-accent" />
            </div>
            <div className="p-6">
              <h3 className="font-heading font-bold text-2xl text-white mb-2">
                The Communication Blueprint
              </h3>
              <p className="text-gray-300 mb-6">
                Advance your communication with this interactive LMS course, featuring video coaching and five bonus mini-courses. It is for anyone ready to connect from their core and lead with clarity, compassion, and power.
              </p>
              <div className="flex items-center gap-4">
                <Link
                  to="/payment/communication"
                  className="flex-grow bg-accent text-white px-6 py-2 rounded-lg hover:bg-accent/80 transition-colors text-center"
                >
                  Enroll Now
                </Link>
                <Link
                  to="/courses/communication"
                  className="text-accent hover:text-accent/80 transition-colors"
                >
                  Learn More →
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white/10 rounded-lg overflow-hidden">
            <div className="aspect-video bg-accent/20 flex items-center justify-center">
              <TrendingUp className="w-16 h-16 text-accent" />
            </div>
            <div className="p-6">
              <h3 className="font-heading font-bold text-2xl text-white mb-2">
                Entrepreneurial Intelligence for Dentists™
              </h3>
              <p className="text-gray-300 mb-6">
                An interactive masterclass in developing as an entrepreneur, team dynamics, and aligned growth.
              </p>
              <div className="flex items-center gap-4">
                <Link
                  to="/payment/dental"
                  className="flex-grow bg-accent text-white px-6 py-2 rounded-lg hover:bg-accent/80 transition-colors text-center"
                >
                  Enroll Now
                </Link>
                <Link
                  to="/courses/dental"
                  className="text-accent hover:text-accent/80 transition-colors"
                >
                  Learn More →
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white/10 rounded-lg overflow-hidden relative">
            <div className="absolute -right-12 top-6 bg-accent text-white py-1 px-12 transform rotate-45 z-10">
              <span className="text-sm font-semibold">Coming Soon</span>
            </div>
            <div className="aspect-video bg-accent/20 flex items-center justify-center">
              <Sparkles className="w-16 h-16 text-accent" />
            </div>
            <div className="p-6">
              <h3 className="font-heading font-bold text-2xl text-white mb-2">
                Inner Gold™
              </h3>
              <p className="text-gray-300 mb-6">
                Spiritual Fortitude, Frequency Mastery, and the Unshakable Knowing of Who You Are. The world may try to shake you, but gold doesn't tarnish.
              </p>
              <div className="flex items-center gap-4">
                <Link
                  to="/waitlist"
                  className="flex-grow bg-accent text-white px-6 py-2 rounded-lg hover:bg-accent/80 transition-colors text-center"
                >
                  Join the Wait List
                </Link>
                <Link
                  to="/courses/inner-gold"
                  className="text-accent hover:text-accent/80 transition-colors"
                >
                  Learn More →
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white/10 rounded-lg overflow-hidden relative">
            <div className="absolute -right-12 top-6 bg-accent text-white py-1 px-12 transform rotate-45 z-10">
              <span className="text-sm font-semibold">Coming Soon</span>
            </div>
            <div className="aspect-video bg-accent/20 flex items-center justify-center">
              <Globe className="w-16 h-16 text-accent" />
            </div>
            <div className="p-6">
              <h3 className="font-heading font-bold text-2xl text-white mb-2">
                Sovereign Frequency™
              </h3>
              <p className="text-gray-300 mb-6">
                Unlocking Your True Timeline, Voice, and Vision. A course to dissolve distortion, activate your original blueprint, and step into the timeline your soul remembers.
              </p>
              <div className="flex items-center gap-4">
                <Link
                  to="/waitlist"
                  className="flex-grow bg-accent text-white px-6 py-2 rounded-lg hover:bg-accent/80 transition-colors text-center"
                >
                  Join the Wait List
                </Link>
                <Link
                  to="/courses/sovereign-frequency"
                  className="text-accent hover:text-accent/80 transition-colors"
                >
                  Learn More →
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white/10 rounded-lg overflow-hidden relative">
            <div className="absolute -right-12 top-6 bg-accent text-white py-1 px-12 transform rotate-45 z-10">
              <span className="text-sm font-semibold">Coming Soon</span>
            </div>
            <div className="aspect-video bg-accent/20 flex items-center justify-center">
              <Star className="w-16 h-16 text-accent" />
            </div>
            <div className="p-6">
              <h3 className="font-heading font-bold text-2xl text-white mb-2">
                Light Architect™
              </h3>
              <p className="text-gray-300 mb-6">
                Designing Reality Through Frequency, Vision, and Inner Technology. You're not here to react to life — you're here to design it.
              </p>
              <div className="flex items-center gap-4">
                <Link
                  to="/waitlist"
                  className="flex-grow bg-accent text-white px-6 py-2 rounded-lg hover:bg-accent/80 transition-colors text-center"
                >
                  Join the Wait List
                </Link>
                <Link
                  to="/courses/light-architect"
                  className="text-accent hover:text-accent/80 transition-colors"
                >
                  Learn More →
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mb-12">
          <CoachingCard />
        </div>

        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-accent/10 border border-white/10 rounded-lg p-6 text-center shadow-lg">
            <p className="text-lg text-accent font-heading">
              A portion of our proceeds from all course enrollments are donated to support efforts to combat child trafficking and provide aid to rescued survivors.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 rounded-lg p-8 border border-accent/20">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-heading font-bold text-white mb-4">
                Stay Updated on New Courses
              </h2>
              <p className="text-lg text-gray-300">
                Be the first to know when we launch new transformative courses
              </p>
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
      </div>
    </div>
  );
};

export default CoursesPage;