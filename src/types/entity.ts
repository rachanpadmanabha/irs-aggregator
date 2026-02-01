export type EntityStatus = 'DRAFT' | 'SUBMITTED';
export type ColumnKey = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g';

export interface Entity {
  id: string;                    // UUID
  name: string;
  identifier: string;             // Tax ID
  status: EntityStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ColumnData {
  a: string;  // U.S. source (stored as string for decimal.js)
  b: string;  // Foreign branch category
  c: string;  // Passive category
  d: string;  // General category
  e: string;  // Other category
  eCategory?: string;  // Free-text category code for column (e)
  f: string;  // Sourced by partner
  g: string;  // DERIVED ONLY - sum of a-f
}

export interface CountryEntry {
  id: string;                     // UUID for UI tracking
  country: string;                // Country name (unique per line per entity)
  subRowLabel: string;            // 'A', 'B', 'C', ... (cosmetic only)
  columns: ColumnData;
}

export interface PartIILineData {
  lineNumber: number;             // IRS line number (primary key)
  countries: CountryEntry[];      // Dynamic sub-rows
}

export interface EntityData {
  entityId: string;
  lines: Record<number, PartIILineData>;  // Keyed by IRS line number
}
