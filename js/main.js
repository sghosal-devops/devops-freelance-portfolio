// ── Navbar scroll effect ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Hamburger menu ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ── Typing animation in hero terminal ──
const commands = [
  { cmd: ' cat availability.txt', output: 'status: <span class="t-green">available</span> · weekends &amp; off-hours · IST timezone' },
  { cmd: ' echo $STACK',         output: 'AWS · OCI · GCP · K8s · Docker · Terraform · CI/CD · Linux' },
  { cmd: ' uptime --pretty',     output: '5+ years of DevOps · zero drama deployments · always learning' },
];

let cmdIndex = 0;
const typedCmd = document.getElementById('typedCmd');
const typedCursor = document.getElementById('typedCursor');
const typedOutput = document.getElementById('typedOutput');

function typeCommand(text, cb) {
  let i = 0;
  typedCmd.textContent = '';
  typedOutput.innerHTML = '';
  const interval = setInterval(() => {
    typedCmd.textContent += text[i];
    i++;
    if (i >= text.length) {
      clearInterval(interval);
      setTimeout(cb, 400);
    }
  }, 55);
}

function showOutput(html, cb) {
  typedOutput.innerHTML = html;
  setTimeout(cb, 2400);
}

function eraseCommand(cb) {
  const text = typedCmd.textContent;
  let i = text.length;
  const interval = setInterval(() => {
    typedCmd.textContent = text.slice(0, i);
    i--;
    if (i < 0) {
      clearInterval(interval);
      typedOutput.innerHTML = '';
      setTimeout(cb, 300);
    }
  }, 30);
}

function runLoop() {
  const { cmd, output } = commands[cmdIndex % commands.length];
  cmdIndex++;
  typeCommand(cmd, () => {
    showOutput(output, () => {
      eraseCommand(runLoop);
    });
  });
}

// Start typing after hero fade-in settles
setTimeout(runLoop, 2000);

// ── Scroll reveal ──
const revealEls = document.querySelectorAll(
  '.skill-category, .service-card, .contact-link, .about-card, .stat'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
  observer.observe(el);
});

// ── Endorsements Slider ──
const track = document.getElementById('sliderTrack');
const prevBtn = document.getElementById('sliderPrev');
const nextBtn = document.getElementById('sliderNext');
const dotsWrap = document.getElementById('sliderDots');

if (track) {
  const cards = track.querySelectorAll('.endorse-card');
  const total = cards.length;
  let current = 0;

  // build dots
  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(calc(-${current * 100}% - ${current * 24}px))`;
    dotsWrap.querySelectorAll('.slider-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
    prevBtn.disabled = false;
    nextBtn.disabled = false;
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));

  // auto-advance every 5s
  let autoplay = setInterval(() => goTo(current + 1), 5000);
  [prevBtn, nextBtn].forEach(btn => {
    btn.addEventListener('click', () => { clearInterval(autoplay); autoplay = setInterval(() => goTo(current + 1), 5000); });
  });

  // touch/swipe support
  let startX = 0;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
  });
}

// ── Services Interactive Panel ──
const svcMenuItems = document.querySelectorAll('.svc-menu-item');
const svcDetails = document.querySelectorAll('.svc-detail');

svcMenuItems.forEach(item => {
  item.addEventListener('click', () => {
    const idx = item.dataset.svc;
    svcMenuItems.forEach(i => i.classList.remove('active'));
    svcDetails.forEach(d => d.classList.remove('active'));
    item.classList.add('active');
    document.querySelector(`.svc-detail[data-svc="${idx}"]`).classList.add('active');
  });
});

// ── Accordion for Experience & Projects ──
document.querySelectorAll('.accordion-trigger').forEach(trigger => {
  trigger.addEventListener('click', (e) => {
    if (e.target.closest('a')) return; // don't toggle on link clicks
    const card = trigger.closest('.accordion-card');
    const isOpen = card.classList.contains('open');
    card.classList.toggle('open', !isOpen);
  });
});

// ── 3D Tag Sphere ──
(function () {
  const container = document.getElementById('sphereContainer');
  if (!container) return;

  const tools = [
    'AWS', 'GCP', 'OCI', 'Azure', 'Docker', 'Kubernetes', 'Terraform',
    'Ansible', 'Helm', 'ArgoCD', 'FluxCD', 'Jenkins', 'GitHub Actions',
    'GitLab CI', 'Prometheus', 'Grafana', 'Loki', 'Jaeger', 'ELK Stack',
    'Datadog', 'Vault', 'Trivy', 'OPA', 'Istio', 'Cilium', 'Karpenter',
    'KEDA', 'Pulumi', 'Packer', 'Traefik', 'Nginx', 'Envoy', 'Harbor',
    'ECR', 'Falco', 'Snyk', 'SonarQube', 'OpenTelemetry', 'Fluentd',
    'Kafka', 'Redis', 'PostgreSQL', 'Linux', 'Bash', 'Python', 'Go',
    'HCL', 'Crossplane', 'VictoriaMetrics', 'Cosign'
  ];

  const isMobile = window.innerWidth < 600;
  const R = isMobile ? 140 : 210;
  const golden = Math.PI * (1 + Math.sqrt(5));
  const N = tools.length;
  const tags = [];
  const pos = [];

  for (let i = 0; i < N; i++) {
    const phi = Math.acos(1 - 2 * (i + 0.5) / N);
    const theta = golden * i;
    pos.push({ phi, theta });

    const tag = document.createElement('span');
    tag.className = 'sphere-tag';
    tag.textContent = tools[i];
    container.appendChild(tag);
    tags.push(tag);
  }

  let angle = 0;
  let paused = false;
  container.addEventListener('mouseenter', () => { paused = true; });
  container.addEventListener('mouseleave', () => { paused = false; });

  function frame() {
    if (!paused) angle += 0.004;
    for (let i = 0; i < N; i++) {
      const { phi, theta } = pos[i];
      const x = R * Math.sin(phi) * Math.cos(theta + angle);
      const y = R * Math.cos(phi);
      const z = R * Math.sin(phi) * Math.sin(theta + angle);
      const zNorm = (z + R) / (2 * R);
      const sc = 0.55 + 0.5 * zNorm;
      const op = 0.15 + 0.85 * zNorm;
      tags[i].style.transform = `translate(-50%,-50%) translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,${z.toFixed(1)}px) scale(${sc.toFixed(3)})`;
      tags[i].style.opacity = op.toFixed(3);
      tags[i].style.zIndex = Math.round(z + R);
    }
    requestAnimationFrame(frame);
  }
  frame();
})();

// ── Smooth scroll for anchor links ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
