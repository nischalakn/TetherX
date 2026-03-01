import { useNavigate } from "react-router-dom";
import { Activity, ArrowRight, Shield, Clock, Users, HeartPulse, Microscope, Brain, Zap, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "Patients Served", value: "12,400+" },
  { label: "Departments", value: "8" },
  { label: "Requests Processed", value: "1,284" },
  { label: "SLA Compliance", value: "94.2%" },
];

const services = [
  { icon: HeartPulse, title: "Cardiology", desc: "Advanced cardiac care and diagnostics" },
  { icon: Brain, title: "Neurology", desc: "Expert neurological assessments" },
  { icon: Microscope, title: "Pathology", desc: "Comprehensive lab analysis and diagnostics" },
  { icon: Zap, title: "Emergency", desc: "24/7 emergency medical services" },
  { icon: Activity, title: "Radiology", desc: "Full-spectrum imaging and scans" },
  { icon: Users, title: "Orthopedics", desc: "Bone, joint, and spine care" },
  { icon: Clock, title: "Pharmacy", desc: "Prescription management and dispensing" },
  { icon: CheckCircle2, title: "Oncology", desc: "Comprehensive cancer care pathways" },
];

const steps = [
  { step: "01", title: "Submit Your Request", desc: "Fill in your patient ID and describe your medical concern. No account needed." },
  { step: "02", title: "Automatic Routing", desc: "TetherX intelligently routes your request to the appropriate specialist department." },
  { step: "03", title: "Track & Receive Care", desc: "Monitor your request status in real-time using your unique tracking token." },
];

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(145deg, hsl(210 80% 98%) 0%, hsl(0 0% 100%) 45%, hsl(220 60% 97%) 100%)" }}>
      {/* Navbar */}
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-border/40 backdrop-blur-md" style={{ background: "rgba(240,247,255,0.85)" }}>
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Activity className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">TetherX</span>
          </div>
          <nav className="hidden items-center gap-8 md:flex">
            <a href="#services" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Services</a>
            <a href="#how-it-works" className="text-sm text-muted-foreground transition-colors hover:text-foreground">How It Works</a>
            <a href="#about" className="text-sm text-muted-foreground transition-colors hover:text-foreground">About</a>
          </nav>
          <Button onClick={() => navigate("/login")}>Login</Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
        {/* Gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 left-1/4 h-[500px] w-[500px] rounded-full bg-primary/8 blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-blue-300/15 blur-[80px]" />
          <div className="absolute top-1/3 -right-20 h-[300px] w-[300px] rounded-full bg-indigo-200/20 blur-[70px]" />
          <div className="absolute top-1/2 -left-20 h-[280px] w-[280px] rounded-full bg-sky-200/20 blur-[70px]" />
          {/* Subtle dot grid */}
          <svg className="absolute inset-0 h-full w-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="hsl(210 79% 46%)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
          {/* Decorative ring top-right */}
          <svg className="absolute -right-24 -top-24 h-96 w-96 opacity-[0.07]" viewBox="0 0 200 200" fill="none">
            <circle cx="100" cy="100" r="90" stroke="hsl(210 79% 46%)" strokeWidth="1.5" />
            <circle cx="100" cy="100" r="70" stroke="hsl(210 79% 46%)" strokeWidth="1" />
            <circle cx="100" cy="100" r="50" stroke="hsl(210 79% 46%)" strokeWidth="0.5" />
          </svg>
          {/* Decorative ring bottom-left */}
          <svg className="absolute -bottom-24 -left-24 h-80 w-80 opacity-[0.06]" viewBox="0 0 200 200" fill="none">
            <circle cx="100" cy="100" r="90" stroke="hsl(220 60% 50%)" strokeWidth="1.5" />
            <circle cx="100" cy="100" r="65" stroke="hsl(220 60% 50%)" strokeWidth="1" />
          </svg>
        </div>
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-4 inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary">
            <Shield className="mr-1.5 h-3.5 w-3.5" />
            Secure & HIPAA-Ready Hospital Management Platform
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Modern Healthcare,
            <br />
            <span className="text-primary">Seamlessly Connected</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            TetherX streamlines inter-department medical requests, ensuring the right care reaches
            the right patient at the right time — every time.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="h-14 px-10 text-base" onClick={() => navigate("/submit")}>
              Raise a Medical Request
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-10 text-base" onClick={() => navigate("/login")}>
              Staff / Patient Login
            </Button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            For patients · No account required to raise a request
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border/60 backdrop-blur-sm" style={{ background: "rgba(255,255,255,0.6)" }}>
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-bold text-primary">{s.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-foreground">Our Departments</h2>
          <p className="mt-3 text-muted-foreground">World-class specialists across all major medical disciplines</p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <div key={s.title} className="rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <s.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24" style={{ background: "rgba(235,245,255,0.45)" }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-foreground">How It Works</h2>
            <p className="mt-3 text-muted-foreground">Submit a medical request in three simple steps</p>
          </div>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {steps.map((s, i) => (
              <div key={s.step} className="relative text-center">
                {i < steps.length - 1 && (
                  <div className="absolute left-1/2 top-8 hidden h-0.5 w-full translate-x-1/2 bg-border md:block" />
                )}
                <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                  {s.step}
                </div>
                <h3 className="mt-4 text-base font-semibold text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button size="lg" onClick={() => navigate("/submit")}>
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-foreground">About TetherX</h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            TetherX is a next-generation hospital workflow automation platform designed to eliminate the
            communication gap between departments. From radiology scans to emergency escalations, every
            inter-department request is tracked, prioritised, and routed in real time — ensuring patients
            receive faster, better-coordinated care while staff spend less time on paperwork.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            {["SLA Enforcement", "Role-Based Access", "Audit Trail", "Real-Time Tracking", "Secure File Sharing"].map((f) => (
              <span key={f} className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                {f}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/60 py-8" style={{ background: "rgba(255,255,255,0.7)" }}>
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded bg-primary">
              <Activity className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">TetherX</span>
          </div>
          <p className="text-xs text-muted-foreground">© 2025 TetherX Medical Systems. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <a href="#" className="transition-colors hover:text-foreground">Privacy</a>
            <a href="#" className="transition-colors hover:text-foreground">Terms</a>
            <a href="#" className="transition-colors hover:text-foreground">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
