export const AceLink = {
    props: {
        to: [Object, String],
        replace: Boolean,
        href: String,
        hash: String,
        tab: Boolean,
        disabled: {type: Boolean, default: false}
    },
    template: `
        <a class="ace-link"
            @click="handle($event)"    
            :class="{disabled: disabled}"
            :href="resolvedHref"
            :tabindex="tabindex">
            <slot></slot>
        </a>
    `,
    mounted() {
        if (this.tab) {
            this.$el.target = '_blank';
        }
    },
    computed: {
        resolvedHref() {
            return this.to
                ? this.$router.resolve(this.to).href
                : this.href || null;
        },
        tabindex() {
            return this.disabled ? -1 : 0;
        }
    },
    methods: {
        handle() {
            if (this.disabled) {
                event.preventDefault();
                return;
            }
            if (this.to) {
                event.preventDefault();
                this.replace 
                    ? this.$router.replace(this.to)
                    : this.$router.push(this.to);
            }
        }
    }
};
