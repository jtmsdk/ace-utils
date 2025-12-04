
import {createPopper} from './popper.min.js';

export const AcePopover = {
    emits: ['close'],
    props: {
        relativeTo: {type: [String, Object], default: null},
        placement: {type: String, default: 'bottom'},
        distance: {type: [Number, String], default: 0},
        offset: {type: [Number, String], default: 0}
    },
    template: `
        <div class="ace-popover" 
            @toggle="handleToggle($event)"
            popover="auto">
            <slot></slot>
        </div>
    `,
    data: () => ({
        popperInstance: null
    }),
    mounted() {
        this.initPopper();
        this.$el.showPopover();
    },
    beforeUnmount() {
        this.destroyPopper();
        this.$el.hidePopover();
    },
    methods: {
        initPopper() {
            this.popperInstance = createPopper(this.relativeElement, this.$el, {
                placement: this.placement, modifiers: [{
                    name: 'offset', 
                    options: {offset: [this.offset, this.distance]}
                }]
            });
        },
        destroyPopper() {
            if (this.popperInstance) {
                this.popperInstance.destroy();
                this.popperInstance = null;
            }
        },
        handleToggle(event) {
            if (event.newState === 'closed') { 
                this.$emit('close');
            }
        }
    },
    computed: {
        relativeElement() {
            return (typeof this.relativeTo === 'string')
                ? document.querySelector(this.relativeTo)
                : this.relativeTo?.$el || this.relativeTo;
        }
    }
};