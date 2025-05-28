import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Unlink, MessageCircle, Sparkles, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Course {
  id: string;
  name: string;
  slug: string;
  content_path: string | null;
  progress?: number;
}

const DashboardPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCourseContent, setShowCourseContent] = useState<string | null>(null);

  const refreshSession = async () => {
    try {
      const { data, error } = await supabase.auth.refreshSession();
      if (error) {
        console.error("Error refreshing session:", error);
        window.location.href = '/';
        return false;
      }
      return true;
    } catch (err) {
      console.error("Unexpected error refreshing session:", err);
      window.location.href = '/';
      return false;
    }
  };

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
        return <Unlink className="w-16 h-16 text-accent" />;
      case 'communication':
        return <MessageCircle className="w-16 h-16 text-accent" />;
      case 'dental':
        return <TrendingUp className="w-16 h-16 text-accent" />;
      default:
        return <Sparkles className="w-16 h-16 text-accent" />;
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
    const sessionValid = await refreshSession();
    if (sessionValid) {
      setShowCourseContent(course.id);
      window.open(`https://chelseamyers-learning.netlify.app/courses/${course.slug}/scormcontent/index.html#/`, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-b from-dark to-gray-800 min-h-screen py-16">
        <div className="container mx-auto px-4">
          <div className="text-white">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-b from-dark to-gray-800 min-h-screen py-16">
        <div className="container mx-auto px-4">
          <div className="text-white bg-red-500/20 p-4 rounded-lg">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-dark to-gray-800 min-h-screen py-16">
      <div className="container mx-auto px-4 flex flex-col min-h-[calc(100vh-4rem)]">
        <h1 className="text-4xl font-heading font-bold text-white mb-8">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {courses.map((course) => (
              <div key={course.id} className="bg-white/10 rounded-lg overflow-hidden">
                <div className="aspect-video bg-accent/20 flex items-center justify-center">
                  {getIcon(course.slug)}
                </div>
                <div className="p-6">
                  <h3 className="font-heading font-bold text-2xl text-white mb-4">
                    {course.name}
                  </h3>
                  {showCourseContent !== course.id ? (
                    <button
                      onClick={() => handleStartCourse(course)}
                      className="inline-block bg-accent text-white px-6 py-3 rounded-lg hover:bg-accent/80 transition-colors"
                    >
                      {course.progress && course.progress > 0 ? 'Continue Learning' : 'Start My Journey'}
                    </button>
                  ) : (
                    <div className="flex flex-col items-center p-4">
                      <p className="mb-4 text-gray-300">Your course has opened in a new tab. If it didn't open automatically, please click the button below:</p>
                      <button
                        onClick={() => window.open(`https://chelseamyers-learning.netlify.app/courses/${course.slug}/scormcontent/index.html#/`, '_blank')}
                        className="bg-accent text-white px-6 py-3 rounded-lg hover:bg-accent/80 transition-colors"
                      >
                        Open Course Content
                      </button>
                      <button 
                        onClick={() => setShowCourseContent(null)} 
                        className="mt-4 text-accent underline"
                      >
                        Return to Dashboard
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-auto">
          <button
            onClick={handleCoachingClick}
            className="w-full bg-white/10 rounded-lg overflow-hidden hover:bg-white/20 transition-colors group p-3"
          >
            <div className="flex items-center gap-6">
              <div className="bg-accent/20 p-0 rounded-lg overflow-hidden w-16 h-16">
                <img 
                  src="https://whfxjpakwumczkojrwmq.supabase.co/storage/v1/object/public/images//Chelsea%20Headshot.jpg"
                  alt="Chelsea Myers"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl text-white">
                Exclusive 1:1 Coaching with Chelsea Myers
              </h3>
              <span className="ml-auto inline-block bg-accent text-white px-6 py-2 rounded-lg group-hover:bg-accent/80 transition-colors">
                Apply
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;