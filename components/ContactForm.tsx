"use client";

import { ArrowRight, CheckCircle2, Loader2, X } from "lucide-react";
import { FormEvent, useState } from "react";

const projectTypes = [
  "Business Website",
  "Landing Page",
  "Portfolio Website",
  "Website Redesign",
  "Custom Project"
];

function formatPhoneInput(value: string) {
  const trimmed = value.trim();
  const hasLeadingPlus = trimmed.startsWith("+");
  const digits = trimmed.replace(/\D/g, "").slice(0, 15);

  return hasLeadingPlus ? `+${digits}` : digits;
}

export function ContactForm() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [projectType, setProjectType] = useState(projectTypes[0]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const phone = formatPhoneInput(contact);

    if (phone.replace(/\D/g, "").length < 7) {
      setStatus("error");
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch("/api/contact-messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          contact: phone,
          projectType,
          message
        })
      });

      if (!response.ok) {
        throw new Error("Message failed");
      }

      setName("");
      setContact("");
      setProjectType(projectTypes[0]);
      setMessage("");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="rounded-lg border border-white/10 bg-slate-950 p-5 sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-slate-200">Name</span>
            <input
              type="text"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your name"
              className="mt-2 w-full rounded-md border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-teal-300"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-200">Phone number</span>
            <input
              type="tel"
              required
              value={contact}
              onChange={(event) => setContact(formatPhoneInput(event.target.value))}
              inputMode="tel"
              pattern="^\+?[0-9]{7,15}$"
              title="Enter a valid phone number using digits only. You can add + for country code."
              placeholder="+91 78894 10756"
              className="mt-2 w-full rounded-md border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-teal-300"
            />
          </label>
        </div>
        <label className="mt-4 block">
          <span className="text-sm font-medium text-slate-200">Project type</span>
          <select
            value={projectType}
            onChange={(event) => setProjectType(event.target.value)}
            className="mt-2 w-full rounded-md border border-white/10 bg-[#0f1720] px-4 py-3 text-sm text-white outline-none transition focus:border-teal-300"
          >
            {projectTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </label>
        <label className="mt-4 block">
          <span className="text-sm font-medium text-slate-200">Message</span>
          <textarea
            rows={5}
            required
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Tell me about your business and what you need."
            className="mt-2 w-full resize-none rounded-md border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-teal-300"
          />
        </label>
        <button
          type="submit"
          disabled={status === "sending"}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "sending" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Send Message
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
        {status === "error" ? (
          <p className="mt-3 text-xs leading-5 text-red-300">
            Message could not be saved. Please check the phone number or use WhatsApp directly.
          </p>
        ) : null}
        <p className="mt-3 text-xs leading-5 text-slate-500">Your message is saved privately for KASH STUDIOS.</p>
      </form>

      {status === "success" ? (
        <div className="fixed inset-0 z-[90] grid place-items-center bg-black/65 px-5 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="message-success-title"
            className="success-pop relative w-full max-w-md rounded-lg border border-teal-300/25 bg-[#08111a] p-6 text-center shadow-2xl shadow-teal-950/30"
          >
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="absolute right-4 top-4 rounded-md border border-white/10 p-2 text-slate-300 transition hover:bg-white/5 hover:text-white"
              aria-label="Close message sent popup"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="success-ring mx-auto grid h-16 w-16 place-items-center rounded-full bg-teal-300/10 text-teal-300">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 id="message-success-title" className="mt-5 text-2xl font-semibold text-white">
              Message sent
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Your details were saved successfully. I will check your request and reply as soon as possible.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="magnetic-cta mt-6 inline-flex w-full items-center justify-center rounded-md bg-teal-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-teal-200"
            >
              Done
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
