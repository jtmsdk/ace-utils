import { SETTINGS } from "../settings";

export enum Accuracy {
    SECOND,
    MINUTE,
    HOUR,
    DAY
}

/**
 * Returns true if given date value is defined; i.e. if it is NOT null, undefined or NaN.
 * @param date the date value to check.
 */
export const isDefined = (date: Date | number): boolean => {
    return !!(date || date === 0);
}

/**
 * Returns the given date value as a Date object; ensures that the value is a Date object.
 * Returns null if the given date value is not defined.
 * @param date the date value to convert to a Date object.
 */
export const toDate = (date: Date | number): Date => {
    if (!isDefined(date)) {
        return null;
    }
    return (!(date instanceof Date)) ? new Date(date) : date;
}

/**
 * Returns the given date value truncated to given digit accuracy.
 * In other words, sets all digits below the given accuracy to zero.
 * Returns the truncated date as Date object. 
 * Returns null if the given date value is not defined.
 * @param date the date value to truncate.
 * @param acc the accuracy to truncate the time to.
 */
export const toAccuracy = (date: Date | number, acc: Accuracy = Accuracy.MINUTE): Date => {
    if (!isDefined(date)) {
        return null;
    }
    date = toDate(date);
    switch (acc) {
        case Accuracy.SECOND:
            return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
        case Accuracy.MINUTE:
            return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes());
        case Accuracy.HOUR:
            return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours());
        case Accuracy.DAY:
            return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }
}

/**
 * Returns true if the given two date values are the same (equal) within the given accuracy. 
 * E.g. if accuracy is MINUTE, then the seconds and milliseconds are ignored.
 * Returns false if either or both of the date values are not defined.
 * @param date1 the first date value to compare.
 * @param date2 the second date value to compare.
 * @param acc the accuracy to compare the date values with.
 */
export const isSame = (date1: Date | number, date2: Date | number, acc: Accuracy = Accuracy.MINUTE): boolean => {
    if (!isDefined(date1) || !isDefined(date2)) {
        return false;
    }
    return toAccuracy(date1, acc).getTime() === toAccuracy(date2, acc).getTime();
}

/**
 * Returns true if the date1 is same or earlier (equal or less) than date2 within the given accuracy. 
 * E.g. if accuracy is MINUTE, then the seconds and milliseconds are ignored.
 * Returns false if either or both of the date values are not defined.
 * @param date1 the first date value to compare.
 * @param date2 the second date value to compare.
 * @param acc the accuracy to compare the date values with.
 */
export const isSameOrBefore = (date1: Date | number, date2: Date | number, acc: Accuracy = Accuracy.MINUTE): boolean => {
    if (!isDefined(date1) || !isDefined(date2)) {
        return false;
    }
    return toAccuracy(date1, acc).getTime() <= toAccuracy(date2, acc).getTime();
}

/**
 * Returns true if the date1 is same or later (equal or greater) than date2 within the given accuracy. 
 * E.g. if accuracy is MINUTE, then the seconds and milliseconds are ignored.
 * Returns false if either or both of the date values are not defined.
 * @param date1 the first date value to compare.
 * @param date2 the second time value to compare.
 * @param acc the accuracy to compare the date values with.
 */
export const isSameOrAfter = (date1: Date | number, date2: Date | number, acc: Accuracy = Accuracy.MINUTE): boolean => {
    if (!isDefined(date1) || !isDefined(date2)) {
        return false;
    }
    return toAccuracy(date1, acc).getTime() >= toAccuracy(date2, acc).getTime();
}

/**
 * Returns true if the date1 is earlier (less) than date2 within the given accuracy. 
 * E.g. if accuracy is MINUTE, then the seconds and milliseconds are ignored.
 * Returns false if either or both of the date values are not defined.
 * @param date1 the first date value to compare.
 * @param date2 the second date value to compare.
 * @param acc the accuracy to compare the date values with.
 */
export const isBefore = (date1: Date | number, date2: Date | number, acc: Accuracy = Accuracy.MINUTE): boolean => {
    if (!isDefined(date1) || !isDefined(date2)) {
        return false;
    }
    return toAccuracy(date1, acc).getTime() < toAccuracy(date2, acc).getTime();
}

/**
 * Returns true if the date1 is later (greater) than date2 within the given accuracy. 
 * E.g. if accuracy is MINUTE, then the seconds and milliseconds are ignored.
 * Returns false if either or both of the date values are not defined.
 * @param date1 the first date value to compare.
 * @param date2 the second date value to compare.
 * @param acc the accuracy to compare the date values with.
 */
export const isAfter = (date1: Date | number, date2: Date | number, acc: Accuracy = Accuracy.MINUTE): boolean => {
    if (!isDefined(date1) || !isDefined(date2)) {
        return false;
    }
    return toAccuracy(date1, acc).getTime() > toAccuracy(date2, acc).getTime();
}

// Date and date format placeholder replacements
const yyyy = (d: Date) => '' + d.getFullYear();
const MM = (d: Date) => ('0' + (d.getMonth() + 1)).slice(-2);
const dd = (d: Date) => ('0' + d.getDate()).slice(-2);
const HH = (d: Date) => ('0' + d.getHours()).slice(-2);
const mm = (d: Date) => ('0' + d.getMinutes()).slice(-2);
const ss = (d: Date) => ('0' + d.getSeconds()).slice(-2);

/**
 * Replaces all date and date format placeholders in the given text with the actual date and date values.
 * E.g. "The time is HH:mm on dd.MM.yyyy" will be replaced with "The time is 12:34 on 31.12.2021".
 * Accepts the following placeholders in the text:
 * - yyyy: the year with 4 digits.
 * - MM: the month with 2 digits.
 * - dd: the day with 2 digits.
 * - HH: the hour with 2 digits.
 * - mm: the minute with 2 digits.
 * - ss: the second with 2 digits.
 * @param text the text to replace the placeholders in.
 * @param date the date to use for the replacement.
 */
export const replaceFormat = (text: string, date: Date | number): string => {
    if (!isDefined(date)) {
        return text || '';
    }
    text = text || '';
    date = toDate(date) as Date;
    text
        .replaceAll('yyyy', yyyy(date))
        .replaceAll('MM', MM(date))
        .replaceAll('dd', dd(date))
        .replaceAll('HH', HH(date))
        .replaceAll('mm', mm(date))
        .replaceAll('ss', ss(date));
}

/**
 * Returns the given date as a string, formatted according to the given format, e.g. "yyyy-MM-dd HH:mm:ss".
 * @param date the date to format.
 * @param format the format to use for the date. 
 */
export const toString = (date: Date | number, format: string): string => {
    if (!isDefined(date)) {
        return '';
    }
    format = format || SETTINGS.DATE_TIME_FORMAT;
    return replaceFormat(format, date);
}

/**
 * Returns the date part of given date as a string, formatted according to the current date format in settings.
 * @param date the date to format.
 */
export const toDateString = (date: Date | number): string => {
    return toString(date, SETTINGS.DATE_FORMAT);
}

/**
 * Returns the time part of given date as a string, formatted according to the current time format in settings.
 * @param date the date to format.
 */
export const toTimeString = (date: Date | number): string => {
    return toString(date, SETTINGS.TIME_FORMAT);
}

/**
 * Returns the date and time of given date as a string, formatted according to the current date and time format in settings.
 * @param date the date to format.
 */
export const toDateTimeString = (date: Date | number): string => {
    return toString(date, SETTINGS.DATE_TIME_FORMAT);
}
