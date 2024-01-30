import { NavLink } from 'react-router-dom';
import NavList from './NavList';
import StyledNavLink from './StyledNavLink';
import Button from './Button';

function MainNav() {
  return (
    <nav>
      <NavList type="main">
        <li>
          <StyledNavLink to="map" type="main">
            <span>Map</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="account" type="main">
            <span>Account</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/logout" type="main">
            <span>Log Out</span>
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}

export default MainNav;
