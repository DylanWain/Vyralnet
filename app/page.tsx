import type { ReactNode } from 'react';

const FIGMA_FILE =
  'https://embed.figma.com/design/90sjA2iJxWs1XqRogzXv3r/Vyralnet-Game-Design';

function StatusBar() {
  return (
    <div className="status-bar" aria-hidden="true">
      <span>9:41</span>
      <span className="status-icons"><i /><i /><i /></span>
    </div>
  );
}

function HomeIndicator() {
  return <span className="home-indicator" aria-hidden="true" />;
}

function ScoutEye({ compact = false, dark = false }: { compact?: boolean; dark?: boolean }) {
  return (
    <span className={`scout-eye${compact ? ' scout-eye--compact' : ''}${dark ? ' scout-eye--dark' : ''}`}>
      <svg className="scout-eye__outline" width="54" height="36" viewBox="0 0 54 36" fill="none" aria-hidden="true">
        <path d="M2.52283 17.908C2.52283 17.908 11.7188 2.17798 26.7228 2.17798C41.7268 2.17798 50.9228 17.908 50.9228 17.908C50.9228 17.908 41.7268 33.638 26.7228 33.638C11.7188 33.638 2.52283 17.908 2.52283 17.908Z" stroke="white" strokeWidth="4.356" />
      </svg>
      <svg className="scout-eye__pupil" width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
        <path d="M6.292 12.584C9.76698 12.584 12.584 9.76698 12.584 6.292C12.584 2.81702 9.76698 0 6.292 0C2.81702 0 0 2.81702 0 6.292C0 9.76698 2.81702 12.584 6.292 12.584Z" fill="white" />
      </svg>
    </span>
  );
}

function MysteryBall({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`mystery-ball${dark ? ' mystery-ball--dark' : ''}`}>
      <span className="mystery-ball__shine" />
      {!dark && <span className="mystery-ball__question">?</span>}
    </div>
  );
}

function LockMark() {
  return <span className="lock-mark" aria-label="Locked"><i /></span>;
}

function CrownMark() {
  return (
    <span className="crown-mark" aria-hidden="true">
      <i /><i /><i /><b />
    </span>
  );
}

function ProfileAvatar({ variant = 'you' }: { variant?: 'you' | 'opponent' }) {
  return (
    <span className={`avatar avatar--${variant}`}>
      <span className="avatar__head" />
      <span className="avatar__body" />
    </span>
  );
}

function ScoutBadge({ count = 1 }: { count?: number }) {
  return (
    <div className="scout-badge">
      <div className="scout-badge__orb">
        <ScoutEye compact />
        <span className="scout-count">{count}</span>
      </div>
      <span>SCOUT</span>
    </div>
  );
}

function Phone({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`phone ${className}`}>
      <StatusBar />
      {children}
      <HomeIndicator />
    </div>
  );
}

function PickBallScreen() {
  return (
    <Phone className="phone--power-balls">
      <div className="power-copy">
        <p className="eyebrow">ROUND 1 BEGINS</p>
        <h3>Pick a ball.</h3>
        <p className="subcopy">One holds Scout.<br />Two hold nothing.</p>
      </div>
      <div className="ball-row">
        <MysteryBall /><MysteryBall /><MysteryBall />
      </div>
      <p className="tap-label">TAP TO PICK</p>
      <div className="scout-explainer">
        <ScoutEye compact />
        <span className="scout-explainer__label">Scout</span>
        <i className="scout-explainer__dot" />
        <span className="scout-explainer__description">see their hidden VyralScore</span>
        <i className="scout-explainer__dot" />
        <b>this round only</b>
      </div>
    </Phone>
  );
}

function ResultScreen({ result }: { result: 'scout' | 'nothing' }) {
  const won = result === 'scout';
  return (
    <Phone className={`phone--result phone--result-${result}`}>
      <div className="result-orb">
        {won ? <><span className="burst-ring burst-ring--one" /><span className="burst-ring burst-ring--two" /><span className="burst-ring burst-ring--three" /><ScoutEye /></> : <MysteryBall dark />}
      </div>
      <div className="result-copy">
        <p>YOU PULLED</p>
        <h3>{won ? 'Scout' : 'Nothing'}</h3>
        {won ? (
          <span>Their hidden VyralScore. 60 seconds.<br /><b>This round only. Spend it well.</b></span>
        ) : (
          <span>No Scout this round.<br /><b>Your content carries you. Post anyway.</b></span>
        )}
      </div>
      <button className={won ? 'phone-cta' : 'phone-cta phone-cta--muted'}>Start Round 1</button>
      <p className="result-footnote">{won ? 'Scout sticks to your match · tap it any time this round' : 'New draw before every round'}</p>
    </Phone>
  );
}

function BracketHeader() {
  return (
    <div className="bracket-header">
      <div className="round-meta"><span>ROUND 1 · 32 LEFT</span><b><i /> Ends 54:02</b></div>
      <CrownMark />
      <strong>THE FINAL</strong>
      <small>Takes the rest</small>
      <span className="bracket-line" />
      <div className="bracket-pair"><i>?</i><i>?</i></div>
      <p>ROUND 2<br /><b>$25</b></p>
    </div>
  );
}

