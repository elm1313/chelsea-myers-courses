-- Update default value for auto_renew column
ALTER TABLE enrollments 
ALTER COLUMN auto_renew SET DEFAULT true;

-- Update existing enrollments to have auto-renewal enabled
UPDATE enrollments 
SET auto_renew = true 
WHERE auto_renew = false;

-- Ensure renewal_date is set for all enrollments
UPDATE enrollments 
SET renewal_date = created_at + interval '1 year'
WHERE renewal_date IS NULL;