# Architecture Design Document
## BT Wholesale — Web Scrape to React Component System

**Version:** 1.0  
**Date:** 2026-05-13  
**Stack:** Next.js 16 · TypeScript · CSS Modules · Design Tokens  
**Source:** https://www.btwholesale.com/

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [System Architecture Overview](#2-system-architecture-overview)
3. [Scraping & Content Extraction Pipeline](#3-scraping--content-extraction-pipeline)
4. [Project Directory Structure](#4-project-directory-structure)
5. [Component Architecture](#5-component-architecture)
6. [Data Flow Architecture](#6-data-flow-architecture)
7. [Content API Design](#7-content-api-design)
8. [Design Token System](#8-design-token-system)
9. [Build & Rendering Pipeline](#9-build--rendering-pipeline)
10. [Technology Decisions](#10-technology-decisions)

---

## 1. Executive Summary

This document describes the end-to-end architecture for converting a live marketing website (BT Wholesale) into a structured, maintainable Next.js application. The process has three principal phases:

| Phase | Activity | Output |
|-------|----------|--------|
| **Extract** | Analyse and scrape the source page | `site-content.json` |
| **Model** | Define typed interfaces for all content | `types/content.ts` |
| **Build** | Implement components + API + design tokens | Deployable Next.js app |

All content is decoupled from markup. Components receive typed props; a static Next.js API route exposes the same content as JSON for any client-side consumer.

---

## 2. System Architecture Overview

The system is a statically-rendered Next.js application following a clear separation between **data**, **presentation**, and **styling**.

```mermaid
graph TB
    subgraph SOURCE["🌐 Source"]
        WEB["btwholesale.com\n(live website)"]
    end

    subgraph EXTRACT["📋 Extraction Layer"]
        SCRAPE["Web Scrape\n(WebFetch analysis)"]
        JSON["site-content.json\n(structured content)"]
        TYPES["content.ts\n(TypeScript interfaces)"]
        SCRAPE --> JSON
        SCRAPE --> TYPES
    end

    subgraph APP["⚙️ Next.js Application  (App Router)"]
        direction TB

        subgraph API["API Layer"]
            ROUTE["GET /api/content\n(route.ts — force-static)"]
        end

        subgraph PAGE["Page Layer"]
            LAYOUT["layout.tsx\n(RootLayout)"]
            PAGEFILE["page.tsx\n(Server Component)"]
        end

        subgraph COMPONENTS["Component Layer"]
            direction LR
            HDR["Header"]
            HERO["Hero"]
            PROD["ProductCards"]
            SUP["SupportSection"]
            TEST["Testimonial"]
            WHY["WhySection"]
            FTR["Footer"]
        end

        subgraph STYLES["Styling Layer"]
            TOKENS["globals.css\n(Design Tokens)"]
            MODS["*.module.css\n(Scoped Styles)"]
        end

        JSON -->|"import at build"| PAGEFILE
        JSON -->|"import at build"| ROUTE
        TYPES -->|"props contract"| COMPONENTS
        PAGEFILE --> COMPONENTS
        TOKENS --> MODS
        MODS --> COMPONENTS
    end

    subgraph OUTPUT["🚀 Build Output"]
        STATIC["Static HTML + CSS\n(prerendered)"]
        APIJSON["Static /api/content\n(JSON endpoint)"]
    end

    WEB --> SCRAPE
    APP --> STATIC
    APP --> APIJSON
```

---

## 3. Scraping & Content Extraction Pipeline

The source page was analysed to identify discrete content regions. Each region maps directly to a component and a section of the content JSON.

```mermaid
flowchart TD
    URL["🔗 Target URL\nbtwholesale.com"]

    URL --> FETCH["HTTP Fetch\n+ HTML → Markdown conversion"]

    FETCH --> ANALYSE["Content Analysis"]

    ANALYSE --> R1["Header\nutil links · nav links · auth links"]
    ANALYSE --> R2["Hero\nheadline · subheadline · CTA"]
    ANALYSE --> R3["Product Cards\n4 cards: heading · description · links"]
    ANALYSE --> R4["Support Section\nheading · body · 3 action buttons"]
    ANALYSE --> R5["Testimonial\nquote · author · role · company"]
    ANALYSE --> R6["Why Section\n3 feature cards with icons"]
    ANALYSE --> R7["Footer\nblurb · legal links · social links"]

    R1 & R2 & R3 & R4 & R5 & R6 & R7 --> SCHEMA["Define JSON Schema\n& TypeScript Interfaces"]

    SCHEMA --> SITEJSON["site-content.json\n(single source of truth)"]
    SCHEMA --> TYPEFILE["types/content.ts\n(SiteContent · 12 interfaces)"]
```

### Content Regions → Component Map

| Source Region | Component | Key Content Fields |
|---------------|-----------|-------------------|
| Top utility bar | `Header` | `utilityLinks[]` |
| Primary navigation | `Header` | `navLinks[]`, `authLinks[]` |
| Above-fold hero | `Hero` | `headline`, `subheadline`, `cta` |
| Product grid | `ProductCards` | `cards[].heading`, `cards[].links[]` |
| Contact banner | `SupportSection` | `heading`, `actions[].variant` |
| Customer quote | `Testimonial` | `quote`, `author`, `company` |
| Value props | `WhySection` | `cards[].icon`, `cards[].description` |
| Site footer | `Footer` | `partnerBlurb`, `legalLinks[]`, `socialLinks[]` |

---

## 4. Project Directory Structure

```
bt-wholesale/
│
├── src/
│   ├── app/                          # Next.js App Router root
│   │   ├── globals.css               # ← Design Token definitions (:root vars)
│   │   ├── layout.tsx                # RootLayout — html/body shell + metadata
│   │   ├── page.tsx                  # Home page — Server Component, imports JSON
│   │   └── api/
│   │       └── content/
│   │           └── route.ts          # GET /api/content — static JSON endpoint
│   │
│   ├── components/                   # One directory per component
│   │   ├── Header/
│   │   │   ├── Header.tsx
│   │   │   └── Header.module.css
│   │   ├── Hero/
│   │   │   ├── Hero.tsx
│   │   │   └── Hero.module.css
│   │   ├── ProductCards/
│   │   │   ├── ProductCards.tsx
│   │   │   └── ProductCards.module.css
│   │   ├── SupportSection/
│   │   │   ├── SupportSection.tsx
│   │   │   └── SupportSection.module.css
│   │   ├── Testimonial/
│   │   │   ├── Testimonial.tsx
│   │   │   └── Testimonial.module.css
│   │   ├── WhySection/
│   │   │   ├── WhySection.tsx
│   │   │   └── WhySection.module.css
│   │   └── Footer/
│   │       ├── Footer.tsx
│   │       └── Footer.module.css
│   │
│   ├── content/
│   │   └── site-content.json         # ← Single source of truth for all content
│   │
│   └── types/
│       └── content.ts                # TypeScript interfaces for all content shapes
│
├── public/                           # Static assets
├── next.config.ts
├── tsconfig.json
└── package.json
```

---

## 5. Component Architecture

### 5.1 Component Tree

```mermaid
graph TD
    ROOT["RootLayout\nlayout.tsx"]
    PAGE["Page\npage.tsx\n(Server Component)"]

    ROOT --> PAGE

    PAGE --> HDR["Header\nprops: HeaderContent"]
    PAGE --> MAIN["&lt;main&gt;"]
    PAGE --> FTR["Footer\nprops: FooterContent"]

    MAIN --> HERO["Hero\nprops: HeroContent"]
    MAIN --> PROD["ProductCards\nprops: ProductCardsContent"]
    MAIN --> SUP["SupportSection\nprops: SupportContent"]
    MAIN --> TEST["Testimonial\nprops: TestimonialContent"]
    MAIN --> WHY["WhySection\nprops: WhySectionContent"]

    PROD --> CARD["&lt;article&gt; × 4\nProductCard"]
    WHY --> WHYCARD["&lt;div&gt; × 3\nWhyCard"]
    SUP --> BTN["&lt;a&gt; × 3\nActionButton"]
    FTR --> SOCIAL["&lt;a&gt; × 2\nSocialLink"]
    HDR --> NAVLINKS["&lt;li&gt; × 5\nNavLink"]
```

### 5.2 Component Responsibilities

```mermaid
graph LR
    subgraph PRESENTATIONAL["Presentational Components (stateless, server-rendered)"]
        direction TB
        A["Header\n• Sticky top bar\n• Utility + primary nav\n• Auth pill links"]
        B["Hero\n• Gradient banner\n• Headline + body\n• Accent CTA button"]
        C["ProductCards\n• 4-column grid\n• Icon + heading + links\n• Highlight variant"]
        D["SupportSection\n• Horizontal action bar\n• Primary + secondary btns"]
        E["Testimonial\n• Dark full-width band\n• Block quote + attribution"]
        F["WhySection\n• 3-column feature grid\n• SVG icons inline"]
        G["Footer\n• Partner blurb\n• Legal + social links"]
    end

    subgraph DATA["Data (compile-time)"]
        JSON2["site-content.json"]
    end

    JSON2 -->|"typed props"| A & B & C & D & E & F & G
```

---

## 6. Data Flow Architecture

### 6.1 Build-Time Flow (SSG)

```mermaid
sequenceDiagram
    participant JSON as site-content.json
    participant PAGE as page.tsx
    participant COMP as Components
    participant BUILD as Next.js Build
    participant OUT as Static Output

    BUILD->>PAGE: import page module
    PAGE->>JSON: import siteContent
    JSON-->>PAGE: SiteContent object
    PAGE->>COMP: pass typed props
    COMP-->>BUILD: React tree (Server Components)
    BUILD-->>OUT: prerendered HTML + CSS
    Note over OUT: / → static HTML<br/>/api/content → static JSON
```

### 6.2 Runtime API Flow (Client consumers)

```mermaid
sequenceDiagram
    participant CLIENT as Client / 3rd Party
    participant CDN as CDN / Next.js Server
    participant API as GET /api/content
    participant JSON as site-content.json

    CLIENT->>CDN: GET /api/content
    CDN->>API: route handler
    API->>JSON: import (compiled in)
    JSON-->>API: SiteContent
    API-->>CDN: 200 application/json
    CDN-->>CLIENT: SiteContent JSON
    Note over API: force-static — response<br/>is prebuilt at deploy time
```

### 6.3 Content → Render Mapping

```mermaid
flowchart LR
    subgraph JSON["site-content.json"]
        META["meta{}"]
        HDR_D["header{}"]
        HERO_D["hero{}"]
        PROD_D["productCards{}"]
        SUP_D["support{}"]
        TEST_D["testimonial{}"]
        WHY_D["whySection{}"]
        FTR_D["footer{}"]
    end

    subgraph RENDER["Rendered Output"]
        META --> LAYOUT_R["&lt;head&gt; title + description"]
        HDR_D --> HDR_R["&lt;header&gt; sticky nav"]
        HERO_D --> HERO_R["&lt;section&gt; hero banner"]
        PROD_D --> PROD_R["&lt;section&gt; product grid"]
        SUP_D --> SUP_R["&lt;section&gt; support bar"]
        TEST_D --> TEST_R["&lt;section&gt; testimonial"]
        WHY_D --> WHY_R["&lt;section&gt; why features"]
        FTR_D --> FTR_R["&lt;footer&gt; links + copyright"]
    end
```

---

## 7. Content API Design

### 7.1 Endpoint

| Attribute | Value |
|-----------|-------|
| Method | `GET` |
| Path | `/api/content` |
| Response type | `application/json` |
| Rendering | `force-static` (prebuilt at deploy) |
| Auth | None (public) |
| Cache | Edge-cacheable indefinitely |

### 7.2 Response Schema

```mermaid
graph TD
    ROOT2["SiteContent"]

    ROOT2 --> META2["meta\n  title: string\n  description: string"]
    ROOT2 --> HDR2["header\n  utilityLinks: Link[]\n  navLinks: Link[]\n  authLinks: Link[]\n  logoAlt: string"]
    ROOT2 --> HERO2["hero\n  headline: string\n  subheadline: string\n  body: string\n  cta: Link"]
    ROOT2 --> PROD2["productCards\n  sectionTitle: string\n  cards: ProductCard[]"]
    ROOT2 --> SUP2["support\n  heading: string\n  body: string\n  actions: SupportAction[]"]
    ROOT2 --> TEST2["testimonial\n  quote: string\n  author: string\n  role: string\n  company: string"]
    ROOT2 --> WHY2["whySection\n  heading: string\n  cards: WhyCard[]"]
    ROOT2 --> FTR2["footer\n  partnerBlurb: string\n  partnerCta: Link\n  legalLinks: Link[]\n  socialLinks: SocialLink[]\n  copyright: string"]

    PROD2 --> PC["ProductCard\n  id · heading · description\n  links: Link[]\n  icon: string\n  highlight?: boolean"]
    SUP2 --> SA["SupportAction\n  label · href\n  variant: primary | secondary"]
    WHY2 --> WC["WhyCard\n  id · heading\n  description · icon"]
```

### 7.3 TypeScript Interface Hierarchy

```
SiteContent
├── MetaContent
├── HeaderContent
│   └── Link[]  (utilityLinks, navLinks, authLinks)
├── HeroContent
│   └── Link    (cta)
├── ProductCardsContent
│   └── ProductCard[]
│       └── Link[]  (links)
├── SupportContent
│   └── SupportAction[]  extends Link + variant
├── TestimonialContent
├── WhySectionContent
│   └── WhyCard[]
└── FooterContent
    ├── Link    (partnerCta)
    ├── Link[]  (legalLinks)
    └── SocialLink[]
```

---

## 8. Design Token System

All visual decisions are expressed as CSS Custom Properties declared on `:root` in `globals.css`. Component `*.module.css` files consume tokens exclusively — no hardcoded values.

### 8.1 Token Categories

```mermaid
graph TD
    TOKENS["Design Token System\n(globals.css :root)"]

    TOKENS --> COLOR["Color Tokens\n──────────────\n--color-primary: #5C068C\n--color-primary-dark: #3D0561\n--color-primary-light: #7B2DB5\n--color-accent: #00A3E0\n--color-accent-dark: #0078A8\n--color-text: #1A1A1A\n--color-text-secondary: #4A4A4A\n--color-text-inverse: #FFFFFF\n--color-bg-dark: #1A0833"]

    TOKENS --> TYPE["Typography Tokens\n──────────────\n--font-size-xs … 3xl\n--font-weight-regular … bold\n--line-height-tight … loose\n--font-family-base"]

    TOKENS --> SPACE["Spacing Tokens\n──────────────\n--space-1 (4px)\n--space-2 (8px)\n--space-4 (16px)\n--space-6 (24px)\n--space-8 (32px)\n--space-12 (48px)\n--space-16 (64px)\n--space-20 (80px)\n--space-24 (96px)"]

    TOKENS --> LAYOUT["Layout Tokens\n──────────────\n--container-max: 1200px\n--container-pad: 24px"]

    TOKENS --> RADIUS["Radius Tokens\n──────────────\n--radius-sm (4px)\n--radius-md (8px)\n--radius-lg (12px)\n--radius-xl (20px)\n--radius-full (9999px)"]

    TOKENS --> SHADOW["Shadow Tokens\n──────────────\n--shadow-sm\n--shadow-md\n--shadow-lg"]

    TOKENS --> MOTION["Motion Tokens\n──────────────\n--transition-fast: 150ms\n--transition-base: 250ms\n--transition-slow: 400ms"]
```

### 8.2 Token Consumption Flow

```mermaid
flowchart LR
    GLOB["globals.css\n:root { --token: value }"]

    GLOB -->|"cascades to all"| HM["Header.module.css\nvar(--color-primary)\nvar(--space-3)"]
    GLOB --> HeM["Hero.module.css\nvar(--color-bg-dark)\nvar(--font-size-3xl)"]
    GLOB --> PM["ProductCards.module.css\nvar(--color-border)\nvar(--radius-lg)"]
    GLOB --> SM["SupportSection.module.css\nvar(--color-primary)\nvar(--radius-full)"]
    GLOB --> TM["Testimonial.module.css\nvar(--color-bg-dark)\nvar(--font-size-lg)"]
    GLOB --> WM["WhySection.module.css\nvar(--shadow-md)\nvar(--transition-base)"]
    GLOB --> FM["Footer.module.css\nvar(--color-bg-dark)\nvar(--font-size-xs)"]

    HM & HeM & PM & SM & TM & WM & FM -->|"scoped class names"| BROWSER["Browser\nComputed Styles"]
```

### 8.3 Color Palette

| Token | Value | Used In |
|-------|-------|---------|
| `--color-primary` | `#5C068C` | Nav, buttons, icons, card headings |
| `--color-primary-dark` | `#3D0561` | Hover states, headings, footer text |
| `--color-primary-light` | `#7B2DB5` | Gradients, why-card icons |
| `--color-accent` | `#00A3E0` | Hero CTA, testimonial quote icon, partner link |
| `--color-bg-dark` | `#1A0833` | Testimonial, Footer background |
| `--color-bg-light` | `#F5F4F7` | Product section background, icon backgrounds |

---

## 9. Build & Rendering Pipeline

### 9.1 Next.js Build Process

```mermaid
flowchart TD
    SRC["Source Files\n(TSX + CSS Modules + JSON)"]

    SRC --> COMPILE["TypeScript Compilation\n(tsc --noEmit passes clean)"]
    COMPILE --> BUNDLE["Turbopack Bundler\nCSS Modules → scoped class names\nJSON imports → inline"]

    BUNDLE --> RENDER["Static Site Generation\n(6 workers)"]

    RENDER --> R1["/ (home)\nprerender Server Components\n→ static HTML"]
    RENDER --> R2["/api/content\nforce-static route\n→ static JSON file"]
    RENDER --> R3["/_not-found\n→ static HTML"]

    R1 & R2 & R3 --> OUT2[".next/\n(build output)"]

    OUT2 --> DEPLOY["Deploy\n(Vercel / any Node host / CDN)"]
```

### 9.2 Rendering Strategy

```mermaid
graph LR
    subgraph NEXTJS["Next.js App Router"]
        SC["Server Components\nHeader · Hero · ProductCards\nSupportSection · Testimonial\nWhySection · Footer\n\nRun at build time only.\nZero JS sent to browser."]

        STATIC_ROUTE["Static Route Handler\nGET /api/content\n\nPrebuilt JSON file.\nServed from CDN edge."]
    end

    subgraph BROWSER["Browser"]
        HTML["Static HTML\n(full page, no hydration cost)"]
        CSSVARS["CSS Custom Properties\n(design tokens at runtime)"]
    end

    SC -->|"prerendered"| HTML
    STATIC_ROUTE -->|"edge-cached"| APICALL["Client fetch()\n(optional, for SPAs)"]
    HTML --> CSSVARS
```

### 9.3 Page Weight Analysis

| Asset | Strategy | Client JS |
|-------|----------|-----------|
| `page.tsx` | Server Component | 0 KB |
| All 7 components | Server Components | 0 KB |
| CSS Modules | Extracted at build | 0 KB runtime |
| Design tokens | CSS custom props | ~2 KB |
| Inline SVG icons | Server-rendered | 0 KB |
| **Total JS to browser** | — | **~0 KB** |

> All components are Server Components — the browser receives pure HTML + CSS with no React hydration overhead.

---

## 10. Technology Decisions

### 10.1 Stack Rationale

```mermaid
graph TD
    PROBLEM["Requirements"]

    PROBLEM --> P1["Scrape a real site\nand recreate its UI"]
    PROBLEM --> P2["Content must be\ndecoupled from markup"]
    PROBLEM --> P3["Design must use\na token system"]
    PROBLEM --> P4["Serve content\nvia an API"]

    P1 -->|"chosen"| NEXTJS2["Next.js 16\nApp Router + SSG\n• Zero-config TypeScript\n• File-based routing\n• Built-in API routes"]

    P2 -->|"chosen"| JSON3["Static JSON\nsite-content.json\n• Single source of truth\n• Version-controllable\n• No CMS dependency"]

    P3 -->|"chosen"| CSSMOD["CSS Modules +\nCSS Custom Properties\n• Scoped by default\n• No runtime overhead\n• Token reuse via var()"]

    P4 -->|"chosen"| APIROUTE["Next.js Route Handler\nforce-static\n• Same codebase\n• Edge-cacheable\n• No extra server"]
```

### 10.2 Alternatives Considered

| Decision | Chosen | Rejected | Reason |
|----------|--------|----------|--------|
| CSS approach | CSS Modules + tokens | Tailwind, styled-components | Scoped styles + zero runtime, explicit token system |
| Content API | Next.js route handler | Express.js, MSW | Same repo, no extra server, static prerender |
| Data source | JSON import | CMS, database | Static content doesn't need runtime data fetching |
| Rendering | All Server Components | Client Components | No interactivity needed; zero JS to browser |
| Icons | Inline SVG | Icon library | No dependency, full colour control via `currentColor` |

---

## Appendix A — Interface Reference

```typescript
// Full TypeScript interface tree — types/content.ts

SiteContent {
  meta:         MetaContent
  header:       HeaderContent
  hero:         HeroContent
  productCards: ProductCardsContent
  support:      SupportContent
  testimonial:  TestimonialContent
  whySection:   WhySectionContent
  footer:       FooterContent
}

Link             { label: string; href: string }
SupportAction    extends Link + { variant: "primary" | "secondary" }
SocialLink       { platform: string; href: string }
ProductCard      { id, heading, description, links: Link[], icon, highlight?: boolean }
WhyCard          { id, heading, description, icon }
```

## Appendix B — Component Props Contract

| Component | Prop | Type |
|-----------|------|------|
| `Header` | `content` | `HeaderContent` |
| `Hero` | `content` | `HeroContent` |
| `ProductCards` | `content` | `ProductCardsContent` |
| `SupportSection` | `content` | `SupportContent` |
| `Testimonial` | `content` | `TestimonialContent` |
| `WhySection` | `content` | `WhySectionContent` |
| `Footer` | `content` | `FooterContent` |

Every component accepts exactly one `content` prop typed to its matching interface. No component reaches outside its prop boundary.

---

*Generated for the BT Wholesale scrape-to-React project · Next.js 16 · TypeScript · CSS Modules*
