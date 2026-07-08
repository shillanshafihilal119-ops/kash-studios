import Image from "next/image";
import { cookies } from "next/headers";
import { ContactForm } from "@/components/ContactForm";
import { LoadingScreen } from "@/components/LoadingScreen";
import { TechFloaters } from "@/components/TechFloaters";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Code2,
  ExternalLink,
  FileText,
  LockKeyhole,
  Mail,
  MessageCircle,
  MonitorSmartphone,
  Phone,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Store,
  UserRoundCheck,
  Wrench
} from "lucide-react";

const services = [
  {
    title: "Business Website",
    description: "A clear, professional website that explains your services and helps customers contact you.",
    icon: Store
  },
  {
    title: "Landing Page",
    description: "A focused one-page site for promotions, service offers, launches, or local ads.",
    icon: Sparkles
  },
  {
    title: "Portfolio Website",
    description: "A clean personal website to show your work, story, skills, and contact details.",
    icon: MonitorSmartphone
  },
  {
    title: "Website Redesign",
    description: "A fresh look for an outdated site with better spacing, mobile layout, and user flow.",
    icon: Wrench
  },
  {
    title: "Basic SEO Setup",
    description: "Simple page titles, descriptions, structure, and local-friendly setup to help people find you.",
    icon: Search
  }
];

const projects = [
  {
    title: "Vintage DTP",
    category: "Printing and document services",
    description:
      "A live website for DTP, printing, and document formatting services, with clear service positioning and enquiry-focused structure.",
    status: "Live project",
    palette: "from-amber-300 via-stone-200 to-zinc-700",
    image: "/portfolio/vintage-dtp-preview.png",
    url: "https://dtp-gules.vercel.app/"
  },
  {
    title: "GlowKart",
    category: "Cosmetics online store",
    description:
      "A live makeup, skincare, and beauty store concept with product browsing, ecommerce-style layout, and a polished customer-facing design.",
    status: "In progress",
    palette: "from-rose-300 via-fuchsia-200 to-slate-800",
    image: "/portfolio/glowkart-preview.png",
    url: "https://glowkart-two.vercel.app/"
  },
  {
    title: "Future Client Website",
    category: "Available project slot",
    description:
      "A reserved space for the next local business website, landing page, portfolio, or redesign project.",
    status: "Open for work",
    palette: "from-cyan-200 via-teal-200 to-slate-800"
  }
];

const pricing = [
  {
    name: "Landing Page",
    price: "INR 1,000-2,000",
    details: "Best for one service, offer, event, or simple campaign."
  },
  {
    name: "Portfolio Website",
    price: "INR 2,000-4,000",
    details: "Best for freelancers, students, creators, and personal brands."
  },
  {
    name: "Business Website",
    price: "INR 4,000-6,000",
    details: "Best for local shops, service providers, and small companies."
  },
  {
    name: "Custom Project",
    price: "Contact for quote",
    details: "For stores, extra pages, special features, or redesign work."
  }
];

const processSteps = [
  {
    title: "Understand the business",
    description: "We discuss your services, target customers, pages, content, and the main action your website should drive.",
    icon: MessageCircle
  },
  {
    title: "Plan and design",
    description: "I create a clean page structure, write simple copy where needed, and build a mobile-friendly layout.",
    icon: ClipboardCheck
  },
  {
    title: "Build and review",
    description: "You review the website, request small changes, and I polish the final version before handoff.",
    icon: UserRoundCheck
  },
  {
    title: "Launch support",
    description: "I can help with basic setup, contact links, SEO basics, and simple guidance after the site goes live.",
    icon: Rocket
  }
];

const deliverables = [
  "Responsive design for mobile, tablet, and desktop",
  "Clean section layout with clear call-to-action buttons",
  "Basic SEO titles, descriptions, and page structure",
  "WhatsApp, email, and prepared contact form setup",
  "Simple guidance for updating text and images later",
  "Launch-ready Next.js and Tailwind CSS code"
];

const clientFit = [
  "Local service providers who need calls or WhatsApp enquiries",
  "Small shops that need a clean business website",
  "Students, freelancers, and creators who need a portfolio",
  "Owners with an old website that does not look good on mobile"
];

