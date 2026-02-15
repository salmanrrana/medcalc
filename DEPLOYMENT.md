# MedCalc Deployment Guide

This guide covers deploying MedCalc to production using Netlify, Surge.sh, or GitHub Pages.

## Quick Start - Netlify (Recommended)

### Prerequisites
- GitHub account
- Netlify account (free tier available)
- Project pushed to GitHub

### Deployment Steps

1. **Create Netlify Account**
   - Go to [netlify.com](https://netlify.com)
   - Sign up or log in with GitHub

2. **Connect Repository**
   - Click "New site from Git"
   - Select GitHub and authorize Netlify
   - Choose the medcalc repository
   - Click "Import an existing project"

3. **Configure Build Settings**
   - Build command: `pnpm build`
   - Publish directory: `.output/public`
   - Node version: `20` (set in netlify.toml)

4. **Deploy**
   - Click "Deploy site"
   - Netlify will automatically build and deploy on every push to main branch

5. **Verify Deployment**
   - Visit the auto-generated Netlify URL
   - Test all calculator pages
   - Verify links page works
   - Check browser console for errors

6. **Custom Domain (Optional)**
   - Go to Site settings → Domain management
   - Add custom domain
   - Update DNS records as instructed by Netlify
   - HTTPS is automatically enabled with Netlify's free SSL

## Alternative: Surge.sh

### Prerequisites
- Node.js installed
- Surge account (free at surge.sh)

### Deployment Steps

1. **Install Surge CLI**
   ```bash
   npm install -g surge
   ```

2. **Build the Project**
   ```bash
   pnpm build
   ```

3. **Deploy**
   ```bash
   surge .output/public
   ```

4. **Follow Prompts**
   - Enter email (for Surge account)
   - Set domain (e.g., medcalc-app.surge.sh)
   - Confirm deployment

5. **Verify Deployment**
   - Visit your surge.sh domain
   - Test all features

## Alternative: GitHub Pages

### Prerequisites
- GitHub repository
- GitHub account

### Deployment Steps

1. **Add GitHub Actions Workflow**
   Create `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [ main ]

   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: pnpm/action-setup@v2
         - uses: actions/setup-node@v3
           with:
             node-version: '20'
             cache: 'pnpm'
         - run: pnpm install
         - run: pnpm build
         - uses: actions/upload-artifact@v3
           with:
             name: build
             path: .output/public
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: .output/public
   ```

2. **Configure Repository Settings**
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` / `/(root)`

3. **Push to Main**
   - Commit and push the workflow file
   - GitHub Actions will automatically build and deploy

4. **Access Your Site**
   - GitHub Pages URL: `https://username.github.io/medcalc`

## Acceptance Criteria Checklist

- [x] Production build successful (`pnpm build` passes)
- [ ] App deployed and accessible via URL
- [ ] All features work on live deployment (test manually):
  - [ ] Home page loads
  - [ ] Transplant calculator works
  - [ ] Chemo calculator works
  - [ ] Links page displays
  - [ ] Navigation works between pages
  - [ ] Date calculations are accurate
  - [ ] Mobile layout is responsive
- [ ] HTTPS enforced (automatic with Netlify)
- [ ] No console errors in browser (check DevTools)
- [ ] All routes work correctly (home, transplant, chemo, links)

## Troubleshooting

### Build Fails
- Check Node version: `node --version` (should be 18+)
- Check pnpm version: `pnpm --version`
- Clear cache: `rm -rf node_modules pnpm-lock.yaml && pnpm install`

### Routes Not Working
- Ensure netlify.toml redirects rule is present
- GitHub Pages needs asset paths configured (use relative paths)

### Performance Issues
- Check bundle size in `.output/public/assets`
- Main bundle should be under 200KB gzipped
- CSS should be under 30KB gzipped

### Mobile Issues
- Test on actual devices via deployment URL
- Check viewport meta tag in HTML
- Verify touch targets are 44x44px minimum

## Monitoring Deployed Site

1. **Netlify Dashboard**
   - Monitor deploy logs
   - Check deploy previews
   - View analytics (Pro plan)

2. **Browser Testing**
   - Test all pages
   - Check network tab for slow requests
   - Verify no console errors

3. **Lighthouse Audit**
   - Run Lighthouse on deployed URL
   - Target: Performance > 80, Accessibility > 95

## Rollback

### Netlify
- Go to Deploys tab
- Click on previous deploy
- Click "Publish deploy"

### Surge
- Deploy previous build again
- Use same domain name

### GitHub Pages
- Revert commit and push
- GitHub Actions will auto-redeploy

## Next Steps

1. Choose preferred deployment platform
2. Follow platform-specific setup steps
3. Test all features on live deployment
4. Monitor for errors and performance
5. Share deployment URL with stakeholders
