import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { trackClick } from "@/lib/analytics";

type DbService = {
  id: string;
  title: string;
  description: string;
  sort_order: number;
};

const FALLBACK: DbService[] = [
  { id: "1", title: "AI Consulting", description: "Strategic guidance to integrate AI into your business operations.", sort_order: 1 },
  { id: "2", title: "AI Agents", description: "Build intelligent systems that automate workflows and decision-making.", sort_order: 2 },
  { id: "3", title: "Software Quality Assurance", description: "Ensure reliability, performance, and scalability of your applications.", sort_order: 3 },
  { id: "4", title: "Automation Testing", description: "Selenium & JUnit frameworks for robust automated testing.", sort_order: 4 },
  { id: "5", title: "Load Testing", description: "Validate performance under pressure before your users do.", sort_order: 5 },
  { id: "6", title: "Training & Mentorship", description: "Upskill your team with real-world QA and AI knowledge.", sort_order: 6 },
];

const Services = () => {
  const [services, setServices] = useState<DbService[]>(FALLBACK);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("services")
        .select("id,title,description,sort_order")
        .eq("is_published", true)
        .order("sort_order", { ascending: true });
      if (data && data.length) setServices(data as DbService[]);
    })();
  }, []);

  return (
    <section id="services" className="relative py-36 bg-background">
      <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />
      <div className="container relative z-10 px-6">
        <div className="max-w-3xl mb-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary mb-6">Expertise</p>
          <h2 className="font-display font-bold text-2xl md:text-4xl text-foreground mb-6 leading-[1.1] tracking-tight">
            Consulting and engineering <span className="italic font-normal font-serif">built for absolute reliability.</span>
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
            From strategic integration and autonomous agents to rigorous quality assurance —
            we build high-performance systems that scale.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16 border-t border-black/5 dark:border-white/5 pt-16">
          {services.map((s, idx) => {
            const numStr = String(idx + 1).padStart(2, "0");
            return (
              <div
                key={s.id}
                onClick={() => trackClick(`service:${s.title}`)}
                className="group relative flex flex-col justify-between items-start transition-all duration-300 cursor-pointer"
              >
                <div>
                  <div className="font-serif italic text-4xl text-primary/60 dark:text-primary/45 mb-6 select-none font-normal">
                    {numStr}
                  </div>

                  <h3 className="font-display font-semibold text-lg md:text-xl mb-3 text-foreground group-hover:text-primary transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-muted-foreground text-[13px] leading-relaxed mb-5 max-w-sm">
                    {s.description}
                  </p>
                </div>

                <div className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-[0.3em] text-primary transition-all duration-300">
                  Read specs <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
