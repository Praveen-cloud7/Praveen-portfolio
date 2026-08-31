# Praveen Babu - Finance Portfolio

A responsive finance portfolio built with React, Vinext, Vite and TypeScript. It includes a motion-led hero, animated navigation, scroll reveals, an interactive research visual, experience, capabilities, education, certifications and contact links.

## Requirements

- Node.js 22.13 or newer
- npm

## Run locally

```bash
npm install
npm run dev
```

Open the local address shown in the terminal, normally `http://localhost:5173`.

## Production build

```bash
npm run build
npm run start
```

## Upload to GitHub

1. Extract the ZIP.
2. Create a new empty GitHub repository.
3. Upload every file and folder from the extracted project.
4. Commit the files to the `main` branch.

The included GitHub Actions workflow automatically installs dependencies and checks the production build after every push.

## Main files

- `app/page.tsx` - portfolio content and interactions
- `app/globals.css` - layout, responsive styling and animations
- `app/layout.tsx` - page metadata and font setup
- `public/finance-market-ribbons.png` - featured research artwork

## Notes

- GitHub stores and validates the source code; a hosting service is still required for a public website.
- Contact information and portfolio content can be edited in `app/page.tsx`.
- The design supports desktop, tablet, mobile and reduced-motion preferences.
