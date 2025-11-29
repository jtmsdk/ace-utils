import {h} from 'vue';
import {loadImage} from 'ace-image.service';
import {AceIcon} from 'ace-icon.component';
import {AceImage} from 'ace-image.component';
import {AceSpinner} from 'ace-spinner.component';
import {toggleFullScreen} from 'ace-utils.service';
import {iconExpand} from 'ace.assetimports';
import {iconX} from 'ace.assetimports';

export const AceLightbox = {
    emits: ['close'],
    components: { 
        AceIcon, 
        AceImage, 
        AceSpinner 
    },
    props: {
        keyboard: Boolean,
        closeable: {type: Boolean, default: true},
        items: {type: Array, default: []},
        item: [String, Number, Object]
    },
    data: () => ({
        isLoading: false,
        isToolbarShown: true,
        index: 0
    }),
    template: `
        <div class="ace-lightbox"
            ref="lightbox">
            <div 
                class="ace-lightbox-header" 
                :class="{open: isToolbarShown}"
                @mouseover="toggleToolbar(true)">
                <div class="slidenro">
                    {{currentSlide}}
                </div>
                <div class="buttons">
                    <div class="button"
                        @click="toggleFullScreen()">
                        <ace-icon src="${iconExpand}"></ace-icon>
                    </div>
                    <div class="button"
                        v-if="closeable" 
                        @click="handleClose">
                        <ace-icon src="${iconX}"></ace-icon>
                    </div>
                </div>
            </div>
            <div 
                class="ace-lightbox-body"
                @click="toggleToolbar()">
                <ace-spinner 
                    v-if="isLoading">
                </ace-spinner>
                <div 
                    class="prev" 
                    v-show="hasPrev" 
                    @click.stop="prev">
                    &lsaquo;
                </div>
                <div 
                    class="next" 
                    v-show="hasNext" 
                    @click.stop="next">
                    &rsaquo;
                </div>
                <component
                    v-if="!isLoading" 
                    :is="currentComponent"
                    ref="image">
                </component>
                <div 
                    class="ace-ligthtbox-caption" 
                    v-if="!isLoading && currentDesc && isToolbarShown"
                    @click.stop
                    ref="desc">
                    <div v-html="currentDesc"></div>
                </div>
            </div>
        </div>
    `,
    created() {
        if (!this.$slots.default) return;
        for (let slot of this.$slots.default()[0].children) {
            let item = Object.assign({}, slot.props, {
                render: () => h(slot) 
            });
            this.add(item);
        }
    },
    mounted() {
        this.isToolbarShown = true;
        this.setItem(this.item);
        if (this.keyboard) {
            document.addEventListener('keydown', this.handleKey);
        }
    },
    beforeUnmount() {
        document.removeEventListener('keydown', this.handleKey);
        this.toggleFullScreen(false);
        this.$el.remove();
    },
    computed: {
        currentItem() {
            return this.items[this.index];
        },
        currentDesc() {
            return this.currentItem.desc || this.currentItem.title;
        },
        currentComponent() {
            return this.toComponent(this.currentItem);
        },
        currentSlide() {
            return `(${this.index + 1}/${this.items.length})`;
        },
        hasNext() {
            return this.index < this.items.length-1;
        },
        hasPrev() {
            return this.index > 0;
        }
    },
    methods: {
        add(item) {
            this.items.push(item);
        },
        prev() {
            if (!this.hasPrev) return;
            this.load(this.getPrevItem());
            this.index = this.getPrevIndex(this.index);
            this.preload(this.getPrevItem());
        },
        next() {
            if (!this.hasNext) return;
            this.load(this.getNextItem());
            this.index = this.getNextIndex(this.index);
            this.preload(this.getNextItem());
        },
        setItem(item) {
            if (!item) return;
            this.load(this.item);
            let index = (typeof item === 'string')
                ? this.items.findIndex(it => it.id === item)
                : this.items.findIndex(it => it === item);
            this.index = index >= 0 ? index : 0;       
        },
        getNextIndex(index) {
            return Math.min(++index, this.items.length-1);
        },
        getPrevIndex(index) {
            return Math.max(--index, 0);
        },
        getNextItem() {
            return this.items[this.getNextIndex(this.index)];
        },
        getPrevItem() {
            return this.items[this.getPrevIndex(this.index)];
        },
        toggleFullScreen(enabled) {
            toggleFullScreen(this.$el, enabled);
        },
        toggleToolbar(value) {
            this.isToolbarShown = (value !== undefined) ? value : !this.isToolbarShown;
            this.resolveSizes();
        },
        load(item) {
            this.isLoading = true;
            return loadImage(item.href)
                .finally(() => {
                    this.isLoading = false;
                    this.resolveSizes();
                });
        },
        preload(item) {
            return loadImage(item.href);
        },
        handleClose() {
            this.toggleFullScreen(false);
            this.$refs.lightbox.classList.add('leave');
            setTimeout(() => this.$emit('close'), 400);
        },
        handleKey(e) {
            if (e.key === 'Escape') {
                this.handleClose();
            }
            if (e.key === 'ArrowLeft') {
                this.prev();
            }
            if (e.key === 'ArrowRight') {
                this.next();
            }
        },
        toComponent(item) {
            if (item?.component) {
                return item.component;
            }
            let src = (typeof item === 'string') ? item : item.href || item.src;
            return { 
                components: {AceImage},
                template: `
                    <ace-image
                        src="${src}">
                    </ace-image>
                `
            };
        },
        resolveSizes() {
            this.$nextTick(() => {
                let hMax = this.isToolbarShown && this.$refs.desc
                    ? `calc(100% - ${this.$refs.desc.offsetHeight}px)` 
                    : `100%`;
                this.$refs.image.$el.style.maxHeight = hMax;
            });
        }
    }
};