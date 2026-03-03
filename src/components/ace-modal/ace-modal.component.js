import {AceAutofocus} from 'ace-autofocus.directive';
import {AceFocustrap} from 'ace-focustrap.directive';

export const AceModal = {
    directives: {
        AceAutofocus,
        AceFocustrap
    },
    emits: ['close'],
    props: {
        id: String,
        closeable: {type: Boolean, default: true},
        animation: String,
        background: String
    },
    template: `
        <dialog 
            class="ace-modal"
            ref="dialog"
            @click.stop.prevent="onDismiss()"
            @keydown.escape.stop.prevent="onDismiss()"
            :id="id"
            :style="styles">
            <div class="ace-modal-body"
                @click.stop
                v-ace-autofocus
                v-ace-focustrap>
                <slot></slot>
            </div>
        </dialog>
    `,
    mounted() {
        this.$refs.dialog.showModal();
        this.$refs.dialog.scrollTop = 0;
    },
    beforeUnmount() {
        this.$refs?.dialog?.close();
    },
    methods: {
        onDismiss() {
            if (this.closeable) {
                this.$emit('close');
            }
        }
    },
    computed: {
        styles() {
            return {
                '--ace-modal-animation': this.animation,
                '--ace-modal-background': this.background
            };
        }
    }
}