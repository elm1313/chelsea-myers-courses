-- Enroll user in The Communication Blueprint course
SELECT enroll_in_communication_blueprint('32b60b73-d016-4c6b-b82d-28e851ad3124');

-- Verify enrollment
DO $$
DECLARE
  enrollment_count integer;
BEGIN
  -- Check if user is enrolled in main course and all bonus courses
  SELECT COUNT(*)
  INTO enrollment_count
  FROM enrollments e
  JOIN courses c ON e.course_id = c.id
  WHERE e.user_id = '32b60b73-d016-4c6b-b82d-28e851ad3124'
  AND (
    c.slug = 'communication' OR
    c.slug IN (
      'framework-difficult-conversations',
      'analyzing-perspectives',
      'connection-duo',
      'influencing-behavior',
      'gossip'
    )
  );

  -- Raise notice with enrollment status
  RAISE NOTICE 'User enrolled in % courses (should be 6 total)', enrollment_count;
END $$;