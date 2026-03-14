import DexfluenceLogo from "@/components/DexfluenceLogo"
import Link from "next/link"

export default function Nav() {
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "1rem 2.5rem", background: "rgba(6,6,8,0.88)",
      backdropFilter: "blur(18px)", borderBottom: "0.5px solid rgba(255,255,255,0.07)" }}>
      <DexfluenceLogo variant="horizontal" size={1} />
      <ul style={{ display: "flex", gap: "2rem", listStyle: "none" }}>
        <li><Link href="#how">How it works</Link></li>
        <li><Link href="#features">Features</Link></li>
        <li><Link href="#pricing">Pricing</Link></li>
      </ul>
      <Link href="/signup"><button>Start free →</button></Link>
    </nav>
  )
}