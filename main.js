// JavaScript optimizations for main.js

const isIPhone = /iPhone|iPad|iPod/i.test(navigator.userAgent);
const offsetElements = {
  homeImg: document.getElementById("home-img-lg"),
  parallax1: document.getElementById("parallax1"),
  parallax2: document.getElementById("parallax2")
};

// Function to copy IBAN to clipboard and run confetti
function copyToClipboard() {
  const textToCopy = document.getElementById('iban').textContent;
  navigator.clipboard.writeText(textToCopy).then(() => {
    runSmallConfetti();
  }).catch(err => {
    console.error('Error al copiar el texto: ', err);
  });
}

// Apply parallax effect
function applyParallax() {
  let offset = window.pageYOffset;

  if (offsetElements.homeImg) {
    offsetElements.homeImg.style.backgroundPositionX = offset * -0.2 + "px";
  }
  if (offsetElements.parallax1) {
    // const baseOffset = isIPhone ? 3400 : 3800;
    // const speed = isIPhone ? 0.4 : 0.7;
    // offsetElements.parallax1.style.backgroundPositionY = (offset - baseOffset) * speed + "px";
    let offset = window.pageYOffset;
    offset-=300;
    parallax1.style.backgroundPositionY = offset*(0.1) + "px";
  }
  if (offsetElements.parallax2) {
    offsetElements.parallax2.style.backgroundPositionY = (offset - 3400) * -0.3 + "px";
  }
}

// Throttle scroll event using requestAnimationFrame
function smoothParallax() {
  requestAnimationFrame(applyParallax);
}
window.addEventListener("scroll", smoothParallax);

// Hide navigation checkbox after clicking a link
function myFunction() {
  document.getElementById("check").checked = false;
}

// Reveal elements when they enter the viewport
function reveal() {
  const reveals = document.querySelectorAll(".reveal");
  const windowHeight = window.innerHeight;
  reveals.forEach(reveal => {
    const elementTop = reveal.getBoundingClientRect().top;
    const elementVisible = 150;
    if (elementTop < windowHeight - elementVisible) {
      reveal.classList.add("active");
    } else {
      reveal.classList.remove("active");
    }
  });
}
window.addEventListener("scroll", reveal);

// Update background positions for images in the timeline
function updateBackgroundPosition() {
  const images = document.querySelectorAll('.timeline-img');
  images.forEach(img => {
    const rect = img.getBoundingClientRect();
    const scrollPercentage = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
    const position = Math.max(0, Math.min(100, scrollPercentage * 100));
    img.style.backgroundPosition = `center ${position}%`;
  });
}
window.addEventListener('scroll', updateBackgroundPosition);
window.addEventListener('resize', updateBackgroundPosition);
updateBackgroundPosition();

// Run confetti on page load
window.addEventListener('load', runConfetti);

// Confetti functions
function runConfetti() {
  const duration = 3000; // 3 seconds
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  // Initial burst of confetti
  confetti({
    particleCount: 70,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#0066cc', '#00aaff', '#ffcc00', '#ffee00'],
    scalar: 3,
  });

  // Shoot confetti from the bottom
  const bottomInterval = setInterval(() => {
    confetti({
      particleCount: 50,
      angle: 90,
      spread: 70,
      origin: { x: randomInRange(0, 1), y: 1.1 },
      colors: ['#0066cc', '#00aaff', '#ffcc00', '#ffee00', '#ffffff'],
      shapes: ['circle', 'square'],
      scalar: randomInRange(1, 2.5),
      drift: randomInRange(-0.5, 0.5),
      ticks: 300
    });
  }, 650);

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) {
      clearInterval(interval);
      clearInterval(bottomInterval);
      return;
    }

    const particleCount = 50 * (timeLeft / duration);
    confetti({
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      colors: ['#0066cc', '#00aaff', '#4d94ff'],
      shapes: ['circle', 'heart'],
      scalar: randomInRange(1, 2)
    });
    confetti({
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      colors: ['#ffcc00', '#ffee00', '#ffffa0'],
      shapes: ['circle', 'square'],
      scalar: randomInRange(1, 2)
    });
    confetti({
      particleCount: particleCount * 0.2,
      origin: { x: randomInRange(0.4, 0.6), y: Math.random() - 0.2 },
      colors: ['#ffffff', '#ffff66'],
      shapes: ['heart', 'heart'],
      scalar: randomInRange(1.5, 2.5)
    });
  }, 250);

  // Large, slow-falling confetti pieces
  for (let i = 0; i < 15; i++) {
    setTimeout(() => {
      confetti({
        particleCount: 1,
        startVelocity: 10,
        spread: 45,
        origin: { x: Math.random(), y: -0.1 },
        colors: ['#0066cc', '#ffcc00'],
        shapes: ['heart', 'square', 'heart'],
        scalar: randomInRange(3, 5),
        drift: randomInRange(-0.5, 0.5),
        ticks: 300
      });
    }, randomInRange(0, duration));
  }
}

function runSmallConfetti() {
  confetti({
    colors: [''],
  });

  var scalar = 2;
  var heart1 = confetti.shapeFromText({ text: '💙', scalar });
  var heart2 = confetti.shapeFromText({ text: '💛', scalar });
  var heart3 = confetti.shapeFromText({ text: '🥳', scalar });
  var heart4 = confetti.shapeFromText({ text: '🩵', scalar });
  var heart5 = confetti.shapeFromText({ text: '💞', scalar });
  var heart6 = confetti.shapeFromText({ text: '🤍', scalar });

  var defaults = {
    spread: 360,
    ticks: 90,
    gravity: 0,
    decay: 0.99,
    startVelocity: 20,
    shapes: [heart1, heart2, heart3, heart4, heart5, heart6],
    scalar
  };

  function shoot() {
    confetti({
      ...defaults,
      particleCount: 30
    });

    confetti({
      ...defaults,
      particleCount: 5,
      flat: true
    });
  }

  setTimeout(shoot, 0);
  setTimeout(shoot, 100);
  setTimeout(shoot, 200);
}

// Event listeners for scrolling to reveal and background position update
window.addEventListener('scroll', updateBackgroundPosition);
window.addEventListener('resize', updateBackgroundPosition);
window.addEventListener('scroll', reveal);
