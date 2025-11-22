import {AceIcon} from '../ace-icon/ace-icon.component';

export const AceButton = {
    components: { 
        AceIcon 
    },
    props: {
        label: String,
        icon: String,
        iconsize: String,
        action: Function,
        to: [String, Object]
    },
    template: `
        <button 
            type="button"     
            class="ace-button"
            @click="handleAction">
            <ace-icon 
                v-if="icon" 
                :src="icon"
                :size="iconsize">
            </ace-icon>
            <slot>{{label}}</slot>
        </button>
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