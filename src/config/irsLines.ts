export interface IRSLine {
  lineNumber: number;
  description: string;
}

export const IRS_PART_II_LINES: readonly IRSLine[] = [
  { lineNumber: 1, description: 'Sales' },
  { lineNumber: 2, description: 'Gross income from performance of services' },
  { lineNumber: 3, description: 'Gross rental real estate income' },
  { lineNumber: 4, description: 'Other gross rental income' },
  { lineNumber: 5, description: 'Interest income' },
  { lineNumber: 6, description: 'Ordinary dividends' },
  { lineNumber: 7, description: 'Qualified dividends' },
  { lineNumber: 8, description: 'Royalties' },
  { lineNumber: 9, description: 'Net short-term capital gain' },
  { lineNumber: 10, description: 'Net long-term capital gain' },
  { lineNumber: 11, description: 'Collectibles (28%) gain' },
  { lineNumber: 12, description: 'Unrecaptured section 1250 gain' },
  { lineNumber: 13, description: 'Net section 1231 gain' },
  { lineNumber: 14, description: 'Other income (loss)' },
  { lineNumber: 15, description: 'Section 951(a)(1) inclusions' },
  { lineNumber: 16, description: 'Section 951A(a) inclusions' },
  { lineNumber: 17, description: 'Other foreign income' },
] as const;

export function getLineDescription(lineNumber: number): string {
  const line = IRS_PART_II_LINES.find(l => l.lineNumber === lineNumber);
  return line?.description ?? `Line ${lineNumber}`;
}

export function getLineNumbers(): number[] {
  return IRS_PART_II_LINES.map(l => l.lineNumber);
}
