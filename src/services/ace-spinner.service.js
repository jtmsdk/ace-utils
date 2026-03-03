import {getUniqueID} from 'ace-utils.service';
import {AceSpinner} from 'ace-spinner.component';

const DEFAULT_ID = 'ace-spinner-fs';
const DEFAULT_SIZE = '120px';


class AceSpinnerService {
    spinners = [];

    getSpinner(id) {
        return this.spinners?.find(s => s.id === id);
    }

    open(options) {
        let id = options ? options.id || getUniqueID() : DEFAULT_ID;
        let size = options?.size || DEFAULT_SIZE;

        if (this.getSpinner(id)) {
            return this.getSpinner(id);
        }
        let component = {
            components: {AceSpinner},
            template: `<ace-spinner size="${size}"></ace-spinner>`
        };
        let instance = service.open({
            id: id,
            closeable: false,
            component: component,
            background: options?.background || 'transparent',
            placeItems: 'center center',
            animation: 'none',
            margin: '0'
        });
        let hook = {
            id: id,
            close: () => this.close(id)
        };
        this.spinners.push(instance);
        return hook;
    }

    close(id) {
        id = id || DEFAULT_ID;
        let i = this.spinners.findIndex(s => s.id === id);
        if (i >= 0) {
            this.spinners[i].close();
            this.spinners.splice(i, 1);
        }
    }

    closeAll() {
        this.spinners?.forEach(s => s.close());
        this.spinners = [];
    }
}

export default new AceSpinnerService();