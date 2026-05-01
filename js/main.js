// ── ROUTER ──
    const cases = ['suiteworld','genai','democratization','netsuite'];
 
    function showView(id) {
      document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
      document.getElementById('view-' + id).classList.add('active');
      window.scrollTo({ top: 0 });
    }
 
    function openCase(id) {
      showView(id);
      window.location.hash = id;
    }
 
    function goHome() {
      showView('home');
      window.location.hash = '';
      setTimeout(initReveal, 100);
    }

    function smoothScrollTo(selector) {
      const el = document.querySelector(selector);
      if (el) {
        const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }

    function navTo(selector) {
      const homeActive = document.getElementById('view-home').classList.contains('active');
      if (homeActive) {
        smoothScrollTo(selector);
      } else {
        goHome();
        setTimeout(() => smoothScrollTo(selector), 300);
      }
    }
 
    // Handle direct hash navigation
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.replace('#','');
      if (cases.includes(hash)) showView(hash);
      else goHome();
    });
 
    // On load
    window.addEventListener('load', () => {
      const hash = window.location.hash.replace('#','');
      if (cases.includes(hash)) showView(hash);
      initReveal();
    });
 
    // ── SCROLL REVEAL ──
    function initReveal() {
      const reveals = document.querySelectorAll('#view-home .reveal');
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
        });
      }, { threshold: 0.1 });
      reveals.forEach(el => { el.classList.remove('visible'); obs.observe(el); });
    }
