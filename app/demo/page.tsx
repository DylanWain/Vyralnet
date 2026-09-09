/* eslint-disable @next/next/no-html-link-for-pages */
'use client';

import { useEffect, useMemo, useState, type ReactNode } from 'react';

type Role = 'brand' | 'creator';

type ScreenItem = {
  id: string;
  title: string;
  group: string;
};

const screens: ScreenItem[] = [
  { id: 'login', title: 'Log In', group: 'Access' },
  { id: 'signup', title: 'Create Account', group: 'Access' },
  { id: 'forgot-password', title: 'Forgot Password', group: 'Access' },
  { id: 'signup-invitation', title: 'Invitation Signup', group: 'Access' },
  { id: 'legal', title: 'Terms & Privacy', group: 'Access' },
  { id: 'signup-options', title: 'Choose Account Type', group: 'Onboarding' },
  { id: 'common-signup', title: 'Profile Details', group: 'Onboarding' },
  { id: 'brand-onboarding', title: 'Brand Onboarding', group: 'Onboarding' },
  { id: 'creator-onboarding', title: 'Creator Onboarding', group: 'Onboarding' },
  { id: 'home', title: 'Home', group: 'Core' },
  { id: 'stats', title: 'Stats', group: 'Core' },
  { id: 'chat', title: 'Chat & Email', group: 'Core' },
  { id: 'settings', title: 'Settings', group: 'Core' },
  { id: 'notifications', title: 'Notifications', group: 'Core' },
  { id: 'challenges', title: 'Challenges', group: 'Competition' },
  { id: 'challenge-details', title: 'Challenge Details', group: 'Competition' },
  { id: 'joined-challenge', title: 'Joined Challenge', group: 'Competition' },
  { id: 'challenge-rounds', title: 'Challenge Rounds', group: 'Competition' },
  { id: 'round-details', title: 'Round Details', group: 'Competition' },
  { id: 'tournament-match', title: 'Tournament Match', group: 'Competition' },
  { id: 'new-challenge', title: 'New Challenge', group: 'Competition' },
  { id: 'posting-window', title: 'Posting Window', group: 'Competition' },
  { id: 'submit-content', title: 'Submit Content', group: 'Competition' },
  { id: 'posting-confirmed', title: 'Posting Confirmed', group: 'Competition' },
  { id: 'leaderboard', title: 'Leaderboard', group: 'Growth' },
  { id: 'xp-history', title: 'XP History', group: 'Growth' },
  { id: 'search-talents', title: 'Search Talents', group: 'Brand' },
  { id: 'find-influencer', title: 'Find Influencer', group: 'Brand' },
  { id: 'favorite-influencers', title: 'Favorites', group: 'Brand' },
  { id: 'my-network', title: 'My Network', group: 'Brand' },
  { id: 'influencer-profile', title: 'Creator Profile', group: 'Brand' },
  { id: 'brand-chat', title: 'Direct Message', group: 'Brand' },
  { id: 'send-message', title: 'New Message', group: 'Brand' },
  { id: 'contracts', title: 'Contracts', group: 'Brand' },
  { id: 'job-offer', title: 'Create Job Offer', group: 'Brand' },
  { id: 'view-job-offer', title: 'View Job Offer', group: 'Brand' },
  { id: 'brand-job-details', title: 'Job Details', group: 'Brand' },
  { id: 'view-email', title: 'Email Detail', group: 'Brand' },
  { id: 'content-details', title: 'Content Details', group: 'Brand' },
  { id: 'job-invitation', title: 'Job Invitations', group: 'Creator' },
  { id: 'my-jobs', title: 'My Jobs', group: 'Creator' },
  { id: 'creator-job-details', title: 'Job Details', group: 'Creator' },
  { id: 'creator-job-offer', title: 'Job Offer', group: 'Creator' },
  { id: 'wallet', title: 'Wallet', group: 'Money' },
  { id: 'transactions', title: 'Transactions', group: 'Money' },
  { id: 'payment-methods', title: 'Payment Methods', group: 'Money' },
  { id: 'add-payment-method', title: 'Add Card', group: 'Money' },
  { id: 'bank-account', title: 'Bank Account', group: 'Money' },
  { id: 'membership', title: 'Membership', group: 'Money' },
  { id: 'reports', title: 'Reports', group: 'Business' },
  { id: 'public-profile', title: 'Public Profile', group: 'Profile' },
  { id: 'edit-profile', title: 'Edit Profile', group: 'Profile' },
  { id: 'edit-packages', title: 'Edit Packages', group: 'Profile' },
  { id: 'help-support', title: 'Help & Support', group: 'Settings' },
  { id: 'change-password', title: 'Change Password', group: 'Settings' },
  { id: 'delete-account', title: 'Delete Account', group: 'Settings' },
];

const people = [
  { name: 'Jasmine Cole', handle: '@jasminecreates', niche: 'Beauty · Lifestyle', score: '183K', image: '/assets/mobile/person1.png' },
  { name: 'Micah Reed', handle: '@micahmoves', niche: 'Fitness · Wellness', score: '167K', image: '/assets/mobile/person2.png' },
  { name: 'Nia Brooks', handle: '@niabrooks', niche: 'Fashion · Travel', score: '154K', image: '/assets/mobile/person3.png' },
];

