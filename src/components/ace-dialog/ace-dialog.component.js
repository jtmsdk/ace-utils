import questionRoundIcon from '../../assets/icons/question-round.svg?inline';
import infoRoundIcon from '../../assets/icons/info-round.svg?inline';
import checkmarkRoundIcon from '../../assets/icons/checkmark-round.svg?inline';
import warningRoundIcon from '../../assets/icons/warning-round.svg?inline';
import xStopIcon from '../../assets/icons/x-stop.svg?inline';

import {AceButton} from '../ace-button/ace-button.component';
import {AceIcon} from '../ace-icon/ace-icon.component';

const ICONS = {
    confirm: questionRoundIcon,
    info: infoRoundIcon,
    success: checkmarkRoundIcon,
    warning: warningRoundIcon,
    critical: xStopIcon
};
 
export const AceDialog = {
    components: {
        AceIcon, 
        AceButton 
    },
    props: {
        type: String,
        icon: String,
        header: String,
        body: String,
        buttons: Array
    },
    template: `
        <div class="ace-dialog" 
            :type="type">
            <slot>
                <div class="ace-dialog-header" v-if="$slots.header || header">
                    <ace-icon :src="iconsrc" v-if="iconsrc"></ace-icon>
                    <span><slot name="header">{{header}}</slot></span>
                </div>
                <div class="ace-dialog-body" 
                    v-if="$slots.body || body">
                    <slot name="body">
                        <div v-html="body"></div>
                    </slot>
                </div>
                <div class="ace-dialog-footer" 
                    v-if="$slots.footer || buttons">
                    <slot name="footer">
                        <ace-button 
                            v-for="button in buttons"
                            @click="button.action"
                            v-bind="button">
                        </ace-button>
                    </slot>
                </div>
            </slot>
        </div>
    `,
    computed: {
        iconsrc() {
            return this.icon ? this.icon : ICONS[this.type];
        }
    }
};