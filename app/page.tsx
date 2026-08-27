'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

const FIGMA_FILE =
  'https://embed.figma.com/design/90sjA2iJxWs1XqRogzXv3r/Vyralnet-Game-Design';

const ROUND_DURATION_SECONDS = 55 * 60;
const SCOUT_DURATION_SECONDS = 60;
const SCOUT_DURATION_MS = SCOUT_DURATION_SECONDS * 1000;

function formatClock(totalSeconds: number) {
  const safeSeconds = Math.max(0, totalSeconds);
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

function StatusBar() {
  return (
    <div className="status-bar" aria-hidden="true">
      <img className="status-time" src="/assets/figma/pick/status-time.svg" width="34" height="13" alt="" />
      <span className="status-icons">
        <img src="/assets/figma/pick/status-cellular.svg" width="20" height="13" alt="" />
        <img src="/assets/figma/pick/status-wifi.svg" width="18" height="13" alt="" />
        <span className="status-battery">
          <img className="status-battery__outline" src="/assets/figma/pick/status-battery-outline.svg" width="25" height="13" alt="" />
          <img className="status-battery__fill" src="/assets/figma/pick/status-battery-fill.svg" width="21" height="9" alt="" />
          <img className="status-battery__cap" src="/assets/figma/pick/status-battery-cap.svg" width="2" height="5" alt="" />
        </span>
      </span>
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

function ExactPickBall({ className = '' }: { className?: string }) {
  return (
    <img
      className={`exact-pick-ball ${className}`}
      src="/assets/figma/pick/mystery-ball-complete.svg"
      width="110"
      height="134"
      alt=""
      aria-hidden="true"
    />
  );
}

function ExactScoutOrb({ className = '' }: { className?: string }) {
  return (
    <span className={`exact-scout-orb ${className}`} aria-hidden="true">
      <img className="exact-scout-orb__outer-glow" src="/assets/figma/scout/core-outer-glow.svg" width="280" height="280" alt="" />
      <span className="exact-scout-orb__core">
        <img src="/assets/figma/scout/core-layer-glass.svg" width="170" height="170" alt="" />
        <img src="/assets/figma/scout/core-layer-green.svg" width="170" height="170" alt="" />
        <img src="/assets/figma/scout/core-layer-white-highlight.svg" width="170" height="170" alt="" />
        <img src="/assets/figma/scout/core-layer-black-edge.svg" width="170" height="170" alt="" />
        <img src="/assets/figma/scout/core-layer-white-edge.svg" width="170" height="170" alt="" />
        <img className="exact-scout-orb__inner-glow" src="/assets/figma/scout/core-inner-glow.svg" width="92" height="92" alt="" />
        <img className="exact-scout-orb__highlight" src="/assets/figma/scout/core-highlight.svg" width="57" height="36" alt="" />
        <ScoutEye />
        <img className="exact-scout-orb__border" src="/assets/figma/scout/core-border.svg" width="172" height="172" alt="" />
      </span>
    </span>
  );
}

function ExactNothingBall({ className = '' }: { className?: string }) {
  return (
    <span className={`exact-nothing-ball ${className}`} aria-hidden="true">
      <img src="/assets/figma/nothing/ball-glass.svg" width="170" height="170" alt="" />
      <img src="/assets/figma/nothing/ball-edge.svg" width="170" height="170" alt="" />
      <img className="exact-nothing-ball__highlight" src="/assets/figma/nothing/ball-highlight.svg" width="57" height="36" alt="" />
      <img className="exact-nothing-ball__border" src="/assets/figma/nothing/ball-border.svg" width="172" height="172" alt="" />
    </span>
  );
}

function LockMark() {
  return <img className="lock-mark" src="/assets/figma/match/lock.svg" width="15" height="15" alt="Locked" />;
}

function CrownMark() {
  return (
    <img className="crown-mark" src="/assets/figma/match/crown.svg" width="60" height="60" alt="" aria-hidden="true" />
  );
}

function ProfileAvatar({ variant = 'you' }: { variant?: 'you' | 'opponent' }) {
  return (
    <img
      className={`avatar avatar--${variant}`}
      src={`/assets/figma/match/avatar-${variant}.svg`}
      width={variant === 'you' ? 97 : 98}
      height={variant === 'you' ? 97 : 98}
      alt={variant === 'you' ? 'Your creator profile' : '@ronellegan profile'}
    />
  );
}

function ScoutBadge({ count = 1, onActivate, used = false }: { count?: number; onActivate?: () => void; used?: boolean }) {
  return (
    <button
      className={`scout-badge${used ? ' scout-badge--used' : ''}`}
      type="button"
      aria-label={used ? 'Scout power-up used' : `Activate Scout power-up, ${count} available`}
      onClick={onActivate}
      disabled={!onActivate || used}
    >
      <img className="scout-badge__orb" src="/assets/figma/scout-dock/orb.svg" width="118" height="118" alt="" aria-hidden="true" />
      <img className="scout-badge__highlight" src="/assets/figma/scout-dock/highlight.svg" width="50" height="49" alt="" aria-hidden="true" />
      <img className="scout-badge__eye" src="/assets/figma/scout-dock/eye.svg" width="20" height="15" alt="" aria-hidden="true" />
      <img className="scout-badge__label" src="/assets/figma/scout-dock/label-scout.svg" width="39" height="9" alt="" aria-hidden="true" />
      <img className="scout-badge__count-glow" src="/assets/figma/scout-dock/count-glow.svg" width="47" height="47" alt="" aria-hidden="true" />
      {count === 1 && <img className="scout-badge__count" src="/assets/figma/scout-dock/count-1.svg" width="3" height="6" alt="" aria-hidden="true" />}
    </button>
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

function PickBallScreen({
  onPick,
  selectedBall = null,
  resolving = false,
}: {
  onPick?: (index: number) => void;
  selectedBall?: number | null;
  resolving?: boolean;
}) {
  return (
    <Phone className="phone--power-balls">
      <img className="pick-background-light" src="/assets/figma/pick/background-light.svg" width="402" height="700" alt="" aria-hidden="true" />
      <div className="power-copy">
        <p className="eyebrow">ROUND 1 BEGINS</p>
        <img className="pick-title-svg" src="/assets/figma/pick/title-pick-a-ball.svg" width="187" height="30" alt="Pick a ball." />
        <img className="pick-support-svg" src="/assets/figma/nothing/pick-support-copy.svg" width="116" height="33" alt="One holds Scout. Two hold nothing." />
      </div>
      <div className="ball-row">
        {[0, 1, 2].map((index) => onPick ? (
          <button
            className={`pick-ball-button${selectedBall === index ? ' pick-ball-button--selected' : ''}${resolving && selectedBall !== index ? ' pick-ball-button--dimmed' : ''}`}
            type="button"
            onClick={() => onPick(index)}
            disabled={resolving}
            aria-label={`Pick ball ${index + 1}`}
            key={index}
          >
            <ExactPickBall />
          </button>
        ) : <ExactPickBall key={index} />)}
      </div>
      <img className="tap-label-svg" src="/assets/figma/pick/tap-to-pick.svg" width="70" height="9" alt="Tap to pick" />
      <div className="scout-explainer">
        <img className="scout-explainer__shell" src="/assets/figma/pick/explainer-pill.svg" width="339" height="38" alt="" aria-hidden="true" />
        <img className="scout-explainer__eye" src="/assets/figma/pick/compact-eye.svg" width="13" height="13" alt="" aria-hidden="true" />
        <img className="scout-explainer__label" src="/assets/figma/pick/explainer-scout.svg" width="32" height="9" alt="Scout" />
        <img className="scout-explainer__dot scout-explainer__dot--one" src="/assets/figma/pick/separator-dot-a.svg" width="2" height="2" alt="" aria-hidden="true" />
        <img className="scout-explainer__description" src="/assets/figma/pick/explainer-see-score.svg" width="152" height="11" alt="See their hidden VyralScore" />
        <img className="scout-explainer__dot scout-explainer__dot--two" src="/assets/figma/pick/separator-dot-b.svg" width="2" height="2" alt="" aria-hidden="true" />
        <img className="scout-explainer__round" src="/assets/figma/pick/explainer-this-round.svg" width="82" height="11" alt="This round only" />
      </div>
    </Phone>
  );
}

function ResultScreen({ result, onStart, preview = false }: { result: 'scout' | 'nothing'; onStart?: () => void; preview?: boolean }) {
  const won = result === 'scout';
  return (
    <Phone className={`phone--result phone--result-${result}`}>
      {won && <img className="scout-result-background" src="/assets/figma/scout/background-light.svg" width="402" height="661" alt="" aria-hidden="true" />}
      <div className="result-orb">
        {won ? <>
          <img className="exact-burst-ring exact-burst-ring--outer" src="/assets/figma/scout/burst-ring-outer.svg" width="402" height="461" alt="" aria-hidden="true" />
          <img className="exact-burst-ring exact-burst-ring--middle" src="/assets/figma/scout/burst-ring-middle.svg" width="351" height="351" alt="" aria-hidden="true" />
          <img className="exact-burst-ring exact-burst-ring--inner" src="/assets/figma/scout/burst-ring-inner.svg" width="251" height="251" alt="" aria-hidden="true" />
          <ExactScoutOrb />
        </> : <ExactNothingBall />}
      </div>
      {won ? (
        <div className="result-copy">
          <p>YOU PULLED</p>
          <h3>Scout</h3>
          <span className="result-copy__regular">Their hidden VyralScore. 60 seconds.</span>
          <strong className="result-copy__bold">This round only. Spend it well.</strong>
        </div>
      ) : (
        <div className="exact-nothing-copy">
          <img className="exact-nothing-copy__pulled" src="/assets/figma/nothing/you-pulled.svg" width="77" height="9" alt="You pulled" />
          <img className="exact-nothing-copy__title" src="/assets/figma/nothing/title-nothing.svg" width="184" height="48" alt="Nothing" />
          <img className="exact-nothing-copy__regular" src="/assets/figma/nothing/body-regular.svg" width="148" height="12" alt="No Scout this round." />
          <img className="exact-nothing-copy__bold" src="/assets/figma/nothing/body-bold.svg" width="301" height="15" alt="Your content carries you. Post anyway." />
        </div>
      )}
      {won ? (
        <button className="exact-scout-cta" type="button" aria-label="Start Round 1" onClick={onStart} disabled={preview}>
          <img className="exact-scout-cta__base" src="/assets/figma/scout/cta-base.svg" width="358" height="54" alt="" />
          <img className="exact-scout-cta__highlight" src="/assets/figma/scout/cta-highlight.svg" width="358" height="27" alt="" />
          <img className="exact-scout-cta__label" src="/assets/figma/scout/cta-label.svg" width="106" height="13" alt="" />
        </button>
      ) : (
        <button className="exact-nothing-cta" type="button" aria-label="Start Round 1" onClick={onStart} disabled={preview}>
          <img className="exact-nothing-cta__shell" src="/assets/figma/nothing/cta-shell.svg" width="359" height="55" alt="" />
          <img className="exact-nothing-cta__label" src="/assets/figma/nothing/cta-label.svg" width="106" height="13" alt="" />
        </button>
      )}
      {won ? <img className="exact-scout-footer" src="/assets/figma/scout/footer-copy.svg" width="284" height="11" alt="Scout docks to your match · tap it any time this round" /> : <img className="exact-nothing-footer" src="/assets/figma/nothing/footer-copy.svg" width="161" height="11" alt="New draw before every round" />}
    </Phone>
  );
}

function BracketHeader({ roundSecondsRemaining }: { roundSecondsRemaining: number }) {
  const clock = formatClock(roundSecondsRemaining);
  return (
    <div className="bracket-header">
      <span className="bracket-orange-glow" aria-hidden="true" />
      <img className="bracket-track" src="/assets/figma/match/bracket-track.svg" width="39" height="667" alt="" aria-hidden="true" />
      <div className="round-meta">
        <span>ROUND 1 · 32 LEFT</span>
        <b aria-label={`Round ends in ${clock}`}><i /><span>Ends</span> <time>{clock}</time></b>
      </div>
      <CrownMark />
      <strong>THE FINAL</strong>
      <small>Takes the rest</small>
      <div className="bracket-pair">
        {[0, 1].map((index) => (
          <i key={index}>
            <img className="bracket-pair__node" src="/assets/figma/match/bracket-node.svg" width="42" height="42" alt="" />
            <img className="bracket-pair__question" src="/assets/figma/match/question.svg" width="7" height="11" alt="Unknown creator" />
          </i>
        ))}
      </div>
      <p>
        <img src="/assets/figma/match/round-2.svg" width="50" height="9" alt="Round 2" />
        <img src="/assets/figma/match/round-prize-25.svg" width="21" height="10" alt="$25" />
      </p>
    </div>
  );
}

function SmoothScoutCountdown({ expiresAt, secondsRemaining }: { expiresAt: number | null; secondsRemaining: number }) {
  const ringRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let frame = 0;

    function drawProgress() {
      const remainingMs = expiresAt === null ? SCOUT_DURATION_MS : Math.max(0, expiresAt - Date.now());
      const progress = Math.min(1, remainingMs / SCOUT_DURATION_MS);
      ringRef.current?.style.setProperty('--scout-angle', `${progress * 360}deg`);
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
      if (expiresAt !== null && remainingMs > 0) frame = window.requestAnimationFrame(drawProgress);
    }

    drawProgress();
    return () => window.cancelAnimationFrame(frame);
  }, [expiresAt]);

  return (
    <div className="scout-countdown" aria-live="polite">
      <span ref={ringRef} className="scout-timer-ring" aria-hidden="true"><i>{secondsRemaining}</i></span>
      <p className="scout-timer"><b>Scout active</b><br />seconds until the score locks</p>
      <span className="scout-meter" aria-hidden="true"><i ref={barRef} /></span>
    </div>
  );
}

function MatchCard({ revealed = false, secondsRemaining = 60, expiresAt = null }: { revealed?: boolean; secondsRemaining?: number; expiresAt?: number | null }) {
  return (
    <div className={`match-card${revealed ? ' match-card--revealed' : ''}`}>
      <img className="match-card__shell" src="/assets/figma/match/match-card-shell.svg" width="402" height="393" alt="" aria-hidden="true" />
      <div className="match-card__head"><span>YOUR MATCH · LIVE</span><b>$10</b></div>
      <div className="competitors">
        <div className="competitor">
          <ProfileAvatar />
          <b className="you-tag">YOU</b>
        </div>
        <img className="competitors__vs" src="/assets/figma/match/vs.svg" width="24" height="14" alt="versus" />
        <div className="competitor">
          <ProfileAvatar variant="opponent" />
          <b>@ronellegan</b>
        </div>
      </div>
      <div className="score-row">
        <span className="exact-score-pill">
          <img className="exact-score-pill__shell" src="/assets/figma/match/score-pill.svg" width="142" height="27" alt="" aria-hidden="true" />
          <img className="exact-score-pill__value" src="/assets/figma/match/creator-score.svg" width="44" height="11" alt="167,300" />
        </span>
        {revealed ? <ScoutEye compact /> : <LockMark />}
        {revealed ? (
          <span className="score-is-revealed">158,200</span>
        ) : (
          <img className="exact-hidden-score" src="/assets/figma/match/hidden-score-pill.svg" width="142" height="27" alt="Opponent score hidden" />
        )}
      </div>
      {revealed ? <SmoothScoutCountdown expiresAt={expiresAt} secondsRemaining={secondsRemaining} /> : <p>VyralScore hidden until the round ends</p>}
      <div className="match-footer">
        <span><img src="/assets/figma/match/banked.svg" width="40" height="9" alt="Banked" /><img src="/assets/figma/match/banked-zero.svg" width="14" height="10" alt="$0" /></span>
        <span><img src="/assets/figma/match/win.svg" width="20" height="9" alt="Win" /><img src="/assets/figma/match/plus.svg" width="7" height="7" alt="plus" /><img src="/assets/figma/match/reward-25xp.svg" width="29" height="9" alt="25XP" /></span>
      </div>
    </div>
  );
}

type ScoutUseState = 'unavailable' | 'available' | 'confirming' | 'active' | 'expired';

function MatchScreen({
  scoutState = 'available',
  secondsRemaining = 60,
  expiresAt = null,
  roundSecondsRemaining = ROUND_DURATION_SECONDS,
  onScoutTap,
  onConfirmScout,
  onCancelScout,
  onNewRound,
}: {
  scoutState?: ScoutUseState;
  secondsRemaining?: number;
  expiresAt?: number | null;
  roundSecondsRemaining?: number;
  onScoutTap?: () => void;
  onConfirmScout?: () => void;
  onCancelScout?: () => void;
  onNewRound?: () => void;
}) {
  const confirmation = scoutState === 'confirming';
  const revealed = scoutState === 'active';
  const hasScout = scoutState !== 'unavailable';
  return (
    <Phone className={`phone--match phone--scout-${scoutState}${confirmation ? ' phone--blurred' : ''}`}>
      <button className="leave-round-button" type="button" onClick={onNewRound} aria-label="Leave Round 1 and return to Pick a Ball">
        <span aria-hidden="true">‹</span> Leave
      </button>
      <BracketHeader roundSecondsRemaining={roundSecondsRemaining} />
      <MatchCard revealed={revealed} secondsRemaining={secondsRemaining} expiresAt={expiresAt} />
      <div className="entered-label">32 CREATORS ENTER</div>
      {hasScout && <ScoutBadge onActivate={scoutState === 'available' ? onScoutTap : undefined} used={scoutState === 'expired'} />}
      {(scoutState === 'expired' || scoutState === 'unavailable') && (
        <button className="round-restart-button" type="button" onClick={onNewRound}>Play Round 1 Again</button>
      )}
      {confirmation && (
        <div className="confirmation-overlay">
          <div className="confirmation-sheet" role="dialog" aria-modal="true" aria-labelledby="scout-confirmation-title">
            <img className="confirmation-sheet__exact" src="/assets/figma/scout-sheet/confirmation-complete.svg" width="402" height="443" alt="" aria-hidden="true" />
            <h3 className="sr-only" id="scout-confirmation-title">Use Scout?</h3>
            <p className="sr-only">See @ronellegan&apos;s hidden VyralScore for 60 seconds. One use per round.</p>
            <button className="confirmation-sheet__action confirmation-sheet__action--use" type="button" onClick={onConfirmScout}>Use Scout</button>
            <button className="confirmation-sheet__action confirmation-sheet__action--later" type="button" onClick={onCancelScout}>Not yet</button>
          </div>
        </div>
      )}
    </Phone>
  );
}

type TrialPhase = 'pick' | 'result' | 'match';

function randomBallIndex() {
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const value = new Uint32Array(1);
    crypto.getRandomValues(value);
    return value[0] % 3;
  }
  return Math.floor(Math.random() * 3);
}

function InteractiveTrial() {
  const [phase, setPhase] = useState<TrialPhase>('pick');
  const [winningBall, setWinningBall] = useState<number | null>(() => randomBallIndex());
  const [selectedBall, setSelectedBall] = useState<number | null>(null);
  const [scoutState, setScoutState] = useState<ScoutUseState>('unavailable');
  const [expiresAt, setExpiresAt] = useState<number | null>(null);
  const [secondsRemaining, setSecondsRemaining] = useState(SCOUT_DURATION_SECONDS);
  const [roundEndsAt, setRoundEndsAt] = useState<number | null>(null);
  const [roundSecondsRemaining, setRoundSecondsRemaining] = useState(ROUND_DURATION_SECONDS);
  const [resolving, setResolving] = useState(false);
  const [showRules, setShowRules] = useState(false);

  useEffect(() => {
    if (scoutState !== 'active' || expiresAt === null) return;

    function updateCountdown() {
      const remaining = Math.max(0, Math.ceil((expiresAt! - Date.now()) / 1000));
      setSecondsRemaining(remaining);
      if (remaining === 0) {
        setExpiresAt(null);
        setScoutState('expired');
      }
    }

    updateCountdown();
    const timer = window.setInterval(updateCountdown, 200);
    return () => window.clearInterval(timer);
  }, [expiresAt, scoutState]);

  useEffect(() => {
    if (phase !== 'match' || roundEndsAt === null) return;

    function updateRoundCountdown() {
      const remaining = Math.max(0, Math.ceil((roundEndsAt! - Date.now()) / 1000));
      setRoundSecondsRemaining(remaining);
      if (remaining === 0) {
        setRoundEndsAt(null);
        setExpiresAt(null);
        setScoutState((current) => current === 'unavailable' ? 'unavailable' : 'expired');
      }
    }

    updateRoundCountdown();
    const timer = window.setInterval(updateRoundCountdown, 200);
    return () => window.clearInterval(timer);
  }, [phase, roundEndsAt]);

  useEffect(() => {
    if (!resolving || selectedBall === null || winningBall === null || phase !== 'pick') return;
    const revealTimer = window.setTimeout(() => {
      setResolving(false);
      setPhase('result');
    }, 620);
    return () => window.clearTimeout(revealTimer);
  }, [phase, resolving, selectedBall, winningBall]);

  const wonScout = selectedBall !== null && selectedBall === winningBall;

  function resetRound() {
    setWinningBall(randomBallIndex());
    setSelectedBall(null);
    setPhase('pick');
    setScoutState('unavailable');
    setExpiresAt(null);
    setSecondsRemaining(SCOUT_DURATION_SECONDS);
    setRoundEndsAt(null);
    setRoundSecondsRemaining(ROUND_DURATION_SECONDS);
    setResolving(false);
  }

  function pickBall(index: number) {
    if (phase !== 'pick' || winningBall === null) return;
    setSelectedBall(index);
    setResolving(true);
  }

  function startMatch() {
    setScoutState(wonScout ? 'available' : 'unavailable');
    setRoundSecondsRemaining(ROUND_DURATION_SECONDS);
    setRoundEndsAt(Date.now() + ROUND_DURATION_SECONDS * 1000);
    setPhase('match');
  }

  function openScoutConfirmation() {
    if (phase === 'match' && scoutState === 'available') setScoutState('confirming');
  }

  function activateScout() {
    if (scoutState !== 'confirming') return;
    setSecondsRemaining(SCOUT_DURATION_SECONDS);
    setExpiresAt(Date.now() + SCOUT_DURATION_MS);
    setScoutState('active');
  }

  function cancelScout() {
    if (scoutState === 'confirming') setScoutState('available');
  }

  const status = phase === 'pick'
    ? 'One of the three balls contains Scout.'
    : phase === 'result'
      ? wonScout ? 'Scout awarded. Continue into the match.' : 'Nothing awarded. Continue into the match.'
      : scoutState === 'available'
        ? 'Round started. Tap the Scout badge to activate it.'
        : scoutState === 'confirming'
          ? 'Confirm whether to spend Scout now.'
          : scoutState === 'active'
            ? `Opponent VyralScore visible for ${secondsRemaining} more second${secondsRemaining === 1 ? '' : 's'}.`
            : scoutState === 'expired'
              ? 'Scout expired. The opponent score is hidden and locked again.'
              : 'Round started without Scout.';

  return (
    <section className="trial-section" aria-labelledby="trial-heading">
      <div className="section-heading trial-heading-row">
        <div><p className="kicker">PLAYABLE TRIAL</p><h2 id="trial-heading">Pick-a-Ball Scout mechanic</h2></div>
        <p>Random draw · One-use Scout · Exact 60-second reveal</p>
      </div>
      <div className="trial-shell">
        <div className="game-toolbar">
          <span><i /> ROUND 1 · {phase === 'pick' ? (resolving ? 'BALL OPENING' : 'PICK') : phase === 'result' ? 'RESULT' : scoutState === 'active' ? 'SCOUT ACTIVE' : 'MATCH'}</span>
          <div>
            <button type="button" onClick={() => setShowRules(true)}>How to play</button>
            <button type="button" onClick={resetRound}>Restart</button>
          </div>
        </div>
        <div className="trial-stage">
          <div className={`trial-screen trial-screen--${phase}${phase === 'result' ? ' trial-screen--result-settled' : ''}`} key={phase}>
            {phase === 'pick' && <PickBallScreen onPick={pickBall} selectedBall={selectedBall} resolving={resolving} />}
            {phase === 'pick' && resolving && selectedBall !== null && winningBall !== null && (
              <div className="result-transition-layer trial-screen--result" aria-hidden="true">
                <ResultScreen result={selectedBall === winningBall ? 'scout' : 'nothing'} preview />
              </div>
            )}
            {phase === 'result' && <ResultScreen result={wonScout ? 'scout' : 'nothing'} onStart={startMatch} />}
            {phase === 'match' && (
              <MatchScreen
                scoutState={scoutState}
                secondsRemaining={secondsRemaining}
                expiresAt={expiresAt}
                roundSecondsRemaining={roundSecondsRemaining}
                onScoutTap={openScoutConfirmation}
                onConfirmScout={activateScout}
                onCancelScout={cancelScout}
                onNewRound={resetRound}
              />
            )}
          </div>
          <span className="sr-only" aria-live="polite">{status}</span>
          {showRules && (
            <div className="rules-overlay" role="dialog" aria-modal="true" aria-labelledby="rules-title">
              <button className="rules-backdrop" type="button" aria-label="Close rules" onClick={() => setShowRules(false)} />
              <div className="rules-card">
                <p>SCOUT POWER-UP</p>
                <h3 id="rules-title">How to play</h3>
                <ol>
                  <li><b>Pick one ball.</b><span>One random ball holds Scout. The other two hold Nothing.</span></li>
                  <li><b>Start the round.</b><span>If you win Scout, it docks beside your live match.</span></li>
                  <li><b>Spend it once.</b><span>Tap Scout and confirm when you want to see the opponent&apos;s score.</span></li>
                  <li><b>You get 60 seconds.</b><span>The score hides and locks automatically when time expires.</span></li>
                </ol>
                <button className="rules-close" type="button" onClick={() => setShowRules(false)}>Got it</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function AssetBoard() {
  return (
    <div className="asset-board">
      <div className="asset-cell asset-cell--dark"><ExactScoutOrb className="exact-scout-orb--board" /><span>Exact Scout core</span></div>
      <div className="asset-cell asset-cell--dark"><ExactPickBall className="exact-pick-ball--board" /><span>Exact mystery ball</span></div>
      <div className="asset-cell asset-cell--dark"><ExactNothingBall className="exact-nothing-ball--board" /><span>Exact Nothing ball</span></div>
      <div className="asset-cell asset-cell--dark asset-cell--rings"><img src="/assets/figma/scout/burst-ring-middle.svg" alt="" /><img src="/assets/figma/scout/burst-ring-inner.svg" alt="" /><span>Exact burst rings</span></div>
      <div className="asset-cell asset-cell--dark asset-cell--dock"><ScoutBadge /><span>Exact docked Scout power-up</span></div>
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
  { element: 'Selection background light', source: 'Figma group · 700 × 700 at −149,87 · supplied clipped SVG 402 × 700 · #8DC63F 20% → 0%', format: 'SVG', status: 'Exact' },
  { element: 'iPhone status bar', source: 'Original 9:41, cellular, Wi-Fi, battery outline, fill, and cap vectors', format: '6 SVGs', status: 'Exact' },
  { element: 'Mystery-ball source layers', source: 'Five original 108px radial layers plus the 92 × 31 shadow', format: '6 SVGs', status: 'Exact' },
  { element: 'Selection-state compact eye', source: 'Figma vector · 13 × 13 · two 1.6px rounded strokes', format: 'SVG', status: 'Exact' },
  { element: 'Selection-state explainer copy', source: 'Scout · hidden VyralScore · this round only · two separator dots', format: '6 SVGs', status: 'Exact' },
  { element: 'Selection-state explainer shell', source: 'Figma vector · 339 × 38 · original fill, stroke, and radius', format: 'SVG', status: 'Exact' },
  { element: 'Tap to Pick label', source: 'Figma outlined type · 70 × 9 · white/40%', format: 'SVG', status: 'Exact' },
  { element: 'Scout eye outline', source: 'Figma vector · 48.4 × 31.46 · 4.356px #FFF stroke', format: 'SVG', status: 'Exact' },
  { element: 'Scout eye pupil', source: 'Figma vector · 12.584 × 12.584 · #FFF fill', format: 'SVG', status: 'Exact' },
  { element: 'Scout glow ball', source: '280 × 280 group at 61,134 · 170px core · 92px glow · 57 × 36 highlight · all original vector/effect layers', format: '10 SVGs', status: 'Exact' },
  { element: 'Mystery balls', source: 'Exact 110 × 134 Figma export · 8 radial layers · shadow · highlight · question glyph', format: 'SVG', status: 'Exact' },
  { element: 'Nothing ball', source: '170 × 170 at 116,200 · original glass, dark edge, highlight, and dashed 1.5px white/25% border', format: '4 SVGs', status: 'Exact' },
  { element: 'Burst rings', source: '460px #6FB04A/6% · 350px/15% · 250px/30% · 1px centered borders', format: '3 SVGs', status: 'Exact' },
  { element: 'Scout result background light', source: 'Original 700px radial glow clipped to 402 × 661 · #8DC63F 20% → 0%', format: 'SVG', status: 'Exact' },
  { element: 'iPhone home indicator', source: 'Home Indicator component geometry', format: 'Component', status: 'Mapped' },
  { element: 'Pick-screen typography', source: 'Title and two-line supporting copy exported as original outlined SF Pro paths; eyebrow remains exact Figma-inspected 12/700/100% at its mapped position and color', format: '2 SVGs + live label', status: 'Exact' },
  { element: 'Scout result CTA + footer', source: 'Original green base, highlight, outlined Start Round 1 text, and outlined footer copy', format: '4 SVGs', status: 'Exact' },
  { element: 'Scout result title + body', source: 'View-mode properties: title 52/700 at 128,473.09; body 15.5/400 and 15.5/700 at 565 and 592; eyebrow 12/700 at 165,457.09', format: 'Exact live type', status: 'Exact' },
  { element: 'Docked Scout power-up', source: '58 × 75 group at 314,731 in the match frame; original orb, highlight, eye, label, count glow, and count glyph', format: '6 SVGs', status: 'Exact' },
  { element: 'Nothing result typography + CTA', source: 'Original outlined YOU PULLED, title, both body lines, muted button shell/label, and footer copy', format: '8 SVGs', status: 'Exact' },
  { element: 'Scout explainer pill', source: 'Original pill, eye, two dots, and all three outlined text layers', format: '7 SVGs', status: 'Exact' },
  { element: 'Round 1 creator profiles', source: 'Original embedded Figma profile photos with exact green and lilac rings, glow, crop, and 97/98px export bounds', format: '2 SVGs', status: 'Exact' },
  { element: 'Round 1 match details', source: 'Original crown, full bracket track, match-card shell, VS, Round 2, $25, 25XP, Win, Banked, $0, score, question, plus, node, and score-capsule exports', format: '17 SVGs', status: 'Exact' },
  { element: 'Orange bracket light', source: 'Figma layer 1 → Background Lights → “Organge” · node 9:558 · 561px radial #F7A35E at 16% → 0%', format: 'CSS gradient', status: 'Exact' },
  { element: 'Round 1 end timer', source: 'Live absolute-time countdown styled to the Figma timer capsule; starts at 55:00 and stops at 00:00', format: 'Live UI', status: 'Mapped' },
];

const exactPickAssets = [
  ['Compact eye vector', 'compact-eye-vector.svg'],
  ['Compact eye group', 'compact-eye.svg'],
  ['Separator dot A', 'separator-dot-a.svg'],
  ['Separator dot B', 'separator-dot-b.svg'],
  ['Scout label', 'explainer-scout.svg'],
  ['Hidden-score label', 'explainer-see-score.svg'],
  ['This-round label', 'explainer-this-round.svg'],
  ['Explainer shell', 'explainer-pill.svg'],
  ['Tap to Pick', 'tap-to-pick.svg'],
  ['Pick a ball title', 'title-pick-a-ball.svg'],
  ['Complete mystery ball', 'mystery-ball-complete.svg'],
  ['Question glyph', 'question-mark.svg'],
  ['Ball outline', 'mystery-ball-outline.svg'],
  ['Ball shade edge', 'ball-shade-edge.svg'],
  ['Ball highlight radial', 'ball-highlight-radial.svg'],
  ['Ball green radial', 'ball-green-radial.svg'],
  ['Ball purple radial', 'ball-purple-radial.svg'],
  ['Ball base radial', 'ball-base-radial.svg'],
  ['Ball shadow', 'ball-shadow.svg'],
  ['Selection background', 'background-light.svg'],
  ['Status time', 'status-time.svg'],
  ['Cellular signal', 'status-cellular.svg'],
  ['Wi-Fi signal', 'status-wifi.svg'],
  ['Battery fill', 'status-battery-fill.svg'],
  ['Battery cap', 'status-battery-cap.svg'],
  ['Battery outline', 'status-battery-outline.svg'],
] as const;

const exactScoutAssets = [
  ['Scout background light', 'background-light.svg'],
  ['Outer burst ring', 'burst-ring-outer.svg'],
  ['Middle burst ring', 'burst-ring-middle.svg'],
  ['Inner burst ring', 'burst-ring-inner.svg'],
  ['Outer core glow', 'core-outer-glow.svg'],
  ['Core glass layer', 'core-layer-glass.svg'],
  ['Core green layer', 'core-layer-green.svg'],
  ['Core highlight layer', 'core-layer-white-highlight.svg'],
  ['Core dark edge', 'core-layer-black-edge.svg'],
  ['Core white edge', 'core-layer-white-edge.svg'],
  ['Core inner glow', 'core-inner-glow.svg'],
  ['Core specular highlight', 'core-highlight.svg'],
  ['Core border', 'core-border.svg'],
  ['CTA base', 'cta-base.svg'],
  ['CTA highlight', 'cta-highlight.svg'],
  ['CTA outlined label', 'cta-label.svg'],
  ['Outlined footer copy', 'footer-copy.svg'],
] as const;

const exactNothingAssets = [
  ['Nothing ball glass', 'ball-glass.svg'],
  ['Nothing ball dark edge', 'ball-edge.svg'],
  ['Nothing ball highlight', 'ball-highlight.svg'],
  ['Nothing ball border', 'ball-border.svg'],
  ['You Pulled label', 'you-pulled.svg'],
  ['Nothing title', 'title-nothing.svg'],
  ['Regular result copy', 'body-regular.svg'],
  ['Bold result copy', 'body-bold.svg'],
  ['Muted CTA shell', 'cta-shell.svg'],
  ['Muted CTA label', 'cta-label.svg'],
  ['Nothing footer copy', 'footer-copy.svg'],
  ['Pick support copy', 'pick-support-copy.svg'],
] as const;

const exactScoutDockAssets = [
  ['Scout dock orb', 'orb.svg'],
  ['Scout dock highlight', 'highlight.svg'],
  ['Scout dock eye', 'eye.svg'],
  ['Scout dock label', 'label-scout.svg'],
  ['Scout count glow', 'count-glow.svg'],
  ['Scout count glyph', 'count-1.svg'],
] as const;

const exactMatchAssets = [
  ['Crown with orange glow', 'crown.svg'],
  ['Full bracket track', 'bracket-track.svg'],
  ['VS label', 'vs.svg'],
  ['Match-card shell', 'match-card-shell.svg'],
  ['Your profile', 'avatar-you.svg'],
  ['Opponent profile', 'avatar-opponent.svg'],
  ['Round 2 label', 'round-2.svg'],
  ['Round prize', 'round-prize-25.svg'],
  ['Unknown creator', 'question.svg'],
  ['Bracket node', 'bracket-node.svg'],
  ['Reward plus', 'plus.svg'],
  ['25XP reward', 'reward-25xp.svg'],
  ['Win label', 'win.svg'],
  ['Banked label', 'banked.svg'],
  ['Banked $0', 'banked-zero.svg'],
  ['Hidden-score capsule', 'hidden-score-pill.svg'],
  ['Hidden-score dots', 'hidden-score-dots.svg'],
  ['Score capsule', 'score-pill.svg'],
  ['Creator score', 'creator-score.svg'],
  ['Hidden-score lock', 'lock.svg'],
] as const;

const exactScoutSheetAssets = [
  ['Complete Scout confirmation', 'confirmation-complete.svg'],
  ['Confirmation glass shell', 'sheet-shell.svg'],
  ['Use Scout button', 'use-scout-button.svg'],
  ['Not yet button shell', 'not-yet-shell.svg'],
  ['Not yet label', 'not-yet-label.svg'],
  ['Confirmation helper copy', 'helper-copy.svg'],
] as const;

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
          <p className="kicker">VERIFIED SVG PACKAGE · 87 ORIGINAL EXPORTS</p>
          <h3>Exact Pick-a-Ball, Scout, Nothing, and match assets</h3>
          <p>The supplied Figma exports are separated into their original files. The Pick screen uses exact ball, compact-eye, explainer, status-bar, title, and supporting-copy artwork. Scout uses its layered award core, rings, CTA, footer, and six-layer docked power-up badge; Nothing uses its original layered ball and every outlined result-screen label. The live match now uses both exact creator photos, score capsules, bracket nodes, and reward labels.</p>
          <div className="asset-links">
            <a href="/assets/figma/pick/mystery-ball-complete.svg">Mystery ball</a>
            <a href="/assets/figma/pick/compact-eye.svg">Compact eye</a>
            <a href="/assets/figma/pick/explainer-pill.svg">Explainer shell</a>
            <a href="/assets/figma/pick/tap-to-pick.svg">Tap to Pick</a>
            <a href="/assets/figma/scout/core-outer-glow.svg">Scout core</a>
            <a href="/assets/figma/scout/burst-ring-outer.svg">Burst rings</a>
            <a href="/assets/figma/scout/cta-label.svg">Scout CTA</a>
            <a href="/assets/figma/scout-dock/orb.svg">Docked Scout</a>
            <a href="/assets/figma/nothing/title-nothing.svg">Nothing title</a>
            <a href="/assets/figma/nothing/ball-glass.svg">Nothing ball</a>
            <a href="/assets/figma/match/avatar-you.svg">Your profile</a>
            <a href="/assets/figma/match/avatar-opponent.svg">Opponent profile</a>
            <a href="/assets/figma/match/hidden-score-pill.svg">Hidden score</a>
            <a href="/assets/figma/match/crown.svg">Crown + glow</a>
            <a href="/assets/figma/match/match-card-shell.svg">Match shell</a>
          </div>
        </div>
      </div>
      <div className="exact-source-grid" aria-label="Twenty-six exact Pick-screen SVG exports from Figma">
        {exactPickAssets.map(([label, file]) => (
          <a href={`/assets/figma/pick/${file}`} key={file}>
            <span><img src={`/assets/figma/pick/${file}`} alt="" aria-hidden="true" /></span>
            <strong>{label}</strong>
            <small>{file}</small>
          </a>
        ))}
      </div>
      <div className="exact-source-grid" aria-label="Seventeen exact Scout SVG exports from Figma">
        {exactScoutAssets.map(([label, file]) => (
          <a href={`/assets/figma/scout/${file}`} key={file}>
            <span><img src={`/assets/figma/scout/${file}`} alt="" aria-hidden="true" /></span>
            <strong>{label}</strong>
            <small>{file}</small>
          </a>
        ))}
      </div>
      <div className="exact-source-grid" aria-label="Twelve exact Nothing-screen SVG exports from Figma">
        {exactNothingAssets.map(([label, file]) => (
          <a href={`/assets/figma/nothing/${file}`} key={file}>
            <span><img src={`/assets/figma/nothing/${file}`} alt="" aria-hidden="true" /></span>
            <strong>{label}</strong>
            <small>{file}</small>
          </a>
        ))}
      </div>
      <div className="exact-source-grid" aria-label="Six exact docked Scout SVG exports from Figma">
        {exactScoutDockAssets.map(([label, file]) => (
          <a href={`/assets/figma/scout-dock/${file}`} key={file}>
            <span><img src={`/assets/figma/scout-dock/${file}`} alt="" aria-hidden="true" /></span>
            <strong>{label}</strong>
            <small>{file}</small>
          </a>
        ))}
      </div>
      <div className="exact-source-grid" aria-label="Twenty exact Round 1 match SVG exports from Figma">
        {exactMatchAssets.map(([label, file]) => (
          <a href={`/assets/figma/match/${file}`} key={file}>
            <span><img src={`/assets/figma/match/${file}`} alt="" aria-hidden="true" /></span>
            <strong>{label}</strong>
            <small>{file}</small>
          </a>
        ))}
      </div>
      <div className="exact-source-grid" aria-label="Six exact Scout confirmation SVG exports from Figma">
        {exactScoutSheetAssets.map(([label, file]) => (
          <a href={`/assets/figma/scout-sheet/${file}`} key={file}>
            <span><img src={`/assets/figma/scout-sheet/${file}`} alt="" aria-hidden="true" /></span>
            <strong>{label}</strong>
            <small>{file}</small>
          </a>
        ))}
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
          <p className="lede">A complete standalone Scout trial: random three-ball selection, Scout or Nothing result, match handoff, one-use confirmation, timed score reveal, and automatic re-lock.</p>
        </div>
        <div className="document-status"><span className="status-dot" /> Working interactive trial</div>
      </header>

      <nav className="scope-card" aria-label="Document sections">
        <div><span>01</span><p>Pick a Ball screens</p></div>
        <div><span>02</span><p>Reusable game elements</p></div>
        <div><span>03</span><p>Figma source audit</p></div>
      </nav>

      <InteractiveTrial />

      <Comparison number="SCREEN 01" title="Power Ball selection" nodeId="9-1080" specs={['402 × 874', 'SF Pro', 'Three 108px ball groups']}><PickBallScreen /></Comparison>
      <Comparison number="SCREEN 02" title="Scout awarded" nodeId="9-1298" specs={['Scout core', 'Burst rings', 'Primary CTA']}><ResultScreen result="scout" /></Comparison>
      <Comparison number="SCREEN 03" title="Nothing awarded" nodeId="9-1363" specs={['Dark ball', 'Failure copy', 'Muted CTA']}><ResultScreen result="nothing" /></Comparison>
      <Comparison number="ELEMENTS 01" title="Pick a Ball component board" nodeId="9-1080" specs={['Mystery ball', 'Nothing ball', 'Scout core', 'Burst rings', 'Type', 'Buttons']} asset><AssetBoard /></Comparison>
      <AssetAudit />

      <footer>
        <p>COMPLETE STANDALONE FLOW</p>
        <h2>Pick, reveal, spend Scout, count down, and lock the score again.</h2>
      </footer>
    </main>
  );
}
