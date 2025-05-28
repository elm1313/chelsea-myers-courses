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
    const { 
      email,
      courseId,
      completionStatus,
      progressMeasure,
      timeSpent,
      progressData
    } = await req.json();
    
    if (!email || !courseId) {
      throw new Error("Missing required parameters: email and courseId");
    }

    // Update or create progress record
    const { data, error } = await supabase
      .from("user_progress")
      .upsert({
        user_email: email,
        course_id: courseId,
        scorm_completion_status: completionStatus || 'incomplete',
        scorm_progress_measure: progressMeasure || 0,
        time_spent: timeSpent || 0,
        progress_data: progressData || {},
        completion_percentage: Math.round((progressMeasure || 0) * 100),
        last_accessed: new Date().toISOString()
      }, {
        onConflict: 'user_email,course_id'
      })
      .select();

    if (error) {
      throw error;
    }

    return new Response(
      JSON.stringify({
        success: true,
        data: data[0]
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
        error: error.message,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});