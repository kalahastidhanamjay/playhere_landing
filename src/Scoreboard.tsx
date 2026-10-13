import { useEffect, useState } from "react";
import { Icon, type IconName } from "./Icon";

// ------------------------------------------------------------------ scenes

/** One delivery in the cricket demo chase. */
type Ball = { label: string; runs: number; legal: boolean; wicket?: boolean };

// A believable final-overs chase: Chargers need 41 off 24 when the demo starts.
const CHASE: Ball[] = [
  { label: "1", runs: 1, legal: true }, { label: "4", runs: 4, legal: true }, { label: "•", runs: 0, legal: true },
  { label: "wd", runs: 1, legal: false }, { label: "6", runs: 6, legal: true }, { label: "2", runs: 2, legal: true },
  { label: "W", runs: 0, legal: true, wicket: true }, { label: "1", runs: 1, legal: true }, { label: "4", runs: 4, legal: true },
  { label: "1", runs: 1, legal: true }, { label: "6", runs: 6, legal: true }, { label: "•", runs: 0, legal: true },
  { label: "2", runs: 2, legal: true }, { label: "4", runs: 4, legal: true }, { label: "1", runs: 1, legal: true },
  { label: "nb", runs: 1, legal: false }, { label: "6", runs: 6, legal: true }, { label: "2", runs: 2, legal: true },
];
const START = { runs: 128, wickets: 4, balls: 96 }; // 16.0 overs
const TARGET = 169;

// Second half of a district league game, starting at 1–1.
const GOALS = [
  { minute: 58, side: 0 },
  { minute: 64, side: 0, who: "Ravi K" },
  { minute: 71, side: 1, who: "Imran S" },
  { minute: 77, side: 0 },
  { minute: 83, side: 0, who: "Ravi K" },
  { minute: 90, side: 0 },
] as const;

// Game 2 of a badminton final; Arjun took game 1 21–17.
const RALLIES = [0, 1, 0, 0, 1, 0, 1, 0, 0, 0] as const;
const GAME2_START = [15, 16];

const SCENES: { id: string; label: string; icon: IconName; steps: number }[] = [
  { id: "cricket", label: "Cricket", icon: "cricket", steps: CHASE.length },
  { id: "football", label: "Football", icon: "football", steps: GOALS.length },
  { id: "badminton", label: "Badminton", icon: "shuttle", steps: RALLIES.length },
];

const cls = (b: Ball) => (b.wicket ? "bw" : b.label === "6" ? "b6" : b.label === "4" ? "b4" : !b.legal ? "bx" : "");

/** Phone mockup that plays a short live-scoring demo for a few sports in turn. */
export function Scoreboard() {
  const [scene, setScene] = useState(0);
  const [step, setStep] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      setStep(8);
      return;
    }
    const id = setInterval(() => {
      setStep((n) => n + 1);
    }, 1300);
    return () => clearInterval(id);
  }, []);

  // Two beats of rest after a scene ends, then the next sport.
  useEffect(() => {
    if (reduced) return;
    if (step > SCENES[scene].steps + 2) {
      setScene((s) => (s + 1) % SCENES.length);
      setStep(0);
    }
  }, [step, scene, reduced]);

  const pick = (i: number) => {
    setScene(i);
    setStep(reduced ? SCENES[i].steps : 0);
  };
  const current = SCENES[scene];
  const played = Math.min(step, current.steps);

  return (
    <div className="phone" role="img" aria-label={`Live ${current.label.toLowerCase()} scoring demo`}>
      <div className="phone-screen">
        <div className="phone-top">
          <span>Match centre</span>
          <span className="live-pill"><span className="dot" />LIVE</span>
        </div>
        <div className="scene-tabs" role="tablist" aria-label="Demo sport">
          {SCENES.map((s, i) => (
            <button key={s.id} type="button" role="tab" aria-selected={i === scene} onClick={() => pick(i)}>
              <Icon name={s.icon} size={14} /> {s.label}
            </button>
          ))}
        </div>
        {current.id === "cricket" && <Cricket played={played} />}
        {current.id === "football" && <Football played={played} />}
        {current.id === "badminton" && <Badminton played={played} />}
      </div>
    </div>
  );
}

function Crest({ short, colors }: { short: string; colors: string }) {
  return <span className="crest" style={{ background: `linear-gradient(135deg,${colors})` }}>{short}</span>;
}

