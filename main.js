/* ================================================================
   Ultimate eSport Championship — main.js
   All interactivity: data, rendering, events, animations
================================================================ */

// ============================================================
// HERO SLIDESHOW
// ============================================================
(function () {
  const slides = document.querySelectorAll('.hero-slide');
  if (!slides.length) return;
  let current = 0;
  setInterval(() => {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  }, 5000);
})();

// ============================================================
// MOCK DATA
// ============================================================
const GAMES_DATA = [
  {
    id: 'fifa',
    title: 'FC26',
    mode: '1v1 / 2v2',
    prize: '₵20,000',
    players: 0,
    featured: true,
    color: '#ffd700',
    bg: 'linear-gradient(135deg,#1a1200,#332800)',
    image: 'images/EA FC 26 1.png',
    description: 'The beautiful game goes digital. Compete in Africa\'s most competitive FIFA tournament with true-to-life gameplay and next-gen mechanics.',
    rules: [
      'Standard FC26 tournament settings apply',
      'Match duration: 6-minute halves (group), 8-minute halves (knockout)',
      'Default squad restrictions — no custom tactics exploits',
      'All matches played on designated tournament consoles',
      'Pause requests limited to 2 per match per team',
      'Dispute resolution within 5 minutes by referee'
    ]
  },
  {
    id: 'cod',
    title: 'Call of Duty',
    mode: '5v5 Team',
    prize: 'Coming Soon',
    players: 0,
    featured: false,
    color: '#00d4ff',
    bg: 'linear-gradient(135deg,#001220,#002240)',
    image: 'images/Call of Duty 4 Modern Warfare Remastered….jpg',
    description: 'Squad-based warfare on competitive multiplayer maps. Prove your tactical IQ and gunfight mechanics against the best.',
    rules: [
      'Team size: 5 players + 1 substitute',
      'Map pool: Tournament-approved maps only',
      'All DLC weapons are banned unless approved',
      'Teams must confirm roster 1 hour before match',
      'Coaches may communicate during timeouts only',
      'Anti-cheat software verification mandatory'
    ]
  },
  {
    id: 'fortnite',
    title: 'Fortnite',
    mode: 'Solos / Duos',
    prize: 'Coming Soon',
    players: 0,
    featured: false,
    color: '#a855f7',
    bg: 'linear-gradient(135deg,#130a2a,#220f44)',
    image: 'images/Fortnite.jpg',
    description: 'Build, battle, and outlast the competition in high-stakes battle royale format with custom lobby settings. Whether you\'re dropping solo or locking in with a duo partner, this tournament tests your building speed, game sense, and clutch plays under pressure. Compete against Ghana\'s sharpest Fortnite players in a structured competitive format with live spectating.',
    rules: [
      'Custom lobby — no public match entries',
      'Placement and elimination point scoring system',
      'No teaming between separate competitors',
      'Default graphic settings for fairness',
      'Must use registered Epic Games account',
      'Stream sniping results in immediate disqualification',
      'Players must join lobby at least 10 minutes before match start',
      'Any glitch or exploit abuse leads to immediate disqualification',
      'Controller and keyboard/mouse both permitted',
      'Players are responsible for their own stable internet connection',
      'Match replays may be reviewed in case of disputes',
      'Tournament organiser decisions on disputes are final'
    ]
  },
  {
    id: 'mk',
    title: 'Mortal Kombat',
    mode: '1v1 Fighter',
    prize: 'Coming Soon',
    players: 0,
    featured: false,
    color: '#ff3a3a',
    bg: 'linear-gradient(135deg,#200000,#3d0000)',
    image: 'images/Mortal Kombat 9.jpg',
    description: 'The ultimate fighting game showcase. Master your kombatant and execute perfect combos in high-pressure bracket play.',
    rules: [
      'Best of 3 games per set; best of 5 for semifinals and finals',
      'Character lock after game 1 per set',
      'Stage selection by coin flip in game 1',
      'Loser picks stage from game 2 onwards',
      'No controller modification devices allowed',
      'Fatality inputs are not required in tournament sets'
    ]
  }
];

