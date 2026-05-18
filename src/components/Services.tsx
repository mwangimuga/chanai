import { useEffect, useState } from "react";
import * as Icons from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { trackClick } from "@/lib/analytics";

type DbService = {
  id: string;
  title: string;
  description: string;
  icon: string;
  sort_order: number;
};

const FALLBACK: DbService[] = [
  { id: "1", icon: "Brain", title: "AI Consulting", description: "Strategic guidance to integrate AI into your business operations.", sort_order: 1 },
  { id: "2", icon: "Bot", title: "AI Agents", description: "Build intelligent systems that automate workflows and decision-making.", sort_order: 2 },
  { id: "3", icon: "ShieldCheck", title: "Software Quality Assurance", description: "Ensure reliability, performance, and scalability of your applications.", sort_order: 3 },
  { id: "4", icon: "Cog", title: "Automation Testing", description: "Selenium & JUnit frameworks for robust automated testing.", sort_order: 4 },
  { id: "5", icon: "Activity", title: "Load Testing", description: "Validate performance under pressure before your users do.", sort_order: 5 },
  { id: "6", icon: "GraduationCap", title: "Training & Mentorship", description: "Upskill your team with real-world QA and AI knowledge.", sort_order: 6 },
];

const resolveIcon = (name: string) => {
  const I = (Icons as any)[name];
  return I ?? Icons.Sparkles;
};

const Services = () => {
  const [services, setServices] = useState<DbService[]>(FALLBACK);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("services")
        .select("id,title,description,icon,sort_order")
        .eq("is_published", true)
        .order("sort_order", { ascending: true });
      if (data && data.length) setServices(data as DbService[]);
    })();
  }, []);

  return (
    <section id="services" className="relative py-28">
      <div className="absolute inset-0 grid-bg opacity-25" />
      <div className="container relative z-10">
        <div className="max-w-2xl mb-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary mb-4">What We Do</p>
          <h2 className="font-display font-bold text-4xl md:text-6xl text-white mb-6 leading-[1.05] tracking-tight">
            Engineering services for teams that
            <span className="text-electric-gradient"> can&rsquo;t afford failure.</span>
          </h2>
          <p className="text-lg text-white/70 leading-relaxed">
            From AI strategy and intelligent agents to precision quality assurance —
            we engineer systems that don&rsquo;t fail.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => {
            const Icon = resolveIcon(s.icon);
            return (
              <div
                key={s.id}
                onClick={() => trackClick(`service:${s.title}`)}
                className="group relative p-8 rounded-2xl glass hover:border-primary/30 transition-all duration-500 hover:-translate-y-1 overflow-hidden cursor-pointer"
              >
                <div className="absolute -top-20 -right-20 w-48 h-48 bg-primary/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative">
                  <div className="inline-flex w-12 h-12 rounded-xl bg-gradient-electric items-center justify-center mb-6 shadow-glow group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5 text-primary-foreground" />
                  </div>

                  <h3 className="font-display font-semibold text-xl mb-3 text-white group-hover:text-electric-gradient transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-6">{s.description}</p>

                  <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.3em] text-primary opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                    Learn more <ArrowUpRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
