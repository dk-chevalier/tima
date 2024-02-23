import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';

import AppLayout, { loader as protectedAppLayoutLoader } from './ui/AppLayout';
import MapPage, { loader as protectedMapLoader } from './pages/MapPage';
import VenueDetails, {
  loader as protectedVenueDetailsLoader,
} from './pages/VenueDetails';
import RadioStationDetails, {
  loader as protectedRadioStationDetailsLoader,
} from './pages/RadioStationDetails';
import RadioShowDetails, {
  loader as protectedRadioShowDetailsLoader,
} from './pages/RadioShowDetails';
import VenueResults, {
  loader as protectedVenueResultsLoader,
} from './pages/VenueResults';
import RadioResults, {
  loader as protectedRadioResultsLoader,
} from './pages/RadioResults';
import { action as searchAction } from './features/search/SearchForm';
import Login, { action } from './pages/Login';
import Account, { loader as protectedAccountLoader } from './pages/Account';
import Logout, { loader as logoutLoader } from './pages/Logout';
import Signup, { loader as signupLoader } from './pages/Signup';
import CreateAccount, {
  action as createAccountAction,
} from './pages/CreateAccount';
import Home, { loader as homeLoader } from './pages/Home';
import PaymentInfo from './pages/PaymentInfo';
import { action as suggestedVenueUpdatesAction } from './features/venues/SuggestVenueUpdates';

// FIXME: FIX PROTECTED ROUTES....SO FAR ALL PROTECTED ROUTES HAVE A SEPARATE API CALL IN LOADER (BEFORE ANY OTHER CALLS) TO SIMPLY CHECK IF USER IS LOGGED IN....CAN PERHAPS REFACTOR SO authController.protect DOES THIS JOB FOR US ON SERVER SIDE (AS ALL THOSE ROUTES ARE PROTECTED ANYWAY?)....EVENTUALLY WILL APPARENTLY BE MIDDLEWARE ON REACT ROUTER TO MAKE THIS EASIER TOO....

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
    element: <Home />,
    path: '/',
    id: 'home',
    loader: homeLoader,
  },
  {
    element: <Login />,
    path: 'login',
    action: action,
  },
  {
    element: <Signup />,
    path: 'signup',
    id: 'signup',
    loader: signupLoader,
    children: [
      {
        index: true,
        element: <Navigate replace to="create-account" />,
      },
      {
        path: 'create-account',
        id: 'createAccount',
        element: <CreateAccount />,

        action: createAccountAction,
      },
      {
        path: 'payment-info',
        element: <PaymentInfo />,
      },
    ],
  },
  {
    element: <Logout />,
    path: 'logout',
    loader: logoutLoader(queryClient),
  },
  {
    path: 'app',
    element: <AppLayout />,
    loader: protectedAppLayoutLoader(queryClient),
    children: [
      {
        index: true,
        path: 'account',
        element: <Account />,
        loader: protectedAccountLoader(queryClient),
      },
      {
        path: 'map',
        element: <MapPage />,
        id: 'map',
        loader: protectedMapLoader(queryClient),
        action: searchAction,
        children: [
          {
            index: true,
            element: <Navigate replace to="/app/map/venues" />,
          },
          {
            path: 'venues',
            element: <VenueResults />,
            id: 'venues',
            loader: protectedVenueResultsLoader(queryClient),
            children: [
              {
                path: ':id',
                element: <VenueDetails />,
                id: 'venue',
                loader: protectedVenueDetailsLoader(queryClient),
                action: suggestedVenueUpdatesAction,
              },
            ],
          },
          {
            path: 'radio/:latlng?/:distance?/:unit?',
            element: <RadioResults />,
            id: 'radioStations',
            loader: protectedRadioResultsLoader(queryClient),
            children: [
              {
                path: 'stations/:id',
                element: <RadioStationDetails />,
                id: 'radioStation',
                loader: protectedRadioStationDetailsLoader(queryClient),
              },
              {
                path: 'shows/:id',
                element: <RadioShowDetails />,
                id: 'radioShow',
                loader: protectedRadioShowDetailsLoader(queryClient),
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

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000,
        }}
      />
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