const TEAMS_DATA = [
  { name: 'University of Ghana',         game: 'FC26', color: '#007a3d', abbr: 'UG',  logo: 'Team logos/University of Ghana logo.png' },
  { name: 'UPSA',                        game: 'FC26', color: '#00d4ff', abbr: 'UP',  logo: 'Team logos/UPSA logo.png' },
  { name: 'GH Media',                    game: 'FC26', color: '#a855f7', abbr: 'GM',  logo: 'Team logos/GH Media logo.png' },
  { name: 'Central University',          game: 'FC26', color: '#ff3a3a', abbr: 'CU',  logo: 'Team logos/Central University logo.png' },
  { name: 'KNUST',                       game: 'FC26', color: '#ffd700', abbr: 'KN',  logo: 'Team logos/KNUST logo.png' },
  { name: 'Kumasi Technical University', game: 'FC26', color: '#ff8c00', abbr: 'KTU', logo: 'Team logos/Kumasi Technical University logo.png' },
  { name: 'Pentecost University',        game: 'FC26', color: '#00ff88', abbr: 'PU',  logo: 'Team logos/Pentecost University logo.png' },
];

const PLAYERS_DATA = [
  { name: 'Kwame Asante', nick: 'KWAME_GH',   role: 'Striker / FC26',       stats: ['97 ATK', '88 SHT'], color: '#ffd700' },
  { name: 'Amara Diallo', nick: 'PHANTOM_X',  role: 'Winger / FC26',         stats: ['92 SPD', '85 DRB'], color: '#00d4ff' },
  { name: 'Tunde Okafor', nick: 'SHADOWBLADE',role: 'Midfielder / FC26',     stats: ['91 PAS', '87 VIS'], color: '#a855f7' },
  { name: 'Kofi Mensah',  nick: 'GOLDEN_K',   role: 'Goalkeeper / FC26',     stats: ['95 REF', '90 SVR'], color: '#00ff88' },
  { name: 'Ife Adeyemi',  nick: 'STORM_IFE',  role: 'Defender / FC26',       stats: ['89 DEF', '86 TAC'], color: '#ff3a3a' },
  { name: 'Nana Owusu',   nick: 'NANO99',     role: 'Left Back / FC26',      stats: ['83 SPD', '80 CRS'], color: '#ff8c00' },
  { name: 'Zara Kamau',   nick: 'ZERO_Z',     role: 'Right Winger / FC26',   stats: ['88 DRB', '84 SHT'], color: '#00d4ff' },
  { name: 'Emeka Obi',    nick: 'VENOM_E',    role: 'Attacking Mid / FC26',  stats: ['93 PAS', '91 ATK'], color: '#ffd700' },
];

const FIXTURES_DATA = [
  { id: 1, team1: 'University of Ghana',         team2: 'UPSA',                       game: 'FC26', date: 'Aug 19', time: '10:00 AM', status: 'upcoming', score: null },
  { id: 2, team1: 'KNUST',                       team2: 'Central University',          game: 'FC26', date: 'Aug 19', time: '12:00 PM', status: 'upcoming', score: null },
  { id: 3, team1: 'GH Media',                    team2: 'Pentecost University',        game: 'FC26', date: 'Aug 19', time: '02:00 PM', status: 'upcoming', score: null },
  { id: 4, team1: 'Kumasi Technical University', team2: 'University of Ghana',         game: 'FC26', date: 'Aug 20', time: '10:00 AM', status: 'upcoming', score: null },
  { id: 5, team1: 'UPSA',                        team2: 'KNUST',                       game: 'FC26', date: 'Aug 20', time: '12:00 PM', status: 'upcoming', score: null },
  { id: 6, team1: 'Central University',          team2: 'GH Media',                    game: 'FC26', date: 'Aug 20', time: '02:00 PM', status: 'upcoming', score: null },
  { id: 7, team1: 'Pentecost University',        team2: 'Kumasi Technical University', game: 'FC26', date: 'Aug 21', time: '10:00 AM', status: 'upcoming', score: null },
  { id: 8, team1: 'KNUST',                       team2: 'University of Ghana',         game: 'FC26', date: 'Aug 21', time: '12:00 PM', status: 'upcoming', score: null },
];

