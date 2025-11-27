/**
 * Runtime settings for Ace-Utils.
 */
export class Settings {
    LOCALE = 'en-uk';
    DECIMAL_SEPARATOR = '.';
    TIME_FORMAT = 'HH:mm';
    DATE_FORMAT = 'yyyy-MM-dd';
    DATE_TIME_FORMAT = 'yyyy-MM-dd HH:mm';
    PATHS = {
        ICONS: 'assets/icons',
        SVGS: 'assets/svgs'
    }
    get lang() {
        return this.LOCALE.split('-')[0];
    }
    get country() {
        return this.LOCALE.split('-')[1];
    }
}

export const SETTINGS = new Settings();