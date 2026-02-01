import { useState, useEffect } from 'react';
import { useAppDispatch } from '@/app/hooks';
import { addCountryEntry, deleteCountryEntry, updateColumnData } from '@/features/entities/entitySlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Combobox } from '@/components/ui/combobox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { PartIILineData, ColumnKey } from '@/types/entity';
import { validateCountryUniqueness } from '@/utils/validators';
import { formatCurrencyDisplay } from '@/utils/format';
import { sanitizeNumericInput, isValidNumeric } from '@/utils/calculations';
import { fetchCountries, type Country } from '@/services/countryService';

interface LineDataTableProps {
  entityId: string;
  lineNumber: number;
  lineData: PartIILineData | undefined;
}

export function LineDataTable({ entityId, lineNumber, lineData }: LineDataTableProps) {
  const dispatch = useAppDispatch();
  const [newCountry, setNewCountry] = useState('');
  const [error, setError] = useState('');
  const [countryList, setCountryList] = useState<Country[]>([]);
  const [loadingCountries, setLoadingCountries] = useState(true);
  
  // Load countries on mount
  useEffect(() => {
    fetchCountries()
      .then(setCountryList)
      .catch(error => {
        console.error('Failed to load countries:', error);
      })
      .finally(() => setLoadingCountries(false));
  }, []);
  
  const handleAddCountry = () => {
    if (!newCountry.trim()) {
      setError('Country name is required');
      return;
    }
    
    if (!validateCountryUniqueness(lineData, newCountry.trim())) {
      setError('This country already exists for this line');
      return;
    }
    
    dispatch(addCountryEntry({
      entityId,
      lineNumber,
      country: newCountry.trim()
    }));
    
    setNewCountry('');
    setError('');
  };
  
  const handleDeleteCountry = (entryId: string) => {
    if (window.confirm('Delete this country entry?')) {
      dispatch(deleteCountryEntry({ entityId, lineNumber, entryId }));
    }
  };
  
  const handleColumnChange = (entryId: string, columnKey: ColumnKey | 'eCategory', value: string) => {
    // Column (g) is never editable
    if (columnKey === 'g') return;
    
    if (columnKey === 'eCategory') {
      dispatch(updateColumnData({
        entityId,
        lineNumber,
        entryId,
        columnKey,
        value
      }));
      return;
    }
    
    const sanitized = sanitizeNumericInput(value);
    
    if (!isValidNumeric(sanitized)) {
      return;
    }
    
    dispatch(updateColumnData({
      entityId,
      lineNumber,
      entryId,
      columnKey,
      value: sanitized
    }));
  };
  
  const countries = lineData?.countries || [];
  
  const countryOptions = countryList.map(country => ({
    label: country.name,
    value: country.name
  }));
  
  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-indigo-500/10 rounded-2xl border-2 border-purple-200/50 shadow-lg overflow-visible">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400/5 to-blue-400/5 shimmer pointer-events-none"></div>
          <div className="flex-1 relative">
            <Combobox
              value={newCountry}
              onChange={setNewCountry}
              options={countryOptions}
              placeholder={loadingCountries ? "Loading countries..." : "🌍 Search or type country name..."}
              disabled={loadingCountries}
              error={!!error}
            />
          </div>
          <Button onClick={handleAddCountry} type="button" disabled={loadingCountries} className="relative shrink-0">
            <span className="mr-2">➕</span> Add Country
          </Button>
        </div>
      </div>
      
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {countries.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No countries added yet. Add a country to begin entering data.
        </div>
      ) : (
        <div className="border-2 border-purple-100 rounded-2xl overflow-hidden shadow-xl bg-white">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-indigo-500/10 hover:from-purple-500/15 hover:via-blue-500/15 hover:to-indigo-500/15 transition-all duration-300 border-b-2 border-purple-200">
                <TableHead className="w-12 font-black text-purple-900">Row</TableHead>
                <TableHead className="min-w-[150px] font-black text-purple-900">Country</TableHead>
                <TableHead className="min-w-[120px] font-black text-purple-900">(a) U.S. Source</TableHead>
                <TableHead className="min-w-[120px] font-black text-purple-900">(b) Foreign Branch</TableHead>
                <TableHead className="min-w-[120px] font-black text-purple-900">(c) Passive</TableHead>
                <TableHead className="min-w-[120px] font-black text-purple-900">(d) General</TableHead>
                <TableHead className="min-w-[120px] font-black text-purple-900">(e) Other</TableHead>
                <TableHead className="min-w-[100px] font-black text-purple-900">(e) Category</TableHead>
                <TableHead className="min-w-[120px] font-black text-purple-900">(f) Sourced by Partner</TableHead>
                <TableHead className="min-w-[120px] bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-indigo-500/20 font-black text-purple-900">(g) Total 🎯</TableHead>
                <TableHead className="w-20"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {countries.map((country, idx) => (
                <TableRow 
                  key={country.id}
                  className="hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-blue-50/50 transition-all duration-200 group animate-slide-up"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <TableCell className="font-mono text-xs font-bold text-purple-700">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                      {country.subRowLabel}
                    </div>
                  </TableCell>
                  <TableCell className="font-bold text-foreground group-hover:text-primary transition-colors">
                    {country.country}
                  </TableCell>
                  <TableCell>
                    <Input
                      type="text"
                      value={country.columns.a}
                      onChange={(e) => handleColumnChange(country.id, 'a', e.target.value)}
                      className="font-mono text-sm"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="text"
                      value={country.columns.b}
                      onChange={(e) => handleColumnChange(country.id, 'b', e.target.value)}
                      className="font-mono text-sm"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="text"
                      value={country.columns.c}
                      onChange={(e) => handleColumnChange(country.id, 'c', e.target.value)}
                      className="font-mono text-sm"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="text"
                      value={country.columns.d}
                      onChange={(e) => handleColumnChange(country.id, 'd', e.target.value)}
                      className="font-mono text-sm"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="text"
                      value={country.columns.e}
                      onChange={(e) => handleColumnChange(country.id, 'e', e.target.value)}
                      className="font-mono text-sm"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="text"
                      value={country.columns.eCategory || ''}
                      onChange={(e) => handleColumnChange(country.id, 'eCategory', e.target.value)}
                      placeholder="Code"
                      className="text-sm"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="text"
                      value={country.columns.f}
                      onChange={(e) => handleColumnChange(country.id, 'f', e.target.value)}
                      className="font-mono text-sm"
                    />
                  </TableCell>
                  <TableCell className="bg-gradient-to-br from-purple-500/15 via-blue-500/15 to-indigo-500/15 border-l-4 border-purple-400/50">
                    <div className="font-mono text-base font-black bg-gradient-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent" title="System calculated - not editable">
                      {formatCurrencyDisplay(country.columns.g)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteCountry(country.id)}
                      className="opacity-0 group-hover:opacity-100 transition-all duration-200"
                    >
                      🗑️
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      
      <Alert className="bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-indigo-500/10 border-2 border-purple-200/50 shadow-md animate-scale-in">
        <AlertDescription className="text-sm font-medium">
          <strong className="text-purple-700">💡 Important:</strong> Column (g) is automatically calculated as the sum of columns (a) through (f).
          Enter values with up to 4 decimal places. Negative values are allowed.
        </AlertDescription>
      </Alert>
    </div>
  );
}
