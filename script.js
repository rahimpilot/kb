// Search functionality
const searchInput = document.getElementById('searchInput');
const articlesGrid = document.getElementById('articlesGrid');
const noResults = document.getElementById('noResults');
const sectionTitle = document.getElementById('sectionTitle');
const articleCards = document.querySelectorAll('.article-card');

// Filter buttons
const filterButtons = document.querySelectorAll('.filter-btn');
const categoryLinks = document.querySelectorAll('.category-list a');

let currentCategory = 'all';

// Search function
searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    let visibleCount = 0;

    articleCards.forEach(card => {
        const title = card.querySelector('.article-title').textContent.toLowerCase();
        const excerpt = card.querySelector('.article-excerpt').textContent.toLowerCase();
        const category = card.getAttribute('data-category');
        
        const matchesSearch = title.includes(searchTerm) || excerpt.includes(searchTerm);
        const matchesCategory = currentCategory === 'all' || category === currentCategory;

        if (matchesSearch && matchesCategory) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });

    // Show/hide no results message
    if (visibleCount === 0) {
        noResults.style.display = 'block';
        articlesGrid.style.display = 'none';
    } else {
        noResults.style.display = 'none';
        articlesGrid.style.display = 'grid';
    }
});

// Filter button functionality
filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Get category
        currentCategory = this.getAttribute('data-category');
        
        // Update section title
        updateSectionTitle(currentCategory);
        
        // Filter articles
        filterArticles(currentCategory);
    });
});

// Category link functionality
categoryLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        // Only prevent default and filter if this link has a data-category attribute
        const category = this.getAttribute('data-category');
        
        if (!category) {
            // This is a regular link (like "Our Team"), let it navigate normally
            return;
        }
        
        e.preventDefault();
        currentCategory = category;
        
        // Update filter buttons
        filterButtons.forEach(btn => {
            if (btn.getAttribute('data-category') === category) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Update section title
        updateSectionTitle(category);
        
        // Filter articles
        filterArticles(category);
        
        // Scroll to articles section
        document.querySelector('.articles-section').scrollIntoView({ behavior: 'smooth' });
    });
});

// Filter articles function
function filterArticles(category) {
    const searchTerm = searchInput.value.toLowerCase();
    let visibleCount = 0;

    articleCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        const title = card.querySelector('.article-title').textContent.toLowerCase();
        const excerpt = card.querySelector('.article-excerpt').textContent.toLowerCase();
        
        const matchesCategory = category === 'all' || cardCategory === category;
        const matchesSearch = searchTerm === '' || title.includes(searchTerm) || excerpt.includes(searchTerm);

        if (matchesCategory && matchesSearch) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });

    // Show/hide no results message
    if (visibleCount === 0) {
        noResults.style.display = 'block';
        articlesGrid.style.display = 'none';
    } else {
        noResults.style.display = 'none';
        articlesGrid.style.display = 'grid';
    }
}

// Update section title
function updateSectionTitle(category) {
    const titles = {
        'all': 'All Articles',
        'hardware': 'Hardware Issues',
        'software': 'Software & Applications',
        'network': 'Network & Connectivity',
        'printer': 'Printer Issues',
        'account': 'Account Access',
        'troubleshooting': 'General Troubleshooting'
    };
    
    sectionTitle.textContent = titles[category] || 'All Articles';
}

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Add animation on page load
window.addEventListener('load', function() {
    articleCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
        }, index * 50);
    });
});
