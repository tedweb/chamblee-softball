import Link from "next/link";

const concepts = [
  { href: "/game-day", number: "01", name: "Game Day", note: "Bold, photographic, community-driven" },
  { href: "/heritage", number: "02", name: "Heritage", note: "Editorial, traditional, school-focused" },
  { href: "/score-first", number: "03", name: "Score First", note: "Compact, fast, information-first" },
];

export default function Home() {
  return (
    <main className="chooser">
      <header className="chooserHeader">
        <div className="miniBrand"><span>C</span> CHAMBLEE SOFTBALL</div>
        <p>LANDING PAGE STUDY · 2026</p>
      </header>
      <section className="chooserIntro">
        <p className="kicker">Three directions. One Bulldog identity.</p>
        <h1>Choose the feeling<br />of game day.</h1>
        <p className="lede">Each concept uses the same real-world team content, rearranged to emphasize a different experience.</p>
      </section>
      <section className="conceptGrid" aria-label="Landing page concepts">
        {concepts.map((concept) => (
          <Link href={concept.href} className={`conceptTile tile${concept.number}`} key={concept.href}>
            <span className="conceptNumber">{concept.number}</span>
            <div><h2>{concept.name}</h2><p>{concept.note}</p></div>
            <span className="arrow" aria-hidden="true">↗</span>
          </Link>
        ))}
      </section>
    </main>
  );
}
