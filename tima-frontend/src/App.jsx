import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import AppLayout from './ui/AppLayout';
import MapPage from './pages/MapPage';
import VenueDetails from './pages/VenueDetails';
import RadioStationDetails from './pages/RadioStationDetails';
import RadioShowDetails from './pages/RadioShowDetails';
import VenueResults from './pages/VenueResults';
import RadioResults from './pages/RadioResults';

const reactQuery = new QueryClient({
  defaultOptions: {
    queries: {
      // stale time = time before cached data becomes stale (i.e. gets refreshed again on next load)
      // below is 2 minutes...perhaps change??? (trying to make not send so many requests when changing between venues/radio etc.)
      staleTime: 120000,
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
              <Route path="venues" element={<VenueResults />}>
                <Route path=":venueId" element={<VenueDetails />} />
              </Route>
              <Route path="radio" element={<RadioResults />}>
                <Route
                  path="stations/:stationId"
                  element={<RadioStationDetails />}
                />
                <Route path="shows/:showId" element={<RadioShowDetails />} />
                <Route
                  path=":latlng/:distance/:unit"
                  element={<RadioResults />}
                />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
