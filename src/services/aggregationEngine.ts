import Decimal from 'decimal.js';
import { v4 as uuidv4 } from 'uuid';
import type { Entity, EntityData } from '@/types/entity';
import type { AggregationSnapshot, AggregationResult } from '@/types/aggregation';
import { getLineDescription } from '@/config/irsLines';

/**
 * CRITICAL AGGREGATION RULES:
 * 1. Include ONLY SUBMITTED entities
 * 2. Aggregate ONLY foreign-source columns (b,c,d,e,f) - EXCLUDE column (a) U.S. source
 * 3. Group by IRS line → country
 * 4. Implicit zeros for missing entity data
 * 5. Result is immutable snapshot
 */
export function generateAggregation(
  entities: Record<string, Entity>,
  entityData: Record<string, EntityData>,
  taxYear: number
): AggregationSnapshot {
  // 1. Filter SUBMITTED entities only (INVARIANT #4)
  const submittedEntityIds = Object.values(entities)
    .filter(e => e.status === 'SUBMITTED')
    .map(e => e.id);

  // 2. Group by line → country
  const lineCountryMap = new Map<number, Map<string, Decimal>>();

  submittedEntityIds.forEach(entityId => {
    const data = entityData[entityId];
    if (!data) return;

    Object.entries(data.lines).forEach(([lineNum, lineData]) => {
      lineData.countries.forEach(countryEntry => {
        // Aggregate ONLY foreign source columns (b,c,d,e,f)
        // EXCLUDE column (a) - U.S. source
        const foreignTotal = new Decimal(countryEntry.columns.b || '0')
          .plus(countryEntry.columns.c || '0')
          .plus(countryEntry.columns.d || '0')
          .plus(countryEntry.columns.e || '0')
          .plus(countryEntry.columns.f || '0');

        // Accumulate per country per line
        if (!lineCountryMap.has(+lineNum)) {
          lineCountryMap.set(+lineNum, new Map());
        }
        const countryMap = lineCountryMap.get(+lineNum)!;
        const current = countryMap.get(countryEntry.country) || new Decimal(0);
        countryMap.set(countryEntry.country, current.plus(foreignTotal));
      });
    });
  });

  // 3. Build results sorted by line number, then by country
  const results: AggregationResult[] = Array.from(lineCountryMap.entries())
    .map(([lineNumber, countryMap]) => ({
      lineNumber,
      lineDescription: getLineDescription(lineNumber),
      countryTotals: Array.from(countryMap.entries())
        .map(([country, total]) => ({
          country,
          foreignTotal: total.toFixed(4)
        }))
        .sort((a, b) => a.country.localeCompare(b.country))
    }))
    .sort((a, b) => a.lineNumber - b.lineNumber);

  return {
    id: uuidv4(),
    generatedAt: new Date().toISOString(),
    taxYear,
    includedEntityIds: submittedEntityIds,
    results,
    isValid: true
  };
}

/**
 * Get top N countries by total foreign tax
 */
export function getTopCountries(snapshot: AggregationSnapshot, limit: number = 10): Array<{ country: string; total: string }> {
  const countryTotals = new Map<string, Decimal>();

  snapshot.results.forEach(result => {
    result.countryTotals.forEach(ct => {
      const current = countryTotals.get(ct.country) || new Decimal(0);
      countryTotals.set(ct.country, current.plus(ct.foreignTotal));
    });
  });

  return Array.from(countryTotals.entries())
    .map(([country, total]) => ({
      country,
      total: total.toFixed(4)
    }))
    .sort((a, b) => new Decimal(b.total).cmp(a.total))
    .slice(0, limit);
}
