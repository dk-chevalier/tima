import Sidebar from '../ui/Sidebar';
import MapContainer from '../features/map/Map';
import { Outlet } from 'react-router-dom';

function MapPage() {
  return (
    <div className="grid grid-cols-[23vw_1fr] grid-rows-[80vh]">
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
