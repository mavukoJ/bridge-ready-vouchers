import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, AlertTriangle, Clock, Smartphone, Users, Wallet, Timer, Sparkles, X, GraduationCap } from "lucide-react";
import { PROFESSIONS, SAMPLES, SEED_VOUCHERS, readiness, rand, usd, type Voucher, type Module } from "@/lib/bridgefund";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "BridgeFund — Bridge skills to certified careers" },
    { name: "description", content: "Find local licensing gaps and unlock micro-grant vouchers for bridging exams. SDG 4 & 8." },
    { property: "og:title", content: "BridgeFund — Bridge skills to certified careers" },
    { property: "og:description", content: "Find local licensing gaps and unlock micro-grant vouchers for bridging exams." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: App,
});

type Profile = { name: string; profession: string; years: number; country: string; skills: string[] };
const blank: Profile = { name: "", profession: "nurse", years: 2, country: "", skills: [] };

function useStored<T>(key: string, init: T) {
  const [v, setV] = useState<T>(init);
  useEffect(() => { const s = localStorage.getItem(key); if (s) setV(JSON.parse(s)); }, [key]);
  const set = (n: T) => { setV(n); localStorage.setItem(key, JSON.stringify(n)); };
  return [v, set] as const;
}

function App() {
  const [role, setRole] = useState<"candidate" | "sponsor">("candidate");
  const [profile, setProfile] = useStored<Profile>("bf-profile", blank);
  const [funded, setFunded] = useStored<string[]>("bf-funded", []);
  const [vouchers, setVouchers] = useStored<Voucher[]>("bf-vouchers", SEED_VOUCHERS);
  const [step, setStep] = useState(1);
  const [applying, setApplying] = useState<Module | null>(null);

  const prof = PROFESSIONS.find((p) => p.id === profile.profession)!;
  const score = readiness(prof, profile.skills, funded);

  const load = (s: (typeof SAMPLES)[number]) => { setProfile({ name: s.name, profession: s.profession, years: s.years, country: s.country, skills: s.skills }); setFunded([]); setStep(2); };

  return (
    <div className="min-h-screen bg-muted/40">
      <header className="sticky top-0 z-30 border-b bg-card/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground"><GraduationCap className="size-5" /></div>
            <span className="font-display text-xl font-bold">BridgeFund</span>
            <span className="hidden rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary sm:inline">SDG 4 & 8 Impact</span>
          </div>
          <div className="flex rounded-full border bg-muted p-1 text-sm font-medium">
            {(["candidate", "sponsor"] as const).map((r) => (
              <button key={r} onClick={() => setRole(r)} className={`rounded-full px-3 py-1.5 transition ${role === r ? "bg-card text-primary shadow-sm" : "text-muted-foreground"}`}>
                {r === "candidate" ? "Candidate View" : "Sponsor/Evaluator View"}
              </button>
            ))}
          </div>
        </div>
      </header>

      {role === "sponsor" ? <Sponsor vouchers={vouchers} /> : (
        <main className="mx-auto max-w-6xl space-y-8 px-4 py-8">
          <section className="rounded-2xl bg-hero p-6 text-primary-foreground sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-wider opacity-80">Skills recognition × micro-grants</p>
            <h1 className="mt-2 max-w-2xl font-display text-3xl font-bold leading-tight sm:text-5xl">Turn Unrecognized Skills into Certified Careers.</h1>
            <p className="mt-3 max-w-xl opacity-90">See exactly which local licensing modules you're missing — and get them funded instantly via M-Pesa.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {SAMPLES.map((s) => <button key={s.label} onClick={() => load(s)} className="rounded-full bg-primary-foreground/15 px-4 py-2 text-sm font-medium ring-1 ring-primary-foreground/30 hover:bg-primary-foreground/25">⚡ {s.label}</button>)}
              <button onClick={() => { setProfile(blank); setFunded([]); setStep(1); }} className="rounded-full bg-card px-4 py-2 text-sm font-semibold text-primary">+ Enter custom skills</button>
            </div>
          </section>

          <div className="flex gap-2">
            {["Skill Intake", "Gap Roadmap", "Vouchers"].map((l, i) => (
              <button key={l} onClick={() => setStep(i + 1)} className={`flex-1 rounded-xl border px-3 py-2.5 text-left text-sm font-medium ${step === i + 1 ? "border-primary bg-card text-primary shadow-sm" : "bg-card/60 text-muted-foreground"}`}>
                <span className="mr-2 text-xs">Step {i + 1}</span><span className="hidden sm:inline">{l}</span>
              </button>
            ))}
          </div>

          {step === 1 && <Intake profile={profile} setProfile={(p) => { setProfile(p); }} onNext={() => setStep(2)} />}
          {step >= 2 && (
            <section className="space-y-6">
              <div className="rounded-2xl border bg-card p-6">
                <div className="flex items-end justify-between">
                  <div><p className="text-sm text-muted-foreground">{profile.name || "Candidate"} · {prof.title}</p><h2 className="font-display text-2xl font-bold">Readiness Score</h2></div>
                  <span className="font-display text-4xl font-bold text-primary">{score}%</span>
                </div>
                <div className="mt-4 h-3 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary transition-all duration-700" style={{ width: `${score}%` }} /></div>
                {score === 100 && <p className="mt-3 text-sm font-medium text-primary">🎉 Fully bridged — all modules funded!</p>}
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-primary/30 bg-card p-5">
                  <h3 className="mb-3 flex items-center gap-2 font-semibold text-primary"><CheckCircle2 className="size-5" />Verified Competencies (Matched)</h3>
                  <ul className="space-y-2">{prof.competencies.filter((c) => profile.skills.includes(c)).map((c) => <li key={c} className="rounded-lg bg-primary/10 px-3 py-2 text-sm">{c}</li>)}</ul>
                </div>
                <div className="rounded-2xl border border-warning/40 bg-card p-5">
                  <h3 className="mb-3 flex items-center gap-2 font-semibold text-warning-foreground"><AlertTriangle className="size-5 text-warning" />Required Bridging Modules (Missing)</h3>
                  <ul className="space-y-3">
                    {prof.competencies.filter((c) => !profile.skills.includes(c)).map((c) => <li key={c} className="rounded-lg border border-dashed border-warning/50 px-3 py-2 text-sm text-muted-foreground">Practical gap: {c} (covered in bridging)</li>)}
                    {prof.modules.map((m) => {
                      const f = funded.includes(m.id);
                      return (
                        <li key={m.id} className={`rounded-xl border p-3 ${f ? "border-primary/40 bg-primary/5" : "border-warning/40 bg-warning/10"}`}>
                          <p className="font-medium">{m.name}</p>
                          <p className="mt-1 flex items-center gap-3 text-xs text-muted-foreground"><span className="flex items-center gap-1"><Clock className="size-3" />{m.weeks} Week{m.weeks > 1 && "s"}</span><span>KES {m.kes.toLocaleString()} · ${usd(m.kes)}</span></p>
                          {f ? <span className="mt-2 inline-block rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground">✓ Funded & In Progress</span>
                            : <button onClick={() => { setStep(3); setApplying(m); }} className="mt-2 rounded-lg bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Apply for Bridging Voucher</button>}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </section>
          )}
        </main>
      )}

      {applying && <VoucherModal mod={applying} candidate={profile.name || "Custom Candidate"} onClose={() => setApplying(null)}
        onDone={(v) => {
          setVouchers([v, ...vouchers]);
          // Funding a module also covers its practical gap so score reaches 100% when all funded
          const nf = [...funded, applying.id]; setFunded(nf);
          if (prof.modules.every((m) => nf.includes(m.id))) setProfile({ ...profile, skills: prof.competencies });
        }} />}
    </div>
  );
}

function Intake({ profile, setProfile, onNext }: { profile: Profile; setProfile: (p: Profile) => void; onNext: () => void }) {
  const prof = PROFESSIONS.find((p) => p.id === profile.profession)!;
  const input = "mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring";
  return (
    <section className="rounded-2xl border bg-card p-6">
      <h2 className="font-display text-2xl font-bold">Skill & Experience Intake</h2>
      <p className="text-sm text-muted-foreground">No paper certificate required — tick what you can do in practice.</p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium">Full name<input className={input} value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} placeholder="e.g. Amina Wanjiru" /></label>
        <label className="text-sm font-medium">Trade / profession
          <select className={input} value={profile.profession} onChange={(e) => setProfile({ ...profile, profession: e.target.value, skills: [] })}>{PROFESSIONS.map((p) => <option key={p.id} value={p.id}>{p.title}</option>)}</select></label>
        <label className="text-sm font-medium">Years of experience: {profile.years}<input type="range" min={0} max={20} value={profile.years} onChange={(e) => setProfile({ ...profile, years: +e.target.value })} className="mt-3 w-full accent-primary" /></label>
        <label className="text-sm font-medium">Country of training<input className={input} value={profile.country} onChange={(e) => setProfile({ ...profile, country: e.target.value })} placeholder="e.g. Uganda / Self-taught" /></label>
      </div>
      <p className="mt-6 text-sm font-semibold">Practical competencies</p>
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        {prof.competencies.map((c) => { const on = profile.skills.includes(c); return (
          <button key={c} onClick={() => setProfile({ ...profile, skills: on ? profile.skills.filter((s) => s !== c) : [...profile.skills, c] })}
            className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 text-left text-sm ${on ? "border-primary bg-primary/10" : "hover:bg-muted"}`}>
            <CheckCircle2 className={`size-4 ${on ? "text-primary" : "text-muted-foreground/40"}`} />{c}</button>); })}
      </div>
      <button onClick={onNext} className="mt-6 rounded-lg bg-primary px-5 py-2.5 font-semibold text-primary-foreground hover:bg-primary/90">Analyse my gaps →</button>
    </section>
  );
}

function QR({ seed }: { seed: string }) {
  const cells = useMemo(() => { let h = 0; for (const c of seed) h = (h * 31 + c.charCodeAt(0)) >>> 0;
    return Array.from({ length: 441 }, (_, i) => { const x = i % 21, y = Math.floor(i / 21);
      const finder = (a: number, b: number) => x >= a && x < a + 7 && y >= b && y < b + 7 && (x === a || x === a + 6 || y === b || y === b + 6 || (x > a + 1 && x < a + 5 && y > b + 1 && y < b + 5));
      if ((x < 8 && y < 8) || (x > 12 && y < 8) || (x < 8 && y > 12)) return finder(0, 0) || finder(14, 0) || finder(0, 14);
      h = (h * 1103515245 + 12345) >>> 0; return (h >> 16) % 2 === 0; }); }, [seed]);
  return <svg viewBox="0 0 21 21" className="size-28 rounded-lg bg-card p-1.5 text-foreground ring-1 ring-border">{cells.map((on, i) => on && <rect key={i} x={i % 21} y={Math.floor(i / 21)} width={1} height={1} fill="currentColor" />)}</svg>;
}

function VoucherModal({ mod, candidate, onClose, onDone }: { mod: Module; candidate: string; onClose: () => void; onDone: (v: Voucher) => void }) {
  const [phone, setPhone] = useState("0712 345 678");
  const [stage, setStage] = useState<"form" | "processing" | "done">("form");
  const [v, setV] = useState<Voucher | null>(null);
  const submit = () => { setStage("processing"); setTimeout(() => {
    const nv: Voucher = { code: `BF-${rand(4)}-${Math.floor(Math.random() * 90 + 10)}`, candidate, module: mod.name, kes: mod.kes, phone: phone.replace(/\s/g, "").replace(/(\d{4})\d{3}(\d+)/, "$1***$2"), receipt: `SK${rand(8)}`, at: Date.now() };
    setV(nv); onDone(nv); setStage("done"); }, 1800); };
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/50 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl bg-card p-6 shadow-2xl">
        <button onClick={onClose} className="absolute right-4 top-4 text-muted-foreground"><X className="size-5" /></button>
        {stage === "form" && <>
          <p className="text-xs font-semibold uppercase text-primary">Micro-grant application</p>
          <h3 className="mt-1 font-display text-xl font-bold">{mod.name}</h3>
          <p className="text-sm text-muted-foreground">Voucher value: KES {mod.kes.toLocaleString()} (${usd(mod.kes)})</p>
          <label className="mt-5 block text-sm font-medium">M-Pesa phone number
            <div className="mt-1 flex items-center gap-2 rounded-lg border px-3 py-2"><Smartphone className="size-4 text-primary" /><input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-transparent text-sm outline-none" /></div></label>
          <button onClick={submit} disabled={phone.replace(/\D/g, "").length < 9} className="mt-5 w-full rounded-lg bg-primary py-2.5 font-semibold text-primary-foreground disabled:opacity-50">Request instant approval</button>
        </>}
        {stage === "processing" && <div className="py-10 text-center"><div className="mx-auto size-12 animate-spin rounded-full border-4 border-primary/20 border-t-primary" /><p className="mt-4 font-medium">Verifying eligibility & sending via M-Pesa…</p></div>}
        {stage === "done" && v && <div className="text-center">
          <CheckCircle2 className="mx-auto size-12 text-primary" />
          <h3 className="mt-2 font-display text-xl font-bold">Voucher Approved!</h3>
          <div className="mt-4 rounded-xl bg-mpesa p-4 text-left text-sm text-primary-foreground">
            <p className="font-mono"><b>{v.receipt}</b> Confirmed. KES {v.kes.toLocaleString()}.00 sent to {v.candidate} {v.phone} for {v.module} on {new Date(v.at).toLocaleString()}. Voucher: {v.code}</p>
          </div>
          <div className="mt-4 flex items-center justify-center gap-4"><QR seed={v.code} /><div className="text-left"><p className="text-xs text-muted-foreground">Voucher code</p><p className="font-mono text-lg font-bold">{v.code}</p><p className="text-xs text-primary">Status: Funded & In Progress</p></div></div>
          <button onClick={onClose} className="mt-5 w-full rounded-lg bg-primary py-2.5 font-semibold text-primary-foreground">Back to roadmap</button>
        </div>}
      </div>
    </div>
  );
}

function Sponsor({ vouchers }: { vouchers: Voucher[] }) {
  const total = vouchers.reduce((s, v) => s + v.kes, 0);
  const people = new Set(vouchers.map((v) => v.candidate)).size;
  const stats = [
    { icon: Users, label: "Candidates bridged", value: (1240 + people).toLocaleString() },
    { icon: Wallet, label: "Micro-grants disbursed", value: `KES ${(18_450_000 + total).toLocaleString()}`, sub: `≈ $${usd(18_450_000 + total)}` },
    { icon: Timer, label: "Avg. time-to-certification", value: "5.2 weeks" },
    { icon: Sparkles, label: "Vouchers issued", value: (3120 + vouchers.length).toLocaleString() },
  ];
  return (
    <main className="mx-auto max-w-6xl space-y-6 px-4 py-8">
      <div><h1 className="font-display text-3xl font-bold">Sponsor Impact Dashboard</h1><p className="text-muted-foreground">Live view of bridging grants advancing SDG 4 (Quality Education) & SDG 8 (Decent Work).</p></div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => <div key={s.label} className="rounded-2xl border bg-card p-5"><s.icon className="size-5 text-primary" /><p className="mt-3 text-sm text-muted-foreground">{s.label}</p><p className="font-display text-2xl font-bold">{s.value}</p>{s.sub && <p className="text-xs text-muted-foreground">{s.sub}</p>}</div>)}
      </div>
      <div className="overflow-hidden rounded-2xl border bg-card">
        <div className="flex items-center justify-between border-b px-5 py-3"><h2 className="font-semibold">Recently issued bridging vouchers</h2><span className="flex items-center gap-1.5 text-xs font-medium text-primary"><span className="size-2 animate-pulse rounded-full bg-primary" />Live</span></div>
        <div className="divide-y">{vouchers.map((v) => (
          <div key={v.code} className="grid gap-1 px-5 py-3 text-sm sm:grid-cols-[1fr_1.5fr_auto_auto] sm:items-center sm:gap-4">
            <div><p className="font-medium">{v.candidate}</p><p className="font-mono text-xs text-muted-foreground">{v.code}</p></div>
            <p className="text-muted-foreground">{v.module}</p>
            <p className="font-semibold">KES {v.kes.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">{new Date(v.at).toLocaleString()}</p>
          </div>))}</div>
      </div>
    </main>
  );
}
