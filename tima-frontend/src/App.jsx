import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import AppLayout from './ui/AppLayout';
import MapPage from './pages/MapPage';
import VenueDetails, {
  loader as venueDetailsLoader,
} from './pages/VenueDetails';
import RadioStationDetails, {
  loader as radioStationDetailsLoader,
} from './pages/RadioStationDetails';
import RadioShowDetails, {
  loader as radioShowDetailsLoader,
} from './pages/RadioShowDetails';
import VenueResults, {
  loader as venueResultsLoader,
} from './pages/VenueResults';
import RadioResults, {
  loader as radioResultsLoader,
} from './pages/RadioResults';
import { action as searchAction } from './features/search/SearchForm';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // stale time = time before cached data becomes stale (i.e. gets refreshed again on next load)
      // below is 2 minutes...perhaps change??? (trying to make not send so many requests when changing between venues/radio etc.)
      staleTime: 120000,
    },
  },
});

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate replace to="map/venues" />,
      },
      {
        path: 'map',
        element: <MapPage />,
        id: 'map',
        // loader: mapLoader(queryClient),
        action: searchAction,
        children: [
          {
            path: 'venues',
            element: <VenueResults />,
            id: 'venues',
            loader: venueResultsLoader(queryClient),
            children: [
              {
                path: ':venueId',
                element: <VenueDetails />,
                id: 'venue',
                loader: venueDetailsLoader(queryClient),
              },
            ],
          },
          {
            path: 'radio/:latlng?/:distance?/:unit?',
            element: <RadioResults />,
            id: 'radioStations',
            loader: radioResultsLoader(queryClient),
            children: [
              {
                path: 'stations/:stationId',
                element: <RadioStationDetails />,
                id: 'radioStation',
                loader: radioStationDetailsLoader(queryClient),
              },
              {
                path: 'shows/:showId',
                element: <RadioShowDetails />,
                id: 'radioShow',
                loader: radioShowDetailsLoader(queryClient),
              },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

// function App() {
//   return (
//     <QueryClientProvider client={reactQuery}>
//       <ReactQueryDevtools initialIsOpen={false} />

//       <BrowserRouter>
//         <Routes>
//           <Route element={<AppLayout />}>
//             <Route index element={<Navigate replace to="map/venues" />} />
//             <Route path="map" element={<MapPage />}>
//               <Route path="venues" element={<VenueResults />}>
//                 <Route path=":venueId" element={<VenueDetails />} />
//               </Route>
//               <Route
//                 path="radio/:latlng?/:distance?/:unit?"
//                 element={<RadioResults />}
//               >
//                 <Route
//                   path="stations/:stationId"
//                   element={<RadioStationDetails />}
//                 />
//                 <Route path="shows/:showId" element={<RadioShowDetails />} />
//               </Route>
//             </Route>
//           </Route>
//         </Routes>
//       </BrowserRouter>
//     </QueryClientProvider>
//   );
// }

export default App;
