import { isNumber, toNumber } from "../numbers";
import { SETTINGS } from "../settings";

beforeEach(() => {
    SETTINGS.DECIMAL_SEPARATOR = '.';
});

describe('isNumber()', () => {

    test('should return true for valid numeric strings', () => {
        expect(isNumber('0')).toBe(true);
        expect(isNumber('000')).toBe(true);
        expect(isNumber('001')).toBe(true);
        expect(isNumber('00.01')).toBe(true);
        expect(isNumber('0.0')).toBe(true);
        expect(isNumber('0.123')).toBe(true);
        expect(isNumber('.12')).toBe(true);
        expect(isNumber('+.12')).toBe(true);
        expect(isNumber('-.12')).toBe(true);
        expect(isNumber('-1')).toBe(true);
        expect(isNumber('-123')).toBe(true);
        expect(isNumber('-1.23')).toBe(true);
        expect(isNumber('+1')).toBe(true);
        expect(isNumber('+1.23')).toBe(true);
        expect(isNumber('1')).toBe(true);
        expect(isNumber('123')).toBe(true);
        expect(isNumber('1.23')).toBe(true);
        expect(isNumber('1.00')).toBe(true);
    });

    test('should return false for invalid numeric strings', () => {
        expect(isNumber('1.2abc')).toBe(false);
        expect(isNumber('123abc')).toBe(false);
        expect(isNumber('1.23.45')).toBe(false);
        expect(isNumber('1.23,45')).toBe(false);
        expect(isNumber('1,23.45')).toBe(false);
        expect(isNumber('+-123')).toBe(false);
        expect(isNumber('0..1')).toBe(false);
        expect(isNumber('zero')).toBe(false);
    });

    test('should respect the decimal separator defined in settings', () => {
        SETTINGS.DECIMAL_SEPARATOR = ',';
        expect(isNumber('0,123')).toBe(true);
        expect(isNumber(',12')).toBe(true);
        expect(isNumber('-1,23')).toBe(true);
        expect(isNumber('1.23')).toBe(false);
        expect(isNumber('1,23.0')).toBe(false);
    });

    test('should return false for empty or null values', () => {
        expect(isNumber('')).toBe(false);
        expect(isNumber(null)).toBe(false);
        expect(isNumber(undefined)).toBe(false);
    });

});

describe('toNumber()', () => {

    test('should return the number value for valid numeric strings', () => { 
        expect(toNumber('0')).toBe(0);
        expect(toNumber('000')).toBe(0);
        expect(toNumber('001')).toBe(1);
        expect(toNumber('00.01')).toBe(0.01);
        expect(toNumber('0.0')).toBe(0);
        expect(toNumber('0.123')).toBe(0.123);
        expect(toNumber('.12')).toBe(0.12);
        expect(toNumber('+.12')).toBe(0.12);
        expect(toNumber('-.12')).toBe(-0.12);
        expect(toNumber('-1')).toBe(-1);
        expect(toNumber('-123')).toBe(-123);
        expect(toNumber('-1.23')).toBe(-1.23);
        expect(toNumber('+1')).toBe(1);
        expect(toNumber('+1.23')).toBe(1.23);
        expect(toNumber('1')).toBe(1);
        expect(toNumber('123')).toBe(123);
        expect(toNumber('1.23')).toBe(1.23);
        expect(toNumber('1.00')).toBe(1);
    });

    test('should return null for invalid numeric strings', () => {
        expect(toNumber('1.2abc')).toBe(null);
        expect(toNumber('123abc')).toBe(null);
        expect(toNumber('1.23.45')).toBe(null);
        expect(toNumber('1.23,45')).toBe(null);
        expect(toNumber('1,23.45')).toBe(null);
        expect(toNumber('+-123')).toBe(null);
        expect(toNumber('0..1')).toBe(null);
        expect(toNumber('zero')).toBe(null);
    });

    test('should respect the decimal separator defined in settings', () => {
        SETTINGS.DECIMAL_SEPARATOR = ',';
        expect(toNumber('0,123')).toBe(0.123);
        expect(toNumber(',12')).toBe(0.12);
        expect(toNumber('-1,23')).toBe(-1.23);
        expect(toNumber('1.23')).toBe(null);
        expect(toNumber('1,23.0')).toBe(null);
    });

    test('should return null for empty or null values', () => {
        expect(toNumber('')).toBe(null);
        expect(toNumber(null)).toBe(null);
        expect(toNumber(undefined)).toBe(null);
    });

});