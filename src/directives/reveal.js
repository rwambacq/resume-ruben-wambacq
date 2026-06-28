const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default {
  mounted(el, binding) {
    const callback = typeof binding.value === "function" ? binding.value : null;
    const bare = binding.modifiers.bare;

    if (!bare) el.classList.add("reveal");

    const trigger = () => {
      if (!bare) el.classList.add("reveal--in");
      if (callback) callback(true);
    };

    if (prefersReducedMotion()) {
      trigger();
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            trigger();
            obs.unobserve(el);
          }
        });
      },
      {
        threshold: binding.modifiers.full ? 0.4 : 0.15,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    observer.observe(el);
    el.__revealObserver = observer;
  },

  unmounted(el) {
    if (el.__revealObserver) {
      el.__revealObserver.disconnect();
      delete el.__revealObserver;
    }
  },
};
