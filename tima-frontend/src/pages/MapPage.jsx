import Sidebar from '../ui/Sidebar';
import MapContainer from '../features/map/Map';
import { Outlet, redirect } from 'react-router-dom';
import { getIsLoggedIn } from '../services/apiUsers';

function MapPage() {
  return (
    <div className="grid grid-cols-[1fr_3fr] grid-rows-[93vh]">
      <Sidebar>
        <Outlet />
      </Sidebar>
      <div
        className="col-span-1 col-start-2 row-span-1 row-start-1 h-full w-full"
        id="mapbox"
      >
        <MapContainer></MapContainer>
      </div>
    </div>
  );
}

export default MapPage;

export const loader = (queryClient) => async () => {
  const { isLoggedIn } = await queryClient.fetchQuery({
    queryKey: ['isLoggedIn'],
    queryFn: getIsLoggedIn,
  });

  if (!isLoggedIn) return redirect('/login');
  return null;
};
