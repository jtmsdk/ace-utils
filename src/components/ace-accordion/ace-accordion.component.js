import chevronRightIcon from '../../assets/icons/chevron-right.svg?inline';
import {slideUp, slideDown} from '../../services/ace-animation.service';
import {AceIcon} from 'ace-icon.component';

const ANIMATION_LENGTH = 300;

export const AceAccordion = {
    props: {
        multiple: Boolean
    },
    provide() {
        return { accordion: this };
    },
    data: () => ({
        items: []
    }),
    template: `
        <div class="ace-accordion">
            <slot></slot>
        </div>
    `,
    methods: {
        toggle(item) {
            if (this.multiple) {
                item.isOpen ? item.close() : item.open();
            } else if (item.isOpen) {
                this.closeAll();
            } else {
                this.closeAll();
                item.open();
            }
        },
        closeAll() {
            this.items.forEach(item => item.close());
        }
    }
};

export const AceAccordionItem = {
    inject: ['accordion'],
    components: { AceIcon },
    props: {
        header: String,
        body: String,
        expanded: Boolean
    },
    data: () => ({
        isOpen: false,
        isExecuting: false,
        next: null
    }),
    template: `
        <div class="ace-accordion-item" :open="isOpen">
            <div class="ace-accordion-item-header"
                @click="accordion.toggle(this)">
                <ace-icon chevron src="${chevronRightIcon}"></ace-icon>
                <slot name="header">{{header}}</slot>
            </div>
            <div class="ace-accordion-item-body" ref="body">
                <slot name="body">{{body}}</slot>
            </div>
        </div>
    `,
    mounted() {
        this.accordion.items.push(this);
        if (this.expanded) {
            this.open();
        }
    },
    beforeUnmount() {
        let i = this.accordion.items.indexOf(this);
        this.accordion.items.splice(i, 1);
    },
    methods: {
        open() {
            if (this.isOpen) return;
            this.isOpen = true;
            this.next = 'open';
            this.execute();
        },
        close() {
            if (!this.isOpen) return;
            this.isOpen = false;
            this.next = 'close';
            this.execute();
        },
        execute() {
            if (this.isExecuting) return;
            this.isExecuting = true;
            let current = this.next;
            let promise = current === 'open'
                ? slideDown(this.$refs.body, ANIMATION_LENGTH)
                : slideUp(this.$refs.body, ANIMATION_LENGTH);
            promise.then(() => {
                this.isExecuting = false;
                if (current !== this.next) {
                    this.execute();
                }
            });
        }
    }
};