class AceHttp {

    // TODO: allow interceptors to be registered
    
    get(url, queryParams, options) {
        if (queryParams) url += '?' + (new URLSearchParams(queryParams)).toString();
        return this.fetch(url, {
            ...options,
            method: 'GET'
        });
    }

    post(url, data, options) {
        return this.fetch(url, {
            ...options,
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    put(url, data, options) {
        return this.fetch(url, {
            ...options,
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    delete(url, options) {
        return this.fetch(url, {
            ...options,
            method: 'DELETE'
        });
    }

    postFormData(url, params) {
        let formBody = [];
        for (let key in params) {
            formBody.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]));
        }
        return this.fetch(url, {
            method: 'POST',
            headers: {'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            body: formBody.join('&')
        });
    }

    fetch(url, options) {
        let controller = new AbortController();
        let signal = controller.signal;
        let promise = new Promise((resolve, reject) => {
            fetch(url, {...options, signal})
                .then((res) => {
                    return (res.status >= 200 && res.status < 300)
                        ? resolve(res)
                        : reject(res);
                })
                .catch(err => reject(err));
        });
        promise['cancel'] = controller.abort;
        return promise;
    }
}

export const http = new AceHttp();