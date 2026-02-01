export interface Warning {
  id: string;
  type: 'missing_data' | 'empty_line' | 'large_value' | 'negative_value';
  message: string;
  entityId?: string;
  lineNumber?: number;
  severity: 'info' | 'warning' | 'error';
}
