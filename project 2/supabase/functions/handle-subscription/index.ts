import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.39.7";
import Stripe from "npm:stripe@14.14.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
  apiVersion: "2023-10-16",
});

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") || "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""
);

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { enrollmentId, enable } = await req.json();

    if (!enrollmentId) {
      throw new Error("Enrollment ID is required");
    }

    // Get enrollment details
    const { data: enrollment, error: enrollmentError } = await supabase
      .from("enrollments")
      .select(`
        *,
        courses (*),
        user_profiles!inner (
          stripe_customer_id
        )
      `)
      .eq("id", enrollmentId)
      .single();

    if (enrollmentError) {
      throw new Error(`Failed to fetch enrollment: ${enrollmentError.message}`);
    }

    if (!enrollment) {
      throw new Error("Enrollment not found");
    }

    if (!enrollment.user_profiles?.stripe_customer_id) {
      throw new Error("Stripe customer ID not found");
    }

    if (!enrollment.courses?.stripe_price_id) {
      throw new Error("Stripe price ID not found for the course");
    }

    if (enable) {
      try {
        // Create Stripe subscription
        const subscription = await stripe.subscriptions.create({
          customer: enrollment.user_profiles.stripe_customer_id,
          items: [{ price: enrollment.courses.stripe_price_id }],
          metadata: {
            enrollment_id: enrollmentId,
            course_id: enrollment.course_id
          }
        });

        // Update enrollment with subscription ID
        const { error: updateError } = await supabase
          .from("enrollments")
          .update({
            auto_renew: true,
            stripe_subscription_id: subscription.id
          })
          .eq("id", enrollmentId);

        if (updateError) {
          throw new Error(`Failed to update enrollment: ${updateError.message}`);
        }
      } catch (stripeError) {
        throw new Error(`Failed to create Stripe subscription: ${stripeError.message}`);
      }
    } else {
      try {
        // Cancel Stripe subscription if it exists
        if (enrollment.stripe_subscription_id) {
          await stripe.subscriptions.cancel(enrollment.stripe_subscription_id);
        }

        // Update enrollment
        const { error: updateError } = await supabase
          .from("enrollments")
          .update({
            auto_renew: false,
            stripe_subscription_id: null
          })
          .eq("id", enrollmentId);

        if (updateError) {
          throw new Error(`Failed to update enrollment: ${updateError.message}`);
        }
      } catch (stripeError) {
        throw new Error(`Failed to cancel Stripe subscription: ${stripeError.message}`);
      }
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error handling subscription:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "An unexpected error occurred" 
      }),
      { 
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  }
});