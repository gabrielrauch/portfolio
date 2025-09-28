# AI Coding Agent Instructions

## Project Overview

This is a **SvelteKit 5** portfolio website with modern tooling, deployed to **Cloudflare Pages**. It showcases a developer's skills, projects, and contact information with a terminal/command-line aesthetic.

## Architecture & Key Patterns

### Core Structure

- **Single-page application** with smooth-scroll navigation between sections
- **Component-based architecture**: Navigation, HeroSection, TechStack, AboutSection, ContactSection, Footer
- **Progressive animation system** using Intersection Observer API for section visibility
- **Theme system** with light/dark/system modes using CSS custom properties

### Critical Files

- `src/routes/+page.svelte` - Main page with animation orchestration
- `src/routes/+layout.svelte` - Global theme initialization
- `src/lib/stores/theme.ts` - Theme management with localStorage persistence
- `src/app.css` - Custom CSS variables, animations, and Tailwind integration
- `svelte.config.js` - Cloudflare adapter configuration

## Development Workflows

### Essential Commands

```bash
npm run dev          # Development server with HMR
npm run build        # Production build for Cloudflare
npm run preview      # Preview production build locally
npm run check        # Svelte + TypeScript type checking
npm run lint         # ESLint + Prettier checks
npm run format       # Auto-format with Prettier
```

### Build & Deploy

- **Adapter**: `@sveltejs/adapter-cloudflare` for static generation
- **Styling**: Tailwind CSS v4 with custom CSS variables for theming
- **Type Safety**: Full TypeScript support with svelte-check

## Project-Specific Conventions

### Animation System

```svelte
<!-- Section animations using intersection observer -->
<section class="section-animate {visible ? 'visible' : ''}">
  <!-- Staggered children animations -->
  <div class="stagger-children">
    <div>Item 1</div> <!-- auto-delay: 0.1s -->
    <div>Item 2</div> <!-- auto-delay: 0.2s -->
  </div>
</section>
```

### Theme Implementation

- **CSS Variables**: `rgb(var(--primary))` format for Tailwind integration
- **Class-based switching**: `.light`/`.dark` on `documentElement`
- **System detection**: Automatic preference detection with manual override
- **Store pattern**: Reactive theme store with localStorage persistence

### Component Patterns

```svelte
<!-- Event handling with smooth scroll -->
<button on:click={() => smoothScrollTo('section-id')}>
  Navigate
</button>

<!-- Glass morphism styling -->
<div class="glass border-border">Content</div>

<!-- Terminal aesthetic -->
<span class="font-mono">~/command</span>
```

### Form Integration

- **External service**: Formspree.io for contact form submission
- **Client validation**: Before external API calls
- **Progressive enhancement**: Works without JavaScript

## Critical Dependencies

- **Lucide Svelte**: Primary icon system (`import { Icon } from 'lucide-svelte'`)
- **Tailwind CSS v4**: Styling with Vite plugin integration
- **CSS Custom Properties**: Theme token system using RGB values
- **Intersection Observer**: Native API for scroll-based animations

## Common Tasks

### Adding New Sections

1. Create component in `src/lib/components/`
2. Import and add to `src/routes/+page.svelte`
3. Add section ID and animation state to `sectionsVisible` object
4. Update navigation in `Navigation.svelte`

### Theme Modifications

- Update CSS variables in `src/app.css` (light/dark sections)
- Colors use RGB format: `--primary: 255 255 255;`
- Access via `rgb(var(--primary))` or Tailwind classes

### Icon Usage

```svelte
import { IconName } from 'lucide-svelte';
<IconName class="h-4 w-4" />
```

### Performance Considerations

- **Lazy loading**: Sections animate in when visible
- **Minimal JavaScript**: Most animations use CSS transitions
- **Static generation**: No runtime dependencies for core functionality
