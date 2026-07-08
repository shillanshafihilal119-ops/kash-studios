import { TechFloaters } from "@/components/TechFloaters";

export function LoadingScreen() {
  return (
    <div
      data-loading-screen="true"
      className="loading-screen fixed inset-0 z-[100] grid place-items-center bg-[#05090d]"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.12),transparent_28rem)]" />
      <TechFloaters />
      <div className="relative mx-auto flex w-full max-w-xl flex-col items-center px-6 text-center">
        <div className="loader-mark mb-7 grid h-16 w-16 place-items-center rounded-lg border border-teal-300/25 bg-teal-300/10 text-2xl font-bold text-teal-200 shadow-2xl shadow-teal-950/40">
          K
        </div>
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-teal-300">KASH STUDIOS</p>
        <h2 className="mt-4 text-4xl font-semibold tracking-normal text-white sm:text-6xl">Web Portfolio</h2>
        <p className="mt-4 text-sm uppercase tracking-[0.35em] text-slate-500">Loading</p>
        <div className="mt-6 h-1.5 w-full max-w-sm overflow-hidden rounded-full border border-white/10 bg-white/5">
          <div className="loader-progress h-full rounded-full bg-teal-300" />
        </div>
      </div>
    </div>
  );
}
