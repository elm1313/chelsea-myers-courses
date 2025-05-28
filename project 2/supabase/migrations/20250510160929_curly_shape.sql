-- Add function to handle subscription changes
CREATE OR REPLACE FUNCTION handle_subscription_change()
RETURNS TRIGGER AS $$
BEGIN
  -- Update renewal date when auto_renew is enabled
  IF NEW.auto_renew = true AND OLD.auto_renew = false THEN
    NEW.renewal_date := CURRENT_TIMESTAMP + INTERVAL '1 year';
  END IF;

  -- Log the change
  INSERT INTO subscription_logs (
    enrollment_id,
    action,
    details
  ) VALUES (
    NEW.id,
    CASE 
      WHEN NEW.auto_renew = true THEN 'enabled'
      ELSE 'disabled'
    END,
    jsonb_build_object(
      'user_id', NEW.user_id,
      'course_id', NEW.course_id,
      'previous_renewal_date', OLD.renewal_date,
      'new_renewal_date', NEW.renewal_date,
      'stripe_subscription_id', NEW.stripe_subscription_id
    )
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Ensure trigger exists
DROP TRIGGER IF EXISTS subscription_change_trigger ON enrollments;
CREATE TRIGGER subscription_change_trigger
  BEFORE UPDATE OF auto_renew ON enrollments
  FOR EACH ROW
  EXECUTE FUNCTION handle_subscription_change();

-- Set default auto_renew to true for new enrollments
ALTER TABLE enrollments 
ALTER COLUMN auto_renew SET DEFAULT true;

-- Update existing enrollments to have auto-renewal enabled by default
UPDATE enrollments 
SET auto_renew = true 
WHERE auto_renew IS NULL OR auto_renew = false;

-- Ensure renewal_date is set for all enrollments
UPDATE enrollments 
SET renewal_date = created_at + interval '1 year'
WHERE renewal_date IS NULL;