
ALTER TABLE public.takeover_interest
  ADD CONSTRAINT name_len CHECK (char_length(name) BETWEEN 1 AND 80),
  ADD CONSTRAINT whatsapp_len CHECK (char_length(whatsapp) BETWEEN 4 AND 30),
  ADD CONSTRAINT location_len CHECK (char_length(location) BETWEEN 1 AND 80),
  ADD CONSTRAINT vibe_len CHECK (char_length(vibe) <= 30),
  ADD CONSTRAINT budget_len CHECK (char_length(budget) <= 30),
  ADD CONSTRAINT timing_len CHECK (char_length(timing) <= 30);
