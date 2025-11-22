import {AceError404} from './ace-error.class';

export const AceError = {
    props: ['error'],
    template: `
        <div class="ace-error">
            <h1>{{err.status}}</h1>
            <h2>{{err.name}}</h2>
            <p>{{err.message}}</p>
        </div>
    `,
    computed: {
        err() {
            return this.error || AceError404;
        }
    }
};