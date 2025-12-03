import {observe} from 'ace-dom.service';
import {imagePlaceholder as placeholderImgSrc} from 'ace.assetimports';
import {imagePlaceholderError as errorImgSrc} from 'ace.assetimports';

export const AceImage = {
    emits: ['load', 'error'],
    props: {
        src: String,
        ratio: String,
        loading: {type: String, default: 'eager'},
        threshold: {type: Number, default: 0},
        enterEffect: String,
        objectFit: {type: String},
        objectPosition: {type: String}
    },
    data: () => ({
        imgSrc: null,
        isObserved: false,
        isLoaded: false,
        isError: false
    }),
    template: `
        <img class="ace-image"
            :src="imgSrc"
            :loading="loading"
            :class="{visible: isObserved}"
            :enter-effect="enterEffect"
            :style="style"
            @error="onError"
            @load="onLoad">
    `,
    mounted() {
        this.observe();
        if (this.loading === 'eager') {
            this.imgSrc = this.src;
        }
    },
    methods: {
        observe() {
            let observer = observe({target: this.$el, threshold: this.threshold}).onshow(() => {
                this.isObserved = true;
                this.imgSrc = this.src;
                observer.disconnect();
            });
        },
        onError(e) {
            this.isError = true;
            this.imgSrc = errorImgSrc;
            console.log('Failed to load image', e);
            this.$emit('error', e);
        },
        onLoad(e) {
            this.isLoaded = true;
            this.$emit('load', e);
        }
    },
    computed: {
        style() {
            return {
                backgroundImage: (!this.isError && !this.isLoaded) ? `url("${placeholderImgSrc}")` : 'none',
                objectFit: this.objectFit,
                objectPosition: this.objectPosition,
                aspectRatio: this.ratio
            };
        }
    }
};