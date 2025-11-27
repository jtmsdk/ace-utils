import infoIcon from '../../assets/icons/info-round.svg?inline';
import successIcon from '../../assets/icons/checkmark-round.svg?inline';
import warningIcon from '../../assets/icons/warning-round.svg?inline';
import criticalIcon from '../../assets/icons/x-stop.svg?inline';
import closeIcon from '../../assets/icons/x.svg?inline';
import {AceIcon} from 'ace-icon.component';

const ICONS = {
    info: infoIcon,
    success: successIcon,
    warning: warningIcon,
    critical: criticalIcon
};

export const AceAlert = {
    components: { AceIcon },
    emits: ['close'],
    props: {
        type: { type: String, default: 'default' },
        closeable: { type: Boolean, default: true },
        icon: String
    },
    computed: {
        alertIcon() {
            return (this.icon !== undefined)
                ? this.icon
                : ICONS[this.type];
        }
    },
    template: `
        <div class="ace-alert" :type="type">
            <ace-icon v-if="closeable"
                src="${closeIcon}" size="10"    
                class="ace-alert-close"
                @click="this.$emit('close', this)">
            </ace-icon>
            <ace-icon 
                v-if="alertIcon" 
                class="ace-alert-icon"
                :src="alertIcon">
            </ace-icon>
            <div>
                <div class="ace-alert-header" v-if="$slots.header">   
                    <slot name="header"></slot>
                </div>
                <div class="ace-alert-body" v-if="$slots.body || $slots.default">
                    <slot name="body"></slot>
                    <slot></slot>
                </div>
            </div>
        </div>
    `
};