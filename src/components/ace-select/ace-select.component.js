import {nextTick} from 'vue';
import {AceAutofocus} from 'ace-autofocus.directive';
import {AceFocustrap} from 'ace-focustrap.directive';
import {AceMenu, AceOption} from 'ace-menu.component';
import {AcePopover} from 'ace-popover.component';
import {AceButton} from 'ace-button.component';
import {AceIcon} from 'ace-icon.component';
import {iconChevronDown} from 'ace.assetimports';

export const AceSelect = {
    emits: [
        'update:modelValue',
        'input'
    ],
    components: {
        AceMenu,
        AceOption,
        AcePopover,
        AceButton,
        AceIcon
    },
    directives: {
        AceAutofocus,
        AceFocustrap
    },
    props: {
        autoclose: {type: Boolean, default: true},
        clearable: Boolean,
        disabled: Boolean,
        required: Boolean,
        options: Array,
        optionicon: {type: [String, Boolean], default: 'icon'},
        optionlabel: {type: String, default: 'label'},
        optionvalue: {type: String, default: null},
        modelValue: [String, Number, Object],
        label: String
    },
    data() {
        return {
            option: this.modelValue,
            isOpen: false
        };
    },
    template: `
        <div class="ace-select">
            <label v-if="label"
                :required="required">
                {{label}}
            </label>
            <div class="ace-select-trigger" ref="trigger">
                <slot name="trigger"> 
                    <ace-button         
                        class="ace-select-button"
                        :disabled="disabled"
                        @click="open">
                        <div class="ace-select-value">
                            <slot name="value">
                                <ace-icon 
                                    v-if="getOptionIcon(option)" 
                                    :src="getOptionIcon(option)">
                                </ace-icon>
                                {{getSelectedOptionLabel()}}
                            </slot>
                        </div>
                        <ace-icon 
                            src="${iconChevronDown}"
                            size="0.8em">
                        </ace-icon>
                    </ace-button>
                </slot>
            </div>
            <ace-popover
                ref="popper"
                v-if="isOpen"
                background="transparent"
                placement="bottom-start"
                :relativeTo="$refs.trigger"
                :distance="2">
                <ace-menu 
                    ref="menu"
                    class="ace-select-menu" 
                    v-ace-autofocus
                    v-ace-focustrap
                    @keydown.esc="handleDismiss()"
                    @focuswithinout="handleDismiss()"
                    @option="select">
                    <slot>
                        <ace-option 
                            v-for="option in options" 
                            :selected="getOptionValue(option)===modelValue"
                            :icon="getOptionIcon(option)"
                            :value="option">
                            {{getOptionLabel(option)}}
                        </ace-option>
                    </slot>
                </ace-menu>
            </ace-popover>
        </div>
    `,
    methods: {
        handleDismiss() {
            if (this.isOpen && this.autoclose) {
                this.close();
            }
        },
        open() {
            this.isOpen = true;
            nextTick(() => {
                this.$refs.menu.$el.style.width = this.$refs.trigger.offsetWidth + 'px';
            });
        },
        close() {
            this.isOpen = false;
            this.$refs?.trigger?.querySelector('button, a')?.focus();
        },
        select(option) {
            let value = this.getOptionValue(option);
            this.option = option;
            this.$emit('update:modelValue', value);
            this.$emit('input', value);
            if (option && option.action) option.action(value);
            if (this.autoclose) this.close();
            return value;
        },
        getSelectedOptionLabel() {
            let option = this.option || this.modelValue;
            return this.getOptionLabel(option);
        },
        getOptionIcon(option) {
            return (option && this.optionicon) ? option[this.optionicon] : null;
        },
        getOptionLabel(option) {
            return (option && option[this.optionlabel]) ? option[this.optionlabel] : option;
        },
        getOptionValue(option) {
            return (option && this.optionvalue) ? option[this.optionvalue] : option;
        }
    },
    beforeUnmount() {
        this.close();
    }
};