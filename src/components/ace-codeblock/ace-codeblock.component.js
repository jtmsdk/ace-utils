import {escape, trimTemplateString} from '../../services/ace-utils.service';
import "./prism.js";
import "./prism.css";

export const AceCodeblock = {
    props: {
        lang: {type: String, default: 'javascript'},
        header: String,
        code: String
    },
    template: `
        <div class="ace-codeblock">
            <div class="ace-codeblock-header">
                {{title}}
            </div>
            <pre class="ace-codeblock-body" ref="pre"><code ref="code"></code></pre>
        </div>
    `,
    computed: {
        title() {
            return this.header || this.lang;
        },
        content() {
            return this.code;
        }
    },
    mounted() {
        if (!window.Prism) {
            console.error('Prism.js (https://prismjs.com/) is not available: ace-codeblock is unable to add syntax highlighting.');
        }
        let codeEl = this.$refs.code;
        let code = trimTemplateString(this.content);
        let html = window.Prism
            ? Prism.highlight(code, Prism.languages[this.lang], this.lang)
            : escape(code);
        codeEl.innerHTML = html;
        codeEl.classList.add('language-'+this.lang);
        this.$refs.pre.classList.add('language-'+this.lang);
    }
};