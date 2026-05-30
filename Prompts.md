# Prompts.md — AI Interaction Log

**Project:** Sprint 01 — Prodesk IT Landing Page + CSS Grid Photo Gallery
**Developer:** Aman
**AI Tool Used:** Claude (Anthropic)
**Policy:** All AI interactions logged as required by Prodesk IT AI Policy.

---

## Interaction Log

---

### Prompt 1
**Prompt:**
> "How should I create a folder structure to make it scalable and easier to adapt Tailwind and add a dark mode toggle using vanilla JS later?"

**Purpose:** Planning the project architecture before writing any code.

**What I learned / applied:**
Understood how to separate concerns into folders (`css/`, `js/`, `assets/`) so that migrating to Tailwind later only requires replacing CSS files without touching HTML structure. Kept `index.html` at root level.

---

### Prompt 2
**Prompt:**
> "If I start a simple project in HTML/CSS and later switch to Tailwind, how is that achieved?"

**Purpose:** Understanding the Phase 3 migration path before committing to a CSS architecture.

**What I learned / applied:**
Learned that keeping styling in separate CSS files (rather than inline styles) makes Tailwind migration straightforward — you replace utility classes file by file while the HTML structure stays intact.

---

### Prompt 3
**Prompt:**
> "Can we implement a hamburger menu without using JS?"

**Purpose:** Exploring a pure CSS approach for the mobile navbar collapse requirement.

**What I learned / applied:**
Learned the CSS-only checkbox hack — using a hidden `<input type="checkbox">` with a `<label>` as the hamburger icon, and toggling nav visibility using the `:checked` pseudo-class and `~` sibling combinator in CSS.

---

### Prompt 4
**Prompt:**
> "If I have divided my code into multiple CSS files, should I use a `<link>` for each, or import all of them into a main CSS file and add just that one to HTML?"

**Purpose:** Understanding best practices for managing a multi-file CSS architecture.

**What I learned / applied:**
Using `@import` inside a single `main.css` is cleaner and more maintainable for development. Multiple `<link>` tags load in parallel and are marginally faster. Used the `@import` approach for this sprint for readability and scalability.

---

### Prompt 5
**Prompt:**
> "Why do developers use `<header>`, `<section>`, and `<footer>`?"

**Purpose:** Understanding semantic HTML and its impact on accessibility and Lighthouse scores (Phase 3 requirement: 100/100 Accessibility).

**What I learned / applied:**
Semantic tags improve screen reader navigation, SEO hierarchy, developer readability, and directly boost Lighthouse Accessibility scores — all relevant to Phase 3 QA requirements.

---

### Prompt 6
**Prompt:**
> "By this statement is it mandatory to use scale or color, or are these just examples?" (referring to Phase 2 micro-interactions requirement)

**Purpose:** Clarifying what Phase 2 hover micro-interactions actually require before implementing them.

**What I learned / applied:**
Understood that the sprint brief lists scale and color shifts as example techniques, not mandatory ones. The actual requirement is that interactive elements have visible hover states. This gave flexibility to choose effects that suited the design.

---

### Prompt 7
**Prompt:**
> "Can't I just use scale and shadow to create a z-axis effect?"

**Purpose:** Confirming whether CSS `transform: scale()` combined with `box-shadow` is a valid substitute for a true z-axis lift on service cards (Phase 2).

**What I learned / applied:**
Confirmed that scale + shadow together visually simulate depth and elevation convincingly without needing true 3D transforms. This is the standard approach used in modern UI card interactions.

---

### Prompt 8
**Prompt:**
> "What possible things can the `content` property take — can it take another element like a box, or only text?"

**Purpose:** Understanding CSS `content` deeply enough to implement hover arrow and decorative elements correctly.

**What I learned / applied:**
`content` accepts strings, unicode characters, `url()` for images, `attr()` for HTML attributes, and counters. It cannot insert real HTML elements — only visual content via pseudo-elements. An empty string `content: ""` is used to create purely decorative shapes.

---

### Prompt 9
**Prompt:**
> "Can you suggest a theme or color palette that will make this website look professional?"

**Purpose:** Choosing a cohesive visual identity for the landing page before writing any styles.

**What I learned / applied:**
Learned the importance of limiting a palette to 2–3 core colors (primary, neutral, accent) for a professional look. Understood contrast ratios for accessibility and how dark/light mode palettes should be defined as CSS variables from the start to simplify theme switching later.

---

### Prompt 10
**Prompt:**
> "To optimize a website, should I use images from local storage or just use external links?"

**Purpose:** Making an informed decision about image handling for the Lighthouse Performance score (Phase 3: 100/100 target).

**What I learned / applied:**
Self-hosted images allow full compression control and avoid hotlinking risks. CDN-hosted images offer fast delivery but depend on third-party uptime. For Lighthouse performance audits, self-hosted and properly optimised images score better.

---

### Prompt 11
**Prompt:**
> "How can I fix the 'Avoid chaining critical requests' Lighthouse warning?"

**Purpose:** Resolving a Lighthouse Performance audit issue while working toward the Phase 3 100/100 score target.

**What I learned / applied:**
Added the `defer` attribute to script tags to prevent render-blocking. Learned about the Critical Rendering Path and how the order in which the browser loads assets affects perceived performance and Lighthouse scores.

---

### Prompt 12
**Prompt:**
> "What does this mean: 'Tech Stack Migration — Refactor the module's styling architecture entirely into Tailwind CSS'?"

**Purpose:** Clarifying the Phase 3 requirement before starting the Tailwind migration.

**What I learned / applied:**
Phase 3 means replacing all custom CSS files with Tailwind utility classes applied directly in HTML. No separate `.css` files remain for layout — this is a deliberate architectural shift, not just adding Tailwind on top of existing styles.

---

### Prompt 13
**Prompt:**
> "Which is the better way to use Tailwind CSS — the `<link>` CDN method or installing it?"

**Purpose:** Getting started with Tailwind before beginning the Phase 3 migration.

**What I learned / applied:**
Learned how to install Tailwind via CDN (for quick prototyping) and via CLI with a config file (for production builds). Understood the utility-first approach where styles are applied as class names directly on HTML elements.

---

### Prompt 14
**Prompt:**
> "Does Tailwind CSS have pseudo-elements and pseudo-classes?"

**Purpose:** Understanding whether Tailwind can replicate `::before` and `::after` effects used in Phase 1 and 2.

**What I learned / applied:**
Tailwind supports pseudo-elements via the `before:` and `after:` variant prefixes (e.g., `before:content-['→'] before:opacity-0 hover:before:opacity-100`). Must also include `before:block` or similar to make the pseudo-element visible.

---

### Prompt 15
**Prompt:**
> "How do I set colors for dark mode in Tailwind?" and "How do I create dark mode in Tailwind?" and "What does the Tailwind v4 dark mode documentation mean, and how do I use it?"

**Purpose:** Implementing the dark mode toggle in the Tailwind-migrated version (Phase 3).

**What I learned / applied:**
In Tailwind v4, dark mode uses `@variant dark` in CSS or `darkMode: 'class'` in the config. Applied `dark:` prefixed utility classes (e.g., `dark:bg-gray-900`) and toggled a `dark` class on `<html>` via vanilla JS to switch themes.

---

*This log was maintained in compliance with the Prodesk IT AI Usage Policy for Sprint 01.*
