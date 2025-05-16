CREATE TABLE IF NOT EXISTS waitlist_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  hardest_part TEXT,
  from_country TEXT,
  study_country TEXT,
  university TEXT,
  other_reason TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
); 