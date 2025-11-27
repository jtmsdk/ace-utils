import {createVNode, render} from 'vue';

/**
 * https://github.com/pearofducks/mount-vue-component
 * @param component: the component
 * @param app: app to attach the instance to
 * @param options: props, children, targetEl to mount into
 */
export const createComp = (component, app, options) => {
    let props = options.props;
    let children = options.children;
    let el = options.element || document.createElement('div');

    let vNode = createVNode(component, props, children);
    if (app && app._context) {
        vNode.appContext = app._context;
    }
    render(vNode, el);

    const destroy = () => {
        render(null, el);
        el = null;
        vNode = null;
    }
    return {vNode, destroy, el};
};

/**
 * Creates and returns HTMLElement from given HTML string.
 * @param {string} html the HTML string.
 */
export const createElement = (html) => {
    let template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content.firstChild;
};

// String or HTMLElement
export const scrollIntoView = (target) => {
    let el = (typeof target === 'string') ? document.getElementById(target) : target;
    if (el) el.scrollIntoView({behavior: 'smooth'});
};

export const scrollToTop = (el) => {
    if (el) {
        el.scrollTop = 0;
    } else {
        document.documentElement.scrollTop = 0; // Chrome, Firefox, IE, Opera
        document.body.scrollTop = 0; // Safari
    }
};

export const setTitle = (title) => {
    document.title = title;
    let el = document.querySelector('title');
    if (el) {
        el.textContent = title;
    } else {
        document.head.prepend(createElement(`<title>${title}</title>`));
    }
};

export const setMeta = (name, content) => {
    let el = document.querySelector(`meta[name=${name}]`);
    if (el) {
        el.setAttribute('content', content);
    } else {
        document.head.prepend(createElement(`<meta name="${name}" content="${content}">`));
    }
};

/*
    Returns new intersection observer for given target element. The returned observer contains 'onshow' and 'onhide' functions that can be used for reacting to show and hide events. Finally, the observer is destroyed with observer.disconnect() function.
 */
export const observe = function(options) {
    let onshowCallbackFn,
        onhideCallbackFn,
        onErrorCallbackFn,
        observer,
        resolveInstantly = false;
    
    options = Object.assign({
        target: null,      // target element to observe (required)
        root: null,        // observe relative to element, or null = viewport
        rootMargin: '0px', // bounding box limit that triggers observe?
        threshold: 0       // percentage of target in view until trigger?
    }, options);

    if (IntersectionObserver) {
        observer = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                // target coming in view within margin and threshold
                if (entry.isIntersecting) {
                    onshowCallbackFn && onshowCallbackFn(entry, observer);
                }
                // target going out of view within margin and threshold
                if (!entry.isIntersecting) {
                    onhideCallbackFn && onhideCallbackFn(entry, observer);
                }
            });
        }, options);
    } else {
        observer = {};
        resolveInstantly = true;
    }
    observer.onshow = function(fn) {
        onshowCallbackFn = fn;
        if (resolveInstantly) fn();
        return observer;
    };
    observer.onhide = function(fn) {
        onhideCallbackFn = fn;
        return observer;
    };
    observer.onerror = function(fn) {
        onErrorCallbackFn = fn;
        return observer;
    };
    observer.observe(options.target);
    return observer;
};
