import {createRouter, createWebHashHistory} from 'vue-router';
import {AceError} from 'ace-error.component';
import aceSpinnerService from 'ace-spinner.service';

export const createSiteRouter = (options) => {

    const router = createRouter({
        history: options.history || createWebHashHistory(),
        routes: [...options.routes, { 
            name: '404', 
            path: '/:pathMatch(.*)*',
            component: AceError,
            props: true
        }],
        scrollBehavior: options.scrollBehavior || ((to, from, savedPosition) => {
            if (to.hash) {
                return {el: to.hash};
            } else {
                return {left: 0, top: 0};
            }
        })
    });

    router.beforeEach((to, from, next) => {
        aceSpinnerService.open();
        setTimeout(() => next());
    });

    router.afterEach(async (to, from) => {
        aceSpinnerService.close();
    });

    router.onError(error => {
        console.error('app.router.onError', error);
        router.replace({name: '404'});
    });
    
    return router;
};