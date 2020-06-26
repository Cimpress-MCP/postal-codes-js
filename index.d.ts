// Type definitions for postal-codes-js
// Project: https://github.com/Cimpress-MCP/postal-codes-js
// Definitions by: hborghols <https://github.com/hborghols>

/**
 * @param countryCode ISO 3166-1 alpha-2 or alpha-3 country code as string.
 * @param postalCode  Postal code as string or number.
 * @returns Returns true if valid, error as string otherwise.
 * */

export function validate(
  countryCode: string,
  postalCode: string | number
): boolean | string;
