# Quick Start Guide

Get your portfolio up and running in 5 minutes!

## Step 1: Use This Template

Click the **"Use this template"** button at the top of the GitHub repository page.

## Step 2: Clone Your Repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```

## Step 3: Install Dependencies

```bash
npm install
```

## Step 4: Configure Your Portfolio

Edit `template.config.json` with your information:

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
  }
}
```

## Step 5: Run Development Server

```bash
npm run dev
```

Open http://localhost:5173 to see your portfolio!

## Step 6: Customize (Optional)

- **Skills:** Edit `src/lib/components/TechStack.svelte`
- **Colors:** Edit theme colors in `src/app.css`
- **Contact Form:** Set up [Formspree](https://formspree.io/) in `src/lib/components/ContactForm.svelte`
- **Favicon:** Replace `static/favicon.png` with your own

## Step 7: Deploy

### Deploy to Cloudflare Pages

1. Push your changes to GitHub
2. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
3. Click "Create a project"
4. Connect your repository
5. Set build command: `npm run build`
6. Set build output: `.svelte-kit/cloudflare`
7. Click "Save and Deploy"

That's it! Your portfolio is live! 🎉

## Next Steps

- [Read the full setup guide](./TEMPLATE_SETUP.md)
- [Set up the blog feature](./TEMPLATE_SETUP.md#blog-setup-optional)
- [Configure a custom domain](./TEMPLATE_SETUP.md#custom-domain)
- [Add analytics](./TEMPLATE_SETUP.md#analytics)

## Need Help?

- Check [TEMPLATE_SETUP.md](./TEMPLATE_SETUP.md) for detailed instructions
- [Open an issue](../../issues) if you encounter problems
- [Start a discussion](../../discussions) for questions

---

Happy building! 🚀
