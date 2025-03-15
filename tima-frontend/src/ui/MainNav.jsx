import { NavLink } from 'react-router-dom';
import NavList from './NavList';
import StyledNavLink from './StyledNavLink';
import Button from './Button';
import { useAuth0 } from '@auth0/auth0-react';

function MainNav() {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <nav>
      <NavList type="main">
        <li>
          <StyledNavLink to="add-contacts" type="main">
            <span>Add contacts</span>
          </StyledNavLink>
        </li>
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
        <li>
          <Button onClick={handleLogout} type="secondary">
            <span>LOG OUT OF AUTH0</span>
          </Button>
        </li>
      </NavList>
    </nav>
  );
}

export default MainNav;