const challenges = [
  { title: 'Glow Up Challenge', brand: 'Luma Beauty', prize: '$2,500', status: 'Live', entrants: '128 creators' },
  { title: 'Built for Motion', brand: 'Arc Athletics', prize: '$1,250', status: 'Joining', entrants: '74 creators' },
  { title: 'Creator Weekend', brand: 'Wander House', prize: '$3,000', status: 'Round 2', entrants: '32 creators' },
];

const jobs = [
  { title: 'Summer launch campaign', company: 'Luma Beauty', pay: '$850', state: 'Offer received' },
  { title: 'Three short-form videos', company: 'Arc Athletics', pay: '$1,200', state: 'In progress' },
  { title: 'Hotel launch coverage', company: 'Wander House', pay: '$1,650', state: 'Review' },
];

function Logo() {
  return <div className="v-demo-logo" aria-label="Vyralnet">Vyralnet</div>;
}

function PrimaryButton({ children, onClick, muted = false }: { children: ReactNode; onClick?: () => void; muted?: boolean }) {
  return <button className={`v-primary${muted ? ' v-primary--muted' : ''}`} type="button" onClick={onClick}>{children}<span>→</span></button>;
}

function Field({ label, placeholder, type = 'text' }: { label: string; placeholder: string; type?: string }) {
  return <label className="v-field"><span>{label}</span><input type={type} placeholder={placeholder} /></label>;
}

function Avatar({ person = people[0], large = false }: { person?: typeof people[number]; large?: boolean }) {
  return <img className={`v-avatar${large ? ' v-avatar--large' : ''}`} src={person.image} alt="" />;
}

function TopBar({ title, back, onBack, action }: { title: string; back?: boolean; onBack: () => void; action?: ReactNode }) {
  return (
    <header className="v-topbar">
      <div>{back && <button type="button" onClick={onBack} aria-label="Go back">‹</button>}</div>
      <h1>{title}</h1>
      <div>{action}</div>
    </header>
  );
}

function Badge({ children, tone = 'green' }: { children: ReactNode; tone?: 'green' | 'orange' | 'purple' | 'gray' }) {
  return <span className={`v-badge v-badge--${tone}`}>{children}</span>;
}

const featureSets = {
  brand: [
    ['Challenges', 'challenges', '◎', 'peach'],
    ['Search Talents', 'search-talents', '⌕', 'blue'],
    ['Find Influencer', 'find-influencer', '✦', 'pink'],
    ['My Network', 'my-network', '◉', 'purple'],
    ['Your Contracts', 'contracts', '▣', 'green'],
    ['Leaderboard', 'leaderboard', '♕', 'peach'],
    ['Reports', 'reports', '≡', 'yellow'],
    ['Transactions', 'transactions', '$', 'aqua'],
  ],
  creator: [
    ['Challenges', 'challenges', '◎', 'peach'],
    ['Job Invitation', 'job-invitation', '✉', 'blue'],
    ['Leaderboard', 'leaderboard', '♕', 'pink'],
    ['My Jobs', 'my-jobs', '▣', 'purple'],
    ['Reports', 'reports', '≡', 'yellow'],
    ['Transactions', 'transactions', '$', 'aqua'],
  ],
} as const;

