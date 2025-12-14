document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-box input');
    const filterButtons = document.querySelectorAll('.chip');
    const productCards = document.querySelectorAll('.product-card');
    const resultsCount = document.querySelector('.results-count');

    let activeCategory = 'Todos';

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        filterProducts(searchTerm, activeCategory);
    });

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.classList.add('inactive');
            });
            button.classList.remove('inactive');
            button.classList.add('active');

            // Get category from button text
            activeCategory = button.textContent.trim();
            const searchTerm = searchInput.value.toLowerCase();
            
            filterProducts(searchTerm, activeCategory);
        });
    });

    function filterProducts(searchTerm, category) {
        let visibleCount = 0;

        productCards.forEach(card => {
            const title = card.querySelector('.card-title').textContent.toLowerCase();
            const cardCategory = card.querySelector('.card-category').textContent.trim().toLowerCase();
            const targetCategory = category.toLowerCase();
            
            const matchesSearch = title.includes(searchTerm);
            const matchesCategory = targetCategory === 'todos' || cardCategory === targetCategory;

            if (matchesSearch && matchesCategory) {
                card.style.display = ''; 
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // Update results count
        resultsCount.textContent = `${visibleCount} produtos encontrados`;
    }
});