const LEADERBOARD_DATA = [
  { rank: 1, team: 'University of Ghana',         abbr: 'UG',  color: '#007a3d', matches: 0, wins: 0, losses: 0, points: 0 },
  { rank: 2, team: 'UPSA',                        abbr: 'UP',  color: '#00d4ff', matches: 0, wins: 0, losses: 0, points: 0 },
  { rank: 3, team: 'GH Media',                    abbr: 'GM',  color: '#a855f7', matches: 0, wins: 0, losses: 0, points: 0 },
  { rank: 4, team: 'Central University',          abbr: 'CU',  color: '#ff3a3a', matches: 0, wins: 0, losses: 0, points: 0 },
  { rank: 5, team: 'KNUST',                       abbr: 'KN',  color: '#ffd700', matches: 0, wins: 0, losses: 0, points: 0 },
  { rank: 6, team: 'Kumasi Technical University', abbr: 'KTU', color: '#ff8c00', matches: 0, wins: 0, losses: 0, points: 0 },
  { rank: 7, team: 'Pentecost University',        abbr: 'PU',  color: '#00ff88', matches: 0, wins: 0, losses: 0, points: 0 },
];

const STREAM_SCHEDULE = [
  { time: '09:00', match: 'Opening Ceremony & Group Stage Draw', game: 'All Games' },
  { time: '10:00', match: 'FC26 — Group A Matches', game: 'FC26' },
  { time: '12:00', match: 'Call of Duty — Qualifier Round 1', game: 'Call of Duty' },
  { time: '14:00', match: 'Fortnite — Solos Qualifier', game: 'Fortnite' },
  { time: '16:00', match: 'Mortal Kombat — 1v1 Bracket', game: 'Mortal Kombat' },
  { time: '19:00', match: 'Semifinal Highlights & Analysis', game: 'All Games' },
  { time: '20:00', match: 'Grand Finals — All Titles', game: 'FINALS' },
];

const NEWS_DATA = [
  {
    category: 'FC26 News',
    date: 'April 23, 2026',
    title: 'World Tour Season 7: South Africa \'10',
    excerpt: 'EA Sports FC 26 launches its latest World Tour season, celebrating the iconic South Africa 2010 era with exclusive themed content.',
    full: 'World Tour Season 7 takes players back to the iconic South Africa 2010 era, introducing exclusive kits, stadiums, and player items inspired by one of football\'s greatest tournaments. This seasonal content brings a fresh wave of challenges and rewards for FC 26 players worldwide.',
    image: 'https://drop-assets.ea.com/images/7C2g8p50lZrgQY3Xnw12Gb/8fad2a1f23acd9534272cbe830b7d412/worldtourseason7.png',
    color: '#001a10'
  },
  {
    category: 'FC26 News',
    date: 'April 17, 2026',
    title: 'Team of the Season — Best of the Best',
    excerpt: 'EA Sports FC 26\'s Team of the Season promotion is here, featuring special golden-trimmed cards for the most outstanding performers this season.',
    full: 'The Team of the Season promotion highlights the best-performing players across Europe\'s top leagues. Special golden-trimmed cards with boosted stats are available through packs, objectives, and SBCs, giving FC 26 Ultimate Team players the chance to add elite talent to their squads.',
    image: 'https://drop-assets.ea.com/images/5Mv1YO9Gv58U0kLeHSQtLU/d36ccccc8443a569aab0e14ed1643eb1/FC26_TOTS_Generic_-XBOX.jpg',
    color: '#1a1000'
  },
  {
    category: 'FC26 News',
    date: 'April 7, 2026',
    title: 'Icons Edition — Legends Join FC 26',
    excerpt: 'Zlatan Ibrahimović, Zinedine Zidane, and Alex Morgan headline the Icons Edition, bringing legendary players to FC 26 Ultimate Team.',
    full: 'The Icons Edition of EA Sports FC 26 celebrates football\'s all-time greats, with Zlatan Ibrahimović, Zinedine Zidane, and Alex Morgan leading the charge. Players who pick up the Icons Edition receive exclusive icon items and early access bonuses to kick off their Ultimate Team journey in style.',
    image: 'https://drop-assets.ea.com/images/1tOl88hpcYLXlI70e4DwGy/2efda409657e970c18c40f08a06aebe9/ICONS_Edition_Cover_Final_16x9.png',
    color: '#0d001a'
  },
  {
    category: 'FC26 News',
    date: 'April 3, 2026',
    title: 'Trophy Titans Promo Arrives in FC 26',
    excerpt: 'Alex Morgan and Zinedine Zidane star in the Trophy Titans promotion, wearing striking black jerseys with gold accents.',
    full: 'Trophy Titans celebrates the greatest winners in football history. Featuring Alex Morgan and Zinedine Zidane in iconic black and gold designs, this promotion brings special high-rated cards tied to trophy-winning moments, available through packs and in-game challenges throughout the event.',
    image: 'https://drop-assets.ea.com/images/roHa4VFuLW1y4oGQambfv/5bcfa751fb0b2101b99041bbb29209a3/FUT26_TrophyTitans_16x9_ICONS_Screenshot.png',
    color: '#001220'
  },
  {
    category: 'FC26 News',
    date: 'March 27, 2026',
    title: 'UEFA Road to the Final — Dynamic Cards Updated',
    excerpt: 'FC 26\'s UEFA Road to the Final promotion delivers dynamic cards that upgrade in real time as clubs progress through European competition.',
    full: 'The UEFA Road to the Final promotion is back in EA Sports FC 26. Dynamic player cards receive live upgrades as their clubs advance through the UEFA Champions League, Europa League, and Conference League, making every matchday in real life matter directly inside your Ultimate Team squad.',
    image: 'https://drop-assets.ea.com/images/6Qk0stSgpjaBJgmPkygWXJ/2ac3ca714d95dfe77fe722caaf417fee/RTTF-Generic-16x9_Creator_Suite.png',
    color: '#000d1a'
  },
  {
    category: 'FC26 News',
    date: 'March 4, 2026',
    title: 'Title Update v1.5.0 Patch Notes Released',
    excerpt: 'EA Sports drops the v1.5.0 title update for FC 26, bringing key gameplay balance changes, bug fixes, and quality-of-life improvements.',
    full: 'Title Update v1.5.0 for EA Sports FC 26 addresses several gameplay balance issues raised by the community, including improvements to defensive AI behaviour, passing responsiveness, and goalkeeper animations. The update also fixes a number of reported bugs in Career Mode and Ultimate Team, delivering a smoother overall experience.',
    image: 'https://drop-assets.ea.com/images/4uEybbcFmX0m7iBWoQtjKx/15e12ed86789cc73591dfd97fd297b89/fc26-Pitch-Notes-Title-Update-1.5.jpg',
    color: '#0a0a1a'
  },
];

