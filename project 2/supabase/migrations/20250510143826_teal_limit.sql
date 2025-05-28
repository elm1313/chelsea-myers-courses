-- Add auto_renew column to enrollments table
ALTER TABLE enrollments 
ADD COLUMN IF NOT EXISTS auto_renew boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS stripe_subscription_id text,
ADD COLUMN IF NOT EXISTS renewal_date timestamptz;

-- Update existing enrollments to set renewal_date
UPDATE enrollments
SET renewal_date = created_at + interval '1 year'
WHERE renewal_date IS NULL;

-- Create function to handle subscription renewal
CREATE OR REPLACE FUNCTION handle_subscription_renewal()
RETURNS trigger AS $$
BEGIN
  IF NEW.auto_renew = true AND OLD.auto_renew = false THEN
    -- Log subscription enablement
    INSERT INTO subscription_logs (
      enrollment_id,
      action,
      details
    ) VALUES (
      NEW.id,
      'enabled',
      jsonb_build_object(
        'user_id', NEW.user_id,
        'course_id', NEW.course_id,
        'renewal_date', NEW.renewal_date
      )
    );
  ELSIF NEW.auto_renew = false AND OLD.auto_renew = true THEN
    -- Log subscription disablement
    INSERT INTO subscription_logs (
      enrollment_id,
      action,
      details
    ) VALUES (
      NEW.id,
      'disabled',
      jsonb_build_object(
        'user_id', NEW.user_id,
        'course_id', NEW.course_id,
        'renewal_date', NEW.renewal_date
      )
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create subscription logs table
CREATE TABLE IF NOT EXISTS subscription_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id uuid REFERENCES enrollments(id),
  action text NOT NULL,
  details jsonb,
  created_at timestamptz DEFAULT now()
);

-- Create trigger for subscription changes
DROP TRIGGER IF EXISTS subscription_change_trigger ON enrollments;
CREATE TRIGGER subscription_change_trigger
  AFTER UPDATE OF auto_renew ON enrollments
  FOR EACH ROW
  EXECUTE FUNCTION handle_subscription_renewal();