function LaunchPanel({ children, label, title }: { children: React.ReactNode; label: string; title: string }) {
  return (
    <section className="not-prose my-10 overflow-hidden rounded-[28px] border border-[#1d58a7] bg-[#05255d] p-5 text-white shadow-[0_28px_80px_-45px_rgba(5,37,93,.85)] sm:p-8">
      <span className="font-mono text-[10px] font-bold uppercase tracking-[.18em] text-[#ffd24a]">{label}</span>
      <h3 className="mb-0 mt-2 text-2xl font-black tracking-tight">{title}</h3>
      {children}
    </section>
  );
}

export function LaunchEnclaveAnimation() {
  return (
    <LaunchPanel label="Privacy by hardware" title="Trust, then verify the machine">
      <div className="launch-enclave relative mt-7 overflow-hidden rounded-2xl border border-white/10 bg-[#031a42] p-5" role="img" aria-label="Animated browser session enters an isolated enclave while cloud operator access is blocked and attestation is verified">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-8">
          <div className="rounded-xl border border-red-300/20 bg-red-300/[.06] p-3 text-center">
            <span className="block text-[9px] font-bold uppercase tracking-wider text-red-200">Cloud operator</span>
            <span className="mt-2 block font-mono text-xs text-red-300">READ MEMORY</span>
          </div>
          <div className="relative flex h-28 w-24 items-center justify-center rounded-[1.4rem] border-2 border-[#4b9cff] bg-[#1275f7]/15 shadow-[inset_0_0_30px_rgba(18,117,247,.2)] sm:h-36 sm:w-32">
            <span className="launch-browser rounded-lg border border-white/20 bg-white p-2 text-center text-[8px] font-bold text-[#05255d] shadow-xl sm:text-[10px]">
              <span className="mb-2 block h-1.5 rounded-full bg-[#1275f7]" />PRIVATE<br />BROWSER
            </span>
            <span className="absolute -top-3 rounded-full bg-[#ffd24a] px-2 py-1 text-[8px] font-black text-[#05255d]">TEE</span>
          </div>
          <div className="rounded-xl border border-emerald-300/20 bg-emerald-300/[.06] p-3 text-center">
            <span className="block text-[9px] font-bold uppercase tracking-wider text-emerald-200">Your verifier</span>
            <span className="launch-verified mt-2 block font-mono text-xs text-emerald-300">✓ ATTESTED</span>
          </div>
        </div>
        <span className="launch-probe absolute left-[18%] top-1/2 rounded bg-red-400 px-2 py-1 font-mono text-[8px] font-black text-[#2b0710]">PEEK</span>
        <span className="launch-block absolute left-1/2 top-[64%] -translate-x-1/2 rounded-full bg-[#ffd24a] px-2 py-1 text-[8px] font-black text-[#05255d]">BLOCKED</span>
        <style>{`
          .launch-enclave .launch-probe{animation:launch-probe 4s ease-in-out infinite}.launch-enclave .launch-block{animation:launch-block 4s ease-in-out infinite}.launch-enclave .launch-browser{animation:launch-browser 4s ease-in-out infinite}.launch-enclave .launch-verified{animation:launch-verified 4s ease-in-out infinite}
          @keyframes launch-probe{0%,15%{opacity:0;transform:translateX(-25px)}30%{opacity:1}48%{left:calc(50% - 3.5rem);opacity:1;transform:translateX(0)}60%,100%{left:34%;opacity:0;transform:translate(-18px,18px) rotate(-18deg)}}
          @keyframes launch-block{0%,42%{opacity:0;transform:translate(-50%,8px) scale(.7)}50%,68%{opacity:1;transform:translate(-50%,0) scale(1)}80%,100%{opacity:0;transform:translate(-50%,-5px)}}
          @keyframes launch-browser{0%,45%,100%{box-shadow:0 8px 20px rgba(0,0,0,.25);transform:scale(1)}55%,72%{box-shadow:0 0 30px rgba(75,156,255,.8);transform:scale(1.04)}}
          @keyframes launch-verified{0%,62%{opacity:.25}72%,92%{opacity:1;text-shadow:0 0 16px rgba(110,231,183,.8)}100%{opacity:.25}}
          @media(prefers-reduced-motion:reduce){.launch-enclave *{animation:none!important}.launch-enclave .launch-probe{display:none}.launch-enclave .launch-block{opacity:1}.launch-enclave .launch-verified{opacity:1}}
        `}</style>
      </div>
    </LaunchPanel>
  );
}

