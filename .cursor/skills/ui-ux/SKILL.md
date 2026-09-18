---
name: ui-ux
description: Guide UI creation and modification in the Foodiestopia Nuxt/Vue frontend with Tailwind CSS. Use when building or changing pages, layouts, components, forms, navigation, visual hierarchy, spacing, typography, responsiveness, accessibility, interaction states, or animations.
---

# Foodiestopia UI/UX

Prioritize clean professional design, strong visual hierarchy, responsive/mobile-first layouts, accessibility, consistent spacing and typography, reusable components, clear interaction states, and purposeful animations. Always inspect existing components and design patterns before introducing new UI. Avoid unnecessary visual effects and over-engineering. use tailwindcss

## Stack

- Nuxt 4 + Vue 3 (`<script setup lang="ts">`)
- Tailwind CSS v3 utilities only (`app/assets/css/main.css`)
- No component library. Do not add CSS-in-JS, SCSS modules, or new CSS files for one-off styles.
- Do not extend `tailwind.config.js` unless a token will be reused across multiple surfaces.

## Before writing UI

1. Search `app/components/`, `app/pages/`, and `app/layouts/` for the closest existing pattern.
2. Reuse or extract before creating a new component.
3. Match current class names, colors, radii, and spacing. Do not invent a parallel design language.
4. Prefer editing the existing component over a one-off duplicate.

## Visual system (current app)

| Role | Classes |
|------|---------|
| Brand / primary | `text-brand-600`, `bg-brand-600`, `hover:bg-brand-700`, `focus-visible:outline-brand-600` |
| Page canvas | `bg-stone-50`; content in `max-w-6xl mx-auto` |
| Cards / panels | `bg-white border border-stone-200 rounded-lg` |
| Inputs | `border-stone-300 bg-white`; focus ring `ring-brand-500/20` |
| Text | `text-stone-900` headings; `text-stone-600` body; `text-stone-500` labels |
| Errors | `text-red-700 bg-red-50 border border-red-200 rounded-md p-3` |
| Nav | `sticky top-0 z-30 bg-white border-b border-stone-200` |

- Page titles: `text-2xl sm:text-4xl`, centered with `mx-auto w-fit`.
- Form labels: `text-3xl`. Inputs: `text-2xl`, `h-10`, `pl-2`, typically `w-4/5`.
- Forms: `max-w-2xl mx-auto`, `flex flex-col p-6 space-y-4`.
- Field groups: `flex flex-col ... space-y-2`.
- Auth pages: `flex flex-col mt-16 space-y-10`.
- Links: `text-brand-600 hover:text-brand-700` + `transition-colors`.
- Icon SVGs live in `app/components/svgs/` and use `currentColor` + `size-6`.

When changing hierarchy, keep this palette and radius. Tighten spacing or type scale only if it stays consistent with nearby screens.

## Layout and responsiveness

- Mobile-first: base classes first, then `sm:` / `md:` / `lg:`.
- Keep the default layout shell: `Navbar` + `<main class="max-w-[1800px] mx-auto">`.
- Stack on small screens; row layouts (`flex justify-between`) need wrap/stack fallbacks (`flex-col sm:flex-row`).
- Avoid fixed widths that clip on mobile (`w-4/5` on inputs is existing; prefer `w-full` for new fields unless matching an auth form).
- Do not use magic pixel layouts or absolute positioning for page structure.

## Components

- Pages compose; components own UI + local interaction.
- Auth forms belong in `app/components/Auth/`.
- Extract a shared piece only after a second use is real (inputs, password toggle, error banner, primary button).
- Keep templates readable: no deep nested utility soup when a small child component is clearer.
- Icons: Vue SVG components, not inline ad-hoc SVGs, when an icon already exists.

## Interaction states

Every clickable or editable control needs:

- Default
- Hover
- Focus-visible (`focus:outline-green-600` or equivalent ring; never remove focus styles)
- Disabled (`disabled:cursor-not-allowed disabled:bg-slate-500/70` pattern on primary buttons)
- Loading (disable submit, swap label, e.g. `"Logging in..."`)
- Error (inline banner; associate with fields via `aria-*` when adding new forms)

Password toggles must be buttons (or `role="button"` with keyboard support), not unlabeled `div` clicks, on new work. Existing eye-icon toggles should be improved if you touch that form.

## Accessibility

- Real `<button>`, `<label for>`, and heading order (`h1` → `h2`). Do not skip levels.
- Images need meaningful `alt`; decorative images `alt=""`.
- Interactive elements need a discernible name.
- Do not rely on color alone (errors need text, not only red).
- Hit targets: comfortable tap size on mobile (min ~40px).
- `ClientOnly` only for auth-hydration mismatches (see `Navbar.vue`), not as a layout crutch.

## Motion

- Use Tailwind `transition` / `duration-*` on color, opacity, or transform.
- Animate only to clarify state (hover, expand, loading).
- No decorative loops, parallax, heavy blur, or large entrance choreography.

## Do not

- Add new visual libraries, icon packs, or animation libraries without an explicit request.
- Introduce a second green, a custom font, or gradients unless extending the shared theme.
- Copy marketing-site aesthetics (glassmorphism, neon, excessive shadows).
- Inline duplicate form markup across pages; follow `login.vue` → `LoginForm` composition.
- Over-engineer tokens, design-system folders, or abstraction for a single screen.

## Workflow

1. Identify the surface (page, layout, or component).
2. Diff against the closest existing Vue file.
3. Implement with Tailwind utilities that already appear in the app.
4. Check mobile width, focus, disabled/loading, and error states.
5. Stop when the UI is clear and consistent — do not add extra polish.
