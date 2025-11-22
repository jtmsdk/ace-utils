import {toTextDateString} from '../../services/ace-datetime.service';

export const AceBlockquote = {
    props: {
        quote: String,
        author: String, 
        source: String,
        href: String,
        date: String,
        desc: String
    },
    template: `
        <blockquote class="ace-blockquote" :cite="href">
            <div class="ace-blockquote-body">
                <slot>{{quote}}</slot>
            </div>
            <footer v-if="isFooter">
                ― 
                <slot name="caption">
                    <span class="author" v-if="author">{{author}}</span>
                    <cite class="source" v-if="source">
                        <span v-if="!href">{{source}}</span>
                        <a v-if="href" :href="href">{{source}}</a>
                    </cite>
                    <span class="date" v-if="date">{{dateString}}</span>
                    <span class="desc" v-if="desc">{{desc}}</span>
                </slot>
            </footer>
        </blockquote>
    `,
    computed: {
        dateString() {
            return (this.date instanceof Date)
                ? toTextDateString(this.date)
                : this.date;
        },
        isFooter() {
            return this.author || this.source || this.$slots.caption;
        }
    }
};