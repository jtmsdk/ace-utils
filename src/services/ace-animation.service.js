import {timeout} from 'ace-utils.service';
const DEFAULT = 200;

// TODO: Once stable, use Web animations API
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API
// Example: take offsetHeight in beginning and end and animate:
// el.animate(
//     { height: [startHeight, endHeight] }, 
//     { duration: 400, easing: 'ease-out' }
// );

const doQueue = (target, call) => {
    return new Promise((res, rej) => {
        target = getTarget(target);
        target.QUEUE = target.QUEUE || new QUEUE();
        target.QUEUE.add(() => {
            return call().then(() => res());
        });
    });
};

class QUEUE {
    executing = false;
    calls = [];

    constructor() {
        this.executing = null,
        this.calls = [];
    }
    add(call) {
        this.calls.push(call);
        if (!this.executing) {
            this.execute();
        }
    }
    execute() {
        if (this.calls.length) {
            this.executing = true;
            let call = this.calls.shift();
            call().then(() => this.execute());
        } else {
            this.executing = false;
        }
    }
};


export const slideToggle = function(target, duration = DEFAULT) {
    console.log('slideDown', target);
    return doQueue(target, () => execSlideToggle(target, duration));
};

export const slideDown = function(target, duration = DEFAULT) {
    return doQueue(target, () => execSlideDown(target, duration));
};

export const slideUp = function(target, duration = DEFAULT) {
    return doQueue(target, () => execSlideUp(target, duration));
};


const execSlideToggle = function(target, duration) {
    target = getTarget(target);
    return isHidden(target) ? execSlideDown(target, duration) : execSlideUp(target, duration);
};

const execSlideDown = function(target, duration) {
    target = getTarget(target);
    if (!isHidden(target)) {
        return Promise.resolve();
    }
    let s = target.style;
    let d = getDimensions(target);

    s.display = 'block';
    s.visibility = 'visible';
    s.transitionDuration = duration + 'ms';
    s.transitionProperty = 'height, padding, margin';
    s.overflow = 'hidden';
    s.height = '0px';
    s.paddingTop = '0px';
    s.paddingBottom = '0px';
    s.marginTop = '0px';
    s.marginBottom = '0px';

    target.offsetHeight;

    s.height = d.height;
    s.padding = d.padding;
    s.paddingTop = d.paddingTop;
    s.paddingBottom = d.paddingBottom;
    s.margin = d.margin;
    s.marginTop = d.marginTop;
    s.marginBottom = d.marginBottom;

    return timeout(() => {
        s.height = 'auto';
        s.overflow = d.overflow;
    }, duration);
};

const execSlideUp = function(target, duration) {
    target = getTarget(target);
    if (isHidden(target)) {
        return  Promise.resolve();
    }
    let s = target.style;
    let d = getDimensions(target);

    s.height = d.height;
    target.offsetHeight;

    s.transitionDuration = duration + 'ms';
    s.transitionProperty = 'height, padding, margin';
    s.overflow = 'hidden';
    s.height = '0px';
    s.paddingTop = '0px';
    s.paddingBottom = '0px';
    s.marginTop = '0px';
    s.marginBottom = '0px';

    return timeout(() => {
        s.display = 'none';
        s.height = 'initial';
        s.padding = d.padding;
        s.paddingTop = d.paddingTop;
        s.paddingBottom = d.paddingBottom;
        s.margin = d.margin;
        s.marginTop = d.marginTop;
        s.marginBottom = d.marginBottom;
        s.overflow = d.overflow;
    }, duration); 
};

const getTarget = (target) => {
    return (typeof target === 'string') ? document.querySelector(target) : target;
};

const isHidden = (el) => {
    return getComputedStyle(el).display === 'none';
};

const getDimensions = (el) => {
    let display = el.style.display;
    el.style.display = 'block';
    let s = getComputedStyle(el);
    let paddingTop = parseInt(s.paddingTop) || 0;
    let paddingBottom = parseInt(s.paddingBottom) || 0;
    let height = el.clientHeight - paddingTop - paddingBottom + 'px';
    el.style.display = display;
    
    return {
        height: height,
        padding: s.padding,
        paddingTop: s.paddingTop,
        paddingBottom: s.paddingBottom,
        margin: s.margin,
        marginTop: s.marginTop,
        marginBottom: s.marginBottom,
        overflow: s.overflow
    };
};