// ============================================================
// THEME MANAGEMENT
// ============================================================
function initTheme() {
  const saved = localStorage.getItem('uec-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  updateThemeIcon(saved);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('uec-theme', next);
  updateThemeIcon(next);
}

function updateThemeIcon(theme) {
  const icon = document.getElementById('theme-icon');
  if (icon) {
    icon.setAttribute('data-lucide', theme === 'dark' ? 'sun' : 'moon');
    lucide.createIcons();
  }
}

// ============================================================
// NAVIGATION
// ============================================================
function initNav() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
    updateActiveSection();
    toggleBackToTop();
  }, { passive: true });

  // Hamburger
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  // Smooth scroll links
  document.querySelectorAll('a[href^="#"], [data-scroll]').forEach(el => {
    el.addEventListener('click', e => {
      const href = el.getAttribute('href') || '#' + el.getAttribute('data-scroll');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
      }
    });
  });
}

function updateActiveSection() {
  const sections = ['home', 'about', 'registration', 'games', 'fixtures', 'livestream', 'contact'];
  let current = 'home';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= 100) current = id;
  });

  document.querySelectorAll('.nav-link, .mobile-link').forEach(link => {
    link.classList.toggle('active', link.getAttribute('data-section') === current);
  });
}

// ============================================================
// COUNTDOWN TIMER
// ============================================================
function initCountdown() {
  const targetDate = new Date('2026-06-06T09:00:00').getTime();

  function tick() {
    const now = Date.now();
    const diff = targetDate - now;
    if (diff <= 0) {
      ['days','hours','mins','secs'].forEach(u => {
        document.getElementById('cd-' + u).textContent = '00';
      });
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    document.getElementById('cd-days').textContent = String(d).padStart(2,'0');
    document.getElementById('cd-hours').textContent = String(h).padStart(2,'0');
    document.getElementById('cd-mins').textContent = String(m).padStart(2,'0');
    document.getElementById('cd-secs').textContent = String(s).padStart(2,'0');
  }

  tick();
  setInterval(tick, 1000);
}

// ============================================================
// COUNTER ANIMATION
// ============================================================
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.getAttribute('data-count'));
    let current = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = Math.floor(current).toLocaleString() + (target >= 1000 ? '+' : '');
    }, 16);
  });
}

