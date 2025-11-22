import {createApp, markRaw} from 'vue';
import {createElement} from './ace-dom.service';
import {AceAlert} from '../components/ace-alert/ace-alert.component';

const container = createElement(`<div id="ace-alerts"></div>`);
document.body.append(container);

const app = createApp({
    data: () => ({
        alerts: []
    }),
    template: `
        <component 
            v-for="alert in alerts" 
            :key="alert.key" 
            :is="alert">
        </component>
    `,
    methods: {
        add(options) {
            let vm = this;
            let header = options.header;
            let body = options.body;
            let alert = markRaw({
                components: {AceAlert},
                data: () => options,
                template: `
                    <ace-alert 
                        closeable
                        :id="id" 
                        :type="type" 
                        :icon="icon" 
                        @close="close">
                        ${header ? `<template v-slot:header>${header}</template>` : ''}
                        ${body ? `<template v-slot:body>${body}</template>` : ''}
                    </ace-alert>
                `,
                methods: {
                    close() { 
                        vm.close(alert); 
                    }
                }
            });
            this.alerts.push(alert);
            return alert;
        },
        open(options) {
            options = (typeof options === 'string') 
                ? { body: options } 
                : options;
            options = Object.assign({
                id: Date.now(),
                type: undefined,
                icon: undefined,
                class: '',
                header: '',
                body: '',
                autoclose: 5
            }, options);

            let alert = this.add(options);
            if (options.autoclose) {
                setTimeout(() => this.close(alert), options.autoclose * 1000);
            }
            return alert;
        },
        closeAll() {
            for (let i = this.alerts.length-1; i >= 0; i--) {
                this.alerts.splice(i, 1);
            }
        },
        close(alert) {
            let i = this.alerts.indexOf(alert);
            if (i >= 0) {
                this.alerts.splice(i, 1);
            }
        }
    }
});

export const aceAlertService = app.mount('#ace-alerts');
export default aceAlertService;