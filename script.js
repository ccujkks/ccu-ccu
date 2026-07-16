/* ==========================================================
   CCU Premium Startup Website - script.js (Fully Corrected)
==========================================================*/

// =====================================
// PREMIUM LOADER
// =====================================
const percent = document.querySelector(".loader-percent");
const progress = document.querySelector(".loader-progress");
const status = document.querySelector(".loader-status");

const messages = [
    "Initializing Climate Intelligence...",
    "Loading Carbon Models...",
    "Preparing AI Engine...",
    "Connecting Sensor Network...",
    "Launching Platform..."
];

let value = 0;
let msg = 0;

const loading = setInterval(() => {
    value++;
    if (progress) progress.style.width = value + "%";
    if (percent) percent.innerHTML = value + "%";

    if (value % 20 === 0 && status && msg < messages.length) {
        status.innerHTML = messages[msg];
        msg++;
    }

    if (value >= 100) {
        clearInterval(loading);
        startWebsite();
    }
}, 35);

function startWebsite() {
    const tl = gsap.timeline();
    
    if (document.querySelector(".loader-logo span")) {
        tl.to(".loader-logo span", {
            y: 0,
            opacity: 1,
            stagger: .15,
            duration: .8,
            ease: "back.out(2)"
        });
    }
    
    if (document.querySelector(".loader-title")) {
        tl.to(".loader-title", {
            opacity: 1,
            y: -10,
            duration: .8
        }, "-=.5");
    }

    if (document.getElementById("loader")) {
        tl.to("#loader", {
            y: "-100%",
            duration: 1.3,
            ease: "power4.inOut",
            delay: .6
        })
        .set("#loader", {
            display: "none"
        });
    }
}

// GSAP Plugins Setup
if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// LENIS SMOOTH SCROLL
// LENIS SMOOTH SCROLL INTEGRATION
let lenis;
if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
        duration: 1.2,
        smoothWheel: true,
        smoothTouch: false,
    });

    // CRITICAL: Update ScrollTrigger on every single Lenis scroll tick
    lenis.on('scroll', ScrollTrigger.update);

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
}

// AOS INITIALIZATION
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 1000,
        once: true,
        easing: "ease-out-cubic"
    });
}

// NAVBAR SCROLL ANIMATION
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
    if (!header) return;
    if (window.scrollY > 60) {
        gsap.to(header, { background: "rgba(4,8,20,.90)", backdropFilter: "blur(25px)", duration: .3 });
    } else {
        gsap.to(header, { background: "rgba(4,8,20,.45)", backdropFilter: "blur(0px)", duration: .3 });
    }
});

// HERO INITIAL REVEAL TIMELINE
const heroTimeline = gsap.timeline();
if (document.querySelector(".hero")) {
    heroTimeline
        .from(".logo", { y: -40, opacity: 0, duration: .8 })
        .from(".nav-links li", { y: -30, opacity: 0, stagger: .08, duration: .5 }, "-=0.5")
        .from(".contact-btn", { scale: .5, opacity: 0, duration: .5 }, "-=0.3")
        .from(".tag", { x: -80, opacity: 0, duration: .8 }, "-=0.4")
        .from(".hero h1", { y: 80, opacity: 0, duration: 1 }, "-=0.6")
        .from(".hero p", { y: 50, opacity: 0, duration: .8 }, "-=.5")
        .from(".hero-buttons", { y: 50, opacity: 0, duration: .7 }, "-=.4")
        .from(".glass-card", { scale: .8, opacity: 0, duration: 1 }, "-=.6");
}

// FLOATING HERO CARD
if (document.querySelector(".glass-card")) {
    gsap.to(".glass-card", { y: 20, repeat: -1, yoyo: true, ease: "sine.inOut", duration: 3 });
}

// CUSTOM CURSOR & GLOW EFFECT
const cursor = document.querySelector(".cursor");
const blur = document.querySelector(".cursor-blur");

document.addEventListener("mousemove", (e) => {
    if (cursor) gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: .08 });
    if (blur) gsap.to(blur, { x: e.clientX, y: e.clientY, duration: .35 });
});

// CURSOR SCALE HANDLERS
document.querySelectorAll("a, button, .card, .tech-card, .market-card, .business-card").forEach(el => {
    el.addEventListener("mouseenter", () => { if (cursor) gsap.to(cursor, { scale: 2, duration: .25 }); });
    el.addEventListener("mouseleave", () => { if (cursor) gsap.to(cursor, { scale: 1, duration: .25 }); });
});

