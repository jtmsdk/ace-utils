import {AceButton} from 'ace-button.component';

export const AceTabs = {
    emits: ['update:modelValue'],
    props: ['modelValue'],
    provide() {
        return { tabs: this };
    },
    template: `
        <div class="ace-tabs">
            <slot></slot>
        </div>
    `,
    methods: {
        selectTab(value) {
            this.$emit('update:modelValue', value);
        }
    }
};

export const AceTab = {
    inject: ['tabs'],
    props: ['value', 'to'],
    components: {AceButton},
    template: `
        <ace-button class="ace-tab"
            :class="{active: isActive}"
            :to="to"
            @click="handleClick">
            <slot></slot>
        </ace-button>
    `,
    methods: {
        handleClick() {
            if (this.value) {
                this.tabs.selectTab(this.value);
            }
        }
    },
    computed: {
        isActive() {
            if (this.value) {
                return this.tabs.modelValue == this.value;
            }
            if (this.to) {
                return this.to.name
                    ? this.$route.name == this.to.name
                    : this.$route.path == this.to;
            }
        }
    }
};