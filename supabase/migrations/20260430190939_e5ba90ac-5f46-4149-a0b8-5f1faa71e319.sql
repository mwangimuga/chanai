
-- Timestamp helper
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- SERVICES
CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'Sparkles',
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published services"
  ON public.services FOR SELECT
  USING (is_published = true);

CREATE POLICY "Anyone can insert services (admin client-side)"
  ON public.services FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update services (admin client-side)"
  ON public.services FOR UPDATE
  USING (true);

CREATE POLICY "Anyone can delete services (admin client-side)"
  ON public.services FOR DELETE
  USING (true);

CREATE TRIGGER trg_services_updated
  BEFORE UPDATE ON public.services
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_services_sort ON public.services(sort_order);

-- BLOG POSTS
CREATE TABLE public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  body TEXT NOT NULL,
  cover_image_url TEXT,
  author TEXT NOT NULL DEFAULT 'ChanAI Team',
  is_published BOOLEAN NOT NULL DEFAULT true,
  published_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published blogs"
  ON public.blog_posts FOR SELECT
  USING (is_published = true);

CREATE POLICY "Anyone can insert blogs (admin client-side)"
  ON public.blog_posts FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update blogs (admin client-side)"
  ON public.blog_posts FOR UPDATE
  USING (true);

CREATE POLICY "Anyone can delete blogs (admin client-side)"
  ON public.blog_posts FOR DELETE
  USING (true);

CREATE TRIGGER trg_blog_posts_updated
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_blog_posts_published ON public.blog_posts(is_published, published_at DESC);

-- ANALYTICS EVENTS
CREATE TABLE public.analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,           -- 'pageview' | 'click'
  page_path TEXT NOT NULL,
  label TEXT,                         -- CTA label or element identifier
  session_id TEXT,
  referrer TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert analytics"
  ON public.analytics_events FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can read analytics (admin client-side)"
  ON public.analytics_events FOR SELECT
  USING (true);

CREATE INDEX idx_analytics_created ON public.analytics_events(created_at DESC);
CREATE INDEX idx_analytics_page ON public.analytics_events(page_path);
CREATE INDEX idx_analytics_type ON public.analytics_events(event_type);

-- SEED initial services
INSERT INTO public.services (title, description, icon, sort_order) VALUES
  ('AI Consulting', 'Strategic guidance to integrate AI into your business operations.', 'Brain', 1),
  ('AI Agents', 'Build intelligent systems that automate workflows and decision-making.', 'Bot', 2),
  ('Software Quality Assurance', 'Ensure reliability, performance, and scalability of your applications.', 'ShieldCheck', 3),
  ('Automation Testing', 'Selenium & JUnit frameworks for robust automated testing.', 'Cog', 4),
  ('Load Testing', 'Validate performance under pressure before your users do.', 'Activity', 5),
  ('Training & Mentorship', 'Upskill your team with real-world QA and AI knowledge.', 'GraduationCap', 6);