// ============================================================
// RENDER GAMES
// ============================================================
function renderGames() {
  const container = document.getElementById('games-grid');
  container.innerHTML = GAMES_DATA.map(g => `
    <div class="game-card reveal ${g.featured ? 'featured' : ''}" onclick="openGameModal('${g.id}')">
      <div class="game-thumb">
        <div class="game-thumb-placeholder" style="background:${g.bg}">
          <img
            src="${g.image ? g.image.replace(/ /g, '%20') : 'https://images.unsplash.com/photo-' + (g.id === 'fortnite' ? '1493711662062-fa541adb3fc8' : '1511512578047-dfb367046420') + '?w=400&q=80&auto=format&fit=crop'}"
            alt="${g.title}"
            loading="lazy"
            onerror="this.style.display='none'"
            style="width:100%;height:auto;display:block;"
          />
        </div>
        <div class="game-overlay"></div>
        ${g.featured ? '<span class="featured-badge">Featured</span>' : ''}
      </div>
      <div class="game-info">
        <h3 class="game-title">${g.title}</h3>
        <div class="game-meta">
          <span class="game-meta-item">
            <i data-lucide="users" style="width:12px;height:12px;"></i>
            ${g.mode}
          </span>
          ${g.prize !== 'Coming Soon' ? `<span class="game-meta-item"><i data-lucide="trophy" style="width:12px;height:12px;"></i> Prize Pool</span>` : ''}
        </div>
        <div class="game-prize" ${g.prize === 'Coming Soon' ? 'style="color:#fff;font-size:18px;font-weight:900;letter-spacing:3px;text-transform:uppercase;font-family:\'Bebas Neue\',sans-serif;background:linear-gradient(90deg,#a855f7,#00d4ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;"' : ''}>${g.prize}</div>
        <p class="game-desc">${g.description}</p>
        <div class="game-card-footer">
          <button class="btn-rules" onclick="event.stopPropagation();openGameModal('${g.id}')">View Rules</button>
          <span class="player-count">
            <i data-lucide="user" style="width:12px;height:12px;color:var(--text-muted)"></i>
            ${g.players} players
          </span>
        </div>
      </div>
    </div>
  `).join('');
}

// ============================================================
// RENDER TEAMS
// ============================================================
function renderTeams() {
  const container = document.getElementById('teams-grid');
  container.innerHTML = TEAMS_DATA.map(t => `
    <div class="team-card">
      <div class="team-logo" style="background:${t.color}20;border:1px solid ${t.color}40;">
        <img src="${t.logo.replace(/ /g,'%20')}" alt="${t.name}" style="width:100%;height:100%;object-fit:contain;" onerror="this.replaceWith(document.createTextNode('${t.abbr}'))" />
      </div>
      <div class="team-name">${t.name}</div>
      <div class="team-game">${t.game}</div>
    </div>
  `).join('');
}

