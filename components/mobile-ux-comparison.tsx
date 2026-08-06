function PhoneFrame({
  children,
  label,
  improved = false,
}: {
  children: React.ReactNode;
  label: string;
  improved?: boolean;
}) {
  return (
    <div className="flex min-w-0 flex-col items-center">
      <span
        className={`mb-3 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] ${
          improved
            ? "bg-[#1275f7] text-white"
            : "border border-amber-400/30 bg-amber-400/10 text-amber-300"
        }`}
      >
        {label}
      </span>
      <div
        className={`relative w-[10.5rem] rounded-[2.2rem] border-[6px] p-1 shadow-[0_24px_55px_-28px_rgba(0,0,0,0.8)] sm:w-[11.5rem] ${
          improved
            ? "border-zinc-100 bg-zinc-100"
            : "border-zinc-700 bg-zinc-700"
        }`}
      >
        <span
          className={`absolute left-1/2 top-1.5 z-30 h-3 w-14 -translate-x-1/2 rounded-full ${
            improved ? "bg-zinc-100" : "bg-zinc-700"
          }`}
        />
        <div className="relative isolate aspect-[9/15] overflow-hidden rounded-[1.55rem] bg-white text-zinc-900 [clip-path:inset(0_round_1.55rem)]">
          <div className="absolute inset-x-0 top-0 z-20 flex h-7 items-end justify-between bg-white/90 px-3 pb-1 text-[6px] font-bold backdrop-blur">
            <span>9:41</span>
            <span>{improved ? "Popcorn · secure" : "Remote view"}</span>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

function KeyboardKeys() {
  return (
    <div className="absolute inset-x-0 bottom-0 grid h-[38%] grid-cols-6 gap-1 bg-zinc-700 p-2 pt-4">
      {Array.from({ length: 24 }).map((_, index) => (
        <span className="rounded-sm bg-zinc-500" key={index} />
      ))}
    </div>
  );
}

export function MobileLiveViewComparison() {
  return (
    <section className="not-prose my-10 overflow-hidden rounded-[28px] border border-white/10 bg-zinc-950 p-5 text-white shadow-[0_24px_80px_-48px_rgba(0,0,0,0.9)] sm:p-8">
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline">
        <h3 className="m-0 text-2xl font-bold tracking-tight">Same phone. Different browser.</h3>
        <span className="text-sm text-zinc-500">from remote desktop to native-feeling</span>
      </div>

      <div
        aria-label="Animated before-and-after comparisons of mobile typing, pinch and fit-to-width rendering, and completing forms in Popcorn"
        className="mobile-ux-compare mt-7 space-y-10"
      >
        <article>
          <div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#69a7ff]">01 · Type</span>
              <h4 className="mb-0 mt-2 text-xl font-bold">Typing should feel immediate</h4>
            </div>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div className="relative bg-gradient-to-b from-amber-400/[0.045] to-transparent px-3 py-4">
              <PhoneFrame label="Before">
                <div className="absolute inset-0 pt-7">
                  <div className="px-3 pt-6">
                    <div className="text-[8px] font-bold">Enter verification code</div>
                    <div className="mt-4 flex h-9 items-center justify-center gap-2 rounded-lg border-2 border-amber-400 bg-amber-50 font-mono text-sm font-black">
                      <span>8</span><span>4</span><span className="ux-old-digit text-red-500">?</span><span>9</span>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-[7px] font-bold text-zinc-500">
                      <span>delayed input</span>
                      <span className="ux-old-signal text-red-500">waiting…</span>
                    </div>
                    <div className="relative mt-2 h-1.5 overflow-hidden rounded-full bg-zinc-200">
                      <span className="ux-old-key-packet absolute inset-y-0 left-0 w-8 rounded-full bg-red-400" />
                    </div>
                  </div>
                  <KeyboardKeys />
                </div>
              </PhoneFrame>
              <span className="mt-3 block text-center text-[10px] text-zinc-500">keys can arrive late or incorrectly</span>
            </div>

            <div className="relative bg-gradient-to-b from-[#1275f7]/[0.08] to-transparent px-3 py-4">
              <PhoneFrame improved label="Now">
                <div className="absolute inset-0 pt-7">
                  <div className="px-3 pt-6">
                    <div className="text-[8px] font-bold">Enter verification code</div>
                    <div className="mt-4 flex h-9 items-center justify-center gap-2 rounded-lg border-2 border-[#1275f7] bg-blue-50 font-mono text-sm font-black shadow-[0_0_0_3px_rgba(18,117,247,0.12)]">
                      <span className="ux-new-digit ux-new-digit-1">8</span>
                      <span className="ux-new-digit ux-new-digit-2">4</span>
                      <span className="ux-new-digit ux-new-digit-3">2</span>
                      <span className="ux-new-digit ux-new-digit-4">9</span>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-[7px] font-bold">
                      <span className="text-[#1275f7]">instant feedback</span>
                      <span className="ux-queue-state text-emerald-600">connected</span>
                    </div>
                    <span className="ux-reconnect-queue mt-2 block rounded bg-blue-100 px-1.5 py-1 text-center text-[6px] font-bold text-blue-700">stays responsive on a slow network</span>
                  </div>
                  <KeyboardKeys />
                </div>
              </PhoneFrame>
              <span className="mt-3 block text-center text-[10px] text-[#69a7ff]">types like a local keyboard</span>
            </div>
          </div>

        </article>

        <article className="border-t border-white/10 pt-9">
          <div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#69a7ff]">02 · Pinch and zoom</span>
              <h4 className="mb-0 mt-2 text-xl font-bold">The page should follow your fingers</h4>
            </div>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div className="bg-gradient-to-b from-amber-400/[0.045] to-transparent px-3 py-4">
              <PhoneFrame label="Before">
                <div className="absolute inset-0 overflow-hidden pt-7">
                  <div className="ux-old-wide-page h-full w-[165%] bg-zinc-50 px-3 pt-6">
                    <div className="h-2.5 w-32 rounded bg-zinc-800 blur-[0.5px]" />
                    <div className="mt-2 h-1.5 w-48 rounded bg-zinc-300 blur-[0.5px]" />
                    <div className="mt-1 h-1.5 w-40 rounded bg-zinc-300 blur-[0.5px]" />
                    <div className="mt-5 grid w-48 grid-cols-2 gap-2 opacity-80 blur-[0.45px]">
                      <div className="h-20 rounded-lg bg-amber-100" />
                      <div className="space-y-2"><div className="h-2 rounded bg-zinc-300" /><div className="h-2 rounded bg-zinc-300" /><div className="h-7 rounded bg-zinc-500" /></div>
                    </div>
                  </div>
                  <span className="absolute inset-y-7 right-0 w-1 bg-red-400/70" />
                  <span className="ux-old-finger ux-old-finger-left absolute left-[40%] top-[58%] h-6 w-6 rounded-full border-2 border-amber-500 bg-amber-100/80" />
                  <span className="ux-old-finger ux-old-finger-right absolute right-[40%] top-[58%] h-6 w-6 rounded-full border-2 border-amber-500 bg-amber-100/80" />
                  <span className="absolute bottom-4 right-2 rounded bg-red-500 px-2 py-1 text-[7px] font-black text-white">cropped</span>
                </div>
              </PhoneFrame>
              <span className="mt-3 block text-center text-[10px] text-zinc-500">cropped, blurry, and delayed</span>
            </div>

            <div className="bg-gradient-to-b from-[#1275f7]/[0.08] to-transparent px-3 py-4">
              <PhoneFrame improved label="Now">
                <div className="absolute inset-0 overflow-hidden pt-7">
                  <div className="ux-new-wide-page h-full bg-zinc-50 px-3 pt-6">
                    <div className="h-2.5 w-28 rounded bg-zinc-800" />
                    <div className="mt-2 h-1.5 w-full rounded bg-zinc-300" />
                    <div className="mt-1 h-1.5 w-4/5 rounded bg-zinc-300" />
                    <div className="mt-5 grid grid-cols-2 gap-2">
                      <div className="h-20 rounded-lg bg-blue-100" />
                      <div className="space-y-2"><div className="h-2 rounded bg-zinc-300" /><div className="h-2 rounded bg-zinc-300" /><div className="h-7 rounded bg-[#1275f7]" /></div>
                    </div>
                  </div>
                  <span className="ux-new-finger ux-new-finger-left absolute left-[40%] top-[58%] h-6 w-6 rounded-full border-2 border-[#1275f7] bg-blue-100/80" />
                  <span className="ux-new-finger ux-new-finger-right absolute right-[40%] top-[58%] h-6 w-6 rounded-full border-2 border-[#1275f7] bg-blue-100/80" />
                  <span className="absolute bottom-4 right-2 rounded bg-emerald-500 px-2 py-1 text-[7px] font-black text-white">full width</span>
                </div>
              </PhoneFrame>
              <span className="mt-3 block text-center text-[10px] text-[#69a7ff]">smooth zoom handled on the phone</span>
            </div>
          </div>

        </article>

        <article className="border-t border-white/10 pt-9">
          <div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#69a7ff]">03 · Use the page</span>
              <h4 className="mb-0 mt-2 text-xl font-bold">Controls should fit the phone</h4>
            </div>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div className="bg-gradient-to-b from-amber-400/[0.045] to-transparent px-3 py-4">
              <PhoneFrame label="Before">
                <div className="absolute inset-0 pt-7">
                  <div className="px-3 pt-6">
                    <div className="text-[8px] font-bold">Verify your account</div>
                    <div className="h-24" />
                    <div className="rounded-lg border-2 border-amber-400 bg-amber-50 px-2 py-2 text-[8px]">Focused field</div>
                  </div>
                  <div className="ux-old-form-dialog absolute left-[38%] top-[36%] z-20 w-[9rem] rounded-lg border border-zinc-300 bg-white p-3 shadow-xl">
                    <div className="text-[8px] font-bold">Are you sure?</div>
                    <div className="mt-2 h-5 w-20 rounded bg-zinc-200" />
                  </div>
                  <div className="ux-form-keyboard absolute inset-x-0 bottom-0 grid h-[44%] grid-cols-6 gap-1 bg-zinc-700 p-2 pt-4">
                    {Array.from({ length: 24 }).map((_, index) => <span className="rounded-sm bg-zinc-500" key={index} />)}
                  </div>
                  <span className="ux-old-form-warning absolute bottom-[38%] left-1/2 z-30 -translate-x-1/2 whitespace-nowrap rounded bg-red-500 px-2 py-1 text-[7px] font-black text-white">field hidden</span>
                </div>
              </PhoneFrame>
              <span className="mt-3 block text-center text-[10px] text-zinc-500">fields and prompts can leave the screen</span>
            </div>

            <div className="bg-gradient-to-b from-[#1275f7]/[0.08] to-transparent px-3 py-4">
              <PhoneFrame improved label="Now">
                <div className="absolute inset-0 pt-7">
                  <div className="px-3 pt-6">
                    <div className="text-[8px] font-bold">Verify your account</div>
                    <div className="h-24" />
                    <div className="ux-new-form-field rounded-lg border-2 border-[#1275f7] bg-blue-50 px-2 py-2 text-[8px] shadow-[0_0_0_3px_rgba(18,117,247,0.12)]">Focused field</div>
                  </div>
                  <div className="ux-form-keyboard absolute inset-x-0 bottom-0 grid h-[44%] grid-cols-6 gap-1 bg-zinc-700 p-2 pt-4">
                    {Array.from({ length: 24 }).map((_, index) => <span className="rounded-sm bg-zinc-500" key={index} />)}
                  </div>
                  <div className="ux-new-form-sheet absolute inset-x-0 bottom-0 z-30 rounded-t-2xl border-t border-white/20 bg-zinc-900/95 p-3 text-white shadow-2xl backdrop-blur">
                    <div className="text-[8px] font-bold">Are you sure?</div>
                    <div className="mt-2 flex justify-end gap-2"><span className="rounded bg-white/10 px-2 py-1 text-[7px]">Cancel</span><span className="rounded bg-[#1275f7] px-2 py-1 text-[7px] font-bold">Continue</span></div>
                  </div>
                </div>
              </PhoneFrame>
              <span className="mt-3 block text-center text-[10px] text-[#69a7ff]">forms behave like mobile controls</span>
            </div>
          </div>

        </article>

        <article className="border-t border-white/10 pt-9">
          <div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#69a7ff]">04 · Switch apps</span>
              <h4 className="mb-0 mt-2 text-xl font-bold">Come back where you left off</h4>
            </div>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div className="bg-gradient-to-b from-amber-400/[0.045] to-transparent px-3 py-4">
              <PhoneFrame label="Before">
                <div className="absolute inset-0 bg-zinc-50 pt-7">
                  <div className="px-3 pt-6">
                    <div className="text-[8px] font-bold">Verification in progress</div>
                    <div className="mt-4 h-8 rounded-lg border-2 border-amber-400 bg-amber-50" />
                    <div className="mt-2 h-6 rounded-lg bg-zinc-500" />
                  </div>
                  <div className="ux-old-app-switch absolute inset-0 z-20 bg-gradient-to-b from-emerald-500 to-emerald-700 px-4 pt-12 text-white">
                    <div className="text-[8px] font-bold uppercase tracking-widest text-emerald-100">Messages</div>
                    <div className="mt-5 rounded-2xl bg-white/15 p-3 backdrop-blur">
                      <div className="text-[7px]">Your verification code is</div>
                      <div className="mt-1 text-xl font-black tracking-[0.2em]">8429</div>
                    </div>
                  </div>
                  <div className="ux-old-return absolute inset-0 z-30 flex flex-col items-center justify-center bg-zinc-950 text-white">
                    <span className="h-7 w-7 rounded-full border-2 border-zinc-600 border-t-red-400" />
                    <span className="mt-3 text-[8px] font-bold text-red-300">stale viewer</span>
                  </div>
                </div>
              </PhoneFrame>
              <span className="mt-3 block text-center text-[10px] text-zinc-500">return to a black frame</span>
            </div>

            <div className="bg-gradient-to-b from-[#1275f7]/[0.08] to-transparent px-3 py-4">
              <PhoneFrame improved label="Now">
                <div className="absolute inset-0 bg-zinc-50 pt-7">
                  <div className="px-3 pt-6">
                    <div className="text-[8px] font-bold">Verification in progress</div>
                    <div className="mt-4 flex h-8 items-center justify-center gap-2 rounded-lg border-2 border-[#1275f7] bg-blue-50 font-mono text-xs font-black">
                      <span className="ux-return-code">8429</span>
                    </div>
                    <div className="mt-2 h-6 rounded-lg bg-[#1275f7]" />
                  </div>
                  <div className="ux-new-app-switch absolute inset-0 z-20 bg-gradient-to-b from-emerald-500 to-emerald-700 px-4 pt-12 text-white">
                    <div className="text-[8px] font-bold uppercase tracking-widest text-emerald-100">Messages</div>
                    <div className="mt-5 rounded-2xl bg-white/15 p-3 backdrop-blur">
                      <div className="text-[7px]">Your verification code is</div>
                      <div className="mt-1 text-xl font-black tracking-[0.2em]">8429</div>
                    </div>
                  </div>
                  <div className="ux-reconnect-badge absolute inset-x-3 bottom-4 z-30 rounded-lg bg-emerald-500 px-2 py-2 text-center text-[7px] font-black text-white shadow-lg">back where you left off</div>
                </div>
              </PhoneFrame>
              <span className="mt-3 block text-center text-[10px] text-[#69a7ff]">the session stays with you</span>
            </div>
          </div>

        </article>

      </div>

      <style>{`
        .mobile-ux-compare .ux-old-digit { animation: ux-old-digit 5s ease-in-out infinite; }
        .mobile-ux-compare .ux-old-signal { animation: ux-old-signal 5s ease-in-out infinite; }
        .mobile-ux-compare .ux-old-key-packet { animation: ux-old-key-packet 5s ease-in-out infinite; }
        .mobile-ux-compare .ux-new-digit { opacity: 0; animation: ux-new-digit 5s ease-in-out infinite; }
        .mobile-ux-compare .ux-new-digit-2 { animation-delay: .12s; }
        .mobile-ux-compare .ux-new-digit-3 { animation-delay: .24s; }
        .mobile-ux-compare .ux-new-digit-4 { animation-delay: .36s; }
        .mobile-ux-compare .ux-queue-state { animation: ux-queue-state 5s ease-in-out infinite; }
        .mobile-ux-compare .ux-reconnect-queue { animation: ux-reconnect-queue 5s ease-in-out infinite; }
        .mobile-ux-compare .ux-old-wide-page { transform-origin: 40% 45%; animation: ux-old-wide-page 6s ease-in-out infinite; }
        .mobile-ux-compare .ux-new-wide-page { transform-origin: 45% 45%; animation: ux-new-wide-page 6s ease-in-out infinite; }
        .mobile-ux-compare .ux-old-finger-left { animation: ux-old-finger-left 6s ease-in-out infinite; }
        .mobile-ux-compare .ux-old-finger-right { animation: ux-old-finger-right 6s ease-in-out infinite; }
        .mobile-ux-compare .ux-new-finger-left { animation: ux-new-finger-left 6s ease-in-out infinite; }
        .mobile-ux-compare .ux-new-finger-right { animation: ux-new-finger-right 6s ease-in-out infinite; }
        .mobile-ux-compare .ux-form-keyboard { animation: ux-form-keyboard 7s ease-in-out infinite; }
        .mobile-ux-compare .ux-old-form-dialog { animation: ux-old-form-dialog 7s ease-in-out infinite; }
        .mobile-ux-compare .ux-old-form-warning { animation: ux-old-form-warning 7s ease-in-out infinite; }
        .mobile-ux-compare .ux-new-form-field { animation: ux-new-form-field 7s ease-in-out infinite; }
        .mobile-ux-compare .ux-new-form-sheet { animation: ux-new-form-sheet 7s ease-in-out infinite; }
        .mobile-ux-compare .ux-old-app-switch,
        .mobile-ux-compare .ux-new-app-switch { animation: ux-app-switch 8s ease-in-out infinite; }
        .mobile-ux-compare .ux-old-return { animation: ux-old-return 8s ease-in-out infinite; }
        .mobile-ux-compare .ux-reconnect-badge { animation: ux-reconnect-badge 8s ease-in-out infinite; }
        .mobile-ux-compare .ux-return-code { animation: ux-return-code 8s ease-in-out infinite; }
        @keyframes ux-old-digit { 0%, 22% { opacity: 0; } 35%, 52% { opacity: 1; } 60%, 74% { opacity: .15; } 82%, 100% { opacity: 1; } }
        @keyframes ux-old-signal { 0%, 22% { color: #71717a; } 35%, 72% { color: #ef4444; } 84%, 100% { color: #71717a; } }
        @keyframes ux-old-key-packet { 0%, 18% { left: 0; opacity: 0; } 28% { opacity: 1; } 48%, 68% { left: 48%; opacity: 1; } 84%, 100% { left: 90%; opacity: 0; } }
        @keyframes ux-new-digit { 0%, 15% { opacity: 0; transform: translateY(5px); } 30%, 88% { opacity: 1; transform: translateY(0); } 100% { opacity: 0; } }
        @keyframes ux-queue-state { 0%, 28%, 100% { color: #059669; } 40%, 62% { color: #d97706; } }
        @keyframes ux-reconnect-queue { 0%, 30%, 68%, 100% { opacity: 0; transform: translateY(3px); } 40%, 58% { opacity: 1; transform: translateY(0); } }
        @keyframes ux-old-wide-page { 0%, 34% { transform: scale(1) translate(0); } 52%, 68% { transform: scale(1) translate(0); } 82%, 92% { transform: scale(1.2) translate(-5px, 4px); } 100% { transform: scale(1); } }
        @keyframes ux-new-wide-page { 0%, 30% { transform: scale(1) translate(0); } 48%, 82% { transform: scale(1.38) translate(-7px, 8px); } 100% { transform: scale(1); } }
        @keyframes ux-old-finger-left { 0%, 18% { opacity: 0; transform: translate(20px,0); } 30% { opacity: 1; } 48%, 72% { opacity: 1; transform: translate(-16px,12px); } 84%,100% { opacity: 0; } }
        @keyframes ux-old-finger-right { 0%, 18% { opacity: 0; transform: translate(-20px,0); } 30% { opacity: 1; } 48%, 72% { opacity: 1; transform: translate(16px,-12px); } 84%,100% { opacity: 0; } }
        @keyframes ux-new-finger-left { 0%, 18% { opacity: 0; transform: translate(20px,0); } 30% { opacity: 1; } 48%, 72% { opacity: 1; transform: translate(-16px,12px); } 84%,100% { opacity: 0; } }
        @keyframes ux-new-finger-right { 0%, 18% { opacity: 0; transform: translate(-20px,0); } 30% { opacity: 1; } 48%, 72% { opacity: 1; transform: translate(16px,-12px); } 84%,100% { opacity: 0; } }
        @keyframes ux-form-keyboard { 0%, 18% { transform: translateY(100%); } 32%, 74% { transform: translateY(0); } 88%,100% { transform: translateY(100%); } }
        @keyframes ux-old-form-dialog { 0%, 50% { opacity: 0; transform: translateX(12px); } 62%, 82% { opacity: 1; transform: translateX(0); } 92%,100% { opacity: 0; } }
        @keyframes ux-old-form-warning { 0%, 30% { opacity: 0; } 42%, 70% { opacity: 1; } 84%,100% { opacity: 0; } }
        @keyframes ux-new-form-field { 0%, 34% { transform: translateY(0) scale(1); } 48%, 72% { transform: translateY(-66px) scale(1.06); } 86%,100% { transform: translateY(0); } }
        @keyframes ux-new-form-sheet { 0%, 52% { opacity: 0; transform: translateY(100%); } 66%, 84% { opacity: 1; transform: translateY(0); } 94%,100% { opacity: 0; transform: translateY(100%); } }
        @keyframes ux-app-switch { 0%, 18% { opacity: 0; transform: translateY(100%); } 30%, 52% { opacity: 1; transform: translateY(0); } 64%,100% { opacity: 0; transform: translateY(100%); } }
        @keyframes ux-old-return { 0%, 58% { opacity: 0; } 68%, 92% { opacity: 1; } 100% { opacity: 0; } }
        @keyframes ux-reconnect-badge { 0%, 66% { opacity: 0; transform: translateY(8px); } 76%, 94% { opacity: 1; transform: translateY(0); } 100% { opacity: 0; } }
        @keyframes ux-return-code { 0%, 68% { opacity: 0; } 76%, 94% { opacity: 1; } 100% { opacity: 0; } }
        @media (prefers-reduced-motion: reduce) {
          .mobile-ux-compare * { animation: none !important; }
          .mobile-ux-compare .ux-new-digit { opacity: 1; }
          .mobile-ux-compare .ux-old-form-warning,
          .mobile-ux-compare .ux-new-form-sheet,
          .mobile-ux-compare .ux-reconnect-badge,
          .mobile-ux-compare .ux-return-code { opacity: 1; }
          .mobile-ux-compare .ux-new-form-field { transform: translateY(-66px) scale(1.06); }
          .mobile-ux-compare .ux-old-app-switch,
          .mobile-ux-compare .ux-new-app-switch,
          .mobile-ux-compare .ux-old-return { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
