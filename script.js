/* =========================================================
   ORE & DANIEL WEDDING — script.js
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ─────────────────────────────────────────
     1. PRELOADER + BACKGROUND AUDIO
  ───────────────────────────────────────── */
  const preloader = document.getElementById('preloader');
  const bgAudio   = document.getElementById('bgAudio');

  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
      document.body.style.overflow = '';
      triggerHeroReveal();
      // attempt to start background music once preloader finishes
      if (bgAudio) {
        bgAudio.play().catch(() => {
          // autoplay may be blocked; user interaction will unpause later
        });
      }
    }, 1800);
  });
  document.body.style.overflow = 'hidden';


  /* ─────────────────────────────────────────
     2. HERO STAGGERED REVEAL
  ───────────────────────────────────────── */
  function triggerHeroReveal () {
    const heroItems = document.querySelectorAll('#hero .reveal');
    heroItems.forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 180);
    });
  }


  /* ─────────────────────────────────────────
     3. NAVBAR — scroll behaviour + hamburger
  ───────────────────────────────────────── */
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
    // ensure navbar also gets a background when menu is revealed
    navbar.classList.toggle('menu-open');
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });


  /* ─────────────────────────────────────────
     4. SCROLL REVEAL (IntersectionObserver)
  ───────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal:not(#hero .reveal)');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const delay = parseInt(entry.target.dataset.delay) || 0;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => observer.observe(el));


  /* ─────────────────────────────────────────
     5. COUNTDOWN TIMER
  ───────────────────────────────────────── */
  // target date is May 30 (current year)
  const weddingDate = new Date('2026-05-30T00:00:00');

  function updateCountdown () {
    const now  = new Date();
    const diff = weddingDate - now;

    if (diff <= 0) {
      document.getElementById('cd-days').textContent  = '00';
      document.getElementById('cd-hours').textContent = '00';
      document.getElementById('cd-mins').textContent  = '00';
      document.getElementById('cd-secs').textContent  = '00';
      return;
    }

    const days  = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins  = Math.floor((diff % 3600000)  / 60000);
    const secs  = Math.floor((diff % 60000)    / 1000);

    const pad = n => String(n).padStart(2, '0');

    document.getElementById('cd-days').textContent  = pad(days);
    document.getElementById('cd-hours').textContent = pad(hours);
    document.getElementById('cd-mins').textContent  = pad(mins);
    document.getElementById('cd-secs').textContent  = pad(secs);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);


  /* ─────────────────────────────────────────
     6. GALLERY LIGHTBOX
  ───────────────────────────────────────── */
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox     = document.getElementById('lightbox');
  const lbImg        = document.getElementById('lbImg');
  const lbClose      = document.getElementById('lbClose');
  const lbPrev       = document.getElementById('lbPrev');
  const lbNext       = document.getElementById('lbNext');
  const lbCounter    = document.getElementById('lbCounter');

  const images = Array.from(galleryItems).map(item => item.querySelector('img').src);
  let currentIndex = 0;

  function openLightbox (index) {
    currentIndex = index;
    lbImg.src = images[index];
    lbCounter.textContent = `${index + 1} / ${images.length}`;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox () {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function navigate (dir) {
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
  lbPrev.addEventListener('click',  () => navigate(-1));
  lbNext.addEventListener('click',  () => navigate(1));

  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowLeft')   navigate(-1);
    if (e.key === 'ArrowRight')  navigate(1);
  });

  // Touch swipe for lightbox
  let touchStartX = 0;
  lightbox.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  lightbox.addEventListener('touchend',   e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) navigate(dx < 0 ? 1 : -1);
  });


  /* ─────────────────────────────────────────
     7. VIDEO PLAYER CUSTOM CONTROL
  ───────────────────────────────────────── */
  const video       = document.getElementById('weddingVideo');
  const playBtn     = document.getElementById('videoPlayBtn');
  const videoWrap   = document.querySelector('.video-container');

  function togglePlay () {
    if (video.paused) {
      video.play();
      playBtn.classList.add('hidden');
    } else {
      video.pause();
      playBtn.classList.remove('hidden');
    }
  }

  playBtn.addEventListener('click',  togglePlay);
  video.addEventListener('click',    togglePlay);
  video.addEventListener('ended',    () => playBtn.classList.remove('hidden'));
  video.addEventListener('pause',    () => playBtn.classList.remove('hidden'));
  video.addEventListener('play',     () => playBtn.classList.add('hidden'));

  // sync background audio with video playback
  if (bgAudio) {
    video.addEventListener('play', () => bgAudio.pause());
    video.addEventListener('pause', () => {
      // resume music only if user didn't explicitly pause it
      if (bgAudio.paused && !video.paused) return;
      bgAudio.play().catch(() => {});
    });
    video.addEventListener('ended', () => {
      bgAudio.play().catch(() => {});
    });
  }


  /* ─────────────────────────────────────────
     8. RSVP FORM
  ───────────────────────────────────────── */
  const rsvpSubmit  = document.getElementById('rsvpSubmit');
  const rsvpForm    = document.getElementById('rsvpForm');
  const rsvpSuccess = document.getElementById('rsvpSuccess');

  rsvpSubmit.addEventListener('click', () => {
    const name    = document.getElementById('fname').value.trim();
    const email   = document.getElementById('femail').value.trim();
    const attend  = document.getElementById('fattend').value;

    // Basic validation
    if (!name) {
      shake(document.getElementById('fname')); return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      shake(document.getElementById('femail')); return;
    }
    if (!attend) {
      shake(document.getElementById('fattend')); return;
    }

    // Simulate submission
    rsvpSubmit.textContent = 'Sending…';
    rsvpSubmit.disabled = true;

    setTimeout(() => {
      rsvpForm.classList.add('hidden');
      rsvpSuccess.classList.remove('hidden');
    }, 1200);
  });

  function shake (el) {
    el.style.borderColor = '#c0392b';
    el.animate([
      { transform: 'translateX(0)' },
      { transform: 'translateX(-8px)' },
      { transform: 'translateX(8px)' },
      { transform: 'translateX(-5px)' },
      { transform: 'translateX(0)' }
    ], { duration: 400, easing: 'ease-in-out' });
    el.addEventListener('focus', () => el.style.borderColor = '', { once: true });
  }


  /* ─────────────────────────────────────────
     9. SMOOTH ACTIVE NAV LINK HIGHLIGHT
  ───────────────────────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navAs    = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navAs.forEach(a => {
        a.style.color = '';
        if (a.getAttribute('href') === '#' + entry.target.id) {
          a.style.color = 'var(--gold)';
        }
      });
    });
  }, { threshold: 0.4 });

  sections.forEach(sec => sectionObserver.observe(sec));


  /* ─────────────────────────────────────────
     10. PARALLAX — hero leaves subtle float
  ───────────────────────────────────────── */
  const heroLeaves = document.querySelectorAll('.hero-leaves');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    heroLeaves.forEach((leaf, i) => {
      const dir = i === 0 ? -1 : 1;
      leaf.style.transform = `translateY(${y * 0.12 * dir}px)`;
    });
  }, { passive: true });

});