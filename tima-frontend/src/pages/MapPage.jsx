import Sidebar from '../ui/Sidebar';
import Map from '../features/map/Map';

function MapPage() {
  return (
    <div className="grid grid-cols-[20vw_1fr] grid-rows-[80vh]">
      <Sidebar />
      <div className="col-span-1 col-start-2">
        <Map />
      </div>
    </div>
  );
}

export default MapPage;
