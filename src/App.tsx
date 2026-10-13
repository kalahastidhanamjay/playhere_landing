import { LogoMark } from "./Logo";
import { useEffect, useState, type CSSProperties } from "react";
import { Icon, type IconName } from "./Icon";
import { Scoreboard } from "./Scoreboard";

const APP = (import.meta.env.VITE_APP_URL as string | undefined) ?? "http://localhost:5173";
const app = (path = "/") => `${APP}${path}`;

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Strip />
        <Sports />
        <Pillars />
        <HowItWorks />
        <Showcase />
        <Audience />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="wrap nav-inner">
        <a href="#top" style={{ display: "inline-flex", alignItems: "center", gap: 10, fontWeight: 800, fontSize: 19 }} aria-label="PlayHere home">
          <LogoMark size={36} /> PlayHere
        </a>
        <nav className="nav-links" aria-label="Sections">
          <a href="#sports">Sports</a>
          <a href="#features">Features</a>
          <a href="#how">How it works</a>
          <a href="#organisers">For organisers</a>
          <a href="#faq">FAQ</a>
        </nav>
        <span className="spacer" />
        <a className="nav-signin" href={app("/login")}>Sign in</a>
        <a className="btn btn-primary btn-sm" href={app("/register")}>Start free</a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-pitch" aria-hidden />
      <div className="wrap hero-grid">
        <div>
          <span className="eyebrow">Grassroots sport, scored live</span>
          <h1>
            Every local game, every sport, <span className="serif">live.</span>
          </h1>
          <p className="hero-lede">
            Cricket on Sunday, football on Wednesday, badminton after work. Score any match live, run leagues with automatic
            fixtures and a points table, and keep one profile for every sport you play.
          </p>
          <div className="hero-cta">
            <a className="btn btn-primary" href={app("/register")}>
              Start playing free <Icon name="arrow" size={18} />
            </a>
            <a className="btn btn-ghost-dark" href={app("/matches")}>Watch live matches</a>
          </div>
          <div className="hero-note">
            <span><Icon name="check" size={16} /> Free for players and organisers</span>
            <span><Icon name="check" size={16} /> Works on any phone browser</span>
          </div>
        </div>
        <div className="hero-visual">
          <Scoreboard />
          <div className="float-card float-a">
            <span className="crest" style={{ background: "linear-gradient(135deg,#34d399,#059669)", width: 36, height: 36 }}><Icon name="football" size={18} /></span>
            <span>
              <strong>Goal! 83'</strong>
              <small>Ravi K · Tirupati FC 3–1</small>
            </span>
          </div>
          <div className="float-card float-b">
            <span style={{ color: "var(--amber)" }}><Icon name="trophy" size={22} /></span>
            <span>
              <strong>Raiders go top</strong>
              <small>Kabaddi league · 10 pts</small>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Strip() {
  const items = [
    ["12 sports", "from cricket and football to kabaddi and badminton"],
    ["30 sec", "from tap to first score"],
    ["Auto fixtures", "league or knockout, with a live table"],
    ["₹0", "for players, captains and organisers"],
  ];
  return (
    <section className="strip" aria-label="At a glance">
      <div className="wrap strip-grid">
        {items.map(([big, small]) => (
          <div className="strip-item" key={big}>
            <span className="num">{big}</span>
            <span>{small}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

const PILLARS: { icon: IconName; colors: string; title: string; body: string; points: string[] }[] = [
  {
    icon: "bolt",
    colors: "linear-gradient(135deg,#ff9a4d,#ff3d5a)",
    title: "Score it",
    body: "A scoring pad built for the sideline: big buttons, one tap per goal, point or ball.",
    points: ["Cricket ball by ball: extras, wickets, chase maths", "Goals, baskets and raid points, with who scored", "Sets and games for badminton, volleyball and tennis"],
  },
  {
    icon: "trophy",
    colors: "linear-gradient(135deg,#22c3ee,#2563eb)",
    title: "Run it",
    body: "Host a league or knockout without a spreadsheet in sight.",
    points: ["Teams register, you approve", "Fixtures drawn in one tap", "Points table with goal difference or net run rate"],
  },
  {
    icon: "chart",
    colors: "linear-gradient(135deg,#7c5cff,#4f46e5)",
    title: "Own it",
    body: "One profile for every sport you play, with your positions and record in each.",
    points: ["Your sports, positions and teams in one place", "Cricket runs, wickets and strike rate counted for you", "A profile scouts and captains trust"],
  },
];

const SPORTS: { name: string; icon: IconName; colors: [string, string]; how: string }[] = [
  { name: "Cricket", icon: "cricket", colors: ["#FF9A4D", "#FF3D5A"], how: "Ball by ball" },
  { name: "Football", icon: "football", colors: ["#2BD67B", "#0E9F6E"], how: "Goals & scorers" },
  { name: "Kabaddi", icon: "kabaddi", colors: ["#FF6B6B", "#C2185B"], how: "Raid & tackle points" },
  { name: "Badminton", icon: "shuttle", colors: ["#7DD3FC", "#0284C7"], how: "Points in games" },
  { name: "Volleyball", icon: "volleyball", colors: ["#FFD166", "#F59E0B"], how: "Points in sets" },
  { name: "Basketball", icon: "basketball", colors: ["#FFB547", "#FF6A2B"], how: "1, 2 and 3 pointers" },
  { name: "Hockey", icon: "hockey", colors: ["#4DA3FF", "#3D5AFE"], how: "Goals by quarter" },
  { name: "Kho Kho", icon: "khokho", colors: ["#B983FF", "#7C4DFF"], how: "Points by turn" },
  { name: "Table tennis", icon: "paddle", colors: ["#F472B6", "#DB2777"], how: "Points in games" },
  { name: "Tennis", icon: "racket", colors: ["#A3E635", "#65A30D"], how: "Games in sets" },
  { name: "Throwball", icon: "volleyball", colors: ["#5EEAD4", "#0D9488"], how: "Points in sets" },
  { name: "Pickleball", icon: "paddle", colors: ["#A3E635", "#16A34A"], how: "Points in games" },
];

function Sports() {
  return (
    <section className="section" id="sports">
      <div className="wrap">
        <div className="section-head center">
          <span className="eyebrow">Every sport</span>
          <h2>
            Twelve sports, <span className="serif">one scoreboard.</span>
          </h2>
          <p>Each sport is scored the way it is actually played, and every one gets teams, tournaments, live scores and a points table.</p>
        </div>
        <div className="sports">
          {SPORTS.map((s) => (
            <div className="sport" key={s.name}>
              <span className="sport-badge" style={{ background: `linear-gradient(135deg, ${s.colors[0]}, ${s.colors[1]})`, "--c": s.colors[1] } as CSSProperties}>
                <Icon name={s.icon} size={26} />
              </span>
              <strong>{s.name}</strong>
              <small>{s.how}</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pillars() {
  return (
    <section className="section" id="features">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Features</span>
          <h2>
            Everything a local game needs, <span className="serif">nothing it doesn't.</span>
          </h2>
          <p>PlayHere does three jobs well: scoring the match, running the competition, and remembering what you did.</p>
        </div>
        <div className="pillars">
          {PILLARS.map((p) => (
            <article className="pillar" key={p.title}>
              <span className="pillar-icon" style={{ background: p.colors }}><Icon name={p.icon} size={24} /></span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
              <ul>
                {p.points.map((x) => (
                  <li key={x}><Icon name="check" size={17} /> {x}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="section dark" id="how">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">How it works</span>
          <h2>
            From WhatsApp group to <span className="serif">live scorecard.</span>
          </h2>
          <p>No downloads to chase, no forms to fill. Most teams are scoring their first match the same afternoon.</p>
        </div>
        <div className="steps">
          <div className="step">
            <span className="step-no">1</span>
            <h3>Create your team</h3>
            <p>Pick the sport, name it, then share the invite link or the six-letter code, like <code>K7PQ2M</code>, in your team group. Players join in one tap.</p>
          </div>
          <div className="step">
            <span className="step-no">2</span>
            <h3>Start a match</h3>
            <p>Pick the sport and the two sides, then set the overs, halves or sets. Or enter a tournament and let the organiser draw the fixtures.</p>
          </div>
          <div className="step">
            <span className="step-no">3</span>
            <h3>Score and share</h3>
            <p>Score live while friends follow from anywhere. At the final whistle the result, the table and everyone's profiles update on their own.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Showcase() {
  const rows = [
    ["TF", "Tirupati FC", "#34d399,#059669", 4, 3, 1, "+7", 10],
    ["NU", "Nellore United", "#7c5cff,#4f46e5", 4, 3, 0, "+4", 9],
    ["CR", "Chittoor Rovers", "#ff8a3d,#ff3d5a", 4, 1, 1, "-2", 4],
    ["KA", "Kadapa Athletic", "#22c3ee,#2563eb", 4, 0, 0, "-9", 0],
  ] as const;
  return (
    <section className="section white" id="organisers">
      <div className="wrap">
        <div className="split">
          <div className="split-text">
            <span className="eyebrow">For organisers</span>
            <h2>
              Your league runs itself, <span className="serif">you just approve.</span>
            </h2>
            <p>Share one link with captains. Teams register, you approve them, and one tap draws the whole schedule. The table updates after every result.</p>
            <ul className="checks">
              <li><Icon name="check" size={18} /> Registration approvals and entry fee shown up front</li>
              <li><Icon name="check" size={18} /> Round-robin or knockout, byes handled automatically</li>
              <li><Icon name="check" size={18} /> Goal difference, point difference or net run rate, worked out from every score</li>
            </ul>
          </div>
          <div className="panel" aria-label="Example points table">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <strong>Chittoor District Football League</strong>
              <span className="live-pill"><span className="dot" />LIVE</span>
            </div>
            <table className="table">
              <thead>
                <tr><th>Team</th><th className="c">P</th><th className="c">W</th><th className="c">D</th><th className="c">GD</th><th className="c">Pts</th></tr>
              </thead>
              <tbody>
                {rows.map(([short, name, colors, p, w, l, nrr, pts], i) => (
                  <tr key={name} className={i < 2 ? "q" : undefined}>
                    <td>
                      <span className="team-cell">
                        <span className="crest" style={{ background: `linear-gradient(135deg,${colors})` }}>{short}</span>
                        {name}
                      </span>
                    </td>
                    <td className="c">{p}</td><td className="c">{w}</td><td className="c">{l}</td>
                    <td className="c" style={{ color: "var(--ink-3)" }}>{nrr}</td>
                    <td className="c num" style={{ fontWeight: 700, color: "var(--blaze-deep)" }}>{pts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="checklist">
              {[
                ["Share with captains", true],
                ["Approve 4 teams", true],
                ["Generate fixtures", true],
                ["Score matches", false],
              ].map(([label, done], i) => (
                <div className="check-row" key={String(label)}>
                  <span className="check-dot" style={{ background: done ? "var(--pitch)" : "var(--blaze)" }}>{done ? <Icon name="check" size={14} strokeWidth={3} /> : i + 1}</span>
                  <span style={{ color: done ? "var(--ink-3)" : "var(--ink)" }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="split flip">
          <div className="split-text">
            <span className="eyebrow">For players</span>
            <h2>
              Your sporting CV, <span className="serif">written for you.</span>
            </h2>
            <p>List every sport you play and your position in each. Cricket matches add runs, wickets and strike rate automatically, so there's no more "trust me, I scored fifty."</p>
            <ul className="checks">
              <li><Icon name="check" size={18} /> One profile across all your sports and teams</li>
              <li><Icon name="check" size={18} /> Your name on the goals and points you score</li>
              <li><Icon name="check" size={18} /> Trials and academy openings in your area</li>
            </ul>
          </div>
          <div className="player-card" aria-label="Example player profile">
            <div className="player-top">
              <span className="avatar">DR</span>
              <div>
                <strong style={{ fontSize: 22 }}>Dhananjay Reddy</strong>
                <div style={{ color: "var(--on-night-2)", fontSize: 14 }}>Forward · All-rounder · Tirupati</div>
              </div>
            </div>
            <div className="sport-pills">
              <span className="sport-pill"><Icon name="football" size={14} /> Football</span>
              <span className="sport-pill"><Icon name="cricket" size={14} /> Cricket</span>
              <span className="sport-pill"><Icon name="shuttle" size={14} /> Badminton</span>
            </div>
            <div className="player-stats">
              {[["41", "Matches"], ["3", "Sports"], ["712", "Cricket runs"], ["19", "Wickets"]].map(([v, l]) => (
                <div key={l}><span className="num">{v}</span><span>{l}</span></div>
              ))}
            </div>
            <div className="badges">
              <span className="badge"><span style={{ color: "var(--amber)" }}><Icon name="star" size={14} /></span> First fifty</span>
              <span className="badge"><span style={{ color: "#a78bfa" }}><Icon name="football" size={14} /></span> Hat-trick</span>
              <span className="badge"><span style={{ color: "#34d399" }}><Icon name="trophy" size={14} /></span> League champion</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Audience() {
  const people = [
    ["Most of us", "Players", "One profile for every sport you play, with a record that grows every season. Get noticed for trials."],
    ["Brings the squad", "Captains", "One invite link for the whole team, and a quick match in any sport ready whenever you are."],
    ["Runs the show", "Organisers", "Registrations, fixtures and a live table without the spreadsheet."],
    ["Never misses a moment", "Fans", "Follow a local match from anywhere. Live scores open without signing up."],
  ];
  return (
    <section className="section dark">
      <div className="wrap">
        <div className="section-head center">
          <span className="eyebrow">Who it's for</span>
          <h2>
            One app for <span className="serif">everyone at the ground, court or mat.</span>
          </h2>
        </div>
        <div className="people">
          {people.map(([tag, title, body]) => (
            <div className="person" key={title}>
              <span className="tag">{tag}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const FAQS = [
  ["Which sports can I play on PlayHere?", "Cricket, football, hockey, basketball, kabaddi, kho kho, volleyball, throwball, badminton, table tennis, tennis and pickleball. Teams, tournaments and live scoring work the same way for all of them."],
  ["Is PlayHere free?", "Yes. Scoring, teams, tournaments and player profiles are free for players, captains and organisers."],
  ["Do I need to download anything?", "No. PlayHere works in any modern phone or computer browser, and there's an Android and iOS app as well."],
  ["Can I score a friendly without a tournament?", "Yes. Tap Start, choose Quick match, pick the sport and the two teams, set the overs, halves or sets, and start scoring."],
  ["How do players join my team?", "Open your team and tap Invite. Share the link or six-letter code; anyone who opens it joins straight away. Players can also ask to join from the team page, and you approve them."],
  ["How does scoring work in each sport?", "Cricket is scored ball by ball, with extras, every wicket type, run rate and the chase equation. Football and hockey count goals (with the scorer's name if you like), basketball and kabaddi count points, and badminton, volleyball, tennis and table tennis are scored point by point inside sets or games. Every sport has undo."],
  ["How are standings calculated?", "Football and hockey give three points for a win and one for a draw, separated by goal difference. Cricket gives two for a win and one for a tie, separated by net run rate. Other sports give two for a win, separated by point or set difference."],
];

function Faq() {
  return (
    <section className="section" id="faq">
      <div className="wrap">
        <div className="section-head center">
          <span className="eyebrow">FAQ</span>
          <h2>
            Good questions, <span className="serif">straight answers.</span>
          </h2>
        </div>
        <div className="faq">
          {FAQS.map(([q, a], i) => (
            <details key={q} open={i === 0}>
              <summary>
                {q}
                <Icon name="plus" size={20} />
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="cta">
          <h2>
            Your next match deserves <span className="serif">a scorecard.</span>
          </h2>
          <p>Pick your sport, create your team, share the link, and score your first match today.</p>
          <div className="hero-cta">
            <a className="btn btn-primary" href={app("/register")}>
              Create free account <Icon name="arrow" size={18} />
            </a>
            <a className="btn btn-ghost-dark" href={app("/tournaments")}>Browse tournaments</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div style={{ display: "grid", gap: 14, alignContent: "start" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 10, fontWeight: 800, fontSize: 19, color: "var(--ink)" }}>
              <LogoMark size={34} /> PlayHere
            </span>
            <p style={{ maxWidth: "30ch" }}>Play. Connect. Compete. The home of grassroots sport.</p>
          </div>
          <div>
            <h4>Product</h4>
            <ul>
              <li><a href={app("/matches")}>Live matches</a></li>
              <li><a href={app("/tournaments")}>Tournaments</a></li>
              <li><a href={app("/leaderboard")}>Rankings</a></li>
              <li><a href={app("/venues")}>Grounds & courts</a></li>
            </ul>
          </div>
          <div>
            <h4>Get started</h4>
            <ul>
              <li><a href={app("/register")}>Create account</a></li>
              <li><a href={app("/quick-match")}>Score a friendly</a></li>
              <li><a href={app("/tournaments/new")}>Host a tournament</a></li>
              <li><a href={app("/organizations")}>Get verified</a></li>
            </ul>
          </div>
          <div>
            <h4>Learn</h4>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#how">How it works</a></li>
              <li><a href="#organisers">For organisers</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-base">
          <span>© {new Date().getFullYear()} PlayHere</span>
          <span>Made for the people who keep local sport going.</span>
        </div>
      </div>
    </footer>
  );
}
