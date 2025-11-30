export const AceTextarea = {
    emits: ['update:modelValue'],
    props: {
        name: String,
        autoresize: Boolean,
        label: String,
        modelValue: String,
        disabled: Boolean,
        required: Boolean,
        minrows: {type: Number, default: 3},
        maxrows: {type: Number, default: 20}
    },
    data: () => ({
        minHeight: null,
        maxHeight: null 
    }),
    template: `
        <div class="ace-textarea">
            <label v-if="label" 
                :required="required">
                {{label}}
            </label>
            <textarea
                ace-textarea
                ref="textarea"
                :name="name"
                :value="modelValue"
                @input="handleInput"
                :disabled="disabled"
                :required="required">
            </textarea>
        </div>
    `,
    computed: {
        style() {
            return this.$refs.textarea.style;
        }
    },
    mounted() {
        let c = getComputedStyle(this.$refs.textarea);
        let lineHeight = parseInt(c.fontSize) + 10;
        this.minHeight = this.minrows * lineHeight;
        this.maxHeight = this.maxrows * lineHeight;
        this.resize();
    },
    methods: {
        handleInput(e) {
            this.$emit('update:modelValue', e.target.value);
            this.resize();
        },
        resize() {
            if (!this.autoresize) {
                return;
            }
            this.style.height = 'auto';
            this.style.height = Math.min(Math.max(this.$refs.textarea.scrollHeight + 4, this.minHeight), this.maxHeight) + 'px';
        }
    }
};