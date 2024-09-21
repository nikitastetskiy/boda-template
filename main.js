const parallax = document.getElementById("home-img-lg");
const parallax1 = document.getElementById("parallax1");
const parallax2 = document.getElementById("parallax2");

function copyToClipboard() {
  const textToCopy = document.getElementById('iban').textContent;
  navigator.clipboard.writeText(textToCopy).then(() => {
    runSmallConfetti()
  }).catch(err => {
      console.error('Error al copiar el texto: ', err);
  });
}

window.addEventListener("scroll", function()
{
    let offset = window.pageYOffset;
    parallax.style.backgroundPositionX = offset*(-0.07)-100 + "px";
})


window.addEventListener("scroll", function()
{
    let offset = window.pageYOffset;
    offset-=3100;
    parallax1.style.backgroundPositionY = offset*(0.1) + "px";
})

window.addEventListener("scroll", function()
{
    let offset = window.pageYOffset;
    offset-=5800;
    parallax2.style.backgroundPositionY = offset*(-0.1) + "px";
})

function myFunction() {
    document.getElementById("check").checked = false;
  }


  
function reveal() {
var reveals = document.querySelectorAll(".reveal");
  
for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 150;
  
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
}

function updateBackgroundPosition() {
  const images = document.querySelectorAll('.timeline-img');
  images.forEach(img => {
      const rect = img.getBoundingClientRect();
      const scrollPercentage = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      const position = Math.max(0, Math.min(100, scrollPercentage * 100));
      img.style.backgroundPosition = `center ${position}%`;
  });
}

// ... (previous code remains the same) ...

// Enhanced Blue-Yellow Confetti effect with creative elements and bottom-up confetti
function runConfetti() {
  const duration = 20 * 1000; // 20 seconds
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
  }

  // Initial burst of larger confetti
  confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#0066cc', '#00aaff', '#ffcc00', '#ffee00'],
      scalar: 3,
  });

  // Bottom-up confetti with creative elements
  function shootFromBottom() {
      confetti({
          particleCount: 50,
          angle: 90,
          spread: 70,
          origin: { x: randomInRange(0, 1), y: 1.1 },
          colors: ['#0066cc', '#00aaff', '#ffcc00', '#ffee00', '#ffffff'],
          shapes: ['circle', 'square', unicorn],
          scalar: randomInRange(1, 2.5),
          drift: randomInRange(-0.5, 0.5),
          ticks: 300
      });
  }

  // Shoot bottom-up confetti every 650ms
  const bottomInterval = setInterval(shootFromBottom, 650);

  const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
          clearInterval(interval);
          clearInterval(bottomInterval);
          return;
      }

      const particleCount = 50 * (timeLeft / duration);

      // Blue confetti
      confetti(Object.assign({}, defaults, { 
          particleCount, 
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ['#0066cc', '#00aaff', '#4d94ff'],
          shapes: ['circle', 'heart'],
          scalar: randomInRange(1, 2)
      }));

      // Yellow confetti
      confetti(Object.assign({}, defaults, { 
          particleCount, 
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ['#ffcc00', '#ffee00', '#ffffa0'],
          shapes: ['circle', 'square'],
          scalar: randomInRange(1, 2)
      }));

      // Star-shaped confetti
      confetti(Object.assign({}, defaults, {
          particleCount: particleCount * 0.2,
          origin: { x: randomInRange(0.4, 0.6), y: Math.random() - 0.2 },
          colors: ['#ffffff', '#ffff66'],
          shapes: ['heart', 'star'],
          scalar: randomInRange(1.5, 2.5)
      }));

  }, 250);

  // Add some large, slow-falling elements
  const largePieces = 15;
  for (let i = 0; i < largePieces; i++) {
      setTimeout(() => {
          confetti({
              particleCount: 1,
              startVelocity: 10,
              spread: 45,
              origin: { x: Math.random(), y: -0.1 },
              colors: ['#0066cc', '#ffcc00'],
              shapes: ['heart', 'square', 'star'],
              scalar: randomInRange(3, 5),
              drift: randomInRange(-0.5, 0.5),
              ticks: 300
          });
      }, randomInRange(0, duration));
  }

  // Add swirling confetti
  const swirlCount = 5;
  for (let i = 0; i < swirlCount; i++) {
      const swirlDuration = 5000;
      const swirlStartTime = randomInRange(0, duration - swirlDuration);
      setTimeout(() => {
          const startX = Math.random();
          const startY = Math.random();
          const swirlEnd = Date.now() + swirlDuration;
          const swirlInterval = setInterval(() => {
              const timeLeft = swirlEnd - Date.now();
              if (timeLeft <= 0) {
                  clearInterval(swirlInterval);
                  return;
              }
              const angle = (timeLeft / swirlDuration) * Math.PI * 8;
              const radius = 0.1 * (1 - timeLeft / swirlDuration);
              confetti({
                  particleCount: 2,
                  startVelocity: 1,
                  spread: 30,
                  origin: {
                      x: startX + Math.cos(angle) * radius,
                      y: startY + Math.sin(angle) * radius - 0.2
                  },
                  colors: ['#0066cc', '#ffcc00'],
                  shapes: ['star'],
                  scalar: 1.5,
                  ticks: 60
              });
          }, 50);
      }, swirlStartTime);
  }

  // Add pulsating confetti burst
  const pulseCount = 3;
  for (let i = 0; i < pulseCount; i++) {
      setTimeout(() => {
          confetti({
              particleCount: 100,
              spread: 360,
              origin: { x: 0.5, y: 0.5 },
              colors: ['#0066cc', '#00aaff', '#ffcc00', '#ffee00', '#ffffff'],
              shapes: ['heart', 'square', 'star'],
              scalar: randomInRange(1, 2),
              ticks: 100,
              gravity: 0.8
          });
      }, randomInRange(duration * 0.2, duration * 0.8));
  }
}

// Run confetti on page load
window.addEventListener('load', runConfetti);

// Function to trigger confetti on demand
function triggerConfetti() {
  runConfetti();
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

// ... (rest of the previous code remains the same) ...

window.addEventListener('scroll', updateBackgroundPosition);
window.addEventListener('resize', updateBackgroundPosition);
updateBackgroundPosition(); // Initial call
  
window.addEventListener("scroll", reveal);


// ... (previous JavaScript remains the same) ...

function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

function updateParallax() {
    if (window.innerWidth <= 1000 || isIOS()) {
        parallax.style.backgroundAttachment = 'scroll';
        parallax1.style.backgroundAttachment = 'scroll';
        parallax2.style.backgroundAttachment = 'scroll';
    } else {
        parallax.style.backgroundAttachment = 'fixed';
        parallax1.style.backgroundAttachment = 'fixed';
        parallax2.style.backgroundAttachment = 'fixed';
    }
}

window.addEventListener("scroll", function() {
    if (window.innerWidth > 1000 && !isIOS()) {
        let offset = window.pageYOffset;
        parallax.style.backgroundPositionX = offset*(-0.07)-100 + "px";
    }
});

window.addEventListener("scroll", function() {
    if (window.innerWidth > 1000 && !isIOS()) {
        let offset = window.pageYOffset;
        offset -= 3100;
        parallax1.style.backgroundPositionY = offset*(0.1) + "px";
    }
});

window.addEventListener("scroll", function() {
    if (window.innerWidth > 1000 && !isIOS()) {
        let offset = window.pageYOffset;
        offset -= 5800;
        parallax2.style.backgroundPositionY = offset*(-0.1) + "px";
    }
});

window.addEventListener('resize', updateParallax);
window.addEventListener('load', updateParallax);

// ... (rest of the JavaScript remains the same) ...