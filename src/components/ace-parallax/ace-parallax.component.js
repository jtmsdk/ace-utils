export const AceParallax = {
    props: {
        target: { type: [String, Element], default: document }
    },
    data: () => ({ 
        scrollposition: 0 
    }),
    template: `
        <div class="ace-parallax">
            <slot></slot>
        </div>
    `,
    mounted() {
        this.scrollElement.addEventListener('scroll', this.handleRefresh);
        window.addEventListener('resize', this.handleRefresh);
        this.updatePosition();
    },
    beforeUnmount() {
        this.scrollElement.removeEventListener('scroll', this.handleRefresh);
        window.removeEventListener('resize', this.handleRefresh);
    },
    computed: {
        scrollElement() {
            return (typeof this.target === 'string') 
                ? document.querySelector(this.target) 
                : this.target;
        }
    },
    methods: {
        updatePosition() {
            let bounds = this.$el.getBoundingClientRect();
            // window centerline
            let wcenter = window.innerHeight / 2;
            // element centerline
            let ecenter = bounds.top + (bounds.height / 2);
            // difference between center lines
            this.scrollposition = (wcenter - ecenter);
        },
        handleRefresh() {
            requestAnimationFrame(this.updatePosition);
        }
    }
};

export const AceParallaxLayer = {
    props: {
        scrollfactor: { type: Number, default: 0.25 }
    },
    template: `
        <div class="ace-parallax-layer" 
            :style="{transform: transform}">
            <slot></slot>
        </div>
    `,
    computed: {
        transform() {
            return `translate3d(0, ${this.scrollfactor * this.$parent.scrollposition}px, 0)`;
        }
    }
};