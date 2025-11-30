const isDefined = (val) => {
    return val || val === 0 || val === false;
};

export const AceInput = {
    emits: ['update:modelValue'],
    props: {
        label: String,
        type: {type: String, default: 'text'},
        modelValue: {type: [String, Number, Boolean, Date], default: null},
        option: {type: [String, Number, Object], default: null},
        name: String,
        autocomplete: String,
        placeholder: String,
        required: Boolean,
        disabled: Boolean,
        minlength: Number,
        maxlength: Number,
        min: Number,
        max: Number,
        step: Number
    },
    template: `
        <div 
            class="ace-input" 
            :type="type">

            <template 
                v-if="type=='checkbox'">
                <label>
                    <input
                        ace-input
                        type="checkbox"
                        :name="name"
                        :checked="viewValue"
                        @input="handleOnInput(Boolean($event.target.checked))"
                        :disabled="disabled">
                    <span v-if="label || $slots.default">
                        <slot>{{label}}</slot>
                    </span>
                </label>
            </template>

            <template 
                v-else-if="type=='radio'">
                <label>
                    <input 
                        ace-input
                        type="radio"
                        :name="name"
                        :value="option"
                        @input="handleOnInput(option)"
                        :disabled="disabled"
                        :required="required"
                        :checked="viewValue===option">
                    <span v-if="label || $slots.default">
                        <slot>{{label}}</slot>
                    </span>
                </label>
            </template>

            <template 
                v-else-if="type=='color'">
                <label>
                    <div class="color-input-cntr">
                        <input
                            ace-input
                            type="color" 
                            :name="name"
                            :value="viewValue"
                            @input="handleOnInput($event.target.value)"
                            :disabled="disabled">
                        <div
                            class="input-overlay"
                            :style="{backgroundColor: modelValue || '#ffffff'}">
                        </div>
                    </div>
                    <span v-if="label || $slots.default">
                        <slot>{{label}}</slot>
                    </span>
                </label>
            </template>
            
            <template v-else>
                <label v-if="label"
                    :required="required">
                    {{label}}
                </label>
                <input 
                    ace-input
                    ref="input"
                    :type="type"
                    :name="name"
                    :value="viewValue"
                    @input="handleOnInput($event.target.value)"
                    :autocomplete="autocomplete"
                    :placeholder="placeholder"
                    :required="required"
                    :disabled="disabled"
                    :minlength="minlength"
                    :maxlength="maxlength"
                    :min="min"
                    :max="max"
                    :step="step">
            </template>
        </div>
    `,
    computed: {
        viewValue() {
            if (!isDefined(this.modelValue)) {
                return null;
            }
            if (this.type === 'date') {
                return new Date(this.modelValue).toISOString().substring(0, 10);
            }
            if (this.type === 'time') {
                return new Date(this.modelValue).toTimeString().substring(0, 5);
            }
            if (this.type === 'datetime-local') {
                let dt = new Date(this.modelValue);
                let iso = dt.toISOString();
                return iso.substring(0, 10) + 'T' + iso.substring(11, 16);
            }
            return this.modelValue;
        }
    },
    methods: {
        handleOnInput(value) {
            if (!isDefined(value)) {
                this.$emit('update:modelValue', null);
                return;
            }
            if (this.type === 'number') {
                value = Number(value); 
            }
            if (this.type === 'date' || this.type === 'datetime-local') {
                value = new Date(value);
            }
            if (this.type === 'time') {
                let parts = value.split(':').map(v => Number(v));
                value = new Date();
                value.setHours(parts[0], parts[1], 0, 0);
            }
            this.$emit('update:modelValue', value); 
        },
        focus() {
            this.$refs.input.focus();
        }
    }
};