// BUTTON MAGNET EFFECT
document.querySelectorAll(".primary-btn, .secondary-btn, .contact-btn").forEach(button => {
    button.addEventListener("mousemove", (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(button, { x: x * .18, y: y * .18, duration: .3 });
    });
    button.addEventListener("mouseleave", () => {
        gsap.to(button, { x: 0, y: 0, duration: .35 });
    });
});

// ==========================================================
// THREE.JS HERO CANVAS SCENE
// ==========================================================
const canvasContainer = document.getElementById("hero-canvas");

if (canvasContainer && typeof THREE !== 'undefined') {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 35;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    canvasContainer.appendChild(renderer.domElement);

    // Particles Setup
    const particleCount = 2000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 120;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 90;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 90;
        
        // Emerald Mint Accent tones
        colors[i * 3] = 0.0;
        colors[i * 3 + 1] = 0.9;
        colors[i * 3 + 2] = 0.45;
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const material = new THREE.PointsMaterial({ size: 0.25, vertexColors: true, transparent: true, opacity: 0.85 });
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Dynamic Spheres
    const sphereGeometry = new THREE.SphereGeometry(2, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x00e676, transparent: true, opacity: 0.12 });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(-8, 5, -10);
    scene.add(sphere);

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.8));

    // Mouse Parallax Trackers
    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', e => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 8;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 8;
    });

    // Animation Loop
    function animateScene() {
        requestAnimationFrame(animateScene);
        particles.rotation.y += 0.0006;
        particles.rotation.x += 0.0001;
        sphere.position.y = Math.sin(Date.now() * 0.001) * 2;
        
        camera.position.x += (mouseX - camera.position.x) * 0.05;
        camera.position.y += (-mouseY - camera.position.y) * 0.05;
        camera.lookAt(scene.position);
        
        renderer.render(scene, camera);
    }
    animateScene();

    // Window Resize Response
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Scroll Linked Particle Speed Shifts via ScrollTrigger
    gsap.to(particles.rotation, {
        y: Math.PI * 2,
        duration: 60,
        repeat: -1,
        ease: 'none'
    });

    ScrollTrigger.create({
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: self => {
            particles.rotation.x = self.progress * 0.5;
        }
    });
}

/* ==========================================================
   PROCESS ANIMATION (With Failsafe Fallbacks)
==========================================================*/
const processSteps = document.querySelectorAll(".step");

if (processSteps.length > 0 && typeof gsap !== 'undefined') {
    processSteps.forEach((step, index) => {
        gsap.fromTo(step, 
            {
                opacity: 0,
                y: 50
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: step,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            }
        );
    });
} else {
    // Failsafe: If GSAP fails or is missing, force everything to be visible immediately!
    document.querySelectorAll(".step").forEach(step => {
        step.style.opacity = "1";
        step.style.transform = "none";
    });
}

/* ==========================================================
   SAFE TEXT REVEAL ANIMATION 
==========================================================*/
document.querySelectorAll(".animate-text").forEach(title => {
    const textContent = title.innerText;
    const chars = textContent.split("");
    title.innerHTML = "";
    
    chars.forEach(letter => {
        const span = document.createElement("span");
        span.innerHTML = letter === " " ? "&nbsp;" : letter;
        span.style.opacity = "0";
        span.style.display = "inline-block";
        span.style.transform = "translateY(15px)";
        title.appendChild(span);
    });

    gsap.to(title.children, {
        opacity: 1,
        y: 0,
        stagger: 0.03,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
            trigger: title,
            start: "top 85%"
        }
    });
});
/* ==========================================================
   COUNTER ANIMATIONS
==========================================================*/
document.querySelectorAll("[data-count]").forEach(counter => {
    const target = +counter.dataset.count;
    ScrollTrigger.create({
        trigger: counter,
        start: "top 85%",
        once: true,
        onEnter: () => {
            let obj = { value: 0 };
            gsap.to(obj, {
                value: target,
                duration: 2,
                ease: "power2.out",
                onUpdate: () => {
                    counter.innerHTML = Math.floor(obj.value).toLocaleString();
                }
            });
        }
    });
});

/* ==========================================================
   MARKET CARD FLOATS
==========================================================*/
gsap.utils.toArray(".market-card, .business-card").forEach(card => {
    gsap.to(card, {
        y: -12,
        repeat: -1,
        yoyo: true,
        duration: 2 + Math.random() * 2,
        ease: "sine.inOut"
    });
});

