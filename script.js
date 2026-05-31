// Custom cursor
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  ring.style.left = e.clientX + 'px';
  ring.style.top = e.clientY + 'px';
});

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '20px';
    cursor.style.height = '20px';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '10px';
    cursor.style.height = '10px';
  });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
});

// Fade-up on scroll
const fadeObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      fadeObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-up').forEach(el => fadeObs.observe(el));

// Skill bar animation
const skillObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
      skillObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skills-list').forEach(el => skillObs.observe(el));

// Counter animation
function animateCounter(el, target, duration = 1500) {
  let start = 0;
  const step = timestamp => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    el.textContent = Math.floor(progress * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}

// Trigger counters on load (hero is visible immediately)
setTimeout(() => {
  animateCounter(document.getElementById('counter1'), 4);
  animateCounter(document.getElementById('counter2'), 1);
  animateCounter(document.getElementById('counter3'), 3);
}, 800);

// Typing / typewriter effect on hero status tag
const status = [
  'AVAILABLE FOR OPPORTUNITIES',
  'BUILDING GAME SYSTEMS',
  'LEARNING EVERY DAY',
  'OPEN TO GAME JAMS'
];
let si = 0, ci = 0, deleting = false;
const statusEl = document.getElementById('status-text');

function typeStatus() {
  const current = statuses[si];
  if (!deleting) {
    statusEl.textContent = current.slice(0, ci++);
    if (ci > current.length) {
      deleting = true;
      setTimeout(typeStatus, 2000);
      return;
    }
  } else {
    statusEl.textContent = current.slice(0, ci--);
    if (ci < 0) {
      deleting = false;
      si = (si + 1) % statuses.length;
      ci = 0;
    }
  }
  setTimeout(typeStatus, deleting ? 40 : 80);
}

typeStatus();