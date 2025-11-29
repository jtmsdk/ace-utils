import {AceIcon} from 'ace-icon.component';
import {iconWarningRoundInverse} from 'ace.assetimports';
import {iconInfoRoundInverse} from 'ace.assetimports';
import {iconCheckmarkRoundInverse} from 'ace.assetimports';
import {iconWarningTriangleInverse} from 'ace.assetimports';
import {iconXStopInverse} from 'ace.assetimports';

const ICONS = {
    default: iconWarningRoundInverse,
    info: iconInfoRoundInverse,
    success: iconCheckmarkRoundInverse,
    warning: iconWarningTriangleInverse,
    critical: iconXStopInverse
};

export const AceMsg = {
    components: {
        AceIcon
    },
    props: {
        type: {type: String, default: 'default'},
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
            return ICONS.default;
        }
    }
};