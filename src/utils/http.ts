interface HttpInterceptor {
    request?(url: string, config: any): Request;
    requestError?(error: any): Request;
    response?(response: Response): Response;
    responseError?(error: any): Response;
}

class Http {

    interceptors: HttpInterceptor[] = [];

    addInterceptor(interceptor: HttpInterceptor) {
        this.interceptors.push(interceptor);
    }

    removeInterceptor(interceptor: HttpInterceptor) {
        let index = this.interceptors.indexOf(interceptor);
        if (index >= 0) {
            this.interceptors.splice(index, 1);
        }
    }

    async get(url: string): Promise<any> {
        const response = await fetch(url);
        return await response.json();
    }
    
    async post(url: string, data: any): Promise<any> {
        const response = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
        });
        return await response.json();
    }
    
    async put(url: string, data: any): Promise<any> {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
        });
        return await response.json();
    }
    
    async delete(url: string): Promise<any> {
        const response = await fetch(url, {
            method: 'DELETE'
        });
        return await response.json();
    }
}

export const http = new Http();
