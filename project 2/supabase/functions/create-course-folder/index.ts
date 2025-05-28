import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.39.7";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Missing Supabase environment variables");
    }

    // Initialize Supabase client with service role key
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Parse request body
    const { courseId, userId } = await req.json();
    
    if (!courseId || !userId) {
      throw new Error("Missing required parameters: courseId and userId");
    }

    // Fetch course details
    const { data: course, error: courseError } = await supabase
      .from("courses")
      .select("*")
      .eq("id", courseId)
      .single();
    
    if (courseError || !course) {
      throw new Error(`Course not found: ${courseError?.message}`);
    }
    
    // Check if user is enrolled in this course
    const { data: enrollment, error: enrollmentError } = await supabase
      .from("enrollments")
      .select("*")
      .eq("user_id", userId)
      .eq("course_id", courseId)
      .single();
    
    if (enrollmentError || !enrollment) {
      throw new Error(`User is not enrolled in this course: ${enrollmentError?.message}`);
    }
    
    // Create or update course progress record
    const { data: progress, error: progressError } = await supabase
      .from("course_progress")
      .upsert({
        user_id: userId,
        course: course.slug,
        last_lesson: "/index.html", // Start at the beginning
      }, {
        onConflict: "user_id,course"
      });
    
    if (progressError) {
      throw new Error(`Failed to initialize course progress: ${progressError.message}`);
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        message: "Course folder initialized successfully",
        course: course,
        progress: progress
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error:", error.message);
    
    return new Response(
      JSON.stringify({
        success: false,
        message: error.message,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});