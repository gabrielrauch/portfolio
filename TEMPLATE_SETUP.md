# Template Setup Guide

This guide walks you through setting up your portfolio from this template.

## Table of Contents

1. [Initial Setup](#initial-setup)
2. [Configuration](#configuration)
3. [Customization](#customization)
4. [Blog Setup (Optional)](#blog-setup-optional)
5. [Deployment](#deployment)
6. [Advanced Topics](#advanced-topics)

## Initial Setup

### Prerequisites

- Node.js 18+ and npm
- Git
- (Optional) Cloudflare account for blog features and deployment

### Steps

1. **Create your repository from this template**
   - Click "Use this template" on GitHub
   - Choose a name for your portfolio repository
   - Clone it locally:
     ```bash
     git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
     cd YOUR_REPO_NAME
     ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

   Open http://localhost:5173 to see your site.

## Configuration

### Basic Configuration

All personal information is stored in `template.config.json`. This is the **only file you need to edit** to customize your portfolio.

#### Personal Information

```json
{
  "personal": {
    "name": "Your Full Name",
    "title": "Your Professional Title",
    "description": "A brief description of your expertise and experience",
    "email": "your.email@example.com",
    "location": "Your City, State/Country",
    "availability": "Available for work",
    "branding": "yourname.sh"
  }
}
```

**Fields:**

- `name`: Your full name (appears in hero section and terminal)
- `title`: Your professional title (e.g., "Full Stack Engineer", "Software Developer")
- `description`: Brief professional summary (appears in terminal animation)
- `email`: Contact email (appears in contact section)
- `location`: Where you're based (appears in about section)
- `availability`: Current work status (e.g., "Available for work", "Open to opportunities")
- `branding`: Personal branding shown in navigation (e.g., "yourname.sh", "yourname.dev")

#### Professional Information

```json
{
  "professional": {
    "yearsOfExperience": 5,
    "bio": "Your professional biography here...",
    "personalBio": "Your personal statement here...",
    "focus": "Your tech stack (e.g., Node.js, React, TypeScript)",
    "interests": "Your professional interests (e.g., AI/ML, Cloud, DevOps)"
  }
}
```

**Fields:**

- `yearsOfExperience`: Number of years in your field
- `bio`: Detailed professional background (appears in "Professional" card)
- `personalBio`: Personal statement about your approach and values (appears in "Personal" card)
- `focus`: Your main technology stack and areas of expertise
- `interests`: Professional interests and domains you're passionate about

#### Social Links

```json
{
  "social": {
    "github": "yourusername",
    "linkedin": "yourusername",
    "discord": "1234567890123456789",
    "whatsapp": "15551234567",
    "resumeUrl": "https://example.com/your-resume.pdf"
  }
}
```

**Fields:**

- `github` (required): Your GitHub username
- `linkedin` (required): Your LinkedIn username (the part after `/in/`)
- `discord` (optional): Your Discord user ID. Set to `null` to hide Discord link
- `whatsapp` (optional): Your WhatsApp number with country code (no + or spaces). Set to `null` to hide
- `resumeUrl` (required): Direct link to your resume/CV PDF

**Getting your Discord User ID:**

1. Enable Developer Mode in Discord (Settings → Advanced → Developer Mode)
2. Right-click your profile and select "Copy User ID"

**WhatsApp number format:**

- Include country code
- No + sign, no spaces or dashes
- Example: `15551234567` for +1 (555) 123-4567

#### API Configuration (Optional)

```json
{
  "api": {
    "baseUrl": "https://your-api.workers.dev"
  }
}
```

Only needed if you're using the blog feature. See [Blog Setup](#blog-setup-optional).

### Configuration Schema

The `template.config.schema.json` file provides autocomplete and validation in IDEs. If your editor supports JSON schemas, you'll get:

- Autocomplete for field names
- Validation of required fields
- Type checking for values
- Descriptions for each field

## Customization

### Styling

The site uses Tailwind CSS v4 with custom CSS properties for theming.

**Edit theme colors** in `src/app.css`:

```css
@theme {
  /* Light mode colors */
  --color-primary: /* your color */;
  --color-background: /* your color */;
  /* ... */
}
```

**Add custom styles:**

- Global styles go in `src/app.css`
- Component-specific styles use Svelte's scoped `<style>` blocks

### Components

All sections are component-based for easy customization:

**Main sections:**

- `src/lib/components/HeroSection.svelte` - Landing/hero section
- `src/lib/components/TechStack.svelte` - Skills showcase
- `src/lib/components/AboutSection.svelte` - About section
- `src/lib/components/ContactSection.svelte` - Contact info and form
- `src/lib/components/ContactForm.svelte` - Contact form (Formspree integration)

**To modify a section:**

1. Open the component file
2. Edit the markup and styling
3. Changes are reflected immediately in dev mode

### Tech Stack

Edit `src/lib/components/TechStack.svelte` to update your skills:

```svelte
const technologies = [
  {
    name: "Your Framework",
    icon: YourIcon,
    color: "text-color-class"
  },
  // Add more...
];
```

### Contact Form

The contact form uses [Formspree](https://formspree.io/) for submissions.

**Setup:**

1. Create a free account at https://formspree.io/
2. Create a new form
3. Copy your form endpoint
4. Update `src/lib/components/ContactForm.svelte`:
   ```svelte
   const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";
   ```

### Adding New Sections

1. **Create component** in `src/lib/components/YourSection.svelte`
2. **Import in main page** (`src/routes/+page.svelte`):
   ```svelte
   import YourSection from '$lib/components/YourSection.svelte';
   ```
3. **Add to page with animation**:
   ```svelte
   <section id="yoursection" class="section-animate {sectionsVisible.yoursection ? 'visible' : ''}">
     <YourSection />
   </section>
   ```
4. **Add to visibility tracking**:
   ```javascript
   let sectionsVisible = {
     // ...
     yoursection: false,
   };
   ```

## Blog Setup (Optional)

The template includes an optional full-featured blog system.

### Requirements

- Cloudflare account (free tier works)
- Wrangler CLI: `npm install -g wrangler`

### Setup Steps

#### 1. Set Up D1 Database

```bash
cd api
npm install

# Login to Cloudflare
wrangler login

# Create D1 database
wrangler d1 create portfolio-blog

# Note the database_id from the output
```

#### 2. Configure Worker

Copy the example config:

```bash
cp wrangler.toml.example wrangler.toml
```

Edit `api/wrangler.toml` and update:

```toml
database_id = "YOUR_D1_DATABASE_ID_HERE"
```

#### 3. Create KV Namespace

```bash
wrangler kv:namespace create CACHE
# Note the id from output and update wrangler.toml
```

#### 4. Run Migrations

```bash
# Local development
npm run db:migrate

# Production
npm run db:migrate:prod
```

#### 5. Seed Database (Optional)

Creates a default admin user (email: admin@example.com, password: admin123):

```bash
# Local
npm run db:seed

# Production
npm run db:seed:prod
```

**⚠️ Important:** Change the admin password immediately after first login!

#### 6. Deploy API

```bash
npm run deploy
```

Note the worker URL (e.g., `https://portfolio-blog-api.YOUR_USERNAME.workers.dev`)

#### 7. Update Template Config

Update `template.config.json`:

```json
{
  "api": {
    "baseUrl": "https://portfolio-blog-api.YOUR_USERNAME.workers.dev"
  }
}
```

### Blog Features

Once set up, you get:

- Public blog listing at `/blog`
- Individual post pages at `/blog/[slug]`
- Admin dashboard at `/admin/dashboard`
- Rich text editing with Markdown support
- Draft/published status
- Post scheduling

### Creating Your First Post

1. Navigate to `/admin` and login
2. Click "Create New Post"
3. Write your content in Markdown
4. Choose "Published" status
5. Click "Create Post"

## Deployment

### Cloudflare Pages (Recommended)

#### Via Dashboard

1. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
2. Click "Create a project"
3. Connect your GitHub repository
4. Configure build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `.svelte-kit/cloudflare`
   - **Root directory:** (leave empty)
5. Click "Save and Deploy"

#### Via Wrangler

```bash
# Build the site
npm run build

# Deploy
npx wrangler pages deploy .svelte-kit/cloudflare
```

### Other Platforms

#### Vercel

1. Install Vercel adapter:
   ```bash
   npm install -D @sveltejs/adapter-vercel
   ```
2. Update `svelte.config.js`:
   ```javascript
   import adapter from "@sveltejs/adapter-vercel";
   ```
3. Deploy via Vercel CLI or GitHub integration

#### Netlify

1. Install Netlify adapter:
   ```bash
   npm install -D @sveltejs/adapter-netlify
   ```
2. Update `svelte.config.js`:
   ```javascript
   import adapter from "@sveltejs/adapter-netlify";
   ```
3. Create `netlify.toml`:
   ```toml
   [build]
     command = "npm run build"
     publish = ".svelte-kit/netlify"
   ```

#### Static Hosting (GitHub Pages, etc.)

1. Install static adapter:
   ```bash
   npm install -D @sveltejs/adapter-static
   ```
2. Update `svelte.config.js`:
   ```javascript
   import adapter from "@sveltejs/adapter-static";
   ```
3. Build:
   ```bash
   npm run build
   ```
4. Deploy the `build` directory

## Advanced Topics

### Environment Variables

For sensitive data or environment-specific configuration, use environment variables:

1. Create `.env` file (ignored by git):

   ```
   PUBLIC_API_URL=https://your-api.workers.dev
   ```

2. Access in code:
   ```javascript
   import { env } from "$env/dynamic/public";
   const apiUrl = env.PUBLIC_API_URL;
   ```

### Custom Domain

#### Cloudflare Pages

1. Go to your Pages project
2. Navigate to "Custom domains"
3. Add your domain
4. Update DNS settings as instructed

#### Blog API Custom Domain

1. Go to Cloudflare Workers
2. Select your worker
3. Go to "Triggers" → "Custom Domains"
4. Add your API subdomain (e.g., `api.yourdomain.com`)

### Analytics

Add analytics by including the tracking script in `src/routes/+layout.svelte`:

**Google Analytics:**

```svelte
<svelte:head>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  </script>
</svelte:head>
```

**Cloudflare Web Analytics:**

```svelte
<svelte:head>
  <script defer src='https://static.cloudflareinsights.com/beacon.min.js'
          data-cf-beacon='{"token": "your-token"}'></script>
</svelte:head>
```

### SEO Optimization

Update meta tags in `src/routes/+layout.svelte` and individual pages:

```svelte
<svelte:head>
  <title>Your Name - Portfolio</title>
  <meta name="description" content="Your description" />
  <meta property="og:title" content="Your Name - Portfolio" />
  <meta property="og:description" content="Your description" />
  <meta property="og:image" content="/og-image.jpg" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>
```

Add your OG image to `static/og-image.jpg`.

### Performance

The template is optimized for performance:

- Static generation
- Minimal JavaScript
- CSS custom properties
- Lazy image loading
- Progressive enhancement

**Measure performance:**

- Lighthouse in Chrome DevTools
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [WebPageTest](https://www.webpagetest.org/)

## Troubleshooting

### Build Errors

**"Cannot find module"**

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Type errors**

```bash
# Run type checking
npm run check
```

### Blog Issues

**"Authentication required"**

- Ensure API is deployed and accessible
- Check `template.config.json` has correct API URL
- Verify you're logged in

**"Failed to load posts"**

- Check browser console for CORS errors
- Verify API worker is running
- Check D1 database has been migrated

### Styling Issues

**Tailwind classes not working**

- Ensure Tailwind CSS v4 is properly installed
- Check `@import "tailwindcss"` is in `src/app.css`
- Restart dev server

## Getting Help

- **Issues:** [GitHub Issues](../../issues)
- **Discussions:** [GitHub Discussions](../../discussions)
- **SvelteKit Docs:** https://kit.svelte.dev/
- **Tailwind CSS Docs:** https://tailwindcss.com/
- **Cloudflare Docs:** https://developers.cloudflare.com/

## Next Steps

1. ✅ Configure `template.config.json`
2. ✅ Customize styling and components
3. ✅ Add your projects and content
4. ✅ Test locally
5. ✅ Deploy to Cloudflare Pages
6. ✅ Set up custom domain
7. ✅ Add analytics
8. ✅ Share your portfolio!

---

Happy building! 🚀
