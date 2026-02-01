import Decimal from 'decimal.js';

/**
 * Format currency value with 4 decimal places (for storage)
 */
export function formatCurrency(value: string | number): string {
  try {
    const decimal = new Decimal(value);
    return decimal.toFixed(4);
  } catch {
    return '0.0000';
  }
}

/**
 * Format currency for display with thousand separators
 */
export function formatCurrencyDisplay(value: string | number): string {
  try {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 4,
      maximumFractionDigits: 4
    }).format(num);
  } catch {
    return '0.0000';
  }
}

/**
 * Format date for display
 */
export function formatDate(isoString: string): string {
  try {
    return new Date(isoString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return isoString;
  }
}

/**
 * Format date for display (short version)
 */
export function formatDateShort(isoString: string): string {
  try {
    return new Date(isoString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch {
    return isoString;
  }
}

/**
 * Generate sub-row labels (A, B, C, ...)
 */
export function generateSubRowLabel(index: number): string {
  if (index < 0 || index > 25) return String(index + 1);
  return String.fromCharCode(65 + index);  // A, B, C, ...
}

/**
 * Create empty column data with zeros
 */
export function createEmptyColumnData(): { a: string; b: string; c: string; d: string; e: string; f: string; g: string } {
  return {
    a: '0.0000',
    b: '0.0000',
    c: '0.0000',
    d: '0.0000',
    e: '0.0000',
    f: '0.0000',
    g: '0.0000'
  };
}
