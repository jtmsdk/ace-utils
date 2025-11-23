import infoRoundInverseIcon from '../../assets/icons/info-round-inverse.svg?inline';
import checkmarkRoundInverseIcon from '../../assets/icons/checkmark-round-inverse.svg?inline';
import warningTriangleInverseIcon from '../../assets/icons/warning-triangle-inverse.svg?inline';
import xStopInverseIcon from '../../assets/icons/x-stop-inverse.svg?inline';

import {AceIcon} from '../ace-icon/ace-icon.component';

const ICONS = {
    info: infoRoundInverseIcon,
    success: checkmarkRoundInverseIcon,
    warning: warningTriangleInverseIcon,
    critical: xStopInverseIcon
};

export const AceMsg = {
    components: {
        AceIcon
    },
    props: {
        type: { type: String, default: 'info' },
        icon: String
    },
    template: `
        <div class="ace-msg" 
            :type="type">
            <div class="ace-msg-body">
                <ace-icon 
                    v-if="iconsrc" 
                    :src="iconsrc"
                    size="1em">
                </ace-icon>
                <span><slot></slot></span>
            </div>
        </div>
    `,
    computed: {
        iconsrc() {
            if (this.icon) {
                return this.icon;
            }
            if (this.icon === null || this.icon === '') {
                return null;
            }
            if (this.type) {
                return ICONS[this.type];
            }
            return null;
        }
    }
};