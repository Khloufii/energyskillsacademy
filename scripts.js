   // Mobile Menu Toggle
        const menuToggle = document.getElementById('menuToggle');
        const navLinks = document.getElementById('navLinks');

        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            });
        });

        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offset = 80;
                    const targetPosition = target.offsetTop - offset;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Quote carousel
        const quotes = [
            {
                text: "Le succès n'est pas final, l'échec n'est pas fatal : c'est le courage de continuer qui compte.",
                author: "Winston Churchill"
            },
            {
                text: "La seule façon de faire du bon travail est d'aimer ce que vous faites.",
                author: "Steve Jobs"
            },
            {
                text: "L'excellence n'est pas une destination, c'est un voyage continu.",
                author: "Brian Tracy"
            },
            {
                text: "La compétence et la confiance vont de pair. Maîtrisez vos compétences et la confiance suivra.",
                author: "Unknown"
            },
            {
                text: "Dans un monde qui change constamment, celui qui n'évolue pas recule.",
                author: "Proverbe"
            },
            {
                text: "La formation est l'investissement le plus rentable que vous puissiez faire.",
                author: "Benjamin Franklin"
            }
        ];

        let currentQuote = 0;
        const quoteCarousel = document.getElementById('quoteCarousel');

        function changeQuote() {
            quoteCarousel.style.opacity = '0';
            setTimeout(() => {
                currentQuote = (currentQuote + 1) % quotes.length;
                quoteCarousel.innerHTML = `
                    <div class="quote">"${quotes[currentQuote].text}"</div>
                    <div class="quote-author">— ${quotes[currentQuote].author}</div>
                `;
                quoteCarousel.style.opacity = '1';
            }, 500);
        }

        setInterval(changeQuote, 5000);

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.service-card, .formation-card, .blog-card, .stat-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });

        // Form submission
        document.getElementById('contactForm').addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(e.target);
            const name = formData.get('name');
            const phone = formData.get('phone');
            const formation = formData.get('formation');
            const message = formData.get('message');
            
            // WhatsApp message
            const whatsappMessage = `Bonjour,%0A%0AJe m'appelle ${name}%0ATéléphone: ${phone}%0A${formation ? `Formation souhaitée: ${formation}%0A` : ''}${message ? `Message: ${message}` : ''}`;
            
            window.open(`https://wa.me/212661529405?text=${whatsappMessage}`, '_blank');
            
            // Reset form
            e.target.reset();
            alert('Merci! Vous allez être redirigé vers WhatsApp pour confirmer votre demande.');
        });

        // Counter animation for stats
        function animateCounter(element) {
            const target = parseInt(element.innerText);
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    element.innerText = Math.floor(current) + '+';
                    requestAnimationFrame(updateCounter);
                } else {
                    element.innerText = target + '+';
                }
            };

            updateCounter();
        }

        // Observe stats for counter animation
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    entry.target.classList.add('counted');
                    animateCounter(entry.target);
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.stat-number').forEach(stat => {
            statsObserver.observe(stat);
        });