export class AceError extends Error {
    name = '';
    status = '';
    message = '';

    constructor(error) {
        super();
        this.name = error?.name;
        this.status = error?.status;
        this.message = error?.message;
    }
}

export const AceError404 = new AceError({
    status: '404',
    name: 'Resource Not Found',
    message: `Page or resource you're looking for does not exist.`
});