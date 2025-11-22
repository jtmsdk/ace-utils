import {AceAutofocus} from '../../directives/ace-autofocus/ace-autofocus.directive';
import {AceFocustrap} from '../../directives/ace-focustrap/ace-focustrap.directive';

export const AceModal = {
    directives: {
        AceAutofocus,
        AceFocustrap
    },
    emits: ['close'],
    props: {
        id: String,
        appendTo: {type: HTMLElement, default: document.body},
        position: {type: String, default: 'fixed'},
        animation: String,
        placeItems: String,
        background: String,
        padding: String
    },
    template: `
        <teleport :to="appendTo">
            <div :id="id" 
                class="ace-modal"
                @click="$emit('close')"
                :style="styles">
                <div class="ace-modal-body"
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
                '--position': this.position,
                '--animation': this.animation,
                '--background': this.background,
                '--placeItems': this.placeItems,
                '--padding': this.padding,
                'width': this.position === 'absolute' ? '100%' : '100vw',
                'height': this.position === 'absolute' ? '100%' : '100vh',
            };
        }
    },
    data: () => ({
        bodyStyles: null
    }),
    mounted() {
        if (this.position === 'fixed') {
            this.bodyStyles = {
                overflow: document.body.style.overflow,
                overflowY: document.body.style.overflowY
            };
            Object.assign(document.body.style, {
                overflow: 'hidden',
                overflowY: 'hidden'
            });
        }
    },
    beforeUnmount() {
        if (this.bodyStyles) {
            Object.assign(document.body.style, this.bodyStyles);
            this.bodyStyles = null;
        }
    }
}