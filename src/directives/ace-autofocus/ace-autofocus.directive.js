import {nextTick} from 'vue';

export const AceAutofocus = {
    mounted(el) {
        nextTick(() => {
            el.focus();
            if (el !== document.activeElement) {
                el = el.querySelector('input:not(:disabled), textarea:not(:disabled), select:not(:disabled), button:not(:disabled), a:not(:disabled)');
                el && el.focus();
            }
        });
    }
};

export default AceAutofocus;