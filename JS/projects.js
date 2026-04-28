    // ── THEME ──
    const html = document.documentElement;
    const btn  = document.getElementById('themeToggle');
    const saved = localStorage.getItem('diven-theme') || 'dark';
    html.setAttribute('data-theme', saved);

    btn.addEventListener('click', () => {
      const next = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      html.setAttribute('data-theme', next);
      localStorage.setItem('diven-theme', next);
    });

    // ── REVEAL ──
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll('.project-entry').forEach(el => io.observe(el));
  