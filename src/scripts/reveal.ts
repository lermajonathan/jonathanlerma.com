// Fades elements marked [data-reveal] in once, as they enter the viewport.
// Content is visible without JavaScript: the hidden state only applies under html.js.
const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-in');
      observer.unobserve(entry.target);
    }
  },
  { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
);

document.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element));
