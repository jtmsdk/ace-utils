/**
 * Defines settings and constants for all utilities in this library.
 */
class Settings {
    LOCALE = 'fi-FI';
    DECIMAL_SEPARATOR = '.';
    DATE_TIME_FORMAT = 'yyyy-MM-dd HH:mm';
    DATE_FORMAT = 'yyyy-MM-dd';
    TIME_FORMAT = 'HH:mm';

    get lang(): string {
        return this.LOCALE.split('-')[0];
    }
    get country(): string {
        return this.LOCALE.split('-')[1];
    }
}

export const SETTINGS = new Settings();