function AuthScreen({ view, open, setRole }: { view: string; open: (id: string) => void; setRole: (role: Role) => void }) {
  if (view === 'signup-options') {
    return <div className="v-auth v-auth--options"><Logo /><p className="v-kicker">JOIN VYRALNET</p><h1>How will you use Vyralnet?</h1><p className="v-muted">Choose the experience you want to preview. You can switch roles any time.</p><button className="v-role-card" onClick={() => { setRole('creator'); open('creator-onboarding'); }}><b>Creator</b><span>Compete, grow your score and get hired.</span><i>→</i></button><button className="v-role-card" onClick={() => { setRole('brand'); open('brand-onboarding'); }}><b>Brand</b><span>Find talent, launch challenges and hire creators.</span><i>→</i></button><button className="v-text-button" onClick={() => open('login')}>Already have an account? Log in</button></div>;
  }

  if (view === 'brand-onboarding' || view === 'creator-onboarding') {
    const brand = view === 'brand-onboarding';
    return <div className="v-auth v-auth--onboarding"><div className="v-onboarding-art"><img src={brand ? '/assets/mobile/onboarding-2.png' : '/assets/mobile/onboarding-1.png'} alt="" /></div><p className="v-kicker">PROFILE SETUP · 3 OF 3</p><h1>{brand ? 'Build your brand profile.' : 'Show brands what you do best.'}</h1><Field label={brand ? 'Brand name' : 'Display name'} placeholder={brand ? 'Vyral Studios' : 'Alex Morgan'} /><Field label="Location" placeholder="Los Angeles, CA" /><Field label={brand ? 'About the brand' : 'Your niche'} placeholder={brand ? 'Tell creators about your company' : 'Fashion, lifestyle, travel'} /><PrimaryButton onClick={() => open('home')}>Complete profile</PrimaryButton></div>;
  }

  if (view === 'forgot-password') return <div className="v-auth"><Logo /><p className="v-kicker">ACCOUNT RECOVERY</p><h1>Forgot your password?</h1><p className="v-muted">Enter your email and we’ll send you a secure reset link.</p><Field label="Email address" placeholder="john.doe@email.com" type="email" /><PrimaryButton onClick={() => open('login')}>Send reset link</PrimaryButton><button className="v-text-button" onClick={() => open('login')}>Back to Log In</button></div>;

  if (view === 'signup-invitation') return <div className="v-auth"><Logo /><p className="v-kicker">YOU’RE INVITED</p><h1>Create your Vyralnet account.</h1><p className="v-muted">Your invitation has been validated. Choose a secure password to continue.</p><Field label="Password" placeholder="••••••••••••" type="password" /><Field label="Confirm password" placeholder="••••••••••••" type="password" /><PrimaryButton onClick={() => open('creator-onboarding')}>Create account</PrimaryButton></div>;

  if (view === 'legal') return <div className="v-auth v-auth--legal"><Logo /><p className="v-kicker">VYRALNET POLICIES</p><h1>Terms & Privacy</h1><h3>Using Vyralnet</h3><p>Vyralnet connects brands and creators through challenges, jobs and performance-based opportunities. Members must provide accurate information and use the platform responsibly.</p><h3>Your information</h3><p>Profile, engagement and payment information is used to operate the platform, personalize matches and fulfill transactions.</p><h3>Community standards</h3><p>Harassment, fraud, impersonation and manipulated performance data are prohibited.</p><PrimaryButton onClick={() => open('login')}>I understand</PrimaryButton></div>;

  const signup = view === 'signup' || view === 'common-signup';
  return <div className="v-auth"><Logo /><p className="v-kicker">{signup ? 'CREATE YOUR ACCOUNT' : 'WELCOME BACK'}</p><h1>{signup ? 'Join the creator economy.' : 'Log in to Vyralnet.'}</h1><p className="v-muted">{signup ? 'Start competing, connecting and growing.' : 'Enter your details to continue.'}</p><Field label="Email address" placeholder="john.doe@email.com" type="email" /><Field label="Password" placeholder="••••••••••••" type="password" />{signup && <div className="v-password-hints"><span>✓ 8+ characters</span><span>✓ Uppercase</span><span>✓ One number</span></div>}<button className="v-forgot" onClick={() => open('forgot-password')}>Forgot your password?</button><PrimaryButton onClick={() => open(signup ? 'signup-options' : 'home')}>{signup ? 'Create account' : 'Log In'}</PrimaryButton><button className="v-google" type="button" onClick={() => open(signup ? 'signup-options' : 'home')}><b>G</b> Continue with Google</button><p className="v-auth-switch">{signup ? 'Already have an account?' : 'New to Vyralnet?'} <button onClick={() => open(signup ? 'login' : 'signup')}>{signup ? 'Log In' : 'Create account'}</button></p><button className="v-legal-link" onClick={() => open('legal')}>Terms · Privacy · Cookies</button></div>;
}

function HomeScreen({ role, open }: { role: Role; open: (id: string) => void }) {
  return <div className="v-screen v-home"><div className="v-home-head"><div><span>Welcome back,</span><h1>{role === 'brand' ? 'Vyral Studios' : 'Alex Morgan'}</h1></div><button onClick={() => open('public-profile')}><Avatar /></button><button className="v-bell" onClick={() => open('notifications')}>◌<i /></button></div><div className="v-home-hero"><p>{role === 'brand' ? 'BRAND COMMAND CENTER' : 'CREATOR MOMENTUM'}</p><h2>{role === 'brand' ? 'Find the right creator for what’s next.' : 'Your next opportunity is already moving.'}</h2><div><span><b>{role === 'brand' ? '24' : '167K'}</b>{role === 'brand' ? 'Active creators' : 'VyralScore'}</span><span><b>{role === 'brand' ? '8' : '04'}</b>{role === 'brand' ? 'Live campaigns' : 'Live matches'}</span></div></div><h3 className="v-section-title">Discover the Features</h3><label className="v-search"><span>⌕</span><input placeholder="Search features..." /></label><div className="v-feature-grid">{featureSets[role].map(([title, id, icon, color]) => <button key={id} className={`v-feature v-feature--${color}`} onClick={() => open(id)}><i>{icon}</i><span>{title}</span><b>→</b></button>)}</div></div>;
}

function StatsScreen({ role, open }: { role: Role; open: (id: string) => void }) {
  return <div className="v-screen"><TopBar title="Stats" onBack={() => open('home')} /><div className="v-period"><button>Week</button><button className="is-active">Month</button><button>Year</button></div><section className="v-score-card"><p>{role === 'brand' ? 'CAMPAIGN PERFORMANCE' : 'YOUR VYRALSCORE'}</p><strong>{role === 'brand' ? '2.8M' : '167,300'}</strong><span>↑ 18.4% this month</span><div className="v-chart" aria-label="Performance trend"><i /><i /><i /><i /><i /><i /><i /></div></section><div className="v-metrics"><article><span>Reach</span><b>{role === 'brand' ? '4.2M' : '984K'}</b><small>+14%</small></article><article><span>Engagement</span><b>8.7%</b><small>+2.1%</small></article><article><span>{role === 'brand' ? 'Creators' : 'Wins'}</span><b>{role === 'brand' ? '48' : '12'}</b><small>Top 8%</small></article><article><span>Earnings</span><b>{role === 'brand' ? '$18K' : '$4.8K'}</b><small>This month</small></article></div><button className="v-list-row" onClick={() => open('xp-history')}><span className="v-list-icon">↗</span><div><b>Performance history</b><small>See every score change and milestone</small></div><i>›</i></button></div>;
}

