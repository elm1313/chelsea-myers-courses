import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Add retrying capability and better error handling
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  },
  db: {
    schema: 'public'
  },
  global: {
    headers: {
      'x-client-info': 'supabase-js-web'
    }
  }
});

// Add error event listener for debugging
supabase.auth.onAuthStateChange((event, session) => {
  console.log('[Supabase] Auth event:', event);
  if (event === 'SIGNED_IN') {
    console.log('[Supabase] User signed in successfully:', session?.user?.id);
  } else if (event === 'SIGNED_OUT') {
    console.log('[Supabase] User signed out');
  } else if (event === 'USER_DELETED') {
    console.log('[Supabase] User was deleted');
  } else if (event === 'USER_UPDATED') {
    console.log('[Supabase] User was updated');
  }
});

// Function to update course progress
export const updateCourseProgress = async (
  courseId: string, 
  lessonNumber: number,
  completed: boolean = false,
  completedLessons: number[] = []
) => {
  try {
    console.log('[updateCourseProgress] Updating progress:', {
      courseId,
      lessonNumber,
      completed,
      completedLessons
    });

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      console.error('[updateCourseProgress] No authenticated user');
      throw new Error('No authenticated user');
    }

    console.log('[updateCourseProgress] User authenticated:', user.id);

    const { data, error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: user.id,
        course_id: courseId,
        current_lesson: lessonNumber,
        completed_lessons: completedLessons,
        completion_percentage: Math.round((completedLessons.length / totalLessons) * 100),
        completed: completed,
        last_accessed: new Date().toISOString()
      }, {
        onConflict: 'user_id,course_id'
      })
      .select();

    if (error) {
      console.error('[updateCourseProgress] Database error:', error);
      throw error;
    }

    console.log('[updateCourseProgress] Progress updated successfully:', {
      userId: user.id,
      courseId,
      progress: data?.[0]
    });

  } catch (err) {
    console.error('[updateCourseProgress] Error:', err);
    throw err;
  }
};

// Function to get course content URL
export function getScormContentUrl(courseSlug: string): string {
  // Map course slugs to their respective paths
  const scormPathMap: Record<string, string> = {
    'quantum-upgrade': '/courses/quantum-upgrade/scormcontent/index.html',
    'communication': '/courses/communication/scormcontent/index.html',
    'dental': '/courses/dental/scormcontent/index.html'
  };
  
  const url = scormPathMap[courseSlug] || '';
  console.log('[getScormContentUrl] Generated URL:', {
    courseSlug,
    url
  });
  
  return url;
}