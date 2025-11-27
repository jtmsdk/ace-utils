import chevronRightIcon from '../../assets/icons/chevron-right.svg';
import { AceIcon } from '../ace-icon/ace-icon.component';

export const AceMenu = {
    emits: [
        'option',
        'focuswithinout'
    ],
    provide() {
        return {menu: this};    
    },
    template: `
        <div class="ace-menu" 
            @keydown="onkeydown($event)"
            @focusout="handleFocusOut($event)">
            <div class="ace-menu-body">
                <slot></slot>
            </div>
        </div>
    `,
    methods: {
        selectValue(value) {
            this.$emit('option', value);
        },
        onkeydown(e) {
            if (e.keyCode < 38) {
                return;
            }
            this.focusSearch();
        },
        isOption(element) {
            return element && element.classList.contains('ace-option');    
        },
        focusSearch() {
           this.focus(this.$el.querySelector('.ace-search input'));  
        },
        focusFirstOption() {
            this.focus(this.$el.querySelector('.ace-option'));
        },
        focusNext(e) {
            this.isOption(e.target) 
                ? this.focus(e.target.nextElementSibling)
                : this.focusFirstOption();
        },
        focusPrevious(e) {
            this.isOption(e.target.previousElementSibling)
                ? this.focus(e.target.previousElementSibling)
                : this.focusSearch();
        },
        focus(element) {
            if (element && element.focus) {
                element.focus();
            }    
        },
        handleFocusOut(e) {
            if (!e.currentTarget.contains(e.relatedTarget)) {
                this.$emit('focuswithinout');
            }
        }
    }
};

export const AceOption = {
    inject: ['menu'],
    emits: ['option'],
    components: {
        AceIcon
    },
    props: {
        value: {type: [String, Number, Object]},
        label: String,
        selected: Boolean,
        icon: String,
        iconsize: String,
        to: [Object, String]
    },
    computed: {
        href() {
            return this.to ? this.$router?.resolve(this.to).href : null;
        }
    },
    template: `
        <button
            type="button" 
            class="ace-option"
            @click="select()"
            :class="{selected: selected}"
            :href="href">
            <ace-icon 
                v-if="icon"
                :src="icon"
                :size="iconsize">
            </ace-icon>
            <div><slot>{{label}}</slot></div>
        </button>
    `,
    methods: {
        select() {
            this.$emit('option', this.value);
            if (this.value !== undefined) {
                this.menu.selectValue(this.value);
            }
        }
    }
};

export const AceOptiongroup = {
    components: {
        AceOption,
        AceIcon
    },
    props: {
        label: String
    },
    data: () => ({
        isOpen: false
    }),
    template: `
        <div class="ace-optiongroup">
            <div class="ace-optiongroup-header">
                <ace-option
                    class="ace-optiongroup-button"
                    :class="{opened: isOpen}"
                    @click="isOpen=!isOpen"
                    icon="${chevronRightIcon}"
                    iconsize="0.8em">
                    <slot name="header">
                        {{label}}
                    </slot>
                </ace-option>
            </div>
            <div class="ace-optiongroup-body"
                v-if="isOpen">
                <slot></slot>
            </div>
        </div>
    `,
    methods: {
        open() {
            this.isOpen = true;
        },
        close() {
            this.isOpen = false;
        }
    }
};

export const AceOptionHeader = {
    template: `
        <div class="ace-option-header">
            <slot></slot>
        </div>
    `
}
