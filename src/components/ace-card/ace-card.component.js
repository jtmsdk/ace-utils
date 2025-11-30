import {AceImage} from 'ace-image.component';

export const AceCard = {
    components: {AceImage},
    props: {
        image: String,
        action: Function,
        to: [String, Object]
    },
    template: `
        <div class="ace-card">
            <div class="ace-card-header" 
                v-if="image || $slots.header">
                <slot name="header">
                    <ace-image
                        :src="image">
                    </ace-image>
                </slot>
            </div>
            <div class="ace-card-body">
                <slot></slot>
            </div>
        </div>
    `,
    methods: {
        handleAction(event) {
            if (this.action) {
                this.action(event);
            }
            if (this.to) {
                this.$router?.push(this.to);
            }
        }
    }
};