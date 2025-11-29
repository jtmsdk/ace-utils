import {debounce} from 'ace-utils.service';
import {AceInput} from 'ace-input.component';
import {AceSpinner} from 'ace-spinner.component';
import {AceIcon} from 'ace-icon.component';
import {iconXRound, iconSearch} from 'ace.assetimports';

export const AceSearch = {
    components: {
        AceIcon, 
        AceSpinner, 
        AceInput 
    },
    emits: [
        'update:modelValue',
        'clear', 
        'search'
    ],
    props: {
        modelValue: String,
        loading: {type: [String, Boolean, Number], default: false},
        placeholder: {type: String, default: ''},
        debounce: {type: Number, default: 0},
        disabled: Boolean
    },
    data() {
        let vm = this;
        return {
            viewValue: this.modelValue,
            updateModelValue: debounce(function(value) {
                vm.$emit('update:modelValue', value);
            }, () => vm.debounce)
        }
    },
    template: `
        <div class="ace-search">
            <ace-input
                ref="search"
                v-model="viewValue"
                @update:modelValue="onchange"
                @keydown.esc.prevent="onclear"
                @keydown.enter.prevent="onsearch($event.target.value)"
                :placeholder="placeholder"
                :disabled="disabled">
            </ace-input>
            <ace-icon 
                v-show="!viewValue" 
                src="${iconSearch}" 
                class="search-icon">
            </ace-icon>
            <ace-icon 
                v-show="viewValue" 
                src="${iconXRound}"
                class="clear-icon" 
                @click="onclear">
            </ace-icon>
            <ace-spinner 
                v-show="loading" 
                :size="20">
            </ace-spinner>
        </div>
    `,
    methods: {
        onchange(value) {
            if (!value) this.$emit('clear');
            this.updateModelValue(value);
        },
        onsearch(value) {
            this.$emit('search', value);
        },
        onclear() {
            this.viewValue = '';
            this.onchange('');
            this.focus();
        },
        focus() {
            this.$refs.search.focus();
        }
    }
};