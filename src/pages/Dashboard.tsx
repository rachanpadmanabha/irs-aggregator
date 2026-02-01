import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { setAggregation } from '@/features/aggregation/aggregationSlice';
import { generateAggregation, getTopCountries } from '@/services/aggregationEngine';
import { formatDateShort } from '@/utils/format';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const entities = useAppSelector(state => state.entities);
  const aggregation = useAppSelector(state => state.aggregation);
  const taxYear = useAppSelector(state => state.ui.taxYear);
  
  const totalEntities = entities.allIds.length;
  const submittedCount = entities.allIds.filter(
    (id: string) => entities.byId[id]?.status === 'SUBMITTED'
  ).length;
  const draftCount = totalEntities - submittedCount;
  
  const handleGenerateReport = () => {
    const snapshot = generateAggregation(entities.byId, entities.entityData, taxYear);
    dispatch(setAggregation(snapshot));
    navigate('/report');
  };
  
  // Prepare chart data
  const topCountries = aggregation.currentSnapshot 
    ? getTopCountries(aggregation.currentSnapshot, 10)
    : [];
  
  const barChartData = {
    labels: topCountries.map(c => c.country),
    datasets: [{
      label: 'Foreign Tax Total',
      data: topCountries.map(c => parseFloat(c.total)),
      backgroundColor: 'rgba(59, 130, 246, 0.5)',
      borderColor: 'rgb(59, 130, 246)',
      borderWidth: 1
    }]
  };
  
  const pieChartData = {
    labels: ['Submitted', 'Draft'],
    datasets: [{
      data: [submittedCount, draftCount],
      backgroundColor: [
        'rgba(34, 197, 94, 0.5)',
        'rgba(234, 179, 8, 0.5)'
      ],
      borderColor: [
        'rgb(34, 197, 94)',
        'rgb(234, 179, 8)'
      ],
      borderWidth: 1
    }]
  };
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between animate-slide-up">
        <div>
          <h1 className="text-5xl font-black tracking-tight bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-2 text-lg font-medium">
            IRS Schedule K-2 Part II Aggregation for Tax Year {taxYear}
          </p>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => navigate('/entities/new')} variant="outline" size="lg">
            <span className="mr-2">➕</span> Add Entity
          </Button>
          <Button 
            onClick={handleGenerateReport}
            variant="default"
            size="lg"
            disabled={submittedCount === 0}
          >
            <span className="mr-2">📊</span> Generate Report
          </Button>
        </div>
      </div>
      
      {aggregation.currentSnapshot && !aggregation.currentSnapshot.isValid && (
        <Alert>
          <AlertDescription>
            The current aggregation report is outdated. Entity data has changed since the last report was generated.
            Click "Generate Report" to create an updated report.
          </AlertDescription>
        </Alert>
      )}
      
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="overflow-hidden relative group border-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-indigo-500/10 pointer-events-none group-hover:from-blue-500/20 group-hover:via-purple-500/20 group-hover:to-indigo-500/20 transition-all duration-500"></div>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-blue-400/5 to-purple-400/5 shimmer"></div>
          <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-bold text-muted-foreground uppercase tracking-wide">Total Entities</CardTitle>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
              <span className="text-2xl">📊</span>
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-5xl font-black bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
              {totalEntities}
            </div>
            <p className="text-sm text-muted-foreground mt-3 font-medium">
              Entities in the system
            </p>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden relative group border-0">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-teal-500/10 pointer-events-none group-hover:from-green-500/20 group-hover:via-emerald-500/20 group-hover:to-teal-500/20 transition-all duration-500"></div>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-green-400/5 to-emerald-400/5 shimmer"></div>
          <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-bold text-muted-foreground uppercase tracking-wide">Submitted</CardTitle>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
              <span className="text-2xl text-white font-bold">✓</span>
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-5xl font-black bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
              {submittedCount}
            </div>
            <p className="text-sm text-muted-foreground mt-3 font-medium">
              Ready for aggregation
            </p>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden relative group border-0">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-yellow-500/10 pointer-events-none group-hover:from-amber-500/20 group-hover:via-orange-500/20 group-hover:to-yellow-500/20 transition-all duration-500"></div>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-amber-400/5 to-orange-400/5 shimmer"></div>
          <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-bold text-muted-foreground uppercase tracking-wide">Draft</CardTitle>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
              <span className="text-2xl">📝</span>
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-5xl font-black bg-gradient-to-br from-amber-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
              {draftCount}
            </div>
            <p className="text-sm text-muted-foreground mt-3 font-medium">
              Not yet submitted
            </p>
          </CardContent>
        </Card>
      </div>
      
      {aggregation.currentSnapshot && (
        <Card>
          <CardHeader>
            <CardTitle>Last Aggregation Report</CardTitle>
            <CardDescription>
              Generated on {formatDateShort(aggregation.currentSnapshot.generatedAt)}
              {' • '}
              {aggregation.currentSnapshot.includedEntityIds.length} entities included
              {' • '}
              {aggregation.currentSnapshot.results.length} line items
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/report')} variant="outline">
              View Report
            </Button>
          </CardContent>
        </Card>
      )}
      
      {topCountries.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Top Countries by Foreign Tax</CardTitle>
              <CardDescription>Aggregated foreign source totals</CardDescription>
            </CardHeader>
            <CardContent>
              <Bar 
                data={barChartData} 
                options={{
                  responsive: true,
                  plugins: {
                    legend: { display: false }
                  }
                }}
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Entity Status Distribution</CardTitle>
              <CardDescription>Breakdown of entity statuses</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div className="w-64 h-64">
                <Pie 
                  data={pieChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: true
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      {totalEntities === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Get Started</CardTitle>
            <CardDescription>
              No entities yet. Add your first entity to begin.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/entities/new')}>
              Add Your First Entity
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
