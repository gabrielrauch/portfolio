# Portfolio Template

A modern, customizable portfolio website template built with **SvelteKit 5**, **Tailwind CSS v4**, and **TypeScript**. Features a terminal-inspired design aesthetic, dark/light theme support, and an optional blog system powered by Cloudflare Workers.

![SvelteKit](https://img.shields.io/badge/SvelteKit-5.0-FF3E00?logo=svelte)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?logo=tailwind-css)
![Cloudflare Pages](https://img.shields.io/badge/Cloudflare-Pages-F38020?logo=cloudflare)

## ✨ Features

- 🎨 **Modern Design**: Terminal/command-line aesthetic with smooth animations
- 🌗 **Theme System**: Light, dark, and system preference modes
- 📱 **Fully Responsive**: Optimized for all screen sizes
- ⚡ **High Performance**: Static generation with Cloudflare Pages
- 🎭 **Easy Customization**: Single configuration file for all personal info
- 📝 **Optional Blog**: Full-featured blog system with admin dashboard
- 🔒 **Secure**: JWT authentication for admin features
- 🚀 **Deploy Ready**: Configured for Cloudflare Pages deployment

## 🚀 Quick Start

> **New to this template?** Check out [QUICKSTART.md](./QUICKSTART.md) for a 5-minute setup guide!

### Using this Template

1. **Use this template** (click the "Use this template" button on GitHub)
2. **Clone your new repository**:

   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   cd YOUR_REPO_NAME
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Customize your portfolio**:
   - Edit `template.config.json` with your personal information
   - See [TEMPLATE_SETUP.md](./TEMPLATE_SETUP.md) for detailed configuration guide

5. **Run the development server**:

   ```bash
   npm run dev
   ```

6. **Build for production**:
   ```bash
   npm run build
   ```

## ⚙️ Configuration

All personal information is centralized in `template.config.json`. Simply update this file with your details:

```json
{
  "personal": {
    "name": "Your Name",
    "title": "Your Title",
    "description": "Your description...",
    "email": "your.email@example.com",
    "location": "Your City, Country",
    "availability": "Available for work",
    "branding": "yourname.sh"
  },
  "professional": {
    "yearsOfExperience": 5,
    "bio": "Your professional bio...",
    "personalBio": "Your personal statement...",
    "focus": "Your tech stack",
    "interests": "Your interests"
  },
  "social": {
    "github": "yourusername",
    "linkedin": "yourusername",
    "discord": null,
    "whatsapp": null,
    "resumeUrl": "https://example.com/your-resume.pdf"
  },
  "api": {
    "baseUrl": "https://your-api.workers.dev"
  }
}
```

For more details, see [TEMPLATE_SETUP.md](./TEMPLATE_SETUP.md).

## 📂 Project Structure

```
portfolio/
├── src/
│   ├── lib/
│   │   ├── components/     # Reusable components
│   │   ├── api/           # API client functions
│   │   ├── stores/        # Svelte stores (theme, etc.)
│   │   ├── utils/         # Utility functions
│   │   └── config.ts      # Configuration loader
│   ├── routes/            # SvelteKit routes
│   └── app.css           # Global styles
├── api/                   # Cloudflare Workers API (optional)
│   └── src/              # API source code
├── database/             # Database migrations (optional)
├── static/               # Static assets
└── template.config.json  # Your configuration
```

## 🎨 Customization

### Theme

The site supports three theme modes: light, dark, and system. Customize colors in `src/app.css` using CSS custom properties.

### Components

All major sections are componentized for easy customization:

- `HeroSection.svelte` - Hero/landing section
- `TechStack.svelte` - Skills/technologies showcase
- `AboutSection.svelte` - About me section
- `ContactSection.svelte` - Contact information and form
- `Navigation.svelte` - Top navigation bar

### Adding Sections

Add new sections in `src/routes/+page.svelte` and create corresponding components in `src/lib/components/`.

## 📝 Blog System (Optional)

The template includes an optional blog system powered by Cloudflare Workers and D1 database. To enable:

1. Set up Cloudflare Workers and D1 database
2. Configure `api/wrangler.toml` (see `api/wrangler.toml.example`)
3. Deploy the API worker
4. Update `template.config.json` with your API URL

See [TEMPLATE_SETUP.md](./TEMPLATE_SETUP.md) for detailed instructions.

## 🚀 Deployment

### Cloudflare Pages (Recommended)

1. Connect your repository to Cloudflare Pages
2. Build settings:
   - Build command: `npm run build`
   - Build output directory: `.svelte-kit/cloudflare`
3. Deploy!

### Other Platforms

The template uses `@sveltejs/adapter-cloudflare` by default. To deploy to other platforms:

1. Install appropriate adapter (see [SvelteKit adapters](https://kit.svelte.dev/docs/adapters))
2. Update `svelte.config.js`
3. Follow platform-specific deployment instructions

## 🛠️ Development

```bash
# Start development server
npm run dev

# Type checking
npm run check

# Linting
npm run lint

# Format code
npm run format

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📄 License

This template is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

Built with:

- [SvelteKit](https://kit.svelte.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [Tabler Icons](https://tabler-icons.io/)
- [Cloudflare Pages](https://pages.cloudflare.com/)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](../../issues).

---

Made with ❤️ using SvelteKit. If you find this template useful, please give it a ⭐!
