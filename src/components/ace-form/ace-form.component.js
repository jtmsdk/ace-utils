export const AceForm = {
    template: `
        <form class="ace-form">
            <div class="ace-form-header"
                v-if="$slots.header">
                <slot name="header"></slot>
            </div>
            <div class="ace-form-body">
                <slot name="body"></slot>
                <slot></slot>
            </div>
            <div class="ace-form-footer" 
                v-if="$slots.footer">
                <slot name="footer"></slot>
            </div>
        </form>
    `,
    methods: {
        reset() {
            this.$el.reset();
        },
        submit() {
            this.$el.submit();
        },
        checkValidity() {
            return this.$el.checkValidity();
        },
        reportValidity() {
            return this.$el.reportValidity();
        }
    }
};