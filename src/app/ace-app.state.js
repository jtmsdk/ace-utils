import {reactive, shallowRef} from 'vue';
import {setTitle, setMeta} from 'com-dom.service';

export const getBase = () => {
    let href = window.location.href;
    if (href.includes('#')) {
        href = href.substring(0, href.lastIndexOf('#'));
    }
    href = href.substring(0, href.lastIndexOf('/'));
    return href || '/';
};

export const SITE = reactive({
    base: getBase(),
    meta: {
        title: '',
        author: '',
        desc: '',
        keywords: ''
    },
    asset(path) {
        return `${this.base}/assets/${path}`; 
    },
    setMeta(meta) {
        this.meta = meta;
        refreshDocMeta();
    },
    assign(data) {
        Object.assign(this, data);
        refreshDocMeta();
    }
});

export const PAGE = reactive({
    comp: shallowRef(null),
    meta: {
        id: '',
        title: '', // document meta
        author: '', // document meta
        desc: '', // document meta
        keywords: '', // document meta
        subtitle: '', // only shown on page
        assets: '', // path to page assets
        file: '', // path to page comp
        image: '', // path to page image
        thumb: '', // path to page thumb
        date: '' // only shown on page
    },
    asset(path) { 
        return `${this.meta.assets}/${path}`; 
    },
    setComp(comp) {
        this.comp = comp;
    },
    setMeta(meta) {
        this.meta = meta;
        refreshDocMeta();
    },
    assign(data) {
        Object.assign(this, data);
        refreshDocMeta();
    }
});

const refreshDocMeta = () => {
    let pMeta = PAGE.meta || {};
    let sMeta = SITE.meta || {};
    setTitle(pMeta.title ? `${pMeta.title} | ${sMeta.title}` : sMeta.title);
    setMeta('author', pMeta.author || sMeta.author);
    setMeta('keywords', pMeta.keywords || sMeta.keywords);
    setMeta('description', pMeta.desc || sMeta.desc);
}
