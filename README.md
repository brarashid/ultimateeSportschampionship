# Ultimate eSports Championship — Website

Africa's premier esports tournament website. Built as a fully static, single-page application showcasing the tournament, registration, fixtures, live stream, sponsors, and contact information.

---

## Overview

| Detail | Info |
|--------|------|
| **Organizer** | PowerPlay Syndicate |
| **Headline Sponsor** | ABBA Investments |
| **Location** | Accra, Ghana |
| **Established** | 2024 |
| **Prize Pool** | ₵50,000 |
| **Tournament Date** | August 20, 2026 |
| **Registration Deadline** | July 15, 2026 |

---

## Features

- **Hero Section** — Full-screen background (FC26.jpg), countdown timer, live stats, and game tags
- **Announcements Ticker** — Scrolling live news bar
- **Sponsor Strip** — Auto-scrolling sponsor logos (Metro TV Ghana, Original FM, Original TV, Wiggles, ABBA Investments)
- **About Section** — Tournament story, format breakdown (Group Stage → Knockouts → Grand Finals), rules summary
- **Registration Section** — Player/team registration form with validation, Become a Sponsor CTA, sponsors marquee
- **Featured Games** — FC26, Call of Duty, Fortnite, Mortal Kombat
- **Fixtures & Leaderboard** — Match schedule table and standings leaderboard
- **Live Stream** — Embedded YouTube stream panel with schedule
- **Contact Section** — Contact form with social media links
- **Footer** — Navigation, tournament info, social links, copyright
- **Dark / Light Mode** — Theme toggle with smooth transitions
- **Fully Responsive** — Mobile, tablet, and desktop layouts

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 |
| Styling | CSS3 (custom properties, grid, flexbox, animations) |
| Scripting | Vanilla JavaScript |
| Icons | Lucide Icons + inline brand SVGs |
| Fonts | Google Fonts — Orbitron, Montserrat, Rajdhani |
| Version Control | Git |

---

## Font System

| Role | Font |
|------|------|
| Headings | Orbitron |
| Body Text | Montserrat |
| Buttons / UI Labels | Rajdhani |

---

## Project Structure

```
ultimateeSportschampionship/
│
├── index.html                      # Main HTML file (single page)
├── styles.css                      # All styles
├── main.js                         # JavaScript (forms, countdown, animations)
├── README.md                       # This file
│
├── Ultimateesports logo.jpeg       # Primary logo (navbar, footer)
├── Ultimateesports logo 1.jpeg     # Secondary logo (about section organizer card)
├── FC26.jpg                        # Hero background image
│
├── EA FC 26.jpg                    # FC26 game card image
├── EA FC 26 1.png                  # FC26 alternate image
├── Call Of Duty Black Ops.jpg      # Call of Duty game card image
├── Call of Duty 4 Modern Warfare Remastered….jpg
├── Fortnite.jpg                    # Fortnite game card image
├── Mortal Kombat 9.jpg             # Mortal Kombat game card image
├── Mortal kombat.jpg               # Mortal Kombat alternate image
├── Featured Games background.jpg  # Featured games section background
│
├── Metro TV Ghana logo.png         # Sponsor logo
├── Originalfm Modern Ghana.png     # Sponsor logo
├── Originaltv.jpg                  # Sponsor logo
├── wiggles logo.jpg                # Sponsor logo
└── ABBA Investments.jpeg           # Sponsor logo (Headline Sponsor)
```

---

## Sections

### 1. Home (Hero)
- Background: `FC26.jpg` with a subtle blur and dark overlay
- Countdown timer to tournament start
- Live player/team/prize stats
- Register Now and View Fixtures CTAs

### 2. About
- Tournament story and mission
- 3-stage format: Group Stage → Knockouts → Grand Finals
- Rules summary
- Organized by PowerPlay Syndicate card

### 3. Registration
- Player/Team registration form (name, game, email, phone, location, type)
- Become a Sponsor CTA block
- Scrolling sponsors marquee

### 4. Games
- FC26, Call of Duty, Fortnite, Mortal Kombat
- Each card shows prize allocation and player count

### 5. Fixtures & Leaderboard
- Upcoming match schedule
- Live standings table

### 6. Live Stream
- Embedded YouTube stream
- Broadcast schedule

### 7. Contact
- Contact form (name, email, subject, message)
- Address, phone, email details
- Social media links: X (Twitter), Instagram, YouTube, Discord, Facebook, TikTok

---

## Sponsors

| Sponsor | Role |
|---------|------|
| ABBA Investments | Headline Sponsor |
| Metro TV Ghana | Media Partner |
| Original FM | Media Partner |
| Original TV | Media Partner |
| Wiggles | Media Partner |

---

## Running the Website

This is a static website — no build tools or server required.

**Option 1 — Open directly:**
Double-click `index.html` to open in any browser.

**Option 2 — Local server (recommended for best experience):**
```bash
# Using Python
python -m http.server 8000

# Using Node.js (npx)
npx serve .
```
Then open `http://localhost:8000` in your browser.

---

## Browser Support

| Browser | Support |
|---------|---------|
| Chrome | ✓ Full |
| Firefox | ✓ Full |
| Edge | ✓ Full |
| Safari | ✓ Full |
| Mobile (iOS/Android) | ✓ Responsive |

---

## Contact

For sponsorship, registration queries, or general enquiries:

- **Email:** info@ultimateesports.com
- **Location:** GameArena HQ, Cantonments, Accra, Ghana
- **Organizer:** PowerPlay Syndicate

---

© 2026 Ultimate eSport Championship. All rights reserved. PowerPlay Syndicate
