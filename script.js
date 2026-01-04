/* --- 1. PRELOADER LOGIC --- */
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('loaded');
        // Start typing effect only after load
        typeEffect();
    }, 2200); // 2.2s artificial delay for the 'Load' animation
});

/* --- 2. CUSTOM CURSOR & HOVER --- */
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    // Dot follows instantly
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Outline follows with slight delay (animation in CSS transition)
    cursorOutline.style.left = `${posX}px`;
    cursorOutline.style.top = `${posY}px`;
});

// Hover Effect for links/buttons
document.querySelectorAll('.hover-trigger').forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursorOutline.classList.add('hovered');
    });
    link.addEventListener('mouseleave', () => {
        cursorOutline.classList.remove('hovered');
    });
});


/* --- 3. 3D TILT EFFECT FOR CARDS --- */
document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Calculate center
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculate rotation (Divide by specific number to control sensitivity)
        const rotateX = ((y - centerY) / 10) * -1; // Invert axis
        const rotateY = (x - centerX) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
});


/* --- 4. TYPING EFFECT (Existing) --- */
const textElement = document.querySelector('.typing-text');
const words = ["Full Stack Developer", "Java Expert", "AI/ML Enthusiast"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typeEffect = () => {
    const currentWord = words[wordIndex];
    const currentChars = currentWord.substring(0, charIndex);
    textElement.textContent = currentChars;

    let typeSpeed = isDeleting ? 50 : 100;
    if (!isDeleting && charIndex < currentWord.length) {
        charIndex++;
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
    } else {
        isDeleting = !isDeleting;
        typeSpeed = 1500;
        if (!isDeleting) {
            wordIndex = (wordIndex + 1) % words.length;
        }
    }
    setTimeout(typeEffect, typeSpeed);
};

/* --- 5. INTERSECTION OBSERVER (Fade In) --- */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

/* --- 6. AUDIO SYSTEM --- */
let isSoundOn = false;
const hoverSound = document.getElementById('audio-hover');
const clickSound = document.getElementById('audio-click');
const bgMusic = document.getElementById('audio-bg');
const soundIcon = document.getElementById('sound-icon');
const soundBtn = document.querySelector('.sound-toggle');

// Toggle Sound On/Off
function toggleSound() {
    isSoundOn = !isSoundOn;
    if (isSoundOn) {
        soundIcon.classList.remove('fa-volume-mute');
        soundIcon.classList.add('fa-volume-up');
        soundBtn.classList.add('active');
        playClick(); 
        
        if (bgMusic) {
            bgMusic.volume = 0.1; 
            bgMusic.play().catch(e => console.log("Audio play blocked"));
        }
    } else {
        soundIcon.classList.remove('fa-volume-up');
        soundIcon.classList.add('fa-volume-mute');
        soundBtn.classList.remove('active');
        
        if (bgMusic) {
            bgMusic.pause();
        }
    }
}

function playHover() {
    if (isSoundOn && hoverSound) {
        hoverSound.currentTime = 0; 
        hoverSound.volume = 0.2;    
        hoverSound.play().catch(e => console.log("Audio play blocked"));
    }
}

function playClick() {
    if (isSoundOn && clickSound) {
        clickSound.currentTime = 0;
        clickSound.volume = 0.4;
        clickSound.play().catch(e => console.log("Audio play blocked"));
    }
}

// Attach sounds to all interactive elements
document.querySelectorAll('.hover-trigger, .sound-toggle').forEach(el => {
    el.addEventListener('mouseenter', playHover);
    el.addEventListener('click', playClick);
});