import {SETTINGS} from 'ace.settings';

const yyyy = (d) => d.getFullYear();
const MM = (d) => ('0' + (d.getMonth() + 1)).slice(-2);
const dd = (d) => ('0' + d.getDate()).slice(-2);
const HH = (d) => ('0' + d.getHours()).slice(-2);
const mm = (d) => ('0' + d.getMinutes()).slice(-2);
const ss = (d) => ('0' + d.getSeconds()).slice(-2);
const format = (text, date) => {
    date = toDate(date);
    return (text || '')
        .replaceAll('yyyy', yyyy(date))
        .replaceAll('MM', MM(date))
        .replaceAll('dd', dd(date))
        .replaceAll('HH', HH(date))
        .replaceAll('mm', mm(date))
        .replaceAll('ss', ss(date));
};

/**
 * Converts given number of milliseconds to Date object unless it is already a Date.
 * @param {*} value the number of milliseconds or a Date object.
 */
export const toDate = (value) => {
    return (value instanceof Date) ? value : new Date(value);
};

/**
 * Converts a date to a date-time format, e.g. "29/01/2025 14:30".
 * @param {Date|number} date the target date or timestamp
 * @returns {string|null}
 */
export const toDateTimeString = (date) => {
    return format(SETTINGS.DATE_TIME_FORMAT, date);
};

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

