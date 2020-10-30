var iosupported = "IntersectionObserver" in window;

export interface Config {
  onIntersect: () => void;
  delay?: number;
  cooldown?: number;
  once?: boolean;
  update?: any;
  fallback?: () => void;
}

export const iobserve = (
  node: HTMLElement,
  config: Config
) : {update: (update: any) => void, destroy: () => void} | void => {
  if (!iosupported) {
    if (config.fallback) config.fallback();
    return;
  }

  let timeout: number | null = null;

  const observer: IntersectionObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting === true) {
      config.onIntersect();
      if (config.once) return observer.unobserve(node);
      if (config.cooldown) {
        observer.unobserve(node);
        if(timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
          observer.observe(node);
        }, config.cooldown);
      }
    }
  });

  if(timeout) clearTimeout(timeout);
  timeout = setTimeout(
    () => {
      observer.observe(node);
    },
    config.delay ? config.delay : 0
  );

  return {
    update: (update) => {
      if(timeout) clearTimeout(timeout);
      observer.unobserve(node);
      observer.observe(node);
    },
    destroy: () => observer.unobserve(node),
  };
};
