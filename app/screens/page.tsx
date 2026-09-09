/* eslint-disable @next/next/no-html-link-for-pages */
const liveScreens = [
  {
    key: 'welcome',
    number: '01',
    title: 'Welcome',
    description: 'Animated Vyralnet horizon and responsive Get Started entry screen.',
  },
  {
    key: 'pick',
    number: '02',
    title: 'Pick a Ball',
    description: 'Round entry with three mystery balls and the Scout explanation.',
  },
  {
    key: 'scout',
    number: '03',
    title: 'Scout Awarded',
    description: 'Successful draw state with the exact layered Scout artwork.',
  },
  {
    key: 'nothing',
    number: '04',
    title: 'Nothing Drawn',
    description: 'Alternate draw result and continue-to-round action.',
  },
  {
    key: 'match',
    number: '05',
    title: 'Live Match',
    description: 'Round bracket, creator pairing, timer and hidden opponent score.',
  },
  {
    key: 'match-confirming',
    number: '06',
    title: 'Use Scout',
    description: 'Confirmation sheet before spending the one-use Scout power-up.',
  },
  {
    key: 'match-active',
    number: '07',
    title: 'Scout Active',
    description: 'Temporary score reveal with a live expiration indicator.',
  },
] as const;

const recoveredGroups = [
  {
    title: 'Access & onboarding',
    screens: ['Log in', 'Sign up', 'Invitation', 'Forgot password', 'Legal', 'Account type', 'Brand onboarding', 'Influencer onboarding'],
  },
  {
    title: 'Core application',
    screens: ['Chat', 'Stats', 'Settings', 'Public profile', 'Edit profile'],
  },
  {
    title: 'Payments & membership',
    screens: ['Wallet', 'Transactions', 'Payment methods', 'Add payment method', 'Bank account', 'Membership', 'Edit packages'],
  },
  {
    title: 'Growth & support',
    screens: ['Challenges', 'Leaderboard', 'Reports', 'Notifications', 'Help & support', 'Change password', 'Delete account'],
  },
] as const;

export default function ScreensPage() {
  return (
    <main className="screens-page">
      <header className="screens-header">
        <a className="screens-brand" href="/" aria-label="Open the Vyralnet live experience">
          <span className="screens-brand__mark">V</span>
          <span>Vyralnet</span>
        </a>
        <div className="screens-header__copy">
          <p>PRODUCT BUILD BOARD</p>
          <h1>Every finished screen.<br />Live and inspectable.</h1>
          <span>This board separates approved coded experiences from recovered mobile routes that still require a visual and functional pass.</span>
        </div>
        <div className="screens-summary" aria-label="Build summary">
          <div><strong>{liveScreens.length}</strong><span>live coded states</span></div>
          <div><strong>{recoveredGroups.reduce((sum, group) => sum + group.screens.length, 0)}</strong><span>mobile routes recovered</span></div>
          <a href="/">Open live app <span aria-hidden="true">↗</span></a>
        </div>
      </header>

      <section className="screens-live" aria-labelledby="live-build-heading">
        <div className="screens-section-heading">
          <div>
            <p>LIVE BUILD · CURRENTLY DEMOABLE</p>
            <h2 id="live-build-heading">Approved coded experiences</h2>
          </div>
          <span>Each frame below is running real interface code—not a screenshot.</span>
        </div>

        <div className="screens-grid">
          {liveScreens.map((screen) => (
            <article className="screen-card" key={screen.key}>
              <div className="screen-card__meta">
                <span>{screen.number}</span>
                <div><h3>{screen.title}</h3><p>{screen.description}</p></div>
              </div>
              <div className="screen-frame">
                <div className="screen-frame__camera" aria-hidden="true" />
                <iframe
                  src={`/?preview=${screen.key}`}
                  title={`${screen.title} live preview`}
                  loading="lazy"
                />
              </div>
              <a className="screen-card__open" href={`/?preview=${screen.key}`}>
                Open full screen <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="screens-recovered" aria-labelledby="recovered-heading">
        <div className="screens-section-heading">
          <div>
            <p>RECOVERED MOBILE APPLICATION</p>
            <h2 id="recovered-heading">Next screens to verify</h2>
          </div>
          <span>The code exists for these routes. They are intentionally not labeled finished until they run against the restored services and receive a visual review.</span>
        </div>
        <div className="recovered-grid">
          {recoveredGroups.map((group) => (
            <article key={group.title}>
              <h3>{group.title}</h3>
              <ul>
                {group.screens.map((screen) => (
                  <li key={screen}><span>{screen}</span><small>Verification pending</small></li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <footer className="screens-footer">
        <p>Vyralnet product build board</p>
        <span>Current coded work and recovered mobile scope · Updated September 2026</span>
      </footer>
    </main>
  );
}
