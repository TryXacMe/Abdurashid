// IT Universe — interaktivlik va animatsiyalar
document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (menuButton && navLinks) {
    menuButton.addEventListener('click', () => {
      const opened = navLinks.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(opened));
    });
    navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    }));
  }

  // Scroll bo'yicha elementlarni yumshoq ko'rsatish
  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else revealItems.forEach(item => item.classList.add('visible'));

  // Yuqoridagi o'qish progress chizig'i
  const progress = document.querySelector('.scroll-progress');
  const updateProgress = () => {
    if (!progress) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  // Statistika raqamlarini animatsiya bilan sanash
  const counters = document.querySelectorAll('[data-count]');
  const countUp = element => {
    const target = Number(element.dataset.count);
    const duration = 1400;
    const start = performance.now();
    const tick = now => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = Math.round(target * eased).toLocaleString('uz-UZ');
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if ('IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          countUp(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach(counter => counterObserver.observe(counter));
  } else counters.forEach(countUp);

  // IT yo'nalishi mini-testi
  const quizButtons = document.querySelectorAll('.quiz-options button');
  const result = document.querySelector('.quiz-result');
  quizButtons.forEach(button => button.addEventListener('click', () => {
    quizButtons.forEach(item => item.classList.remove('selected'));
    button.classList.add('selected');
    if (result) {
      result.textContent = button.dataset.result;
      result.classList.remove('result-pop');
      requestAnimationFrame(() => result.classList.add('result-pop'));
    }
  }));

  // Barcha interaktiv elementlarga klaviatura fokusini ham ko'rsatish
  document.querySelectorAll('a, button, input, label').forEach(element => {
    element.addEventListener('focus', () => element.classList.add('keyboard-focus'));
    element.addEventListener('blur', () => element.classList.remove('keyboard-focus'));
  });
});
