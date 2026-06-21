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

---
---

# Prompts.md — AI Interaction Log

**Project:** Sprint 02 — Cash-Flow (Salary & Expense Tracker)
**Developer:** Aman
**AI Tool Used:** Claude (Anthropic)
**Policy:** All AI interactions logged as required by Prodesk IT AI Policy.

---

## Interaction Log

---

### Prompt 16
**Prompt:**
> "What is the difference between a state-driven architecture and directly manipulating the DOM on every event?"

**Purpose:** Understanding the right mental model for building the app before writing any code, given that the sprint requires real-time state updates and localStorage persistence to work together.

**What I learned / applied:**
In a state-driven approach, a single `state` object is the source of truth. Every user action mutates the state, then one `render()` function re-paints the entire DOM from that state. This is simpler to reason about than scattered DOM writes because the UI always reflects exactly what's in the object — and it makes localStorage sync trivial since you only ever serialize one thing.

---

### Prompt 17
**Prompt:**
> "Why does adding two DOM input values sometimes produce '1010' instead of '20' in JavaScript?"

**Purpose:** Understanding the type coercion issue flagged in the sprint FAQ before running into it during implementation.

**What I learned / applied:**
DOM `.value` always returns a string. The `+` operator concatenates strings before it adds numbers. Wrapping values in `Number()` or `parseFloat()` converts them to numeric types first, making arithmetic behave as expected. `parseFloat` is preferred for currency values to handle decimals.

---

### Prompt 18
**Prompt:**
> "What is `localStorage` and why can it only store strings?"

**Purpose:** Understanding the persistence layer before implementing `saveState()` and `loadState()`.

**What I learned / applied:**
`localStorage` is a synchronous key-value store in the browser with a ~5MB limit per origin. It only accepts strings because it predates the Structured Clone Algorithm. `JSON.stringify()` serializes an object to a JSON string for storage, and `JSON.parse()` deserializes it back into a usable JS object on retrieval.

---

### Prompt 19
**Prompt:**
> "What is the `.reduce()` array method and how does it calculate a running total?"

**Purpose:** Understanding the array method the sprint explicitly requires for calculating total expenses before using it.

**What I learned / applied:**
`.reduce(callback, initialValue)` iterates over an array and accumulates a single value. The callback receives an accumulator and the current item. For a sum, the accumulator starts at `0` and each iteration adds `currentItem.amount` to it. It's the idiomatic tool for collapsing an array into one value.

---

### Prompt 20
**Prompt:**
> "What does `DOMContentLoaded` do, and why would I use it instead of placing a script tag at the bottom of `<body>`?"

**Purpose:** Understanding when and how to initialise the app — specifically when to call `loadState()` on page load.

**What I learned / applied:**
`DOMContentLoaded` fires when the HTML is fully parsed, before images and stylesheets finish loading. Placing scripts at the bottom of `<body>` achieves similar timing but can cause a flash. Wrapping initialisation in a `DOMContentLoaded` listener is the cleaner pattern when using `defer` on the script tag, as both ensure the DOM is ready before JS runs.

---

### Prompt 21
**Prompt:**
> "How does Chart.js get integrated into a plain HTML project without npm or a bundler?"

**Purpose:** Understanding the CDN integration method required by the sprint before adding the pie chart.

**What I learned / applied:**
Chart.js exposes a UMD build via CDN. Adding the `<script src="...">` tag in the HTML makes `Chart` available as a global variable. No `import` statements are needed. The chart is initialized by passing a `<canvas>` element and a config object to `new Chart(canvas, config)`.

---

### Prompt 22
**Prompt:**
> "Why does my Chart.js pie chart duplicate every time I add a new expense, and what is the correct way to update it?"

**Purpose:** Understanding the chart instance lifecycle before implementing the re-render logic.

**What I learned / applied:**
`new Chart()` always creates a new chart on top of whatever exists on the canvas. The fix is to store the chart instance in a variable (e.g., `let pieChart = null`) and call `pieChart.destroy()` before creating a new one. Alternatively, mutate `pieChart.data` directly and call `pieChart.update()` to avoid a full teardown.

---

### Prompt 23
**Prompt:**
> "What is a unique ID and why is it important when deleting an item from an array?"

**Purpose:** Understanding why each expense object needs an `id` property before implementing the delete feature.

**What I learned / applied:**
When deleting by DOM position (index), the index shifts after every deletion, causing off-by-one errors. Assigning a stable unique ID (e.g., `Date.now()`) to each item when it is created means the delete handler can use `state.expenses.filter(e => e.id !== targetId)` — which always targets the correct item regardless of array order.

---

### Prompt 24
**Prompt:**
> "What does a REST API response look like, and how do I extract a specific value from it in JavaScript?"

**Purpose:** Understanding how to consume the Frankfurter API response before writing the currency conversion feature.

