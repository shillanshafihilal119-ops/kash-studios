const floaters = [
  { label: "</>", className: "left-[8%] top-[18%] text-teal-300", delay: "0s" },
  { label: "{ }", className: "right-[14%] top-[20%] text-slate-400", delay: "1.4s" },
  { label: "API", className: "left-[18%] bottom-[18%] text-cyan-200", delay: "2.2s" },
  { label: "DB", className: "right-[22%] bottom-[16%] text-teal-200", delay: "0.8s" },
  { label: "/_", className: "left-[42%] top-[12%] text-slate-500", delay: "2.8s" },
  { label: "UI", className: "right-[7%] bottom-[34%] text-teal-300", delay: "1.9s" },
  { label: "SEO", className: "left-[4%] bottom-[42%] text-slate-400", delay: "3.1s" },
  { label: "01", className: "right-[42%] top-[28%] text-cyan-200", delay: "0.4s" },
  { label: "CSS", className: "left-[28%] top-[32%] text-teal-200", delay: "3.7s" },
  { label: "JS", className: "right-[32%] bottom-[38%] text-slate-400", delay: "4.2s" },
  { label: "UX", className: "left-[56%] bottom-[12%] text-cyan-200", delay: "1.1s" },
  { label: "404", className: "right-[4%] top-[48%] text-slate-500", delay: "2.6s" }
];

export function TechFloaters() {
  return (
    <div className="tech-floaters absolute inset-0 overflow-hidden" aria-hidden="true">
      {floaters.map((floater) => (
        <span
          key={`${floater.label}-${floater.className}`}
          className={`tech-floater absolute ${floater.className}`}
          style={{ animationDelay: floater.delay }}
        >
          {floater.label}
        </span>
      ))}
    </div>
  );
}
