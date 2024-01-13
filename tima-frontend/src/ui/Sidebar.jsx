import { Outlet } from 'react-router-dom';
import VenuesList from '../features/venues/VenuesList';

import Button from './Button';

import { HiMagnifyingGlass } from 'react-icons/hi2';

function Sidebar({ children }) {
  // TEMPORARY
  const type = 'venue';

  return (
    <aside className="col-span-1 bg-secondary-100">
      <Button type="round">
        <HiMagnifyingGlass />
      </Button>
      <ul className="flex flex-col gap-4 overflow-scroll px-2 py-3">
        <Outlet />
      </ul>
    </aside>
  );
}

export default Sidebar;
