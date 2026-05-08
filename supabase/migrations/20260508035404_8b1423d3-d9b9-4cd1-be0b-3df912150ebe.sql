
CREATE TABLE public.takeover_interest (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL,
  whatsapp text NOT NULL,
  location text NOT NULL,
  vibe text NOT NULL,
  budget text NOT NULL,
  timing text NOT NULL
);
ALTER TABLE public.takeover_interest ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert interest" ON public.takeover_interest FOR INSERT TO anon, authenticated WITH CHECK (true);
