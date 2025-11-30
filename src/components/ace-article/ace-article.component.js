import {toTextDateString} from 'ace-datetime.service';
import {AceImage} from 'ace-image.component';

export const AceArticle = {
    components: {AceImage},
    props: {
        meta: Object
    },
    template: `
        <article 
            class="ace-article">
            <header 
                class="ace-article-header">
                <slot name="header">
                    <template v-if="meta">
                        <h1 v-if="meta.title" 
                            class="ace-article-title">
                            {{meta.title}}
                        </h1>
                        <h2 v-if="meta.subtitle" 
                            class="ace-article-subtitle">
                            {{meta.subtitle}}
                        </h2>
                        <time v-if="meta.date"  
                            class="ace-article-date"
                            :datetime="dateToISO(meta.date)">
                            {{dateToText(meta.date)}}
                        </time>
                        <ace-image v-if="meta.image" 
                            class="ace-article-image"
                            effect="fadeincolors"
                            :src="meta.image">
                        </ace-image>
                    </template>
                </slot>
            </header>
            <main class="ace-article-body">
                <slot name="body"></slot>
                <slot></slot>
            </main>
        </article>
    `,
    methods: {
        dateToISO(date) {
            return (typeof date === 'string') ? date : date.toISOString().split('T')[0];
        },
        dateToText(date) {
            return (typeof date === 'string') ? date : toTextDateString(date);
        }
    }
};