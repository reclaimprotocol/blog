const productionIntervals = [
  { date: "07/06", sessions: 2825 },
  { date: "07/08", sessions: 3297 },
  { date: "07/10", sessions: 2921 },
  { date: "07/12", sessions: 6868 },
  { date: "07/14", sessions: 8322 },
  { date: "07/16", sessions: 7276 },
  { date: "07/18", sessions: 5533 },
  { date: "07/20", sessions: 6815 },
  { date: "07/22", sessions: 5900 },
  { date: "07/24", sessions: 5860 },
  { date: "07/26", sessions: 6286 },
  { date: "07/28", sessions: 9214 },
  { date: "07/30", sessions: 9181 },
  { date: "08/01", sessions: 11502 },
  { date: "08/03", sessions: 11059 },
];

function DiagramShell({ children }: { children: React.ReactNode }) {
  return (
    <section className="not-prose my-10 overflow-hidden rounded-[28px] border border-zinc-200/80 bg-gradient-to-b from-white to-zinc-50/70 p-6 text-zinc-950 shadow-[0_24px_80px_-48px_rgba(24,24,27,0.45)] dark:border-white/10 dark:from-zinc-950 dark:to-zinc-900/70 dark:text-zinc-50 dark:shadow-[0_24px_80px_-48px_rgba(0,0,0,0.9)] sm:p-8">
      {children}
    </section>
  );
}

export function TeeTrustModel() {
  return (
    <section className="not-prose my-10">
      <div
        aria-label="Animated memory-read attempt from the ordinary host reaching the TEE hardware boundary, being denied, and leaving the browser session running inside protected memory"
        className="tee-attack-demo relative overflow-hidden rounded-2xl border border-zinc-200/80 bg-zinc-950 p-5 text-white dark:border-white/10 sm:p-6"
        role="img"
      >
        <div className="flex items-baseline justify-between gap-4">
          <strong className="text-base">A very short hardware heist</strong>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500">attempt #404</span>
        </div>

        <div className="relative mt-5 grid grid-cols-[1fr_4rem_1fr] items-center gap-2 sm:grid-cols-[1fr_7rem_1fr] sm:gap-5">
          <div className="min-w-0 rounded-xl border border-red-400/20 bg-red-400/[0.06] p-3 sm:p-4">
            <span className="block text-[8px] font-bold uppercase tracking-[0.14em] text-red-300 sm:text-[9px]">Suspicious host process</span>
            <div className="mt-2 flex items-center gap-2">
              <span className="tee-gremlin relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-400 text-[9px] font-black text-zinc-950 sm:h-9 sm:w-9">
                <span className="absolute left-1.5 top-2 h-1 w-1 rounded-full bg-zinc-950 sm:left-2 sm:top-2.5" />
                <span className="absolute right-1.5 top-2 h-1 w-1 rounded-full bg-zinc-950 sm:right-2 sm:top-2.5" />
                <span className="mt-2">⌁</span>
              </span>
              <code className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-[8px] text-zinc-300 sm:text-xs">steal(browser.memory)</code>
            </div>
            <span className="tee-attack-cursor mt-2 block h-1.5 w-12 rounded-full bg-red-400/70" />
          </div>

          <div className="relative z-10 flex justify-center">
            <div className="tee-shield relative flex h-14 w-12 items-center justify-center rounded-[45%_45%_55%_55%] border-2 border-[#1275f7] bg-[#1275f7]/15 text-[10px] font-black text-blue-200 shadow-[0_0_30px_rgba(18,117,247,0.2)] sm:h-20 sm:w-16 sm:text-xs">
              TEE
              <span className="absolute inset-y-2 -left-2 w-px bg-blue-300/70" />
              <span className="absolute inset-y-2 -right-2 w-px bg-blue-300/70" />
            </div>
            <span className="tee-impact absolute left-1/2 top-1/2 z-30 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 rotate-12 items-center justify-center bg-amber-300 text-[9px] font-black text-zinc-950 [clip-path:polygon(50%_0%,61%_30%,85%_15%,72%_40%,100%_50%,72%_60%,85%_85%,61%_70%,50%_100%,39%_70%,15%_85%,28%_60%,0%_50%,28%_40%,15%_15%,39%_30%)] sm:h-16 sm:w-16 sm:text-xs">
              BONK!
            </span>
          </div>

          <div className="min-w-0 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.06] p-3 sm:p-4">
            <span className="block text-[9px] font-bold uppercase tracking-[0.16em] text-emerald-300">Protected memory</span>
            <div className="mt-2 overflow-hidden rounded-md border border-white/10 bg-white/[0.06]">
              <div className="flex h-3 items-center gap-1 border-b border-white/10 px-1.5">
                <span className="h-1 w-1 rounded-full bg-red-300" />
                <span className="h-1 w-1 rounded-full bg-amber-300" />
                <span className="h-1 w-1 rounded-full bg-emerald-300" />
              </div>
              <div className="flex h-8 items-center justify-center text-base sm:h-10 sm:text-xl">🍿</div>
            </div>
            <span className="mt-2 flex items-center gap-1.5 text-[9px] text-emerald-300 sm:text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> browser: unbothered
            </span>
          </div>

          <span className="tee-attack-packet absolute left-[22%] top-1/2 z-20 flex h-5 w-8 -translate-y-1/2 items-center justify-center rounded-md border border-red-200 bg-red-400 font-mono text-[7px] font-black text-zinc-950 shadow-[0_0_14px_rgba(248,113,113,0.9)] sm:h-6 sm:w-10 sm:text-[8px]">MEM?</span>
          <span className="tee-attack-denied absolute left-1/2 top-0 z-30 -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-400/40 bg-red-500 px-2.5 py-1 text-[8px] font-black uppercase tracking-[0.14em] text-white shadow-lg sm:text-[10px]">
            nope
          </span>
        </div>

        <div className="mt-5 grid gap-2 border-t border-white/10 pt-4 text-[10px] text-zinc-400 sm:grid-cols-2 sm:text-xs">
          <span>Result: memory not found. Dignity also missing.</span>
          <span className="sm:text-right">It cannot directly inspect the TEE-protected browser memory.</span>
        </div>

        <style>{`
          .tee-attack-demo .tee-attack-packet { animation: tee-attack-packet 3.8s ease-in-out infinite; }
          .tee-attack-demo .tee-attack-denied { animation: tee-attack-denied 3.8s ease-in-out infinite; }
          .tee-attack-demo .tee-shield { animation: tee-shield-pulse 3.8s ease-in-out infinite; }
          .tee-attack-demo .tee-attack-cursor { animation: tee-attack-cursor 3.8s ease-in-out infinite; }
          .tee-attack-demo .tee-impact { animation: tee-impact 3.8s ease-in-out infinite; }
          .tee-attack-demo .tee-gremlin { animation: tee-gremlin 3.8s ease-in-out infinite; }
          @keyframes tee-attack-packet {
            0%, 18% { left: 22%; opacity: 0; transform: translateY(-50%) rotate(0deg) scale(.7); }
            28% { opacity: 1; }
            50% { left: calc(50% - 2.1rem); opacity: 1; transform: translateY(-50%) rotate(5deg) scale(1); }
            62% { left: 38%; opacity: 1; transform: translateY(-90%) rotate(-140deg) scale(.8); }
            76%, 100% { left: 27%; opacity: 0; transform: translateY(30%) rotate(-260deg) scale(.4); }
          }
          @keyframes tee-attack-denied {
            0%, 46% { opacity: 0; transform: translate(-50%, -35%) scale(.8); }
            54%, 72% { opacity: 1; transform: translate(-50%, -70%) scale(1); }
            84%, 100% { opacity: 0; transform: translate(-50%, -90%) scale(.9); }
          }
          @keyframes tee-shield-pulse {
            0%, 42%, 72%, 100% { box-shadow: 0 0 30px rgba(18,117,247,.2); }
            52%, 62% { border-color: rgb(147 197 253); box-shadow: 0 0 0 8px rgba(18,117,247,.12), 0 0 42px rgba(18,117,247,.5); }
          }
          @keyframes tee-impact {
            0%, 47% { opacity: 0; transform: translate(-50%, -50%) rotate(-25deg) scale(.2); }
            52%, 60% { opacity: 1; transform: translate(-50%, -50%) rotate(12deg) scale(1); }
            70%, 100% { opacity: 0; transform: translate(-50%, -50%) rotate(32deg) scale(1.35); }
          }
          @keyframes tee-gremlin {
            0%, 68%, 100% { transform: translateX(0) rotate(0); }
            72% { transform: translateX(-2px) rotate(-8deg); }
            76% { transform: translateX(2px) rotate(8deg); }
            80% { transform: translateX(-1px) rotate(-5deg); }
          }
          @keyframes tee-attack-cursor {
            0%, 12% { width: 20%; opacity: .35; }
            35%, 58% { width: 85%; opacity: 1; }
            76%, 100% { width: 35%; opacity: .35; }
          }
          @media (prefers-reduced-motion: reduce) {
            .tee-attack-demo * { animation: none !important; }
            .tee-attack-demo .tee-attack-packet { left: calc(50% - 1.7rem); opacity: 1; }
            .tee-attack-demo .tee-attack-denied { opacity: 1; transform: translate(-50%, -70%); }
            .tee-attack-demo .tee-impact { opacity: 1; transform: translate(-50%, -50%) rotate(12deg) scale(1); }
          }
        `}</style>
      </div>

    </section>
  );
}

