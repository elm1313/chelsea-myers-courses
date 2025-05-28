import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Unlink, MessageCircle, TrendingUp, Package } from 'lucide-react';
import CoachingCard from '../components/CoachingCard';

const EnrollPage = () => {
  const navigate = useNavigate();

  const handleEnroll = (courseId: string) => {
    navigate(`/payment/${courseId}`);
  };

  return (
    <div className="bg-gradient-to-b from-dark to-gray-800 min-h-screen py-8 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-heading font-bold text-white mb-4">
            Choose Your Path
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Select the course that best aligns with your goals and start your transformation today.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid gap-6 md:gap-8">
            {/* Bundle Offer */}
            <div className="block bg-accent/20 rounded-lg p-4 md:p-8 border-2 border-accent relative w-full">
              <div className="absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2 bg-accent text-white px-4 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
                BEST VALUE
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
                <div className="bg-accent/20 p-4 rounded-lg">
                  <Package className="w-10 h-10 md:w-12 md:h-12 text-accent" />
                </div>
                <div className="flex-grow">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="font-heading text-xl md:text-2xl font-bold text-white">
                      Transformation Bundle
                    </h3>
                    <span className="bg-accent/20 text-accent px-3 py-1 rounded-full text-sm">
                      Save $149
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm md:text-base mb-2">
                    Get access to both transformative courses at a special bundle price:
                  </p>
                  <ul className="text-gray-300 list-disc list-inside text-sm md:text-base mb-4">
                    <li>Quantum Upgrade Personal Transformation™ ($399/year)</li>
                    <li>The Communication Blueprint ($199/year)</li>
                  </ul>
                  <button
                    onClick={() => handleEnroll('bundle')}
                    className="inline-block bg-accent text-white px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-accent/80 transition-colors text-sm md:text-base"
                  >
                    Get the Bundle
                  </button>
                </div>
                <div className="text-right mt-4 md:mt-0">
                  <div className="text-gray-400 line-through mb-1 text-sm md:text-base">$598/year</div>
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">$449/year</div>
                  <div className="text-xs md:text-sm text-gray-400">Annual subscription</div>
                </div>
              </div>
            </div>

            {/* Individual Courses */}
            <div className="block bg-white/10 rounded-lg p-4 md:p-8 border border-accent/20 w-full">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
                <div className="bg-accent/20 p-4 rounded-lg">
                  <Unlink className="w-10 h-10 md:w-12 md:h-12 text-accent" />
                </div>
                <div className="flex-grow">
                  <h3 className="font-heading text-xl md:text-2xl font-bold text-white mb-2">
                    Quantum Upgrade Personal Transformation™
                  </h3>
                  <p className="text-gray-300 text-sm md:text-base mb-4">
                    Kick pornography to the curb - born from deep, private work with people seeking freedom – a course rooted in energetics, self-leadership, and sustainable freedom.
                  </p>
                  <button
                    onClick={() => handleEnroll('quantum')}
                    className="inline-block bg-accent text-white px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-accent/80 transition-colors text-sm md:text-base"
                  >
                    Enroll Now
                  </button>
                </div>
                <div className="text-right mt-4 md:mt-0">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">$399/year</div>
                  <div className="text-xs md:text-sm text-gray-400">Annual subscription</div>
                </div>
              </div>
            </div>

            <div className="block bg-white/10 rounded-lg p-4 md:p-8 border border-accent/20 w-full">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
                <div className="bg-accent/20 p-4 rounded-lg">
                  <MessageCircle className="w-10 h-10 md:w-12 md:h-12 text-accent" />
                </div>
                <div className="flex-grow">
                  <h3 className="font-heading text-xl md:text-2xl font-bold text-white mb-2">
                    The Communication Blueprint
                  </h3>
                  <p className="text-gray-300 text-sm md:text-base mb-4">
                    Advance your communication with this interactive LMS course, featuring video coaching and five bonus mini-courses. It is for anyone ready to connect from their core and lead with clarity, compassion, and power.
                  </p>
                  <button
                    onClick={() => handleEnroll('communication')}
                    className="inline-block bg-accent text-white px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-accent/80 transition-colors text-sm md:text-base"
                  >
                    Enroll Now
                  </button>
                </div>
                <div className="text-right mt-4 md:mt-0">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">$199/year</div>
                  <div className="text-xs md:text-sm text-gray-400">Annual subscription</div>
                </div>
              </div>
            </div>

            <div className="block bg-white/10 rounded-lg p-4 md:p-8 border border-accent/20 w-full">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
                <div className="bg-accent/20 p-4 rounded-lg">
                  <TrendingUp className="w-10 h-10 md:w-12 md:h-12 text-accent" />
                </div>
                <div className="flex-grow">
                  <h3 className="font-heading text-xl md:text-2xl font-bold text-white mb-2">
                    Entrepreneurial Intelligence for Dentists™
                  </h3>
                  <p className="text-gray-300 text-sm md:text-base mb-4">
                    An interactive masterclass in developing as an entrepreneur, team dynamics, and aligned growth.
                  </p>
                  <button
                    onClick={() => handleEnroll('dental')}
                    className="inline-block bg-accent text-white px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-accent/80 transition-colors text-sm md:text-base"
                  >
                    Enroll Now
                  </button>
                </div>
                <div className="text-right mt-4 md:mt-0">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">$1,600/year</div>
                  <div className="text-xs md:text-sm text-gray-400">Annual subscription</div>
                </div>
              </div>
            </div>

            <CoachingCard />

            {/* Donation Notice */}
            <div className="bg-accent/10 border border-white/10 rounded-lg p-4 md:p-6 text-center">
              <p className="text-base md:text-lg text-accent font-heading">
                A portion of our proceeds from all course enrollments are donated to support efforts to combat child trafficking and provide aid to rescued survivors.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollPage;