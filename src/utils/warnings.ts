import type { EntityData } from '@/types/entity';
import type { Warning } from '@/types/common';
import { v4 as uuidv4 } from 'uuid';
import { isValueNegative, isValueUnusuallyLarge } from './validators';

/**
 * Check for data warnings (non-blocking)
 */
export function checkDataWarnings(entityData: EntityData): Warning[] {
  const warnings: Warning[] = [];

  Object.entries(entityData.lines).forEach(([lineNum, lineData]) => {
    const lineNumber = parseInt(lineNum);

    // Check for empty lines
    if (lineData.countries.length === 0) {
      warnings.push({
        id: uuidv4(),
        type: 'empty_line',
        message: `Line ${lineNumber} has no country entries`,
        entityId: entityData.entityId,
        lineNumber,
        severity: 'info'
      });
    }

    // Check each country entry
    lineData.countries.forEach(country => {
      // Check for missing data (all columns zero)
      const allZero = Object.entries(country.columns)
        .filter(([key]) => key !== 'g' && key !== 'eCategory')
        .every(([, value]) => !value || value === '0' || value === '0.0000');

      if (allZero) {
        warnings.push({
          id: uuidv4(),
          type: 'missing_data',
          message: `Line ${lineNumber}, ${country.country}: All values are zero`,
          entityId: entityData.entityId,
          lineNumber,
          severity: 'warning'
        });
      }

      // Check for unusually large values
      Object.entries(country.columns).forEach(([key, value]) => {
        if (key !== 'eCategory' && isValueUnusuallyLarge(value)) {
          warnings.push({
            id: uuidv4(),
            type: 'large_value',
            message: `Line ${lineNumber}, ${country.country}, Column (${key}): Unusually large value`,
            entityId: entityData.entityId,
            lineNumber,
            severity: 'warning'
          });
        }

        // Check for negative values
        if (key !== 'eCategory' && isValueNegative(value)) {
          warnings.push({
            id: uuidv4(),
            type: 'negative_value',
            message: `Line ${lineNumber}, ${country.country}, Column (${key}): Negative value`,
            entityId: entityData.entityId,
            lineNumber,
            severity: 'info'
          });
        }
      });
    });
  });

  return warnings;
}

/**
 * Check if entity has any data
 */
export function hasEntityData(entityData: EntityData | undefined): boolean {
  if (!entityData) return false;
  return Object.keys(entityData.lines).length > 0;
}

/**
 * Count total country entries across all lines
 */
export function countTotalCountries(entityData: EntityData | undefined): number {
  if (!entityData) return 0;
  
  return Object.values(entityData.lines).reduce(
    (sum, line) => sum + line.countries.length,
    0
  );
}
