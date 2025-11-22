import {createApp} from 'vue';
// import {SITE, PAGE} from 'com-app.state';
// import comAlertService from 'com-alert.service';
// import comSpinnerService from 'com-spinner.service';

export const createSiteApp = (options) => {
    let app = createApp(options);
    let components = options.globalComponents;
    let directives = options.globalDirectives;

    if (components) {
        Object.keys(components).forEach(k => app.component(k, components[k]));
    }
    if (directives) {
        Object.keys(directives).forEach(k => app.directive(k, directives[k]));
    }

    // app.config.globalProperties.$site = SITE;
    // app.config.globalProperties.$page = PAGE;

    // if (options.site) {
    //     SITE.assign(options.site);
    // }
    // app.config.errorHandler = comAppErrorHandler;
    return app;
};

// const comAppErrorHandler = (err, instance, info) => {
//     console.error(err);
//     comSpinnerService.closeAll();
//     comAlertService.open({
//         type: 'critical',
//         header: err.name,
//         body: err.message || "Whoops, something went wrong...",
//         autoclose: false
//     });
// };