import {SETTINGS} from '../settings';

/**
 * Converts a date to ISO format "YYYY-MM-DD".
 * @param {Date|number} date the target date or timestamp
 * @returns {string|null}
 */
export const toISODateString = (date) => {
    if (typeof date === 'number') date = new Date(date);
    return date ? date.toISOString().substring(0, 10) : null;
};

/**
 * Converts a date to a readable format, e.g. "29. May 2021".
 * @param {Date|number} date the target date or timestamp
 * @returns {string|null}
 */
export const toTextDateString = (date) => {
    if (typeof date === 'number') date = new Date(date);
    return date 
        ? `${date.getDate()}. ${date.toLocaleString(SETTINGS.LOCALE, {month: 'long'})} ${date.getFullYear()}` 
        : null;
};