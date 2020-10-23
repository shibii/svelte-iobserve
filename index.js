var iosupported = "IntersectionObserver" in window;

export const iobserve = (
  node,
  { onIntersect, delay, cooldown, once, update, fallback }
) => {
  if (!iosupported) {
    if (fallback) fallback();
    return;
  }

  if (!onIntersect) {
    throw new Error("onIntersect parameter must be passed");
  }
  if (typeof onIntersect !== "function") {
    throw new Error("onIntersect parameter must be a function");
  }
  if (delay && typeof delay !== "number") {
    throw new Error("delay parameter must be a number");
  }
  if (cooldown && typeof cooldown !== "number") {
    throw new Error("cooldown parameter must be a number");
  }

  let timeout;

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting === true) {
      onIntersect();
      if (once) return observer.unobserve(node);
      if (cooldown) {
        observer.unobserve(node);
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          observer.observe(node);
        }, cooldown);
      }
    }
  });

  clearTimeout(timeout);
  timeout = setTimeout(
    () => {
      observer.observe(node);
    },
    delay ? delay : 0
  );

  return {
    update: (update) => {
      clearTimeout(timeout);
      observer.unobserve(node);
      observer.observe(node);
    },
    destroy: () => observer.unobserve(node),
  };
};
