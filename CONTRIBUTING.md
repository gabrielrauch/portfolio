# Contributing to Portfolio Template

Thank you for your interest in contributing to this portfolio template! This document provides guidelines for contributing.

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:

- Clear description of the bug
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Your environment (OS, Node version, browser)

### Suggesting Enhancements

We welcome feature suggestions! Please create an issue with:

- Clear description of the enhancement
- Use case and benefits
- Possible implementation approach (optional)

### Pull Requests

1. **Fork the repository**
2. **Create a feature branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the existing code style
   - Add comments for complex logic
   - Update documentation if needed

4. **Test your changes**

   ```bash
   npm run check  # Type checking
   npm run lint   # Linting
   npm run build  # Ensure it builds
   ```

5. **Commit your changes**
   - Use clear, descriptive commit messages
   - Follow conventional commits format:
     ```
     feat: add new feature
     fix: fix bug in component
     docs: update documentation
     style: format code
     refactor: refactor component
     test: add tests
     chore: update dependencies
     ```

6. **Push to your fork**

   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**
   - Describe what you changed and why
   - Reference any related issues
   - Include screenshots for UI changes

## Development Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/gabrielrauch/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

## Code Style

### JavaScript/TypeScript

- Use TypeScript for type safety
- Follow ESLint rules
- Use meaningful variable names
- Add JSDoc comments for public functions

### Svelte Components

- One component per file
- Use `<script lang="ts">` for TypeScript
- Keep components focused and reusable
- Use proper prop types

### Styling

- Use Tailwind CSS classes
- Use custom CSS properties for theme values
- Keep component styles scoped
- Follow responsive design principles

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**

```
feat(blog): add search functionality
fix(navigation): resolve mobile menu issue
docs(readme): update installation instructions
style(components): format with prettier
```

## Project Structure

```
portfolio/
├── src/
│   ├── lib/
│   │   ├── components/   # Reusable components
│   │   ├── api/         # API client code
│   │   ├── stores/      # Svelte stores
│   │   ├── utils/       # Utility functions
│   │   └── config.ts    # Configuration loader
│   ├── routes/          # SvelteKit routes
│   └── app.css         # Global styles
├── api/                # Cloudflare Workers API
├── database/           # Database migrations
└── static/            # Static assets
```

## Guidelines

### For New Features

- Ensure backward compatibility
- Update documentation
- Add examples if applicable
- Consider performance impact
- Test on multiple screen sizes

### For Bug Fixes

- Include a test that reproduces the bug
- Explain the root cause
- Verify the fix doesn't break other features

### For Documentation

- Use clear, concise language
- Include code examples
- Add screenshots for visual features
- Keep it up to date with code changes

### For Dependencies

- Only add necessary dependencies
- Prefer well-maintained packages
- Check bundle size impact
- Update package-lock.json

## Testing

Before submitting a PR:

```bash
# Type checking
npm run check

# Linting
npm run lint

# Build
npm run build

# Manual testing
npm run preview
```

Test on:

- Different browsers (Chrome, Firefox, Safari)
- Different screen sizes (mobile, tablet, desktop)
- Light and dark themes

## Community

- Be respectful and constructive
- Help others when you can
- Share your knowledge
- Celebrate successes

## Questions?

If you have questions:

- Check [TEMPLATE_SETUP.md](./TEMPLATE_SETUP.md)
- Search existing issues
- Create a discussion
- Ask in issues (for project-specific questions)

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT License).

---

Thank you for contributing! 🙏
