import { createClient } from '@supabase/supabase-js';

// Create a supabase client instance
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
export const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Get URL to SCORM content via direct path
 */
export function getScormContentUrl(courseSlug: string): string {
  // Map course slugs to their respective paths
  const scormPathMap: Record<string, string> = {
    'quantum-upgrade': '/courses/quantum-upgrade/scormcontent/index.html'
  };
  
  return scormPathMap[courseSlug] || '';
}