function ChatScreen({ role, open }: { role: Role; open: (id: string) => void }) {
  return <div className="v-screen"><TopBar title={role === 'brand' ? 'Chat & Email' : 'Chat'} onBack={() => open('home')} action={<button className="v-round-action">＋</button>} />{role === 'brand' && <div className="v-tabs"><button className="is-active">Messages</button><button>Email</button></div>}<label className="v-search"><span>⌕</span><input placeholder="Search conversations" /></label><div className="v-conversations">{people.map((person, index) => <button key={person.name} onClick={() => open('brand-chat')}><Avatar person={person} /><div><b>{person.name}</b><span>{index === 0 ? 'The contract looks great—thank you!' : index === 1 ? 'I uploaded the final video.' : 'Excited to get started!'}</span></div><time>{index === 0 ? '2m' : index === 1 ? '1h' : 'Tue'}</time>{index === 0 && <i />}</button>)}</div></div>;
}

const brandSettings = [['Public Profile', 'public-profile', '◉'], ['Notifications', 'notifications', '◌'], ['Change Password', 'change-password', '◇'], ['Membership', 'membership', '♕'], ['Bank Account', 'bank-account', '$'], ['Help & Support', 'help-support', '?']];
const creatorSettings = [['Edit Profile', 'edit-profile', '◉'], ['Notifications', 'notifications', '◌'], ['Change Password', 'change-password', '◇'], ['Payment Methods', 'payment-methods', '$'], ['Help & Support', 'help-support', '?']];

function SettingsScreen({ role, open }: { role: Role; open: (id: string) => void }) {
  const rows = role === 'brand' ? brandSettings : creatorSettings;
  return <div className="v-screen"><TopBar title="Settings" onBack={() => open('home')} action={<button className="v-wallet-link" onClick={() => open('wallet')}>Wallet</button>} /><section className="v-profile-summary"><Avatar large /><div><h2>{role === 'brand' ? 'Vyral Studios' : 'Alex Morgan'}</h2><span>{role === 'brand' ? 'Entertainment · Los Angeles' : '@alexmorgan · Lifestyle'}</span></div><Badge>Verified</Badge></section><div className="v-settings-list">{rows.map(([title, id, icon]) => <button key={id} onClick={() => open(id)}><span>{icon}</span><b>{title}</b><i>›</i></button>)}<button className="is-danger" onClick={() => open('login')}><span>↪</span><b>Log Out</b><i>›</i></button></div></div>;
}

function ChallengeList({ open }: { open: (id: string) => void }) {
  return <><div className="v-tabs"><button className="is-active">Discover</button><button>Joined</button><button>Created</button></div><label className="v-search"><span>⌕</span><input placeholder="Search challenges" /></label><div className="v-card-list">{challenges.map((item, index) => <button className="v-challenge-card" key={item.title} onClick={() => open(index === 2 ? 'joined-challenge' : 'challenge-details')}><div className={`v-challenge-art v-challenge-art--${index + 1}`}><span>{item.brand}</span><b>{item.title}</b></div><div className="v-challenge-copy"><div><Badge tone={index === 2 ? 'purple' : 'green'}>{item.status}</Badge><small>{item.entrants}</small></div><h3>{item.title}</h3><p>Prize pool <b>{item.prize}</b></p></div></button>)}</div></>;
}

function PeopleList({ open, favorites = false }: { open: (id: string) => void; favorites?: boolean }) {
  return <><label className="v-search"><span>⌕</span><input placeholder="Search creators, categories or location" /></label><div className="v-filter-chips"><button className="is-active">All</button><button>Beauty</button><button>Fitness</button><button>Fashion</button></div><div className="v-card-list">{people.map((person, index) => <button className="v-person-card" key={person.name} onClick={() => open('influencer-profile')}><Avatar person={person} large /><div><h3>{person.name}</h3><span>{person.handle}</span><p>{person.niche}</p><small><b>{person.score}</b> VyralScore</small></div><i>{favorites || index === 0 ? '♥' : '♡'}</i></button>)}</div></>;
}

function JobsList({ open, invitations = false }: { open: (id: string) => void; invitations?: boolean }) {
  return <><div className="v-tabs"><button className="is-active">{invitations ? 'Invitations' : 'Active'}</button><button>Completed</button><button>Archived</button></div><div className="v-card-list">{jobs.map((job, index) => <button className="v-job-card" key={job.title} onClick={() => open(invitations ? 'creator-job-offer' : 'creator-job-details')}><div className="v-company-mark">{job.company.slice(0, 1)}</div><div><Badge tone={index === 0 ? 'orange' : index === 1 ? 'green' : 'purple'}>{job.state}</Badge><h3>{job.title}</h3><p>{job.company}</p><small>Project value <b>{job.pay}</b></small></div><i>›</i></button>)}</div></>;
}

