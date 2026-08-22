import { ConceptSwitch, Nav, SponsorLine } from "../ui";

export default function GameDay() {
  return <main className="gameDayPage">
    <Nav variant="dark" />
    <section className="gdHero">
      <div className="gdCircle" aria-hidden="true">C</div>
      <div className="gdHeroCopy"><p className="pageEyebrow">Chamblee High School · Varsity &amp; JV</p><h1>Bulldogs<br/><em>play here.</em></h1><p>The official home of Chamblee Softball and the Chamblee Softball Booster Club.</p><div className="heroActions"><a href="#schedule">View schedule</a><a className="outlineAction" href="#live">Follow live ↗</a></div></div>
      <div className="gdSeason"><span>2026 SEASON</span><strong>7–2</strong><small>OVERALL RECORD</small></div>
    </section>
    <section className="gdScoreBand" id="schedule"><div><p className="pageEyebrow">Last game · Final</p><h2>Chamblee <strong>3</strong></h2><h2>Midtown <strong>2</strong></h2></div><div className="gdRegion"><span>REGION</span><strong>3–0</strong><small>1ST PLACE</small></div><a className="goldAction" href="#live">Game recap →</a></section>
    <section className="gdCommunity" id="sponsors"><div><p className="pageEyebrow">Powered by our community</p><h2>Backing the Bulldogs.</h2><p>Local partners help provide equipment, travel support, field improvements, and opportunities for every athlete.</p></div><div className="gdSponsor"><span>FEATURED SPONSOR</span><SponsorLine /></div><div className="gdDonate" id="donate"><span>EVERY GIFT HELPS</span><strong>Support the<br/>2026 season.</strong><a className="goldAction" href="#">Donate with Givebutter →</a><small>Venmo and Zelle also accepted</small></div></section>
    <ConceptSwitch current="game-day" />
  </main>;
}
