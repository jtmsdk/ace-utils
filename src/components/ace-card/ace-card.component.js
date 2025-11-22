import {AceImage} from '../ace-image/ace-image.component';

export const AceCard = {
    components: {AceImage},
    props: {
        image: String
    },
    template: `
        <div class="ace-card">
            <div class="ace-card-header" 
                v-if="image || $slots.image">
                <slot name="image">
                    <ace-image
                        :src="image">
                    </ace-image>
                </slot>
            </div>
            <div class="ace-card-body">
                <slot></slot>
            </div>
        </div>
    `
};