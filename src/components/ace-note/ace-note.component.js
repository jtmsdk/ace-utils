export const AceNote = {
    props: {
        header: String
    },
    template: `
        <div class="ace-note">
            <div class="ace-note-header" 
                v-if="header">
                {{header}}
            </div>
            <div class="ace-note-body">
                <slot></slot>
            </div>
        </div>
    `
};