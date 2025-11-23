export const AceSwitch = {
    emits: ['update:modelValue'],
    props: {
        name: String, 
        modelValue: Boolean,
        label: String,
        disabled: Boolean,
        size: String
    },
    template: `
        <div class="ace-switch"
            :style="{'--ace-width': size}">
            <label>
                <input type="checkbox" 
                    :name="name"
                    :checked="modelValue"
                    @input="$emit('update:modelValue', $event.target.checked)"
                    :disabled="disabled">
                <span v-if="label || $slots.default"><slot>{{label}}</slot></span>
            </label>
        </div>
    `
};