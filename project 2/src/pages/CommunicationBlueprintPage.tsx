import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Users, Target, Sparkles, Brain, ArrowRight, BookOpen, Video, Gift } from 'lucide-react';
import EmailSignupForm from '../components/EmailSignupForm';

const CommunicationBlueprintPage = () => {
  return (
    <div className="bg-gradient-to-b from-dark to-gray-800 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <Link to="/payment/communication" className="bg-accent text-white py-3 px-6 inline-block rounded-full mb-8 hover:bg-accent/80 transition-colors">
            MASTER COMMUNICATION
          </Link>
          
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
            The Communication Blueprint
          </h1>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-heading font-bold text-accent mb-4">
                Transform Your Professional & Personal Life Through Expert Communication
              </h2>
              <p className="text-xl text-gray-300">
                The Communication Blueprint is a comprehensive, interactive Learning Management System (LMS) course featuring exclusive video coaching content with Chelsea Myers. Master the art of effective communication to enhance both your professional success and personal relationships. Through structured modules and hands-on exercises, you'll develop the skills to influence, connect, and lead with confidence. <i>Plus, when you enroll, you'll unlock access to five bonus mini-courses—each a professional LMS module packed with additional communication strategies, interactive lessons, and actionable insights to amplify your growth and impact in every conversation.</i>
              </p>
              
              <Link
                to="/payment/communication"
                className="mt-8 inline-block bg-accent text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-accent/80 transition-colors"
              >
                START YOUR JOURNEY
              </Link>
            </div>
            
            <div className="md:w-1/2">
              <div className="relative mx-auto" style={{ maxWidth: '800px' }}>
                <div className="relative rounded-[2.5rem] border-[14px] border-gray-600 bg-gray-700 shadow-[0_0_40px_rgba(0,0,0,0.3)] ring-1 ring-white/10">
                  <div className="relative rounded-[1.25rem] overflow-hidden bg-white aspect-[744/1133]">
                    <img 
                      src="https://whfxjpakwumczkojrwmq.supabase.co/storage/v1/object/public/images//chelsea-studio.jpg"
                      alt="Chelsea Myers teaching communication skills"
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
                <Video className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-heading font-bold text-xl">Interactive Learning</h3>
            </div>
            <p className="text-gray-300">
              Engage with professional video coaching content featuring Chelsea Myers, designed for maximum impact and retention.
            </p>
          </div>
          
          <div className="bg-white/10 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-accent/20 p-2 rounded-lg">
                <BookOpen className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-heading font-bold text-xl">Structured LMS</h3>
            </div>
            <p className="text-gray-300">
              Access a professional Learning Management System with organized modules, exercises, and resources.
            </p>
          </div>
          
          <div className="bg-white/10 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-accent/20 p-2 rounded-lg">
                <Gift className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-heading font-bold text-xl">Bonus Courses</h3>
            </div>
            <p className="text-gray-300">
              Receive 5 additional professional mini-courses to deepen your communication mastery.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-heading font-bold text-white mb-4">Transform Your Communication</h2>
            <p className="text-xl text-accent mb-6">Master the Art of Influential Communication</p>
            <p className="text-gray-300 mb-8">
              Whether you're leading a team, building client relationships, or strengthening personal connections, effective communication is the key to success. Our comprehensive program combines professional video coaching, interactive learning modules, and practical exercises to help you develop powerful communication skills that drive results in both your professional and personal life.
            </p>
          </div>

          <div className="mb-16">
            <div className="flex flex-col md:flex-row items-center gap-12 mb-12">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-heading font-bold text-white mb-4">
                  Bonus Mini-Courses
                </h2>
                <p className="text-xl text-accent mb-6">
                  5 Additional Professional LMS Courses Included
                </p>
                <img 
                  src="https://whfxjpakwumczkojrwmq.supabase.co/storage/v1/object/public/images//Chelsea%20Podcasting.jpg"
                  alt="Chelsea Myers podcasting"
                  className="rounded-lg shadow-xl w-full"
                />
              </div>
              <div className="md:w-1/2">
                <div className="space-y-6">
                  <div className="bg-white/5 rounded-lg p-6">
                    <div className="flex items-center gap-4 mb-3">
                      <ArrowRight className="w-6 h-6 text-accent" />
                      <h3 className="text-xl font-heading font-bold text-white">Communication: Influencing Behavior and Change</h3>
                    </div>
                    <p className="text-gray-300">
                      Learn powerful techniques to inspire action and drive positive change through effective communication.
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-lg p-6">
                    <div className="flex items-center gap-4 mb-3">
                      <ArrowRight className="w-6 h-6 text-accent" />
                      <h3 className="text-xl font-heading font-bold text-white">Analyzing Perspectives</h3>
                    </div>
                    <p className="text-gray-300">
                      Develop skills to understand different viewpoints and adapt your communication style accordingly.
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-lg p-6">
                    <div className="flex items-center gap-4 mb-3">
                      <ArrowRight className="w-6 h-6 text-accent" />
                      <h3 className="text-xl font-heading font-bold text-white">The Connection Duo: Professional Communication</h3>
                    </div>
                    <p className="text-gray-300">
                      Master the art of building strong professional relationships through authentic communication.
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-lg p-6">
                    <div className="flex items-center gap-4 mb-3">
                      <ArrowRight className="w-6 h-6 text-accent" />
                      <h3 className="text-xl font-heading font-bold text-white">Gossip: What It Is and Weeding It Out</h3>
                    </div>
                    <p className="text-gray-300">
                      Learn to identify and eliminate toxic communication patterns that undermine your professional and personal relationships.
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-lg p-6">
                    <div className="flex items-center gap-4 mb-3">
                      <ArrowRight className="w-6 h-6 text-accent" />
                      <h3 className="text-xl font-heading font-bold text-white">Framework for Difficult Conversations</h3>
                    </div>
                    <p className="text-gray-300">
                      Gain confidence in navigating challenging discussions with a structured approach to difficult conversations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/payment/communication"
              className="inline-block bg-accent text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-accent/80 transition-colors mb-12"
            >
              Enroll Today
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

export default CommunicationBlueprintPage;