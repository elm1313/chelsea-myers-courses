import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../components/AuthProvider';
import { supabase } from '../lib/supabase';
import { AlertTriangle } from 'lucide-react';
import CourseViewer from '../components/CourseViewer';

const CoursePage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [course, setCourse] = useState<any>(null);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/sign-in');
      return;
    }

    const loadCourse = async () => {
      try {
        const { data: courseData, error: courseError } = await supabase
          .from('courses')
          .select('*')
          .eq('slug', slug)
          .single();
        
        if (courseError || !courseData) {
          throw new Error(courseError?.message || 'Course not found');
        }

        setCourse(courseData);

        const { data: enrollment, error: enrollmentError } = await supabase
          .from('enrollments')
          .select('*')
          .eq('user_id', user.id)
          .eq('course_id', courseData.id)
          .single();
        
        if (enrollmentError || !enrollment) {
          throw new Error('You are not enrolled in this course');
        }

        setError(null);
      } catch (err: any) {
        setError(err.message || 'Unable to load course');
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [user, navigate, slug]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-dark flex items-center justify-center">
        <div className="animate-pulse text-white">Loading course...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-dark flex items-center justify-center">
        <div className="max-w-md w-full bg-white/10 p-6 rounded-lg">
          <div className="text-red-400 flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5" />
            <span>{error}</span>
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full bg-accent text-white py-2 rounded hover:bg-accent/80"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-dark">
      {isStarted ? (
        <CourseViewer courseSlug={slug || ''} />
      ) : (
        <div className="flex items-center justify-center h-full">
          <button
            onClick={() => setIsStarted(true)}
            className="bg-accent text-white py-3 px-6 rounded-lg hover:bg-accent/80"
          >
            Start My Journey
          </button>
        </div>
      )}
    </div>
  );
};

export default CoursePage;