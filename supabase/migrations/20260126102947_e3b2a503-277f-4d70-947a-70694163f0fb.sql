-- Create table for storing anonymized face analytics
CREATE TABLE public.face_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  emotion TEXT NOT NULL,
  emotion_confidence DECIMAL(5,4) NOT NULL,
  age_group TEXT NOT NULL,
  age_estimate INTEGER,
  gender TEXT NOT NULL,
  gender_confidence DECIMAL(5,4) NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  session_id UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS (but allow public access for this educational project)
ALTER TABLE public.face_analytics ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert analytics (no auth required for educational project)
CREATE POLICY "Anyone can insert analytics"
ON public.face_analytics
FOR INSERT
WITH CHECK (true);

-- Allow anyone to read analytics
CREATE POLICY "Anyone can read analytics"
ON public.face_analytics
FOR SELECT
USING (true);

-- Create index for efficient querying by timestamp
CREATE INDEX idx_face_analytics_timestamp ON public.face_analytics(timestamp DESC);

-- Create index for emotion queries
CREATE INDEX idx_face_analytics_emotion ON public.face_analytics(emotion);

-- Enable realtime for live dashboard updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.face_analytics;