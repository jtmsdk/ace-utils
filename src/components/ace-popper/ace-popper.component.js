import {createPopper} from './popper.min.js';

export const AcePopper = {
    emits: ['close'],
    props: {
        appendTo: {type: HTMLElement, default: document.body},
        relativeTo: {type: [HTMLElement, String], default: 'xy'},
        placement: {type: String, placement: 'bottom-start'},
        clientX: {type: Number, default: 0},
        clientY: {type: Number, default: 0},
        distance: {type: Number, default: 0},
        offset: {type: Number, default: 0},
        backdrop: {type: Boolean, default: false},
        background: String,
        component: Object
    },
    template: `
        <teleport :to="appendTo">
            <div class="ace-popper" 
                @click.stop="$emit('close')" 
                :backdrop="backdrop">
                <div ref="body" class="ace-popper-body" @click.stop>
                    <slot>
                        <component :is="component"></component>
                    </slot>
                </div>
            </div>
        </teleport>
    `,
    data: () => {
        let bounds = {right:0,left:0,top:0,bottom:0,width:0,height:0};
        let virtualEl = {getBoundingClientRect: () => bounds};
        return {
            popperInstance: null,
            virtualEl,
            bounds
        };
    },
    mounted() {
        this.updateBounds(this.clientX, this.clientY);
        this.initPopper();
    },
    methods: {
        initPopper() {
            if (!this.relativeTo) {
                return;
            }
            let targetEl = (this.relativeTo === 'xy')
                ? this.virtualEl
                : this.relativeTo;
                
            this.popperInstance = createPopper(targetEl, this.$refs.body, {
                placement: this.placement,
                modifiers: [{
                    name: 'offset', 
                    options: {offset: [this.offset, this.distance]}
                }]
            });
        },
        updateBounds(x, y) {
            this.bounds.right = x;
            this.bounds.left = x;
            this.bounds.top = y;
            this.bounds.bottom = y;
        }
    },
    watch: {
        clientX(x) {
            this.updateBounds(x, this.clientY);
            this.popperInstance.update();
        },
        clientY(y) {
            this.updateBounds(this.clientX, y);
            this.popperInstance.update();
        }
    },
    beforeUnmount() {
        if (this.popperInstance) {
            this.popperInstance.destroy();
            this.popperInstance = null;
            this.virtualEl = null;
        }
    }
}