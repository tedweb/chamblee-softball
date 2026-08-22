import { ConceptSwitch, Nav, SponsorLine } from "../ui";

export default function ScoreFirst() {
  return <main className="scorePage">
    <Nav variant="dark" />
    <section className="scoreIdentity"><div><p>CHAMBLEE HIGH SCHOOL · CHAMBLEE, GA</p><h1>Chamblee Bulldogs</h1><span>VARSITY SOFTBALL · 2026–27</span></div><div className="scoreMetrics"><div><span>OVERALL</span><strong>7–2</strong></div><div><span>REGION</span><strong>3–0</strong><small>1ST</small></div></div></section>
    <nav className="scoreTabs" aria-label="Team sections"><a className="active" href="#home">Home</a><a href="#schedule">Schedule</a><a href="#roster">Roster</a><a href="#stats">Stats</a><a href="#news">News</a></nav>
    <section className="scoreMain" id="home"><div className="scoreFeed"><article className="nextGame"><p className="pageEyebrow">Up next · Home game · Non-region</p><div className="matchTeams"><div><span className="teamDisk">C</span><strong>Chamblee</strong></div><span className="versus">VS</span><div><span className="teamDisk away">GAC</span><strong>Greater Atlanta<br/>Christian</strong></div></div><div className="gameTime"><strong>AUG 24 · 5:30 PM</strong><a href="#">Preview game →</a></div></article><article className="recentResult"><div><p className="pageEyebrow">Game result · Aug 20</p><span className="finalTag">FINAL</span></div><div className="resultRows"><p><strong>Chamblee Bulldogs</strong><b>3</b></p><p><strong>Midtown Knights</strong><b>2</b></p></div><a href="#">Box score</a><span> · </span><a href="#">Game recap</a></article></div>
      <aside className="scoreAside"><div className="standings"><p className="pageEyebrow">Region snapshot</p><h2>1st place</h2><div><span>Chamblee</span><strong>3–0</strong></div><div><span>Riverwood</span><strong>2–1</strong></div><div><span>Midtown</span><strong>1–2</strong></div><a href="#">Full standings →</a></div><div className="scoreSponsor"><p className="pageEyebrow">Featured sponsor</p><SponsorLine /></div><div className="scoreDonate" id="donate"><p className="pageEyebrow">Support the program</p><h2>Help the Bulldogs go further.</h2><a href="#">Donate now →</a><small>Givebutter · Venmo · Zelle</small></div></aside>
    </section>
    <ConceptSwitch current="score-first" />
  </main>;
}
