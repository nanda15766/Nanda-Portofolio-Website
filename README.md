# Nanda Dwi Wahyu Prasetyo — Digital Portfolio Web Application

A distinctive, high-end digital portfolio and architectural web application for **Nanda Dwi Wahyu Prasetyo**, Community Architect & Social Media Specialist.

Built with React 19, TypeScript, Tailwind CSS, Motion (Framer Motion v12), and custom Web Audio API synthesis. Styled with an obsidian dark luxury architectural aesthetic featuring procedural canvas fluid dynamics and blueprint coordinates.

---

## 📑 Documentation Links

- **Full Portfolio Content & Case Studies**: [`PORTFOLIO.md`](./PORTFOLIO.md)
- **PDF Resume & Presentation**: [`public/Resume & Portofolio - Nanda Dwi Wahyu Prrasetyo 2026.pdf`](./public/Resume%20&%20Portofolio%20-%20Nanda%20Dwi%20Wahyu%20Prrasetyo%202026.pdf)

---

## 🎨 Visual Design System & Aesthetics

Recreated with architectural discipline inspired by DAQ Consulting:
- **Palette**: Deep Obsidian (`#07090c`), Slate Dark (`#080a0d`), Electric Sky Blue (`#67BAF4`), Deep Navy (`#1E466B`), Stark White (`#FFFFFF`).
- **Typography**: Mixed high-contrast display typography pairing ultra-light hairline uppercase with heavy solid black letterforms; monospace kicks and tabular numerals.
- **Canvas Fluid Dynamics**: Hardware-accelerated procedural 2D canvas simulation generating rippling metallic liquid waves, organic caustics, and architectural coordinate grid lines at 60fps.
- **Micro-Interactions**: Zero-dependency Web Audio API synthesizer for tactile navigation blips and meditative ambient drones.

---

## 🏗️ Architecture & Component Directory

```
src/
├── components/
│   ├── AboutBio.tsx            # Strategist narrative profile & quantitative metrics
│   ├── BackToTop.tsx           # Minimalist architectural back-to-top control
│   ├── Brands.tsx              # Interactive filterable directory of 27+ brand partners
│   ├── CaseStudies.tsx         # Filterable case study cards with deep-dive modal triggers
│   ├── CaseStudyModal.tsx      # Deep-dive study drawer with reading progress and keyboard nav
│   ├── ContactModal.tsx        # Slide-out inquiry drawer with Web3Forms integration
│   ├── CosmicBackground.tsx    # Subtle particle and starfield atmosphere
│   ├── FeaturedWork.tsx        # High-impact flagship case studies preview
│   ├── Footer.tsx              # 4-column architectural grid footer
│   ├── GrowthEngine.tsx        # Interactive 4-stage pipeline schematic (Ingest, Refine, Distribute, Govern)
│   ├── Hero.tsx                # Two-tier headline ("WE ARCHITECT COMMUNITY.")
│   ├── HomeBrandsMarquee.tsx   # Continuous marquee showcasing premier partner logos
│   ├── HomeCTA.tsx             # Action banner ("Bring the ambition. Let's build.")
│   ├── LiquidBackdrop.tsx      # Optimized procedural liquid canvas backdrop
│   ├── Manifesto.tsx           # High-contrast architectural philosophy statement
│   ├── Navbar.tsx              # Top bar with sound toggle, language switch, and PDF download
│   ├── ScrollProgress.tsx      # Hairline reading progress indicator
│   ├── SEO.tsx                 # Helmet-powered OpenGraph, Twitter, and canonical metadata
│   ├── Skills.tsx              # Strategic competency pillars
│   └── ToolCarousel.tsx        # Production stack and tooling carousel
├── context/
│   ├── ContactContext.tsx      # Slide-out drawer state management
│   ├── LanguageContext.tsx     # English (en) and Indonesian (id) dual-language provider
│   └── ThemeContext.tsx        # Dark-mode dominant theme provider
├── pages/
│   ├── Home.tsx                # Flagship landing page with full architectural showcase
│   ├── Work.tsx                # Comprehensive work archive with category filtering
│   ├── About.tsx               # Narrative profile, competencies, and workflow stack
│   └── Partnerships.tsx        # Full brand ecosystem directory (27+ clients)
├── utils/
│   └── audio.ts                # Lightweight Web Audio API synthesizer
├── data.ts                     # Bilingual portfolio data store (EN & ID)
├── App.tsx                     # Top-level routing, smooth hash scrolling, and providers
└── main.tsx                    # Application entry point
```

---

## 🚀 Key Feature Highlights

1. **Bilingual Localization (EN / ID)**: Instant language toggle between English and Indonesian with complete data parity.
2. **Smooth Hash Navigation**: Handles direct jumps to `#capabilities` and `#work` across client routes.
3. **Category Filtering**: Filter case studies by vertical (Luxury Tourism, Edutainment, Fitness, Esports) and brands by industry.
4. **Accessible Modal System**: Fully keyboard-controllable modal dialogs (`ESC` to exit, Left/Right arrow keys to cycle studies).
5. **Direct Inquiries**: Working contact drawer connected via API endpoint with instant validation feedback.
6. **Direct PDF Portfolio**: Direct access to download the official 2026 PDF resume and portfolio.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite
- **Styling**: Tailwind CSS v4
- **Animation**: Motion (Framer Motion v12)
- **Icons**: Lucide React
- **Audio**: Web Audio API (zero external sound files)
- **Deployment**: Node.js / Vite Static SPA
