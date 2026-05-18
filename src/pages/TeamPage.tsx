import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const TEAM_MEMBERS = [
  {
    name: "Olivier Mugisha",
    role: "Founder & CEO",
    specialty: "Strategy & AI Architecture",
    bio: "Pioneering high-grade software and AI consulting ecosystems across East Africa from our Kigali base.",
  },
  {
    name: "Brenda Umutoni",
    role: "Lead Systems Architect",
    specialty: "High-Performance Platforms",
    bio: "Over 8 years building fault-tolerant scalable backends and pipeline orchestrations for global fintech.",
  },
  {
    name: "Christian Mugabo",
    role: "Head of Quality Assurance",
    specialty: "Test Frameworks & CI/CD",
    bio: "Veteran QA leader specialized in heavy JUnit automation, continuous integration gates, and Selenium.",
  },
  {
    name: "Diane Kwizera",
    role: "AI Research Lead",
    specialty: "LLM & Custom Agents",
    bio: "Researching secure agentic workflows, LangChain prompt engineering, and evaluation scorecards.",
  },
  {
    name: "Jean-Paul Nsengimana",
    role: "Senior Automation Engineer",
    specialty: "Selenium & Python Automation",
    bio: "Building robust Selenium regression suites and cross-browser grid infrastructures.",
  },
  {
    name: "Marie-Claire Ineza",
    role: "Performance Engineer",
    specialty: "JMeter & Load Testing",
    bio: "Simulating peak retail events, identifying memory leaks, and optimizing JVM and database instances.",
  },
  {
    name: "Eric Gasana",
    role: "Frontend Engineer",
    specialty: "Sleek UX & Interaction Design",
    bio: "Crafting beautiful, accessible, and fast web products using Tailwind CSS and modern React frameworks.",
  },
  {
    name: "Aline Uwase",
    role: "Junior QA Engineer",
    specialty: "Manual & Integration Audits",
    bio: "Focussed on boundary audits, manual exploratory test cases, and early lifecycle requirements review.",
  },
];

const TeamPage = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="relative pt-44 pb-36 bg-background">
        <div className="container max-w-6xl px-6">
          {/* Back button */}
          <div className="mb-14">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to About
            </Link>
          </div>

          {/* Heading */}
          <div className="max-w-3xl mb-24">
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary mb-6">Our Experts</p>
            <h1 className="font-display font-bold text-3xl md:text-5xl lg:text-[58px] text-foreground leading-[1.1] mb-6">
              Engineers and advisors <span className="italic font-normal font-serif">who deliver excellence.</span>
            </h1>
            <p className="text-sm md:text-[15px] text-muted-foreground leading-relaxed max-w-2xl">
              Our team consists of senior specialists, AI researchers, and rigorous quality assurance veterans dedicated to building robust infrastructure.
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {TEAM_MEMBERS.map((member, i) => (
              <div
                key={i}
                className="group relative flex flex-col justify-between border border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5 rounded-2xl p-8 hover:border-primary/20 transition-all duration-300"
              >
                <div>
                  <div className="w-16 h-16 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center mb-6 text-lg font-display font-semibold text-primary bg-background">
                    {member.name.split(" ").slice(0, 2).map((w) => w[0]).join("")}
                  </div>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-[8px] font-mono uppercase tracking-[0.2em] text-primary mb-1">{member.role}</p>
                  <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wide mb-4">{member.specialty}</p>
                  <p className="text-[13px] text-muted-foreground leading-relaxed mb-4">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default TeamPage;
