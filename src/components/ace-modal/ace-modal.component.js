import {AceAutofocus} from '../../directives/ace-autofocus/ace-autofocus.directive';
import {AceFocustrap} from '../../directives/ace-focustrap/ace-focustrap.directive';
import {createElement} from '../../services/ace-dom.service';

/**
 * Returns the container for all modals.
 */
export const getContainer = () => {
    let container = document.getElementById('ace-modals');
    if (!container) {
        container = createElement(`<div id="ace-modals"></div>`);
        document.body.append(container);
    }
    return container;
};

export const AceModal = {
    directives: {
        AceAutofocus,
        AceFocustrap
    },
    emits: ['close'],
    props: {
        id: String,
        appendTo: {type: HTMLElement, default: getContainer()},
        position: {type: String, default: 'fixed'},
        animation: String,
        placeItems: String,
        background: String,
        margin: String
    },
    template: `
        <teleport :to="appendTo">
            <div :id="id" 
                class="ace-modal"
                @click="$emit('close')"
                :style="styles">
                <div class="ace-modal-body"
                    @click.stop
                    v-ace-autofocus
                    v-ace-focustrap>
                    <slot></slot>
                </div>
            </div>
        </teleport>
    `,
    computed: {
        styles() {
            return {
                '--ace-position': this.position,
                '--ace-animation': this.animation,
                '--ace-background': this.background,
                '--ace-placeItems': this.placeItems,
                '--ace-margin': this.margin,
                'width': this.position === 'absolute' ? '100%' : '100vw',
                'height': this.position === 'absolute' ? '100%' : '100vh',
            };
        }
    }
}