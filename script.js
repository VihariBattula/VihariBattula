/**
 * Math & Tech Animation for Hero Section
 * Floats math symbols (pi, sigma, infinity) and tech symbols (</>, {}, git, npm) in the background
 */

(function () {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    // Configuration
    const particleCount = 50; // Increased count for "a lot of symbols"
    const symbols = [
        // Math
        'π', '∑', '∫', '≠', '≈', '√', '∞', '0', '1', '2', '3', 'θ', 'λ', 'Δ', '±', '÷',
        // Tech / Coding
        '</>', '{}', '[]', '()', '=>', ';', '#', 'var', 'let', 'const', 'if', 'npm', 'git', 'ssh', 'src', 'bin'
    ];
    const colors = ['rgba(0, 0, 0, 0.08)', 'rgba(0, 0, 0, 0.12)', 'rgba(40, 40, 40, 0.1)']; // Slightly more visible but still subtle
    const speedBase = 0.6; // Slightly faster for more energy

    class Particle {
        constructor() {
            this.reset();
            // Randomize initial position to fill the screen
            this.x = Math.random() * width;
            this.y = Math.random() * height;
        }

        reset() {
            this.x = Math.random() * width;
            this.y = height + 50; // Start just below screen
            this.speed = (Math.random() * 0.6 + 0.3) * speedBase;
            this.size = Math.random() * 18 + 12; // Font size between 12px and 30px
            this.symbol = symbols[Math.floor(Math.random() * symbols.length)];
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.04; // Slightly more rotation
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
            ctx.fillStyle = this.color;

            // Use monospace for code feel, standard sans for math often looks better or just mix
            ctx.font = `700 ${this.size}px "Consolas", "Monaco", "Inter", monospace`;

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
        }
    }

    function init() {
        resize();
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
        loop();
    }

    function loop() {
        // Respect reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(loop);
    }

    window.addEventListener('resize', () => {
        resize();
    });

    // Start
    init();

})();
