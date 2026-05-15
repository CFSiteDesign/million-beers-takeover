ALTER TABLE public.takeover_interest DROP CONSTRAINT IF EXISTS vibe_len;
ALTER TABLE public.takeover_interest ADD CONSTRAINT vibe_len CHECK (char_length(vibe) >= 1 AND char_length(vibe) <= 80);