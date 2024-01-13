import { NavLink } from 'react-router-dom';
import NavList from './NavList';

function MainNav() {
  return (
    <nav>
      <NavList type="main">
        <li>
          <NavLink
            to="/map"
            className="text-primary-900 duration-200 hover:text-secondary-500"
            activeClassName
          >
            <span>Map</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/">
            <span>Account</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/">
            <span>Log Out</span>
          </NavLink>
        </li>
      </NavList>
    </nav>
  );
}

export default MainNav;
