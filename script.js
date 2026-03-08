/* =========================================================
   ORE & DANIEL WEDDING — script.js
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  /* ─────────────────────────────────────────
     1. PRELOADER + BACKGROUND AUDIO
  ───────────────────────────────────────── */
  const preloader = document.getElementById('preloader');
  const preloader = document.getElementById('preloader');
const bgAudio = document.getElementById('bgAudio');

function startAudioOnce() {
  if (!bgAudio) return;
  bgAudio.play().catch(() => {});
  document.removeEventListener('click', startAudioOnce);
  document.removeEventListener('touchstart', startAudioOnce);
  document.removeEventListener('keydown', startAudioOnce);
}

window.addEventListener('load', () => {
  setTimeout(() => {
    if (preloader) preloader.classList.add('hidden');
    document.body.style.overflow = '';
    triggerHeroReveal();

    if (bgAudio) {
      bgAudio.play().catch(() => {});
    }
  }, 1800);
});

document.addEventListener('click', startAudioOnce);
document.addEventListener('touchstart', startAudioOnce, { passive: true });
document.addEventListener('keydown', startAudioOnce);

  /* ─────────────────────────────────────────
     2. HERO STAGGERED REVEAL
  ───────────────────────────────────────── */
  function triggerHeroReveal() {
    const heroItems = document.querySelectorAll('#hero .reveal');
    heroItems.forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 180);
    });
  }

  /* ─────────────────────────────────────────
     3. NAVBAR — scroll behaviour + hamburger
  ───────────────────────────────────────── */
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener(
    'scroll',
    () => {
      if (navbar) {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
      }
    },
    { passive: true }
  );

  if (hamburger && navLinks && navbar) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
      navbar.classList.toggle('menu-open');
    });

    navLinks.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        navbar.classList.remove('menu-open');
      });
    });
  }

  /* ─────────────────────────────────────────
     4. SCROLL REVEAL (IntersectionObserver)
  ───────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal:not(#hero .reveal)');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const delay = parseInt(entry.target.dataset.delay) || 0;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  revealEls.forEach((el) => observer.observe(el));

  /* ─────────────────────────────────────────
     5. COUNTDOWN TIMER
  ───────────────────────────────────────── */
  const weddingDate = new Date('2026-05-30T00:00:00');

  function updateCountdown() {
    const daysEl = document.getElementById('cd-days');
    const hoursEl = document.getElementById('cd-hours');
    const minsEl = document.getElementById('cd-mins');
    const secsEl = document.getElementById('cd-secs');

    if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

    const now = new Date();
    const diff = weddingDate - now;

    if (diff <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minsEl.textContent = '00';
      secsEl.textContent = '00';
      return;
    }

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);

    const pad = (n) => String(n).padStart(2, '0');

    daysEl.textContent = pad(days);
    hoursEl.textContent = pad(hours);
    minsEl.textContent = pad(mins);
    secsEl.textContent = pad(secs);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ─────────────────────────────────────────
     6. GALLERY LIGHTBOX
  ───────────────────────────────────────── */
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  const lbClose = document.getElementById('lbClose');
  const lbPrev = document.getElementById('lbPrev');
  const lbNext = document.getElementById('lbNext');
  const lbCounter = document.getElementById('lbCounter');

  if (
    galleryItems.length &&
    lightbox &&
    lbImg &&
    lbClose &&
    lbPrev &&
    lbNext &&
    lbCounter
  ) {
    const images = Array.from(galleryItems)
      .map((item) => item.querySelector('img'))
      .filter(Boolean)
      .map((img) => img.src);

    let currentIndex = 0;

    function openLightbox(index) {
      currentIndex = index;
      lbImg.src = images[index];
      lbCounter.textContent = `${index + 1} / ${images.length}`;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }

    function navigate(dir) {
      currentIndex = (currentIndex + dir + images.length) % images.length;
      lbImg.style.opacity = '0';
      lbImg.style.transform = 'scale(0.97)';
      setTimeout(() => {
        lbImg.src = images[currentIndex];
        lbCounter.textContent = `${currentIndex + 1} / ${images.length}`;
        lbImg.style.opacity = '1';
        lbImg.style.transform = 'scale(1)';
      }, 200);
    }

    lbImg.style.transition = 'opacity 0.2s, transform 0.2s';

    galleryItems.forEach((item, i) => {
      item.addEventListener('click', () => openLightbox(i));
    });

    lbClose.addEventListener('click', closeLightbox);
    lbPrev.addEventListener('click', () => navigate(-1));
    lbNext.addEventListener('click', () => navigate(1));

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigate(-1);
      if (e.key === 'ArrowRight') navigate(1);
    });

    let touchStartX = 0;
    lightbox.addEventListener(
      'touchstart',
      (e) => {
        touchStartX = e.touches[0].clientX;
      },
      { passive: true }
    );

    lightbox.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 50) navigate(dx < 0 ? 1 : -1);
    });
  }

  /* ─────────────────────────────────────────
     7. VIDEO PLAYER CUSTOM CONTROL
  ───────────────────────────────────────── */
  const video = document.getElementById('weddingVideo');
  const playBtn = document.getElementById('videoPlayBtn');

  if (video && playBtn) {
    function togglePlay() {
      if (video.paused) {
        video.play();
        playBtn.classList.add('hidden');
      } else {
        video.pause();
        playBtn.classList.remove('hidden');
      }
    }

    playBtn.addEventListener('click', togglePlay);
    video.addEventListener('click', togglePlay);
    video.addEventListener('ended', () => playBtn.classList.remove('hidden'));
    video.addEventListener('pause', () => playBtn.classList.remove('hidden'));
    video.addEventListener('play', () => playBtn.classList.add('hidden'));

    if (bgAudio) {
      video.addEventListener('play', () => bgAudio.pause());
      video.addEventListener('pause', () => {
        bgAudio.play().catch(() => {});
      });
      video.addEventListener('ended', () => {
        bgAudio.play().catch(() => {});
      });
    }
  }

  /* ─────────────────────────────────────────
     8. RSVP FORM
  ───────────────────────────────────────── */
  const rsvpSubmit = document.getElementById('rsvpSubmit');
  const rsvpForm = document.getElementById('rsvpForm');
  const rsvpSuccess = document.getElementById('rsvpSuccess');

  if (rsvpSubmit && rsvpForm && rsvpSuccess) {
    rsvpSubmit.addEventListener('click', () => {
      const nameEl = document.getElementById('fname');
      const emailEl = document.getElementById('femail');
      const attendEl = document.getElementById('fattend');

      if (!nameEl || !emailEl || !attendEl) return;

      const name = nameEl.value.trim();
      const email = emailEl.value.trim();
      const attend = attendEl.value;

      if (!name) {
        shake(nameEl);
        return;
      }

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        shake(emailEl);
        return;
      }

      if (!attend) {
        shake(attendEl);
        return;
      }

      rsvpSubmit.textContent = 'Sending…';
      rsvpSubmit.disabled = true;

      setTimeout(() => {
        rsvpForm.classList.add('hidden');
        rsvpSuccess.classList.remove('hidden');
      }, 1200);
    });
  }

  function shake(el) {
    el.style.borderColor = '#c0392b';
    el.animate(
      [
        { transform: 'translateX(0)' },
        { transform: 'translateX(-8px)' },
        { transform: 'translateX(8px)' },
        { transform: 'translateX(-5px)' },
        { transform: 'translateX(0)' }
      ],
      { duration: 400, easing: 'ease-in-out' }
    );
    el.addEventListener(
      'focus',
      () => {
        el.style.borderColor = '';
      },
      { once: true }
    );
  }

  /* ─────────────────────────────────────────
     9. SMOOTH ACTIVE NAV LINK HIGHLIGHT
  ───────────────────────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navAs = document.querySelectorAll('.nav-links a');

  if (sections.length && navAs.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          navAs.forEach((a) => {
            a.style.color = '';
            if (a.getAttribute('href') === '#' + entry.target.id) {
              a.style.color = 'var(--gold)';
            }
          });
        });
      },
      { threshold: 0.4 }
    );

    sections.forEach((sec) => sectionObserver.observe(sec));
  }

  /* ─────────────────────────────────────────
     10. PARALLAX — hero leaves subtle float
  ───────────────────────────────────────── */
  const heroLeaves = document.querySelectorAll('.hero-leaves');

  window.addEventListener(
    'scroll',
    () => {
      const y = window.scrollY;
      heroLeaves.forEach((leaf, i) => {
        const dir = i === 0 ? -1 : 1;
        leaf.style.transform = `translateY(${y * 0.12 * dir}px)`;
      });
    },
    { passive: true }
  );
});