**What I learned / applied:**
A REST API returns a JSON object over HTTP. `fetch(url)` returns a Promise; calling `.json()` on the response parses it into a JS object. Values are accessed via dot notation or bracket notation (e.g., `data.rates.USD`). If the response shape is nested or unexpected, checking it in the browser's Network tab first prevents guessing.

---

### Prompt 25
**Prompt:**
> "What is CORS and why does it block some API requests made from a browser?"

**Purpose:** Understanding why the Frankfurter API call failed with a CORS error during development.

**What I learned / applied:**
CORS (Cross-Origin Resource Sharing) is a browser security policy that blocks requests to a different origin unless the server explicitly allows it via response headers. Server-side requests are unaffected. Public APIs like Frankfurter include `Access-Control-Allow-Origin: *` in their headers, so they work from the browser. CORS errors usually mean either the API doesn't allow browser requests, or the URL is wrong.

---

### Prompt 26
**Prompt:**
> "How does the `fetch` API work, and what is the difference between `.then()` chaining and `async/await`?"

**Purpose:** Choosing the right pattern for handling the asynchronous Frankfurter API call before writing it.

**What I learned / applied:**
`fetch` returns a Promise. `.then()` chains callbacks for sequential async steps. `async/await` is syntactic sugar over Promises that makes async code read like synchronous code. Both achieve the same result; `async/await` is generally preferred for readability, especially when multiple sequential awaits are needed.

---

### Prompt 27
**Prompt:**
> "What is input validation and what are the edge cases I should guard against in a form that accepts numbers?"

**Purpose:** Understanding what validation logic to write before implementing the Phase 1 requirement to prevent invalid submissions.

**What I learned / applied:**
Common numeric input edge cases: empty string (parses to `NaN`), zero, negative numbers, and non-numeric strings. `isNaN()` catches unparseable values. Explicit checks for `<= 0` guard against negative and zero amounts. Validation should run before any state mutation and surface a visible error message in the DOM rather than a `console.error` or `alert`.

---

### Prompt 28
**Prompt:**
> "How do I generate and download a PDF from browser content using jsPDF without a build tool?"

**Purpose:** Understanding how jsPDF works via CDN before implementing the report download feature in Phase 3.

**What I learned / applied:**
jsPDF is available as a CDN script that exposes a `jspdf.jsPDF` global. A new document is created with `new jsPDF()`, text is added with `.text()`, and `.save('filename.pdf')` triggers the browser download. For tabular expense data, the `jspdf-autotable` plugin adds a `.autoTable()` method that formats an array of objects into a styled table automatically.

---

*This log was maintained in compliance with the Prodesk IT AI Usage Policy for Sprint 02.*



---
---

# Prompts.md — AI Interaction Log

**Project:** Sprint 03 — Dev-Detective (GitHub User Profile Search App)
**Developer:** Aman
**AI Tool Used:** Claude (Anthropic)
**Policy:** All AI interactions logged as required by Prodesk IT AI Policy.

---

## Interaction Log

---

### Prompt 29
**Prompt:**
> "List Rendering: Map and render the Top 5 Latest Repositories below the main profile card. Ensure the repo names are clickable `<a href>` links opening in a new tab — what does this actually require?"

**Purpose:** Clarifying a sprint requirement before implementing the repository list feature.

**What I learned / applied:**
The requirement means mapping over the fetched repos array, slicing to the top 5, and rendering each as a list item where the repo name is wrapped in an `<a href="{html_url}">` tag. `target="_blank"` opens it in a new tab, and `rel="noopener noreferrer"` is the standard safety pairing that prevents the new tab from accessing the original page via `window.opener`.

---

### Prompt 30
**Prompt:**
> "What order does the GitHub API return a user's repos in by default — should I sort the response after fetching, or request a sorted response via a query parameter?"

**Purpose:** Deciding the correct way to fetch the top 5 latest repos before writing the fetch call.

**What I learned / applied:**
GitHub returns repos sorted alphabetically by `full_name` by default. Sorting via the query parameter (`?sort=created&direction=desc&per_page=5`) is the correct approach rather than sorting client-side, because the API only returns 30 repos per page by default — client-side sorting on an unsorted first page would silently produce wrong results for users with more than 30 repos.

---

### Prompt 31
**Prompt:**
> "Is the API actually being called inside the loop where `fetch()` is invoked, or at `Promise.all()` — and is `Promise.all()` serving its purpose here?"

**Purpose:** Understanding exactly when an HTTP request fires versus when its result is awaited, before relying on `Promise.all()` to run two user lookups in parallel for Battle Mode.

**What I learned / applied:**
`fetch()` fires the request immediately when it's called — `Promise.all()` doesn't trigger anything, it just waits for promises that are already in flight. Using `Promise.all()` around the array of fetch calls runs both user lookups simultaneously instead of sequentially, which is exactly why it's the right tool for Battle Mode's two-user comparison.

---

*This log was maintained in compliance with the Prodesk IT AI Usage Policy for Sprint 03.*