function MatchCard({ revealed = false }: { revealed?: boolean }) {
  return (
    <div className="match-card">
      <div className="match-card__head"><span>YOUR MATCH · LIVE</span><b>$10</b></div>
      <div className="competitors">
        <div className="competitor">
          <ProfileAvatar />
          <b className="you-tag">YOU</b>
        </div>
        <strong>VS</strong>
        <div className="competitor">
          <ProfileAvatar variant="opponent" />
          <b>@ronellegan</b>
        </div>
      </div>
      <div className="score-row">
        <span>167,300</span><LockMark /><span>{revealed ? '158,200' : '•••••'}</span>
      </div>
      {revealed ? <p className="scout-timer"><b>54</b><br />Time left until Scout ends</p> : <p>VyralScore hidden until the round ends</p>}
      <div className="match-footer"><span>Banked $0</span><span>Win +25XP</span></div>
    </div>
  );
}

function MatchScreen({ state }: { state: 'base' | 'confirmation' | 'revealed' }) {
  const confirmation = state === 'confirmation';
  const revealed = state === 'revealed';
  return (
    <Phone className={`phone--match${confirmation ? ' phone--blurred' : ''}`}>
      <BracketHeader />
      <MatchCard revealed={revealed} />
      <span className="lower-bracket-line" />
      <div className="entered-label">32 CREATORS ENTER</div>
      <ScoutBadge />
      {confirmation && (
        <div className="confirmation-overlay">
          <div className="confirmation-sheet">
            <span className="sheet-handle" />
            <ScoutEye />
            <h3>Use Scout?</h3>
            <p>See <b>@ronellegan&apos;s</b> hidden VyralScore<br />for 60 seconds. One use per round.</p>
            <button className="phone-cta">Use Scout</button>
            <button className="phone-cta phone-cta--secondary">Not yet</button>
          </div>
        </div>
      )}
    </Phone>
  );
}

function AssetBoard() {
  return (
    <div className="asset-board">
      <div className="asset-cell asset-cell--dark"><ScoutEye /><span>Scout core</span></div>
      <div className="asset-cell asset-cell--dark"><MysteryBall /><span>Mystery ball</span></div>
      <div className="asset-cell asset-cell--dark"><MysteryBall dark /><span>Nothing ball</span></div>
      <div className="asset-cell asset-cell--dark asset-cell--rings"><span className="burst-ring burst-ring--one" /><span className="burst-ring burst-ring--two" /><span>Burst rings</span></div>
      <div className="asset-cell asset-cell--type">
        <p className="eyebrow">ROUND 1 BEGINS</p><h3>Pick a ball.</h3><span>SF Pro hierarchy</span>
      </div>
      <div className="asset-cell asset-cell--palette">
        <i style={{ background: '#000000' }} /><i style={{ background: '#9dca54' }} /><i style={{ background: '#ffffff' }} /><i style={{ background: '#76502e' }} />
        <span>Core palette</span>
      </div>
      <div className="asset-cell asset-cell--wide asset-cell--dark">
        <button className="phone-cta">Start Round 1</button><button className="phone-cta phone-cta--muted">Start Round 1</button>
      </div>
    </div>
  );
}

function FigmaReference({ nodeId, title }: { nodeId: string; title: string }) {
  return (
    <div className="reference-shell">
      <iframe title={`${title} in Figma`} src={`${FIGMA_FILE}?node-id=${nodeId}&embed-host=share&hide-ui=1`} allowFullScreen />
    </div>
  );
}

function Comparison({ number, title, nodeId, specs, children, asset = false }: { number: string; title: string; nodeId: string; specs: string[]; children: ReactNode; asset?: boolean }) {
  return (
    <section className="comparison-section">
      <div className="section-heading">
        <div><p className="kicker">{number}</p><h2>{title}</h2></div>
        <p>{specs.join(' · ')}</p>
      </div>
      <div className="comparison-grid">
        <article className="comparison-card">
          <div className="card-label"><span>Original</span> Figma reference</div>
          <FigmaReference nodeId={nodeId} title={title} />
        </article>
        <article className="comparison-card">
          <div className="card-label"><span>Rebuilt</span> Reusable coded element</div>
          <div className={`component-stage${asset ? ' component-stage--asset' : ''}`}>{children}</div>
        </article>
      </div>
      <div className="spec-strip">{specs.map((spec) => <span key={spec}>{spec}</span>)}</div>
    </section>
  );
}

