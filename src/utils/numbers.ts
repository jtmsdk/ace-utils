
import { SETTINGS } from "../settings";

/**
 * Returns true if given number value is defined; i.e. if it is NOT null, undefined or NaN.
 * @param value the number value to check.
 */
const isDefined = (value: number): boolean => {
    return !!(value || value === 0);
}

/**
 * Returns true if the given numeric string represents valid number that can be parsed without problems.
 * @param value the numeric string value.
 */
export const isNumber = (value: string): boolean => {
    const regex = new RegExp(`^[-+]?[0-9]*(\\${SETTINGS.DECIMAL_SEPARATOR})?[0-9]+$`);
    return regex.test(value);
}

/**
 * Returns the given numeric string value converted or parsed into an actual number.
 * Returns null if the string does not represent a valid number and cannot be parsed.
 * @param value the numeric string value.
 */
export const toNumber = (value: string): number => {
    if (isNumber(value)) {
        value.replace(SETTINGS.DECIMAL_SEPARATOR, '.');
        return Number(value);
    }
    return null;
}

/**
 * Returns the given value rounded to given maximum number of decimals. Uses normal
 * rounding rules (.5 upwards, .4 downwards), and does not add unnecessary decimal
 * place numbers if the value is integer or has less decimal places.
 * E.g.: toDecimals(1.235, 2) === 1.24, and toDecimals(12, 3) === 12.
 * Returns null if the value is not defined.
 * @param value the target value to round.
 * @param decimals the number of decimals to round to.
 */
export const toDecimals = (value: number, decimals: number = 2): number => {
    if (!isDefined(value)) {
        return null;
    }
    const factor = Math.pow(10, decimals);
    return Math.round(value * factor) / factor;
}

/**
 * Returns the given value rounded to given maximum number of significant digits.
 * Uses normal rounding rules (.5 upwards, .4 downwards), and does not add unnecessary decimal
 * place numbers if the value is integer or has less decimal places.
 * @param value the target value to round.
 * @param precision the target number of significant digits.
 */
export const toPrecision = (value: number, precision: number = 3): number => {
    return 0;
}

/**
 * Returns the given number value converted into string, using the decimal separator from settings.
 * Returns empty string if the value is not defined.
 * @param value the number value to convert.
 */
export const toString = (value: number): string => {
    return isDefined(value)
        ? (''+value).replaceAll('.', SETTINGS.DECIMAL_SEPARATOR)
        : '';
}