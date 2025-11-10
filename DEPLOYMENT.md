# Deployment Guide - Elite Plumbing Pro

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Development

Visit `http://localhost:5173` after running `npm run dev`

## Production Build

The production build is located in the `/dist` folder after running `npm run build`.

## Deployment Options

### Option 1: Netlify (Recommended)
1. Push code to GitHub
2. Connect repository to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Deploy!

### Option 2: Vercel
1. Push code to GitHub
2. Import repository in Vercel
3. Framework preset: Vite
4. Build command: `npm run build`
5. Output directory: `dist`
6. Deploy!

### Option 3: GitHub Pages
```bash
npm install -g gh-pages
npm run build
gh-pages -d dist
```

### Option 4: Any Static Host
Upload contents of `dist` folder to any static hosting service:
- AWS S3
- Cloudflare Pages
- Firebase Hosting
- Azure Static Web Apps

## Environment Variables

Create a `.env` file if you need environment-specific configuration:

```
VITE_API_URL=your_api_url
VITE_ANALYTICS_ID=your_analytics_id
```

## Customization Guide

### Update Company Information
Edit `/src/utils/constants.ts`:
- Company name
- Phone numbers
- Email addresses
- Physical address
- Business hours

### Change Colors
Edit `tailwind.config.js`:
- Primary colors (blues)
- Secondary colors (teals)
- Accent colors (oranges)

### Update Services
Edit the `SERVICES` array in `/src/utils/constants.ts`

### Update Team Members
Edit team data in `/src/pages/About.tsx`

### Update Projects
Edit project data in `/src/pages/Projects.tsx`

### Replace Images
- Hero images: Update image URLs in page components
- Logo: Update in `/src/components/Header.tsx` and `/src/components/Footer.tsx`
- Favicon: Replace `/public/favicon.svg`

## Performance Optimization

The website is already optimized with:
- Code splitting for each page
- Lazy loading for heavy components (3D scene)
- Image optimization recommendations
- CSS purging with Tailwind

For even better performance:
1. Use WebP images
2. Implement image CDN
3. Enable gzip/brotli compression on server
4. Use HTTP/2
5. Implement service worker for PWA capabilities

## SEO Optimization

Update `index.html` with your specific information:
- Title
- Meta description
- Open Graph tags
- Twitter Card tags
- Schema.org markup (add if needed)

## Analytics

Add your analytics tracking code to `index.html` or use environment variables.

Popular options:
- Google Analytics
- Plausible
- Fathom
- Mixpanel

## Contact Form Backend

The contact form currently logs to console. To enable real form submissions:

### Option 1: Formspree
```tsx
<form action="https://formspree.io/f/YOUR_ID" method="POST">
```

### Option 2: Netlify Forms
Add `data-netlify="true"` to form element

### Option 3: Custom API
Update form submission handler in `/src/pages/Contact.tsx` and `/src/pages/Booking.tsx`

## Browser Support

Tested and working on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### Build fails
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Port already in use
```bash
# Use different port
npm run dev -- --port 3000
```

### 3D scene not loading
- Check browser console for WebGL errors
- Ensure browser supports WebGL
- Try disabling browser extensions

## Support

For issues or questions:
- Check the README.md
- Review component comments
- Contact: info@eliteplumbing.com

## License

This is a portfolio/demo project. Use as inspiration for your own projects.

---

Built with ❤️ by JAFF Studio
