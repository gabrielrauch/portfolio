# Template Repository Setup Checklist

Use this checklist to enable and configure this repository as a GitHub template.

## 🔧 Enable Template Repository

- [ ] Go to repository **Settings**
- [ ] Scroll down to **Template repository** section
- [ ] Check ✅ **Template repository** checkbox
- [ ] Save changes

## 📝 Update Repository Settings

### General

- [ ] Update repository description: "A modern, customizable portfolio template built with SvelteKit 5 and Tailwind CSS v4"
- [ ] Add topics/tags:
  - `portfolio`
  - `template`
  - `sveltekit`
  - `tailwind-css`
  - `typescript`
  - `cloudflare-pages`
  - `portfolio-template`
  - `developer-portfolio`

### Features

- [ ] Enable **Issues**
- [ ] Enable **Discussions** (recommended for Q&A)
- [ ] Enable **Projects** (optional)
- [ ] Enable **Wiki** (optional)

### Pages (Optional)

If you want to showcase the template:

- [ ] Enable **GitHub Pages**
- [ ] Set source to **GitHub Actions**
- [ ] Deploy using Cloudflare Pages action or direct build

## 🎨 Add Template-Specific Files

Already completed in this PR:

- ✅ `template.config.json` - Configuration file
- ✅ `template.config.schema.json` - JSON schema
- ✅ `README.md` - Template documentation
- ✅ `TEMPLATE_SETUP.md` - Setup guide
- ✅ `QUICKSTART.md` - Quick start guide
- ✅ `CONTRIBUTING.md` - Contribution guidelines
- ✅ `LICENSE` - MIT License
- ✅ `.env.example` - Environment variables example
- ✅ Issue templates
- ✅ Pull request template

## 🔐 Security

- [ ] Review `.gitignore` to ensure sensitive files are excluded
- [ ] Verify `api/wrangler.toml` is in `.gitignore` ✅
- [ ] Add security policy (optional): Create `SECURITY.md`

## 📢 Promotion (Optional)

After enabling as template:

- [ ] Add a banner image to README (screenshot of the portfolio)
- [ ] Create a demo deployment link
- [ ] Tweet/share on social media
- [ ] Submit to template directories:
  - [Made with SvelteKit](https://madewithsvelte.com/)
  - [Awesome SvelteKit](https://github.com/janosh/awesome-svelte-kit)

## 🧪 Testing Recommendations

Before promoting:

- [ ] Test using the template yourself:
  - Click "Use this template"
  - Create test repository
  - Follow QUICKSTART.md
  - Verify everything works
- [ ] Check all links in documentation
- [ ] Verify builds succeed on fresh clone
- [ ] Test deployment to Cloudflare Pages

## 📊 Analytics (Optional)

Add to understand template usage:

- [ ] Enable GitHub Insights
- [ ] Monitor template uses (visible in Insights)
- [ ] Track stars and forks
- [ ] Review issues/discussions for common problems

## 🔄 Maintenance

Regular maintenance tasks:

- [ ] Update dependencies periodically
- [ ] Keep SvelteKit up to date
- [ ] Monitor for security vulnerabilities
- [ ] Address issues and pull requests
- [ ] Update documentation as needed

## 📖 Documentation Updates

Consider adding:

- [ ] Video tutorial (optional)
- [ ] Live demo site
- [ ] Showcase of sites using the template
- [ ] FAQ section in README
- [ ] Troubleshooting guide

## ✅ Final Verification

Before announcing:

- [x] All personal information removed
- [x] Default configuration has placeholder values
- [x] README clearly explains template usage
- [x] Build succeeds with default config
- [x] TypeScript types are correct
- [x] No broken links in documentation
- [x] Code is properly formatted
- [x] License is included

## 🎉 Launch

When ready to announce:

- [ ] Create a release (v1.0.0)
- [ ] Write release notes
- [ ] Announce on social media
- [ ] Add to your profile README
- [ ] Create discussion thread for feedback

---

## Need Help?

- Check existing [issues](../../issues)
- Start a [discussion](../../discussions)
- Read the documentation:
  - [README.md](./README.md)
  - [TEMPLATE_SETUP.md](./TEMPLATE_SETUP.md)
  - [QUICKSTART.md](./QUICKSTART.md)

Good luck with your template! 🚀
