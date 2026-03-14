"use client";

import Link from "next/link";
import DexfluenceLogo from "@/components/DexfluenceLogo";

/* ── design tokens ── */
const C = {
  accent:   "#7B6EF6",
  accent2:  "#3ecfcf",
  muted:    "#7a7a96",
  dim:      "#3a3a55",
  text:     "#f0f0f8",
  bg:       "#060608",
  bg2:      "#0d0d12",
  surface:  "#1a1a26",
  border:   "rgba(255,255,255,0.07)",
  borderHi: "rgba(255,255,255,0.14)",
  head:     "'Space Grotesk', sans-serif",
  body:     "'Instrument Sans', sans-serif",
};

const gradPurple = "linear-gradient(135deg,#fff 40%,#7B6EF6 100%)";
const gradCyan   = "linear-gradient(135deg,#3ecfcf,#7B6EF6)";

function gradText(g: string): React.CSSProperties {
  return { background: g, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" };
}

/* ════════════════════════════════════════
   NAV
════════════════════════════════════════ */
function Nav() {
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "1rem 2.5rem",
      background: "rgba(6,6,8,0.88)",
      backdropFilter: "blur(18px)",
      borderBottom: `0.5px solid ${C.border}`,
    }}>
      <DexfluenceLogo variant="horizontal" size={1} />
      <ul style={{ display: "flex", gap: "2rem", listStyle: "none", margin: 0, padding: 0 }}>
        {[["How it works","#how"],["Features","#features"],["Pricing","#pricing"]].map(([label, href]) => (
          <li key={label}>
            <Link href={href} style={{ color: C.muted, textDecoration: "none", fontSize: 14, fontFamily: C.body }}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/signup">
        <button style={{ background: C.accent, color: "#fff", border: "none", cursor: "pointer", padding: "0.55rem 1.4rem", borderRadius: 8, fontFamily: C.body, fontSize: 14, fontWeight: 500 }}>
          Start free →
        </button>
      </Link>
    </nav>
  );
}

/* ════════════════════════════════════════
   TICKER
════════════════════════════════════════ */
const TICKER_ITEMS = [
  "Script Generation","Viral Hook Engine","Image Synthesis","Video Assembly",
  "Trend Radar","Auto-Publish","Swarm Campaigns","Analytics AI","Self-Learning Engine",
];

function Ticker() {
  const all = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div style={{ overflow: "hidden", borderTop: `0.5px solid ${C.border}`, borderBottom: `0.5px solid ${C.border}`, padding: "1rem 0", background: C.bg2 }}>
      <div style={{ display: "flex", gap: "4rem", whiteSpace: "nowrap", animation: "ticker 22s linear infinite" }}>
        {all.map((item, i) => (
          <span key={i} style={{ fontSize: 13, color: C.muted, fontFamily: C.head, fontWeight: 600, letterSpacing: "0.04em", flexShrink: 0 }}>
            <span style={{ color: C.accent, marginRight: "0.5rem" }}>✦</span>{item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   PIPELINE
════════════════════════════════════════ */
const PIPELINE = [
  { icon: "💡", name: "Topic",     desc: "Any idea or trend" },
  { icon: "✍️", name: "Script AI", desc: "Viral hooks & copy" },
  { icon: "🖼️", name: "Image AI",  desc: "Visual generation"  },
  { icon: "🎬", name: "Video AI",  desc: "Auto-assembled"     },
  { icon: "🚀", name: "Publish",   desc: "All platforms"      },
];

function Pipeline() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: "0.5rem", margin: "3rem 0" }}>
      {PIPELINE.map((step, i) => (
        <div key={step.name} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div style={{ background: C.surface, border: `0.5px solid ${C.borderHi}`, borderRadius: 12, padding: "1.2rem 1.4rem", textAlign: "center", minWidth: 120 }}>
            <span style={{ fontSize: 22, display: "block", marginBottom: "0.5rem" }}>{step.icon}</span>
            <div style={{ fontFamily: C.head, fontSize: 13, fontWeight: 700, color: C.text }}>{step.name}</div>
            <div style={{ fontSize: 11, color: C.muted, marginTop: 3 }}>{step.desc}</div>
          </div>
          {i < PIPELINE.length - 1 && (
            <span style={{ color: C.dim, fontSize: 18, flexShrink: 0 }}>→</span>
          )}
        </div>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════
   TERMINAL
════════════════════════════════════════ */
function Terminal() {
  return (
    <div style={{ background: "#0a0a10", border: `0.5px solid ${C.borderHi}`, borderRadius: 14, overflow: "hidden", marginTop: "3rem", fontFamily: "'Courier New', monospace" }}>
      <div style={{ background: C.surface, padding: "0.7rem 1rem", display: "flex", alignItems: "center", gap: 6, borderBottom: `0.5px solid ${C.border}` }}>
        {["#ff5f57","#febc2e","#28c840"].map(bg => (
          <div key={bg} style={{ width: 10, height: 10, borderRadius: "50%", background: bg }} />
        ))}
        <span style={{ fontSize: 12, color: C.muted, marginLeft: "0.5rem", fontFamily: C.body }}>dexfluence — swarm campaign</span>
      </div>
      <div style={{ padding: "1.5rem", fontSize: 13, lineHeight: 1.9 }}>
        <div style={{ color: "#4a4a6a" }}>$ dexfluence run --topic "AI productivity hacks" --count 20</div>
        <br />
        <div style={{ color: C.accent2 }}>✓ Trend Radar detected spike · score 94/100</div>
        <div style={{ color: "#a79fff" }}>→ Generating 20 unique hooks...</div>
        <div style={{ color: "#a79fff" }}>→ scriptWorker × 5 · imageWorker × 5 · videoWorker × 5</div>
        <div style={{ color: "#fabb56" }}>⚡ Swarm launched · 20 parallel jobs queued</div>
        <br />
        <div style={{ color: "#e0e0f0" }}>&nbsp;&nbsp;[████████████████████] 20/20 videos rendered</div>
        <br />
        <div style={{ color: C.accent2 }}>✓ Published → Instagram (20) · TikTok (20) · YouTube (20)</div>
        <div style={{ color: C.accent2 }}>✓ Campaign complete in 4m 32s</div>
        <br />
        <div style={{ color: "#4a4a6a" }}>Total reach estimated: 120,000+ · Viral score avg: 81</div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   FEATURES
════════════════════════════════════════ */
const FEATURES = [
  { icon: "🧠", title: "Viral Hook Engine",  bg: "rgba(123,110,246,0.15)", desc: "Generates, scores, and selects the highest-converting hook for every piece of content before a single frame is rendered." },
  { icon: "📡", title: "Trend Radar",         bg: "rgba(62,207,207,0.12)",  desc: "Continuously scans TikTok, Instagram, YouTube, Reddit, and Google Trends. Launches campaigns the moment a spike is detected." },
  { icon: "🐝", title: "Swarm Engine",        bg: "rgba(240,98,146,0.12)",  desc: "One campaign spawns 20–50 parallel jobs across distributed workers. Publish an entire content library in minutes, not days." },
  { icon: "🔁", title: "Self-Learning AI",    bg: "rgba(239,159,39,0.12)",  desc: "Every video feeds performance data back into the system. Hooks, scripts, and formats that underperform are automatically de-ranked." },
  { icon: "📊", title: "Analytics Dashboard", bg: "rgba(99,153,34,0.12)",   desc: "Track views, engagement, watch time, and viral score per video — with AI-generated insights on what to produce next." },
  { icon: "📤", title: "Omni-Publishing",     bg: "rgba(55,138,221,0.12)",  desc: "Auto-publish to Instagram Reels, TikTok, and YouTube Shorts simultaneously — with platform-native formatting and scheduling." },
];

/* ════════════════════════════════════════
   PRICING
════════════════════════════════════════ */
interface PlanData { name: string; price: string; desc: string; features: string[]; cta: string; featured?: boolean; }

const PLANS: PlanData[] = [
  { name: "Starter", price: "$29",  cta: "Get started",  desc: "For solo creators ready to scale.",      features: ["50 videos per month","3 social platforms","Viral Hook Engine","Basic analytics","Email support"] },
  { name: "Pro",     price: "$99",  cta: "Start Pro →",  desc: "For brands & growing agencies.",         features: ["500 videos per month","All platforms + scheduling","Swarm campaigns (up to 50)","Trend Radar automation","Self-learning engine","Advanced analytics","Priority support"], featured: true },
  { name: "Agency",  price: "$299", cta: "Contact us",   desc: "For agencies running multiple brands.",   features: ["Unlimited videos","10 brand workspaces","Custom swarm sizes","White-label dashboard","API access","Dedicated account manager"] },
];

function PlanCard({ plan }: { plan: PlanData }) {
  return (
    <div style={{ background: plan.featured ? C.surface : C.bg2, border: `0.5px solid ${plan.featured ? C.accent : C.borderHi}`, borderRadius: 16, padding: "2rem", boxShadow: plan.featured ? "0 0 40px rgba(123,110,246,0.2)" : "none", display: "flex", flexDirection: "column" }}>
      {plan.featured && (
        <span style={{ display: "inline-block", alignSelf: "flex-start", background: C.accent, color: "#fff", fontSize: 11, fontWeight: 600, padding: "0.25rem 0.7rem", borderRadius: 100, marginBottom: "1rem", letterSpacing: "0.05em" }}>Most Popular</span>
      )}
      <div style={{ fontFamily: C.head, fontSize: "1.1rem", fontWeight: 700 }}>{plan.name}</div>
      <div style={{ fontFamily: C.head, fontSize: "2.5rem", fontWeight: 700, lineHeight: 1, margin: "0.8rem 0 0.3rem" }}>
        {plan.price}<span style={{ fontSize: "1rem", color: C.muted, fontWeight: 400 }}>/mo</span>
      </div>
      <div style={{ color: C.muted, fontSize: "0.85rem", marginBottom: "1.5rem" }}>{plan.desc}</div>
      <hr style={{ border: "none", borderTop: `0.5px solid ${C.border}`, margin: "1.2rem 0" }} />
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem", flex: 1 }}>
        {plan.features.map(f => (
          <li key={f} style={{ fontSize: "0.88rem", color: C.muted, display: "flex", gap: 8, alignItems: "flex-start" }}>
            <span style={{ color: C.accent2, fontWeight: 700, flexShrink: 0, marginTop: 2 }}>✓</span>{f}
          </li>
        ))}
      </ul>
      <button style={{ width: "100%", marginTop: "1.8rem", padding: "0.8rem", borderRadius: 9, border: `0.5px solid ${plan.featured ? C.accent : C.borderHi}`, background: plan.featured ? C.accent : "transparent", color: "#fff", fontFamily: C.body, fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
        {plan.cta}
      </button>
    </div>
  );
}

/* ════════════════════════════════════════
   LABEL
════════════════════════════════════════ */
function Label({ children }: { children: string }) {
  return <div style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: C.accent, fontWeight: 600, marginBottom: "1rem" }}>{children}</div>;
}

/* ════════════════════════════════════════
   PAGE
════════════════════════════════════════ */
export default function HomePage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Instrument+Sans:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #060608; color: #f0f0f8; font-family: 'Instrument Sans', sans-serif; font-size: 16px; line-height: 1.7; overflow-x: hidden; }
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes pulse  { 0%,100% { opacity:1; } 50% { opacity:0.3; } }
        a { color: inherit; text-decoration: none; }
        button { font-family: 'Instrument Sans', sans-serif; }
      `}</style>

      <Nav />

      {/* ── HERO ── */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "8rem 2rem 5rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -120, left: "50%", transform: "translateX(-50%)", width: 700, height: 500, borderRadius: "50%", background: "radial-gradient(ellipse,rgba(123,110,246,0.18) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: 0, left: "20%", width: 400, height: 300, borderRadius: "50%", background: "radial-gradient(ellipse,rgba(62,207,207,0.08) 0%,transparent 70%)", pointerEvents: "none" }} />

        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(123,110,246,0.12)", border: "0.5px solid rgba(123,110,246,0.4)", borderRadius: 100, padding: "0.4rem 1rem", fontSize: 12, fontWeight: 500, color: "#a79fff", marginBottom: "2rem", letterSpacing: "0.04em" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.accent, animation: "pulse 2s infinite", display: "inline-block" }} />
          AI-Native Content Platform · Now in Beta
        </div>

        <h1 style={{ fontFamily: C.head, fontSize: "clamp(2.8rem,6vw,5.2rem)", fontWeight: 700, lineHeight: 1.06, letterSpacing: "-0.03em", maxWidth: 900, margin: "0 auto 1.5rem" }}>
          <span style={gradText(gradPurple)}>One topic.<br />50 viral videos.</span>
          <br />
          <span style={gradText(gradCyan)}>Fully automated.</span>
        </h1>

        <p style={{ color: C.muted, fontSize: "1.15rem", maxWidth: 560, margin: "0 auto 2.5rem", fontWeight: 300, lineHeight: 1.8 }}>
          Dexfluence is the AI content factory that turns a single idea into a swarm of short-form videos — scripted, produced, and published automatically across Instagram, TikTok &amp; YouTube Shorts.
        </p>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button style={{ background: C.accent, color: "#fff", border: "none", cursor: "pointer", padding: "0.85rem 2rem", borderRadius: 10, fontSize: 15, fontWeight: 500, boxShadow: "0 0 30px rgba(123,110,246,0.35)" }}>
            Launch your first campaign →
          </button>
          <button style={{ background: "transparent", color: C.text, border: `0.5px solid ${C.borderHi}`, cursor: "pointer", padding: "0.85rem 2rem", borderRadius: 10, fontSize: 15, fontWeight: 400 }}>
            Watch demo
          </button>
        </div>

        <div style={{ display: "flex", gap: "3rem", justifyContent: "center", marginTop: "4rem", flexWrap: "wrap" }}>
          {[["50×","Content Output"],["< 5 min","Campaign to Publish"],["3","Platforms Covered"],["∞","Scalable Workers"]].map(([num, label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <span style={{ fontFamily: C.head, fontSize: "2rem", fontWeight: 700, display: "block" }}>{num}</span>
              <span style={{ fontSize: 12, color: C.muted, letterSpacing: "0.06em", textTransform: "uppercase" }}>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <Ticker />

      {/* ── PIPELINE ── */}
      <section id="how" style={{ padding: "6rem 2rem", maxWidth: 1100, margin: "0 auto" }}>
        <Label>The Engine</Label>
        <h2 style={{ fontFamily: C.head, fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "1rem" }}>
          Your content, <span style={gradText(gradCyan)}>on autopilot</span>
        </h2>
        <p style={{ color: C.muted, fontSize: "1.05rem", maxWidth: 520, marginBottom: "3rem" }}>
          Drop a topic. Dexfluence handles every step from script to publish — automatically, in parallel, at scale.
        </p>
        <Pipeline />
        <Terminal />
      </section>

      {/* ── FEATURES ── */}
      <section id="features" style={{ padding: "6rem 2rem", maxWidth: 1100, margin: "0 auto" }}>
        <Label>Capabilities</Label>
        <h2 style={{ fontFamily: C.head, fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "1rem" }}>
          Everything a content team does —{" "}
          <span style={gradText(gradPurple)}>without the team</span>
        </h2>
        <p style={{ color: C.muted, fontSize: "1.05rem", maxWidth: 520, marginBottom: "3rem" }}>Six intelligence layers working in concert, 24/7.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "1.5px", background: C.border, borderRadius: 16, overflow: "hidden", border: `0.5px solid ${C.border}` }}>
          {FEATURES.map(f => (
            <div key={f.title} style={{ background: C.bg2, padding: "2rem" }}>
              <div style={{ width: 42, height: 42, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, marginBottom: "1.2rem", background: f.bg }}>{f.icon}</div>
              <h3 style={{ fontFamily: C.head, fontSize: "1.05rem", fontWeight: 600, marginBottom: "0.5rem", color: C.text }}>{f.title}</h3>
              <p style={{ color: C.muted, fontSize: "0.9rem", lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: "6rem 2rem", maxWidth: 1100, margin: "0 auto" }}>
        <Label>How It Works</Label>
        <h2 style={{ fontFamily: C.head, fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "3rem" }}>
          From zero to viral <span style={gradText(gradCyan)}>in 4 steps</span>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "2rem" }}>
          {[
            { num: "01", title: "Connect your brand",         desc: "Add your brand voice, niche, and social accounts. Done once, used forever." },
            { num: "02", title: "Set a topic or let AI pick", desc: "Enter any topic manually, or let Trend Radar surface what's spiking right now." },
            { num: "03", title: "Launch the swarm",            desc: "Hit generate. Dozens of AI workers produce unique videos in parallel — no queue, no wait." },
            { num: "04", title: "Watch the analytics",         desc: "Dexfluence publishes, tracks, and learns — automatically improving your next campaign." },
          ].map(s => (
            <div key={s.num}>
              <div style={{ fontFamily: C.head, fontSize: "3.5rem", fontWeight: 700, color: C.dim, lineHeight: 1, marginBottom: "0.5rem" }}>{s.num}</div>
              <h3 style={{ fontFamily: C.head, fontSize: "1rem", fontWeight: 600, marginBottom: "0.4rem", color: C.text }}>{s.title}</h3>
              <p style={{ color: C.muted, fontSize: "0.88rem" }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" style={{ padding: "6rem 2rem", maxWidth: 1100, margin: "0 auto" }}>
        <Label>Pricing</Label>
        <h2 style={{ fontFamily: C.head, fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "1rem" }}>
          Simple pricing. <span style={gradText(gradPurple)}>Serious output.</span>
        </h2>
        <p style={{ color: C.muted, fontSize: "1.05rem", maxWidth: 520, marginBottom: "3rem" }}>Start free. Scale when you're ready. No contracts.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "1.5rem" }}>
          {PLANS.map(p => <PlanCard key={p.name} plan={p} />)}
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <div style={{ textAlign: "center", padding: "7rem 2rem", background: C.bg2, borderTop: `0.5px solid ${C.border}`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 400, borderRadius: "50%", background: "radial-gradient(ellipse,rgba(123,110,246,0.14) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <Label>Get Started Today</Label>
          <h2 style={{ fontFamily: C.head, fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1, maxWidth: 640, margin: "0 auto 1rem" }}>
            Stop posting manually.<br />
            <span style={gradText(gradPurple)}>Start the factory.</span>
          </h2>
          <p style={{ maxWidth: 440, margin: "0 auto 2.5rem", color: C.muted }}>
            Join hundreds of creators and agencies already automating their content with Dexfluence.
          </p>
          <button style={{ background: C.accent, color: "#fff", border: "none", cursor: "pointer", fontSize: 16, padding: "1rem 2.5rem", borderRadius: 10, fontWeight: 500, boxShadow: "0 0 30px rgba(123,110,246,0.35)" }}>
            Launch your first campaign free →
          </button>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: `0.5px solid ${C.border}`, padding: "2rem 2.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", background: C.bg }}>
        <DexfluenceLogo variant="horizontal" size={0.75} />
        <p style={{ color: C.muted, fontSize: 13 }}>© 2025 Dexfluence. All rights reserved.</p>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          {["Privacy","Terms","Twitter","Discord"].map(label => (
            <Link key={label} href="#" style={{ color: C.muted, fontSize: 13 }}>{label}</Link>
          ))}
        </div>
      </footer>
    </>
  );
}