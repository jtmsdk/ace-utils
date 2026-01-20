export const AceFlex = {
    props: {
        flow: {type: String}, // e.g. row nowrap
        wrap: {type: String},
        alignItems: {type: String},
        alignContent: {type: String},
        justifyContent: {type: String},
        gap: {type: String}
    },
    template: `
        <div class="ace-flex"
            :style="style">
            <slot></slot>
        </div>
    `,
    computed: {
        style() {
            return {
                flexFlow: this.flow,
                flexWrap: this.wrap,
                alignItems: this.alignItems,
                justifyContent: this.justifyContent,
                alignContent: this.alignContent,
                gap: this.gap
            }
        }
    }
}