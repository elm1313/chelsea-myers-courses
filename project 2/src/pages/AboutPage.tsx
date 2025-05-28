import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CoachingCard from '../components/CoachingCard';

const AboutPage = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="bg-gradient-to-b from-dark to-gray-800 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
              Master Coach Chelsea Myers
            </h1>
            <p className="text-xl text-accent italic mb-12">
              "It's not just about quitting a habit—it's about reclaiming confidence and creating lasting results that you love." - Chelsea
            </p>
          </div>

          <div className="md:flex md:gap-12 mb-8">
            <div className="md:w-1/2 flex-shrink-0 mb-8 md:mb-0">
              <img
                src="https://whfxjpakwumczkojrwmq.supabase.co/storage/v1/object/public/images//chelsea-about.jpg"
                alt="Chelsea Myers"
                className="w-full rounded-lg shadow-xl"
                loading="eager"
                fetchpriority="high"
              />
            </div>

            <div className="md:w-1/2">
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-gray-300 mb-4">
                   Chelsea Myers is the visionary founder behind mediTEAtion® and a private confidant to ultra-successful entrepreneurs, creatives, and high-impact leaders. Her unique transmission blends decades of grounded business experience with rare energetic gifts that awaken new timelines, restore wholeness, and amplify resonance in every area of life and leadership.
                </p>

                <p className="text-gray-300 mb-4">
                 From a young age, Chelsea had the ability to perceive what others couldn't. Her earliest memories include profound spiritual insight, dreams of future events, and a deep sensitivity to the emotions and energetic signatures of others. While these experiences shaped her worldview, she still chose to walk the path expected of her: excelling in school, pursuing higher education, and stepping into corporate roles. But even there, the golden thread of her life's work revealed itself.
                </p>

                <p className="text-gray-300">
                  That thread — the capacity to see people at the soul level and guide transformation — was present as she transitioned into the public education sector, where she built and scaled a program for neurodivergent and emotionally unique children. Her work in this space led to international research, presentations in Europe, and deeply meaningful breakthroughs for families and systems alike.
                </p>
              </div>
            </div>
          </div>

          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-gray-300 mb-4">
             She then moved into private sector entrepreneurship, becoming a multi-business owner in healthcare. After coaching dentists privately and recognizing the potential to support at a deeper level, Chelsea acquired and grew multiple dental practices and co-founded a robotics-enabled dental lab. Through this experience, she birthed Dental Life Coach, a company that served hundreds of dentists and teams in developing entrepreneurial intelligence, emotional mastery, and systems for sustainable growth.
            </p>

            <p className="text-gray-300 mb-4">
              All the while, Chelsea continued to deepen her own consciousness, undergoing initiations, somatic healing, and spiritual expansion that ultimately reconnected her with the full breadth of her gifts. From guiding entrepreneurs through addiction and inner conflict to teaching high-performing leaders how to regulate their nervous systems and expand into higher levels of purpose, her approach evolved far beyond traditional coaching.
            </p>

            <p className="text-gray-300 mb-4">
              Today, her courses reflect the full spectrum of this evolution. You'll find:
            </p>

            <ul className="list-none space-y-4 mb-8">
              <li className="flex items-start gap-4">
                <span className="text-accent text-2xl leading-none">•</span>
                <span className="text-gray-300">
                  <strong className="text-white">Entrepreneurial Intelligence for Dentists</strong> – An interactive masterclass in developing as an entrepreneur, team dynamics, and aligned growth.
                </span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-accent text-2xl leading-none">•</span>
                <span className="text-gray-300">
                  <strong className="text-white">Quantum Upgrade: Personal Transformation</strong> – born from deep, private work with people seeking freedom – a course rooted in energetics, self-leadership, and sustainable freedom.
                </span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-accent text-2xl leading-none">•</span>
                <span className="text-gray-300">
                  <strong className="text-white">Communication Blueprint</strong> – for anyone ready to connect from their core and lead with clarity, compassion, and power.
                </span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-accent text-2xl leading-none">•</span>
                <span className="text-gray-300">
                  And upcoming courses that integrate spiritual awakening, wealth embodiment, intuitive expansion, and divine expression.
                </span>
              </li>
            </ul>

            <p className="text-gray-300 mb-8">
              What may seem like a wide range is actually a unified field. Every course Chelsea creates speaks to the human behind the pursuit — the heart behind the title, the soul behind the spreadsheet. Whether someone finds her through dentistry, personal transformation, personal referral, or social media, they're tapping into the same frequency: truth, clarity, expansion, and remembrance.
            </p>
            <p className="text-gray-300 mb-8">
              Her creations are designed to to ripple impact and activate awakening on every level. For those who are called, it will feel like recognition. It will feel like home.
            </p>
            <p className="text-gray-300 mb-8">
              This is Chelsea's life's work. And if you're reading this, you may be part of it.
            </p>

            <div className="text-center mb-12">
              <p className="text-accent text-xl italic mb-4">
                "I'm rooting for you! If you're ready, I can help you find and create what you are searching for. I am honored to be on this journey with you."
              </p>
              <p className="text-white">- Chelsea Myers</p>
            </div>

            <div className="text-center mb-12">
              <Link
                to="/enroll"
                className="inline-block bg-accent text-white px-12 py-4 rounded-lg text-xl font-semibold hover:bg-accent/80 transition-colors"
              >
                Get Started Today
              </Link>
            </div>

            <div className="text-center mb-12">
              <p className="text-gray-300 text-lg mb-2">Founder, Chelsea Myers Coaching, mediTEAtion®, and Dental Life Coach®</p>
              <p className="text-accent text-lg mb-6">
                Host of the <Link to="/podcast" className="hover:underline">Brain Crops podcast</Link>, Speaker, Fractional Chief Transformation Officer
              </p>
            </div>

            <CoachingCard className="mb-12" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;