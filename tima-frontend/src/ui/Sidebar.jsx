import { Outlet } from 'react-router-dom';
import VenuesList from '../features/venues/VenuesList';

import Button from './Button';

import { HiMagnifyingGlass } from 'react-icons/hi2';
import StyledNavLink from './StyledNavLink';

function Sidebar({ children }) {
  // TEMPORARY

  return (
    <aside className="col-span-1 bg-secondary-100">
      <div className="flex items-center justify-between p-3">
        <ul className="flex justify-between gap-2">
          <li>
            <StyledNavLink to="venues" type="sidebar">
              <span>Venues</span>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="radio" type="sidebar">
              <span>Radio</span>
            </StyledNavLink>
          </li>
        </ul>
        <Button type="round">
          <HiMagnifyingGlass />
        </Button>
      </div>
      <ul className="flex flex-col gap-4 overflow-scroll px-2 py-3">
        <Outlet />
      </ul>
    </aside>
  );
}

export default Sidebar;
