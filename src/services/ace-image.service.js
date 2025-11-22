// Cache for successfully loaded images
// String to promise
const CACHE = new Map();

/**
 * Load multiple images and returns a promise that resolves when all images are loaded.
 * @param {string[]} filePaths the image file paths
 * @returns {Promise<HTMLImageElement[]>}
 */
export const loadImages = (filePaths) => {
    let promises = filePaths.map(filePath => loadImage(filePath));
    return Promise.all(promises);
};

/**
 * Load a single image and returns a promise that resolves when the image is loaded.
 * @param {string} filePath the image file path
 * @returns {Promise<HTMLImageElement>}
 */
export const loadImage = (filePath) => {
    if (!filePath) {
        return Promise.resolve(null);
    }
    if (CACHE.has(filePath)) {
        return CACHE.get(filePath);
    }
    let promise = new Promise((res, rej) => {
        let image = new Image();
        image.src = filePath;
        image.onload = () => {
            //CACHE.delete(filePath);
            res(image);
        };
        image.onerror = (error) => {
            CACHE.delete(filePath);
            rej(error);
        };
    });
    CACHE.set(filePath, promise);
    return promise;
};
