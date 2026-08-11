# Jis John Sajan — Portfolio

A premium, production-ready personal portfolio built with Next.js, TypeScript,
Tailwind CSS and Framer Motion. Dark-first design system, motion that respects
`prefers-reduced-motion`, a custom cursor, scroll-spy navigation, project case
studies, an accessible certificate lightbox, and full SEO wiring.

All personal content lives in `src/data/*` so the UI never hardcodes identity —
swap the data and images and the site is yours.

## Tech stack

- **Next.js 16** (App Router, Turbopack, React 19)
- **TypeScript** (strict)
- **Tailwind CSS 4** (CSS-first design tokens)
- **Framer Motion** for motion
- **next-themes** for dark/light theming (no flash)
- **lucide-react** for icons

## Getting started

```bash
npm install
cp .env.example .env.local   # then set NEXT_PUBLIC_SITE_URL
npm run dev                  # http://localhost:3000
```

## Scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the dev server (Turbopack)     |
| `npm run build` | Production build                     |
| `npm run start` | Serve the production build           |
| `npm run lint`  | Run ESLint                           |

## Where to edit your content

Everything personal is data-driven. Edit these files:

| File                          | Contains                                             |
| ----------------------------- | ---------------------------------------------------- |
| `src/data/profile.ts`         | Name, roles, bio, location, stats, currently building |
| `src/data/social.ts`          | GitHub, LinkedIn, Instagram, X, email                |
| `src/data/projects.ts`        | Projects + case-study fields (detail pages)          |
| `src/data/skills.ts`          | Skill groups + the marquee list                      |
| `src/data/education.ts`       | Education timeline                                    |
| `src/data/certifications.ts`  | Certifications (grid + lightbox)                     |
| `src/data/experience.ts`      | Experience timeline (placeholder — hidden until real) |
| `src/data/achievements.ts`    | Achievements (placeholder — hidden until real)       |
| `src/lib/site.ts`             | Nav links, site URL fallback                         |

> **Placeholders:** any value wrapped in `[SQUARE_BRACKETS]` is treated as an
> unfilled placeholder. Sections that contain only placeholders (Experience,
> Achievements) hide themselves automatically until you add real content.

## Where to add images and assets

Images are optional — a branded placeholder block renders anywhere a file is
missing, so the layout never breaks. Drop real files at these paths:

```
public/
  images/
    profile/jis-john-sajan.jpg        # hero profile photo
    projects/laser-audio.jpg          # project thumbnails (see projects.ts)
    projects/unifit.jpg
    projects/portfolio-v2.jpg
    projects/portfolio-website.jpg
    certificates/*.jpg                # certificate images (see certifications.ts)
  resume/Jis_John_Sajan_Resume.pdf    # enables the résumé download
  og.png                              # 1200×630 social share image
```

Filenames are referenced from the data files above — change either side to match.

## Theming

The entire palette is defined once as CSS variables in `src/app/globals.css`
(`--background`, `--foreground`, `--muted`, `--surface`, `--border`, `--accent`,
etc.) for both dark and light. Change the accent in one place to re-skin the
whole site. Dark is the default; the toggle in the navbar switches themes and
the choice is persisted.

## Accessibility & motion

- Semantic landmarks, skip-to-content link, keyboard-navigable UI, visible focus.
- The certificate lightbox supports `Esc` to close and arrow keys to navigate.
- All animation is disabled or minimised under `prefers-reduced-motion`.
- The custom cursor is disabled on touch devices and for reduced motion.

## Deployment

Deploys as a standard Next.js app on **Vercel**, **Netlify**, **Cloudflare
Pages** or any Node host.

1. Push to a Git repository.
2. Import the project on your platform.
3. Set `NEXT_PUBLIC_SITE_URL` to your production URL.
4. Deploy.

## License

© {year} Jis John Sajan
