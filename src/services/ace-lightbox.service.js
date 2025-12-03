import {AceLightbox} from 'ace-lightbox.component';
import aceModalService from 'ace-modal.service';

const getBoxID = (item) => (typeof item === 'string') ? item : item.id;
const DEFAULT_BOX_ID = 'default';
const BOXES = new Map();

class AceLightboxService {

    createBox(id) {
        id = id || DEFAULT_BOX_ID;
        let box = this.getBox(id) || new Lightbox(id);
        BOXES.set(id, box);
        return box;
    }

    getBox(id) {
        return BOXES.get(id);
    }

    deleteBox(id) {
        BOXES.delete(id);
    }

    open(box, item) {
        // let id = getBoxID(box);
        // box = BOXES.get(id);
        // box.item = item;

        // let modalHook = aceModalService.open({
        //     placeItems: 'center center',
        //     margin: '0',
        //     component: {
        //         components: {
        //             AceLightbox
        //         },
        //         data: () => ({
        //             box: box
        //         }),
        //         template: `
        //             <ace-lightbox
        //                 style="width: 100vw; height: 100vh"
        //                 @close="close()"
        //                 :items="box.items"
        //                 :item="box.item"
        //                 keyboard>
        //             </ace-lightbox>
        //         `,
        //         methods: {
        //             close() {
        //                 modalHook.close();
        //             }
        //         }
        //     }
        // });
    }
}

class Lightbox {
    id = null;
    isOpen = false;
    items = [];
    item = null;

    constructor(id) {
        this.id = id;
    }
    hasItems() {
        return this.items.length > 0;
    }
    addItem(item) {
        this.items.push(item);
    }
    addItems(items) {
        if (items && items.length) {
            this.items.push(...items);
        }
    }
    removeItem(item) {
        let id = getBoxID(item);
        let i = this.items.findIndex(it => it.id === id);
        if (i >= 0) {
            this.items.splice(i, 1);
        }
    }
};

export const aceLightboxService = new AceLightboxService();
export default aceLightboxService;