import {debounce} from 'ace-utils.service';

export const AceCols = {
    props: {
        cols: String,
        rows: String,
        gap: String,
        alignItems: String,
        alignContent: String,
        justifyItems: String,
        justifyContent: String
    },
    data: () => ({
        observer: null,
        currentCols: null
    }),
    template: `
        <div class="ace-cols" :style="styles">
            <slot></slot>
        </div>
    `,
    computed: {
        styles() {
            return {
                gridTemplateColumns: this.cssCols,
                gridTemplateRows: this.rows,
                alignItems: this.alignItems,
                alignContent: this.alignContent,
                justifyItems: this.justifyItems,
                justifyContent: this.justifyContent,
                gap: this.gap
            };
        },
        cssCols() {
            let cols = this.currentCols || this.cols;
            return (cols || '').match(/^\d+$/)
                ? `repeat(${cols}, 1fr)`
                : cols;
        },
        defs() {
            return Object.keys(this.$attrs)
                .filter(key => key.startsWith('cols-'))
                .map(key => ({w: parseInt(key.substring(5)), val: this.$attrs[key]}))
                .sort((a, b) => a.w - b.w)
        }
    },
    methods: {
        initObserver() {
            this.observer = new ResizeObserver(debounce(entries => {
                let w = entries[0].contentRect.width;
                for (let def of this.defs) {
                    if (w <= def.w) {
                        return this.currentCols = def.val;
                    }
                }
                this.currentCols = this.cols;
            }, 40));
            this.observer.observe(this.$el);
        }
    },
    mounted() {
        if (this.defs.length) {
            this.initObserver();
        }
    },
    beforeUnmount() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
};