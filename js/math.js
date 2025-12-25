/**
 * Math & Tech Animation for Hero Section
 * Floats math symbols (pi, sigma, infinity) and tech symbols (</>, {}, git, npm) in the background
 */

(function () {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    let width, height;
    let particles = [];
    let animationFrameId;

    // Configuration
    const particleCount = 40; // Balanced for performance
    const symbols = [
        // Math
        'π', '∑', '∫', '∞', '√', 'θ', 'λ', 'Δ', '±', 'α', 'β', 'γ',
        // Tech / Coding
        '</>', '{}', '[]', '=>', ';', '#', 'git', 'npm', 'js', 'py', 'css', 'html'
    ];
    const colors = [
        'rgba(0, 0, 0, 0.05)',
        'rgba(0, 0, 0, 0.08)',
        'rgba(64, 64, 64, 0.06)'
    ];
    const speedBase = 0.5;

    class Particle {
        constructor() {
            this.reset(true);
        }

        reset(initial = false) {
            this.x = Math.random() * width;
            this.y = initial ? (Math.random() * height) : (height + 50);
            this.speed = (Math.random() * 0.5 + 0.2) * speedBase;
            this.size = Math.random() * 14 + 10; // Slightly smaller and cleaner
            this.symbol = symbols[Math.floor(Math.random() * symbols.length)];
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.02;
            this.opacity = Math.random() * 0.5 + 0.2; // Variable opacity for depth
        }

        update() {
            this.y -= this.speed;
            this.rotation += this.rotationSpeed;

            if (this.y < -50) {
                this.reset();
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;
            ctx.font = `800 ${this.size}px "Inter", "Consolas", monospace`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(this.symbol, 0, 0);
            ctx.restore();
        }
    }

    function resize() {
        const parent = canvas.parentElement;
        if (parent) {
            width = parent.clientWidth;
            height = parent.clientHeight;
            canvas.width = width;
            canvas.height = height;

            // Re-initialize particles on major resize to fill new area
            init();
        }
    }

    function init() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function loop() {
        // Respect reduced motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            ctx.clearRect(0, 0, width, height);
            return;
        }

        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        animationFrameId = requestAnimationFrame(loop);
    }

    // Debounced resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            resize();
            loop();
        }, 200);
    });

    // Handle visibility change to save resources
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        } else {
            loop();
        }
    });

    // Start
    resize();
    loop();

})();
