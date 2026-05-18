import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, Calendar, Tag, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { trackClick } from "@/lib/analytics";

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  body: string;
  cover_image_url: string | null;
  author: string;
  published_at: string;
  category: string;
  tags: string[];
  seo_title: string | null;
  seo_description: string | null;
};

const SITE_URL =
  typeof window !== "undefined" ? window.location.origin : "https://chanai.tech";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .maybeSingle();
      if (error || !data) {
        setNotFound(true);
      } else {
        setPost(data as Post);
        trackClick(`blog-view:${slug}`);
      }
      setLoading(false);
    })();
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="container pt-40 pb-24 text-center text-white/60">Loading…</div>
        <Footer />
      </main>
    );
  }

  if (notFound || !post) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="container pt-40 pb-24 text-center">
          <h1 className="font-display text-4xl text-white mb-4">Post not found</h1>
          <Link to="/community#blog" className="text-primary hover:underline">
            ← Back to all posts
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const seoTitle = post.seo_title || `${post.title} — ChanAI Tech`;
  const seoDesc =
    post.seo_description ||
    post.excerpt ||
    `${post.title} — insights from ChanAI Tech.`;
  const url = `${SITE_URL}/community/blog/${post.slug}`;
  const ogImage = post.cover_image_url || `${SITE_URL}/favicon.png`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: seoDesc,
    image: ogImage,
    datePublished: post.published_at,
    author: { "@type": "Organization", name: post.author },
    publisher: {
      "@type": "Organization",
      name: "ChanAI Tech",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/favicon.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    keywords: post.tags?.join(", "),
    articleSection: post.category,
  };

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDesc} />
        <link rel="canonical" href={url} />

        <meta property="og:type" content="article" />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDesc} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={ogImage} />
        <meta property="article:published_time" content={post.published_at} />
        <meta property="article:author" content={post.author} />
        <meta property="article:section" content={post.category} />
        {(post.tags ?? []).map((t) => (
          <meta key={t} property="article:tag" content={t} />
        ))}

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDesc} />
        <meta name="twitter:image" content={ogImage} />

        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <Navbar />

      <article className="pt-32 pb-24">
        <div className="container max-w-3xl">
          <Link
            to="/community#blog"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> All posts
          </Link>

          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.3em] bg-primary/15 text-primary border border-primary/30 mb-5">
            {post.category}
          </span>

          <h1 className="font-display font-bold text-4xl md:text-5xl leading-tight text-white mb-5">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-5 text-xs font-mono uppercase tracking-wider text-white/55 mb-8">
            <span className="inline-flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" /> {post.author}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(post.published_at).toLocaleDateString(undefined, {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>

          {post.cover_image_url && (
            <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-10 bg-white/5">
              <img
                src={post.cover_image_url}
                alt={post.seo_title ?? post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {post.excerpt && (
            <p className="text-lg text-white/75 leading-relaxed mb-10 border-l-2 border-primary/50 pl-5">
              {post.excerpt}
            </p>
          )}

          <div className="prose prose-invert max-w-none prose-headings:font-display prose-headings:text-white prose-p:text-white/80 prose-p:leading-relaxed prose-a:text-primary prose-strong:text-white prose-code:text-primary prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-pre:bg-secondary/40 prose-pre:border prose-pre:border-white/10 prose-li:text-white/80 prose-blockquote:border-primary/50 prose-blockquote:text-white/70">
            <ReactMarkdown>{post.body}</ReactMarkdown>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/50 mr-2">
                Tags:
              </span>
              {post.tags.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 text-white/70"
                >
                  <Tag className="w-2.5 h-2.5" /> {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>

      <Footer />
    </main>
  );
};

export default BlogPostPage;
