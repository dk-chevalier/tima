import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import AppLayout from './ui/AppLayout';
import MapPage from './pages/MapPage';
import VenuesList from './features/venues/VenuesList';

const reactQuery = new QueryClient({
  defaultOptions: {
    queries: {
      // stale time = time before cached data becomes stale (i.e. gets refreshed again on next load)
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={reactQuery}>
      <ReactQueryDevtools initialIsOpen={false} />

      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="map/venues" />} />
            <Route path="map" element={<MapPage />}>
              <Route path="venues" element={<VenuesList />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
