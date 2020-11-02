export interface Config {
    options?: IntersectionObserverInit;
    delay?: number;
    cooldown?: number;
    once?: boolean;
    update?: any;
    fallback?: () => void;
}
export declare const iobserve: (node: HTMLElement, config: Config) => void | {
    update: (update: any) => void;
    destroy: () => void;
};
