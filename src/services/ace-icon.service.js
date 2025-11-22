import {http} from './ace-http.service';

// Cache for successfully loaded icons
// String to promise
const CACHE = new Map();

/**
 * Loads multiple icon SVG files from given target URLs.
 * @param srcs target SVG file URLs
 * @param doCache if true, caches loaded icons
 */
export const loadIcons = (srcs, doCache = true) => {
    let promises = srcs.map(src => loadIcon(src, doCache));
    return Promise.all(promises);
};

/**
 * Loads an icon SVG file from given target URL.
 * @param src target SVG file URL
 * @param doCache if true, caches the loaded icon
 * @returns 
 */
export const loadIcon = (src, doCache = true) => {
    if (!src) {
        return Promise.reject(null);
    }
    if (doCache && CACHE.has(src)) {
        return CACHE.get(src);
    }
    let promise = http.get(src)
        .then(resp => resp.text())
        .catch(err => {
            CACHE.delete(src);
            return Promise.reject(err);
        });
    if (doCache) {
        CACHE.set(src, promise);
    }
    return promise;
};
