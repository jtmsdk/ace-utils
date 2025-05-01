/**
 * Returns true if given value is defined, i.e. it is NOT null, undefined or NaN.
 * @param value the target value to check.
 */
export const isDefined = (value: any): boolean => {
    return !!(value || value === 0 || value === false);
}

/**
 * Returns a deep copy or clone of the given source input object. This is an
 * actual deep copy with all the same properties/values, but copied as new instances.
 * Can copy or clone any type of source object: date, array, object, etc.
 * @param source the source object to copy or clone.
 */
export const deepCopy = <T>(source: T): T => {
    if (!source || typeof source !== 'object') {
        return source;
    }
    if (source instanceof Date) {
        return new Date(source.getTime()) as T;
    }
    if (Array.isArray(source)) {
        return source.map(item => deepCopy(item)) as T;
    }
    let copy = {} as T;
    for (const key in source) {
        if (source.hasOwnProperty(key)) {
            copy[key] = deepCopy(source[key]);
        }
    }
    return copy;
};

/**
 * Returns true if the given two objects or values are deeply equal.
 * @param obj1 the first object or value to compare.
 * @param obj2 the second object or value to compare.
 */
export const deepEquals = (obj1: any, obj2: any): boolean => {
    if (obj1 === obj2) {
        return true;
    }
    if (obj1 === null || obj2 === null || typeof obj1 !== 'object' || typeof obj2 !== 'object') {
        return false;
    }
    if (obj1 instanceof Date && obj2 instanceof Date) {
        return obj1.getTime() === obj2.getTime();
    }
    if (Array.isArray(obj1) && Array.isArray(obj2)) {
        if (obj1.length !== obj2.length) {
            return false;
        }
        return obj1.every((el, index) => deepEquals(el, obj2[index]));
    }
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) {
        return false;
    }
    return keys1.every(key => deepEquals(obj1[key], obj2[key]));
};

/**
 * Creates a debounced function that delays invoking the provided function until after
 * the specified wait time has elapsed since the last time the debounced function was called.
 * @param func The function to debounce.
 * @param wait The number of milliseconds to delay.
 * @returns A debounced version of the provided function.
 */
export const debounce = <T extends (...args: any[]) => void>(func: T, wait: number): T => {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    return function (...args: Parameters<T>) {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            func(...args);
        }, wait);
    } as T;
};

/**
 * Creates a function that can only be called once. Subsequent calls will return
 * the result of the first invocation.
 * @param func The function to restrict to a single call.
 * @returns A new function that can only be called once.
 */
export const once = <T extends (...args: any[]) => any>(func: T): T => {
    let called = false;
    let result: ReturnType<T>;

    return function (...args: Parameters<T>) {
        if (!called) {
            called = true;
            result = func(...args);
        }
        return result;
    } as T;
};