/* ==========================================================
   DYNAMIC TEXT REVEAL ANIMATION
==========================================================*/
document.querySelectorAll(".section-title h2").forEach(title => {
    const chars = title.innerText.split("");
    title.innerHTML = "";
    chars.forEach(letter => {
        const span = document.createElement("span");
        span.innerHTML = letter === " " ? "&nbsp;" : letter;
        span.style.opacity = "0";
        span.style.display = "inline-block";
        span.style.transform = "translateY(20px)";
        title.appendChild(span);
    });

    gsap.to(title.children, {
        opacity: 1,
        y: 0,
        stagger: .03,
        duration: .6,
        scrollTrigger: {
            trigger: title,
            start: "top 85%"
        }
    });
});

/* ==========================================================
   SCROLL PROGRESS BAR & SCROLL INDICATORS
==========================================================*/
const progressBar = document.createElement("div");
progressBar.id = "progress-bar";
progressBar.style.position = "fixed";
progressBar.style.top = "0";
progressBar.style.left = "0";
progressBar.style.height = "4px";
progressBar.style.background = "#00E676";
progressBar.style.zIndex = "1000";
document.body.appendChild(progressBar);

window.addEventListener("scroll", () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    if (total > 0) {
        const percent = (window.scrollY / total) * 100;
        progressBar.style.width = percent + "%";
    }
});

// Scroll Indicator visibility controller
const indicator = document.querySelector(".scroll-indicator");
if (indicator) {
    ScrollTrigger.create({
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        onUpdate: self => {
            indicator.style.opacity = 1 - self.progress;
        }
    });
}

/* ==========================================================
   DYNAMIC PIPELINE & MOLECULE FLOW (SVG PATH RENDERING)
==========================================================*/
const processSection = document.querySelector(".process");
if (processSection) {
    const svgFlow = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgFlow.setAttribute("class", "carbon-flow");
    svgFlow.setAttribute("viewBox", "0 0 1200 500");
    svgFlow.style.position = "absolute";
    svgFlow.style.top = "0";
    svgFlow.style.left = "0";
    svgFlow.style.width = "100%";
    svgFlow.style.height = "100%";
    svgFlow.style.pointerEvents = "none";
    svgFlow.style.zIndex = "1";
    processSection.appendChild(svgFlow);

    const pipePath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    pipePath.setAttribute("id", "pipe");
    pipePath.setAttribute("fill", "none");
    pipePath.setAttribute("stroke", "rgba(0, 230, 118, 0.05)");
    pipePath.setAttribute("stroke-width", "8");
    pipePath.setAttribute("d", "M 100 100 Q 400 50 600 250 T 1100 400"); 
    svgFlow.appendChild(pipePath);

    const glowPath = pipePath.cloneNode();
    glowPath.setAttribute("stroke", "#00E676");
    glowPath.setAttribute("stroke-width", "3");
    glowPath.setAttribute("stroke-linecap", "round");
    svgFlow.appendChild(glowPath);

    // Process molecule paths safely
    setTimeout(() => {
        const flowLength = glowPath.getTotalLength();
        glowPath.style.strokeDasharray = flowLength;
        glowPath.style.strokeDashoffset = flowLength;

        gsap.to(glowPath, {
            strokeDashoffset: 0,
            duration: 3,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".process",
                start: "top 70%"
            }
        });

        // Generate flow molecules tracking along custom path bounds
        for (let i = 0; i < 12; i++) {
            const molecule = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            molecule.setAttribute("r", "5");
            molecule.setAttribute("fill", "#64FFDA");
            svgFlow.appendChild(molecule);

            function moveMolecule() {
                let progressObj = { value: 0 };
                gsap.to(progressObj, {
                    value: flowLength,
                    duration: 6,
                    repeat: -1,
                    ease: "none",
                    delay: i * 0.5,
                    onUpdate: () => {
                        try {
                            const point = pipePath.getPointAtLength(progressObj.value);
                            molecule.setAttribute("cx", point.x);
                            molecule.setAttribute("cy", point.y);
                        } catch(e) {}
                    }
                });
            }
            moveMolecule();
        }
    }, 200);
}

// Card Hover Spotlights
document.querySelectorAll(".feature-card, .market-card, .business-card, .step").forEach(card => {
    card.addEventListener("mousemove", e => {
        const rect = card.getBoundingClientRect();
        card.style.background = `radial-gradient(circle at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, rgba(0,230,118,.12), rgba(255,255,255,.02))`;
    });
    card.addEventListener("mouseleave", () => {
        card.style.background = "";
    });
});

console.log("Premium Production Ready System Loaded Perfectly.");