// ============================================================
// RENDER PLAYERS
// ============================================================
function renderPlayers() {
  const container = document.getElementById('players-grid');
  container.innerHTML = PLAYERS_DATA.map(p => `
    <div class="player-card">
      <div class="player-avatar" style="background:${p.color}20;border-color:${p.color}40;color:${p.color}">
        ${p.name.split(' ').map(n=>n[0]).join('')}
      </div>
      <div>
        <div class="player-name">${p.name}</div>
        <div class="player-nick">${p.nick}</div>
        <div class="player-role">${p.role}</div>
        <div class="player-stats">
          ${p.stats.map(s => `<span class="stat-chip">${s}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

// ============================================================
// RENDER FIXTURES
// ============================================================
function renderFixtures(filter = 'all') {
  const container = document.getElementById('fixture-list');
  const filtered = filter === 'all' ? FIXTURES_DATA : FIXTURES_DATA.filter(f => f.status === filter);

  container.innerHTML = filtered.map(f => `
    <div class="fixture-card ${f.status === 'live' ? 'live' : ''}">
      <div class="fixture-status">
        <span class="status-badge ${f.status}">
          ${f.status === 'live' ? '<div class="live-dot"></div>' : ''}
          ${f.status.charAt(0).toUpperCase() + f.status.slice(1)}
        </span>
      </div>
      <div class="fixture-teams">
        <div class="fixture-team-wrap" style="text-align:right">
          ${(() => { const t = TEAMS_DATA.find(t => t.name === f.team1); return t ? `<div class="fixture-team-logo"><img src="${t.logo.replace(/ /g,'%20')}" alt="${f.team1}" style="width:100%;height:100%;object-fit:contain;" onerror="this.style.display='none'" /></div>` : ''; })()}
          <span class="fixture-team">${f.team1}</span>
        </div>
        ${f.score
          ? `<span class="fixture-score">${f.score}</span>`
          : `<span class="fixture-vs">VS</span>`
        }
        <div class="fixture-team-wrap" style="text-align:left">
          ${(() => { const t = TEAMS_DATA.find(t => t.name === f.team2); return t ? `<div class="fixture-team-logo"><img src="${t.logo.replace(/ /g,'%20')}" alt="${f.team2}" style="width:100%;height:100%;object-fit:contain;" onerror="this.style.display='none'" /></div>` : ''; })()}
          <span class="fixture-team">${f.team2}</span>
        </div>
      </div>
      <div class="fixture-meta">
        <div class="fixture-time">${f.date}, ${f.time}</div>
        <div class="fixture-game-tag">${f.game}</div>
      </div>
    </div>
  `).join('');

  if (!filtered.length) {
    container.innerHTML = '<div style="text-align:center;padding:40px;color:var(--text-muted);font-family:Rajdhani;letter-spacing:2px;font-size:13px;">No matches found for this filter</div>';
  }
}

function initFixtureFilters() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderFixtures(btn.getAttribute('data-filter'));
      lucide.createIcons();
    });
  });
}

// ============================================================
// RENDER LEADERBOARD
// ============================================================
function renderLeaderboard() {
  const tbody = document.getElementById('leaderboard-body');
  tbody.innerHTML = LEADERBOARD_DATA.map(entry => {
    const rankClass = entry.rank === 1 ? 'rank-1' : entry.rank === 2 ? 'rank-2' : entry.rank === 3 ? 'rank-3' : 'rank-other';
    return `
      <tr>
        <td><span class="rank-cell ${rankClass}">${entry.rank}</span></td>
        <td>
          <div class="team-cell">
            <div class="team-mini-logo" style="background:rgba(255,255,255,0.12);backdrop-filter:blur(6px);">
              ${(() => { const t = TEAMS_DATA.find(t => t.name === entry.team); return t ? `<img src="${t.logo.replace(/ /g,'%20')}" alt="${entry.team}" style="width:100%;height:100%;object-fit:contain;" onerror="this.style.display='none'" />` : entry.abbr; })()}
            </div>
            <span class="team-cell-name">${entry.team}</span>
          </div>
        </td>
        <td>${entry.wins}</td>
        <td>${entry.losses}</td>
        <td><span class="points-cell">${entry.points}</span></td>
      </tr>
    `;
  }).join('');
}

// ============================================================
// RENDER STREAM SCHEDULE
// ============================================================
function renderStreamSchedule() {
  const container = document.getElementById('stream-schedule');
  container.innerHTML = STREAM_SCHEDULE.map(s => `
    <div class="schedule-item">
      <span class="schedule-time">${s.time}</span>
      <div class="schedule-info">
        <div class="schedule-match">${s.match}</div>
        <div class="schedule-game-name">${s.game}</div>
      </div>
    </div>
  `).join('');
}

// ============================================================
// RENDER NEWS
// ============================================================
function renderNews() {
  const container = document.getElementById('news-grid');
  container.innerHTML = NEWS_DATA.map((n, i) => `
    <div class="news-card reveal">
      <div class="news-img" style="background:${n.color}">
        <img
          src="${n.image}"
          alt="${n.title}"
          loading="lazy"
          style="width:100%;height:100%;object-fit:cover;opacity:0.9;"
          onerror="this.style.display='none'"
        />
        <span class="news-category">${n.category}</span>
      </div>
      <div class="news-body">
        <div class="news-date">${n.date}</div>
        <h3 class="news-title">${n.title}</h3>
        <p class="news-excerpt">${n.excerpt}</p>
        <div class="news-expand-content" id="news-expand-${i}">
          <p>${n.full}</p>
        </div>
        <button class="btn-read-more" onclick="toggleNews(${i}, this)">
          Read More
          <i data-lucide="chevron-right" style="width:14px;height:14px;"></i>
        </button>
      </div>
    </div>
  `).join('');
}

