import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { setAggregation, clearAggregation } from '@/features/aggregation/aggregationSlice';
import { generateAggregation } from '@/services/aggregationEngine';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatDateShort, formatCurrencyDisplay } from '@/utils/format';

export function AggregationReport() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const entities = useAppSelector(state => state.entities);
  const aggregation = useAppSelector(state => state.aggregation);
  const taxYear = useAppSelector(state => state.ui.taxYear);
  
  const snapshot = aggregation.currentSnapshot;
  
  const handleRegenerate = () => {
    const newSnapshot = generateAggregation(entities.byId, entities.entityData, taxYear);
    dispatch(setAggregation(newSnapshot));
  };
  
  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear this aggregation report?')) {
      dispatch(clearAggregation());
    }
  };
  
  if (!snapshot) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Aggregation Report</h1>
          <p className="text-muted-foreground">
            View aggregated Schedule K-2 Part II data
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>No Report Generated</CardTitle>
            <CardDescription>
              You haven't generated an aggregation report yet. Make sure you have at least one
              SUBMITTED entity, then click "Generate Report" from the Dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Button onClick={() => navigate('/')}>
                Go to Dashboard
              </Button>
              <Button variant="outline" onClick={() => navigate('/entities')}>
                View Entities
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  const includedEntities = snapshot.includedEntityIds
    .map((id: string) => entities.byId[id])
    .filter((e): e is NonNullable<typeof e> => !!e);
  
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-start justify-between animate-slide-up">
        <div>
          <h1 className="text-5xl font-black tracking-tight bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Aggregation Report
          </h1>
          <p className="text-muted-foreground mt-2 text-lg font-medium">
            Tax Year {snapshot.taxYear} • Generated {formatDateShort(snapshot.generatedAt)}
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleRegenerate} size="lg">
            <span className="mr-2">🔄</span> Regenerate
          </Button>
          <Button variant="outline" onClick={handleClear} size="lg">
            <span className="mr-2">🗑️</span> Clear Report
          </Button>
          <Button variant="outline" onClick={() => navigate('/')} size="lg">
            ← Dashboard
          </Button>
        </div>
      </div>
      
      {!snapshot.isValid && (
        <Alert variant="destructive">
          <AlertTitle>Report Outdated</AlertTitle>
          <AlertDescription>
            Entity data has changed since this report was generated. Click "Regenerate" to create
            an updated report with the latest data.
          </AlertDescription>
        </Alert>
      )}
      
      <Card>
        <CardHeader>
          <CardTitle>Report Summary</CardTitle>
          <CardDescription>
            This report aggregates foreign tax data from SUBMITTED entities only
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Entities Included</div>
              <div className="text-2xl font-bold">{snapshot.includedEntityIds.length}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Line Items</div>
              <div className="text-2xl font-bold">{snapshot.results.length}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Status</div>
              <Badge variant={snapshot.isValid ? 'default' : 'destructive'}>
                {snapshot.isValid ? 'Valid' : 'Outdated'}
              </Badge>
            </div>
          </div>
          
          <div>
            <div className="text-sm font-medium mb-2">Included Entities:</div>
            <div className="flex flex-wrap gap-2">
              {includedEntities.map((entity: { id: string; name: string }) => (
                <Badge key={entity.id} variant="outline">
                  {entity.name}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {snapshot.results.length === 0 ? (
        <Alert>
          <AlertDescription>
            No data to aggregate. The included entities don't have any Part II data entered.
          </AlertDescription>
        </Alert>
      ) : (
        <div className="space-y-6">
          {snapshot.results.map((result: { lineNumber: number; lineDescription: string; countryTotals: Array<{ country: string; foreignTotal: string }> }) => (
            <Card key={result.lineNumber}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="font-mono text-sm">Line {result.lineNumber}</span>
                  <span className="text-base">—</span>
                  <span>{result.lineDescription}</span>
                </CardTitle>
                <CardDescription>
                  Aggregated foreign source totals (columns b, c, d, e, f only)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Country</TableHead>
                      <TableHead className="text-right">Foreign Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {result.countryTotals.map((ct: { country: string; foreignTotal: string }) => (
                      <TableRow key={ct.country}>
                        <TableCell className="font-medium">{ct.country}</TableCell>
                        <TableCell className="text-right font-mono">
                          {formatCurrencyDisplay(ct.foreignTotal)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      <Alert>
        <AlertDescription className="text-sm">
          <strong>Aggregation Rules:</strong> This report includes only SUBMITTED entities.
          Foreign totals are calculated from columns (b), (c), (d), (e), and (f) only —
          U.S. source income (column a) is excluded from aggregation.
        </AlertDescription>
      </Alert>
    </div>
  );
}
