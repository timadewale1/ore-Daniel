/* =========================================================
   ORE & DANIEL WEDDING - script.js
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  /* ---------------------------------------------------------
     1. PRELOADER + BACKGROUND AUDIO
  --------------------------------------------------------- */
  const preloader = document.getElementById('preloader');
  const bgAudio = document.getElementById('bgAudio');

  const attemptAudioPlayback = () => {
    if (!bgAudio) return;
    bgAudio.loop = true;
    bgAudio.play().catch(() => {
      // Browsers can still block autoplay; we try again on user interaction.
    });
  };

  attemptAudioPlayback();
  document.addEventListener('pointerdown', attemptAudioPlayback, { once: true });
  document.addEventListener('keydown', attemptAudioPlayback, { once: true });

  window.addEventListener('load', () => {
    setTimeout(() => {
      if (preloader) preloader.classList.add('hidden');
      document.body.style.overflow = '';
      triggerHeroReveal();
      attemptAudioPlayback();
    }, 1800);
  });

  document.body.style.overflow = 'hidden';

  /* ---------------------------------------------------------
     2. WEDDING PARTY + MEDIA GROUPS
  --------------------------------------------------------- */
  const PARTY_DATA = {
    bridesmaids: [
      { file: 'Adelekun Roseline.jpeg', name: 'Adelekun Roseline', role: 'Bridesmaid' },
      { file: 'Adeyeye Peace.jpeg', name: 'Adeyeye Peace', role: 'Bridesmaid' },
      { file: 'Akinojo Motunrayo Chief Bridesmaid.jpeg', name: 'Chief Bridesmaid Akinojo Motunrayo', role: 'Chief Bridesmaid' },
      { file: 'Ayodele Eunice.jpeg', name: 'Ayodele Eunice', role: 'Bridesmaid' },
      { file: 'Familua Oluwadamilola.jpeg', name: 'Familua Oluwadamilola', role: 'Bridesmaid' },
      { file: 'Mayowa Adewale.jpeg', name: 'Mayowa Adewale', role: 'Bridesmaid' },
      { file: 'Tommy Catherine.jpeg', name: 'Tommy Catherine', role: 'Bridesmaid' }
    ],
    groomsmen: [
      { file: 'Agboola Sola.jpeg', name: 'Agboola Sola', role: 'Groomsman' },
      { file: 'Ayomide Ogunmola.jpeg', name: 'Ayomide Ogunmola', role: 'Groomsman' },
      { file: 'Idowu Oladimeji.jpeg', name: 'Idowu Oladimeji', role: 'Groomsman' },
      { file: 'Kehinde Olatunde.jpeg', name: 'Kehinde Olatunde', role: 'Groomsman' }
    ]
  };

  const JOURNEY_FILES = [
    'WhatsApp Image 2026-05-19 at 6.17.29 PM.jpeg',
    'WhatsApp Image 2026-05-19 at 6.17.42 PM.jpeg',
    'WhatsApp Image 2026-05-19 at 6.17.56 PM.jpeg',
    'WhatsApp Image 2026-05-19 at 6.18.04 PM.jpeg',
    'WhatsApp Image 2026-05-19 at 6.18.12 PM.jpeg',
    'WhatsApp Image 2026-05-19 at 6.18.18 PM.jpeg',
    'WhatsApp Image 2026-05-19 at 6.19.28 PM.jpeg'
  ];

  const PROPOSAL_FILES = [
    '1.jpg',
    '2.jpg',
    '3.jpg',
    '4.jpg',
    '5.jpg',
    '6.jpg',
    '7.jpg',
    '8.jpg',
    '9.jpg',
    '10.jpg',
    '11.jpg',
    '12.jpg'
  ];

  const COURT_WEDDING_FILES = [
    'WhatsApp Image 2026-05-28 at 9.15.55 AM.jpeg',
    'WhatsApp Image 2026-05-28 at 9.15.56 AM.jpeg',
    'WhatsApp Image 2026-05-28 at 9.15.59 AM.jpeg',
    'WhatsApp Image 2026-05-28 at 9.15.59 AM (1).jpeg',
    'WhatsApp Image 2026-05-28 at 9.15.59 AM (2).jpeg',
    'WhatsApp Image 2026-05-28 at 9.16.01 AM.jpeg'
  ];

  const encodeAsset = (folder, file) => encodeURI(`pictures/${folder}/${file}`);
  const fileBaseName = (file) => file.replace(/\.[^.]+$/, '');

  const escapeHtml = (value) =>
    String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

  const renderPartyCards = () => {
    const bridesmaidGrid = document.getElementById('bridesmaidGrid');
    const groomsmenGrid = document.getElementById('groomsmenGrid');

    if (bridesmaidGrid) {
      bridesmaidGrid.innerHTML = PARTY_DATA.bridesmaids
        .map((person, index) => {
          const src = encodeAsset('bridesmaid', person.file);
          return `
            <article class="party-card reveal" data-delay="${index * 60}">
              <div class="party-frame">
                <img class="lightboxable" data-lightbox-group="party" src="${src}" alt="${escapeHtml(person.name)}" loading="lazy"/>
              </div>
              <div class="party-card-copy">
                <p class="party-role">${escapeHtml(person.role)}</p>
                <h4>${escapeHtml(person.name)}</h4>
              </div>
            </article>
          `;
        })
        .join('');
    }

    if (groomsmenGrid) {
      groomsmenGrid.innerHTML = PARTY_DATA.groomsmen
        .map((person, index) => {
          const src = encodeAsset('groomsmen', person.file);
          return `
            <article class="party-card reveal" data-delay="${index * 60}">
              <div class="party-frame">
                <img class="lightboxable" data-lightbox-group="party" src="${src}" alt="${escapeHtml(person.name)}" loading="lazy"/>
              </div>
              <div class="party-card-copy">
                <p class="party-role">${escapeHtml(person.role)}</p>
                <h4>${escapeHtml(person.name)}</h4>
              </div>
            </article>
          `;
        })
        .join('');
    }
  };

  const renderMasonryGrid = (container, folder, files, groupName) => {
    if (!container) return;

    container.innerHTML = files
      .map((file, index) => {
        const src = encodeAsset(folder, file);
        const tall = index % 4 === 0 ? ' media-card--tall' : '';
        const delay = index * 70;
        return `
          <article class="media-card${tall} reveal" data-delay="${delay}">
            <img class="lightboxable" data-lightbox-group="${groupName}" src="${src}" alt="${escapeHtml(fileBaseName(file))}" loading="lazy"/>
          </article>
        `;
      })
      .join('');
  };

  const renderJourney = () => {
    const journeyGrid = document.getElementById('journeyGrid');
    renderMasonryGrid(journeyGrid, 'journey', JOURNEY_FILES, 'journey');
  };

  const renderProposal = () => {
    const proposalGrid = document.getElementById('proposalGrid');
    renderMasonryGrid(proposalGrid, 'proposal', PROPOSAL_FILES, 'proposal');
  };

  const renderCourtWedding = () => {
    const courtWeddingGrid = document.getElementById('courtWeddingGrid');
    renderMasonryGrid(courtWeddingGrid, 'court wedding', COURT_WEDDING_FILES, 'court wedding');
  };

  renderPartyCards();
  renderJourney();
  renderProposal();
  renderCourtWedding();

  /* ---------------------------------------------------------
     2. HERO STAGGERED REVEAL
  --------------------------------------------------------- */
  function triggerHeroReveal() {
    const heroItems = document.querySelectorAll('#hero .reveal');
    heroItems.forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 180);
    });
  }

  /* ---------------------------------------------------------
     3. NAVBAR - scroll behaviour + hamburger
  --------------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');

  const setMenuState = (isOpen) => {
    if (!hamburger || !navLinks || !navbar) return;
    hamburger.classList.toggle('open', isOpen);
    navLinks.classList.toggle('open', isOpen);
    navbar.classList.toggle('menu-open', isOpen);
    document.body.classList.toggle('menu-open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
    if (isOpen) {
      attemptAudioPlayback();
    }
  };

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
      setMenuState(!navLinks.classList.contains('open'));
    });

    navLinks.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => setMenuState(false));
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks && navLinks.classList.contains('open')) {
      setMenuState(false);
    }
  });

  /* ---------------------------------------------------------
     4. SCROLL REVEAL (IntersectionObserver)
  --------------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal:not(#hero .reveal)');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const delay = parseInt(entry.target.dataset.delay, 10) || 0;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  revealEls.forEach((el) => observer.observe(el));

  /* ---------------------------------------------------------
     5. COUNTDOWN TIMER
  --------------------------------------------------------- */
  const weddingDate = new Date('2026-06-26T09:00:00');

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

  /* ---------------------------------------------------------
     6. STORY MODAL
  --------------------------------------------------------- */
  const storyData = {
    'how-we-met': {
      title: 'How We Met',
      date: '2017',
      body: [
        `Our story began back in 2017 at the GSF campus fellowship at FUTA. DM first noticed Oreoluwa as the beautiful but seemingly stubborn younger sister of a choir member. Convinced she needed guidance, he made it his personal mission to take her under his wing and "mentor" her.`,
        `Meanwhile, Oreoluwa's first impression was completely different: she simply saw an energetic, over-zealous guy jumping around during family songs. When DM was later appointed as her Assistant Ushering Coordinator, Oreoluwa was less than thrilled. In fact, her ultimate master plan was born: she would stay in the unit, but only to frustrate him until he left!`
      ]
    },
    'the-courtship': {
      title: 'The Courtship',
      date: '1st March 2024',
      body: [
        `Despite her tough exterior, DM's persistent kindness slowly began to melt the ice. He constantly defended her in the unit, patiently checked in on her chemistry grades, and interestingly dashed her his BDG lab coat and helmet for practicals, even though he secretly still needed it himself.`,
        `The true turning point for Oreoluwa came when DM brilliantly answered a complex theological question about relationships that Oreoluwa had been asking pastors for years. Suddenly, the "annoying guy" became a deeply respected friend, and our bond blossomed over periodic Bible studies.`,
        `The ultimate shift happened during exam season. Remembering a passing comment DM had made years prior, Oreoluwa skipped her own exam prep just to buy him a bag of study chocolates. For DM, opening that bag of chocolates was the exact moment he silently vowed to himself, "I am going to marry this girl." This conviction was sealed at his final year dinner.`,
        `After a last-minute change of plans, he asked Oreoluwa to be his date. Seeing her look absolutely breathtaking and seamlessly answering questions about him in front of everyone, he knew without a doubt that she was the one.`
      ]
    },
    'the-proposal': {
      title: 'The Proposal',
      date: '1st March 2026',
      body: [
        `While DM first declared his intentions in 2023, we officially began our courtship on the 1st of March 2024, despite Oreoluwa's initial fears that adding romance might ruin our incredible friendship.`,
        `Fast forward to exactly two years later: March 1, 2026. Knowing Oreoluwa was notoriously inquisitive and claimed she could never be surprised, DM orchestrated an absolute masterclass in misdirection. He dropped obvious hints about a proposal date, booked her a nail appointment, and then intentionally "cancelled" our evening date to completely throw her off the scent.`,
        `Meanwhile, he worked with the OneChurch International protocol team to set up a fake official assignment for her with the Pastor's wife. When Oreoluwa arrived at the venue straight from church, expecting a routine work duty, she walked right into DM waiting to officially ask her to be his wife. For the first time, she was genuinely speechless. Teary-eyed, she joyfully said "yes" in front of everyone.`
      ]
    },
    'forever-after': {
      title: 'Forever After',
      date: '26th June 2026',
      body: [
        `Today, the dynamic that brought us together is stronger than ever. We are still enjoying our deep, daily Bible studies, continuously learning from one another, and purposefully growing in love.`,
        `The girl who once plotted to frustrate him in the ushering unit is now completely obsessed, and the guy who just wanted to "mentor" her found his lifetime partner. As we look toward our big day on June 26th, we couldn't be more excited to spend the rest of our lives building a beautiful, God-centered marriage.`
      ]
    }
  };

  const storyModal = document.getElementById('storyModal');
  const storyModalTitle = document.getElementById('storyModalTitle');
  const storyModalDate = document.getElementById('storyModalDate');
  const storyModalBody = document.getElementById('storyModalBody');
  const storyButtons = document.querySelectorAll('[data-story-target]');
  const storyCloseButtons = document.querySelectorAll('[data-story-close]');

  const renderStory = (id) => {
    const story = storyData[id];
    if (!story || !storyModal || !storyModalTitle || !storyModalDate || !storyModalBody) return;

    storyModalTitle.textContent = story.title;
    storyModalDate.textContent = story.date;
    storyModalBody.innerHTML = story.body.map((paragraph) => `<p>${paragraph}</p>`).join('');
  };

  const openStoryModal = (id) => {
    renderStory(id);
    if (!storyModal) return;
    storyModal.classList.add('open');
    storyModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeStoryModal = () => {
    if (!storyModal) return;
    storyModal.classList.remove('open');
    storyModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  storyButtons.forEach((button) => {
    button.addEventListener('click', () => openStoryModal(button.dataset.storyTarget));
  });

  storyCloseButtons.forEach((button) => {
    button.addEventListener('click', closeStoryModal);
  });

  if (storyModal) {
    storyModal.addEventListener('click', (e) => {
      if (e.target === storyModal || e.target.hasAttribute('data-story-close')) {
        closeStoryModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && storyModal && storyModal.classList.contains('open')) {
      closeStoryModal();
    }
  });

  /* ---------------------------------------------------------
     7. GALLERY LIGHTBOX
  --------------------------------------------------------- */
  const galleryItems = document.querySelectorAll('.lightboxable');
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
    const images = Array.from(galleryItems);

    let currentIndex = 0;

    function openLightbox(index) {
      currentIndex = index;
      lbImg.src = images[index].src;
      lbImg.alt = images[index].alt || 'Wedding image';
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
        lbImg.src = images[currentIndex].src;
        lbImg.alt = images[currentIndex].alt || 'Wedding image';
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

    images.forEach((img, index) => {
      img.addEventListener('click', () => openLightbox(index));
      img.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(index);
        }
      });
      img.tabIndex = 0;
      img.setAttribute('role', 'button');
      img.setAttribute('aria-label', `Open image ${index + 1}`);
    });
  }

  /* ---------------------------------------------------------
     8. VIDEO PLAYER CUSTOM CONTROL
  --------------------------------------------------------- */
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
        attemptAudioPlayback();
      });
      video.addEventListener('ended', () => {
        attemptAudioPlayback();
      });
    }
  }

  /* ---------------------------------------------------------
     9. RSVP FORM
  --------------------------------------------------------- */
  const rsvpSubmit = document.getElementById('rsvpSubmit');
  const rsvpForm = document.getElementById('rsvpForm');
  const rsvpSuccess = document.getElementById('rsvpSuccess');

  if (rsvpSubmit && rsvpForm && rsvpSuccess) {
    rsvpSubmit.addEventListener('click', async (e) => {
      e.preventDefault();

      const nameEl = document.getElementById('fname');
      const emailEl = document.getElementById('femail');
      const attendEl = document.getElementById('fattend');
      const guestsEl = document.getElementById('fguests');
      const messageEl = document.getElementById('fmessage');

      if (!nameEl || !emailEl || !attendEl) return;

      const name = nameEl.value.trim();
      const email = emailEl.value.trim();
      const attend = attendEl.value;
      const guests = guestsEl ? guestsEl.value : '1';
      const message = messageEl ? messageEl.value.trim() : '';

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

      rsvpSubmit.textContent = 'Sending...';
      rsvpSubmit.disabled = true;

      try {
        const response = await fetch('/api/rsvp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fname: name,
            femail: email,
            fattend: attend,
            fguests: guests,
            fmessage: message,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          rsvpForm.classList.add('hidden');
          rsvpSuccess.classList.remove('hidden');
        } else {
          shake(rsvpSubmit);
          alert(data.error || 'Failed to submit RSVP. Please try again.');
          rsvpSubmit.textContent = 'Send RSVP';
          rsvpSubmit.disabled = false;
        }
      } catch (error) {
        console.error('RSVP submission error:', error);
        shake(rsvpSubmit);
        alert('Network error. Please check your connection and try again.');
        rsvpSubmit.textContent = 'Send RSVP';
        rsvpSubmit.disabled = false;
      }
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

  /* ---------------------------------------------------------
     10. SMOOTH ACTIVE NAV LINK HIGHLIGHT
  --------------------------------------------------------- */
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

  /* ---------------------------------------------------------
     11. PARALLAX - hero leaves subtle float
  --------------------------------------------------------- */
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
