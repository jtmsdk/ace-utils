import {loadIcon} from 'ace-icon.service';

const FALLBACK = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
        <g fill="currentColor">
            <path d="M26,3H6A3,3,0,0,0,3,6V26a3,3,0,0,0,3,3H26a3,3,0,0,0,3-3V6A3,3,0,0,0,26,3ZM14.59,16,5,25.59V6.41ZM6.41,5H25.59L16,14.59ZM16,17.41,25.59,27H6.41ZM17.41,16,27,6.41V25.59Z"/>
        </g>
    </svg>
`;

export const AceIcon = {
    props: {
        src: String,
        size: String,
        color: String
    },
    template: `
        <div class="ace-icon"
            :style="{
                width: size, 
                height: size,
                color: color
            }">
        </div>
    `,
    mounted() {
        this.load();
    },
    watch: {
        src() {
            this.load();
        }
    },
    methods: {
        async load() {
            let svgText;
            try {
                svgText = await loadIcon(this.src, true);
            } catch (error) {
                console.error(`Failed to load icon`, error);
            }
            this.$el.innerHTML = svgText || FALLBACK;
        }
    }
}
