import {AceImage} from 'ace-image.component';
import {AceLightbox} from 'ace-lightbox.directive';

export const AceThumb = {
    components: {
        AceImage
    },
    props: {
        src: String,
        title: String,
        alt: String,
        objectFit: String
    },
    template: `
        <ace-image
            class="ace-thumb"
            v-bind="$props">
        </ace-image>
    `
};

export const AceThumbs = {
    components: { 
        AceThumb 
    },
    directives: {
        AceLightbox
    },
    props: {
        id: String,
        items: [Array, Object],
        objectFit: String
    },
    template: `
        <div class="ace-thumbs">
            <slot>
                <ace-thumb
                    v-for="(item, i) in items"
                    v-ace-lightbox:id="item"
                    :object-fit="objectFit"
                    :title="item.title"
                    :src="item.src || item.href"
                    :alt="item.alt">
                </ace-thumb>
            </slot>
        </div>
    `
};

