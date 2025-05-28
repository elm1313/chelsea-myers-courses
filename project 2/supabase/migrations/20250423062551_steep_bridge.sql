/*
  # Update Stripe price IDs

  1. Changes
    - Update stripe_price_id for each course with the correct Stripe price ID
*/

-- Update Quantum Upgrade Personal Transformation
UPDATE courses
SET stripe_price_id = 'prod_SBIBxITHFuOcPL'
WHERE slug = 'quantum';

-- Update Weeding Out Gossip
UPDATE courses
SET stripe_price_id = 'prod_SBIDVYuAyvGFpe'
WHERE slug = 'gossip';

-- Update The Communication Blueprint
UPDATE courses
SET stripe_price_id = 'prod_SBIEqrLKsAdRio'
WHERE slug = 'communication';

-- Update Entrepreneurial Intelligence for Dentists
UPDATE courses
SET stripe_price_id = 'prod_SBIFxDoZJirLvz'
WHERE slug = 'dental';