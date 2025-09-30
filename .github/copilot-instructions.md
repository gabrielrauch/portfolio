# AI Coding Agent Instructions

## Project Overview

This is a **SvelteKit 5** portfolio website with modern tooling, deployed to **Cloudflare Pages**. It showcases a developer's skills, projects, and contact information with a terminal/command-line aesthetic. The project has evolved into a full-stack application featuring a blog system with authentication, content management, and a Cloudflare Workers API backend.

## Architecture & Key Patterns

### Core Structure

- **Multi-page application** with portfolio homepage and dynamic blog system
- **Component-based architecture**: Navigation, HeroSection, TechStack, AboutSection, ContactSection, Footer, BlogSection
- **Progressive animation system** using Intersection Observer API for section visibility
- **Theme system** with light/dark/system modes using CSS custom properties
- **Full-stack blog** with Cloudflare Workers API, D1 database, and admin dashboard
- **Authentication system** with JWT tokens and bcrypt password hashing

### Critical Files

#### Frontend (SvelteKit)

- `src/routes/+page.svelte` - Main portfolio page with animation orchestration
- `src/routes/+layout.svelte` - Global theme initialization and navigation
- `src/routes/blog/+page.svelte` - Blog listing page
- `src/routes/blog/[slug]/+page.svelte` - Individual blog post pages
- `src/routes/admin/+page.svelte` - Admin login page
- `src/routes/admin/dashboard/+page.svelte` - Admin dashboard for content management
- `src/lib/stores/theme.ts` - Theme management with localStorage persistence
- `src/lib/api/blog.ts` - Blog API client functions
- `src/lib/utils/blog.ts` - Blog utility functions
- `src/app.css` - Custom CSS variables, animations, and Tailwind integration
- `svelte.config.js` - Cloudflare adapter configuration

#### Backend (Cloudflare Workers)

- `api/src/index.ts` - Main worker entry point with routing
- `api/src/routes/auth.ts` - Authentication endpoints
- `api/src/routes/posts.ts` - Blog post CRUD endpoints
- `api/src/middleware/auth.ts` - JWT authentication middleware
- `api/src/utils/jwt.ts` - JWT token utilities
- `api/src/utils/password.ts` - Password hashing utilities
- `api/wrangler.toml` - Cloudflare Workers configuration

#### Database

- `database/migrations/` - D1 database migration files
- `database/seed.sql` - Initial database seeding

## Development Workflows

### Essential Commands

#### Frontend Development

```bash
npm run dev          # Development server with HMR
npm run build        # Production build for Cloudflare Pages
npm run preview      # Preview production build locally
npm run check        # Svelte + TypeScript type checking
npm run lint         # ESLint + Prettier checks
npm run format       # Auto-format with Prettier
```

#### API Development (in api/ directory)

```bash
npm run dev          # Start Cloudflare Workers dev server
npm run deploy       # Deploy Workers API to production
npm run db:create    # Create D1 database
npm run db:migrate   # Apply migrations locally
npm run db:migrate:prod # Apply migrations to production
npm run db:seed      # Seed database locally
npm run db:seed:prod # Seed database in production
```

### Build & Deploy

- **Frontend**: `@sveltejs/adapter-cloudflare` for static generation to Cloudflare Pages
- **API**: Cloudflare Workers with D1 SQLite database
- **Styling**: Tailwind CSS v4 with custom CSS variables for theming
- **Type Safety**: Full TypeScript support across frontend and backend
- **Authentication**: JWT-based auth with bcrypt password hashing

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

- **Contact Form**: Formspree.io for contact form submission
- **Blog Forms**: Custom forms using API endpoints for post creation/editing
- **Authentication**: Login forms with JWT token management
- **Client validation**: Before external API calls
- **Progressive enhancement**: Works without JavaScript where possible

### API Integration

```svelte
<!-- Blog API usage -->
import { blogApi } from '$lib/api/blog';

// Fetch blog posts
const posts = await blogApi.getPosts();

// Create new post (admin)
await blogApi.createPost(postData, token);
```

### Authentication Patterns

```svelte
<!-- Protected routes -->
import { goto } from '$app/navigation';
import { browser } from '$app/environment';

// Check auth status
if (browser && !isAuthenticated()) {
  goto('/admin');
}
```

## Critical Dependencies

- **Lucide Svelte**: Primary icon system (`import { Icon } from 'lucide-svelte'`)
- **Tabler Icons**: Additional icon set (`@tabler/icons-svelte`)
- **Tailwind CSS v4**: Styling with Vite plugin integration
- **CSS Custom Properties**: Theme token system using RGB values
- **Intersection Observer**: Native API for scroll-based animations
- **Marked**: Markdown parsing for blog content
- **Date-fns**: Date formatting and manipulation
- **Cloudflare Workers**: API backend runtime
- **bcryptjs**: Password hashing for authentication
- **JWT**: Token-based authentication (@tsndr/cloudflare-worker-jwt)

## Common Tasks

### Adding New Sections

1. Create component in `src/lib/components/`
2. Import and add to `src/routes/+page.svelte`
3. Add section ID and animation state to `sectionsVisible` object
4. Update navigation in `Navigation.svelte`

### Adding Blog Components

1. Create components in `src/lib/components/blog/`
2. Import in blog pages (`src/routes/blog/`)
3. Use blog API utilities from `$lib/api/blog.ts`
4. Follow authentication patterns for admin features

### Theme Modifications

- Update CSS variables in `src/app.css` (light/dark sections)
- Colors use RGB format: `--primary: 255 255 255;`
- Access via `rgb(var(--primary))` or Tailwind classes

### API Development

- Add new routes in `api/src/routes/`
- Use middleware from `api/src/middleware/`
- Update database schema with migrations in `database/migrations/`
- Test locally with `npm run dev` in api directory

### Icon Usage

```svelte
import { IconName } from 'lucide-svelte';
<IconName class="h-4 w-4" />

<!-- Or Tabler icons -->
import { IconName } from '@tabler/icons-svelte';
<IconName size={16} />
```

### Performance Considerations

- **Lazy loading**: Sections animate in when visible
- **Minimal JavaScript**: Most animations use CSS transitions
- **Static generation**: No runtime dependencies for core functionality
- **API caching**: Blog posts cached with appropriate headers
- **Database optimization**: Efficient queries with proper indexing
- **JWT security**: Proper token validation and expiration