const listViews: Record<string, { title: string; type: 'challenges' | 'people' | 'jobs' | 'simple'; rows?: string[] }> = {
  challenges: { title: 'Challenges', type: 'challenges' },
  'search-talents': { title: 'Search Talents', type: 'people' },
  'find-influencer': { title: 'Find Influencer', type: 'people' },
  'favorite-influencers': { title: 'Favorites', type: 'people' },
  'my-network': { title: 'My Network', type: 'people' },
  'job-invitation': { title: 'Job Invitations', type: 'jobs' },
  'my-jobs': { title: 'My Jobs', type: 'jobs' },
  contracts: { title: 'Contracts', type: 'simple', rows: ['Luma Beauty · Summer launch', 'Arc Athletics · Motion series', 'Wander House · Hotel launch'] },
  reports: { title: 'Reports', type: 'simple', rows: ['Summer Launch · Campaign report', 'Glow Up Challenge · Performance report', 'Creator Network · Monthly report'] },
  transactions: { title: 'Transactions', type: 'simple', rows: ['$850.00 · Luma Beauty', '$1,200.00 · Arc Athletics', '$425.00 · Challenge payout'] },
  notifications: { title: 'Notifications', type: 'simple', rows: ['Your Glow Up entry advanced to Round 2', 'Luma Beauty sent you a job offer', 'Payment of $850 was completed', 'Jasmine Cole accepted your connection'] },
  'xp-history': { title: 'XP History', type: 'simple', rows: ['+250 XP · Challenge win', '+75 XP · Content approved', '+25 XP · Daily activity', '+100 XP · Profile milestone'] },
};

function ListView({ id, open, role }: { id: string; open: (id: string) => void; role: Role }) {
  const config = listViews[id];
  return <div className="v-screen"><TopBar title={config.title} back onBack={() => open('home')} action={id === 'challenges' && role === 'brand' ? <button className="v-round-action" onClick={() => open('new-challenge')}>＋</button> : undefined} />{config.type === 'challenges' ? <ChallengeList open={open} /> : config.type === 'people' ? <PeopleList open={open} favorites={id === 'favorite-influencers'} /> : config.type === 'jobs' ? <JobsList open={open} invitations={id === 'job-invitation'} /> : <div className="v-simple-list">{config.rows?.map((row, index) => <button key={row} onClick={() => open(id === 'contracts' ? 'view-job-offer' : id === 'reports' ? 'content-details' : id === 'notifications' && index === 1 ? 'creator-job-offer' : 'home')}><span className="v-list-icon">{id === 'transactions' ? '$' : id === 'notifications' ? '◌' : id === 'xp-history' ? '↗' : '▣'}</span><div><b>{row.split(' · ')[0]}</b><small>{row.split(' · ')[1] || 'View details'}</small></div><i>›</i></button>)}</div>}</div>;
}

function Leaderboard({ open }: { open: (id: string) => void }) {
  return <div className="v-screen v-leaderboard"><TopBar title="Leaderboard" back onBack={() => open('home')} /><div className="v-tabs"><button className="is-active">Creators</button><button>Brands</button></div><div className="v-winner"><img src="/assets/mobile/golden-crown.svg" alt="" /><Avatar person={people[0]} large /><b>Jasmine Cole</b><span>183,420 VyralScore</span></div><div className="v-rank-list">{people.map((person, index) => <button key={person.name} onClick={() => open('influencer-profile')}><strong>{index + 1}</strong><Avatar person={person} /><div><b>{person.name}</b><span>{person.niche}</span></div><i>{person.score}</i></button>)}</div></div>;
}

function Wallet({ open }: { open: (id: string) => void }) {
  return <div className="v-screen"><TopBar title="Wallet" back onBack={() => open('settings')} action={<button className="v-wallet-link" onClick={() => open('transactions')}>History</button>} /><section className="v-wallet-card"><span>Available balance</span><strong>$4,825.50</strong><small>Pending · $850.00</small><div><button onClick={() => open('bank-account')}>Withdraw</button><button onClick={() => open('transactions')}>Transactions</button></div></section><h3 className="v-section-title">Recent activity</h3><div className="v-simple-list"><button><span className="v-list-icon">↓</span><div><b>Luma Beauty</b><small>Campaign payment</small></div><i>+$850</i></button><button><span className="v-list-icon">↗</span><div><b>Bank withdrawal</b><small>•••• 2840</small></div><i>-$1,000</i></button></div></div>;
}

function Profile({ role, open }: { role: Role; open: (id: string) => void }) {
  return <div className="v-screen"><TopBar title="Public Profile" back onBack={() => open('settings')} action={<button className="v-wallet-link" onClick={() => open('edit-profile')}>Edit</button>} /><section className="v-public-profile"><Avatar large /><h2>{role === 'brand' ? 'Vyral Studios' : 'Alex Morgan'}</h2><span>{role === 'brand' ? '@vyralstudios' : '@alexmorgan'}</span><Badge>Verified profile</Badge><p>{role === 'brand' ? 'Building culture-defining entertainment with the world’s most original creators.' : 'Lifestyle creator sharing fashion, travel and the moments in between.'}</p><div><span><b>167K</b>VyralScore</span><span><b>842K</b>Followers</span><span><b>8.7%</b>Engagement</span></div></section><h3 className="v-section-title">{role === 'brand' ? 'Active campaigns' : 'Your packages'}</h3><button className="v-package" onClick={() => open(role === 'brand' ? 'challenges' : 'edit-packages')}><div><b>{role === 'brand' ? 'Glow Up Challenge' : 'Short-form video package'}</b><span>{role === 'brand' ? '128 creators · $2,500 pool' : '1 edited video · 2 revisions'}</span></div><strong>{role === 'brand' ? 'Live' : '$650'}</strong></button></div>;
}

