import { useState, useMemo } from 'react'
import './index.css'

const articles = [
  {
    id: 1,
    category: 'hardware',
    title: 'Computer Won\'t Turn On',
    excerpt: 'Step-by-step guide to diagnose and fix computer power issues...',
    date: '2024-01-15',
    link: 'articles/hardware-wont-turn-on.html'
  },
  {
    id: 2,
    category: 'software',
    title: 'How to Reset Your Password',
    excerpt: 'Quick guide for resetting forgotten passwords across various applications...',
    date: '2024-01-14',
    link: 'articles/password-reset.html'
  },
  {
    id: 3,
    category: 'network',
    title: 'WiFi Connection Issues',
    excerpt: 'Troubleshoot and resolve common wireless network connectivity problems...',
    date: '2024-01-13',
    link: 'articles/wifi-issues.html'
  },
  {
    id: 4,
    category: 'software',
    title: 'Email Configuration Guide',
    excerpt: 'Set up your email client with proper IMAP/SMTP settings...',
    date: '2024-01-12',
    link: 'articles/email-config.html'
  },
  {
    id: 5,
    category: 'account',
    title: 'Account Locked Out',
    excerpt: 'What to do when your account is locked and how to prevent it...',
    date: '2024-01-11',
    link: 'articles/account-locked.html'
  },
  {
    id: 6,
    category: 'printer',
    title: 'Printer Not Responding',
    excerpt: 'Common printer issues and how to resolve them quickly...',
    date: '2024-01-10',
    link: 'articles/printer-issues.html'
  }
]

const categories = [
  { key: 'all', label: 'All Articles' },
  { key: 'hardware', label: 'Hardware' },
  { key: 'software', label: 'Software' },
  { key: 'network', label: 'Network' },
  { key: 'printer', label: 'Printer Issues' },
  { key: 'account', label: 'Account Access' },
  { key: 'troubleshooting', label: 'Troubleshooting' }
]

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory])

  const getSectionTitle = (category) => {
    const categoryMap = {
      'all': 'All Articles',
      'hardware': 'Hardware Issues',
      'software': 'Software & Applications',
      'network': 'Network & Connectivity',
      'printer': 'Printer Issues',
      'account': 'Account Access',
      'troubleshooting': 'General Troubleshooting'
    }
    return categoryMap[category] || 'All Articles'
  }

  return (
    <div className="app">
      <Header />
      <main className="container">
        <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <Filters 
          categories={categories} 
          selectedCategory={selectedCategory} 
          onCategoryChange={setSelectedCategory} 
        />
        <div className="content-wrapper">
          <Sidebar 
            categories={categories} 
            selectedCategory={selectedCategory} 
            onCategoryChange={setSelectedCategory} 
          />
          <ArticlesSection 
            articles={filteredArticles} 
            title={getSectionTitle(selectedCategory)} 
          />
        </div>
      </main>
      <Footer />
    </div>
  )
}

function Header() {
  return (
    <header>
      <div className="container">
        <div className="header-content">
          <h1>📚 Service Desk Knowledge Base</h1>
          <p className="subtitle">Quick solutions and guides for common issues</p>
        </div>
      </div>
    </header>
  )
}

function Search({ searchTerm, onSearchChange }) {
  return (
    <div className="search-section">
      <input 
        type="text" 
        className="search-box" 
        placeholder="Search for articles, solutions, or keywords..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  )
}

function Filters({ categories, selectedCategory, onCategoryChange }) {
  return (
    <div className="filters">
      {categories.map(category => (
        <button
          key={category.key}
          className={`filter-btn ${selectedCategory === category.key ? 'active' : ''}`}
          data-category={category.key}
          onClick={() => onCategoryChange(category.key)}
        >
          {category.label}
        </button>
      ))}
    </div>
  )
}

function Sidebar({ categories, selectedCategory, onCategoryChange }) {
  return (
    <aside className="sidebar">
      <h3>Categories</h3>
      <ul className="category-list">
        {categories.slice(1).map(category => (
          <li key={category.key}>
            <a 
              href="#" 
              data-category={category.key}
              className={selectedCategory === category.key ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault()
                onCategoryChange(category.key)
              }}
            >
              {category.key === 'hardware' && '🖥️ '}
              {category.key === 'software' && '💻 '}
              {category.key === 'network' && '🌐 '}
              {category.key === 'printer' && '🖨️ '}
              {category.key === 'account' && '👤 '}
              {category.key === 'troubleshooting' && '🔧 '}
              {category.label}
            </a>
          </li>
        ))}
        <li><a href="team.html">👥 Our Team</a></li>
      </ul>

      <div className="quick-links">
        <h3>Quick Links</h3>
        <ul>
          <li><a href="#" className="quick-link">Submit a Ticket</a></li>
          <li><a href="contact.html" className="quick-link">Contact Support</a></li>
          <li><a href="#" className="quick-link">FAQ</a></li>
        </ul>
      </div>
    </aside>
  )
}

function ArticlesSection({ articles, title }) {
  return (
    <section className="articles-section">
      <h2>{title}</h2>
      <div className="articles-grid">
        {articles.map(article => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
      {articles.length === 0 && (
        <div className="no-results">
          <p>No articles found matching your search.</p>
        </div>
      )}
    </section>
  )
}

function ArticleCard({ article }) {
  return (
    <article className="article-card" data-category={article.category}>
      <div className="article-header">
        <span className={`category-badge ${article.category}`}>
          {article.category}
        </span>
        <span className="article-date">{article.date}</span>
      </div>
      <h3 className="article-title">{article.title}</h3>
      <p className="article-excerpt">{article.excerpt}</p>
      <a href={article.link} className="article-link">Read More →</a>
    </article>
  )
}

function Footer() {
  return (
    <footer>
      <div className="container">
        <p>&copy; 2024 Service Desk Knowledge Base. All rights reserved.</p>
        <p>Need help? <a href="#" className="footer-link">Contact Support</a></p>
      </div>
    </footer>
  )
}

export default App
