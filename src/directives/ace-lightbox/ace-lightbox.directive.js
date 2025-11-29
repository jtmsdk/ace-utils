import {aceLightboxService as service} from 'ace-lightbox.service';

export const AceLightbox = {
    mounted(el, binding, vnode) {
        let boxID = binding.arg;
        let box = service.getBox(boxID) || service.createBox(boxID);
        let item = binding.value;
        box.addItem(item);

        // Hooks
        el.$comLightbox = box;
        el.$comLightboxItem = item;
        el.onclick = (e) => {
            e.preventDefault();
            service.open(box, item);
        }
    },

    beforeUnmount(el) {
        let box = el.$comLightbox;
        let item = el.$comLightboxItem;
        box.removeItem(item);
        delete el.$comLightbox;
        delete el.$comLightboxItem;
        el.onclick = null;

        // Last item?
        if (!box.hasItems()) {
            service.deleteBox(box);
        }
    }
};