function toggleNews(index, btn) {
  const content = document.getElementById(`news-expand-${index}`);
  const isOpen = content.classList.toggle('open');
  btn.innerHTML = isOpen
    ? `Read Less <i data-lucide="chevron-up" style="width:14px;height:14px;"></i>`
    : `Read More <i data-lucide="chevron-right" style="width:14px;height:14px;"></i>`;
  lucide.createIcons();
}

// ============================================================
// GAME MODAL
// ============================================================
function openGameModal(gameId) {
  const game = GAMES_DATA.find(g => g.id === gameId);
  if (!game) return;

  const content = document.getElementById('modal-content');
  content.innerHTML = `
    <div class="modal-game-title">${game.title}</div>
    <div class="modal-game-prize" ${game.prize === 'Coming Soon' ? 'style="font-size:22px;font-weight:900;letter-spacing:4px;text-transform:uppercase;font-family:\'Bebas Neue\',sans-serif;background:linear-gradient(90deg,#a855f7,#00d4ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;"' : ''}>${game.prize === 'Coming Soon' ? 'Coming Soon' : game.prize + ' Prize Pool'}</div>
    <div style="margin-bottom:16px;">
      <span style="font-family:Rajdhani;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--text-muted);">Mode: </span>
      <span style="font-size:14px;color:var(--text-secondary);">${game.mode}</span>
    </div>
    <p style="font-size:14px;color:var(--text-secondary);line-height:1.7;margin-bottom:24px;">${game.description}</p>
    <div style="font-family:Rajdhani;font-size:12px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:var(--accent-cyan);margin-bottom:12px;">Tournament Rules</div>
    <div class="modal-rules">
      ${game.rules.map((r,i) => `
        <div class="modal-rule-item">
          <span class="rule-num">${String(i+1).padStart(2,'0')}</span>
          <span class="rule-text">${r}</span>
        </div>
      `).join('')}
    </div>
  `;

  document.getElementById('game-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeGameModal() {
  document.getElementById('game-modal').classList.remove('open');
  document.body.style.overflow = '';
}

// ============================================================
// FORM VALIDATION
// ============================================================
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(id, show) {
  const el = document.getElementById(id);
  if (el) el.classList.toggle('show', show);
}

function markInput(id, error) {
  const el = document.getElementById(id);
  if (el) el.classList.toggle('error', error);
}

// Google Apps Script Web App URL — handles both forms
const GAS_URL = 'https://script.google.com/macros/s/AKfycbzOa2ENY17f6iV0Xaz1gGdIXn72GA9xiz0KyC0o8V26S3U16xz1zj9MzvZnVf5M8IPw0g/exec';

// Submits data via a hidden form+iframe — works from file:// and any hosted origin
function submitToGAS(data) {
  return new Promise((resolve) => {
    const iframeName = 'gas_' + Date.now();

    const iframe = document.createElement('iframe');
    iframe.name = iframeName;
    iframe.style.cssText = 'display:none;width:0;height:0;border:none;position:absolute;';
    document.body.appendChild(iframe);

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = GAS_URL;
    form.target = iframeName;
    form.style.display = 'none';

    Object.entries(data).forEach(([key, val]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = val;
      form.appendChild(input);
    });

    document.body.appendChild(form);

    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      setTimeout(() => {
        try { document.body.removeChild(form); } catch (_) {}
        try { document.body.removeChild(iframe); } catch (_) {}
      }, 200);
      resolve();
    };

    iframe.onload = finish;
    setTimeout(finish, 6000); // fallback if onload never fires
    form.submit();
  });
}

