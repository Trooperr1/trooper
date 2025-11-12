# JAFF EXPRESS - China to Iraq Shipping Services

A modern, professional multi-language website for JAFF EXPRESS shipping company with full RTL support for Kurdish Sorani and Arabic.

## Features

- **Multi-language Support**: Kurdish Sorani (default), Arabic, and English
- **RTL/LTR Support**: Automatic layout switching for right-to-left and left-to-right languages
- **Responsive Design**: Fully mobile-optimized for all devices
- **Modern UI**: Clean, professional design with brand colors (Navy Blue, Orange, White)
- **Complete Pages**:
  - Home (Hero, Services, Why Choose Us, Testimonials, CTA)
  - Services (Detailed service offerings)
  - Tracking (Shipment tracking interface)
  - Pricing/Quote (Request quote form)
  - About Us (Company story and advantages)
  - Contact (Contact forms, maps, WhatsApp integration)

## Tech Stack

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with RTL plugin
- **Internationalization**: next-i18next (i18next, react-i18next)
- **Fonts**: Cairo for Arabic/Kurdish, system fonts for English

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view in your browser.

### Build

```bash
npm run build
npm start
```

## Language Configuration

The website supports three languages:

- **Kurdish Sorani (ku)**: Default language, RTL
- **Arabic (ar)**: RTL
- **English (en)**: LTR

Users can switch languages using the language selector in the header.

## Brand Colors

- **Navy Blue**: #1a2845 (Primary)
- **Orange**: #f58220 (Accent/CTA)
- **White**: #ffffff

## Contact Information

Update the following in the code:

- WhatsApp number: `components/WhatsAppButton.tsx` and contact pages
- Phone numbers: Contact page and footer
- Email addresses: Contact page and footer
- Office addresses: Contact and About pages

## Deployment

This is a Next.js application that can be deployed to:

- Vercel (recommended)
- Netlify
- Any Node.js hosting platform

## License

Copyright © 2025 JAFF EXPRESS. All rights reserved.
