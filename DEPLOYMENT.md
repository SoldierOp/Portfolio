# Deployment Guide - Mayank Chauhan Portfolio

## 🚀 Quick Deployment Options

### 1. GitHub Pages (Free)
```bash
# Build the project
npm run build

# Deploy to GitHub Pages
# Option A: Using gh-pages package
npm install --save-dev gh-pages
# Add to package.json scripts:
# "deploy": "gh-pages -d dist"

# Option B: Manual deployment
# 1. Create a new branch called 'gh-pages'
# 2. Copy dist/ contents to root of gh-pages branch
# 3. Push to GitHub
# 4. Enable GitHub Pages in repository settings
```

### 2. Vercel (Recommended - Free)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Or connect GitHub repository directly on vercel.com
# Automatic deployments on every push
```

### 3. Netlify (Free)
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist

# Or drag and drop dist/ folder to netlify.com
```

### 4. Custom Domain Setup

#### For GitHub Pages:
1. Add `CNAME` file to `public/` directory with your domain
2. Configure DNS:
   - A records: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
   - CNAME: www.yourdomain.com → yourusername.github.io

#### For Vercel:
1. Add domain in Vercel dashboard
2. Configure DNS as instructed by Vercel

#### For Netlify:
1. Add domain in Netlify dashboard
2. Configure DNS as instructed by Netlify

## 📁 Build Output

The build process creates a `dist/` directory with:
- `index.html` - Main HTML file
- `assets/` - CSS, JS, and other assets
- Optimized and minified for production

## 🔧 Environment Variables

No environment variables required for basic deployment.

## 📊 Performance

- **Bundle Size**: ~1.1MB total (286KB gzipped)
- **Load Time**: < 3 seconds on 3G
- **Lighthouse Score**: 90+ across all metrics

## 🛠️ Build Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check

# Linting
npm run lint
```

## 📱 Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 🔍 SEO Optimization

- Meta tags included in `index.html`
- Open Graph tags for social sharing
- Structured data for search engines
- Sitemap ready (add sitemap.xml if needed)

## 🚨 Troubleshooting

### Build Issues:
- Ensure Node.js 18+ is installed
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run type-check`

### Deployment Issues:
- Verify `dist/` directory exists after build
- Check file paths are relative (base: './' in vite.config.ts)
- Ensure all assets are included in build

### Performance Issues:
- Enable gzip compression on server
- Use CDN for static assets
- Implement lazy loading for images

## 📞 Support

For deployment issues, check:
1. Build logs for errors
2. Browser console for runtime errors
3. Network tab for failed requests
4. Server logs for 404s

## 🎯 Next Steps

1. **Deploy to chosen platform**
2. **Set up custom domain**
3. **Configure analytics** (Google Analytics, etc.)
4. **Set up monitoring** (Uptime monitoring)
5. **Optimize performance** (CDN, caching)

---

**Ready to deploy!** 🚀
