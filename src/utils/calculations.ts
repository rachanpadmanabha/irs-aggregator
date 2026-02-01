import Decimal from 'decimal.js';
import type { ColumnData } from '@/types/entity';

// Configure decimal.js for high precision
Decimal.set({ precision: 20, rounding: Decimal.ROUND_HALF_UP });

/**
 * Calculate column (g) total - sum of columns a through f
 * CRITICAL: Column (g) is ALWAYS system-derived, never user-editable
 */
export function calculateColumnG(columns: Partial<ColumnData>): string {
  const sum = new Decimal(columns.a || '0')
    .plus(columns.b || '0')
    .plus(columns.c || '0')
    .plus(columns.d || '0')
    .plus(columns.e || '0')
    .plus(columns.f || '0');
  
  return sum.toFixed(4);  // Store with 4 decimals, NO rounding
}

/**
 * Calculate foreign source total - sum of columns b,c,d,e,f ONLY
 * Used for aggregation (excludes U.S. source column a)
 */
export function calculateForeignTotal(columns: Partial<ColumnData>): string {
  const sum = new Decimal(columns.b || '0')
    .plus(columns.c || '0')
    .plus(columns.d || '0')
    .plus(columns.e || '0')
    .plus(columns.f || '0');
  
  return sum.toFixed(4);
}

/**
 * Validate and sanitize numeric input
 */
export function sanitizeNumericInput(value: string): string {
  // Allow empty, negative sign, digits, and one decimal point
  const sanitized = value.replace(/[^\d.-]/g, '');
  
  // Ensure only one decimal point
  const parts = sanitized.split('.');
  if (parts.length > 2) {
    return parts[0] + '.' + parts.slice(1).join('');
  }
  
  // Ensure only one negative sign at the start
  const negativeCount = (sanitized.match(/-/g) || []).length;
  if (negativeCount > 1) {
    const hasLeadingNegative = sanitized.startsWith('-');
    const cleaned = sanitized.replace(/-/g, '');
    return hasLeadingNegative ? '-' + cleaned : cleaned;
  }
  
  return sanitized;
}

/**
 * Validate numeric value is valid
 */
export function isValidNumeric(value: string): boolean {
  if (value === '' || value === '-') return true; // Allow empty or negative sign only
  
  try {
    new Decimal(value);
    return true;
  } catch {
    return false;
  }
}

/**
 * Add two decimal values
 */
export function addDecimals(a: string, b: string): string {
  return new Decimal(a || '0').plus(b || '0').toFixed(4);
}
