import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { Layout } from '@/components/Layout';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Dashboard } from '@/pages/Dashboard';
import { EntityList } from '@/pages/EntityList';
import { CreateEntity } from '@/pages/CreateEntity';
import { EntityDataEntry } from '@/pages/EntityDataEntry';
import { AggregationReport } from '@/pages/AggregationReport';

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="entities" element={<EntityList />} />
              <Route path="entities/new" element={<CreateEntity />} />
              <Route path="entities/:id" element={<EntityDataEntry />} />
              <Route path="report" element={<AggregationReport />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
