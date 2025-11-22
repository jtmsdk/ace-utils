/**
 * Returns a unique ID per runtime.
 * @param {string} prefix optional prefix for the ID.
 * @returns {string} the unique ID.
 */
export const getUniqueID = (() => {
    let i = 0;
    return (prefix) => (prefix || 'UID') + (++i);
})();

/**
 * Toggles full-screen mode for given target element.
 * @param {HTMLElement} targetEl the target element.
 * @param {boolean} trueOrFalse mode on or off.
 * @returns {void}
 */
export const toggleFullScreen = (targetEl, trueOrFalse) => {
    let toEnabled = trueOrFalse !== undefined ? trueOrFalse : !isFullScreen();
    if (toEnabled === !!isFullScreen()) {
        return; // already done
    }
    if (toEnabled) {
        let elem = targetEl || document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { // safari
            elem.webkitRequestFullscreen();
        }        
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { // safari
            document.webkitExitFullscreen();
        }
    }
};

/**
 * Returns true if browser is in full-screen mode.
 * @returns {boolean}
 */
export const isFullScreen = () => {
    return !!(document.fullscreenElement || document.webkitFullscreenElement);
};

/**
 * Escapes special HTML characters in a string.
 * @param {string} text the input text.
 * @returns {string} the escaped text.
 */
export const escape = (text) => {
    let reps = {
        '&': '&amp;', 
        '<': '&lt;', 
        '>': '&gt;'
    };
    return (text || '').replace(/[&<>]/g, txt => reps[txt] || txt);
};

/**
 * Unescapes special HTML characters in a string.
 * @param {string} text the input text.
 * @returns {string} the unescaped text.
 */
export const unescape = (text) => {
    let reps = {
        '&amp;': '&', 
        '&lt;': '<', 
        '&gt;': '>'
    };
    return (text || '').replace(/(&amp;)|(&lt;)|(&gt;)/g, txt => reps[txt]);
};

/**
 * Copies given text onto clipboard.
 * @param {string} text
 */
export const copyToClipboard = (text) => {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
    }
};

/**
 * Highlights regex-search matches in target text by wrapping them inside <mark> tags.
 * @param {string} text the input text.
 * @param {string} search the regex search pattern.
 * @returns {string} the highlighted text.
 */
export const highlight = (text, search) => {
    text = text || '';
    search = search || '';
    return text.replace(new RegExp(search, 'g'), `<mark>${search}</mark>`);
};

/**
 * Wraps function so that it is executed after debounced wait time.
 * @param {function} fn the function to execute after debounce
 * @param {number|function} wait the wait time in milliseconds or a function that returns the wait time
 * @returns {function} the debounced function
 */
export const debounce = function(fn, wait = 400) {
    let timeout;
    let getWait = () => (typeof wait === 'function') ? wait() : wait;

    return function() {
        let self = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            timeout = null;
            fn.apply(self, args);
        }, getWait());
    };
};

/**
 * Wraps function so that it can only be called once, after which it always returns the original return value.
 * @param {function} fn the target function to wrap
 * @param {Object} context the context to bind the function to
 * @returns {function} the wrapped function
 */
export const once = function(fn, context) {
    let result;
    return function() { 
        if (fn) {
            result = fn.apply(context || this, arguments);
            fn = null;
        }
        return result;
    };
};

/**
 * Timeout that returns promise. Resolves when the timeout is executed.
 * @param {function} fn the function to execute after timeout
 * @param {number} dur the duration of the timeout in milliseconds
 * @returns {Promise} the promise that resolves when the timeout is executed
 */
export const timeout = (fn, dur = 0) => {
    let t, p = new Promise(res => {
        t = setTimeout(() => res(fn()), dur);
    });
    p.clear = () => clearTimeout(t);
    return p;
};

/**
 * Trims whitespace from the beginning and end of each line in a template string.
 * @param {string} templateString the string to trim
 * @returns {string} the trimmed string
 */
export const trimTemplateString = (templateString) => {
    if (!templateString) {
        return '';
    }
    let lines = templateString.split('\n');
    if (!lines[0].trim()) {
        lines.shift();
    }
    if (!lines[lines.length-1].trim()) {
        lines.splice(lines.length-1, 1);
    }    
    let spaces = 0;
    for (let i=0; i < lines[0].length; i++) {
        if (lines[0][i] === ' ') {
            spaces++;
        } else {
            break;
        }
    }
    let text = '';
    for (let i=0; i < lines.length; i++) {
        text += lines[i].slice(spaces);
        if (i < lines.length-1) text += '\n';
    }
    return text;
};

/**
 * Parses and evals given javascript code string, returns the result of the eval'd javascript.
 * @param {string} jsString the javascript code string
 * @returns {any} the parsed and eval'd javascript code result
 */
export const toJS = (jsString) => {
    jsString = jsString || '{}';
    return eval('('+jsString+')');
};
