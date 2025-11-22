export const AceSpinner = {
    props: {
        size: {type: [String, Number], default: '120px'}
    },
    template: `
        <div class="ace-spinner" 
            :style="style">
        </div>
    `,
    computed: {
        style() {
            return {
                '--size': (typeof this.size === 'string') ? this.size : this.size + 'px'
            }
        }
    }
};