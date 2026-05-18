import { useEffect, useMemo, useRef, useState } from "react";
import { Link, Navigate, NavLink, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { adminLogin, adminLogout, isAdmin } from "@/lib/adminAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import {
  BarChart3,
  Briefcase,
  FileText,
  LogOut,
  MousePointerClick,
  Eye,
  TrendingUp,
  TrendingDown,
  Plus,
  Trash2,
  Pencil,
  Save,
  X,
  Lock,
  Check,
  AlertCircle,
  Loader2,
  ExternalLink,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

/* -------------------------------------------------------------------------- */
/*  LOGIN                                                                      */
/* -------------------------------------------------------------------------- */
const AdminLogin = () => {
  const nav = useNavigate();
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminLogin(u, p)) {
      nav("/admin/dashboard", { replace: true });
    } else {
      setErr("Invalid credentials.");
    }
  };

  if (isAdmin()) return <Navigate to="/admin/dashboard" replace />;

  return (
    <main className="min-h-[100svh] flex items-center justify-center bg-background relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/10 rounded-full blur-[140px]" />
      <Card className="relative w-full max-w-md mx-4 glass-strong border-primary/20">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 rounded-xl bg-gradient-electric flex items-center justify-center shadow-glow mb-3">
            <Lock className="w-5 h-5 text-primary-foreground" />
          </div>
          <CardTitle className="font-display text-2xl text-white">Admin Access</CardTitle>
          <CardDescription>Restricted area. Authorized personnel only.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs font-mono uppercase tracking-wider text-white/65">Username</Label>
              <Input value={u} onChange={(e) => setU(e.target.value)} autoFocus autoComplete="username" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-mono uppercase tracking-wider text-white/65">Password</Label>
              <Input type="password" value={p} onChange={(e) => setP(e.target.value)} autoComplete="current-password" />
            </div>
            {err && <p className="text-sm text-destructive">{err}</p>}
            <Button type="submit" variant="electric" className="w-full">Sign in</Button>
            <Link to="/" className="block text-center text-xs text-white/50 hover:text-white">← Back to site</Link>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

/* -------------------------------------------------------------------------- */
/*  LAYOUT                                                                     */
/* -------------------------------------------------------------------------- */
const AdminShell = () => {
  const nav = useNavigate();
  if (!isAdmin()) return <Navigate to="/admin" replace />;

  const logout = () => {
    adminLogout();
    nav("/admin", { replace: true });
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all ${
      isActive
        ? "bg-primary/15 text-white border border-primary/30"
        : "text-white/65 hover:text-white hover:bg-white/5 border border-transparent"
    }`;

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="w-64 shrink-0 border-r border-white/10 bg-[hsl(var(--navy-deep))]/60 p-5 flex flex-col">
        <Link to="/" className="font-display font-semibold text-white text-lg mb-1">
          Chan<span className="text-electric-gradient">Ai</span>
        </Link>
        <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/45 mb-8">Admin Console</p>

        <nav className="space-y-1.5 flex-1">
          <NavLink to="/admin/dashboard" className={linkClass}>
            <BarChart3 className="w-4 h-4" /> Analytics
          </NavLink>
          <NavLink to="/admin/services" className={linkClass}>
            <Briefcase className="w-4 h-4" /> Services
          </NavLink>
          <NavLink to="/admin/blog" className={linkClass}>
            <FileText className="w-4 h-4" /> Blog Posts
          </NavLink>
        </nav>

        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-white/65 hover:text-white hover:bg-white/5 transition-all"
        >
          <LogOut className="w-4 h-4" /> Sign out
        </button>
      </aside>

      <main className="flex-1 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  ANALYTICS DASHBOARD                                                        */
/* -------------------------------------------------------------------------- */
type Event = {
  id: string;
  event_type: string;
  page_path: string;
  label: string | null;
  created_at: string;
};

const AnalyticsDashboard = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
      const { data, error } = await supabase
        .from("analytics_events")
        .select("id,event_type,page_path,label,created_at")
        .gte("created_at", since)
        .order("created_at", { ascending: false })
        .limit(5000);
      if (error) toast({ title: "Could not load analytics", description: error.message });
      setEvents((data as Event[]) ?? []);
      setLoading(false);
    })();
  }, []);

  const stats = useMemo(() => {
    const pv = events.filter((e) => e.event_type === "pageview");
    const ck = events.filter((e) => e.event_type === "click");
    const ctr = pv.length ? (ck.length / pv.length) * 100 : 0;

    const byPage = new Map<string, { views: number; clicks: number }>();
    for (const e of events) {
      const cur = byPage.get(e.page_path) ?? { views: 0, clicks: 0 };
      if (e.event_type === "pageview") cur.views++;
      else cur.clicks++;
      byPage.set(e.page_path, cur);
    }
    const pageRows = Array.from(byPage.entries())
      .map(([page, v]) => ({
        page,
        views: v.views,
        clicks: v.clicks,
        ctr: v.views ? (v.clicks / v.views) * 100 : 0,
      }))
      .sort((a, b) => b.views - a.views);

    // last 14 days timeline
    const days: { day: string; views: number; clicks: number }[] = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date();
      d.setHours(0, 0, 0, 0);
      d.setDate(d.getDate() - i);
      days.push({
        day: d.toLocaleDateString(undefined, { month: "short", day: "numeric" }),
        views: 0,
        clicks: 0,
      });
    }
    for (const e of events) {
      const d = new Date(e.created_at);
      d.setHours(0, 0, 0, 0);
      const idx = days.findIndex(
        (x) => x.day === d.toLocaleDateString(undefined, { month: "short", day: "numeric" }),
      );
      if (idx >= 0) {
        if (e.event_type === "pageview") days[idx].views++;
        else days[idx].clicks++;
      }
    }

    const ctaCounts = new Map<string, number>();
    for (const e of ck) {
      if (!e.label) continue;
      ctaCounts.set(e.label, (ctaCounts.get(e.label) ?? 0) + 1);
    }
    const topCtas = Array.from(ctaCounts.entries())
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);

    return {
      total: events.length,
      views: pv.length,
      clicks: ck.length,
      ctr,
      pageRows,
      days,
      topCtas,
    };
  }, [events]);

  const maxViews = Math.max(...stats.pageRows.map((r) => r.views), 1);

  return (
    <div className="p-8 space-y-8">
      <header>
        <h1 className="font-display font-bold text-3xl text-white">Analytics</h1>
        <p className="text-white/60 text-sm mt-1">Last 30 days · auto-refreshes on reload</p>
      </header>

      {loading ? (
        <p className="text-white/60">Loading…</p>
      ) : (
        <>
          {/* KPIs */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Page Views", value: stats.views, icon: Eye },
              { label: "Clicks", value: stats.clicks, icon: MousePointerClick },
              { label: "CTR", value: `${stats.ctr.toFixed(1)}%`, icon: TrendingUp },
              { label: "Total Events", value: stats.total, icon: BarChart3 },
            ].map((k) => (
              <Card key={k.label} className="glass border-white/10">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/55">{k.label}</p>
                    <k.icon className="w-4 h-4 text-primary" />
                  </div>
                  <p className="font-display text-3xl font-bold text-white">{k.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Timeline */}
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Traffic — 14 days</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={stats.days}>
                    <defs>
                      <linearGradient id="gv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.5} />
                        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="gc" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity={0.5} />
                        <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                    <XAxis dataKey="day" stroke="rgba(255,255,255,0.5)" fontSize={11} />
                    <YAxis stroke="rgba(255,255,255,0.5)" fontSize={11} />
                    <Tooltip
                      contentStyle={{
                        background: "hsl(var(--background))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: 8,
                      }}
                    />
                    <Area type="monotone" dataKey="views" stroke="hsl(var(--primary))" fill="url(#gv)" strokeWidth={2} />
                    <Area type="monotone" dataKey="clicks" stroke="hsl(var(--accent))" fill="url(#gc)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Traffic heatmap by page */}
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Traffic by Page</CardTitle>
              <CardDescription>Visual heatmap — bigger bars mean more traffic.</CardDescription>
            </CardHeader>
            <CardContent>
              {stats.pageRows.length === 0 ? (
                <p className="text-white/60 text-sm">No traffic recorded yet.</p>
              ) : (
                <div className="space-y-3">
                  {stats.pageRows.map((r) => {
                    const pct = (r.views / maxViews) * 100;
                    const hot = pct > 60;
                    return (
                      <div key={r.page} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-mono text-white/80">{r.page}</span>
                          <span className="flex items-center gap-3 text-white/60">
                            <span>{r.views} views</span>
                            <span>{r.clicks} clicks</span>
                            <span className="font-mono">CTR {r.ctr.toFixed(1)}%</span>
                            {hot ? (
                              <span className="inline-flex items-center gap-1 text-emerald-400">
                                <TrendingUp className="w-3 h-3" /> HIGH
                              </span>
                            ) : pct < 20 ? (
                              <span className="inline-flex items-center gap-1 text-rose-400">
                                <TrendingDown className="w-3 h-3" /> LOW
                              </span>
                            ) : null}
                          </span>
                        </div>
                        <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${Math.max(pct, 2)}%`,
                              background:
                                pct > 60
                                  ? "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))"
                                  : pct > 30
                                    ? "hsl(var(--primary))"
                                    : "hsl(var(--muted-foreground))",
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Top CTAs */}
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Top CTAs by Clicks</CardTitle>
            </CardHeader>
            <CardContent>
              {stats.topCtas.length === 0 ? (
                <p className="text-white/60 text-sm">No CTA clicks recorded yet.</p>
              ) : (
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stats.topCtas} layout="vertical" margin={{ left: 80 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                      <XAxis type="number" stroke="rgba(255,255,255,0.5)" fontSize={11} />
                      <YAxis dataKey="label" type="category" stroke="rgba(255,255,255,0.7)" fontSize={11} width={140} />
                      <Tooltip
                        contentStyle={{
                          background: "hsl(var(--background))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: 8,
                        }}
                      />
                      <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 6, 6, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  SERVICES CRUD                                                              */
/* -------------------------------------------------------------------------- */
type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
  sort_order: number;
  is_published: boolean;
};

const blankService: Omit<Service, "id"> = {
  title: "",
  description: "",
  icon: "Sparkles",
  sort_order: 0,
  is_published: true,
};

const ServicesAdmin = () => {
  const [items, setItems] = useState<Service[]>([]);
  const [editing, setEditing] = useState<Service | null>(null);
  const [creating, setCreating] = useState(false);
  const [draft, setDraft] = useState(blankService);

  const load = async () => {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) toast({ title: "Load failed", description: error.message });
    setItems((data as Service[]) ?? []);
  };

  useEffect(() => { load(); }, []);

  const save = async () => {
    if (creating) {
      const { error } = await supabase.from("services").insert(draft);
      if (error) return toast({ title: "Create failed", description: error.message });
      toast({ title: "Service created" });
      setCreating(false);
      setDraft(blankService);
    } else if (editing) {
      const { id, ...rest } = editing;
      const { error } = await supabase.from("services").update(rest).eq("id", id);
      if (error) return toast({ title: "Update failed", description: error.message });
      toast({ title: "Service updated" });
      setEditing(null);
    }
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (error) return toast({ title: "Delete failed", description: error.message });
    toast({ title: "Deleted" });
    load();
  };

  const Form = ({ value, onChange }: { value: Omit<Service, "id"> | Service; onChange: (v: any) => void }) => (
    <div className="grid sm:grid-cols-2 gap-3">
      <div className="space-y-1.5 sm:col-span-2">
        <Label className="text-xs uppercase tracking-wider text-white/60">Title</Label>
        <Input value={value.title} onChange={(e) => onChange({ ...value, title: e.target.value })} />
      </div>
      <div className="space-y-1.5 sm:col-span-2">
        <Label className="text-xs uppercase tracking-wider text-white/60">Description</Label>
        <Textarea value={value.description} onChange={(e) => onChange({ ...value, description: e.target.value })} />
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs uppercase tracking-wider text-white/60">Icon (lucide name)</Label>
        <Input value={value.icon} onChange={(e) => onChange({ ...value, icon: e.target.value })} placeholder="Brain, Bot, ShieldCheck…" />
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs uppercase tracking-wider text-white/60">Sort order</Label>
        <Input type="number" value={value.sort_order} onChange={(e) => onChange({ ...value, sort_order: Number(e.target.value) })} />
      </div>
      <label className="flex items-center gap-2 text-sm text-white/80 sm:col-span-2">
        <input type="checkbox" checked={value.is_published} onChange={(e) => onChange({ ...value, is_published: e.target.checked })} />
        Published (visible on the site)
      </label>
    </div>
  );

  return (
    <div className="p-8 space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-3xl text-white">Services</h1>
          <p className="text-white/60 text-sm mt-1">Manage what appears on the homepage and Services page.</p>
        </div>
        {!creating && !editing && (
          <Button variant="electric" onClick={() => { setCreating(true); setDraft(blankService); }}>
            <Plus /> New service
          </Button>
        )}
      </header>

      {(creating || editing) && (
        <Card className="glass border-primary/30">
          <CardHeader>
            <CardTitle className="text-white">{creating ? "New service" : "Edit service"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Form
              value={creating ? draft : (editing as Service)}
              onChange={(v) => (creating ? setDraft(v) : setEditing(v))}
            />
            <div className="flex gap-2">
              <Button variant="electric" onClick={save}><Save /> Save</Button>
              <Button variant="glass" onClick={() => { setCreating(false); setEditing(null); }}>
                <X /> Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="glass border-white/10">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-white/70">Order</TableHead>
                <TableHead className="text-white/70">Title</TableHead>
                <TableHead className="text-white/70">Icon</TableHead>
                <TableHead className="text-white/70">Status</TableHead>
                <TableHead className="text-white/70 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((s) => (
                <TableRow key={s.id} className="border-white/5">
                  <TableCell className="text-white/70 font-mono">{s.sort_order}</TableCell>
                  <TableCell className="text-white font-medium">{s.title}</TableCell>
                  <TableCell className="text-white/60 font-mono text-xs">{s.icon}</TableCell>
                  <TableCell>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${s.is_published ? "bg-emerald-500/15 text-emerald-300" : "bg-white/10 text-white/60"}`}>
                      {s.is_published ? "Published" : "Hidden"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button size="sm" variant="glass" onClick={() => setEditing(s)}><Pencil className="w-3.5 h-3.5" /></Button>
                    <Button size="sm" variant="destructive" onClick={() => remove(s.id)}><Trash2 className="w-3.5 h-3.5" /></Button>
                  </TableCell>
                </TableRow>
              ))}
              {items.length === 0 && (
                <TableRow><TableCell colSpan={5} className="text-center text-white/50 py-8">No services yet.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  BLOG CRUD — with live preview, autosave, validation                       */
/* -------------------------------------------------------------------------- */
type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  body: string;
  cover_image_url: string | null;
  author: string;
  is_published: boolean;
  published_at: string;
  category: string;
  tags: string[];
  seo_title: string | null;
  seo_description: string | null;
};

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").slice(0, 80);

const CATEGORIES = ["Engineering", "AI", "QA", "Leadership", "Case Study", "News", "Tutorials", "General"];

const blankPost = {
  title: "",
  slug: "",
  excerpt: "",
  body: "",
  cover_image_url: "",
  author: "ChanAI Team",
  is_published: true,
  published_at: new Date().toISOString(),
  category: "Engineering",
  tags: [] as string[],
  seo_title: "",
  seo_description: "",
};

const postSchema = z.object({
  title: z.string().trim().min(4, "Title must be at least 4 characters").max(140),
  slug: z
    .string()
    .trim()
    .min(3, "Slug must be at least 3 characters")
    .max(80)
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
  category: z.enum(CATEGORIES as [string, ...string[]], { message: "Pick a category" }),
  tags: z.array(z.string().min(1).max(30)).max(10, "Max 10 tags"),
  body: z.string().trim().min(20, "Body must be at least 20 characters"),
  excerpt: z.string().trim().max(280).optional().or(z.literal("")),
  seo_title: z.string().max(60).optional().or(z.literal("")),
  seo_description: z.string().max(160).optional().or(z.literal("")),
  cover_image_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  author: z.string().trim().min(2).max(80),
});

type FormState = typeof blankPost;
type Errors = Partial<Record<keyof FormState, string>>;

const AUTOSAVE_KEY = "admin:blog-draft:v1";

const BlogEditor = ({
  initial,
  isEdit,
  existingSlugs,
  onCancel,
  onSaved,
}: {
  initial: FormState;
  isEdit: boolean;
  existingSlugs: { slug: string; id?: string }[];
  onCancel: () => void;
  onSaved: () => void;
}) => {
  const [value, setValue] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [saving, setSaving] = useState(false);
  const [autosaved, setAutosaved] = useState<Date | null>(null);
  const [tagInput, setTagInput] = useState((initial.tags ?? []).join(", "));
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const editingId = (initial as any).id as string | undefined;

  // Autosave new-post drafts to localStorage
  useEffect(() => {
    if (isEdit) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      try {
        localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(value));
        setAutosaved(new Date());
      } catch {
        /* ignore quota errors */
      }
    }, 800);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [value, isEdit]);

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setValue((p) => ({ ...p, [k]: v }));

  const onTitleChange = (t: string) => {
    setValue((p) => ({
      ...p,
      title: t,
      slug: slugTouched ? p.slug : slugify(t),
    }));
  };

  const slugConflict = useMemo(() => {
    if (!value.slug) return false;
    return existingSlugs.some((s) => s.slug === value.slug && s.id !== editingId);
  }, [value.slug, existingSlugs, editingId]);

  const validate = (): { ok: boolean; data?: FormState; errs?: Errors } => {
    const r = postSchema.safeParse(value);
    const errs: Errors = {};
    if (!r.success) {
      for (const [k, v] of Object.entries(r.error.flatten().fieldErrors)) {
        if (v && v.length) errs[k as keyof FormState] = v[0];
      }
    }
    if (slugConflict) errs.slug = "Slug already in use — pick another";
    setErrors(errs);
    return { ok: Object.keys(errs).length === 0, data: r.success ? (r.data as FormState) : undefined, errs };
  };

  // Live validation (debounced)
  useEffect(() => {
    const t = setTimeout(() => validate(), 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, slugConflict]);

  const save = async () => {
    const v = validate();
    if (!v.ok) {
      toast({ title: "Please fix the errors", description: Object.values(v.errs ?? {})[0] });
      return;
    }
    setSaving(true);
    const payload = {
      ...value,
      seo_title: value.seo_title || null,
      seo_description: value.seo_description || null,
      excerpt: value.excerpt || null,
      cover_image_url: value.cover_image_url || null,
    };
    if (isEdit && editingId) {
      const { id: _id, ...rest } = payload as any;
      const { error } = await supabase.from("blog_posts").update(rest).eq("id", editingId);
      setSaving(false);
      if (error) return toast({ title: "Update failed", description: error.message });
      toast({ title: "Post updated" });
    } else {
      const { error } = await supabase.from("blog_posts").insert(payload);
      setSaving(false);
      if (error) return toast({ title: "Create failed", description: error.message });
      try { localStorage.removeItem(AUTOSAVE_KEY); } catch {}
      toast({ title: "Post published" });
    }
    onSaved();
  };

  const errBox = (k: keyof FormState) =>
    errors[k] ? (
      <p className="text-[11px] text-destructive flex items-center gap-1.5 mt-1">
        <AlertCircle className="w-3 h-3" /> {errors[k]}
      </p>
    ) : null;

  const isValid = Object.keys(errors).length === 0 && value.title && value.body && value.slug;

  return (
    <Card className="glass border-primary/30">
      <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
        <div>
          <CardTitle className="text-white">{isEdit ? "Edit post" : "New post"}</CardTitle>
          <CardDescription className="flex items-center gap-3 mt-1.5">
            {isValid ? (
              <span className="inline-flex items-center gap-1.5 text-emerald-400 text-xs">
                <Check className="w-3 h-3" /> Ready to publish
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-amber-400 text-xs">
                <AlertCircle className="w-3 h-3" /> {Object.keys(errors).length} issue(s)
              </span>
            )}
            {!isEdit && autosaved && (
              <span className="text-[10px] font-mono text-white/45">
                · Draft autosaved {autosaved.toLocaleTimeString()}
              </span>
            )}
          </CardDescription>
        </div>
        <div className="flex gap-2">
          <Button variant="electric" onClick={save} disabled={saving || !isValid}>
            {saving ? <Loader2 className="animate-spin" /> : <Save />} Save
          </Button>
          <Button variant="glass" onClick={onCancel}><X /> Cancel</Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid lg:grid-cols-2 gap-8">
          {/* ---------- FORM ---------- */}
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-wider text-white/60">Title *</Label>
              <Input value={value.title} onChange={(e) => onTitleChange(e.target.value)} placeholder="A great headline…" />
              {errBox("title")}
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs uppercase tracking-wider text-white/60">Slug *</Label>
                <Input
                  value={value.slug}
                  onChange={(e) => { setSlugTouched(true); update("slug", slugify(e.target.value)); }}
                  placeholder="auto-from-title"
                />
                <p className="text-[10px] font-mono text-white/40 truncate">/community/blog/{value.slug || "your-slug"}</p>
                {errBox("slug")}
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs uppercase tracking-wider text-white/60">Category *</Label>
                <select
                  value={value.category}
                  onChange={(e) => update("category", e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                >
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                {errBox("category")}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-wider text-white/60">Tags (comma separated, max 10)</Label>
              <Input
                value={tagInput}
                onChange={(e) => {
                  setTagInput(e.target.value);
                  update(
                    "tags",
                    e.target.value.split(",").map((t) => t.trim()).filter(Boolean).slice(0, 10),
                  );
                }}
                placeholder="selenium, junit, ci/cd"
              />
              {value.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {value.tags.map((t) => (
                    <span key={t} className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/30">
                      {t}
                    </span>
                  ))}
                </div>
              )}
              {errBox("tags")}
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-wider text-white/60">Excerpt</Label>
              <Textarea rows={2} value={value.excerpt ?? ""} onChange={(e) => update("excerpt", e.target.value)} placeholder="One-sentence teaser…" />
              <p className="text-[10px] font-mono text-white/40">{(value.excerpt ?? "").length}/280</p>
              {errBox("excerpt")}
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-wider text-white/60">Body * (markdown)</Label>
              <Textarea rows={12} value={value.body} onChange={(e) => update("body", e.target.value)} placeholder="# Heading&#10;&#10;Write your post in markdown…" className="font-mono text-xs" />
              {errBox("body")}
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs uppercase tracking-wider text-white/60">Cover image URL</Label>
                <Input value={value.cover_image_url ?? ""} onChange={(e) => update("cover_image_url", e.target.value)} placeholder="https://…" />
                {errBox("cover_image_url")}
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs uppercase tracking-wider text-white/60">Author</Label>
                <Input value={value.author} onChange={(e) => update("author", e.target.value)} />
                {errBox("author")}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary mb-3">SEO</p>
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <Label className="text-xs uppercase tracking-wider text-white/60">SEO title</Label>
                  <Input value={value.seo_title ?? ""} onChange={(e) => update("seo_title", e.target.value)} placeholder="Falls back to post title" maxLength={60} />
                  <p className="text-[10px] font-mono text-white/40">{(value.seo_title ?? "").length}/60</p>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs uppercase tracking-wider text-white/60">SEO description</Label>
                  <Textarea rows={2} value={value.seo_description ?? ""} onChange={(e) => update("seo_description", e.target.value)} placeholder="Falls back to excerpt" maxLength={160} />
                  <p className="text-[10px] font-mono text-white/40">{(value.seo_description ?? "").length}/160</p>
                </div>
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm text-white/80 pt-2">
              <input type="checkbox" checked={value.is_published} onChange={(e) => update("is_published", e.target.checked)} />
              Published (visible on site)
            </label>
          </div>

          {/* ---------- LIVE PREVIEW ---------- */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/55">Live Preview</p>
              {isEdit && value.slug && (
                <a
                  href={`/community/blog/${value.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[10px] font-mono text-primary inline-flex items-center gap-1 hover:underline"
                >
                  Open live <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>

            {/* Google search snippet */}
            <div className="rounded-xl bg-white/5 border border-white/10 p-4 space-y-1">
              <p className="text-[10px] font-mono uppercase tracking-wider text-white/40">Search preview</p>
              <p className="text-xs text-emerald-300/80 truncate">chanai.lovable.app › community › blog › {value.slug || "slug"}</p>
              <p className="text-blue-300 text-base leading-snug line-clamp-1">
                {value.seo_title || value.title || "Untitled post"}
              </p>
              <p className="text-white/55 text-xs leading-snug line-clamp-2">
                {value.seo_description || value.excerpt || "Add an excerpt or SEO description to see it here."}
              </p>
            </div>

            {/* Article preview */}
            <div className="rounded-xl bg-background/50 border border-white/10 overflow-hidden">
              {value.cover_image_url ? (
                <div className="aspect-[16/9] bg-white/5">
                  <img src={value.cover_image_url} alt="" className="w-full h-full object-cover"
                    onError={(e) => ((e.currentTarget.style.display = "none"))} />
                </div>
              ) : null}
              <div className="p-5">
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-[0.3em] bg-primary/15 text-primary border border-primary/30 mb-3">
                  {value.category || "General"}
                </span>
                <h2 className="font-display font-bold text-2xl text-white mb-2">{value.title || "Untitled post"}</h2>
                <p className="text-[10px] font-mono uppercase tracking-wider text-white/45 mb-4">
                  {value.author} · {new Date(value.published_at).toLocaleDateString()}
                </p>
                {value.excerpt && (
                  <p className="text-sm text-white/70 italic border-l-2 border-primary/40 pl-3 mb-4">{value.excerpt}</p>
                )}
                <div className="prose prose-invert prose-sm max-w-none prose-headings:font-display prose-headings:text-white prose-p:text-white/75 prose-a:text-primary prose-strong:text-white prose-code:text-primary prose-code:bg-white/5 prose-code:px-1 prose-code:rounded prose-code:before:content-none prose-code:after:content-none">
                  {value.body ? (
                    <ReactMarkdown>{value.body}</ReactMarkdown>
                  ) : (
                    <p className="text-white/40">Start writing to see a preview…</p>
                  )}
                </div>
                {value.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-white/10">
                    {value.tags.map((t) => (
                      <span key={t} className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 text-white/60">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const BlogAdmin = () => {
  const [items, setItems] = useState<BlogPost[]>([]);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [creating, setCreating] = useState(false);
  const [hasDraft, setHasDraft] = useState(false);

  const load = async () => {
    const { data, error } = await supabase.from("blog_posts").select("*").order("published_at", { ascending: false });
    if (error) toast({ title: "Load failed", description: error.message });
    setItems((data as BlogPost[]) ?? []);
  };
  useEffect(() => {
    load();
    try { setHasDraft(!!localStorage.getItem(AUTOSAVE_KEY)); } catch {}
  }, []);

  const remove = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) return toast({ title: "Delete failed", description: error.message });
    toast({ title: "Deleted" });
    load();
  };

  const startNew = (resume = false) => {
    if (resume) {
      try {
        const raw = localStorage.getItem(AUTOSAVE_KEY);
        if (raw) {
          setEditing(null);
          setCreating(true);
          // Pass via a sentinel
          (window as any).__resumeDraft = JSON.parse(raw);
        }
      } catch {}
    } else {
      try { localStorage.removeItem(AUTOSAVE_KEY); } catch {}
      (window as any).__resumeDraft = null;
    }
    setEditing(null);
    setCreating(true);
  };

  const initialDraft: FormState = (() => {
    if (creating) {
      const r = (window as any).__resumeDraft;
      return r ? { ...blankPost, ...r } : blankPost;
    }
    return blankPost;
  })();

  const existingSlugs = items.map((p) => ({ slug: p.slug, id: p.id }));

  const onSaved = () => {
    setCreating(false);
    setEditing(null);
    setHasDraft(false);
    (window as any).__resumeDraft = null;
    load();
  };

  return (
    <div className="p-8 space-y-6">
      <header className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display font-bold text-3xl text-white">Blog Posts</h1>
          <p className="text-white/60 text-sm mt-1">Markdown supported · live preview · autosave for new posts.</p>
        </div>
        {!creating && !editing && (
          <div className="flex gap-2">
            {hasDraft && (
              <Button variant="glass" onClick={() => startNew(true)}>
                Resume draft
              </Button>
            )}
            <Button variant="electric" onClick={() => startNew(false)}>
              <Plus /> New post
            </Button>
          </div>
        )}
      </header>

      {(creating || editing) && (
        <BlogEditor
          initial={editing ? (editing as unknown as FormState) : initialDraft}
          isEdit={!!editing}
          existingSlugs={existingSlugs}
          onCancel={() => { setCreating(false); setEditing(null); }}
          onSaved={onSaved}
        />
      )}

      <Card className="glass border-white/10">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-white/70">Title</TableHead>
                <TableHead className="text-white/70">Category</TableHead>
                <TableHead className="text-white/70">Tags</TableHead>
                <TableHead className="text-white/70">Status</TableHead>
                <TableHead className="text-white/70">Date</TableHead>
                <TableHead className="text-white/70 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((p) => (
                <TableRow key={p.id} className="border-white/5">
                  <TableCell className="text-white font-medium">
                    <div>{p.title}</div>
                    <div className="text-[10px] text-white/40 font-mono">{p.slug}</div>
                  </TableCell>
                  <TableCell>
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/30">
                      {p.category ?? "General"}
                    </span>
                  </TableCell>
                  <TableCell className="text-white/60 text-xs max-w-[200px]">
                    {(p.tags ?? []).slice(0, 3).join(", ") || <span className="text-white/30">—</span>}
                  </TableCell>
                  <TableCell>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${p.is_published ? "bg-emerald-500/15 text-emerald-300" : "bg-white/10 text-white/60"}`}>
                      {p.is_published ? "Published" : "Draft"}
                    </span>
                  </TableCell>
                  <TableCell className="text-white/60 text-xs">{new Date(p.published_at).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button size="sm" variant="glass" asChild>
                      <a href={`/community/blog/${p.slug}`} target="_blank" rel="noreferrer" title="View live">
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </Button>
                    <Button size="sm" variant="glass" onClick={() => { setCreating(false); setEditing(p); }}><Pencil className="w-3.5 h-3.5" /></Button>
                    <Button size="sm" variant="destructive" onClick={() => remove(p.id)}><Trash2 className="w-3.5 h-3.5" /></Button>
                  </TableCell>
                </TableRow>
              ))}
              {items.length === 0 && (
                <TableRow><TableCell colSpan={6} className="text-center text-white/50 py-8">No posts yet.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  ROUTER                                                                     */
/* -------------------------------------------------------------------------- */
const Admin = () => (
  <Routes>
    <Route index element={<AdminLogin />} />
    <Route element={<AdminShell />}>
      <Route path="dashboard" element={<AnalyticsDashboard />} />
      <Route path="services" element={<ServicesAdmin />} />
      <Route path="blog" element={<BlogAdmin />} />
    </Route>
  </Routes>
);

export default Admin;
