# Volta Spark Cleaning Services

A fast, mobile-first website for Volta Spark, a professional cleaning service based in Lagos, Nigeria.

**Live site:** [voltasparkcleaning.vercel.app](https://voltasparkcleaning.vercel.app/)

## Features

- Responsive homepage with service and company information
- Dedicated cleaning request page
- WhatsApp booking with a prepared customer message
- Direct links to Instagram, TikTok and Facebook
- Search-engine metadata, structured data, sitemap and robots configuration
- Branded favicon, social-sharing image and custom 404 page
- Accessible navigation with reduced-motion support

## Technology

- React and TypeScript
- Vinext and Vite
- CSS
- Vercel

## Local Development

Node.js 22.13 or newer is required.

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal.

## Quality Checks

```bash
npm run lint
npm test
```

`npm test` creates a production build and runs the rendered-page test suite.

## Project Structure

```text
app/          Pages, metadata and global styles
components/   Reusable interface components
lib/          Business details and service information
public/       Brand images and public SEO files
tests/        Rendered-page tests
```

## Deployment

Production is deployed on Vercel from the `main` branch.
