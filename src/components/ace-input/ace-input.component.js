export const AceInput = {
    emits: ['update:modelValue'],
    props: {
        label: String,
        type: {type: String, default: 'text'},
        modelValue: {type: [String, Number, Boolean], default: null},
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
        <div class="ace-input" :type="type">

            <template v-if="type=='checkbox'">
                <label>
                    <input 
                        type="checkbox"
                        :name="name"
                        :checked="modelValue"
                        @input="$emit('update:modelValue', Boolean($event.target.checked))"
                        :disabled="disabled">
                    <span v-if="label || $slots.default">
                        <slot>{{label}}</slot>
                    </span>
                </label>
            </template>

            <template v-else-if="type=='radio'">
                <label>
                    <input 
                        type="radio"
                        :name="name"
                        :value="option"
                        @input="$emit('update:modelValue', option)"
                        :disabled="disabled"
                        :required="required"
                        :checked="modelValue===option">
                    <span v-if="label || $slots.default">
                        <slot>{{label}}</slot>
                    </span>
                </label>
            </template>

            <template v-else-if="type=='color'">
                <label>
                    <input 
                        type="color" 
                        :name="name"
                        :value="modelValue"
                        @input="$emit('update:modelValue', $event.target.value)"
                        :disabled="disabled">
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
                <input ref="input"
                    :type="type"
                    :name="name"
                    :value="modelValue"
                    @input="handleInput($event)"
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
    methods: {
        focus() {
            this.$refs.input.focus();
        },
        handleInput(event) {
            let value = event.target.value;
            
            if (this.type === 'number') {
                value = (value || value === '0') ? Number(value) : null; 
            }
            if (this.type === 'date') {
                // nothing yet   
            }
            if (this.type === 'time') {
                // nothing yet
            }
            this.$emit('update:modelValue', value); 
        }
    }
};