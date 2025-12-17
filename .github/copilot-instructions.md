# Service Desk Knowledge Base - AI Coding Instructions

## Project Overview

This is a **hybrid static/React knowledge base system** for service desk documentation. The project maintains two parallel implementations:

- **Static HTML version** ([index.html](../index.html), [script.js](../script.js), [styles.css](../styles.css)) - Production deployment at `/kb/` base path
- **React version** ([src/App.jsx](../src/App.jsx), [src/index.css](../src/index.css)) - Development environment using Vite

**Critical**: Changes to functionality or styling must be synchronized between both versions. The React version serves as a development sandbox while the static version is the deployed artifact.

## Architecture & Data Flow

### Dual Implementation Pattern
The codebase intentionally maintains parallel implementations for flexibility:

1. **Static HTML** (`index.html` + `script.js`):
   - Uses vanilla JavaScript with DOM manipulation
   - Article cards defined inline in HTML with `data-category` attributes
   - Event listeners for search/filter attached to DOM elements
   - Deployed with Vite build output (note: `base: '/kb/'` in [vite.config.js](../vite.config.js))

2. **React SPA** (`src/App.jsx`):
   - Article data in JavaScript array (lines 4-51 in [App.jsx](../src/App.jsx#L4-L51))
   - Component-based with functional components and hooks
   - Uses `useMemo` for filtered article performance
   - State management via `useState` for search/category filters

### Category System
Five predefined categories with consistent naming across both versions:
- `hardware` (yellow) - Hardware Issues
- `software` (blue) - Software & Applications  
- `network` (green) - Network & Connectivity
- `account` (pink) - Account Access
- `troubleshooting` (indigo) - General Troubleshooting

Category colors defined in CSS custom properties (`:root` in both [styles.css](../styles.css#L1-L12) and [src/index.css](../src/index.css#L1-L12)).

### Article Management
Articles exist in two locations:
1. **Metadata** - In `index.html` (static) or `articles` array in [App.jsx](../src/App.jsx#L4) (React)
2. **Full content** - Individual HTML files in `articles/` directory

To add a new article:
1. Create article HTML from [articles/article-template.html](../articles/article-template.html)
2. Add article card/object to BOTH `index.html` and `src/App.jsx`
3. Ensure `data-category` attribute matches one of five categories
4. Link points to `articles/your-article-name.html`

## Development Workflows

### Running the Project
```bash
# Development server (React version)
npm run dev

# Production build (outputs to dist/ with /kb/ base path)
npm run build

# Preview production build
npm run preview

# Lint
npm run lint
```

The static HTML version can be opened directly in a browser, but note it references built CSS assets at `/kb/assets/`.

### Testing Changes
When modifying features:
1. Test in React dev server first (`npm run dev`)
2. Mirror changes to static HTML version
3. Run `npm run build` to verify build output
4. Check responsive behavior (mobile, tablet, desktop breakpoints in CSS)

### Style System
Both versions share identical CSS architecture:
- CSS custom properties for theming (`:root` variables)
- Mobile-first responsive design
- Category badge colors: `.category-badge.{category-name}`
- Special component boxes: `.info-box`, `.warning-box`, `.step` (in article template)

**When adding styles**: Update both `styles.css` and `src/index.css` identically.

## Project-Specific Conventions

### Component Structure (React)
Each component is a standalone function at file bottom ([App.jsx](../src/App.jsx#L118-L248)):
- `Header`, `Search`, `Filters`, `Sidebar`, `ArticlesSection`, `ArticleCard`, `Footer`
- No external component files - single-file architecture
- Props destructured in function signature
- Inline category emoji mapping in Sidebar (lines 177-182)

### Search/Filter Logic
**Static version** ([script.js](../script.js)):
```javascript
// Global state
let currentCategory = 'all';

// Filter by checking both search and category
const matchesSearch = title.includes(searchTerm) || excerpt.includes(searchTerm);
const matchesCategory = currentCategory === 'all' || category === currentCategory;
```

**React version** ([App.jsx](../src/App.jsx#L69-L75)):
```javascript
// useMemo for performance
const filteredArticles = useMemo(() => {
  return articles.filter(article => {
    const matchesSearch = /* title/excerpt check */;
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
}, [searchTerm, selectedCategory]);
```

### File Naming & Organization
- Article files: `kebab-case.html` (e.g., `password-reset-windows.html`)
- No build artifacts committed (dist/, node_modules/)
- Static assets built to `assets/` with content hashes (see [index.html](../index.html#L8))

## Key Integration Points

### Vite Build Configuration
[vite.config.js](../vite.config.js) sets `base: '/kb/'` - all asset paths in production use this prefix. The static `index.html` already references `/kb/assets/` paths.

### Article Template Structure
[articles/article-template.html](../articles/article-template.html) provides standardized sections:
- Breadcrumb navigation (lines 1-3 of article content)
- Category badge + last updated date
- Overview, Step-by-Step Solution, Additional Information sections
- `.info-box` (tips), `.warning-box` (cautions), `.step` (numbered instructions)
- Related articles footer

When creating articles, preserve this structure for consistency.

## Common Pitfalls

1. **Forgetting to sync both versions** - Always update HTML and React implementations together
2. **Incorrect category names** - Must exactly match: `hardware`, `software`, `network`, `account`, `troubleshooting`
3. **Base path issues** - Static HTML uses `/kb/` prefix, dev server uses root `/`
4. **Article links** - Must point to `articles/` subdirectory, no leading slash in React version
5. **CSS variable references** - Use `var(--variable-name)`, defined in `:root`

## External Dependencies

- **React 18.2** + **React DOM** - UI library (React version only)
- **Vite 5.0** - Build tool and dev server
- **ESLint** - Linting with React plugins
- No runtime dependencies in static version (vanilla JS)
- No state management libraries (useState/useMemo sufficient)
- No routing library (multi-page via standard `<a>` tags)