function DetailView({ id, open }: { id: string; open: (id: string) => void }) {
  const isChallenge = ['challenge-details', 'joined-challenge', 'challenge-rounds', 'round-details'].includes(id);
  const isJob = ['view-job-offer', 'brand-job-details', 'creator-job-details', 'creator-job-offer'].includes(id);
  const title = isChallenge ? (id === 'challenge-rounds' ? 'Challenge Rounds' : id === 'round-details' ? 'Round 2' : 'Glow Up Challenge') : isJob ? 'Summer Launch Campaign' : id === 'influencer-profile' ? 'Creator Profile' : id === 'content-details' ? 'Content Details' : 'Email Detail';
  if (id === 'influencer-profile') return <div className="v-screen"><TopBar title="Creator Profile" back onBack={() => open('search-talents')} /><section className="v-public-profile"><Avatar person={people[0]} large /><h2>{people[0].name}</h2><span>{people[0].handle}</span><Badge>Top 5% creator</Badge><p>Beauty and lifestyle creator focused on high-energy product stories and authentic routines.</p><div><span><b>183K</b>VyralScore</span><span><b>1.2M</b>Followers</span><span><b>9.4%</b>Engagement</span></div></section><div className="v-dual-actions"><button onClick={() => open('brand-chat')}>Message</button><button onClick={() => open('job-offer')}>Send offer</button></div><h3 className="v-section-title">Recent work</h3><div className="v-gallery"><i /><i /><i /></div></div>;
  return <div className="v-screen"><TopBar title={title} back onBack={() => open(isChallenge ? 'challenges' : isJob ? 'my-jobs' : 'reports')} />{isChallenge && <div className="v-detail-hero v-detail-hero--challenge"><Badge>LIVE NOW</Badge><h2>Glow Up Challenge</h2><p>Luma Beauty</p></div>}{isJob && <div className="v-detail-hero v-detail-hero--job"><Badge tone="orange">OFFER RECEIVED</Badge><h2>Summer launch campaign</h2><p>Luma Beauty · Los Angeles</p></div>}{!isChallenge && !isJob && <div className="v-detail-hero v-detail-hero--content"><Badge tone="purple">UNDER REVIEW</Badge><h2>Summer routine — final cut</h2><p>Submitted by Jasmine Cole</p></div>}<div className="v-detail-stats"><span><small>{isChallenge ? 'Prize pool' : 'Project value'}</small><b>{isChallenge ? '$2,500' : '$850'}</b></span><span><small>{isChallenge ? 'Creators' : 'Due date'}</small><b>{isChallenge ? '128' : 'Sep 18'}</b></span><span><small>{isChallenge ? 'Round' : 'Deliverables'}</small><b>{isChallenge ? '2 of 4' : '3 videos'}</b></span></div><section className="v-copy-section"><h3>Overview</h3><p>Create high-energy content that shows your transformation using Luma’s new collection. Keep the tone authentic, confident and visually bold.</p><h3>Requirements</h3><ul><li>Vertical 9:16 video, 20–45 seconds</li><li>Show the product clearly in the opening</li><li>Include campaign tags and disclosure</li></ul></section><PrimaryButton onClick={() => open(isChallenge ? 'challenge-rounds' : isJob ? 'brand-chat' : 'reports')}>{isChallenge ? 'View rounds' : isJob ? 'Message brand' : 'Approve content'}</PrimaryButton></div>;
}

function FormView({ id, open }: { id: string; open: (id: string) => void }) {
  const configs: Record<string, { title: string; kicker: string; fields: [string, string][]; action: string; next: string }> = {
    'new-challenge': { title: 'Create a Challenge', kicker: 'NEW CAMPAIGN', fields: [['Challenge name', 'Summer Creator Challenge'], ['Prize pool', '$2,500'], ['Description', 'What should creators make?']], action: 'Preview challenge', next: 'challenge-details' },
    'job-offer': { title: 'Create Job Offer', kicker: 'HIRE JASMINE', fields: [['Project title', 'Summer launch campaign'], ['Project value', '$850'], ['Deliverables', 'Three short-form videos']], action: 'Review offer', next: 'view-job-offer' },
    'edit-profile': { title: 'Edit Profile', kicker: 'PROFILE DETAILS', fields: [['Display name', 'Alex Morgan'], ['Username', '@alexmorgan'], ['Bio', 'Lifestyle creator and storyteller']], action: 'Save profile', next: 'public-profile' },
    'edit-packages': { title: 'Edit Packages', kicker: 'CREATOR SERVICES', fields: [['Package title', 'Short-form video package'], ['Price', '$650'], ['Deliverables', 'One edited video · 2 revisions']], action: 'Save package', next: 'public-profile' },
    'add-payment-method': { title: 'Add Payment Method', kicker: 'SECURE PAYMENT', fields: [['Name on card', 'Alex Morgan'], ['Card number', '4242 4242 4242 4242'], ['Expiration', '12 / 29']], action: 'Save card', next: 'payment-methods' },
    'change-password': { title: 'Change Password', kicker: 'ACCOUNT SECURITY', fields: [['Current password', '••••••••••'], ['New password', '••••••••••'], ['Confirm password', '••••••••••']], action: 'Update password', next: 'settings' },
    'submit-content': { title: 'Submit Content', kicker: 'FINAL DELIVERY', fields: [['Content link', 'https://instagram.com/reel/...'], ['Caption', 'Write your final post caption'], ['Notes', 'Anything the brand should know']], action: 'Submit for review', next: 'posting-confirmed' },
  };
  const config = configs[id];
  return <div className="v-screen"><TopBar title={config.title} back onBack={() => open('home')} /><p className="v-kicker">{config.kicker}</p><div className="v-form-card">{config.fields.map(([label, placeholder]) => <Field key={label} label={label} placeholder={placeholder} />)}{id === 'new-challenge' && <><label className="v-field"><span>Start date</span><input type="date" /></label><label className="v-field"><span>End date</span><input type="date" /></label></>}{id === 'submit-content' && <button className="v-upload" type="button"><span>＋</span><b>Upload preview</b><small>MP4, MOV or image</small></button>}<PrimaryButton onClick={() => open(config.next)}>{config.action}</PrimaryButton></div></div>;
}

