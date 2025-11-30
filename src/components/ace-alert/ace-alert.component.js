import {AceIcon} from 'ace-icon.component';
import {iconInfoRound} from 'ace.assetimports';
import {iconCheckmarkRound} from 'ace.assetimports';
import {iconWarningRound} from 'ace.assetimports';
import {iconXStop} from 'ace.assetimports';
import {iconX} from 'ace.assetimports';

const ICONS = {
    info: iconInfoRound,
    success: iconCheckmarkRound,
    warning: iconWarningRound,
    critical: iconXStop
};

export const AceAlert = {
    emits: ['close'],
    components: { AceIcon },
    props: {
        type: { type: String, default: 'default' },
        closeable: { type: Boolean, default: true },
        header: String,
        body: String,
        icon: String
    },
    computed: {
        alertIcon() {
            return (this.icon !== undefined) ? this.icon : ICONS[this.type];
        }
    },
    template: `
        <div class="ace-alert" :type="type">
            <ace-icon v-if="closeable"
                src="${iconX}" size="10"    
                class="ace-alert-close"
                @click="this.$emit('close', this)">
            </ace-icon>
            <ace-icon 
                v-if="alertIcon" 
                class="ace-alert-icon"
                :src="alertIcon">
            </ace-icon>
            <div>
                <div class="ace-alert-header" v-if="header || $slots.header">
                    <slot name="header">{{header}}</slot>
                </div>
                <div class="ace-alert-body" v-if="body || $slots.body || $slots.default">
                    <slot name="body">{{body}}</slot>
                    <slot></slot>
                </div>
            </div>
        </div>
    `
};