# Nystrom Plumbing Website

A professional, modern website for Nystrom Plumbing - a plumbing business serving Charlotte, NC. Built with Next.js 14, featuring a clean blue/white design and mobile-first responsive layout.

## Features

- **Home Page**: Hero section, services overview, customer testimonials, and call-to-action
- **About Page**: Company story, team profiles, and core values
- **Services Page**: Detailed descriptions of all plumbing services offered
- **Contact Page**: Contact form with validation, interactive map, business hours, and contact information
- **Responsive Design**: Mobile-first approach, works perfectly on all devices
- **Modern Stack**: Built with Next.js 14 App Router and Tailwind CSS

## Tech Stack

- **Next.js 14** - React framework with App Router
- **Tailwind CSS** - Utility-first CSS framework
- **React Hook Form** - Form validation and handling
- **Resend** - Email delivery for contact forms
- **Leaflet** - Interactive maps
- **TypeScript** - Type-safe code

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository and navigate to the project directory:
```bash
cd nystrom-plumbing
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory and add your Resend API key:
```
RESEND_API_KEY=your_resend_api_key_here
```

Get your free Resend API key at [https://resend.com/api-keys](https://resend.com/api-keys)

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
nystrom-plumbing/
├── app/
│   ├── about/          # About page
│   ├── api/contact/    # Contact form API endpoint
│   ├── contact/        # Contact page
│   ├── services/       # Services page
│   ├── layout.tsx      # Root layout with navigation and footer
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── components/
│   ├── Navigation.tsx  # Header navigation
│   ├── Footer.tsx      # Footer component
│   └── Map.tsx         # Interactive map component
└── public/             # Static assets
```

## Customization

### Update Contact Information

Edit the contact details in:
- `components/Footer.tsx` - Footer contact info
- `app/contact/page.tsx` - Contact page info
- `app/api/contact/route.ts` - Email recipient

### Update Business Information

- Company story: `app/about/page.tsx`
- Services: `app/services/page.tsx` and `app/page.tsx`
- Team members: `app/about/page.tsx`

### Change Colors

Update the color scheme in `app/globals.css`:
```css
:root {
  --primary: #1e40af;      /* Main blue */
  --primary-dark: #1e3a8a; /* Dark blue */
  --secondary: #3b82f6;    /* Secondary blue */
}
```

### Update Map Location

Edit the coordinates in `components/Map.tsx`:
```typescript
const charlotteCoords: [number, number] = [35.2271, -80.8431];
```

## Deployment

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository on Vercel
3. Add your `RESEND_API_KEY` environment variable
4. Deploy!

Alternatively, you can deploy to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Digital Ocean

## License

This project is created for Nystrom Plumbing.
