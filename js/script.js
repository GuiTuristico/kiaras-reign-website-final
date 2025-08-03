
document.addEventListener('DOMContentLoaded', function() {

    // --- LÓGICA GLOBAL  ---

  
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
       
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // --- LÓGICA ESPECÍFICA homepage (index.html) ---

    // Animación de elementos flotantes
    const floatingItems = document.querySelectorAll('.floating-item');
    if (floatingItems.length > 0) { 
        floatingItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.5}s`;
        });
    }

    // --- LÓGICA ESPECÍFICA productos (productos.html) ---

    // Sistema de filtrado 
    const productsCatalog = document.getElementById('products-catalog');
    if (productsCatalog) { 
        const categoryCards = document.querySelectorAll('.category-card');
        const productCards = document.querySelectorAll('.product-card');
        const productCount = document.getElementById('product-count');
        const sortSelect = document.querySelector('.sort-select');

        // Filtrado por categoria
        categoryCards.forEach(card => {
            card.addEventListener('click', function() {
                const category = this.dataset.category;
                categoryCards.forEach(c => c.classList.remove('active'));
                this.classList.add('active');

                let visibleCount = 0;
                productCards.forEach(product => {
                    if (category === 'all' || product.dataset.category === category) {
                        product.style.display = 'block';
                        visibleCount++;
                    } else {
                        product.style.display = 'none';
                    }
                });
                productCount.textContent = visibleCount;
            });
        });

        // Ordenación de productos
        sortSelect.addEventListener('change', function() {
            const sortBy = this.value;
            const products = Array.from(productCards);

            products.sort((a, b) => {
                const priceA = parseFloat(a.querySelector('.product-price').textContent.replace('€', ''));
                const priceB = parseFloat(b.querySelector('.product-price').textContent.replace('€', ''));
                const nameA = a.querySelector('.product-title').textContent;
                const nameB = b.querySelector('.product-title').textContent;

                switch(sortBy) {
                    case 'price-low': return priceA - priceB;
                    case 'price-high': return priceB - priceA;
                    case 'name': return nameA.localeCompare(nameB);
                    default: return 0;
                }
            });

            products.forEach(product => productsCatalog.appendChild(product));
        });
    }

    // --- LÓGICA ESPECÍFICA presupuesto (presupuesto.html) ---

    // 4. Validación y envío del formulario de presupuesto
    const budgetForm = document.getElementById('budgetForm');
    if (budgetForm) { 
        const submitBtn = document.getElementById('submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        const comentarios = document.getElementById('comentarios');
        const charCount = document.getElementById('char-count');

        comentarios.addEventListener('input', function() {
            charCount.textContent = this.value.length;
        });

        budgetForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateBudgetForm()) {
                submitBudgetForm();
            }
        });

        function validateBudgetForm() {
            
            return true; 
        }

        function submitBudgetForm() {
           
        }
    }

    // --- LÓGICA ESPECÍFICA contacto (contacto.html) ---

    // 5.  Validación y envío del formulario de contacto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) { 
        const submitBtn = document.getElementById('submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        const mensaje = document.getElementById('mensaje');
        const charCount = document.getElementById('char-count');

        mensaje.addEventListener('input', function() {
            charCount.textContent = this.value.length;
        });

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateContactForm()) {
                submitContactForm();
            }
        });

        function validateContactForm() {
            
            return true; 
        }

        function submitContactForm() {
            
        }
    }

    // Funciones de ayuda para los formularios
    function showError(errorId, message) {
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
            const input = errorElement.previousElementSibling;
            if (input) {
                input.classList.add('error');
            }
        }
    }

    function hideError(errorId) {
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.style.display = 'none';
            const input = errorElement.previousElementSibling;
            if (input) {
                input.classList.remove('error');
            }
        }
    }
});
