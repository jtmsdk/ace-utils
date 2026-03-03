import {createApp, markRaw} from 'vue';
import {getUniqueID} from 'ace-utils.service';
import {createElement} from 'ace-dom.service';
import {AceModal} from 'ace-modal.component';

const container = createElement(`<div id="ace-modals"></div>`);
document.body.append(container);

let app = createApp({
    components: {
        AceModal
    },
    data: () => ({
        modals: []
    }),
    template: `
        <ace-modal 
            v-for="modal in modals"
            :id="modal.id"
            :closeable="modal.closeable"
            :animation="modal.animation"
            :background="modal.background"
            @close="modal.onclose()">
            <component 
                :is="modal.component">
            </component>
        </ace-modal>
    `,
    methods: {
        open(options) {
            let self = this;
            let id = options.id || getUniqueID();
            let resolve, promise = new Promise(res => resolve = res);
            let close = (val) => {
                self.close(id);
                resolve(val);
            };
            let modalHook = {id, promise, close};
            let modalParams = {
                id: id,
                closeable: options.closeable,
                animation: options.animation,
                background: options.background,
                onclose: () => options.onclose && options.onclose(),
                component: markRaw(options.component)
            };
            this.modals.push(modalParams);
            return modalHook;
        },
        close(id) {
            let i = this.modals.findIndex(m => m.id === id);
            if (i >= 0) {
                this.modals.splice(i, 1);
            }
        },
        closeAll() {
            for (let i = this.modals.length-1; i >= 0; i--) {
                this.modals.splice(i, 1);
            }
        }
    }
});

const aceModalService = app.mount('#ace-modals');
export default aceModalService;