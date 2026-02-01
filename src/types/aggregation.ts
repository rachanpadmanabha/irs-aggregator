export interface AggregationSnapshot {
  id: string;
  generatedAt: string;
  taxYear: number;
  includedEntityIds: string[];    // Only SUBMITTED entities
  results: AggregationResult[];
  isValid: boolean;               // Invalidated on any entity edit
}

export interface AggregationResult {
  lineNumber: number;
  lineDescription: string;
  countryTotals: CountryTotal[];
}

export interface CountryTotal {
  country: string;
  foreignTotal: string;           // Sum of columns b,c,d,e,f only (decimal.js string)
}
