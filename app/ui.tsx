import Link from "next/link";

export function Brand({ compact = false }: { compact?: boolean }) {
  return <Link href="/" className="siteBrand"><span className="siteMark">C</span><span>{compact ? "CHS SOFTBALL" : "CHAMBLEE BULLDOGS SOFTBALL"}</span></Link>;
}

export function Nav({ variant = "light" }: { variant?: "light" | "dark" }) {
  return <header className={`siteNav ${variant}`}><Brand /><nav aria-label="Main navigation"><a href="#schedule">Schedule</a><details className="siteTeamsMenu"><summary>Teams</summary><div><a href="#varsity">Varsity</a><a href="#junior-varsity">Junior Varsity</a><a href="#middle-school">Middle School</a></div></details><a href="#sponsors">Sponsors</a><a href="#hub">Team Hub</a><a className="navDonate" href="#donate">Donate</a></nav></header>;
}

export function ConceptSwitch({ current }: { current: string }) {
  return <div className="conceptSwitch" aria-label="View another concept"><Link href="/ui-concepts">All concepts</Link><span>·</span>{current !== "game-day" && <Link href="/game-day">Game Day</Link>}{current !== "heritage" && <Link href="/heritage">Heritage</Link>}{current !== "score-first" && <Link href="/score-first">Score First</Link>}</div>;
}

export function SponsorLine() {
  return <div className="sponsorIdentity"><span className="toothIcon">✦</span><span><strong>Brookhaven</strong><small>FAMILY DENTISTRY</small></span></div>;
}
