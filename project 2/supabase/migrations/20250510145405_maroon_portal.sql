-- Add trigger function to update renewal_date when auto_renew changes
CREATE OR REPLACE FUNCTION update_renewal_date()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.auto_renew = true AND OLD.auto_renew = false THEN
    -- When enabling auto-renew, set renewal date to 1 year from now
    NEW.renewal_date := CURRENT_TIMESTAMP + INTERVAL '1 year';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update renewal_date
DROP TRIGGER IF EXISTS update_renewal_date_trigger ON enrollments;
CREATE TRIGGER update_renewal_date_trigger
  BEFORE UPDATE OF auto_renew ON enrollments
  FOR EACH ROW
  EXECUTE FUNCTION update_renewal_date();