import {toTextDateString} from '../../services/ace-datetime.service';
import {AceImage} from '../ace-image/ace-image.component';

export const AceArticle = {
    components: {AceImage},
    props: {
        title: String,
        subtitle: String,
        date: [String, Date],
        image: String
    },
    template: `
        <article 
            class="ace-article">
            <header 
                class="ace-article-header"    
                v-if="title || $slots.header">
                <slot name="header">
                    <h1 v-if="title" 
                        class="ace-article-title">
                        {{title}}
                    </h1>
                    <h2 v-if="subtitle" 
                        class="ace-article-subtitle">
                        {{subtitle}}
                    </h2>
                    <div v-if="date" 
                        class="ace-article-date">
                        {{textDate}}
                    </div>
                    <ace-image v-if="image" 
                        class="ace-article-image"
                        effect="fadeincolors"
                        :src="image">
                    </ace-image>
                </slot>
            </header>
            <div class="ace-article-body">
                <slot name="body"></slot>
                <slot></slot>
            </div>
        </article>
    `,
    computed: {
        textDate() {
            return (typeof this.date === 'string')
                ? this.date
                : toTextDateString(this.date);
        }
    }
};