function UtilityView({ id, open }: { id: string; open: (id: string) => void }) {
  if (id === 'posting-confirmed') return <div className="v-success"><span>✓</span><h1>Content submitted!</h1><p>Luma Beauty has been notified. You’ll receive an update when the content is reviewed.</p><PrimaryButton onClick={() => open('my-jobs')}>Back to My Jobs</PrimaryButton></div>;
  if (id === 'tournament-match') return <div className="v-tournament"><p>ROUND 1 · LIVE</p><h1>Pick-a-Ball</h1><span>Your Scout power-up and tournament match are ready.</span><a href="/?preview=pick">Open live game <i>→</i></a></div>;
  if (id === 'brand-chat' || id === 'send-message') return <div className="v-screen v-message"><TopBar title={id === 'send-message' ? 'New Message' : 'Jasmine Cole'} back onBack={() => open('chat')} action={<Avatar />} /><div className="v-message-day">Today</div>{id === 'brand-chat' && <><div className="v-bubble v-bubble--them">Hi! I reviewed the campaign brief and I’m excited to get started.</div><div className="v-bubble v-bubble--me">Amazing. The team loves your style—let me know if you need anything.</div><div className="v-bubble v-bubble--them">The contract looks great. Thank you!</div></>}<div className="v-message-compose"><button>＋</button><input placeholder="Write a message" /><button>↑</button></div></div>;
  if (id === 'posting-window') return <div className="v-screen"><TopBar title="Posting Window" back onBack={() => open('my-jobs')} /><div className="v-countdown"><p>POSTING OPENS IN</p><strong>02:18:42</strong><span>September 12 at 9:00 AM</span></div><section className="v-copy-section"><h3>Before you post</h3><ul><li>Use the approved final edit</li><li>Include #LumaGlowUp and @lumabeauty</li><li>Keep the post live for at least 30 days</li></ul></section><PrimaryButton onClick={() => open('submit-content')}>Submit content</PrimaryButton></div>;
  if (id === 'payment-methods') return <div className="v-screen"><TopBar title="Payment Methods" back onBack={() => open('settings')} action={<button className="v-round-action" onClick={() => open('add-payment-method')}>＋</button>} /><div className="v-payment-card"><span>VISA</span><b>•••• •••• •••• 4242</b><small>Alex Morgan · 12/29</small></div><p className="v-muted">Your default payment method is used for memberships and brand services.</p></div>;
  if (id === 'bank-account') return <div className="v-screen"><TopBar title="Bank Account" back onBack={() => open('settings')} /><div className="v-bank-card"><span>Connected account</span><h2>Chase Bank · •••• 2840</h2><Badge>Verified</Badge><p>Deposits typically arrive in 1–2 business days.</p></div><PrimaryButton muted>Update bank details</PrimaryButton></div>;
  if (id === 'membership') return <div className="v-screen"><TopBar title="Membership" back onBack={() => open('settings')} /><div className="v-membership"><p>VYRALNET PRO</p><h2>Grow faster with better tools.</h2><strong>$19<span>/month</span></strong><ul><li>Advanced performance analytics</li><li>Priority access to new challenges</li><li>Unlimited creator lists</li><li>Verified Pro badge</li></ul><PrimaryButton>Manage membership</PrimaryButton></div></div>;
  if (id === 'help-support') return <div className="v-screen"><TopBar title="Help & Support" back onBack={() => open('settings')} /><label className="v-search"><span>⌕</span><input placeholder="Search help articles" /></label><div className="v-settings-list">{['Getting started', 'Challenges and scoring', 'Payments and withdrawals', 'Account and security', 'Contact support'].map((title) => <button key={title}><span>?</span><b>{title}</b><i>›</i></button>)}</div></div>;
  if (id === 'delete-account') return <div className="v-screen"><TopBar title="Delete Account" back onBack={() => open('settings')} /><div className="v-danger-card"><span>!</span><h2>This action is permanent.</h2><p>Deleting your account removes your profile, content, history and active opportunities after the required retention period.</p><label><input type="checkbox" /> I understand that this cannot be undone.</label><button type="button">Delete my account</button></div></div>;
  return <div className="v-screen"><TopBar title="Coming from the recovered app" back onBack={() => open('home')} /><div className="v-empty"><span>✓</span><h2>This route is connected.</h2><p>Its production data will populate after the backend and account services are restored.</p><PrimaryButton onClick={() => open('home')}>Return home</PrimaryButton></div></div>;
}

function BottomTabs({ current, open }: { current: string; open: (id: string) => void }) {
  return <nav className="v-bottom-tabs" aria-label="Primary navigation">{[['home', '⌂', 'Home'], ['stats', '⌁', 'Stats'], ['chat', '○', 'Chat'], ['settings', '⚙', 'Settings']].map(([id, icon, label]) => <button className={current === id ? 'is-active' : ''} key={id} onClick={() => open(id)}><i>{icon}</i><span>{label}</span>{id === 'chat' && <b />}</button>)}</nav>;
}