const faqs = [
  {
    question: "Can I hire you even if I do not have website content ready?",
    answer:
      "Yes. You can send rough details about your business, and I can help turn them into clear website copy."
  },
  {
    question: "Do you make websites mobile-friendly?",
    answer:
      "Yes. The layout is built to work on phones, tablets, and desktop screens because many local customers browse from mobile."
  },
  {
    question: "Do you provide advanced backend features?",
    answer:
      "For now, I focus on clean front-end websites and simple website setups. Custom backend work can be discussed separately."
  }
];

const navItems = ["About", "Services", "Work", "Process", "Pricing", "Contact"];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "KASH STUDIOS",
  description:
    "Freelance web developer building clean, mobile-friendly websites for small businesses and personal brands.",
  email: "shillanshafihilal119@gmail.com",
  telephone: "+917889410756",
  areaServed: "India",
  serviceType: [
    "Business Website",
    "Landing Page",
    "Portfolio Website",
    "Website Redesign",
    "Basic SEO Setup"
  ]
};

function SectionHeading({
  eyebrow,
  title,
  description
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-300">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-normal text-white sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-slate-300">{description}</p>
    </div>
  );
}

function ProjectPreview({ image, palette, title }: { image?: string; palette: string; title: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-slate-950 p-3 shadow-2xl shadow-black/30">
      <div className="flex items-center gap-1.5 border-b border-white/10 pb-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
      </div>
      {image ? (
        <div className="project-preview-image mt-3 overflow-hidden rounded-md border border-white/10 bg-slate-900">
          <Image
            src={image}
            alt={`${title} website preview`}
            width={960}
            height={600}
            className="aspect-[16/10] w-full object-cover object-top"
          />
        </div>
      ) : (
        <>
          <div className={`mt-3 h-28 rounded-md bg-gradient-to-br ${palette} p-4`}>
            <div className="h-3 w-24 rounded-full bg-white/70" />
            <div className="mt-4 h-2 w-36 rounded-full bg-white/50" />
            <div className="mt-2 h-2 w-28 rounded-full bg-white/35" />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            <span className="h-10 rounded bg-white/8" />
            <span className="h-10 rounded bg-white/8" />
            <span className="h-10 rounded bg-white/8" />
          </div>
        </>
      )}
      <p className="mt-3 text-xs font-medium text-slate-400">{title}</p>
    </div>
  );
}

