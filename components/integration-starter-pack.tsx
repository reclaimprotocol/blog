const baggage = [
  { label: "WebView", className: "starter-piece-webview" },
  { label: "Native crypto", className: "starter-piece-crypto" },
  { label: "Proof engine", className: "starter-piece-proof" },
  { label: "Platform glue", className: "starter-piece-glue" },
];

export function IntegrationStarterPack() {
  return (
    <section
      aria-label="Before Popcorn, an integrating app carried a WebView, native cryptography, a proof engine, and platform glue. With Popcorn, the integration becomes one verification URL."
      className="not-prose my-10 overflow-hidden rounded-[28px] border border-zinc-200/80 bg-zinc-950 p-5 text-white shadow-[0_24px_80px_-48px_rgba(0,0,0,0.9)] dark:border-white/10 sm:p-8"
    >
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#69a7ff]">
            The integration starter pack
          </span>
          <h3 className="mb-0 mt-2 text-2xl font-bold tracking-tight">
            Some assembly no longer required.
          </h3>
        </div>
        <span className="text-xs text-zinc-500">same proof · less inside the app</span>
      </div>

      <div className="starter-pack mt-8 grid items-center gap-7 md:grid-cols-[1fr_auto_1fr]">
        <div>
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-amber-300">
            Before · ship the machinery
          </span>
          <div className="relative mt-4 h-52" aria-hidden="true">
            <div className="absolute bottom-0 left-1/2 h-44 w-28 -translate-x-1/2 rounded-[1.8rem] border-[5px] border-zinc-700 bg-zinc-900 shadow-[0_22px_45px_-24px_rgba(0,0,0,0.9)]">
              <span className="absolute left-1/2 top-2 h-2 w-10 -translate-x-1/2 rounded-full bg-zinc-700" />
              <span className="absolute inset-x-3 bottom-4 top-7 rounded-xl border border-white/5 bg-white/[0.035]" />
            </div>
            {baggage.map((piece) => (
              <span
                className={`starter-piece ${piece.className} absolute left-1/2 whitespace-nowrap rounded-lg border border-amber-300/25 bg-amber-300 px-3 py-2 font-mono text-[9px] font-bold text-zinc-950 shadow-lg`}
                key={piece.label}
              >
                {piece.label}
              </span>
            ))}
          </div>
        </div>

        <div className="starter-transfer relative mx-auto h-12 w-20 md:h-20 md:w-16" aria-hidden="true">
          <span className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-amber-300/20 via-[#1275f7] to-[#1275f7]/20 md:bottom-0 md:left-1/2 md:top-0 md:h-auto md:w-px md:-translate-x-1/2 md:translate-y-0 md:bg-gradient-to-b" />
          <span className="starter-kernel absolute left-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded-[55%_45%_58%_42%] bg-[#1275f7] shadow-[-3px_1px_0_-1px_#1275f7,3px_1px_0_-1px_#1275f7,0_-3px_0_-1px_#1275f7] md:left-1/2 md:top-0 md:-translate-x-1/2 md:translate-y-0" />
        </div>

        <div>
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[#69a7ff]">
            With Popcorn · open the flow
          </span>
          <div className="starter-url mt-4 flex h-52 flex-col justify-center">
            <div className="rounded-2xl border border-[#1275f7]/35 bg-[#1275f7]/[0.08] p-3 shadow-[0_20px_55px_-34px_rgba(18,117,247,0.9)]">
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-zinc-900 px-3 py-3">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-400" />
                <span className="min-w-0 flex-1 truncate font-mono text-[10px] text-zinc-300">
                  https://…/verify
                </span>
                <span className="rounded-md bg-[#1275f7] px-2 py-1 text-[8px] font-bold uppercase tracking-wide text-white">
                  Open
                </span>
              </div>
              <div className="mt-3 grid grid-cols-[1fr_auto] items-center gap-3 px-1 py-2">
                <div>
                  <strong className="block text-sm">One verification URL</strong>
                  <span className="mt-1 block text-[10px] text-zinc-500">
                    The browser and proof workload run remotely.
                  </span>
                </div>
                <span className="starter-pop text-2xl" aria-hidden="true">🍿</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .starter-pack .starter-piece { transform-origin: center; animation: starter-piece 7s ease-in-out infinite; }
        .starter-pack .starter-piece-webview { top: 1rem; margin-left: -6.6rem; transform: rotate(-7deg); }
        .starter-pack .starter-piece-crypto { top: 3.7rem; margin-left: -.2rem; transform: rotate(6deg); animation-delay: -.5s; }
        .starter-pack .starter-piece-proof { top: 6.5rem; margin-left: -7.2rem; transform: rotate(4deg); animation-delay: -1s; }
        .starter-pack .starter-piece-glue { top: 9.3rem; margin-left: -.5rem; transform: rotate(-5deg); animation-delay: -1.5s; }
        .starter-pack .starter-kernel { animation: starter-kernel-x 7s cubic-bezier(.3,.8,.3,1) infinite; }
        .starter-pack .starter-url { animation: starter-url 7s ease-in-out infinite; }
        .starter-pack .starter-pop { display: inline-block; animation: starter-pop 7s ease-in-out infinite; }
        @keyframes starter-piece { 0%, 100% { translate: 0 0; } 45% { translate: 0 -3px; } 55% { translate: 0 2px; } }
        @keyframes starter-kernel-x { 0%, 12% { left: 0; opacity: 0; rotate: -10deg; scale: .55; } 25% { opacity: 1; } 65% { left: calc(100% - .75rem); opacity: 1; rotate: 180deg; scale: 1; } 76%, 100% { left: calc(100% - .75rem); opacity: 0; rotate: 220deg; scale: .45; } }
        @keyframes starter-url { 0%, 55%, 100% { transform: scale(1); } 67%, 78% { transform: scale(1.015); } }
        @keyframes starter-pop { 0%, 60%, 100% { transform: rotate(-5deg) scale(1); } 68% { transform: rotate(8deg) scale(1.18); } 76% { transform: rotate(-4deg) scale(1); } }
        @media (min-width: 768px) {
          .starter-pack .starter-kernel { animation-name: starter-kernel-y; }
          @keyframes starter-kernel-y { 0%, 12% { top: 0; opacity: 0; rotate: -10deg; scale: .55; } 25% { opacity: 1; } 65% { top: calc(100% - .75rem); opacity: 1; rotate: 180deg; scale: 1; } 76%, 100% { top: calc(100% - .75rem); opacity: 0; rotate: 220deg; scale: .45; } }
        }
        @media (prefers-reduced-motion: reduce) {
          .starter-pack * { animation: none !important; }
          .starter-pack .starter-kernel { left: calc(50% - .375rem); opacity: 1; }
        }
      `}</style>
    </section>
  );
}
