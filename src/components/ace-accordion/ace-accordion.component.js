import {slideUp, slideDown} from 'ace-animation.service';
import {AceIcon} from 'ace-icon.component';
import {iconChevronRight} from 'ace.assetimports';

const ANIMATION_LENGTH = 300;

export const AceAccordion = {
    provide() {
        return {accordion: this};
    },
    props: {
        multiple: Boolean
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
        openAll() {
            this.items.forEach(item => item.open());
        },
        closeAll() {
            this.items.forEach(item => item.close());
        }
    }
};

export const AceAccordionItemHeader = {
    inject: ['accordionItem'],
    components: {
        AceIcon
    },
    template: `
        <button 
            type="button" 
            class="ace-accordion-item-header"
            @click="handleOnClick">
            <ace-icon chevron src="${iconChevronRight}"></ace-icon>
            <slot></slot>
        </button>
    `,
    methods: {
        handleOnClick() {
            this.accordionItem.toggle();
        }
    }
};

export const AceAccordionItem = {
    inject: ['accordion'],
    components: {
        AceAccordionItemHeader
    },
    provide() {
        return {accordionItem: this};
    },
    props: {
        header: String,
        disabled: Boolean,
        expanded: Boolean
    },
    data: () => ({
        isOpen: false,
        isExecuting: false,
        next: null
    }),
    template: `
        <fieldset 
            class="ace-accordion-item"
            :disabled="disabled"
            :open="isOpen">
            <slot>
                <ace-accordion-item-header @click="toggle()">
                    {{header}}
                </ace-accordion-item-header>
            </slot>
            <div class="ace-accordion-item-body" ref="body">
                <slot name="body"></slot>
            </div>
        </fieldset>
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
        toggle() {
            this.isOpen ? this.close() : this.open();
        },
        open() {
            if (this.isOpen) return;
            if (!this.accordion.multiple) {
                this.accordion.closeAll();
            }
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
