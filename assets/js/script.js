
        // Simple image configuration - just folder paths and counts
        const imageConfig = {
            category1: {
                path: './assets/img/eva/',
                count: 12
            },
            category2: {
                path: './assets/img/toaru/',
                count: 12
            }
        };

        // Function to load images dynamically
        function loadImages() {
            // Load Category 1 images
            const category1Grid = document.getElementById('category1-grid');
            for (let i = 1; i <= imageConfig.category1.count; i++) {
                const imageCard = document.createElement('div');
                imageCard.className = 'image-card';
                
                const img = document.createElement('img');
                // Simple numbered PNG files: 1.png, 2.png, 3.png, etc.
                img.src = `${imageConfig.category1.path}${i}.png`;
                img.alt = `Gallery Image ${i}`;
                img.loading = 'lazy';
                
                imageCard.appendChild(img);
                category1Grid.appendChild(imageCard);
            }

            // Load Category 2 images  
            const category2Grid = document.getElementById('category2-grid');
            for (let i = 1; i <= imageConfig.category2.count; i++) {
                const imageCard = document.createElement('div');
                imageCard.className = 'image-card';
                
                const img = document.createElement('img');
                img.src = `${imageConfig.category2.path}${i}.png`;
                img.alt = `Gallery Image ${i}`;
                img.loading = 'lazy';
                
                imageCard.appendChild(img);
                category2Grid.appendChild(imageCard);
            }

            // Re-attach click events to newly created image cards
            attachImageClickEvents();
        }

        // Function to attach click events to image cards
        function attachImageClickEvents() {
            const imageCards = document.querySelectorAll('.image-card');
            imageCards.forEach(card => {
                card.addEventListener('click', () => {
                    const img = card.querySelector('img');
                    modalImage.src = img.src;
                    modalImage.alt = img.alt;
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                });
            });
        }

        // Load images when DOM is ready
        document.addEventListener('DOMContentLoaded', loadImages);

        // Tab functionality
        const tabButtons = document.querySelectorAll('.tab-button');
        const gallerySections = document.querySelectorAll('.gallery-section');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');
                
                // Update active states
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Show corresponding gallery section
                gallerySections.forEach(section => {
                    section.classList.remove('active');
                    if (section.id === targetTab) {
                        section.classList.add('active');
                    }
                });
            });
        });

        // Modal functionality
        const modal = document.getElementById('imageModal');
        const modalImage = document.getElementById('modalImage');
        const modalClose = document.querySelector('.modal-close');

        modalClose.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        function closeModal() {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        // Escape key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });

        // Lazy loading for images - removed opacity manipulation that was causing display issues
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        observer.unobserve(img);
                    }
                });
            });

            // Observe dynamically loaded images
            setTimeout(() => {
                document.querySelectorAll('.image-card img').forEach(img => {
                    imageObserver.observe(img);
                });
            }, 100);
        }

        // Add smooth scroll behavior
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Dynamic particle generation
        function createParticle() {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 5 + 's';
            particle.style.animationDuration = (15 + Math.random() * 10) + 's';
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 25000);
        }

        // Create particles periodically
        setInterval(createParticle, 3000);