export default function DemoPage() {
  const [role, setRole] = useState<Role>('brand');
  const [view, setView] = useState('login');
  const [history, setHistory] = useState<string[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requested = params.get('screen');
    const requestedRole = params.get('role');
    // The shareable query string is external navigation state, synchronized once.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (requested && screens.some((screen) => screen.id === requested)) setView(requested);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (requestedRole === 'creator' || requestedRole === 'brand') setRole(requestedRole);
  }, []);

  const open = (id: string) => {
    if (id === view) return;
    setHistory((items) => [...items.slice(-14), view]);
    setView(id);
    setDrawerOpen(false);
    const url = new URL(window.location.href);
    url.searchParams.set('screen', id);
    url.searchParams.set('role', role);
    window.history.replaceState({}, '', url);
    document.querySelector('.v-app-scroll')?.scrollTo({ top: 0 });
  };

  const goBack = () => {
    const previous = history.at(-1) || 'home';
    setHistory((items) => items.slice(0, -1));
    setView(previous);
    const url = new URL(window.location.href);
    url.searchParams.set('screen', previous);
    window.history.replaceState({}, '', url);
  };

  const switchRole = (nextRole: Role) => {
    setRole(nextRole);
    setHistory((items) => [...items.slice(-14), view]);
    setView('home');
    setDrawerOpen(false);
    const url = new URL(window.location.href);
    url.searchParams.set('screen', 'home');
    url.searchParams.set('role', nextRole);
    window.history.replaceState({}, '', url);
    document.querySelector('.v-app-scroll')?.scrollTo({ top: 0 });
  };

  const grouped = useMemo(() => screens.reduce<Record<string, ScreenItem[]>>((result, item) => {
    (result[item.group] ||= []).push(item);
    return result;
  }, {}), []);

  const authViews = ['login', 'signup', 'common-signup', 'forgot-password', 'signup-invitation', 'legal', 'signup-options', 'brand-onboarding', 'creator-onboarding'];
  const tabViews = ['home', 'stats', 'chat', 'settings'];
  const formViews = ['new-challenge', 'job-offer', 'edit-profile', 'edit-packages', 'add-payment-method', 'change-password', 'submit-content'];
  const detailViews = ['challenge-details', 'joined-challenge', 'challenge-rounds', 'round-details', 'influencer-profile', 'view-job-offer', 'brand-job-details', 'creator-job-details', 'creator-job-offer', 'content-details', 'view-email'];

  let content: ReactNode;
  if (authViews.includes(view)) content = <AuthScreen view={view} open={open} setRole={(nextRole) => { setRole(nextRole); }} />;
  else if (view === 'home') content = <HomeScreen role={role} open={open} />;
  else if (view === 'stats') content = <StatsScreen role={role} open={open} />;
  else if (view === 'chat') content = <ChatScreen role={role} open={open} />;
  else if (view === 'settings') content = <SettingsScreen role={role} open={open} />;
  else if (listViews[view]) content = <ListView id={view} open={open} role={role} />;
  else if (view === 'leaderboard') content = <Leaderboard open={open} />;
  else if (view === 'wallet') content = <Wallet open={open} />;
  else if (view === 'public-profile') content = <Profile role={role} open={open} />;
  else if (detailViews.includes(view)) content = <DetailView id={view} open={open} />;
  else if (formViews.includes(view)) content = <FormView id={view} open={open} />;
  else content = <UtilityView id={view} open={open} />;

  return (
    <main className="v-demo-page">
      <aside className={`v-demo-nav${drawerOpen ? ' is-open' : ''}`}>
        <div className="v-demo-nav__head"><Logo /><button onClick={() => setDrawerOpen(false)}>×</button></div>
        <p>Interactive browser build</p>
        <div className="v-role-switch"><button className={role === 'brand' ? 'is-active' : ''} onClick={() => switchRole('brand')}>Brand</button><button className={role === 'creator' ? 'is-active' : ''} onClick={() => switchRole('creator')}>Creator</button></div>
        <div className="v-route-list">{Object.entries(grouped).map(([group, items]) => <section key={group}><h2>{group}</h2>{items.map((item) => <button className={view === item.id ? 'is-active' : ''} key={item.id} onClick={() => open(item.id)}><span>{item.title}</span><i>↗</i></button>)}</section>)}</div>
      </aside>
      {drawerOpen && <button className="v-demo-backdrop" onClick={() => setDrawerOpen(false)} aria-label="Close screen library" />}
      <section className="v-demo-stage">
        <header className="v-demo-toolbar"><div><button onClick={() => setDrawerOpen(true)}>☰</button><span>Vyralnet iOS web preview</span><Badge>Demo data</Badge></div><nav><a href="/">Welcome</a><a href="/screens">Build board</a></nav></header>
        <div className="v-device-shell">
          <div className="v-device-camera" aria-hidden="true" />
          <div className="v-app-scroll">{content}</div>
          {!authViews.includes(view) && <BottomTabs current={tabViews.includes(view) ? view : ''} open={open} />}
        </div>
        <div className="v-demo-caption"><span>{screens.find((screen) => screen.id === view)?.title || view}</span><button onClick={goBack} disabled={!history.length}>Back</button><button onClick={() => setDrawerOpen(true)}>All {screens.length} screens</button></div>
      </section>
    </main>
  );
}
