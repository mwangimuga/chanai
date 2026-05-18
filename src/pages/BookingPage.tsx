import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, Check, MessageCircle, Sparkles, Brain, Bot, ShieldCheck, Cog, Activity, GraduationCap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { formatBookingMessage, openWhatsApp, type BookingPayload } from "@/lib/whatsapp";

const SERVICES = [
  { id: "AI Agent Development", icon: Bot, desc: "Intelligent agents that automate workflows" },
  { id: "AI Consulting", icon: Brain, desc: "Strategic AI integration for your business" },
  { id: "QA Consulting", icon: ShieldCheck, desc: "End-to-end software quality strategy" },
  { id: "Selenium & Automation", icon: Cog, desc: "Automated test frameworks at scale" },
  { id: "Load & Performance Testing", icon: Activity, desc: "Stress-test applications for real traffic" },
  { id: "Corporate Training", icon: GraduationCap, desc: "Upskill your team on AI & QA" },
];

const TIMELINES = ["ASAP", "1–4 Weeks", "1–3 Months", "3+ Months", "Not Sure"];
const BUDGETS = ["< $500", "$500–$2,000", "$2,000–$10,000", "$10,000+", "Let's Discuss"];
const CONTACT_METHODS = ["WhatsApp", "Email", "Video Call"];
const COUNTRIES = ["Rwanda", "Kenya", "Uganda", "Tanzania", "Nigeria", "Ghana", "South Africa", "United States", "United Kingdom", "Other"];

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  email: z.string().trim().email("Enter a valid email").max(200),
  phone: z.string().trim().min(7, "Enter a valid phone").max(30),
  country: z.string().min(1),
  source: z.string().optional(),
});

const detailsSchema = z.object({
  project: z.string().trim().min(50, "Please describe your project (min 50 characters)").max(2000),
  timeline: z.string().min(1, "Pick a timeline"),
  budget: z.string().min(1, "Pick a budget"),
  contact: z.string().min(1, "Pick a contact method"),
});

const Stepper = ({ step }: { step: number }) => (
  <div className="mb-10">
    <div className="flex items-center justify-between mb-3 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
      <span>Step {step} of 4</span>
      <span>{step === 1 ? "Services" : step === 2 ? "About You" : step === 3 ? "Project" : "Review"}</span>
    </div>
    <div className="h-1 rounded-full bg-secondary overflow-hidden">
      <div
        className="h-full bg-gradient-electric transition-all duration-500"
        style={{ width: `${(step / 4) * 100}%` }}
      />
    </div>
  </div>
);

const BookingPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);

  const [services, setServices] = useState<string[]>([]);
  const [contact, setContact] = useState({
    name: "", company: "", email: "", phone: "+250 ", country: "Rwanda", source: "Google",
  });
  const [details, setDetails] = useState({ project: "", timeline: "", budget: "", contact: "WhatsApp" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggle = (s: string) =>
    setServices((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const next = () => {
    setErrors({});
    if (step === 1) {
      if (services.length === 0) { setErrors({ services: "Pick at least one service" }); return; }
    }
    if (step === 2) {
      const r = contactSchema.safeParse(contact);
      if (!r.success) { setErrors(Object.fromEntries(Object.entries(r.error.flatten().fieldErrors).map(([k,v])=>[k,(v as string[])[0]]))); return; }
    }
    if (step === 3) {
      const r = detailsSchema.safeParse(details);
      if (!r.success) { setErrors(Object.fromEntries(Object.entries(r.error.flatten().fieldErrors).map(([k,v])=>[k,(v as string[])[0]]))); return; }
    }
    setStep((s) => Math.min(4, s + 1));
  };

  const submit = () => {
    const payload: BookingPayload = {
      ...contact, ...details, services,
    };
    openWhatsApp(formatBookingMessage(payload));
    setDone(true);
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-24">
        <div className="container max-w-3xl">
          {!done ? (
            <>
              <div className="text-center mb-10">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-3">Book a Consultation</p>
                <h1 className="font-display font-bold text-2xl md:text-4xl text-gradient mb-2.5">
                  Let's Build Something Extraordinary
                </h1>
                <p className="text-sm text-muted-foreground">Free 30-min discovery call. Response within 24 hours.</p>
              </div>

              <div className="glass-strong rounded-2xl p-6 md:p-10">
                <Stepper step={step} />

                {step === 1 && (
                  <div>
                    <h2 className="font-display text-lg md:text-xl font-semibold mb-1.5">What can we help you with?</h2>
                    <p className="text-[13px] text-muted-foreground mb-5">Select one or more services.</p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {SERVICES.map((s) => {
                        const sel = services.includes(s.id);
                        const Icon = s.icon;
                        return (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => toggle(s.id)}
                            className={`text-left p-4 rounded-xl border transition-all relative overflow-hidden group ${
                              sel ? "border-primary bg-primary/10 shadow-glow" : "border-border bg-card/40 hover:border-primary/40"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${sel ? "bg-gradient-electric" : "bg-secondary"}`}>
                                <Icon className={`w-5 h-5 ${sel ? "text-primary-foreground" : "text-muted-foreground"}`} />
                              </div>
                              <div className="flex-1">
                                <div className="font-display font-semibold text-sm">{s.id}</div>
                                <div className="text-xs text-muted-foreground mt-1">{s.desc}</div>
                              </div>
                              {sel && <Check className="w-5 h-5 text-primary shrink-0" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                    {errors.services && <p className="text-sm text-destructive mt-3">{errors.services}</p>}
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <h2 className="font-display text-lg md:text-xl font-semibold mb-1.5">Tell us about you</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field label="Full Name *" error={errors.name}>
                        <Input value={contact.name} onChange={(e)=>setContact({...contact, name:e.target.value})} placeholder="Jane Doe" />
                      </Field>
                      <Field label="Company / Organization" error={errors.company}>
                        <Input value={contact.company} onChange={(e)=>setContact({...contact, company:e.target.value})} placeholder="Acme Inc." />
                      </Field>
                      <Field label="Email *" error={errors.email}>
                        <Input type="email" value={contact.email} onChange={(e)=>setContact({...contact, email:e.target.value})} placeholder="you@company.com" />
                      </Field>
                      <Field label="Phone / WhatsApp *" error={errors.phone}>
                        <Input value={contact.phone} onChange={(e)=>setContact({...contact, phone:e.target.value})} placeholder="+250 ..." />
                      </Field>
                      <Field label="Country *" error={errors.country}>
                        <select value={contact.country} onChange={(e)=>setContact({...contact, country:e.target.value})} className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                          {COUNTRIES.map(c=><option key={c}>{c}</option>)}
                        </select>
                      </Field>
                      <Field label="How did you hear about us?">
                        <select value={contact.source} onChange={(e)=>setContact({...contact, source:e.target.value})} className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                          {["Google","LinkedIn","Referral","Social Media","Other"].map(c=><option key={c}>{c}</option>)}
                        </select>
                      </Field>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-5">
                    <h2 className="font-display text-lg md:text-xl font-semibold mb-1.5">Project details</h2>
                    <Field label={`What's your project about? (${details.project.length}/2000)`} error={errors.project}>
                      <Textarea rows={5} value={details.project} onChange={(e)=>setDetails({...details, project:e.target.value})} placeholder="Tell us about your goals, current stack, and what success looks like..." />
                    </Field>
                    <RadioGroup label="Timeline *" options={TIMELINES} value={details.timeline} onChange={(v)=>setDetails({...details, timeline:v})} error={errors.timeline} />
                    <RadioGroup label="Budget Range *" options={BUDGETS} value={details.budget} onChange={(v)=>setDetails({...details, budget:v})} error={errors.budget} />
                    <RadioGroup label="Preferred Contact *" options={CONTACT_METHODS} value={details.contact} onChange={(v)=>setDetails({...details, contact:v})} error={errors.contact} />
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-5">
                    <h2 className="font-display text-lg md:text-xl font-semibold mb-1.5">Review & Confirm</h2>
                    <SummaryRow label="Services" value={services.join(", ")} onEdit={()=>setStep(1)} />
                    <SummaryRow label="Name" value={`${contact.name}${contact.company ? ` · ${contact.company}` : ""}`} onEdit={()=>setStep(2)} />
                    <SummaryRow label="Contact" value={`${contact.email} · ${contact.phone} · ${contact.country}`} onEdit={()=>setStep(2)} />
                    <SummaryRow label="Project" value={details.project} onEdit={()=>setStep(3)} />
                    <SummaryRow label="Timeline · Budget" value={`${details.timeline} · ${details.budget}`} onEdit={()=>setStep(3)} />
                    <SummaryRow label="Contact via" value={details.contact} onEdit={()=>setStep(3)} />
                  </div>
                )}

                <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/50">
                  <Button variant="ghost" onClick={()=>step===1 ? navigate("/") : setStep(step-1)}>
                    <ArrowLeft /> {step === 1 ? "Cancel" : "Back"}
                  </Button>
                  {step < 4 ? (
                    <Button variant="electric" onClick={next}>Continue <ArrowRight /></Button>
                  ) : (
                    <Button variant="electric" size="lg" onClick={submit}>
                      <MessageCircle /> Send via WhatsApp
                    </Button>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="glass-strong rounded-2xl p-12 text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-electric mx-auto mb-6 flex items-center justify-center shadow-glow animate-scale-in">
                <Check className="w-10 h-10 text-primary-foreground" />
              </div>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-gradient mb-3">Request Sent!</h2>
              <p className="text-muted-foreground mb-8">
                Your consultation request has been opened in WhatsApp. Our team will respond within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="electric" onClick={()=>navigate("/")}>Return Home</Button>
                <Button variant="glass" onClick={()=>{setDone(false); setStep(1);}}>
                  <Sparkles /> Submit Another Request
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
};

const Field = ({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) => (
  <div className="space-y-2">
    <Label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">{label}</Label>
    {children}
    {error && <p className="text-xs text-destructive">{error}</p>}
  </div>
);

const RadioGroup = ({ label, options, value, onChange, error }: { label: string; options: string[]; value: string; onChange: (v: string) => void; error?: string }) => (
  <div className="space-y-2">
    <Label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">{label}</Label>
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onChange(o)}
          className={`px-4 py-2 rounded-full text-sm border transition-all ${
            value === o ? "border-primary bg-primary/15 text-foreground shadow-glow" : "border-border bg-card/40 text-muted-foreground hover:border-primary/40"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
    {error && <p className="text-xs text-destructive">{error}</p>}
  </div>
);

const SummaryRow = ({ label, value, onEdit }: { label: string; value: string; onEdit: () => void }) => (
  <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-card/40 border border-border/50">
    <div className="flex-1 min-w-0">
      <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1">{label}</div>
      <div className="text-sm break-words">{value || "—"}</div>
    </div>
    <button onClick={onEdit} className="text-xs text-primary hover:underline shrink-0">Edit</button>
  </div>
);

export default BookingPage;
