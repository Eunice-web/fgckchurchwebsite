// Data for Sermons, Events, Leaders, Gallery
  //const sermons = [
    //{ series: "Kingdom Revival", title: "Walking in Restoration", speaker: "Pastor James Mwangi", date: "March 16, 2025" },
    //{ series: "Faith Foundations", title: "The Joy of the Lord", speaker: "Evangelist Mercy Wanjiku", date: "March 9, 2025" },
    //{ series: "Hope Arising", title: "Anchored in Troubled Times", speaker: "Bishop Peter Kariuki", date: "March 2, 2025" }
  //];
  const events = [
    { title: "Street Worship", location: "Ting'ang'a", time: "4:00 PM - 6:00 PM", category: "Outreach", dateBox: "27th - 28th June" },
    { title: "Gospel Festivals", location: "Ting'ang'a ", time: "4:00 PM - 6:00 PM", category: "Discipleship", dateBox: "18th - 20 July" },
    { title: "Education Sunday", location: "Church grounds", time: "Sun 8:30 AM - 12PM", category: "Education", dateBox: "23rd August" }
  ];
  const leaders = [
    { name: "Rev. Dr. Michael G. Mwangi", role: "Senior Pastor", img: "Rev-michael.jpeg" },
    { name: "Dr Lilian Gatogo", role: "Pastor (Rev. Wife)", img: "Dr-lilian.jpeg" },
    { name: "Elder David Richu", role: "Church Elder/Treasurer", img: "elder-richu.jpeg" },
    { name: "Elder David Njuguna", role: "Church Elder", img: "elder-njuguna.jpeg" },
    { name: "Elder James Kimani", role: "Church Elder", img: "elder-kimani.jpeg" },
    { name: "Evagelist John Mwangi", role: "Church Evangelist", img: "Eva-john.jpeg" },
    { name: "Deaconess Ann Njoroge", role: "Church Deaconess", img: "deacon-ann.jpeg" },
    { name: "Deaconess Racheal Mwangi", role: "Church Deaconess", img: "deacon-racheal.jpeg" },
    { name: "Deaconess Grace Kung'u", role: "Church Deaconess/Women leader", img: "deacon-grace.jpeg" },
    { name: "Deacon Dominic Wanyoike", role: "Church Deacon", img: "deacon-wanyoike.jpeg" },
    { name: "Deacon Michael Mwangi", role: "Church Deacon", img: "deacon-mwangi.jpeg" },
    { name: "Deacon Kelvin Njoroge", role: "Church Deacon", img: "deacon-kelvin.jpeg" },
    { name: "Paul Munene", role: "Men leader", img: "#" },
    { name: "Hannah Wanjiru", role: "Youths leader", img: "hannah.jpeg" }
  ];

  const galleryItems = [
    { type: "image", src: "church-background.jpeg", overlay: "God's Glory" },
    { type: "image", src: "menphoto.jpeg", overlay: "Men in Worship" },
    { type: "image", src: "youth1.jpeg", overlay: "Young Hearts" },
    { type: "image", src: "fellowship.jpeg", overlay: "Fellowship" },
    { type: "image", src: "youth2.jpeg", overlay: "Joyful moments" },
    { type: "image", src: "women.jpeg", overlay: "Praises" },
    { type: "image", src: "women2.jpeg", overlay: "Women ministry" }
  ];
  const duplicatedItems = [...galleryItems, ...galleryItems];


  function buildSermons() {
    const container = document.getElementById("sermonsGrid");
    if(container) {
      container.innerHTML = sermons.map(s => `
        <div class="sermon-card fade-up">
          <div class="card-img"><div class="play-btn">▶</div></div>
          <div class="sermon-info">
            <div class="sermon-series">${s.series}</div>
            <h3>${s.title}</h3>
            <p>${s.speaker} · ${s.date}</p>
          </div>
        </div>
      `).join('');
      document.querySelectorAll('.play-btn').forEach(btn => {
        btn.addEventListener('click', () => alert("🎧 Audio sermon coming soon. Stay tuned!"));
      });
    }
  }

  function buildEventsPage() {
    const evtContainer = document.getElementById("eventsListPage");
    if(evtContainer) {
      evtContainer.innerHTML = events.map(e => `
        <div class="event-card fade-up">
          <div style="background: var(--navy); color:white; padding:12px; text-align:center; font-weight:800; font-size:1.3rem;">${e.dateBox}</div>
          <div class="event-info">
            <span style="background: var(--gold-light); padding:4px 12px; border-radius:20px; font-size:0.7rem; font-weight:bold;">${e.category}</span>
            <h3 style="margin:12px 0 6px;">${e.title}</h3>
            <p>📍 ${e.location} | 🕒 ${e.time}</p>
          </div>
        </div>
      `).join('');
    }
  }

  function buildLeadersPage() {
    const leadContainer = document.getElementById("leadersGridPage");
    if(leadContainer) {
      leadContainer.innerHTML = leaders.map(l => `
        <div class="leader-card fade-up">
          <img class="leader-photo" src="${l.img}" alt="${l.name}">
          <h3>${l.name}</h3>
          <p class="leader-role">${l.role}</p>
        </div>
      `).join('');
    }

  }

  function buildGalleryHorizontal() {
    const track = document.getElementById("galleryTrack");
    if(track) {
      track.innerHTML = duplicatedItems.map((item, idx) => {
        if(item.type === "video") {
          const poster = item.poster ? `poster="${item.poster}"` : "";
          return `
            <div class="gallery-item">
              <video class="gallery-video" src="${item.src}" ${poster} muted playsinline preload="metadata"></video>
              <div class="gallery-overlay">${item.overlay || "Moments of Worship"}</div>
            </div>
          `;
        }

        return `
          <div class="gallery-item">
            <img src="${item.src}" alt="Church moment ${idx}">
            <div class="gallery-overlay">${item.overlay || "God's Glory"}</div>
          </div>
        `;
      }).join('');

      // Hover/click to play videos (performance-friendly)
      track.querySelectorAll("video.gallery-video").forEach(videoEl => {
        videoEl.addEventListener("mouseenter", async () => {
          try { await videoEl.play(); } catch(e) {}
        });
        videoEl.addEventListener("mouseleave", () => {
          try {
            videoEl.pause();
            videoEl.currentTime = 0;
          } catch(e) {}
        });
        videoEl.addEventListener("click", async () => {
          try {
            if(videoEl.paused) await videoEl.play();
            else videoEl.pause();
          } catch(e) {}
        });
      });
    }
  }


  // SPA Navigation: switch pages without new tab
  function setupPageNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const pages = {
      home: document.getElementById('home-page'),
      about: document.getElementById('about-page'),
      events: document.getElementById('events-page'),
      leaders: document.getElementById('leaders-page'),
      'mens-wawema': document.getElementById('mens-wawema-page'),
      'women-ministry': document.getElementById('women-ministry-page'),
      'youth-ministry': document.getElementById('youth-ministry-page'),
      'sunday-school': document.getElementById('sunday-school-page')
    };
    
    
    function showPage(pageId) {
      Object.values(pages).forEach(page => {
        if(page) page.classList.remove('active-page');
      });
      if(pages[pageId]) pages[pageId].classList.add('active-page');
      // scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const pageName = item.getAttribute('data-page');
        if(pageName && pages[pageName]) {
          showPage(pageName);
        }
        // close mobile panel if open
        if(navLinks && navLinks.classList.contains('show')) {
          navLinks.classList.remove('show');
          if(overlay) overlay.classList.remove('active');
        }

      });
    });
  }

  // Ministry Photos/Videos tab switching (Mens Wawema)
  function setupMinistryMediaTabs() {
    const photoBtn = document.querySelector('[data-media-tab="mens-photos"]');
    const videoBtn = document.querySelector('[data-media-tab="mens-videos"]');
    const photosPanel = document.getElementById('mens-media-photos');
    const videosPanel = document.getElementById('mens-media-videos');

    if(!photoBtn || !videoBtn || !photosPanel || !videosPanel) return;

    function showPhotos() {
      photosPanel.style.display = 'block';
      videosPanel.style.display = 'none';
      photoBtn.style.background = 'var(--navy)';
      photoBtn.style.color = 'white';
      videoBtn.style.background = '#eef2f7';
      videoBtn.style.color = 'var(--navy)';
    }

    function showVideos() {
      photosPanel.style.display = 'none';
      videosPanel.style.display = 'block';
      videoBtn.style.background = 'var(--navy)';
      videoBtn.style.color = 'white';
      photoBtn.style.background = '#eef2f7';
      photoBtn.style.color = 'var(--navy)';
    }

    photoBtn.addEventListener('click', showPhotos);
    videoBtn.addEventListener('click', showVideos);

    // default
    showPhotos();
  }

  // Contact form handler
  function setupContactForm() {
    const form = document.getElementById("enquiryForm");
    if(form) {
      const feedback = document.getElementById("formFeedback");
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        if(!name || !email) {
          feedback.innerHTML = "❌ Please fill name and email.";
          return;
        }
        feedback.innerHTML = "✅ Thank you! Our team will reach out soon. God bless you.";
        form.reset();
        setTimeout(() => { feedback.innerHTML = ""; }, 5000);
      });
    }
  }

  // Mobile menu toggle
  const toggleBtn = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const overlay = document.getElementById("navOverlay");
  if(toggleBtn){
    toggleBtn.addEventListener("click", () => {
      navLinks.classList.toggle("show");
      overlay.classList.toggle("active");
    });
    overlay.addEventListener("click", () => {
      navLinks.classList.remove("show");
      overlay.classList.remove("active");
    });
  }

  // Fade-up observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-up').forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    observer.observe(el);
  });

  // Initial builds
  buildSermons();
  buildEventsPage();
  buildLeadersPage();
  buildGalleryHorizontal();
  setupContactForm();
  setupPageNavigation();
  setupMinistryMediaTabs();