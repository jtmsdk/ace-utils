import {AceImage} from 'ace-image.component';

export const AceCard = {
    components: {AceImage},
    props: {
        imgsrc: String,
        action: Function,
        to: [String, Object]
    },
    template: `
        <div class="ace-card">
            <div class="ace-card-header" 
                v-if="imgsrc || $slots.header">
                <slot name="header">
                    <ace-image
                        :src="imgsrc">
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