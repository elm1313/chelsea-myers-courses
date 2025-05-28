import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Unlink, MessageCircle, TrendingUp, Frame, Microscope, Users, Sparkles, Ban } from 'lucide-react';
import CoachingCard from '../components/CoachingCard';
import StreakTracker from '../components/StreakTracker';
import toast from 'react-hot-toast';

interface Course {
  id: string;
  name: string;
  slug: string;
  content_path: string | null;
  storage_path: string | null;
  progress?: number;
  is_standalone: boolean;
}

const DashboardPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          setError("You must be logged in to view your dashboard");
          setLoading(false);
          return;
        }
        
        const { data: enrollments, error: enrollmentsError } = await supabase
          .from('enrollments')
          .select('course_id, progress, courses(*)')
          .eq('user_id', user.id);

        if (enrollmentsError) throw enrollmentsError;

        const enrolledCourses = enrollments?.map(enrollment => ({
          ...enrollment.courses,
          progress: enrollment.progress || 0
        })) || [];
        
        setCourses(enrolledCourses);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setError("Failed to load your courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, []);

  const getIcon = (slug: string) => {
    switch (slug) {
      case 'quantum-upgrade':
        return <Unlink className="w-12 h-12 md:w-16 md:h-16 text-accent" />;
      case 'communication':
      case 'communication-blueprint':
        return <MessageCircle className="w-12 h-12 md:w-16 md:h-16 text-accent" />;
      case 'entrepreneurial_intelligence_for_dentists':
        return <TrendingUp className="w-12 h-12 md:w-16 md:h-16 text-accent" />;
      case 'framework-difficult-conversations':
        return <Frame className="w-12 h-12 md:w-16 md:h-16 text-accent" />;
      case 'analyzing-perspectives':
        return <Microscope className="w-12 h-12 md:w-16 md:h-16 text-accent" />;
      case 'connection-duo':
        return <Users className="w-12 h-12 md:w-16 md:h-16 text-accent" />;
      case 'influencing-behavior':
        return <Sparkles className="w-12 h-12 md:w-16 md:h-16 text-accent" />;
      case 'gossip':
        return <Ban className="w-12 h-12 md:w-16 md:h-16 text-accent opacity-80" />;
      default:
        return <Sparkles className="w-12 h-12 md:w-16 md:h-16 text-accent" />;
    }
  };

  const getDescription = (slug: string) => {
    switch (slug) {
      case 'quantum-upgrade':
        return "Kick pornography to the curb - born from deep, private work with people seeking freedom – a course rooted in energetics, self-leadership, and sustainable freedom.";
      case 'communication':
      case 'communication-blueprint':
        return "Advance your communication with this interactive LMS course, featuring video coaching and five bonus mini-courses. It is for anyone ready to connect from their core and lead with clarity, compassion, and power.";
      case 'entrepreneurial_intelligence_for_dentists':
        return "An interactive masterclass in developing as an entrepreneur, team dynamics, and aligned growth.";
      case 'framework-difficult-conversations':
        return "Master the art of navigating challenging conversations with confidence and clarity.";
      case 'analyzing-perspectives':
        return "Develop skills to understand different viewpoints and adapt your communication style accordingly.";
      case 'connection-duo':
        return "Master professional communication skills for stronger workplace relationships and team dynamics.";
      case 'influencing-behavior':
        return "Learn effective strategies for communication that influences behavior and creates positive change through powerful techniques and practical exercises.";
      case 'gossip':
        return "Identify and eliminate toxic communication patterns that undermine your relationships and negatively impact your energy.";
      default:
        return "";
    }
  };

  const handleCoachingClick = () => {
    // @ts-ignore - FormKit types not available
    if (window.formkit && window.formkit.toggle) {
      // @ts-ignore
      window.formkit.toggle('8fbde43012');
    }
  };

  const handleStartCourse = async (course: Course) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Please log in to access your course.");
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("Your session has expired. Please log in again.");
        return;
      }

      const email = user.email || '';
      const name = user.user_metadata?.full_name || user.user_metadata?.name || '';
      const accessToken = session.access_token;

      // Base URL for all courses
      const baseUrl = 'https://chelseamyers-learning.netlify.app';
      
      // Construct landing page URL based on slug
      let landingUrl;
      switch (course.slug) {
        case 'quantum-upgrade':
          landingUrl = `${baseUrl}/landing.html`;
          break;
        case 'communication':
          landingUrl = `${baseUrl}/communication_blueprint/landing.html`;
          break;
        case 'entrepreneurial_intelligence_for_dentists':
          landingUrl = `${baseUrl}/dental/landing.html`;
          break;
        case 'framework-difficult-conversations':
          landingUrl = `${baseUrl}/communication_bonus/landing.html`;
          break;
        case 'analyzing-perspectives':
          landingUrl = `${baseUrl}/analyzing_perspectives/landing.html`;
          break;
        case 'connection-duo':
          landingUrl = `${baseUrl}/connection_duo/landing.html`;
          break;
        case 'influencing-behavior':
          landingUrl = `${baseUrl}/communication_influencing/landing.html`;
          break;
        case 'gossip':
          landingUrl = `${baseUrl}/gossip_course/landing.html`;
          break;
        default:
          toast.error("Course content not yet available");
          return;
      }

      // Add authentication parameters
      const params = new URLSearchParams();
      params.append('email', email);
      params.append('name', name);
      params.append('access_token', accessToken);

      const finalUrl = `${landingUrl}?${params.toString()}`;
      console.log("Opening course:", finalUrl);
      
      window.open(finalUrl, '_blank');
    } catch (error) {
      console.error("Error starting course:", error);
      toast.error("Unable to start the course. Please try again later.");
    }
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-b from-dark to-gray-800 min-h-screen py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-white">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-b from-dark to-gray-800 min-h-screen py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-white bg-red-500/20 p-4 rounded-lg">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-dark to-gray-800 min-h-screen py-8 md:py-16">
      <div className="container mx-auto px-4 flex flex-col min-h-[calc(100vh-4rem)]">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-8">
          My Courses
        </h1>

        {courses.length === 0 ? (
          <div className="text-center py-12 flex-grow">
            <p className="text-gray-300 mb-4">You haven't enrolled in any courses yet.</p>
            <Link
              to="/courses"
              className="inline-block bg-accent text-white px-6 py-3 rounded-lg hover:bg-accent/80 transition-colors"
            >
              Browse Courses
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
              {courses.map((course) => (
                <div key={course.id} className="bg-white/10 rounded-lg overflow-hidden">
                  <div className="aspect-video bg-accent/20 flex items-center justify-center relative">
                    {getIcon(course.slug)}
                    {!course.is_standalone && course.slug !== 'quantum-upgrade' && course.slug !== 'communication' && (
                      <div className="absolute top-4 right-4 bg-accent/80 text-white text-xs md:text-sm px-3 py-1 rounded-full">
                        Bonus Mini-Course
                      </div>
                    )}
                  </div>
                  <div className="p-4 md:p-6">
                    <h3 className="font-heading font-bold text-xl md:text-2xl text-white mb-3">
                      {course.name}
                    </h3>
                    <p className="text-gray-300 text-sm md:text-base mb-6">
                      {getDescription(course.slug)}
                    </p>
                    <button
                      onClick={() => handleStartCourse(course)}
                      className="w-full bg-accent text-white px-4 md:px-6 py-3 rounded-lg hover:bg-accent/80 active:bg-accent/70 transition-colors text-sm md:text-base cursor-pointer touch-manipulation"
                    >
                      {course.progress && course.progress > 0 ? 'Continue Learning' : 'Start My Journey'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-8 md:mb-12">
              <StreakTracker />
              <div className="mt-4 text-sm text-gray-400 bg-white/5 p-4 rounded-lg border border-white/10">
                <p>
                  <span className="text-accent">*</span> Some versions of <span className="border-b border-accent text-gray-400">Safari</span> may not load your course content properly. For the best experience, we recommend using{' '}
                  <a 
                    href="https://www.google.com/chrome/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-accent hover:underline"
                  >
                    Chrome
                  </a>
                  .
                </p>
              </div>
            </div>
          </>
        )}

        <div className="mt-auto">
          <CoachingCard compact />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;