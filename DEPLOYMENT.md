# MedCalc Deployment Guide

MedCalc is built with TanStack Start and Nitro, which provides server-side rendering (SSR). This requires deployment to a platform that supports Node.js runtime.

## Deployment Platforms

### Recommended: Vercel (Best for TanStack Start)

**Why Vercel:**
- Native support for TanStack Start and Nitro SSR
- Automatic deployment from GitHub
- Free tier with generous limits
- HTTPS included
- Zero-config deployment

**Steps:**

1. **Create Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub

2. **Import Project**
   - Click "Add New..." → "Project"
   - Select the medcalc repository
   - Click "Import"

3. **Deploy**
   - Vercel automatically detects TanStack Start
   - Environment variable `NITRO_PRESET=vercel` is set automatically
   - Click "Deploy"
   - Your app is live in ~1 minute

4. **Custom Domain (Optional)**
   - Go to Project Settings → Domains
   - Add custom domain
   - Update DNS as instructed
   - HTTPS is automatic

5. **Verify Deployment**
   - Visit your Vercel URL
   - Test all calculator functions
   - Check browser console (F12) for errors
   - Test on mobile device

### Alternative: Netlify (With Configuration)

**Note:** Netlify's serverless functions require configuration. Use Vercel if possible.

**Steps:**

1. Create account at [netlify.com](https://netlify.com)

2. Connect GitHub repository:
   - Click "Add new site" → "Import an existing project" → "GitHub"
   - Select medcalc repository

3. Configure Build:
   - Build command: `pnpm build`
   - Publish directory: `.output/public`
   - Environment: `NITRO_PRESET=netlify`

4. Deploy

5. Verify (same as Vercel)

### Alternative: Self-Hosted (Advanced)

If you have a Node.js server:

```bash
pnpm build
node .output/server/index.mjs
```

The server runs on port 3000 by default.

## Deployment Checklist

Before deploying, ensure:

- [ ] Code committed and pushed to GitHub
- [ ] Local build succeeds: `pnpm build`
- [ ] Tests pass: `pnpm test`
- [ ] No console errors in development
- [ ] All routes tested locally

After deploying:

- [ ] Site loads without errors
- [ ] Can navigate to all pages (/, /transplant, /chemo, /links)
- [ ] Calculators work correctly with sample dates
- [ ] No red errors in browser console
- [ ] HTTPS enforced (green lock icon)
- [ ] Mobile layout is responsive

## Troubleshooting

### Site shows blank page

**Cause:** Server-side rendering error
**Fix:**
- Check Vercel/Netlify deployment logs
- Look for error messages in build output
- Verify `NITRO_PRESET` environment variable is set

### Routes return 404

**Cause:** Routing misconfiguration
**Fix:**
- Ensure you're on the deployed URL (not localhost)
- Check that TanStack Router is configured correctly
- Verify all route files exist in `src/routes/`

### Calculations not working

**Cause:** JavaScript error or date-fns issue
**Fix:**
- Open DevTools console (F12)
- Look for red error messages
- Check browser console for specific errors
- Verify date input format is correct

### Performance issues

**Cause:** Slow bundle load
**Fix:**
- Check bundle size: should be ~200KB gzipped for main JS
- Verify CSS is under 30KB
- Check network waterfall in DevTools
- Consider code splitting if needed

## Rollback (Undo Deployment)

### Vercel
1. Go to Deployments tab
2. Click on previous successful deployment
3. Click "Promote to Production"

### Netlify
1. Go to Deploys tab
2. Find last working deployment
3. Click "Publish deploy"

## Production Best Practices

### Monitoring (Optional)

Add error tracking for production issues:

```javascript
// In src/entry-client.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: "production",
});
```

### Analytics (Optional)

Track user interactions:

```javascript
// Add your analytics service of choice
// Example: Google Analytics, Vercel Analytics, etc.
```

### Environment Variables

For sensitive values (API keys, etc), use platform's secret management:

**Vercel:** Settings → Environment Variables
**Netlify:** Site settings → Build & deploy → Environment

## Architecture Notes

- **Framework:** TanStack Start (React 19 + TypeScript)
- **Styling:** Tailwind CSS
- **Routing:** TanStack Router
- **Date Handling:** date-fns
- **SSR:** Nitro server-side rendering
- **Build Tool:** Vite with optimized bundling

The SSR architecture ensures:
- Fast initial page load (HTML generated on server)
- SEO-friendly content
- Reduced client-side JavaScript
- Better performance on slow networks

## Next Steps

1. Choose deployment platform (Vercel recommended)
2. Follow platform-specific setup
3. Deploy your branch
4. Test all features on live site
5. Share URL with stakeholders

## Questions?

Refer to:
- [TanStack Start Docs](https://tanstack.com/start/latest)
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)
- [Nitro Docs](https://nitro.unjs.io)
