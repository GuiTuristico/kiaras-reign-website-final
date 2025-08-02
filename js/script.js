// Espera o conteúdo do DOM carregar completamente antes de executar qualquer script
document.addEventListener('DOMContentLoaded', function() {

    // --- LÓGICA GLOBAL (executa em todas as páginas) ---

    // 1. Destacar o link de navegação da página atual
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        // Extrai o nome do arquivo do atributo href para comparar com a página atual
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // --- LÓGICA ESPECÍFICA DA PÁGINA DE INÍCIO (index.html) ---

    // 2. Animação de elementos flutuantes
    const floatingItems = document.querySelectorAll('.floating-item');
    if (floatingItems.length > 0) { // Executa apenas se encontrar os elementos
        floatingItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.5}s`;
        });
    }

    // --- LÓGICA ESPECÍFICA DA PÁGINA DE PRODUTOS (productos.html) ---

    // 3. Sistema de filtrado e ordenamento de produtos
    const productsCatalog = document.getElementById('products-catalog');
    if (productsCatalog) { // Executa apenas se estiver na página de produtos
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

        // Ordenamento de produtos
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

    // --- LÓGICA ESPECÍFICA DA PÁGINA DE ORÇAMENTO (presupuesto.html) ---

    // 4. Validação e envio do formulário de orçamento
    const budgetForm = document.getElementById('budgetForm');
    if (budgetForm) { // Executa apenas se estiver na página de orçamento
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
            // ... (aqui vai toda a sua lógica de validação para o formulário de orçamento)
            // ... (não precisa mudar nada dentro desta função)
            return true; // Simplificado para o exemplo
        }

        function submitBudgetForm() {
            // ... (aqui vai toda a sua lógica de envio para o formulário de orçamento)
            // ... (não precisa mudar nada dentro desta função)
        }
    }

    // --- LÓGICA ESPECÍFICA DA PÁGINA DE CONTATO (contacto.html) ---

    // 5. Validação e envio do formulário de contato
    const contactForm = document.getElementById('contactForm');
    if (contactForm) { // Executa apenas se estiver na página de contato
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
            // ... (aqui vai toda a sua lógica de validação para o formulário de contato)
            // ... (não precisa mudar nada dentro desta função)
            return true; // Simplificado para o exemplo
        }

        function submitContactForm() {
            // ... (aqui vai toda a sua lógica de envio para o formulário de contato)
            // ... (não precisa mudar nada dentro desta função)
        }
    }

    // Funções de ajuda para os formulários (se forem comuns a ambos)
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