const assetAudit = [
  { element: 'Scout eye outline', source: 'Figma vector · 48.4 × 31.46 · 4.356px #FFF stroke', format: 'SVG', status: 'Exact' },
  { element: 'Scout eye pupil', source: 'Figma vector · 12.584 × 12.584 · #FFF fill', format: 'SVG', status: 'Exact' },
  { element: 'Scout glow ball', source: '280 × 280 group at 61,134 · 170px core · 92px glow · 58 × 32 highlight · 9 vector/effect layers', format: 'SVG + CSS', status: 'Measured' },
  { element: 'Mystery balls', source: '108 × 132.84 groups at x 19, 147, 275 · 1.5px white/20% border · gradients and highlights', format: 'SVG + CSS', status: 'Measured' },
  { element: 'Nothing ball', source: '170 × 170 at 116,200 · 1.5px white/25% border · dark gradients and shadow', format: 'SVG + CSS', status: 'Measured' },
  { element: 'Burst rings', source: '460px #6FB04A/6% · 350px/15% · 250px/30% · 1px centered borders', format: 'SVG', status: 'Exact geometry' },
  { element: 'Background lights', source: 'Radial glow and falloff layers across all three screens', format: 'CSS gradients', status: 'Mapped' },
  { element: 'iPhone chrome', source: 'Status bar component + Home Indicator shape', format: 'Component', status: 'Mapped' },
  { element: 'Typography + labels', source: 'SF Pro text layers for Pick, Scout, Nothing, and supporting copy', format: 'Live text', status: 'Mapped' },
  { element: 'Result CTAs', source: 'Primary green and muted dark Start Round 1 frames', format: 'CSS', status: 'Mapped' },
  { element: 'Scout explainer pill', source: 'Outlined pill + compact eye + explanatory text', format: 'CSS + SVG', status: 'Mapped' },
];

function AssetAudit() {
  return (
    <section className="comparison-section audit-section">
      <div className="section-heading">
        <div><p className="kicker">ELEMENTS 02</p><h2>Figma source audit</h2></div>
        <p>Vector provenance is kept separate from photos, text, gradients, and layout.</p>
      </div>
      <div className="audit-table" role="table" aria-label="Figma element source audit">
        <div className="audit-row audit-row--head" role="row">
          <span>Element</span><span>Figma source</span><span>Build format</span><span>Status</span>
        </div>
        {assetAudit.map((item) => (
          <div className="audit-row" role="row" key={item.element}>
            <strong>{item.element}</strong>
            <span>{item.source}</span>
            <span>{item.format}</span>
            <span className={`audit-status audit-status--${item.status.toLowerCase().replaceAll(' ', '-')}`}>{item.status}</span>
          </div>
        ))}
      </div>
      <div className="exact-asset-callout">
        <div className="exact-asset-preview"><ScoutEye /></div>
        <div>
          <p className="kicker">PICK A BALL SVG PACKAGE</p>
          <h3>Vector assets</h3>
          <p>The eye files use the supplied Figma paths exactly. The rings and ball files are reconstructed from the measured Figma vector layers, gradients, borders, positions, and opacity values.</p>
          <div className="asset-links">
            <a href="/assets/scout-eye.svg">Exact eye</a>
            <a href="/assets/scout-eye-outline.svg">Exact outline</a>
            <a href="/assets/scout-eye-pupil.svg">Exact pupil</a>
            <a href="/assets/scout-burst-rings.svg">Burst rings</a>
            <a href="/assets/scout-result-ball.svg">Scout ball</a>
            <a href="/assets/mystery-ball.svg">Mystery ball</a>
            <a href="/assets/nothing-ball.svg">Nothing ball</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main>
      <header className="document-header">
        <div>
          <p className="kicker">VYRALNET · SCOUT TRIAL</p>
          <h1>Pick a Ball visual system</h1>
          <p className="lede">Only the three Pick a Ball states and their shared visual elements, reconstructed before randomization, transitions, or game logic are introduced.</p>
        </div>
        <div className="document-status"><span className="status-dot" /> Static visual system</div>
      </header>

      <nav className="scope-card" aria-label="Document sections">
        <div><span>01</span><p>Pick a Ball screens</p></div>
        <div><span>02</span><p>Reusable game elements</p></div>
        <div><span>03</span><p>Figma source audit</p></div>
      </nav>

      <Comparison number="SCREEN 01" title="Power Ball selection" nodeId="9-1080" specs={['402 × 874', 'SF Pro', 'Three 108px ball groups']}><PickBallScreen /></Comparison>
      <Comparison number="SCREEN 02" title="Scout awarded" nodeId="9-1298" specs={['Scout core', 'Burst rings', 'Primary CTA']}><ResultScreen result="scout" /></Comparison>
      <Comparison number="SCREEN 03" title="Nothing awarded" nodeId="9-1363" specs={['Dark ball', 'Failure copy', 'Muted CTA']}><ResultScreen result="nothing" /></Comparison>
      <Comparison number="ELEMENTS 01" title="Pick a Ball component board" nodeId="9-1080" specs={['Mystery ball', 'Nothing ball', 'Scout core', 'Burst rings', 'Type', 'Buttons']} asset><AssetBoard /></Comparison>
      <AssetAudit />

      <footer>
        <p>STATIC APPROVAL GATE</p>
        <h2>Mechanics begin only after these elements are approved.</h2>
      </footer>
    </main>
  );
}