export default function HomePage() {
  const isAdminUnlocked = cookies().get("kash_admin_unlocked")?.value === "true";

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#080d12] text-slate-100">
      <LoadingScreen />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#080d12]/90 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
          <a href="#top" className="text-lg font-semibold tracking-normal text-white">
            KASH STUDIOS
          </a>
          <div className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-slate-300 transition hover:text-white"
              >
                {item}
              </a>
            ))}
            {isAdminUnlocked ? (
              <a
                href="/admin/messages"
                className="inline-flex items-center gap-2 text-sm font-semibold text-teal-300 transition hover:text-teal-100"
              >
                <LockKeyhole className="h-4 w-4" />
                Admin
              </a>
            ) : null}
          </div>
          <a
            href="#contact"
            className="magnetic-cta inline-flex items-center gap-2 rounded-md bg-teal-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-teal-200"
          >
            Hire Me
            <ArrowRight className="h-4 w-4" />
          </a>
        </nav>
        <div className="max-w-full overflow-hidden border-t border-white/10 md:hidden">
          <div className="mx-auto flex max-w-full gap-4 overflow-x-auto px-5 py-3 text-sm text-slate-300">
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="shrink-0 hover:text-white">
                {item}
              </a>
            ))}
            {isAdminUnlocked ? (
              <a href="/admin/messages" className="inline-flex shrink-0 items-center gap-2 text-teal-300 hover:text-teal-100">
                <LockKeyhole className="h-4 w-4" />
                Admin
              </a>
            ) : null}
          </div>
        </div>
      </header>

      <section id="top" className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(20,184,166,0.14),transparent_34rem),linear-gradient(250deg,rgba(148,163,184,0.13),transparent_28rem)]" />
        <div className="hero-grid absolute inset-0" />
        <div className="hero-scanline absolute inset-x-0 top-0 h-px" />
        <div className="hero-orbit absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full" />
        <TechFloaters />
        <div className="relative mx-auto grid min-h-[calc(100vh-73px)] max-w-6xl items-center gap-12 px-5 py-16 sm:px-6 lg:grid-cols-[1fr_0.92fr] lg:px-8">
          <div className="reveal-up">
            <p className="inline-flex items-center gap-2 rounded-md border border-teal-300/25 bg-teal-300/10 px-3 py-2 text-sm font-medium text-teal-200">
              <ShieldCheck className="h-4 w-4" />
              Freelance web developer for growing businesses
            </p>
            <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-tight tracking-normal text-white sm:text-5xl lg:text-6xl">
              I build clean websites for <span className="text-glow">small businesses</span> and personal brands.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Portfolio websites, business websites, landing pages, and simple online stores.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="magnetic-cta inline-flex items-center justify-center gap-2 rounded-md bg-teal-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-teal-200"
              >
                Hire Me
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#work"
                className="ghost-cta inline-flex items-center justify-center gap-2 rounded-md border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/5"
              >
                View Work
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-10 grid max-w-2xl gap-3 text-sm text-slate-300 sm:grid-cols-3">
              {["Mobile-friendly", "Clear communication", "Simple client process"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-teal-300" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal-up hero-visual">
            <div className="hero-image-card overflow-hidden rounded-lg border border-white/10 bg-slate-900 shadow-2xl shadow-black/40">
              <Image
                src="/portfolio/developer-workspace.png"
                alt="Professional web development workspace"
                width={1200}
                height={900}
                priority
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="mt-4 rounded-lg border border-white/10 bg-slate-950 p-5 shadow-xl shadow-black/20">
              <div className="flex items-start gap-3">
                <Code2 className="mt-1 h-5 w-5 shrink-0 text-teal-300" />
                <div>
                  <p className="text-sm font-semibold text-white">Ready for first client projects</p>
                  <p className="mt-1 text-sm leading-6 text-slate-300">
                    Websites that look professional, load well, and make it easy for customers to reach you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-6xl px-5 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-300">About</p>
            <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">A serious start, built on clean work.</h2>
          </div>
          <div className="space-y-5 text-base leading-8 text-slate-300">
            <p>
              I create modern, mobile-friendly websites for small businesses, freelancers, and personal brands that need
              a trustworthy online presence without overcomplicating the process.
            </p>
            <p>
              I am early in my freelance journey, so I focus on the things that matter most: clean design, clear content,
              responsive layouts, honest communication, and websites that are easy to understand and update.
            </p>
          </div>
        </div>
      </section>

      <section id="services" className="border-y border-white/10 bg-slate-950/55 px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Services"
            title="Websites that help people trust your business."
            description="Simple, polished website services for clients who need a clear online presence and a direct path to enquiries."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {services.map((service, index) => (
              <article
                key={service.title}
                className="polish-card reveal-card rounded-lg border border-white/10 bg-white/[0.035] p-5"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <service.icon className="h-6 w-6 text-teal-300" />
                <h3 className="mt-5 text-lg font-semibold text-white">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="work" className="mx-auto max-w-6xl px-5 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Portfolio"
          title="Selected work and project concepts."
          description="A growing collection of practical website projects, built to show layout, structure, and business-focused thinking."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {projects.map((project, index) => (
            <article
              key={project.title}
              className="polish-card reveal-card rounded-lg border border-white/10 bg-slate-950 p-5"
              style={{ animationDelay: `${index * 110}ms` }}
            >
              <ProjectPreview image={project.image} palette={project.palette} title={project.category} />
              <div className="mt-6 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                  <p className="mt-1 text-sm text-teal-200">{project.category}</p>
                </div>
                <span className="rounded-md border border-white/10 px-2.5 py-1 text-xs font-medium text-slate-300">
                  {project.status}
                </span>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-300">{project.description}</p>
              {project.url ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="ghost-cta mt-5 inline-flex items-center gap-2 rounded-md border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-teal-300/40 hover:bg-white/5"
                >
                  View Project
                  <ExternalLink className="h-4 w-4" />
                </a>
              ) : (
                <a
                  href="#contact"
                  className="ghost-cta mt-5 inline-flex items-center gap-2 rounded-md border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-teal-300/40 hover:bg-white/5"
                >
                  Start Yours
                  <ArrowRight className="h-4 w-4" />
                </a>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 rounded-lg border border-white/10 bg-slate-950 p-6 sm:p-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-300">What you get</p>
            <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">A practical website package.</h2>
            <p className="mt-5 text-base leading-8 text-slate-300">
              The focus is not just making a page look nice. The goal is to give your business a clear online presence
              that feels credible and makes contacting you easy.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {deliverables.map((item) => (
              <div key={item} className="flex gap-3 rounded-md border border-white/10 bg-white/[0.03] p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-300" />
                <p className="text-sm leading-6 text-slate-300">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="border-y border-white/10 bg-slate-950/55 px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Process"
            title="A simple way to get your website done."
            description="The process is clear and lightweight, so small business owners can move from idea to website without confusion."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <article
                key={step.title}
                className="polish-card reveal-card rounded-lg border border-white/10 bg-[#0b1218] p-6"
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <div className="flex items-center justify-between gap-4">
                  <step.icon className="h-6 w-6 text-teal-300" />
                  <span className="text-sm font-semibold text-slate-500">0{index + 1}</span>
                </div>
                <h3 className="mt-6 text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-300">Best fit</p>
            <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Built for simple, real business needs.</h2>
            <p className="mt-5 text-base leading-8 text-slate-300">
              This is ideal when you need a professional online presence, clear information, and easy contact options
              without a complicated or expensive system.
            </p>
          </div>
          <div className="grid gap-3">
            {clientFit.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-lg border border-white/10 bg-slate-950 p-4">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-teal-300" />
                <p className="text-sm leading-6 text-slate-300">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="border-y border-white/10 bg-slate-950/55 px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Pricing"
            title="Starter pricing for first client projects."
            description="Clear, beginner-friendly pricing for simple websites. Final cost depends on pages, content, features, and delivery time."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {pricing.map((plan, index) => (
              <article
                key={plan.name}
                className="polish-card reveal-card rounded-lg border border-white/10 bg-[#0b1218] p-6"
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                <p className="mt-4 text-2xl font-semibold text-teal-200">{plan.price}</p>
                <p className="mt-4 text-sm leading-6 text-slate-300">{plan.details}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-300">Questions</p>
            <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Before you send a message.</h2>
            <p className="mt-5 text-base leading-8 text-slate-300">
              A few quick answers that help local business owners understand what this service is best for.
            </p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <article key={faq.question} className="rounded-lg border border-white/10 bg-slate-950 p-5">
                <h3 className="text-base font-semibold text-white">{faq.question}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-6xl px-5 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-300">Contact</p>
            <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Let us discuss your website.</h2>
            <p className="mt-5 text-base leading-8 text-slate-300">
              Tell me what you need, what your business does, and what pages you want. I will reply with a simple next
              step and a clear estimate.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://wa.me/917889410756"
                className="magnetic-cta inline-flex items-center justify-center gap-2 rounded-md bg-teal-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-teal-200"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
              <a
                href="mailto:shillanshafihilal119@gmail.com"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/5"
              >
                <Mail className="h-4 w-4" />
                shillanshafihilal119@gmail.com
              </a>
            </div>
            <div className="mt-6 grid gap-3 text-sm text-slate-300">
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-teal-300" />
                +91 78894 10756
              </p>
              <p className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-teal-300" />
                Send your business name, pages needed, and deadline for a faster estimate.
              </p>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>

      <footer className="border-t border-white/10 px-5 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright 2026 KASH STUDIOS. Freelance web developer.</p>
          <p>Clean websites for small businesses and personal brands.</p>
        </div>
      </footer>
      <a
        href="https://wa.me/917889410756"
        className="magnetic-cta fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-md bg-teal-300 px-4 py-3 text-sm font-semibold text-slate-950 shadow-2xl shadow-black/40 transition hover:-translate-y-0.5 hover:bg-teal-200 md:hidden"
      >
        <MessageCircle className="h-4 w-4" />
        WhatsApp
      </a>
    </main>
  );
}
