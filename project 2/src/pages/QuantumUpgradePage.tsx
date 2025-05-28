import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../components/AuthProvider';
import { Brain, MessageCircle, Sparkles, Heart, Zap, Lightbulb, ArrowRight } from 'lucide-react';
import EmailSignupForm from '../components/EmailSignupForm';

const QuantumUpgradePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [hasProgress, setHasProgress] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkProgress = async () => {
      console.log('[QuantumUpgradePage] Checking progress, user:', user?.id);
      
      if (!user) {
        console.log('[QuantumUpgradePage] No authenticated user');
        setLoading(false);
        return;
      }

      try {
        // Get course ID
        console.log('[QuantumUpgradePage] Fetching course ID for quantum-upgrade');
        const { data: course, error: courseError } = await supabase
          .from('courses')
          .select('id')
          .eq('slug', 'quantum-upgrade')
          .single();

        if (courseError) {
          console.error('[QuantumUpgradePage] Error fetching course:', courseError);
          throw courseError;
        }

        console.log('[QuantumUpgradePage] Found course:', course);

        // Check for existing progress
        console.log('[QuantumUpgradePage] Checking existing progress for user:', user.id);
        const { data: progress, error: progressError } = await supabase
          .from('user_progress')
          .select('*')
          .eq('user_id', user.id)
          .eq('course_id', course.id)
          .single();

        if (progressError && progressError.code !== 'PGRST116') {
          console.error('[QuantumUpgradePage] Error checking progress:', progressError);
          throw progressError;
        }

        console.log('[QuantumUpgradePage] Progress check result:', progress);
        setHasProgress(!!progress);
      } catch (err) {
        console.error('[QuantumUpgradePage] Error in checkProgress:', err);
      } finally {
        setLoading(false);
      }
    };

    checkProgress();
  }, [user]);

  const handleEnterCourse = async () => {
    console.log('[QuantumUpgradePage] Entering course, user:', user?.id);
    
    if (!user) {
      console.log('[QuantumUpgradePage] No authenticated user, redirecting to enroll');
      navigate('/enroll');
      return;
    }

    try {
      setLoading(true);

      // Get course ID
      console.log('[QuantumUpgradePage] Fetching course ID');
      const { data: course, error: courseError } = await supabase
        .from('courses')
        .select('id')
        .eq('slug', 'quantum-upgrade')
        .single();

      if (courseError) {
        console.error('[QuantumUpgradePage] Error fetching course:', courseError);
        throw courseError;
      }

      console.log('[QuantumUpgradePage] Found course:', course);

      // Create or update progress record
      console.log('[QuantumUpgradePage] Creating/updating progress record');
      const { data: progressData, error: progressError } = await supabase
        .from('user_progress')
        .upsert({
          user_id: user.id,
          course_id: course.id,
          scorm_completion_status: 'incomplete',
          scorm_progress_measure: 0.0
        }, {
          onConflict: 'user_id,course_id'
        })
        .select();

      if (progressError) {
        console.error('[QuantumUpgradePage] Error updating progress:', progressError);
        throw progressError;
      }

      console.log('[QuantumUpgradePage] Progress record created/updated:', progressData);

      // Navigate to course content
      console.log('[QuantumUpgradePage] Navigating to course content');
      navigate('/course/quantum-upgrade');
    } catch (err) {
      console.error('[QuantumUpgradePage] Error in handleEnterCourse:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-dark to-gray-800 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <Link to="/payment/quantum" className="bg-accent text-white py-3 px-6 inline-block rounded-full mb-8 hover:bg-accent/80 transition-colors">
            KICK PORNOGRAPHY TO THE CURB
          </Link>
          
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-8">
            Quantum Upgrade Personal Transformation™
          </h1>

          <p className="text-xl text-accent italic mb-12">
            "It's not just about quitting a habit—it's about reclaiming confidence and creating lasting results that you love." <nobr>- Chelsea</nobr>
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-heading font-bold text-accent mb-4">
                Break Free with Confidence
              </h2>
              <p className="text-xl text-gray-300">
                Quantum Upgrade Personal Transformation™ is a thoughtfully designed, professional LMS course that guides you through personal transformation with interactive video lessons and hands-on tools. Break free from pornography habits and recurring patterns as our structured units equip you to develop stronger internal alignment, reprogram responses to triggers, understand deep-rooted causes of your actions, and create a sustainable path forward. With a focus on long-term growth, this course offers accessible tools and a discreet community to sustain positive change, empowering you wherever you are on your journey.
              </p>
              
              <button
                onClick={handleEnterCourse}
                disabled={loading}
                className="mt-8 inline-block bg-accent text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-accent/80 transition-colors disabled:opacity-50"
              >
                {loading ? 'Loading...' : hasProgress ? 'Continue Your Journey' : 'Begin Your Journey'}
              </button>
            </div>
            
            <div className="md:w-1/2">
              <div className="relative mx-auto" style={{ maxWidth: '800px' }}>
                <div className="relative rounded-[2.5rem] border-[14px] border-gray-600 bg-gray-700 shadow-[0_0_40px_rgba(0,0,0,0.3)] ring-1 ring-white/10">
                  <div className="relative rounded-[1.25rem] overflow-hidden bg-white aspect-[744/1133]">
                    <img 
                      src="https://whfxjpakwumczkojrwmq.supabase.co/storage/v1/object/public/images//chelsea-studio.jpg"
                      alt="Chelsea Myers teaching transformation"
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
            <h3 className="font-heading font-bold text-xl mb-4">Self-Paced LMS</h3>
            <p className="text-gray-300">
              Learn at your own pace with our comprehensive Learning Management System.
            </p>
          </div>
          
          <div className="bg-white/10 p-6 rounded-lg">
            <h3 className="font-heading font-bold text-xl mb-4">Dynamic Content</h3>
            <p className="text-gray-300">
              Multi-media content for interactive engagement and rich understanding.
            </p>
          </div>
          
          <div className="bg-white/10 p-6 rounded-lg">
            <h3 className="font-heading font-bold text-xl mb-4">Professional Support</h3>
            <p className="text-gray-300">
              Professionally designed to support your long-term success.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-heading font-bold text-white mb-4">You're Ready</h2>
            <p className="text-xl text-accent mb-6">And this time, you're not on your own.</p>
            <p className="text-gray-300 mb-8">
              Change can be scary, especially when it involves an area of your life that you've kept hidden. Perhaps you've tried to quit before, only to find it harder to break away than you expected...or maybe you're just now realizing that this is something you want to change. Wherever you're at in your journey, we're here to support you.
            </p>
            <div className="bg-white/5 rounded-lg p-8 mb-8">
              <p className="text-gray-300 text-lg">
                Confidence, inner-peace, increased energy, better understanding of self, improved and repaired relationships, better sleep, and overall sense of comfort and satisfaction are common outcomes from our program participants.
              </p>
            </div>
            <div className="flex justify-center gap-4 text-2xl font-heading font-bold text-accent mb-12">
              <span>Dramatic Improvement</span>
              <span>•</span>
              <span>Lasting Results</span>
              <span>•</span>
              <span>Be Happier</span>
            </div>
          </div>

          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-heading font-bold text-white mb-4">
                My Approach
              </h2>
              <p className="text-xl text-accent mb-8">
                Supporting you in creating the freedom you want
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div>
                <img 
                  src="https://whfxjpakwumczkojrwmq.supabase.co/storage/v1/object/public/images//Chelsea%20on%20Steps.jpg"
                  alt="Chelsea's Approach"
                  className="rounded-lg shadow-xl w-full mb-8"
                />
                <div className="bg-white/5 rounded-lg p-8">
                  <div className="flex items-start gap-6">
                    <div className="bg-accent/20 p-4 rounded-lg">
                      <Heart className="w-8 h-8 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-xl font-heading font-bold text-white mb-4">Remove the Shame</h3>
                      <p className="text-gray-300">
                        One of the most common reasons clients delay getting support is the incredible amount of (unnecessary) shame and humiliation associated with habits, particularly ones of a sexual nature. In order to make sustainable changes, you need an environment that supports open conversation, discovery, and development in all areas that impact wellness. That is exactly what we have created for you.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-white/5 rounded-lg p-8">
                  <div className="flex items-start gap-6">
                    <div className="bg-accent/20 p-4 rounded-lg">
                      <Lightbulb className="w-8 h-8 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-xl font-heading font-bold text-white mb-4">Deep Exploration</h3>
                      <p className="text-gray-300">
                        Through a variety of modalities including:
                      </p>
                      <ul className="list-disc list-inside text-gray-300 mt-2 space-y-2">
                        <li>Journaling and inner child exploration</li>
                        <li>Uncovering memories and past experiences</li>
                        <li>Meditation and mindfulness practices</li>
                        <li>Understanding response programming</li>
                        <li>Enhancing personal intuition</li>
                        <li>Building self-awareness and growth mindset</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-8">
                  <div className="flex items-start gap-6">
                    <div className="bg-accent/20 p-4 rounded-lg">
                      <Zap className="w-8 h-8 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-xl font-heading font-bold text-white mb-4">Energy & Environment</h3>
                      <p className="text-gray-300">
                        Working with energy is key to personal growth and creating the life you want. How you feel matters—a lot! Through our program, you'll learn to:
                      </p>
                      <ul className="list-disc list-inside text-gray-300 mt-2 space-y-2">
                        <li>Shape an environment that supports growth</li>
                        <li>Protect yourself from setbacks</li>
                        <li>Build positive energy patterns</li>
                        <li>Create sustainable change</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/payment/quantum"
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
};

export default QuantumUpgradePage;