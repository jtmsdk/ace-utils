import {AceButton} from 'ace-button.component';
import {AceIcon} from 'ace-icon.component';
import {iconQuestionRound} from 'ace.assetimports';
import {iconInfoRound} from 'ace.assetimports';
import {iconCheckmarkRound} from 'ace.assetimports';
import {iconWarningRound} from 'ace.assetimports';
import {iconXStop} from 'ace.assetimports';

const ICONS = {
    confirm: iconQuestionRound,
    info: iconInfoRound,
    success: iconCheckmarkRound,
    warning: iconWarningRound,
    critical: iconXStop
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