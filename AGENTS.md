# POSTO Tech Website

## Project Overview

POSTO Tech Website is a static multi-page corporate website for POSTO Tech, a company that designs and deploys premium interactive collaboration systems for enterprises and educational institutions. The website showcases their product ecosystem, room solutions (organized in a five-tier architecture), company information, and contact details.

The website uses a modern, clean design with a blue/slate color palette, featuring smooth animations, a responsive layout, and a consistent visual language across all pages.

## Technology Stack

- **HTML5**: Semantic markup with no server-side processing
- **Tailwind CSS**: Utility-first CSS framework loaded via CDN (`https://cdn.tailwindcss.com`)
- **Custom CSS**: Additional styles in `assets/site.css`
- **Vanilla JavaScript**: Native browser APIs for interactions (sliders, scroll animations)
- **Google Fonts**: Manrope font family (weights 400-800)
- **External Images**: Unsplash for hero images, local assets for solution diagrams

## Project Structure

```
/Users/posto/Documents/POSTO Website/
├── index.html          # Homepage with hero slider and feature sections
├── about.html          # Company mission, vision, and work philosophy
├── products.html       # Product categories and hardware ecosystem
├── solutions.html      # Five-tier room solution architecture
├── contact.html        # Contact information and inquiry guidelines
├── assets/
│   ├── site.css        # Custom CSS styles and design tokens
│   └── solutions/      # Solution diagram images (PNG)
│       ├── tier-1-office-collaboration.png
│       ├── tier-2-3-boardrooms.png
│       ├── tier-4-training-room.png
│       └── tier-5-flagship-classroom.png
└── AGENTS.md           # This file
```

## Page Architecture

### index.html (Home)
- Fixed navigation bar with backdrop blur
- Hero image slider (3 slides) with auto-rotation (5.5s interval)
- Feature cards linking to main sections
- "Why POSTO" section with animated reveals
- Deployment lifecycle section
- Footer with contact info

### about.html
- Hero panel with company overview
- Mission and Vision cards
- "How We Work" section with three principles

### products.html
- Hero panel with product ecosystem overview
- 6 product category cards (Displays, Education, Vision, Sharing, Control, Support)

### solutions.html
- Hero panel with architecture overview
- Five-tier system summary (T1-T5)
- Detailed sections for each tier:
  - T1: Office collaboration
  - T2/T3: Meeting rooms and boardrooms
  - T4: Training rooms
  - T5: Flagship classrooms

### contact.html
- Hero panel with CTA
- Direct contact information (Jalil Raza)
- "What To Share" guidance for inquiries

## Design System

### Color Palette
- **Primary Blue**: `#2563eb` (blue-600)
- **Slate Dark**: `#0f172a` (slate-900/slate-950)
- **Slate Text**: `#475569` (slate-600)
- **Background**: Gradient from `#f8fbff` to `#eef5ff`
- **White Panels**: `rgba(255, 255, 255, 0.82)` with backdrop blur

### Typography
- **Font Family**: Manrope, sans-serif
- **Weights**: 400 (regular), 500, 600 (semibold), 700 (bold), 800 (extrabold)
- **Eyebrow Text**: 12px, uppercase, tracking-[0.28em]
- **Headings**: Extrabold with tight tracking

### Common CSS Classes (from site.css)
- `.hero-panel`: Dark gradient background for hero sections
- `.section-panel`: Light frosted glass panels
- `.dark-panel`: Dark gradient panels
- `.soft-shadow`: Subtle elevation shadow
- `.halo-shadow`: Blue-tinted shadow for emphasis
- `.reveal-ready` / `.reveal-in`: Scroll-triggered fade-in animation
- `.eyebrow`: Styled label text with letter-spacing
- `.nav-link`: Navigation link styles with hover/active states

### Border Radius Scale
- Large containers: `rounded-[2.5rem]` (40px)
- Medium cards: `rounded-[2rem]` (32px)
- Small cards: `rounded-[1.5rem]` (24px)

## JavaScript Patterns

### Scroll Reveal Animation
```javascript
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-in');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });
```
Applied to elements with `[data-reveal]` attribute.

### Hero Slider (index.html only)
- Auto-advances every 5500ms
- Manual controls: prev/next buttons and dot indicators
- Pauses on hover
- Uses CSS opacity transitions (700ms ease)

## Development Workflow

### No Build Process
This is a static website with no build tooling. Files can be edited directly and opened in a browser.

### Local Development
Open any HTML file directly in a web browser:
```bash
open index.html
```

Or serve with a simple HTTP server:
```bash
# Python 3
python3 -m http.server 8000

# Node.js (if http-server is installed)
npx http-server

# PHP
php -S localhost:8000
```

### Making Changes

1. **HTML Structure**: Edit the `.html` files directly
2. **Styling**: 
   - Utility classes: Use Tailwind classes inline
   - Custom styles: Add to `assets/site.css`
3. **Images**: 
   - Solution diagrams: Place in `assets/solutions/`
   - Hero images: Currently loaded from Unsplash URLs
4. **JavaScript**: 
   - Page-specific scripts are inline at the bottom of each HTML file
   - Common patterns should be copied between pages

### Navigation Updates
When adding new pages, update the navigation in all HTML files. The navigation is identical across all pages except for the `.active` class on the current page's link.

## Content Guidelines

### Contact Information
The contact details are centralized in `contact.html` and the footer of `index.html`:
- Contact Person: Jalil Raza
- Phone: +92-33 99887766
- Email: contact@postolabs.com
- Website: https://www.postolabs.com

### Tier System
The five-tier solution architecture is a core concept:
- **T1**: Office - Daily collaboration
- **T2**: Meeting - Committee rooms
- **T3**: Boardroom - Executive spaces
- **T4**: Training - Flexible learning rooms
- **T5**: Flagship - Immersive classrooms

## Browser Support

The website uses modern CSS features:
- CSS Grid and Flexbox
- Backdrop filters (glassmorphism)
- CSS Custom Properties (via Tailwind)
- Intersection Observer API

Supported in all modern browsers (Chrome, Firefox, Safari, Edge). Internet Explorer is not supported.

## Deployment

This is a static site that can be deployed to any web hosting service:
- GitHub Pages
- Netlify
- Vercel
- AWS S3 + CloudFront
- Traditional web hosting (Apache/Nginx)

No server-side configuration is required. Simply upload all files maintaining the directory structure.

## Image Assets

### Local Images (in repository)
- `assets/solutions/tier-1-office-collaboration.png`
- `assets/solutions/tier-2-3-boardrooms.png`
- `assets/solutions/tier-4-training-room.png`
- `assets/solutions/tier-5-flagship-classroom.png`

### External Images
Hero slider images are loaded from Unsplash URLs with specific photo IDs. These require an internet connection to display.

## Testing

Since this is a static website with no complex logic, manual testing is sufficient:

1. Open each page in a browser
2. Verify navigation links work between pages
3. Test responsive layout at different viewport sizes
4. Verify the hero slider auto-advances on the homepage
5. Check that scroll reveal animations trigger correctly
6. Ensure contact links (email, phone) work correctly

## Security Considerations

- No user input handling (no forms)
- No authentication or session management
- No server-side processing
- External resources loaded from trusted CDNs (Tailwind, Google Fonts)
- Images from Unsplash loaded with proper attribution notice
