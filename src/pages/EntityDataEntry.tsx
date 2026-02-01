import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { setEntityStatus } from '@/features/entities/entitySlice';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { IRS_PART_II_LINES } from '@/config/irsLines';
import { LineDataTable } from '@/components/LineDataTable';
import { checkDataWarnings } from '@/utils/warnings';
import { cn } from '@/lib/utils';

export function EntityDataEntry() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const entity = useAppSelector(state => id ? state.entities.byId[id] : undefined);
  const entityData = useAppSelector(state => id ? state.entities.entityData[id] : undefined);
  
  const [expandedLines, setExpandedLines] = useState<Set<number>>(new Set([1]));
  
  if (!entity || !id) {
    return (
      <div className="space-y-6">
        <Alert variant="destructive">
          <AlertTitle>Entity Not Found</AlertTitle>
          <AlertDescription>
            The requested entity could not be found.
          </AlertDescription>
        </Alert>
        <Button onClick={() => navigate('/entities')}>
          Back to Entities
        </Button>
      </div>
    );
  }
  
  const warnings = entityData ? checkDataWarnings(entityData) : [];
  
  const toggleLine = (lineNumber: number) => {
    setExpandedLines(prev => {
      const next = new Set(prev);
      if (next.has(lineNumber)) {
        next.delete(lineNumber);
      } else {
        next.add(lineNumber);
      }
      return next;
    });
  };
  
  const expandAll = () => {
    setExpandedLines(new Set(IRS_PART_II_LINES.map(l => l.lineNumber)));
  };
  
  const collapseAll = () => {
    setExpandedLines(new Set());
  };
  
  const handleToggleStatus = () => {
    const newStatus = entity.status === 'DRAFT' ? 'SUBMITTED' : 'DRAFT';
    dispatch(setEntityStatus({ id: entity.id, status: newStatus }));
  };
  
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-start justify-between">
        <div className="animate-slide-up">
          <h1 className="text-5xl font-black tracking-tight bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {entity.name}
          </h1>
          <p className="text-muted-foreground mt-2 text-lg font-medium">
            <span className="font-mono font-bold">{entity.identifier}</span> • Schedule K-2 Part II Data Entry
          </p>
        </div>
        <div className="flex items-center gap-3 animate-slide-up">
          <Badge variant={entity.status === 'SUBMITTED' ? 'success' : 'warning'} className="text-sm px-4 py-2">
            {entity.status === 'SUBMITTED' ? '✓ SUBMITTED' : '📝 DRAFT'}
          </Badge>
          <Button variant="outline" onClick={handleToggleStatus} size="lg">
            {entity.status === 'DRAFT' ? '✓ Mark as Submitted' : '📝 Mark as Draft'}
          </Button>
          <Button variant="outline" onClick={() => navigate('/entities')} size="lg">
            ← Back to List
          </Button>
        </div>
      </div>
      
      {warnings.length > 0 && (
        <Alert>
          <AlertTitle>Data Warnings ({warnings.length})</AlertTitle>
          <AlertDescription>
            <ul className="list-disc list-inside space-y-1 mt-2">
              {warnings.slice(0, 5).map(warning => (
                <li key={warning.id} className="text-sm">
                  {warning.message}
                </li>
              ))}
              {warnings.length > 5 && (
                <li className="text-sm text-muted-foreground">
                  And {warnings.length - 5} more warnings...
                </li>
              )}
            </ul>
          </AlertDescription>
        </Alert>
      )}
      
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>IRS Part II Lines</CardTitle>
              <CardDescription>
                Enter data for each applicable line. Column (g) is automatically calculated.
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={expandAll}>
                Expand All
              </Button>
              <Button variant="outline" size="sm" onClick={collapseAll}>
                Collapse All
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {IRS_PART_II_LINES.map((line) => {
            const isExpanded = expandedLines.has(line.lineNumber);
            const lineData = entityData?.lines[line.lineNumber];
            const countryCount = lineData?.countries.length || 0;
            
            return (
              <div key={line.lineNumber} className="border-2 border-purple-100 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 animate-scale-in" style={{ overflow: isExpanded ? 'visible' : 'hidden' }}>
                <button
                  onClick={() => toggleLine(line.lineNumber)}
                  className={cn(
                    "w-full px-6 py-5 flex items-center justify-between transition-all duration-300 relative overflow-hidden group",
                    isExpanded 
                      ? "bg-gradient-to-r from-purple-50 via-blue-50 to-indigo-50" 
                      : "hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-blue-50/50"
                  )}
                >
                  {!isExpanded && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300 shimmer"></div>
                  )}
                  <div className="flex items-center gap-5">
                    <div className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center font-black text-lg shadow-md transition-all duration-300",
                      isExpanded 
                        ? "gradient-primary text-white shadow-xl scale-110 glow-primary" 
                        : "bg-gradient-to-br from-purple-100 to-blue-100 text-purple-700 group-hover:scale-105"
                    )}>
                      {line.lineNumber}
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-base text-foreground/90 group-hover:text-primary transition-colors duration-300">
                        {line.description}
                      </div>
                      <div className="text-xs text-muted-foreground font-medium mt-1">
                        Line {line.lineNumber} - IRS Schedule K-2 Part II
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {countryCount > 0 && (
                      <Badge variant={isExpanded ? "default" : "outline"} className="animate-scale-in">
                        {countryCount} {countryCount === 1 ? 'country' : 'countries'}
                      </Badge>
                    )}
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 shadow-sm",
                      isExpanded 
                        ? "bg-gradient-to-br from-purple-500 to-blue-500 text-white rotate-180 shadow-lg" 
                        : "bg-gradient-to-br from-purple-100 to-blue-100 text-purple-700 group-hover:shadow-md"
                    )}>
                      <span className="text-base font-bold">▼</span>
                    </div>
                  </div>
                </button>
                
                {isExpanded && (
                  <div className="border-t-2 border-purple-100 bg-gradient-to-br from-purple-50/30 to-blue-50/30 p-6 animate-slide-up overflow-visible">
                    <LineDataTable
                      entityId={id}
                      lineNumber={line.lineNumber}
                      lineData={lineData}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
