"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iobserve = void 0;
var iosupported = "IntersectionObserver" in window;
exports.iobserve = function (node, config) {
    if (!iosupported) {
        if (config.fallback)
            config.fallback();
        return;
    }
    var timeout = null;
    var observer = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting === true) {
            config.onIntersect();
            if (config.once)
                return observer.unobserve(node);
            if (config.cooldown) {
                observer.unobserve(node);
                if (timeout)
                    clearTimeout(timeout);
                timeout = setTimeout(function () {
                    observer.observe(node);
                }, config.cooldown);
            }
        }
    });
    if (timeout)
        clearTimeout(timeout);
    timeout = setTimeout(function () {
        observer.observe(node);
    }, config.delay ? config.delay : 0);
    return {
        update: function (update) {
            if (timeout)
                clearTimeout(timeout);
            observer.unobserve(node);
            observer.observe(node);
        },
        destroy: function () { return observer.unobserve(node); },
    };
};
