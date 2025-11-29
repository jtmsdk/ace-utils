import {observe} from 'ace-dom.service';
import {imagePlaceholder as imagePlacer} from 'ace.assetimports';
import {imagePlaceholderError as imageError} from 'ace.assetimports';

export const AceImage = {
    emits: ['load', 'error'],
    props: {
        src: String,
        ratio: String,
        loading: String,
        threshold: {type: Number, default: 0},
        enterEffect: String,
        objectFit: {type: String},
        objectPosition: {type: String},
        placeholder: Boolean
    },
    data: () => ({
        imgSrc: null,
        isLoaded: false,
    }),
    template: `
        <img class="ace-image"
            :class="{loaded: isLoaded}"
            :enter-effect="enterEffect"
            :src="imgSrc"
            :style="style"
            @error="handleOnError"
            @load="handleOnLoad">
    `,
    mounted() {
        if (this.placeholder) {
            this.setPlaceholderImage(imagePlacer);    
        }
        this.loading === 'lazy'
            ? this.lazyLoad() 
            : this.load();
    },
    computed: {
        style() {
            return {
                objectFit: this.objectFit,
                objectPosition: this.objectPosition,
                aspectRatio: this.ratio
            };
        }
    },
    methods: {
        load() {
            this.imgSrc = this.src;
        },
        lazyLoad() {
            let observer = observe({target: this.$el, threshold: this.threshold}).onshow(() => {
                observer.disconnect();
                this.load();
            });
        },
        handleOnError(e) {
            this.imgSrc = imageError;
            this.setPlaceholderImage(null);
            this.$emit('error', e);
        },
        handleOnLoad(e) {
            this.isLoaded = true;
            this.setPlaceholderImage(null);
            this.$emit('load', e);
        },
        setPlaceholderImage(path) {
            if (path) {
                this.$el.style.backgroundImage = `url(${path})`; 
            } else {
                this.$el.style.backgroundImage = 'none';
            }
        }
    }
};