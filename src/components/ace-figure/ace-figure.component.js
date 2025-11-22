export const AceFigure = {
    props: {
        header: String,
        caption: String
    },
    template: `
        <figure class="ace-figure">
            <div class="ace-figure-header" 
                v-if="header || $slots.header">
                <slot name="header">
                    <div v-html="header"></div>
                </slot>
            </div>
            <div class="ace-figure-body">
                <slot></slot>
            </div>
            <figcaption class="ace-figure-footer">
                <slot name="footer">
                    <div v-html="caption"></div>
                </slot>
            </figcaption>
        </figure>
    `
};