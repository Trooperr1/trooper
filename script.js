// ===================================
// ÉLITE NOIR - Ultra Premium Fashion House
// Advanced JavaScript with Three.js & GSAP
// ===================================

(function() {
    'use strict';

    // ===================================
    // LOADING SCREEN
    // ===================================

    class LoadingScreen {
        constructor() {
            this.loadingScreen = document.getElementById('loadingScreen');
            this.progressBar = document.getElementById('progressBar');
            this.percentage = document.getElementById('loadingPercentage');
            this.progress = 0;
        }

        init() {
            this.simulateLoading();
        }

        simulateLoading() {
            const interval = setInterval(() => {
                this.progress += Math.random() * 15;
                if (this.progress >= 100) {
                    this.progress = 100;
                    clearInterval(interval);
                    setTimeout(() => this.hide(), 500);
                }
                this.updateProgress();
            }, 200);
        }

        updateProgress() {
            this.progressBar.style.width = `${this.progress}%`;
            this.percentage.textContent = `${Math.floor(this.progress)}%`;
        }

        hide() {
            this.loadingScreen.classList.add('hidden');
            setTimeout(() => {
                this.loadingScreen.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 500);
        }
    }

    // ===================================
    // THREE.JS BACKGROUND
    // ===================================

    class ThreeBackground {
        constructor() {
            this.canvas = document.getElementById('threejs-canvas');
            if (!this.canvas) return;

            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            this.renderer = new THREE.WebGLRenderer({
                canvas: this.canvas,
                alpha: true,
                antialias: true
            });

            this.particles = null;
            this.particleCount = 1000;
            this.time = 0;
        }

        init() {
            this.setupRenderer();
            this.createParticles();
            this.createLights();
            this.createGeometry();
            this.setupCamera();
            this.animate();
            this.handleResize();
        }

        setupRenderer() {
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            this.renderer.setClearColor(0x000000, 0);
        }

        createParticles() {
            const geometry = new THREE.BufferGeometry();
            const positions = new Float32Array(this.particleCount * 3);
            const colors = new Float32Array(this.particleCount * 3);

            for (let i = 0; i < this.particleCount * 3; i += 3) {
                positions[i] = (Math.random() - 0.5) * 100;
                positions[i + 1] = (Math.random() - 0.5) * 100;
                positions[i + 2] = (Math.random() - 0.5) * 100;

                // Gold color
                colors[i] = 0.83;
                colors[i + 1] = 0.69;
                colors[i + 2] = 0.22;
            }

            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

            const material = new THREE.PointsMaterial({
                size: 0.2,
                vertexColors: true,
                transparent: true,
                opacity: 0.6,
                blending: THREE.AdditiveBlending
            });

            this.particles = new THREE.Points(geometry, material);
            this.scene.add(this.particles);
        }

        createLights() {
            const ambientLight = new THREE.AmbientLight(0xD4AF37, 0.5);
            this.scene.add(ambientLight);

            const pointLight1 = new THREE.PointLight(0xD4AF37, 1, 100);
            pointLight1.position.set(20, 20, 20);
            this.scene.add(pointLight1);

            const pointLight2 = new THREE.PointLight(0xFFD700, 0.8, 100);
            pointLight2.position.set(-20, -20, -20);
            this.scene.add(pointLight2);
        }

        createGeometry() {
            // Create floating torus knots
            const torusGeometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
            const torusMaterial = new THREE.MeshPhongMaterial({
                color: 0xD4AF37,
                wireframe: true,
                transparent: true,
                opacity: 0.1
            });

            for (let i = 0; i < 3; i++) {
                const torus = new THREE.Mesh(torusGeometry, torusMaterial);
                torus.position.set(
                    (Math.random() - 0.5) * 50,
                    (Math.random() - 0.5) * 50,
                    (Math.random() - 0.5) * 50
                );
                torus.userData = {
                    rotationSpeed: Math.random() * 0.02,
                    floatSpeed: Math.random() * 0.5
                };
                this.scene.add(torus);
            }
        }

        setupCamera() {
            this.camera.position.z = 50;
        }

        animate() {
            requestAnimationFrame(() => this.animate());
            this.time += 0.001;

            // Animate particles
            if (this.particles) {
                this.particles.rotation.y += 0.0005;
                this.particles.rotation.x += 0.0003;

                const positions = this.particles.geometry.attributes.position.array;
                for (let i = 0; i < positions.length; i += 3) {
                    positions[i + 1] += Math.sin(this.time + positions[i]) * 0.01;
                }
                this.particles.geometry.attributes.position.needsUpdate = true;
            }

            // Animate geometries
            this.scene.children.forEach(child => {
                if (child instanceof THREE.Mesh && child.geometry instanceof THREE.TorusKnotGeometry) {
                    child.rotation.x += child.userData.rotationSpeed;
                    child.rotation.y += child.userData.rotationSpeed * 0.5;
                    child.position.y += Math.sin(this.time * child.userData.floatSpeed) * 0.02;
                }
            });

            this.renderer.render(this.scene, this.camera);
        }

        handleResize() {
            window.addEventListener('resize', () => {
                this.camera.aspect = window.innerWidth / window.innerHeight;
                this.camera.updateProjectionMatrix();
                this.renderer.setSize(window.innerWidth, window.innerHeight);
            });
        }
    }

    // ===================================
    // 3D PRODUCT VIEWER
    // ===================================

    class Product3DViewer {
        constructor() {
            this.canvas = document.getElementById('product-canvas');
            if (!this.canvas) return;

            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(50, this.canvas.clientWidth / this.canvas.clientHeight, 0.1, 1000);
            this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, alpha: true, antialias: true });

            this.model = null;
            this.isDragging = false;
            this.previousMousePosition = { x: 0, y: 0 };
        }

        init() {
            this.setupRenderer();
            this.createProduct();
            this.createLights();
            this.setupCamera();
            this.setupControls();
            this.animate();
            this.handleResize();
        }

        setupRenderer() {
            this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            this.renderer.setClearColor(0x000000, 0);
            this.renderer.shadowMap.enabled = true;
        }

        createProduct() {
            // Create a luxury clothing representation using geometric shapes
            const group = new THREE.Group();

            // Main body (jacket/shirt)
            const bodyGeometry = new THREE.BoxGeometry(4, 6, 2);
            const bodyMaterial = new THREE.MeshStandardMaterial({
                color: 0x1a1a1a,
                roughness: 0.7,
                metalness: 0.3
            });
            const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
            group.add(body);

            // Gold accents
            const accentGeometry = new THREE.CylinderGeometry(0.1, 0.1, 6, 32);
            const accentMaterial = new THREE.MeshStandardMaterial({
                color: 0xD4AF37,
                roughness: 0.2,
                metalness: 0.8
            });

            for (let i = 0; i < 3; i++) {
                const accent = new THREE.Mesh(accentGeometry, accentMaterial);
                accent.position.set(-1.5 + i, 0, 1.1);
                group.add(accent);
            }

            // Luxury buttons
            for (let i = 0; i < 5; i++) {
                const buttonGeometry = new THREE.SphereGeometry(0.15, 32, 32);
                const button = new THREE.Mesh(buttonGeometry, accentMaterial);
                button.position.set(0, 2 - i, 1.1);
                group.add(button);
            }

            // Collar
            const collarGeometry = new THREE.BoxGeometry(3, 0.5, 1);
            const collar = new THREE.Mesh(collarGeometry, bodyMaterial);
            collar.position.set(0, 3.25, 0.5);
            collar.rotation.x = -0.2;
            group.add(collar);

            this.model = group;
            this.scene.add(this.model);
        }

        createLights() {
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
            this.scene.add(ambientLight);

            const spotLight1 = new THREE.SpotLight(0xD4AF37, 1);
            spotLight1.position.set(10, 10, 10);
            spotLight1.castShadow = true;
            this.scene.add(spotLight1);

            const spotLight2 = new THREE.SpotLight(0xFFD700, 0.8);
            spotLight2.position.set(-10, 10, -10);
            this.scene.add(spotLight2);

            const rimLight = new THREE.DirectionalLight(0xD4AF37, 0.5);
            rimLight.position.set(0, 0, -10);
            this.scene.add(rimLight);
        }

        setupCamera() {
            this.camera.position.z = 15;
            this.camera.position.y = 2;
        }

        setupControls() {
            this.canvas.addEventListener('mousedown', (e) => {
                this.isDragging = true;
                this.previousMousePosition = { x: e.offsetX, y: e.offsetY };
            });

            this.canvas.addEventListener('mousemove', (e) => {
                if (this.isDragging && this.model) {
                    const deltaX = e.offsetX - this.previousMousePosition.x;
                    const deltaY = e.offsetY - this.previousMousePosition.y;

                    this.model.rotation.y += deltaX * 0.01;
                    this.model.rotation.x += deltaY * 0.01;

                    this.previousMousePosition = { x: e.offsetX, y: e.offsetY };
                }
            });

            this.canvas.addEventListener('mouseup', () => {
                this.isDragging = false;
            });

            this.canvas.addEventListener('wheel', (e) => {
                e.preventDefault();
                this.camera.position.z += e.deltaY * 0.01;
                this.camera.position.z = Math.max(10, Math.min(25, this.camera.position.z));
            });
        }

        animate() {
            requestAnimationFrame(() => this.animate());

            // Auto-rotate when not dragging
            if (!this.isDragging && this.model) {
                this.model.rotation.y += 0.005;
            }

            this.renderer.render(this.scene, this.camera);
        }

        handleResize() {
            window.addEventListener('resize', () => {
                if (this.canvas) {
                    this.camera.aspect = this.canvas.clientWidth / this.canvas.clientHeight;
                    this.camera.updateProjectionMatrix();
                    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
                }
            });
        }
    }

    // ===================================
    // CUSTOM CURSOR
    // ===================================

    class CustomCursor {
        constructor() {
            this.follower = document.getElementById('cursorFollower');
            this.dot = document.getElementById('cursorDot');
            this.mouseX = 0;
            this.mouseY = 0;
            this.followerX = 0;
            this.followerY = 0;
        }

        init() {
            if (!this.follower || !this.dot) return;

            document.addEventListener('mousemove', (e) => {
                this.mouseX = e.clientX;
                this.mouseY = e.clientY;

                this.dot.style.left = `${this.mouseX}px`;
                this.dot.style.top = `${this.mouseY}px`;
                this.dot.style.opacity = '1';
            });

            document.addEventListener('mouseenter', () => {
                this.follower.style.opacity = '1';
                this.dot.style.opacity = '1';
            });

            document.addEventListener('mouseleave', () => {
                this.follower.style.opacity = '0';
                this.dot.style.opacity = '0';
            });

            // Smooth follower movement
            this.animateFollower();

            // Scale up on interactive elements
            const interactiveElements = document.querySelectorAll('a, button, input, textarea, select');
            interactiveElements.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    this.follower.style.width = '80px';
                    this.follower.style.height = '80px';
                });
                el.addEventListener('mouseleave', () => {
                    this.follower.style.width = '50px';
                    this.follower.style.height = '50px';
                });
            });
        }

        animateFollower() {
            this.followerX += (this.mouseX - this.followerX) * 0.1;
            this.followerY += (this.mouseY - this.followerY) * 0.1;

            this.follower.style.left = `${this.followerX}px`;
            this.follower.style.top = `${this.followerY}px`;

            requestAnimationFrame(() => this.animateFollower());
        }
    }

    // ===================================
    // NAVIGATION
    // ===================================

    class Navigation {
        constructor() {
            this.navbar = document.getElementById('navbar');
            this.menuToggle = document.getElementById('menuToggle');
            this.navMenu = document.getElementById('navMenu');
        }

        init() {
            this.handleScroll();
            this.setupMobileMenu();
            this.setupSmoothScroll();
        }

        handleScroll() {
            let lastScroll = 0;

            window.addEventListener('scroll', () => {
                const currentScroll = window.pageYOffset;

                if (currentScroll > 100) {
                    this.navbar.classList.add('scrolled');
                } else {
                    this.navbar.classList.remove('scrolled');
                }

                // Hide/show navbar on scroll
                if (currentScroll > lastScroll && currentScroll > 500) {
                    this.navbar.style.transform = 'translateY(-100%)';
                } else {
                    this.navbar.style.transform = 'translateY(0)';
                }

                lastScroll = currentScroll;
            });
        }

        setupMobileMenu() {
            if (this.menuToggle && this.navMenu) {
                this.menuToggle.addEventListener('click', () => {
                    this.navMenu.classList.toggle('active');
                    this.menuToggle.classList.toggle('active');
                });
            }
        }

        setupSmoothScroll() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', (e) => {
                    e.preventDefault();
                    const target = document.querySelector(anchor.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        }
    }

    // ===================================
    // HERO SLIDER
    // ===================================

    class HeroSlider {
        constructor() {
            this.slides = document.querySelectorAll('.hero-slide');
            this.currentSlide = 0;
            this.slideInterval = 5000;
        }

        init() {
            if (this.slides.length === 0) return;
            setInterval(() => this.nextSlide(), this.slideInterval);
        }

        nextSlide() {
            this.slides[this.currentSlide].classList.remove('active');
            this.currentSlide = (this.currentSlide + 1) % this.slides.length;
            this.slides[this.currentSlide].classList.add('active');
        }
    }

    // ===================================
    // STATS COUNTER
    // ===================================

    class StatsCounter {
        constructor() {
            this.stats = document.querySelectorAll('.stat-number');
        }

        init() {
            this.observeStats();
        }

        observeStats() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                        this.animateCounter(entry.target);
                        entry.target.classList.add('counted');
                    }
                });
            }, { threshold: 0.5 });

            this.stats.forEach(stat => observer.observe(stat));
        }

        animateCounter(element) {
            const target = parseInt(element.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    element.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = target;
                }
            };

            updateCounter();
        }
    }

    // ===================================
    // GSAP ANIMATIONS
    // ===================================

    class GSAPAnimations {
        init() {
            if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

            gsap.registerPlugin(ScrollTrigger);

            // Collection cards
            gsap.utils.toArray('.collection-card').forEach((card, i) => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 80%',
                        end: 'top 50%',
                        toggleActions: 'play none none reverse'
                    },
                    opacity: 0,
                    y: 100,
                    rotation: 5,
                    duration: 0.8,
                    delay: i * 0.1,
                    ease: 'power3.out'
                });
            });

            // Experience cards
            gsap.utils.toArray('.experience-card').forEach((card, i) => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    },
                    opacity: 0,
                    scale: 0.8,
                    duration: 0.6,
                    delay: i * 0.15,
                    ease: 'back.out(1.7)'
                });
            });

            // Boutique cards
            gsap.utils.toArray('.boutique-card').forEach((card, i) => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    },
                    opacity: 0,
                    x: i % 2 === 0 ? -100 : 100,
                    duration: 0.8,
                    ease: 'power2.out'
                });
            });

            // Section titles
            gsap.utils.toArray('.section-title').forEach(title => {
                gsap.from(title, {
                    scrollTrigger: {
                        trigger: title,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    },
                    opacity: 0,
                    y: 50,
                    duration: 0.8,
                    ease: 'power3.out'
                });
            });

            // Parallax section
            gsap.to('.parallax-section', {
                scrollTrigger: {
                    trigger: '.parallax-section',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                },
                backgroundPosition: '50% 100%'
            });
        }
    }

    // ===================================
    // TESTIMONIAL SLIDER
    // ===================================

    class TestimonialSlider {
        constructor() {
            this.track = document.querySelector('.testimonial-track');
            this.prevBtn = document.querySelector('.testimonial-btn.prev');
            this.nextBtn = document.querySelector('.testimonial-btn.next');
        }

        init() {
            if (!this.track) return;

            this.setupButtons();
        }

        setupButtons() {
            if (this.prevBtn) {
                this.prevBtn.addEventListener('click', () => {
                    this.track.scrollBy({
                        left: -420,
                        behavior: 'smooth'
                    });
                });
            }

            if (this.nextBtn) {
                this.nextBtn.addEventListener('click', () => {
                    this.track.scrollBy({
                        left: 420,
                        behavior: 'smooth'
                    });
                });
            }
        }
    }

    // ===================================
    // FORMS
    // ===================================

    class Forms {
        init() {
            this.setupNewsletterForm();
            this.setupContactForm();
            this.setupCartFunctionality();
        }

        setupNewsletterForm() {
            const form = document.getElementById('newsletterForm');
            if (form) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const email = form.querySelector('input[type="email"]').value;
                    this.showNotification('Thank you for subscribing! Welcome to the Elite Circle.', 'success');
                    form.reset();
                });
            }
        }

        setupContactForm() {
            const form = document.getElementById('contactForm');
            if (form) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.showNotification('Message sent successfully! Our concierge team will contact you shortly.', 'success');
                    form.reset();
                });
            }
        }

        setupCartFunctionality() {
            const cartBtn = document.getElementById('cartBtn');
            if (cartBtn) {
                cartBtn.addEventListener('click', () => {
                    this.showNotification('Cart functionality coming soon!', 'info');
                });
            }

            const searchBtn = document.getElementById('searchBtn');
            if (searchBtn) {
                searchBtn.addEventListener('click', () => {
                    this.showNotification('Search functionality coming soon!', 'info');
                });
            }
        }

        showNotification(message, type = 'info') {
            const notification = document.createElement('div');
            notification.className = `notification notification-${type}`;
            notification.textContent = message;
            notification.style.cssText = `
                position: fixed;
                top: 100px;
                right: 2rem;
                padding: 1.5rem 2rem;
                background: var(--glass-bg);
                backdrop-filter: blur(10px);
                border: 2px solid var(--primary-gold);
                border-radius: 10px;
                color: var(--light-text);
                font-size: 0.875rem;
                z-index: 10000;
                animation: slideInRight 0.5s ease;
                box-shadow: 0 10px 40px var(--shadow-gold);
            `;

            document.body.appendChild(notification);

            setTimeout(() => {
                notification.style.animation = 'slideOutRight 0.5s ease';
                setTimeout(() => notification.remove(), 500);
            }, 3000);
        }
    }

    // ===================================
    // BACK TO TOP
    // ===================================

    class BackToTop {
        constructor() {
            this.btn = document.getElementById('backToTop');
        }

        init() {
            if (!this.btn) return;

            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    this.btn.classList.add('visible');
                } else {
                    this.btn.classList.remove('visible');
                }
            });

            this.btn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    // ===================================
    // VIDEO CONTROLS
    // ===================================

    class VideoControls {
        init() {
            const playBtn = document.getElementById('videoPlayBtn');
            if (playBtn) {
                playBtn.addEventListener('click', () => {
                    this.showNotification('Video player coming soon!', 'info');
                });
            }
        }

        showNotification(message, type) {
            const forms = new Forms();
            forms.showNotification(message, type);
        }
    }

    // ===================================
    // COLLECTION BUTTONS
    // ===================================

    class CollectionButtons {
        init() {
            const collectionBtns = document.querySelectorAll('.collection-btn');
            collectionBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const collectionName = btn.closest('.collection-card').querySelector('.collection-name').textContent;
                    const forms = new Forms();
                    forms.showNotification(`Viewing ${collectionName} collection...`, 'info');
                });
            });

            const productBtns = document.querySelectorAll('.product-btn');
            productBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const action = btn.textContent.trim();
                    const forms = new Forms();
                    forms.showNotification(`${action} functionality coming soon!`, 'info');
                });
            });

            const boutiqueBtns = document.querySelectorAll('.boutique-btn');
            boutiqueBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const city = btn.closest('.boutique-card').querySelector('.boutique-city').textContent;
                    const forms = new Forms();
                    forms.showNotification(`Booking appointment at ${city} boutique...`, 'success');
                });
            });
        }
    }

    // ===================================
    // PARALLAX EFFECTS
    // ===================================

    class ParallaxEffects {
        init() {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const parallaxSections = document.querySelectorAll('.parallax-section');

                parallaxSections.forEach(section => {
                    const speed = 0.5;
                    const yPos = -(scrolled * speed);
                    section.style.backgroundPositionY = `${yPos}px`;
                });
            });
        }
    }

    // ===================================
    // INTERSECTION OBSERVER
    // ===================================

    class IntersectionAnimations {
        init() {
            const options = {
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
            }, options);

            // Observe elements
            const elements = document.querySelectorAll('.about-content, .product-3d-info, .contact-info, .contact-form-wrapper');
            elements.forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(50px)';
                el.style.transition = 'all 0.8s ease-out';
                observer.observe(el);
            });
        }
    }

    // ===================================
    // CART MANAGEMENT
    // ===================================

    class CartManager {
        constructor() {
            this.cart = [];
            this.cartCount = document.querySelector('.cart-count');
        }

        init() {
            this.updateCartDisplay();
        }

        addToCart(item) {
            this.cart.push(item);
            this.updateCartDisplay();
        }

        updateCartDisplay() {
            if (this.cartCount) {
                this.cartCount.textContent = this.cart.length;
            }
        }
    }

    // ===================================
    // IMAGE LAZY LOADING
    // ===================================

    class LazyLoading {
        init() {
            const images = document.querySelectorAll('[data-src]');

            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        }
    }

    // ===================================
    // INITIALIZATION
    // ===================================

    function init() {
        // Initialize all components
        const loadingScreen = new LoadingScreen();
        loadingScreen.init();

        // Wait for loading to complete before initializing other components
        setTimeout(() => {
            const threeBackground = new ThreeBackground();
            threeBackground.init();

            const product3DViewer = new Product3DViewer();
            product3DViewer.init();

            const customCursor = new CustomCursor();
            customCursor.init();

            const navigation = new Navigation();
            navigation.init();

            const heroSlider = new HeroSlider();
            heroSlider.init();

            const statsCounter = new StatsCounter();
            statsCounter.init();

            const gsapAnimations = new GSAPAnimations();
            gsapAnimations.init();

            const testimonialSlider = new TestimonialSlider();
            testimonialSlider.init();

            const forms = new Forms();
            forms.init();

            const backToTop = new BackToTop();
            backToTop.init();

            const videoControls = new VideoControls();
            videoControls.init();

            const collectionButtons = new CollectionButtons();
            collectionButtons.init();

            const parallaxEffects = new ParallaxEffects();
            parallaxEffects.init();

            const intersectionAnimations = new IntersectionAnimations();
            intersectionAnimations.init();

            const cartManager = new CartManager();
            cartManager.init();

            const lazyLoading = new LazyLoading();
            lazyLoading.init();

            console.log('ÉLITE NOIR - All systems initialized');
        }, 100);
    }

    // Run initialization when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

// ===================================
// ADDITIONAL ANIMATIONS
// ===================================

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }

    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }

    .nav-menu.active {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: rgba(10, 10, 10, 0.98);
        padding: 2rem;
        gap: 2rem;
    }

    .menu-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }

    .menu-toggle.active span:nth-child(2) {
        opacity: 0;
    }

    .menu-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
`;
document.head.appendChild(style);
