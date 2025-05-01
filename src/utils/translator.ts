export class Translator {

    keys = new Map<string, string>();

    /**
     * Adds a single translatation key-value pair into available translations.
     * Replaces any already existing translation text value for the given key.
     * Translation text can contain parameter placeholders in the form of {{name}}, e.g.:
     * "Hello, {{firstName}} {{lastName}}!" which can be replaced with actual values when translating.
     * @param key the translation key.
     * @param text the translation text value.
     */
    addKey(key: string, text: string): void {
        this.keys.set(key, text);
    }

    /**
     * Adds multiple translation key-value pairs into available translations.
     * Replace any already existing translation text values for the given keys.
     * Translation texts can contain placeholders in the form of {{name}}, e.g.:
     * "Hello, {{firstName}} {{lastName}}!" which can be replaced with actual values when translating.
     * @param keys the translation key-value pairs to add.
     */
    addKeys(keys: { [key: string]: string }): void {
        if (keys) {
            Object.keys(keys).forEach(key => this.addKey(key, keys[key]));
        }
    }

    /**
     * Returns translation text value for the given key, or the key itself if no translation is available.
     * Optionally replaces placeholders in the translation text with the given parameters.
     * @param key the translation key. 
     * @param params optional parameters to replace placeholders in the translation text. 
     * @param fallback optional fallback text to use if no translation is available for the given key.
     */
    translate(key: string, params?: { [key: string]: string }, fallback?: string): string {
        let text = this.keys.get(key);
        if (!text && fallback) {
            text = fallback;
        }
        return text ? this.replace(text, params) : key;
    }

    /**
     * Replaces placeholders in the given text with the actual values from the given parameters.
     * @param text the text to replace placeholders in.
     * @param params the parameters to replace placeholders with.
     */
    private replace(text: string, params: { [key: string]: string }): string {
        if (!text || !params) {
            return text;
        }
        Object.keys(params).forEach(key => {
            text = text.replaceAll(`{{${key}}}`, params[key]);
        });
        return text;
    }

    /**
     * Returns true if the given translation key is available in available translations.
     * @param key the translation key to check
     */
    hasKey(key: string): boolean {
        return this.keys.has(key);
    }

    /**
     * Removes the given translation key from available translations.
     * @param key the translation key to remove.
     */
    removeKey(key: string): void {
        this.keys.delete(key);
    }

    /**
     * Removes all translation keys from available translations.
     */
    removeAllKeys(): void {
        this.keys.clear();
    }
}

export const translator = new Translator();