function Cricket({ played }: { played: number }) {
  const shown = CHASE.slice(0, played);
  const runs = START.runs + shown.reduce((s, b) => s + b.runs, 0);
  const wickets = START.wickets + shown.filter((b) => b.wicket).length;
  const legalBalls = START.balls + shown.filter((b) => b.legal).length;
  const overs = `${Math.floor(legalBalls / 6)}.${legalBalls % 6}`;
  const need = TARGET - runs;
  const left = 120 - legalBalls;

  // Balls of the current over: everything bowled since the last completed over.
  let legalSeen = START.balls;
  const overOf = shown.map((b) => {
    const o = Math.floor(legalSeen / 6);
    if (b.legal) legalSeen++;
    return o;
  });
  const lastOver = overOf.length ? overOf[overOf.length - 1] : -1;
  const thisOver = shown.filter((_, i) => overOf[i] === lastOver);

  return (
    <>
      <div className="board">
        <span className="board-title">Tirupati Premier League · Final</span>
        <div className="team-line">
          <Crest short="TT" colors="#22c3ee,#2563eb" />
          <b>Titans</b>
          <span className="num">168/6</span><small>(20)</small>
        </div>
        <div className="team-line">
          <Crest short="CC" colors="#ff8a3d,#ff3d5a" />
          <b>Chargers</b>
          <span className="num">{runs}/{wickets}</span><small>({overs})</small>
        </div>
        <div className="equation" aria-live="polite">
          {need > 0 ? `Chargers need ${need} from ${left} balls` : "Chargers win! Target reached"}
        </div>
      </div>
      <span className="pad-label">THIS OVER</span>
      <div className="balls">
        {thisOver.length === 0 ? (
          <span className="pad-empty">New over</span>
        ) : (
          thisOver.map((b, i) => (
            <span key={`${played}-${i}`} className={`ball ${cls(b)} ${i === thisOver.length - 1 ? "new" : ""}`}>{b.label}</span>
          ))
        )}
      </div>
      <div className="mini-pad" aria-hidden>
        {["0", "1", "2", "3"].map((k) => <span key={k}>{k}</span>)}
        <span className="k4">4</span>
        <span className="k6">6</span>
        <span className="kw">OUT</span>
        <span>↶</span>
      </div>
    </>
  );
}

function Football({ played }: { played: number }) {
  const shown = GOALS.slice(0, played);
  // 1–1 at half time; only some of the scripted events are goals for the away side.
  const home = 1 + shown.filter((g) => g.side === 0 && "who" in g).length;
  const away = 1 + shown.filter((g) => g.side === 1 && "who" in g).length;
  const minute = shown.length ? shown[shown.length - 1].minute : 55;
  const done = played >= GOALS.length;
  const scorers = shown.filter((g) => "who" in g);
  return (
    <>
      <div className="board board-green">
        <span className="board-title">Chittoor District League · Matchday 6</span>
        <div className="team-line">
          <Crest short="TF" colors="#34d399,#059669" />
          <b>Tirupati FC</b>
          <span className="num">{home}</span>
        </div>
        <div className="team-line">
          <Crest short="NU" colors="#7c5cff,#4f46e5" />
          <b>Nellore United</b>
          <span className="num">{away}</span>
        </div>
        <div className="equation" aria-live="polite">
          {done ? `Full time · Tirupati FC win ${home}–${away}` : `${minute}' · Half 2 · ${home === away ? `Level ${home}–${away}` : `${home > away ? "Tirupati FC" : "Nellore United"} lead ${Math.max(home, away)}–${Math.min(home, away)}`}`}
        </div>
      </div>
      <span className="pad-label">GOALS</span>
      <div className="events">
        {scorers.length === 0 ? (
          <span className="pad-empty">Second half underway</span>
        ) : (
          scorers.map((g, i) => (
            <span key={`${g.minute}`} className={`event ${i === scorers.length - 1 ? "new" : ""}`}>
              <Icon name="football" size={13} /> {g.minute}' {"who" in g ? g.who : ""}
            </span>
          ))
        )}
      </div>
      <div className="mini-pad two" aria-hidden>
        <span className="kg">+ Goal TF</span>
        <span className="kg">+ Goal NU</span>
        <span>End half</span>
        <span>↶</span>
      </div>
    </>
  );
}

function Badminton({ played }: { played: number }) {
  const g2 = [...GAME2_START];
  RALLIES.slice(0, played).forEach((side) => g2[side]++);
  const done = played >= RALLIES.length;
  const games = [1 + (done ? 1 : 0), 0];
  return (
    <>
      <div className="board board-blue">
        <span className="board-title">Open Championship · Men's singles final</span>
        <div className="team-line">
          <Crest short="AR" colors="#7dd3fc,#0284c7" />
          <b>Arjun R</b>
          <span className="sets">21 · {g2[0]}</span>
          <span className="num">{games[0]}</span>
        </div>
        <div className="team-line">
          <Crest short="SK" colors="#f472b6,#db2777" />
          <b>Sai K</b>
          <span className="sets">17 · {g2[1]}</span>
          <span className="num">{games[1]}</span>
        </div>
        <div className="equation" aria-live="polite">
          {done ? "Arjun R wins 2–0 (21–17, 21–19)" : `Game 2 · ${g2[0]}–${g2[1]} · Arjun leads 1–0 in games`}
        </div>
      </div>
      <span className="pad-label">GAME 2</span>
      <div className="rally" aria-hidden>
        {RALLIES.slice(0, played).map((side, i) => (
          <span key={i} className={`dot-pt ${side === 0 ? "a" : "b"} ${i === played - 1 ? "new" : ""}`} />
        ))}
      </div>
      <div className="mini-pad two" aria-hidden>
        <span className="kb">+ Point AR</span>
        <span className="kb">+ Point SK</span>
        <span>End game</span>
        <span>↶</span>
      </div>
    </>
  );
}
