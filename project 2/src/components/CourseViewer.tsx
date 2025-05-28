import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

interface CourseViewerProps {
  courseSlug: string;
}

const CourseViewer: React.FC<CourseViewerProps> = ({ courseSlug }) => {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentLesson, setCurrentLesson] = useState<number | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const loadCourseProgress = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          console.log('[CourseViewer] No authenticated user found');
          throw new Error('No authenticated user');
        }

        console.log('[CourseViewer] User authenticated:', {
          userId: user.id,
          courseSlug
        });

        // Check enrollment
        const { data: enrollment, error: enrollmentError } = await supabase
          .from('enrollments')
          .select('id')
          .eq('user_id', user.id)
          .eq('course_id', courseSlug)
          .single();
        
        if (enrollmentError || !enrollment) {
          console.log('[CourseViewer] Enrollment check failed:', {
            userId: user.id,
            courseSlug,
            error: enrollmentError?.message
          });
          throw new Error('Not enrolled in this course');
        }

        console.log('[CourseViewer] Enrollment verified:', {
          userId: user.id,
          courseSlug,
          enrollmentId: enrollment.id
        });

        // Get or create course progress
        const { data: progress, error: progressError } = await supabase
          .from('user_progress')
          .select('current_lesson, completed_lessons, completion_percentage')
          .eq('user_id', user.id)
          .eq('course_id', courseSlug)
          .single();

        if (progressError && progressError.code !== 'PGRST116') {
          console.error('[CourseViewer] Error fetching progress:', {
            userId: user.id,
            courseSlug,
            error: progressError
          });
          throw progressError;
        }

        if (!progress) {
          console.log('[CourseViewer] Creating initial progress record:', {
            userId: user.id,
            courseSlug
          });

          // Create initial progress record
          const { data: newProgress, error: createError } = await supabase
            .from('user_progress')
            .insert([{
              user_id: user.id,
              course_id: courseSlug,
              current_lesson: 1,
              completed_lessons: [],
              completion_percentage: 0
            }])
            .select()
            .single();

          if (createError) {
            console.error('[CourseViewer] Failed to create progress record:', {
              userId: user.id,
              courseSlug,
              error: createError
            });
            throw createError;
          }

          console.log('[CourseViewer] Initial progress record created:', {
            userId: user.id,
            courseSlug,
            progress: newProgress
          });

          setCurrentLesson(1);
        } else {
          console.log('[CourseViewer] Existing progress found:', {
            userId: user.id,
            courseSlug,
            currentLesson: progress.current_lesson,
            completedLessons: progress.completed_lessons,
            completionPercentage: progress.completion_percentage
          });

          setCurrentLesson(progress.current_lesson);
        }

        setIsAuthenticated(true);
      } catch (err) {
        console.error('[CourseViewer] Access verification error:', err);
        setError('Access verification failed. Please return to dashboard and try again.');
        setTimeout(() => navigate('/dashboard'), 2000);
      } finally {
        setLoading(false);
      }
    };
    
    loadCourseProgress();
  }, [courseSlug, navigate]);

  const handleIframeLoad = () => {
    setLoading(false);
    console.log('[CourseViewer] Course content loaded successfully:', {
      courseSlug,
      currentLesson
    });
  };

  const handleIframeError = () => {
    console.error('[CourseViewer] Error loading course content:', {
      courseSlug,
      currentLesson
    });
    setError('Failed to load course content. Please try again later.');
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const getContentUrl = () => {
    let baseUrl = `/courses/${courseSlug}/scormcontent/index.html`;
    if (currentLesson && currentLesson > 1) {
      baseUrl += `#/lesson/${currentLesson}`;
    }
    console.log('[CourseViewer] Generated content URL:', baseUrl);
    return baseUrl;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full text-white">
        <p>Loading course content...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-white bg-red-900 bg-opacity-20 p-4">
        <p className="text-red-300 mb-2">Error: {error}</p>
        <button 
          className="mt-4 px-4 py-2 bg-accent rounded hover:bg-accent/80"
          onClick={handleBackToDashboard}
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-full text-white">
        <p>Please log in to view this content</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="bg-dark p-4 flex justify-between items-center">
        <button 
          onClick={handleBackToDashboard}
          className="bg-accent text-white px-4 py-2 rounded hover:bg-accent/80 transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
      <div className="flex-grow relative">
        <iframe
          ref={iframeRef}
          src={getContentUrl()}
          className="w-full h-full absolute inset-0 border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals"
          title="Course Content"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
        />
      </div>
    </div>
  );
};

export default CourseViewer;