# MedCalc - Project Specification

## Project Overview

MedCalc is a clean, minimal web utility app designed to help healthcare professionals and patients track medical milestones using specialized date calculations. The app provides two primary calculators for transplant and chemotherapy treatment tracking, plus a curated collection of helpful reference links.

**Target Users:** Small group of medical professionals and patients
**Timeline:** MVP in one week
**Deployment:** Free static hosting (Surge, Netlify, or GitHub Pages)

---

## Problem Statement

Medical professionals and patients need quick, accessible tools to:
1. Calculate days since transplant (where transplant day = day 0, next day = day 1)
2. Calculate current chemotherapy cycle day (where first chemo = day 1)
3. Access frequently used medical reference links in one place

Current solutions require either manual calculations or complex medical software. A simple, focused utility eliminates this friction.

---

## Target Users

- Healthcare professionals (transplant coordinators, oncology nurses)
- Post-transplant patients
- Chemotherapy patients
- Small group of colleagues/friends who share the link

---

## Core Features (MVP)

### 1. Transplant Calculator
- **Input:** Transplant date (date picker)
- **Input:** Current or target date (date picker, defaults to today)
- **Output:** Number of days since transplant (day 0 calculation)
- **Logic:** If transplant day = 2024-01-15, then 2024-01-16 = day 1, 2024-01-17 = day 2, etc.

### 2. Chemotherapy Calculator
- **Input:** First chemo date (date picker)
- **Input:** Current or target date (date picker, defaults to today)
- **Output:** Current chemo cycle day
- **Logic:** First chemo date = day 1, day after = day 2, etc.

### 3. Links Page
- **Content:** Curated list of helpful medical resources/links
- **Features:**
  - Display as simple list or card layout
  - Links can be edited/customized by user (local storage optional)
  - Categories (e.g., transplant resources, chemo resources, general)

---

## Future Features (Nice-to-Have)

- Save calculator history/favorites
- Export calculation results as PDF
- Add third calculator type
- Custom link categories
- Dark mode
- Calculator comparison (side-by-side date tracking)
- Recurring event reminders

---

## Technical Architecture

### Frontend Stack
- **Framework:** React with TanStack Start (client-side SPA)
- **Routing:** TanStack Router (single-page app with navigation)
- **Styling:** TailwindCSS or CSS Modules (clean, minimal design)
- **Date Handling:** date-fns or similar for date calculations
- **State:** React hooks + local state (no complex state management needed)
- **Build:** TanStack Start built-in bundler

### Backend
- **None** - Pure client-side application

### Data Storage
- **None required** - Calculations are stateless
- **Optional:** localStorage for saving calculator history or custom links

### Deployment
- **Target:** Free static hosting (Surge.sh, Netlify, or GitHub Pages)
- **Build:** `npm run build` or similar
- **Domain:** User's choice (free or paid)

---

## Tech Stack Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Framework | React + TanStack Start | Client-side SPA, no SSR needed, fast development |
| Routing | TanStack Router | Purpose-built for SPA routing, modern and performant |
| Styling | TailwindCSS | Rapid development, clean minimal aesthetic |
| Date Logic | date-fns | Industry-standard, small bundle, reliable |
| Deployment | Static hosting (Surge/Netlify) | Free, simple, sufficient for frontend-only app |
| Database | None | Calculations don't require persistence |
| Auth | None | No user accounts needed, public utility |

---

## UI/UX Guidelines

### Design Principles
- **Clean & Minimal:** Remove all non-essential elements
- **Mobile-First:** Optimize for phones, scale up gracefully
- **Accessibility:** WCAG AA compliance (high contrast, keyboard navigation, semantic HTML)
- **Performance:** Fast load times, smooth interactions

### Layout
- **Home/Navigation:** Simple nav bar or tab-based navigation
  - Transplant Calculator
  - Chemo Calculator
  - Links Page

- **Calculator Pages:**
  - Two date input fields (date pickers)
  - Result display (large, easy to read)
  - Clear labeling and help text
  - Optional: preset buttons (e.g., "Today")

- **Links Page:**
  - Organized by category (optional grouping)
  - Each link with title, URL, and brief description
  - Simple list or card layout (not fancy)

### Visual Style
- Color palette: Neutral (whites, grays) with subtle accent color
- Typography: Clear, readable sans-serif
- Spacing: Generous whitespace for a clean feel
- Interactivity: Subtle hover states, no animations unless necessary

---

## Non-Functional Requirements

### Performance
- Page load time: < 2 seconds
- Calculator response: Instant (< 100ms)
- Mobile performance: Lighthouse > 80

### Accessibility
- WCAG AA compliance
- Keyboard-navigable
- Screen reader friendly
- Color contrast ratio ≥ 4.5:1

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- No IE11 support needed

### Security
- Standard web practices (HTTPS enforced)
- No sensitive data handling
- No backend exposure

---

## API/Integrations

**None** - This is a pure frontend utility.

---

## Project Structure

```
medcalc/
├── src/
│   ├── routes/
│   │   ├── __root.tsx
│   │   ├── index.tsx
│   │   ├── transplant.tsx
│   │   ├── chemo.tsx
│   │   └── links.tsx
│   ├── components/
│   │   ├── DateCalculator.tsx
│   │   ├── ResultDisplay.tsx
│   │   └── Navigation.tsx
│   ├── utils/
│   │   ├── dateCalculations.ts
│   │   └── constants.ts
│   ├── styles/
│   │   └── globals.css
│   └── main.tsx
├── public/
├── index.html
├── package.json
├── vite.config.ts
└── tailwind.config.ts
```

---

## Development Workflow

### Phase 1: Setup (Day 1)
- Initialize TanStack Start project
- Set up Tailwind CSS
- Create basic routing structure

### Phase 2: Calculators (Day 2-3)
- Build DateCalculator component
- Implement transplant calculation logic
- Implement chemo calculation logic
- Add error handling and validation

### Phase 3: Links & UI (Day 4)
- Build Links page component
- Polish styling and responsive design
- Mobile testing and refinement

### Phase 4: Testing & Deployment (Day 5-7)
- Test on mobile devices
- Accessibility audit
- Performance optimization
- Deploy to static host

---

## Success Criteria

- ✅ Both calculators work correctly with various date inputs
- ✅ Links page is accessible and easy to navigate
- ✅ Responsive design works on mobile and desktop
- ✅ Clean, minimal aesthetic achieved
- ✅ Page loads in < 2 seconds
- ✅ Deployed and accessible on free hosting

---

## Known Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Date calculation edge cases | Wrong results | Thorough testing, use battle-tested date library (date-fns) |
| Mobile responsiveness issues | Poor mobile UX | Mobile-first design, test early on devices |
| Hosting limitations | Deploy failures | Choose hosting with good uptime, test deployment early |
| Browser date picker inconsistencies | Input challenges | Fallback to text input if needed, test across browsers |

---

## Notes & Questions

- Consider whether to allow custom link addition via localStorage
- Decide on exact color scheme for minimal design (e.g., specific grays, accent color)
- Test date picker compatibility across mobile browsers
- Confirm deployment platform choice early (Surge vs Netlify vs GitHub Pages)

