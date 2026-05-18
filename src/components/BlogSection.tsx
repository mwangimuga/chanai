import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, BookOpen, Tag } from "lucide-react";
import { trackClick } from "@/lib/analytics";

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image_url: string | null;
  author: string;
  published_at: string;
  category: string;
  tags: string[];
  seo_title: string | null;
  seo_description: string | null;
};

const ALL = "All";

const BlogSection = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>(ALL);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select(
          "id,title,slug,excerpt,cover_image_url,author,published_at,category,tags,seo_title,seo_description",
        )
        .eq("is_published", true)
        .order("published_at", { ascending: false })
        .limit(24);
      setPosts((data as Post[]) ?? []);
      setLoading(false);
    })();
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => p.category && set.add(p.category));
    return [ALL, ...Array.from(set).sort()];
  }, [posts]);

  const allTags = useMemo(() => {
    const counts = new Map<string, number>();
    posts.forEach((p) =>
      (p.tags ?? []).forEach((t) => counts.set(t, (counts.get(t) ?? 0) + 1)),
    );
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 12)
      .map(([t]) => t);
  }, [posts]);

  const filtered = useMemo(
    () =>
      posts.filter(
        (p) =>
          (activeCategory === ALL || p.category === activeCategory) &&
          (!activeTag || (p.tags ?? []).includes(activeTag)),
      ),
    [posts, activeCategory, activeTag],
  );

  if (loading) return null;
  if (!posts.length) return null;

  return (
    <section id="blog" className="py-24 bg-secondary/15">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary mb-4">From Our Blog</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white leading-tight">
            Insights from the <span className="text-electric-gradient">field.</span>
          </h2>
          <p className="text-white/70 mt-5">
            Practical engineering writing from the team — no fluff, no clickbait.
          </p>
        </div>

        {/* Category pills */}
        {categories.length > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-5">
            {categories.map((c) => {
              const active = activeCategory === c;
              return (
                <button
                  key={c}
                  onClick={() => setActiveCategory(c)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all border ${
                    active
                      ? "bg-primary/20 text-white border-primary/50 shadow-glow"
                      : "border-white/10 text-white/65 hover:text-white hover:border-primary/30"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
        )}

        {/* Tag filter */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-1.5 mb-12">
            {activeTag && (
              <button
                onClick={() => setActiveTag(null)}
                className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-white/5 text-white/70 hover:bg-white/10"
              >
                Clear ×
              </button>
            )}
            {allTags.map((t) => {
              const active = activeTag === t;
              return (
                <button
                  key={t}
                  onClick={() => setActiveTag(active ? null : t)}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider transition-all ${
                    active
                      ? "bg-primary/20 text-primary border border-primary/40"
                      : "text-white/55 hover:text-white"
                  }`}
                >
                  <Tag className="w-2.5 h-2.5" />
                  {t}
                </button>
              );
            })}
          </div>
        )}

        {filtered.length === 0 ? (
          <p className="text-center text-white/55 py-12">No posts match this filter.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <Link
                key={p.id}
                to={`/community/blog/${p.slug}`}
                onClick={() => trackClick(`blog:${p.slug}`)}
                title={p.seo_description ?? p.excerpt ?? p.title}
                className="group glass rounded-2xl overflow-hidden hover:border-primary/40 hover:-translate-y-1 transition-all cursor-pointer flex flex-col"
              >
                {p.cover_image_url ? (
                  <div className="aspect-[16/9] overflow-hidden bg-white/5 relative">
                    <img
                      src={p.cover_image_url}
                      alt={p.seo_title ?? p.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[9px] font-mono uppercase tracking-[0.25em] bg-background/70 backdrop-blur-md text-primary border border-primary/30">
                      {p.category}
                    </span>
                  </div>
                ) : (
                  <div className="aspect-[16/9] bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center relative">
                    <BookOpen className="w-10 h-10 text-primary/60" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[9px] font-mono uppercase tracking-[0.25em] bg-background/70 backdrop-blur-md text-primary border border-primary/30">
                      {p.category}
                    </span>
                  </div>
                )}
                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/45 mb-3">
                    {new Date(p.published_at).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}{" "}
                    · {p.author}
                  </p>
                  <h3 className="font-display font-semibold text-lg text-white mb-2 group-hover:text-electric-gradient transition-colors">
                    {p.title}
                  </h3>
                  {p.excerpt && (
                    <p className="text-sm text-white/70 leading-relaxed mb-4 flex-1 line-clamp-3">
                      {p.excerpt}
                    </p>
                  )}
                  {p.tags && p.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {p.tags.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 text-white/60"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                  <span className="inline-flex items-center gap-2 text-xs text-primary font-medium mt-auto">
                    Read more <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
