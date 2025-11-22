import {createApp} from 'vue';
import {getUniqueID} from './ace-utils.service';
import {createElement} from './ace-dom.service';
import {AceModal} from '../components/ace-modal/ace-modal.component';
import {AceSpinner} from '../components/ace-spinner/ace-spinner.component';

const container = createElement(`<div id="ace-spinners"></div>`);
document.body.appendChild(container);

const DEFAULT_OPTIONS = {
    id: 'ace-spinner-default',
    appendTo: container,
    position: 'fixed',
    background: 'transparent',
    size: '120px'
};

const app = createApp({
    components: {
        AceModal,
        AceSpinner
    },
    data: () => ({
        spinners: []
    }),
    template: `
        <ace-modal 
            v-for="spinner in spinners"
            :appendTo="spinner.appendTo"
            :background="spinner.background"
            :position="spinner.position"
            place-items="center center"
            animation="none"
            padding="0">
            <ace-spinner
                :size="spinner.size">
            </ace-spinner>
        </ace-modal>
    `,
    methods: {
        getSpinner(id) {
            return this.spinners.find(s => s.id === id);
        },
        open(options) {
            let id = options ? options.id || getUniqueID() : DEFAULT_OPTIONS.id;
            if (this.getSpinner(id)) {
                return this.getSpinner(id);
            }
            let self = this;
            let hook = Object.assign({}, DEFAULT_OPTIONS, options, {
                id: id, 
                close: () => self.close(id)
            });
            this.spinners.push(hook);
            return hook;
        },
        close(id) {
            id = id || DEFAULT_OPTIONS.id;
            let i = this.spinners.findIndex(s => s.id === id);
            if (i >= 0) {
                this.spinners.splice(i, 1);
            }
        },
        closeAll() {
            for (let i = this.spinners.length-1; i >= 0; i--) {
                this.spinners.splice(i, 1);
            }
        }
    }
});

const aceSpinnerService = app.mount(container);
export default aceSpinnerService;