export function WebRtcVncDiagram() {
  return (
    <DiagramShell>
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline">
        <h3 className="m-0 text-2xl font-bold tracking-tight">When the page barely moves</h3>
        <span className="text-sm text-zinc-500 dark:text-zinc-400">continuous frames · changed rectangles</span>
      </div>

      <div
        aria-label="Animated comparison. WebRTC continuously sends encoded views of the browser screen, while VNC sends small framebuffer updates only for regions whose pixels changed."
        className="streaming-compare mt-7 grid gap-4 sm:grid-cols-2"
        role="img"
      >
        <section className="overflow-hidden rounded-2xl border border-amber-300/20 bg-zinc-950 p-4 text-white">
          <div className="flex items-center justify-between gap-3">
            <div>
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-amber-300">Before</span>
              <strong className="mt-1 block text-lg">WebRTC</strong>
            </div>
            <span className="rounded-full border border-amber-300/25 bg-amber-300/10 px-2.5 py-1 font-mono text-[8px] font-bold uppercase text-amber-200">
              video stream
            </span>
          </div>

          <div className="relative mt-5 h-48 overflow-hidden rounded-xl border border-white/10 bg-white/[0.025]">
            <div className="absolute left-3 top-8 w-[5.5rem] overflow-hidden rounded-lg border border-white/15 bg-zinc-100 text-zinc-900 shadow-lg">
              <div className="flex h-3 items-center gap-1 bg-zinc-800 px-1.5">
                <span className="h-1 w-1 rounded-full bg-red-300" />
                <span className="h-1 w-1 rounded-full bg-amber-300" />
                <span className="h-1 w-1 rounded-full bg-emerald-300" />
              </div>
              <div className="h-[4.4rem] p-2">
                <span className="block h-1.5 w-10 rounded bg-zinc-800" />
                <span className="mt-2 block h-1 w-full rounded bg-zinc-300" />
                <span className="mt-1 block h-1 w-4/5 rounded bg-zinc-300" />
                <span className="stream-source-caret mt-2 block h-3 w-7 rounded-sm border border-amber-400 bg-amber-100" />
              </div>
            </div>

            <span className="absolute bottom-6 left-[31%] right-[24%] h-px bg-white/10" />
            {[0, 1, 2].map((frame) => (
              <span
                className={`stream-whole-frame stream-whole-frame-${frame + 1} absolute left-[29%] top-[4.6rem] z-10 h-8 w-11 rounded border border-amber-300/70 bg-zinc-100 p-1 shadow-[0_0_14px_rgba(252,211,77,0.18)]`}
                key={frame}
              >
                <span className="block h-1 w-5 rounded bg-zinc-700" />
                <span className="mt-1 block h-1 w-full rounded bg-zinc-300" />
                <span className="mt-1 block h-2 w-4 rounded-sm bg-amber-300" />
              </span>
            ))}

            <div className="absolute right-3 top-6 w-[3.9rem] rounded-[1rem] border-[3px] border-zinc-200 bg-zinc-200 p-0.5 shadow-xl">
              <div className="relative h-[6.2rem] overflow-hidden rounded-[.72rem] bg-zinc-100 p-2 pt-5 text-zinc-900">
                <span className="absolute left-1/2 top-1 h-1.5 w-5 -translate-x-1/2 rounded-full bg-zinc-300" />
                <span className="block h-1.5 w-7 rounded bg-zinc-800" />
                <span className="mt-2 block h-1 w-full rounded bg-zinc-300" />
                <span className="mt-1 block h-1 w-4/5 rounded bg-zinc-300" />
                <span className="stream-target-field mt-2 block h-3 w-7 rounded-sm border border-amber-400 bg-amber-100" />
              </div>
            </div>

            <span className="absolute bottom-3 left-3 font-mono text-[8px] uppercase tracking-[0.08em] text-zinc-500">frame · frame · frame</span>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            <span className="text-sm font-bold text-amber-200">The whole view stays in motion</span>
            <span className="flex items-end gap-1" aria-hidden="true">
              {[2, 3, 4, 5, 6].map((height) => <span className="stream-meter-hot w-1.5 rounded-sm bg-amber-300" style={{ height: `${height * 2}px` }} key={height} />)}
            </span>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-[#1275f7]/35 bg-zinc-950 p-4 text-white shadow-[0_0_30px_rgba(18,117,247,0.08)]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[#69a7ff]">After</span>
              <strong className="mt-1 block text-lg">VNC</strong>
            </div>
            <span className="rounded-full border border-[#1275f7]/35 bg-[#1275f7]/10 px-2.5 py-1 font-mono text-[8px] font-bold uppercase text-blue-200">
              pixel updates
            </span>
          </div>

          <div className="relative mt-5 h-48 overflow-hidden rounded-xl border border-white/10 bg-white/[0.025]">
            <div className="absolute left-3 top-8 w-[5.5rem] overflow-hidden rounded-lg border border-white/15 bg-zinc-100 text-zinc-900 shadow-lg">
              <div className="flex h-3 items-center gap-1 bg-zinc-800 px-1.5">
                <span className="h-1 w-1 rounded-full bg-red-300" />
                <span className="h-1 w-1 rounded-full bg-amber-300" />
                <span className="h-1 w-1 rounded-full bg-emerald-300" />
              </div>
              <div className="h-[4.4rem] p-2">
                <span className="block h-1.5 w-10 rounded bg-zinc-800" />
                <span className="mt-2 block h-1 w-full rounded bg-zinc-300" />
                <span className="mt-1 block h-1 w-4/5 rounded bg-zinc-300" />
                <span className="stream-source-caret mt-2 block h-3 w-7 rounded-sm border border-[#1275f7] bg-blue-100" />
              </div>
            </div>

            <span className="absolute bottom-6 left-[31%] right-[24%] h-px bg-white/10" />
            <span className="stream-patch stream-patch-1 absolute left-[30%] top-[4.7rem] z-10 h-3 w-6 rounded-sm border border-[#69a7ff] bg-blue-100 shadow-[0_0_14px_rgba(18,117,247,0.35)]" />
            <span className="stream-patch stream-patch-2 absolute left-[30%] top-[5.35rem] z-10 h-1.5 w-3 rounded-sm bg-[#1275f7] shadow-[0_0_12px_rgba(18,117,247,0.5)]" />
            <span className="stream-patch stream-patch-3 absolute left-[30%] top-[4.95rem] z-10 h-2 w-2 rounded-sm bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.35)]" />

            <div className="absolute right-3 top-6 w-[3.9rem] rounded-[1rem] border-[3px] border-zinc-200 bg-zinc-200 p-0.5 shadow-xl">
              <div className="relative h-[6.2rem] overflow-hidden rounded-[.72rem] bg-zinc-100 p-2 pt-5 text-zinc-900">
                <span className="absolute left-1/2 top-1 h-1.5 w-5 -translate-x-1/2 rounded-full bg-zinc-300" />
                <span className="block h-1.5 w-7 rounded bg-zinc-800" />
                <span className="mt-2 block h-1 w-full rounded bg-zinc-300" />
                <span className="mt-1 block h-1 w-4/5 rounded bg-zinc-300" />
                <span className="stream-target-patch mt-2 block h-3 w-7 rounded-sm border border-[#1275f7] bg-blue-100" />
              </div>
            </div>

            <span className="absolute bottom-3 left-3 font-mono text-[8px] uppercase tracking-[0.08em] text-zinc-500">quiet page · tiny update</span>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            <span className="text-sm font-bold text-blue-200">Only changed rectangles travel</span>
            <span className="flex items-end gap-1" aria-hidden="true">
              <span className="stream-meter-cool h-2 w-1.5 rounded-sm bg-[#1275f7]" />
              <span className="h-1 w-1.5 rounded-sm bg-zinc-700" />
              <span className="h-1 w-1.5 rounded-sm bg-zinc-700" />
              <span className="h-1 w-1.5 rounded-sm bg-zinc-700" />
              <span className="h-1 w-1.5 rounded-sm bg-zinc-700" />
            </span>
          </div>
        </section>
      </div>

      <style>{`
        .streaming-compare .stream-source-caret { animation: stream-caret 1.2s steps(2,end) infinite; }
        .streaming-compare .stream-whole-frame { opacity: 0; animation: stream-whole-frame 3.6s linear infinite; }
        .streaming-compare .stream-whole-frame-2 { animation-delay: 1.15s; }
        .streaming-compare .stream-whole-frame-3 { animation-delay: 2.3s; }
        .streaming-compare .stream-target-field { animation: stream-target-field 3.6s ease-in-out infinite; }
        .streaming-compare .stream-patch { opacity: 0; animation: stream-patch 5s ease-in-out infinite; }
        .streaming-compare .stream-patch-2 { animation-delay: 1.7s; }
        .streaming-compare .stream-patch-3 { animation-delay: 3.4s; }
        .streaming-compare .stream-target-patch { animation: stream-target-patch 5s ease-in-out infinite; }
        .streaming-compare .stream-meter-hot { animation: stream-meter-hot 1s ease-in-out infinite alternate; }
        .streaming-compare .stream-meter-hot:nth-child(2) { animation-delay: .12s; }
        .streaming-compare .stream-meter-hot:nth-child(3) { animation-delay: .24s; }
        .streaming-compare .stream-meter-hot:nth-child(4) { animation-delay: .36s; }
        .streaming-compare .stream-meter-hot:nth-child(5) { animation-delay: .48s; }
        .streaming-compare .stream-meter-cool { animation: stream-meter-cool 3s ease-in-out infinite; }
        @keyframes stream-caret { 0%, 49% { opacity: 1; } 50%, 100% { opacity: .35; } }
        @keyframes stream-whole-frame {
          0% { left: 29%; opacity: 0; transform: scale(.78); }
          12% { opacity: 1; }
          78% { left: 66%; opacity: 1; transform: scale(1); }
          92%, 100% { left: 69%; opacity: 0; transform: scale(.88); }
        }
        @keyframes stream-target-field { 0%, 68%, 100% { box-shadow: none; } 76%, 86% { box-shadow: 0 0 0 3px rgba(252,211,77,.24); } }
        @keyframes stream-patch {
          0%, 34% { left: 30%; opacity: 0; transform: scale(.65); }
          43% { opacity: 1; }
          72% { left: 68%; opacity: 1; transform: scale(1); }
          82%, 100% { left: 71%; opacity: 0; transform: scale(.75); }
        }
        @keyframes stream-target-patch { 0%, 65%, 100% { box-shadow: none; } 73%, 84% { box-shadow: 0 0 0 3px rgba(18,117,247,.2); } }
        @keyframes stream-meter-hot { from { opacity: .5; transform: scaleY(.7); } to { opacity: 1; transform: scaleY(1.15); } }
        @keyframes stream-meter-cool { 0%, 72%, 100% { opacity: .4; } 80%, 92% { opacity: 1; box-shadow: 0 0 8px rgba(18,117,247,.65); } }
        @media (prefers-reduced-motion: reduce) {
          .streaming-compare * { animation: none !important; }
          .streaming-compare .stream-whole-frame { left: 52%; opacity: .85; }
          .streaming-compare .stream-patch { left: 54%; opacity: 1; }
        }
      `}</style>
    </DiagramShell>
  );
}

export function AgonesFleetDiagram() {
  return (
    <DiagramShell>
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline">
        <div>
          <h3 className="m-0 text-2xl font-bold tracking-tight">One request. One ready browser.</h3>
          <p className="mb-0 mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Allocate now. Refill the warm pool behind the request.
          </p>
        </div>
        <div className="hidden items-center gap-4 text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-500 dark:text-zinc-400">
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-500" />Ready</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-amber-400" />Allocated</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#1275f7]" />Starting</span>
        </div>
      </div>

      <div
        aria-label="Animated Popcorn fleet. Two full TEE nodes each hold eighteen allocated browser pods and two ready browser pods. A request allocates one ready browser. Because the nodes have no spare capacity, a third TEE node arrives and starts a replacement pod, restoring the ready buffer."
        className="fleet-popper-demo mt-7 border-y border-zinc-200/80 py-7 dark:border-white/10"
        role="img"
      >
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#1275f7]">Ready buffer</span>
          <span className="flex items-center gap-2" aria-hidden="true">
            {[1, 2, 3].map((slot) => <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]" key={slot} />)}
            <span className="fleet-popper-buffer-last h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]" />
            <span className="ml-1 font-mono text-[9px] uppercase tracking-[0.1em] text-zinc-400">warm</span>
          </span>
        </div>

        <div className="relative mt-6 pt-11">
          <span aria-hidden="true" className="absolute left-3 right-3 top-3 h-px bg-zinc-200 dark:bg-white/10" />
          <span className="absolute left-0 top-0 rounded-full border border-[#1275f7]/50 bg-zinc-950 px-3 py-1.5 font-mono text-[10px] font-bold text-[#3b8cff] shadow-[0_6px_18px_rgba(0,0,0,0.28)]">NEW SESSION</span>
          <span className="fleet-popper-live absolute right-0 top-0 rounded-full border border-amber-400/45 bg-zinc-950 px-3 py-1.5 font-mono text-[10px] font-bold text-amber-400 shadow-[0_6px_18px_rgba(0,0,0,0.28)]">ALLOCATED</span>
          <span className="fleet-popper-request-pulse absolute left-[5.7rem] top-[13px] h-2.5 w-2.5 rounded-full bg-[#1275f7] shadow-[0_0_16px_rgba(18,117,247,0.7)]" />
          <span className="fleet-popper-live-line absolute right-[4.1rem] top-[14px] h-px w-[38%] origin-right bg-amber-400 opacity-0" />

          <span className="fleet-popper-session absolute left-[48%] top-[42%] z-30 flex items-center gap-1.5 opacity-0">
            <span className="fleet-popper-kernel text-amber-400" />
            <span className="rounded bg-amber-400 px-1.5 py-0.5 font-mono text-[7px] font-bold text-zinc-950">SESSION</span>
          </span>

          <div className="grid grid-cols-3 items-end gap-2.5 sm:gap-4">
            {[1, 2].map((node) => (
              <div className={"fleet-popper-node fleet-popper-node-" + node} key={node}>
                <div className="relative overflow-hidden rounded-t-[2rem] rounded-b-xl border border-zinc-200 bg-gradient-to-b from-blue-50/70 to-zinc-50 p-2.5 pb-3 dark:border-white/10 dark:from-[#1275f7]/[0.07] dark:to-white/[0.025]">
                  <span className="mx-auto mb-2 block h-1 w-8 rounded-full bg-[#1275f7]/30" />
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[8px] font-bold uppercase tracking-[0.1em] text-zinc-400">TEE node 0{node}</span>
                    <span className="fleet-popper-full text-[7px] font-black uppercase text-[#1275f7] opacity-0">full</span>
                  </div>
                  <div className="mt-2.5 grid grid-cols-5 justify-items-center gap-x-1 gap-y-2">
                    {Array.from({ length: 20 }).map((_, pod) => {
                      const ready = node === 1 ? pod === 4 || pod === 14 : pod === 3 || pod === 15;
                      const target = node === 2 && pod === 3;
                      return (
                        <span
                          className={
                            "fleet-popper-kernel " +
                            (target
                              ? "fleet-popper-target"
                              : ready
                                ? "fleet-popper-ready"
                                : "fleet-popper-allocated")
                          }
                          key={pod}
                        />
                      );
                    })}
                  </div>
                </div>
                <span className="mx-auto block h-2 w-[88%] rounded-b-lg bg-zinc-300 dark:bg-zinc-800" />
              </div>
            ))}

            <div className="fleet-popper-new-node opacity-0">
              <div className="relative overflow-hidden rounded-t-[2rem] rounded-b-xl border border-[#1275f7]/45 bg-gradient-to-b from-blue-50/70 to-zinc-50 p-2.5 pb-3 dark:from-[#1275f7]/[0.1] dark:to-white/[0.025]">
                <span className="mx-auto mb-2 block h-1 w-8 rounded-full bg-[#1275f7]/40" />
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[8px] font-bold uppercase tracking-[0.1em] text-[#1275f7]">TEE node 03</span>
                  <span className="text-[7px] font-black uppercase text-[#1275f7]">new</span>
                </div>
                <div className="mt-2.5 grid grid-cols-5 justify-items-center gap-x-1 gap-y-2">
                  {Array.from({ length: 20 }).map((_, pod) => (
                    <span
                      className={"fleet-popper-kernel " + (pod === 0 ? "fleet-popper-new-kernel" : "fleet-popper-empty")}
                      key={pod}
                    />
                  ))}
                </div>
              </div>
              <span className="mx-auto block h-2 w-[88%] rounded-b-lg bg-[#1275f7]/30" />
            </div>
          </div>

          <div className="relative mt-3 h-8 overflow-hidden">
            <span aria-hidden="true" className="absolute inset-x-3 top-1/2 h-px bg-zinc-200 dark:bg-white/[0.06]" />
            <span className="fleet-popper-refill absolute left-[7%] top-1 z-20 flex items-center gap-1.5 opacity-0">
              <span className="fleet-popper-kernel text-[#1275f7]" />
              <span className="rounded-md border border-[#1275f7]/40 bg-zinc-950 px-1.5 py-0.5 font-mono text-[7px] font-bold text-blue-300">+ READY</span>
            </span>
          </div>
        </div>

        <div className="relative mt-4 h-5 text-center text-[10px] font-bold uppercase tracking-[0.13em]">
          <span className="fleet-popper-caption fleet-popper-caption-warm">Browsers waiting, already warm</span>
          <span className="fleet-popper-caption fleet-popper-caption-request">Pop — one browser goes live</span>
          <span className="fleet-popper-caption fleet-popper-caption-refill">Replace it before the next request</span>
          <span className="fleet-popper-caption fleet-popper-caption-full">Full house. Add another TEE node.</span>
          <span className="fleet-popper-caption fleet-popper-caption-restored">Warm batch restored</span>
        </div>

        <style>{`
          .fleet-popper-demo .fleet-popper-kernel {
            display: block;
            height: .62rem;
            width: .62rem;
            flex: 0 0 auto;
            border-radius: 55% 45% 58% 42%;
            background-color: currentColor;
            box-shadow: -.18rem .08rem 0 -.05rem currentColor, .18rem .08rem 0 -.05rem currentColor, 0 -.16rem 0 -.05rem currentColor;
            transform: rotate(-8deg);
          }
          .fleet-popper-demo .fleet-popper-allocated {
            color: rgb(245 158 11);
            opacity: .72;
            filter: drop-shadow(0 0 3px rgba(245,158,11,.18));
          }
          .fleet-popper-demo .fleet-popper-ready { color: rgb(16 185 129); filter: drop-shadow(0 0 4px rgba(16,185,129,.35)); }
          .fleet-popper-demo .fleet-popper-empty {
            color: transparent;
            border: 1px dashed rgba(113,113,122,.25);
            box-shadow: none;
            background: transparent;
          }
          .fleet-popper-demo .fleet-popper-buffer-last { animation: fleet-popper-buffer 10s ease-in-out infinite; }
          .fleet-popper-demo .fleet-popper-request-pulse { animation: fleet-popper-request 10s cubic-bezier(.2,.8,.2,1) infinite; }
          .fleet-popper-demo .fleet-popper-target { animation: fleet-popper-target 10s ease-in-out infinite; }
          .fleet-popper-demo .fleet-popper-session { animation: fleet-popper-session 10s cubic-bezier(.2,.9,.2,1) infinite; }
          .fleet-popper-demo .fleet-popper-live { animation: fleet-popper-live 10s ease-in-out infinite; }
          .fleet-popper-demo .fleet-popper-live-line { animation: fleet-popper-live-line 10s ease-in-out infinite; }
          .fleet-popper-demo .fleet-popper-node-1,
          .fleet-popper-demo .fleet-popper-node-2 { animation: fleet-popper-bonk 10s ease-in-out infinite; }
          .fleet-popper-demo .fleet-popper-full { animation: fleet-popper-full 10s ease-in-out infinite; }
          .fleet-popper-demo .fleet-popper-refill { animation: fleet-popper-refill 10s cubic-bezier(.25,.8,.25,1) infinite; }
          .fleet-popper-demo .fleet-popper-new-node { animation: fleet-popper-new-node 10s cubic-bezier(.2,1.15,.35,1) infinite; transform-origin: center bottom; }
          .fleet-popper-demo .fleet-popper-new-kernel { animation: fleet-popper-new-kernel 10s cubic-bezier(.2,1.4,.3,1) infinite; }
          .fleet-popper-demo .fleet-popper-new-kernel:nth-child(2) { animation-delay: .04s; }
          .fleet-popper-demo .fleet-popper-new-kernel:nth-child(3) { animation-delay: .08s; }
          .fleet-popper-demo .fleet-popper-new-kernel:nth-child(4) { animation-delay: .12s; }
          .fleet-popper-demo .fleet-popper-new-kernel:nth-child(5) { animation-delay: .16s; }
          .fleet-popper-demo .fleet-popper-new-kernel:nth-child(6) { animation-delay: .2s; }
          .fleet-popper-demo .fleet-popper-new-kernel:nth-child(7) { animation-delay: .24s; }
          .fleet-popper-demo .fleet-popper-new-kernel:nth-child(8) { animation-delay: .28s; }
          .fleet-popper-demo .fleet-popper-new-kernel:nth-child(9) { animation-delay: .32s; }
          .fleet-popper-demo .fleet-popper-new-kernel:nth-child(10) { animation-delay: .36s; }
          .fleet-popper-demo .fleet-popper-new-kernel:nth-child(11) { animation-delay: .4s; }
          .fleet-popper-demo .fleet-popper-new-kernel:nth-child(12) { animation-delay: .44s; }
          .fleet-popper-demo .fleet-popper-caption {
            position: absolute;
            inset: 0;
            opacity: 0;
            color: rgb(161 161 170);
          }
          .fleet-popper-demo .fleet-popper-caption-warm { animation: fleet-popper-caption-warm 10s ease-in-out infinite; }
          .fleet-popper-demo .fleet-popper-caption-request { animation: fleet-popper-caption-request 10s ease-in-out infinite; }
          .fleet-popper-demo .fleet-popper-caption-refill { animation: fleet-popper-caption-refill 10s ease-in-out infinite; }
          .fleet-popper-demo .fleet-popper-caption-full { animation: fleet-popper-caption-full 10s ease-in-out infinite; }
          .fleet-popper-demo .fleet-popper-caption-restored { animation: fleet-popper-caption-restored 10s ease-in-out infinite; }
          @keyframes fleet-popper-request {
            0%, 8% { left: 5.7rem; opacity: 0; transform: scale(.55); }
            14% { opacity: 1; transform: scale(1); }
            25% { left: 48%; opacity: 1; transform: scale(1); }
            30%, 100% { left: 48%; opacity: 0; transform: scale(.4); }
          }
          @keyframes fleet-popper-target {
            0%, 23% { color: rgb(16 185 129); filter: drop-shadow(0 0 4px rgba(16,185,129,.35)); transform: rotate(-8deg) scale(1); }
            27% { color: rgb(245 158 11); filter: drop-shadow(0 0 8px rgba(245,158,11,.6)); transform: rotate(8deg) scale(1.35); }
            33%, 96% { color: rgb(245 158 11); filter: drop-shadow(0 0 4px rgba(245,158,11,.35)); transform: rotate(-8deg) scale(1); }
            100% { color: rgb(16 185 129); }
          }
          @keyframes fleet-popper-session {
            0%, 23% { left: 48%; top: 42%; opacity: 0; transform: translate(0,0) rotate(-12deg) scale(.35); }
            27% { opacity: 1; transform: translate(0,-8px) rotate(8deg) scale(1.1); }
            35%, 94% { left: calc(100% - 6.4rem); top: .05rem; opacity: 1; transform: translate(0,0) rotate(0) scale(1); }
            100% { opacity: 0; }
          }
          @keyframes fleet-popper-buffer {
            0%, 23% { opacity: 1; background-color: rgb(16 185 129); box-shadow: 0 0 10px rgba(16,185,129,.3); }
            29%, 72% { opacity: .18; background-color: rgb(113 113 122); box-shadow: none; }
            79%, 96% { opacity: 1; background-color: rgb(16 185 129); box-shadow: 0 0 12px rgba(16,185,129,.5); }
            100% { opacity: 1; }
          }
          @keyframes fleet-popper-live { 0%, 28% { opacity: .55; background-color: rgb(9 9 11); } 35%, 96% { opacity: 1; background-color: rgb(9 9 11); border-color: rgba(245,158,11,.75); box-shadow: 0 0 16px rgba(245,158,11,.18); } 100% { opacity: .55; background-color: rgb(9 9 11); } }
          @keyframes fleet-popper-live-line { 0%, 28% { opacity: 0; transform: scaleX(0); } 35%, 96% { opacity: .7; transform: scaleX(1); } 100% { opacity: 0; transform: scaleX(0); } }
          @keyframes fleet-popper-refill {
            0%, 33% { left: 7%; opacity: 0; transform: translateY(0) rotate(0) scale(.7); }
            38% { left: 13%; opacity: 1; transform: translateY(0) rotate(0) scale(1); }
            47% { left: 49%; opacity: 1; transform: translateY(0) rotate(0) scale(1); }
            50% { left: 52%; opacity: 1; transform: translateY(-5px) rotate(-7deg) scale(1); }
            53% { left: 49%; opacity: 1; transform: translateY(3px) rotate(5deg) scale(.96); }
            62% { left: 72%; opacity: 1; transform: translateY(0) rotate(0) scale(1); }
            68% { left: 82%; opacity: 1; transform: translateY(-18px) rotate(12deg) scale(.75); }
            72%, 100% { left: 82%; opacity: 0; transform: translateY(-24px) rotate(18deg) scale(.4); }
          }
          @keyframes fleet-popper-bonk {
            0%, 44%, 55%, 100% { transform: translateX(0) rotate(0); }
            48% { transform: translateX(-2px) rotate(-.7deg); }
            50% { transform: translateX(2px) rotate(.7deg); }
            52% { transform: translateX(-1px) rotate(-.35deg); }
          }
          @keyframes fleet-popper-full { 0%, 44%, 56%, 100% { opacity: 0; } 49%, 53% { opacity: 1; } }
          @keyframes fleet-popper-new-node {
            0%, 55% { opacity: 0; transform: translateY(16px) scale(.72,.45); }
            61% { opacity: 1; transform: translateY(-4px) scale(1.04,.96); }
            66%, 96% { opacity: 1; transform: translateY(0) scale(1); }
            100% { opacity: 0; transform: translateY(12px) scale(.8); }
          }
          @keyframes fleet-popper-new-kernel {
            0%, 61% { opacity: 0; color: rgb(18 117 247); transform: translateY(10px) rotate(-12deg) scale(.35); }
            69%, 75% { opacity: 1; color: rgb(18 117 247); transform: translateY(0) rotate(8deg) scale(1.15); filter: drop-shadow(0 0 5px rgba(18,117,247,.5)); }
            81%, 96% { opacity: 1; color: rgb(16 185 129); transform: translateY(0) rotate(-8deg) scale(1); filter: drop-shadow(0 0 4px rgba(16,185,129,.35)); }
            100% { opacity: 0; }
          }
          @keyframes fleet-popper-caption-warm { 0%, 4%, 16% { opacity: 1; } 21%, 100% { opacity: 0; } }
          @keyframes fleet-popper-caption-request { 0%, 17% { opacity: 0; } 23%, 32% { opacity: 1; color: rgb(245 158 11); } 37%, 100% { opacity: 0; } }
          @keyframes fleet-popper-caption-refill { 0%, 32% { opacity: 0; } 38%, 44% { opacity: 1; color: #1275f7; } 49%, 100% { opacity: 0; } }
          @keyframes fleet-popper-caption-full { 0%, 44% { opacity: 0; } 50%, 58% { opacity: 1; color: #1275f7; } 63%, 100% { opacity: 0; } }
          @keyframes fleet-popper-caption-restored { 0%, 75% { opacity: 0; } 81%, 96% { opacity: 1; color: rgb(16 185 129); } 100% { opacity: 0; } }
          @media (prefers-reduced-motion: reduce) {
            .fleet-popper-demo * { animation: none !important; }
            .fleet-popper-demo .fleet-popper-request-pulse,
            .fleet-popper-demo .fleet-popper-refill,
            .fleet-popper-demo .fleet-popper-caption-warm,
            .fleet-popper-demo .fleet-popper-caption-request,
            .fleet-popper-demo .fleet-popper-caption-refill,
            .fleet-popper-demo .fleet-popper-caption-full { opacity: 0; }
            .fleet-popper-demo .fleet-popper-live,
            .fleet-popper-demo .fleet-popper-live-line,
            .fleet-popper-demo .fleet-popper-session,
            .fleet-popper-demo .fleet-popper-new-node,
            .fleet-popper-demo .fleet-popper-new-kernel,
            .fleet-popper-demo .fleet-popper-caption-restored { opacity: 1; transform: none; }
            .fleet-popper-demo .fleet-popper-target { color: rgb(245 158 11); }
          }
        `}</style>
      </div>

    </DiagramShell>
  );
}

export function PopcornRequestPathDiagram() {
  const requestSteps = [
    { label: "App / user", detail: "Start verification" },
    { label: "Control plane", detail: "Authenticate + choose region" },
    { label: "Pool manager", detail: "Ask for a browser" },
    { label: "Agones", detail: "Assign a ready pod" },
    { label: "Browser pod", detail: "Chromium already running" },
  ];

  return (
    <section
      aria-label="Request flow from the user through the Popcorn control plane and regional browser fleet"
      className="not-prose my-10 overflow-hidden rounded-[24px] border border-zinc-200/80 bg-white p-5 text-zinc-950 shadow-[0_24px_70px_-48px_rgba(24,24,27,0.5)] dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-50 sm:p-7"
    >
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline">
        <h3 className="m-0 text-xl font-bold tracking-tight">Request flow</h3>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
          one session
        </span>
      </div>

      <div className="mt-6">
        <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#1275f7]">Create session</span>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center">
          {requestSteps.map((step, index) => (
            <div className="contents" key={step.label}>
              <div className={`min-w-0 flex-1 rounded-xl border px-3 py-3 text-center ${index === requestSteps.length - 1 ? "border-emerald-500/35 bg-emerald-500/10" : "border-zinc-200 bg-zinc-50 dark:border-white/10 dark:bg-white/[0.035]"}`}>
                <strong className="block text-xs">{step.label}</strong>
                <span className="mt-1 block text-[10px] leading-4 text-zinc-500 dark:text-zinc-400">{step.detail}</span>
              </div>
              {index < requestSteps.length - 1 && (
                <span aria-hidden="true" className="rotate-90 self-center text-zinc-400 sm:rotate-0">→</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 border-t border-zinc-200/80 pt-5 dark:border-white/10">
        <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-amber-600 dark:text-amber-400">Live browser connection</span>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full bg-zinc-100 px-3 py-1.5 font-semibold dark:bg-white/[0.06]">App / user</span>
          <span aria-hidden="true" className="text-zinc-400">→</span>
          <span className="rounded-full bg-zinc-100 px-3 py-1.5 font-semibold dark:bg-white/[0.06]">Regional gateway</span>
          <span aria-hidden="true" className="text-zinc-400">→</span>
          <span className="rounded-full bg-amber-100 px-3 py-1.5 font-semibold text-amber-950 dark:bg-amber-400 dark:text-zinc-950">Allocated browser</span>
        </div>
        <span className="mt-2 block text-[10px] text-zinc-500 dark:text-zinc-400">The app receives a signed URL. Browser pixels travel through the regional gateway, not the control plane.</span>
      </div>

      <div className="mt-5 border-t border-zinc-200/80 pt-5 dark:border-white/10">
        <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-400">Refill in the background</span>
        <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-2 text-xs">
          <strong>FleetAutoscaler</strong><span aria-hidden="true">→</span><span className="text-zinc-500 dark:text-zinc-400">replacement browser</span>
          <span className="flex items-center gap-1" aria-label="Ready browser pods">
            {[1, 2, 3, 4, 5].map((pod) => <span className="h-2.5 w-2.5 rounded-sm bg-emerald-500" key={pod} />)}
          </span>
          <span aria-hidden="true" className="text-zinc-300 dark:text-zinc-700">•</span>
          <strong>Node prescaler</strong><span aria-hidden="true">→</span><span className="text-zinc-500 dark:text-zinc-400">new TEE machine when full</span>
        </div>
      </div>
    </section>
  );
}

export function PopcornFleetFlowDiagram() {
  return (
    <section
      aria-label="Animated Popcorn architecture. A request reaches one control plane, which selects one of several regional pools. The selected pool manager uses Agones to allocate a ready browser. The gateway carries the live view while the autoscalers add a replacement pod and a new TEE node in the background."
      className="not-prose my-10 overflow-hidden rounded-[24px] border border-zinc-200/80 bg-white p-5 text-zinc-950 shadow-[0_24px_70px_-48px_rgba(24,24,27,0.5)] dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-50 sm:p-7"
    >
      <h3 className="m-0 text-xl font-bold tracking-tight">From request to browser</h3>

      <div className="platform-flow relative mt-6" role="img">
        <div className="relative z-10 grid grid-cols-[1fr_auto_1fr] items-center">
          <span className="justify-self-start rounded-full border border-[#1275f7]/40 bg-zinc-950 px-3 py-1.5 font-mono text-[9px] font-bold text-[#3b8cff]">USER REQUEST</span>
          <div className="platform-flow-control rounded-xl border border-zinc-200 bg-zinc-50 px-5 py-3 text-center dark:border-white/10 dark:bg-white/[0.04]">
            <strong className="block text-xs">Control plane</strong>
          </div>
          <span className="platform-flow-pop justify-self-start pl-2 font-black text-[#1275f7] opacity-0">POP!</span>
        </div>
        <span aria-hidden="true" className="absolute left-[10%] right-1/2 top-6 h-px bg-[#1275f7]/30" />

        <div aria-hidden="true" className="relative mx-auto h-10 w-[68%] border-x border-t border-zinc-200 dark:border-white/10">
          <span className="absolute left-1/2 top-0 h-10 w-px -translate-x-1/2 bg-zinc-200 dark:bg-white/10" />
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          {["asia-south1", "southamerica-east1", "us-central1"].map((region, index) => (
            <div className={`platform-flow-pool-${index + 1} rounded-xl border px-2 py-2 text-center ${index === 1 ? "border-[#1275f7]/50 bg-[#1275f7]/[0.07]" : "border-zinc-200 bg-zinc-50 dark:border-white/10 dark:bg-white/[0.025]"}`} key={region}>
              <strong className="block text-[10px]">Pool manager</strong>
              <span className="mt-0.5 block font-mono text-[8px] text-zinc-500 dark:text-zinc-400">{region}</span>
            </div>
          ))}
        </div>

        <div className="mx-auto h-5 w-px bg-[#1275f7]/35" aria-hidden="true" />

        <div className="platform-flow-selected rounded-2xl border border-[#1275f7]/35 bg-zinc-50/70 p-3 dark:bg-white/[0.025] sm:p-4">
          <div className="border-b border-zinc-200/80 pb-3 dark:border-white/10">
            <div>
              <strong className="block text-xs">Selected regional pool</strong>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-3 items-end gap-2">
            {[1, 2, 3].map((node) => (
              <div className={node === 3 ? "platform-flow-new-node opacity-0" : ""} key={node}>
                <div className={`rounded-xl border p-2 ${node === 3 ? "border-[#1275f7]/45 bg-[#1275f7]/[0.05]" : "border-zinc-200 bg-white dark:border-white/10 dark:bg-zinc-950"}`}>
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-mono text-[7px] uppercase tracking-[0.08em] text-zinc-400">TEE node {node}</span>
                    {node === 3 && <span className="text-[7px] font-bold text-[#1275f7]">NEW</span>}
                  </div>
                  <div className="mt-2 grid grid-cols-5 justify-items-center gap-1 sm:gap-1.5">
                    {Array.from({ length: 20 }).map((_, pod) => {
                      const isTarget = node === 2 && pod === 3;
                      const isReady = (node === 1 && (pod === 4 || pod === 14)) || (node === 2 && pod === 15);
                      const isNew = node === 3 && pod === 0;
                      const state = isTarget ? "platform-flow-target" : isNew ? "platform-flow-new-pod" : isReady ? "platform-flow-ready" : node === 3 ? "platform-flow-empty" : "platform-flow-allocated";
                      return <span className={`platform-flow-pod ${state}`} key={pod} />;
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="platform-flow-scaler mt-3 flex flex-wrap items-center justify-center gap-2 border-t border-zinc-200/80 pt-3 text-[8px] dark:border-white/10">
            <strong>FleetAutoscaler</strong>
            <span aria-hidden="true" className="text-zinc-300 dark:text-zinc-700">•</span>
            <strong>Node prescaler</strong>
          </div>
        </div>

        <span aria-hidden="true" className="platform-flow-kernel absolute left-[9%] top-5 z-30" />
        <span aria-hidden="true" className="platform-flow-route absolute left-1/2 top-[8.1rem] z-30 -translate-x-1/2 rounded bg-[#1275f7] px-1.5 py-0.5 font-mono text-[7px] font-bold text-white opacity-0">ROUTED</span>

        <style>{`
          .platform-flow .platform-flow-pod,
          .platform-flow .platform-flow-kernel {
            display: block; height: .55rem; width: .55rem; border-radius: 55% 45% 58% 42%;
            background: currentColor; box-shadow: -.15rem .07rem 0 -.045rem currentColor, .15rem .07rem 0 -.045rem currentColor, 0 -.14rem 0 -.045rem currentColor; transform: rotate(-8deg);
          }
          .platform-flow .platform-flow-kernel { color: rgb(18 117 247); animation: platform-flow-kernel 12s cubic-bezier(.2,.8,.2,1) infinite; }
          .platform-flow .platform-flow-ready { color: rgb(16 185 129); }
          .platform-flow .platform-flow-allocated { color: rgb(245 158 11); opacity: .76; }
          .platform-flow .platform-flow-empty { color: transparent; border: 1px dashed rgba(113,113,122,.25); background: transparent; box-shadow: none; }
          .platform-flow .platform-flow-target { color: rgb(16 185 129); animation: platform-flow-target 12s ease-in-out infinite; }
          .platform-flow .platform-flow-new-node { animation: platform-flow-new-node 12s cubic-bezier(.2,1.1,.3,1) infinite; transform-origin: center bottom; }
          .platform-flow .platform-flow-new-pod { color: rgb(18 117 247); animation: platform-flow-new-pod 12s ease-in-out infinite; }
          .platform-flow .platform-flow-control { animation: platform-flow-control 12s ease-in-out infinite; }
          .platform-flow .platform-flow-pop { animation: platform-flow-pop 12s cubic-bezier(.2,1.4,.3,1) infinite; }
          .platform-flow .platform-flow-pool-2 { animation: platform-flow-pool 12s ease-in-out infinite; }
          .platform-flow .platform-flow-route { animation: platform-flow-route 12s ease-in-out infinite; }
          .platform-flow .platform-flow-scaler { animation: platform-flow-scaler 12s ease-in-out infinite; }
          @keyframes platform-flow-kernel {
            0%, 5% { left: 9%; top: 1.25rem; opacity: 1; transform: rotate(-8deg) scale(.8); }
            18% { left: 49%; top: 1.25rem; opacity: 1; transform: rotate(10deg) scale(1.2); }
            28% { left: 49%; top: 6.5rem; opacity: 1; transform: rotate(-8deg) scale(1); }
            43% { left: 49%; top: 10.25rem; opacity: 1; transform: rotate(8deg) scale(1); }
            51% { left: 55%; top: 15.3rem; opacity: 1; transform: rotate(-8deg) scale(1.25); }
            56%, 100% { left: 55%; top: 15.3rem; opacity: 0; transform: rotate(-8deg) scale(.35); }
          }
          @keyframes platform-flow-control { 0%, 12%, 24%, 100% { box-shadow: none; } 17%, 21% { border-color: rgba(18,117,247,.65); box-shadow: 0 0 18px rgba(18,117,247,.16); } }
          @keyframes platform-flow-pop { 0%, 15%, 24%, 100% { opacity: 0; transform: scale(.4) rotate(-10deg); } 18%, 21% { opacity: 1; transform: scale(1.15) rotate(5deg); } }
          @keyframes platform-flow-pool { 0%, 24%, 40%, 100% { box-shadow: none; } 29%, 36% { box-shadow: 0 0 0 2px rgba(18,117,247,.2), 0 0 22px rgba(18,117,247,.12); } }
          @keyframes platform-flow-route { 0%, 23%, 39%, 100% { opacity: 0; transform: translate(-50%,-4px) scale(.7); } 28%, 35% { opacity: 1; transform: translate(-50%,0) scale(1); } }
          @keyframes platform-flow-target { 0%, 46% { color: rgb(16 185 129); transform: rotate(-8deg) scale(1); } 51%, 96% { color: rgb(245 158 11); transform: rotate(8deg) scale(1.28); filter: drop-shadow(0 0 5px rgba(245,158,11,.45)); } 100% { color: rgb(16 185 129); } }
          @keyframes platform-flow-scaler { 0%, 56% { color: inherit; } 62%, 82% { color: rgb(18 117 247); } 90%, 100% { color: inherit; } }
          @keyframes platform-flow-new-node { 0%, 61% { opacity: 0; transform: translateY(12px) scale(.78,.5); } 68% { opacity: 1; transform: translateY(-3px) scale(1.03,.97); } 73%, 96% { opacity: 1; transform: none; } 100% { opacity: 0; transform: translateY(8px) scale(.85); } }
          @keyframes platform-flow-new-pod { 0%, 68% { opacity: 0; color: rgb(18 117 247); transform: translateY(7px) rotate(-8deg) scale(.3); } 74%, 80% { opacity: 1; color: rgb(18 117 247); transform: translateY(0) rotate(8deg) scale(1.25); } 86%, 96% { opacity: 1; color: rgb(16 185 129); transform: rotate(-8deg) scale(1); } 100% { opacity: 0; } }
          @media (max-width: 639px) { .platform-flow .platform-flow-kernel { display: none; } }
          @media (prefers-reduced-motion: reduce) {
            .platform-flow * { animation: none !important; }
            .platform-flow .platform-flow-kernel, .platform-flow .platform-flow-route { display: none; }
            .platform-flow .platform-flow-new-node, .platform-flow .platform-flow-new-pod { opacity: 1; transform: none; }
            .platform-flow .platform-flow-target { color: rgb(245 158 11); }
          }
        `}</style>
      </div>
    </section>
  );
}

export function ProductionMetricsChart() {
  const maxSessions = Math.max(
    ...productionIntervals.map((interval) => interval.sessions),
  );

  return (
    <DiagramShell>
      <div className="production-commercial relative isolate">
        <div className="production-commercial-header relative overflow-hidden border-b border-zinc-200/80 pb-7 dark:border-white/10">
          <span aria-hidden="true" className="production-commercial-sweep" />
          <div className="relative z-10 flex items-center justify-between gap-5">
            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#1275f7]">
                Live from the last 30 days
              </span>
              <h3 className="mt-1 text-3xl font-black uppercase italic tracking-[-0.04em] sm:text-4xl">
                Production pulse!
              </h3>
              <span className="mt-2 block text-sm text-zinc-500 dark:text-zinc-400">
                Ending Aug 5, 2026
              </span>
            </div>
            <div className="production-commercial-burst flex h-24 w-24 shrink-0 rotate-6 items-center justify-center bg-amber-300 p-4 text-center text-[9px] font-black uppercase leading-3 tracking-[0.05em] text-zinc-950 sm:h-28 sm:w-28 sm:text-[10px]">
              Now with<br />more traffic!
            </div>
          </div>
          <span aria-hidden="true" className="production-commercial-spark production-commercial-spark-1">✦</span>
          <span aria-hidden="true" className="production-commercial-spark production-commercial-spark-2">✦</span>
          <span aria-hidden="true" className="production-commercial-spark production-commercial-spark-3">✦</span>
        </div>

        <dl className="production-commercial-metrics mt-8 grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-3">
          <div>
            <dd className="production-commercial-number m-0 text-4xl font-black text-[#1275f7]">102,859</dd>
            <dt className="mt-1 text-sm font-bold">sessions created</dt>
          </div>
          <div>
            <dd className="production-commercial-number m-0 text-4xl font-black">10,605</dd>
            <dt className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">ended-session hours</dt>
          </div>
          <div className="col-span-2 border-t border-zinc-200/80 pt-5 dark:border-white/10 sm:col-span-1 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
            <dd className="production-commercial-number m-0 text-4xl font-black">2.38</dd>
            <dt className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">sessions per minute</dt>
          </div>
        </dl>

        <div className="production-commercial-stage relative mt-8 overflow-hidden border-y border-[#1275f7]/35 bg-zinc-950 py-7 text-white shadow-[0_0_40px_rgba(18,117,247,0.08)]">
          <div aria-hidden="true" className="production-commercial-stripes" />
          <div aria-hidden="true" className="production-commercial-scanline" />
          <div className="relative z-10 flex items-center justify-between gap-4 px-1 sm:px-3">
            <span className="text-xs font-black uppercase tracking-[0.18em] text-[#3b8cff]">
              Sessions created
            </span>
            <span className="rotate-[-2deg] rounded bg-amber-300 px-2 py-1 font-mono text-[9px] font-black uppercase tracking-[0.08em] text-zinc-950 shadow-[3px_3px_0_#1275f7]">
              Actual results!
            </span>
          </div>

          <div
            aria-label="Sessions created per two-day interval, growing from 2,825 on July 6 to 11,059 on August 3"
            className="relative z-10 mt-5 px-1 sm:px-3"
            role="img"
          >
            <div className="pointer-events-none absolute inset-x-1 top-1/2 border-t border-white/10 sm:inset-x-3" />
            <div className="flex h-56 items-end gap-1.5 border-b border-white/20 sm:gap-3">
              {productionIntervals.map((interval, index) => (
                <div
                  className="group relative flex h-full min-w-0 flex-1 items-end"
                  key={interval.date}
                >
                  <div
                    className={`production-commercial-bar relative z-10 w-full rounded-t ${
                      index === productionIntervals.length - 1
                        ? "bg-[#1275f7] shadow-[0_0_18px_rgba(18,117,247,0.55)]"
                        : "bg-[#1275f7]/60"
                    }`}
                    style={{
                      animationDelay: `${index * 0.06}s`,
                      height: `${Math.round((interval.sessions / maxSessions) * 82)}%`,
                    }}
                  >
                    <span className="sr-only">
                      {interval.date}: {interval.sessions.toLocaleString()} sessions
                    </span>
                  </div>
                  {index === productionIntervals.length - 1 && (
                    <span className="absolute -top-5 right-0 z-20 text-xs font-black text-[#3b8cff]">
                      11,059
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-2 grid grid-cols-6 text-[10px] text-zinc-500 sm:text-xs">
              {[
                ["07/06", "text-left"],
                ["07/12", "text-center"],
                ["07/18", "text-center"],
                ["07/24", "text-center"],
                ["07/30", "text-center"],
                ["08/03", "text-right"],
              ].map(([date, alignment]) => (
                <span className={alignment} key={date}>
                  {date}
                </span>
              ))}
            </div>
          </div>
        </div>

        <p className="mb-0 mt-5 text-sm text-zinc-500 dark:text-zinc-400">
          Traffic grew from 2,825 to 11,059 sessions per interval. Operators are
          standing by.
        </p>

        <style>{`
          .production-commercial-sweep {
            position: absolute;
            inset: -40% 32% -40% -8%;
            transform: skewX(-18deg);
            background: linear-gradient(90deg, transparent, rgba(18,117,247,.08), transparent);
            animation: production-commercial-sweep 4.5s ease-in-out infinite;
          }
          .production-commercial-burst {
            clip-path: polygon(50% 0%,61% 22%,82% 9%,78% 34%,100% 40%,79% 55%,95% 74%,69% 72%,63% 100%,48% 78%,26% 94%,28% 68%,0% 62%,22% 48%,4% 27%,31% 29%);
          }
          .production-commercial-burst { animation: production-commercial-burst 2.4s ease-in-out infinite; }
          .production-commercial-spark {
            position: absolute;
            color: rgb(18 117 247);
            animation: production-commercial-spark 1.8s steps(2,end) infinite;
          }
          .production-commercial-spark-1 { left: 43%; top: 12%; font-size: 1.2rem; }
          .production-commercial-spark-2 { left: 55%; bottom: 18%; font-size: .75rem; animation-delay: .5s; }
          .production-commercial-spark-3 { right: 21%; top: 8%; font-size: .65rem; animation-delay: 1s; }
          .production-commercial-number { animation: production-commercial-number 3.2s ease-in-out infinite; }
          .production-commercial-metrics div:nth-child(2) .production-commercial-number { animation-delay: .25s; }
          .production-commercial-metrics div:nth-child(3) .production-commercial-number { animation-delay: .5s; }
          .production-commercial-scanline {
            position: absolute;
            inset: -25% 0 auto;
            height: 28%;
            pointer-events: none;
            background: linear-gradient(180deg, transparent, rgba(59,140,255,.08), transparent);
            animation: production-commercial-scan 3.6s linear infinite;
          }
          .production-commercial-stripes {
            position: absolute;
            inset: 0;
            pointer-events: none;
            opacity: .16;
            background: repeating-linear-gradient(0deg, transparent 0 3px, rgba(255,255,255,.06) 3px 4px);
          }
          .production-commercial-bar {
            transform-origin: center bottom;
            animation: production-commercial-bar 6s cubic-bezier(.2,.8,.2,1) infinite;
          }
          @keyframes production-commercial-sweep {
            0%, 22% { transform: translateX(-35%) skewX(-18deg); opacity: 0; }
            48% { opacity: 1; }
            76%, 100% { transform: translateX(190%) skewX(-18deg); opacity: 0; }
          }
          @keyframes production-commercial-burst {
            0%, 100% { transform: rotate(6deg) scale(1); }
            50% { transform: rotate(2deg) scale(1.06); }
          }
          @keyframes production-commercial-spark { 0%, 49% { opacity: .2; transform: scale(.7) rotate(0); } 50%, 100% { opacity: 1; transform: scale(1.15) rotate(24deg); } }
          @keyframes production-commercial-number { 0%, 82%, 100% { transform: scale(1); } 88% { transform: scale(1.035); } }
          @keyframes production-commercial-scan { from { transform: translateY(0); } to { transform: translateY(460%); } }
          @keyframes production-commercial-bar {
            0%, 7% { transform: scaleY(.04); opacity: .25; }
            18%, 90% { transform: scaleY(1); opacity: 1; }
            100% { transform: scaleY(.04); opacity: .25; }
          }
          @media (prefers-reduced-motion: reduce) {
            .production-commercial-sweep,
            .production-commercial-burst,
            .production-commercial-spark,
            .production-commercial-number,
            .production-commercial-scanline,
            .production-commercial-bar { animation: none; }
          }
        `}</style>
      </div>
    </DiagramShell>
  );
}
