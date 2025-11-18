# Service Desk Knowledge Base

A clean, searchable, and easy-to-use knowledge base website for service desk teams. This KB system helps organize technical documentation, troubleshooting guides, and common solutions in one centralized location.

## 📋 Features

- **Search Functionality** - Quick search across all articles
- **Category Filtering** - Filter articles by category (Hardware, Software, Network, Account Access, Troubleshooting)
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Clean Interface** - Modern, professional design that's easy to navigate
- **Article Templates** - Pre-formatted templates for consistent documentation
- **Sidebar Navigation** - Quick access to categories and important links

## 🚀 Getting Started

### Viewing the Knowledge Base

1. Open `index.html` in any modern web browser
2. Browse articles by category or use the search bar
3. Click on any article card to view the full content

### Project Structure

```
KB/
├── index.html              # Main knowledge base page
├── styles.css              # All styling and responsive design
├── script.js               # Search and filter functionality
├── articles/               # Directory for all KB articles
│   └── article-template.html  # Template for new articles
└── README.md               # This file
```

## ✏️ Adding Content

### Adding a New Article to the Homepage

1. Open `index.html` in a text editor
2. Locate the `<div id="articlesGrid" class="articles-grid">` section
3. Copy one of the existing article cards and modify it:

```html
<article class="article-card" data-category="YOUR-CATEGORY">
    <div class="article-header">
        <span class="category-badge YOUR-CATEGORY">Category Name</span>
        <span class="article-date">2024-01-15</span>
    </div>
    <h3 class="article-title">Your Article Title</h3>
    <p class="article-excerpt">Brief description of what this article covers...</p>
    <a href="articles/your-article-name.html" class="article-link">Read More →</a>
</article>
```

**Available Categories:**
- `hardware` - Hardware issues (yellow badge)
- `software` - Software & Applications (blue badge)
- `network` - Network & Connectivity (green badge)
- `account` - Account Access (pink badge)
- `troubleshooting` - General Troubleshooting (indigo badge)

### Creating a New Article Page

1. Copy `articles/article-template.html` to a new file (e.g., `articles/printer-setup.html`)
2. Edit the new file and update:
   - Page title in `<title>` tag
   - Breadcrumb navigation
   - Article title in `<h1>`
   - Category badge
   - Last updated date
   - All content sections with your actual content
3. Save the file

### Article Content Guidelines

Use the provided template structure:
- **Overview** - Brief introduction to the topic
- **Step-by-Step Solution** - Numbered steps with clear instructions
- **Additional Information** - Related tips, prerequisites, common issues
- **Related Articles** - Links to similar topics

#### Special Content Boxes

**Info Box** (for tips and helpful information):
```html
<div class="info-box">
    <strong>💡 Tip:</strong> Your helpful tip here.
</div>
```

**Warning Box** (for cautions and important warnings):
```html
<div class="warning-box">
    <strong>⚠️ Warning:</strong> Important warning message here.
</div>
```

**Step Box** (for numbered instructions):
```html
<div class="step">
    <span class="step-number">1</span>
    <strong>Step Title</strong>
    <p>Detailed description of the step.</p>
</div>
```

## 🎨 Customization

### Changing Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #2563eb;      /* Main brand color */
    --primary-dark: #1e40af;       /* Darker shade */
    --bg-color: #f8fafc;           /* Page background */
    --card-bg: #ffffff;            /* Card background */
    --text-primary: #1e293b;       /* Main text color */
    --text-secondary: #64748b;     /* Secondary text */
}
```

### Updating Header

Edit the header section in `index.html`:

```html
<h1>📚 Your Team Name Knowledge Base</h1>
<p class="subtitle">Your custom subtitle here</p>
```

### Modifying Quick Links

Update the sidebar quick links in `index.html`:

```html
<div class="quick-links">
    <h3>Quick Links</h3>
    <ul>
        <li><a href="YOUR-URL" class="quick-link">Your Link Text</a></li>
    </ul>
</div>
```

## 📱 Mobile Responsive

The knowledge base is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🔍 Search & Filter Features

- **Real-time search** - Search updates as you type
- **Multi-field search** - Searches both titles and descriptions
- **Category filtering** - Filter by clicking category badges or sidebar links
- **Combined search + filter** - Search within a specific category
- **No results message** - User-friendly message when no articles match

## 💡 Best Practices

1. **Keep article titles clear and descriptive**
2. **Use consistent formatting** across all articles
3. **Update the "Last Updated" date** when modifying articles
4. **Include step-by-step instructions** when possible
5. **Add related articles** to help users find additional information
6. **Use screenshots or diagrams** where helpful (add `<img>` tags)
7. **Test all links** before publishing
8. **Keep articles concise** but comprehensive

## 🛠️ Maintenance

### Regular Updates
- Review and update articles quarterly
- Remove outdated information
- Add new articles based on common support tickets
- Update screenshots if UI changes

### Backup
- Regularly backup the entire KB folder
- Consider version control (Git) for tracking changes

## 📞 Support

For questions about using or customizing this knowledge base:
- Contact your IT team
- Refer to the article template for examples
- Check existing articles for formatting guidance

## 📄 License

This knowledge base template is free to use and modify for your organization's needs.

---

**Version:** 1.0  
**Last Updated:** January 2024  
**Created for:** Service Desk Teams
