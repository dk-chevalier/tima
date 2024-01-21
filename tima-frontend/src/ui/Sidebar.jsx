import { Outlet } from 'react-router-dom';
import VenuesList from '../features/venues/VenuesList';

import Button from './Button';

import { HiMagnifyingGlass } from 'react-icons/hi2';
import StyledNavLink from './StyledNavLink';
import { useState } from 'react';
import SearchForm from './SearchForm';

function Sidebar({ children }) {
  const [searchIsOpen, setSearchIsOpen] = useState(false);

  const closeSearch = () => setSearchIsOpen(false);

  return (
    <aside className="relative col-span-1 flex h-full w-full flex-col bg-primary-900">
      {searchIsOpen && <SearchForm onClick={closeSearch} />}
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
        <Button type="round" onClick={() => setSearchIsOpen(true)}>
          <HiMagnifyingGlass />
        </Button>
      </div>
      <ul className="no-scrollbar flex h-full w-full flex-col gap-4 overflow-y-scroll px-2 py-3">
        {children}
      </ul>
    </aside>
  );
}

export default Sidebar;
