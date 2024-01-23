import Sidebar from '../ui/Sidebar';
import MapContainer from '../features/map/Map';
import { Outlet } from 'react-router-dom';

function MapPage() {
  return (
    <div className="grid grid-cols-[1fr_3fr] grid-rows-[80vh]">
      <Sidebar>
        <Outlet />
      </Sidebar>
      <div className="col-span-1 col-start-2 h-full w-full" id="mapbox">
        <MapContainer></MapContainer>
      </div>
    </div>
  );
}

export default MapPage;

// export const loader =
//   (queryClient) =>
//   ({ params }) => {
//     const { latlng } = params;
//     if (!latlng) return null;
//     return latlng;
//   };
