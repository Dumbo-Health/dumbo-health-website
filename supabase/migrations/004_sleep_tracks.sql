-- Sleep Tracks: stores AI-generated personalized sleep music tracks
CREATE TABLE IF NOT EXISTS sleep_tracks (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at      timestamptz DEFAULT now() NOT NULL,
  email           text NOT NULL,
  title           text NOT NULL,
  audio_url       text NOT NULL,
  vibe            text NOT NULL,
  mood            text NOT NULL,
  bedtime         text NOT NULL,
  sleep_struggle  text NOT NULL,
  prompt          text NOT NULL,
  duration_seconds integer DEFAULT 22 NOT NULL,
  play_count      integer DEFAULT 0 NOT NULL,
  is_public       boolean DEFAULT true NOT NULL
);

-- Row-level security: public tracks readable by everyone
ALTER TABLE sleep_tracks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public tracks readable by everyone"
  ON sleep_tracks FOR SELECT
  USING (is_public = true);

-- Atomic play count increment
CREATE OR REPLACE FUNCTION increment_play_count(track_id uuid)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
AS $$
  UPDATE sleep_tracks SET play_count = play_count + 1 WHERE id = track_id;
$$;
