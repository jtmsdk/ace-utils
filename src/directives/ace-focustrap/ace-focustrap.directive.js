const FOCUS_TRAP_SELECTOR = '*:focus,:is(input,textarea,select,button,a,[tabindex="0"]):not(:disabled,[tabindex="-1"])';

const isFocusWithin = (el) => {
    return el && (el === document.activeElement || el.contains(document.activeElement));
};

const handleTabKey = (event, el) => {
    if (event.key !== 'Tab' ||
        event.defaultPrevented ||
        event.$aceFocusTrapped) {
        return;
    }
    event.$aceFocusTrapped = true;
    let focusableEls = el.querySelectorAll(FOCUS_TRAP_SELECTOR);
    if (!focusableEls.length) {
        event.preventDefault();
        return;
    }
    let firstEl = focusableEls[0];
    let lastEl = focusableEls[focusableEls.length-1];

    if (event.shiftKey) {
        if (isFocusWithin(firstEl)) {
            event.preventDefault();
            lastEl.focus();
        }
    } else {
        if (isFocusWithin(lastEl)) {
            event.preventDefault();
            firstEl.focus();
        }
    }
};

export const AceFocustrap = {
    mounted(el) {
        el.$aceFocusTrapHandler = (e) => handleTabKey(e, el);
        el.addEventListener('keydown', el.$aceFocusTrapHandler);
    },
    beforeUnmount(el) {
        el.removeEventListener('keydown', el.$aceFocusTrapHandler);
        el.$aceFocusTrapHandler = null;
    }
};

export default AceFocustrap;

