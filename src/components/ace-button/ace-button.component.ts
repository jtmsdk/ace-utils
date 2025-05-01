export const AceButton = {
    props: {
        type: {type: String, default: 'button'},
        variant: {type: String, default: 'secondary'},
        action: {type: Function},
        label: {type: String},
        icon: {type: String},
        iconsize: {type: String},
        to: [String, Object],
        value: null
    },
    template: `
        <button 
            :type="type"
            class="ace-button"
            @click="handle">
            <ace-icon
                v-if="icon"
                :icon="icon"
                :size="iconsize">
            </ace-icon>
            <slot>
                <span>{{label}}</span>
            </slot>
        </button>
    `,
    methods: {
        handle(event: Event) {
            if (this.action) {
                this.action(this.value);
            }
            if (this.to) {
                this.$router?.push(this.to);
            }
        }
    }
}