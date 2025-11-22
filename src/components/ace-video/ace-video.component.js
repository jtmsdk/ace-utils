export const AceVideo = {
    props: {
        autoplay: { type: Boolean, default: false },
        controls: { type: Boolean, default: false },
        loop: { type: Boolean, default: false },
        muted: { type: Boolean, default: false },
        height: [Number, String],
        width: [Number, String]
    },
    template: `
        <video class="ace-video" v-bind="$props">
            <slot></slot>
        </video>
    `
};

export const ComYoutube = {
    props: ['src'],
    template: `
        <iframe class="ace-youtubevideo" 
            :src="src" 
            width="560" 
            height="315" 
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen>
        </iframe>
    `
};