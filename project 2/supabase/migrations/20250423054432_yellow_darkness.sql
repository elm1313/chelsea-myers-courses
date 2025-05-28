/*
  # Add Stripe price IDs to courses

  1. Changes
    - Update existing courses with their Stripe price IDs
*/

UPDATE courses
SET stripe_price_id = 'prod_SBIFxDoZJirLvz'
WHERE slug = 'dental';

UPDATE courses
SET stripe_price_id = 'prod_SBIBxITHFuOcPL'
WHERE slug IN ('quantum', 'gossip', 'communication');

UPDATE courses
SET stripe_price_id = 'prod_SBIDVYuAyvGFpe'
WHERE slug = 'gossip';

UPDATE courses
SET stripe_price_id = 'prod_SBIEqrLKsAdRio'
WHERE slug = 'communication';

UPDATE courses
SET stripe_price_id = 'prod_SBIFxDoZJirLvz'
WHERE slug = 'dental';