import type { PartIILineData, ColumnKey } from '@/types/entity';

/**
 * INVARIANT: Country uniqueness per entity per line
 * A country may appear ONLY once per entity per IRS line
 */
export function validateCountryUniqueness(
  lineData: PartIILineData | undefined,
  newCountry: string,
  excludeId?: string
): boolean {
  if (!lineData) return true;
  
  return !lineData.countries.some(
    entry => entry.id !== excludeId && entry.country.toLowerCase() === newCountry.toLowerCase()
  );
}

/**
 * INVARIANT: Column (g) is NEVER editable
 */
export function validateColumnEditable(columnKey: ColumnKey): boolean {
  return columnKey !== 'g';
}

/**
 * Validate entity name
 */
export function validateEntityName(name: string): string | null {
  if (!name || name.trim().length === 0) {
    return 'Entity name is required';
  }
  if (name.trim().length < 2) {
    return 'Entity name must be at least 2 characters';
  }
  return null;
}

/**
 * Validate entity identifier (Tax ID)
 */
export function validateEntityIdentifier(identifier: string): string | null {
  if (!identifier || identifier.trim().length === 0) {
    return 'Entity identifier is required';
  }
  return null;
}

/**
 * Check if value is unusually large (warning, not blocking)
 */
export function isValueUnusuallyLarge(value: string, threshold: number = 1000000000): boolean {
  try {
    const num = parseFloat(value);
    return Math.abs(num) > threshold;
  } catch {
    return false;
  }
}

/**
 * Check if value is negative (warning, not blocking)
 */
export function isValueNegative(value: string): boolean {
  try {
    return parseFloat(value) < 0;
  } catch {
    return false;
  }
}