export function LaunchHandoffAnimation() {
  return (
    <LaunchPanel label="Human handoff" title="The agent gets stuck. You take the wheel.">
      <div className="launch-handoff relative mt-7 grid grid-cols-[1fr_auto_1fr] items-center gap-3 rounded-2xl border border-white/10 bg-[#031a42] p-5 sm:gap-8" role="img" aria-label="Animated control handoff from an AI agent to a nearby mobile phone">
        <div className="rounded-2xl border border-white/15 bg-white/[.06] p-4 text-center">
          <span className="text-3xl">✦</span><strong className="mt-2 block text-sm">Agent</strong><span className="text-[10px] text-blue-200">2FA detected</span>
        </div>
        <div className="relative h-1 w-14 bg-white/15 sm:w-28"><span className="launch-control absolute -top-3 left-0 rounded-full bg-[#ffd24a] px-2 py-1 text-[8px] font-black text-[#05255d]">CONTROL</span></div>
        <div className="launch-phone mx-auto w-20 rounded-[1.4rem] border-4 border-white bg-zinc-900 p-1 shadow-xl sm:w-24">
          <div className="aspect-[9/15] rounded-[1rem] bg-white p-2 pt-5 text-[#05255d]"><span className="block h-2 rounded bg-blue-100" /><span className="mt-2 block h-7 rounded border-2 border-[#1275f7]" /><span className="mt-2 block rounded bg-[#1275f7] py-1 text-center text-[7px] font-bold text-white">APPROVE</span></div>
        </div>
        <style>{`
          .launch-handoff .launch-control{animation:launch-control 4.5s ease-in-out infinite}.launch-handoff .launch-phone{animation:launch-phone 4.5s ease-in-out infinite}
          @keyframes launch-control{0%,12%{left:-8%;opacity:0}24%{opacity:1}68%,82%{left:72%;opacity:1}100%{left:90%;opacity:0}}
          @keyframes launch-phone{0%,58%,100%{transform:scale(1);box-shadow:0 15px 30px rgba(0,0,0,.35)}68%,84%{transform:scale(1.06);box-shadow:0 0 0 6px rgba(255,210,74,.15),0 0 28px rgba(255,210,74,.45)}}
          @media(prefers-reduced-motion:reduce){.launch-handoff *{animation:none!important}.launch-handoff .launch-control{left:72%;opacity:1}}
        `}</style>
      </div>
    </LaunchPanel>
  );
}

export function LaunchX402Animation() {
  const steps = ["Agent", "USDC · x402", "Nearby fleet", "Browser"];
  return (
    <LaunchPanel label="Hosted fleet" title="One paid request. One ready browser.">
      <div className="launch-x402 relative mt-7 rounded-2xl border border-white/10 bg-[#031a42] p-5" role="img" aria-label="Animated keyless x402 payment request allocates a nearby ready browser">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {steps.map((step, index) => <div className="relative rounded-xl border border-white/15 bg-white/[.06] px-3 py-4 text-center" key={step}><span className="font-mono text-[9px] text-blue-200">0{index + 1}</span><strong className="mt-1 block text-xs">{step}</strong>{index === 3 && <span className="launch-ready mt-2 block text-[9px] font-bold text-emerald-300">● READY</span>}</div>)}
        </div>
        <span className="launch-coin absolute left-[10%] top-[67%] z-10 rounded-full border-2 border-[#fff0a8] bg-[#ffd24a] px-2 py-1 font-mono text-[9px] font-black text-[#05255d]">$0.01</span>
        <div className="mt-5 flex items-center justify-between font-mono text-[9px] text-blue-200"><span>NO SIGNUP</span><span>NO API KEY</span><span>460 MS MEDIAN</span></div>
        <style>{`
          .launch-x402 .launch-coin{animation:launch-coin 4.8s ease-in-out infinite}.launch-x402 .launch-ready{animation:launch-ready 4.8s ease-in-out infinite}
          @keyframes launch-coin{0%,10%{left:10%;opacity:0;transform:scale(.7)}20%{opacity:1}72%{left:83%;opacity:1;transform:scale(1) rotate(360deg)}86%,100%{left:86%;opacity:0;transform:scale(.6) rotate(420deg)}}
          @keyframes launch-ready{0%,68%{opacity:.2}76%,94%{opacity:1;text-shadow:0 0 14px rgba(110,231,183,.9)}100%{opacity:.2}}
          @media(prefers-reduced-motion:reduce){.launch-x402 *{animation:none!important}.launch-x402 .launch-coin{left:47%;opacity:1}.launch-x402 .launch-ready{opacity:1}}
        `}</style>
      </div>
    </LaunchPanel>
  );
}
