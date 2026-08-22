import { ConceptSwitch, Nav, SponsorLine } from "../ui";

export default function Heritage() {
  return <main className="heritagePage">
    <Nav />
    <section className="heritageMast"><p>EST. 1917 · CHAMBLEE, GEORGIA</p><h1>Tradition takes<br/>the field.</h1><div className="heritageRule"><span>VARSITY</span><span>JUNIOR VARSITY</span><span>ONE PROGRAM</span></div></section>
    <section className="heritageFeature"><div className="heritageStory"><p className="pageEyebrow">The 2026 season</p><h2>Built on grit.<br/>Playing for Chamblee.</h2><p>Meet the players, coaches, families, and community partners writing the next chapter of Bulldog softball.</p><a href="#teams">Meet the teams →</a></div><div className="heritageScore"><p>LAST GAME · FINAL</p><div><span>CHAMBLEE</span><strong>3</strong></div><div><span>MIDTOWN</span><strong>2</strong></div><a href="#">Read the recap</a></div></section>
    <section className="heritageStats"><div><span>OVERALL RECORD</span><strong>7–2</strong><small>Nine games played</small></div><div><span>REGION STANDING</span><strong>3–0</strong><small>First place</small></div><div><span>NEXT HOME GAME</span><strong>AUG 24</strong><small>5:30 PM · GAC</small></div></section>
    <section className="heritageSupport" id="sponsors"><div><p className="pageEyebrow">Our community partner</p><SponsorLine /></div><div id="donate"><p className="pageEyebrow">Help write the next chapter</p><h2>Give every Bulldog the chance to compete.</h2><a href="#">Make a donation →</a><small>Secure giving through Givebutter</small></div></section>
    <ConceptSwitch current="heritage" />
  </main>;
}
