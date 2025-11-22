import checkMarkIcon from '../../assets/icons/checkmark-round-inverse.svg?inline';

export const AceProgressbar = {
    props: {
        value: Number,
        max: {type: Number, default: 100},
        unit: {type: String, default: '%'}
    },
    template: `
        <div class="ace-progressbar">
            <div class="ace-progressbar-body" 
                :style="{width: width}">
                <span class="ace-progressbar-label">
                    <slot>
                        <ace-icon 
                            v-if="value === max"
                            src="${checkMarkIcon}"
                            color="white">
                        </ace-icon>
                        {{label}}
                    </slot>
                </span>
            </div>
        </div>
    `,
    computed: {
        width() {
            return this.value/this.max * 100 + '%';
        },
        label() {
            return `${this.value} ${this.unit}`;
        }
    }
};