function initRegistrationForm() {
  document.getElementById('reg-form').addEventListener('submit', async e => {
    e.preventDefault();

    const name = document.getElementById('player-name').value.trim();
    const game = document.getElementById('game-select').value;
    const email = document.getElementById('reg-email').value.trim();
    const phone = document.getElementById('reg-phone').value.trim();
    const loc = document.getElementById('reg-location').value.trim();
    const type = document.getElementById('team-type').value;

    markInput('player-name', !name); showError('err-name', !name);
    markInput('game-select', !game); showError('err-game', !game);
    markInput('reg-email', !validateEmail(email)); showError('err-email', !validateEmail(email));
    markInput('reg-phone', !phone); showError('err-phone', !phone);
    markInput('reg-location', !loc); showError('err-location', !loc);

    if (!name || !game || !validateEmail(email) || !phone || !loc) return;

    const btn = e.target.querySelector('.submit-btn');
    btn.disabled = true;
    btn.innerHTML = '<i data-lucide="loader" style="width:16px;height:16px;"></i> Submitting…';
    lucide.createIcons();

    await submitToGAS({ formType: 'registration', name, game, email, phone, location: loc, participationType: type });

    showToast('success', 'Registration Submitted!', `Welcome, ${name}! You'll receive a confirmation email shortly.`);
    e.target.reset();
    btn.disabled = false;
    btn.innerHTML = '<i data-lucide="send" style="width:16px;height:16px;"></i> Submit Registration';
    lucide.createIcons();
  });
}

function initContactForm() {
  document.getElementById('contact-form').addEventListener('submit', async e => {
    e.preventDefault();

    const name = document.getElementById('c-name').value.trim();
    const email = document.getElementById('c-email').value.trim();
    const subject = document.getElementById('c-subject').value.trim();
    const msg = document.getElementById('c-message').value.trim();

    markInput('c-name', !name); showError('cerr-name', !name);
    markInput('c-email', !validateEmail(email)); showError('cerr-email', !validateEmail(email));
    markInput('c-message', !msg); showError('cerr-message', !msg);

    if (!name || !validateEmail(email) || !msg) return;

    const btn = e.target.querySelector('.submit-btn');
    btn.disabled = true;
    btn.innerHTML = '<i data-lucide="loader" style="width:16px;height:16px;"></i> Sending…';
    lucide.createIcons();

    await submitToGAS({ formType: 'contact', name, email, subject, message: msg });

    showToast('info', 'Message Sent!', 'Our team will get back to you within 24 hours.');
    e.target.reset();
    btn.disabled = false;
    btn.innerHTML = '<i data-lucide="send" style="width:16px;height:16px;"></i> Send Message';
    lucide.createIcons();
  });
}

// ============================================================
// TOAST NOTIFICATIONS
// ============================================================
function showToast(type, title, message) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  const icons = { success: 'check-circle', error: 'x-circle', info: 'info' };

  toast.innerHTML = `
    <div class="toast-icon">
      <i data-lucide="${icons[type]}" style="width:20px;height:20px;"></i>
    </div>
    <div class="toast-text">
      <div class="toast-title">${title}</div>
      <div class="toast-msg">${message}</div>
    </div>
  `;

  container.appendChild(toast);
  lucide.createIcons();

  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('show'));
  });

  setTimeout(() => {
    toast.classList.remove('show');
    toast.classList.add('hide');
    setTimeout(() => toast.remove(), 500);
  }, 5000);
}

// ============================================================
// SCROLL REVEAL
// ============================================================
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // Trigger counter animation when hero stats come into view
        if (entry.target.closest('#home')) animateCounters();
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el));
}

// ============================================================
// BACK TO TOP
// ============================================================
const backToTop = document.getElementById('back-to-top');

function toggleBackToTop() {
  backToTop.classList.toggle('show', window.scrollY > 400);
}

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============================================================
// INIT ALL
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  lucide.createIcons();

  // Nav
  initNav();

  // Theme toggle
  document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

  // Countdown
  initCountdown();

  // Counter animation (initial for visible elements)
  setTimeout(animateCounters, 800);

  // Render data
  renderGames();
  renderTeams();
  renderPlayers();
  renderFixtures();
  renderLeaderboard();
  renderStreamSchedule();
  renderNews();

  // Init features
  initFixtureFilters();
  initRegistrationForm();
  initContactForm();
  initScrollReveal();

  // Modal close
  document.getElementById('modal-close').addEventListener('click', closeGameModal);
  document.getElementById('game-modal').addEventListener('click', e => {
    if (e.target === document.getElementById('game-modal')) closeGameModal();
  });

  // Re-init lucide after dynamic content
  lucide.createIcons();
});
