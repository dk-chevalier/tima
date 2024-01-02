import { NavLink } from "react-router-dom";

function MainNav() {
  return (
    <nav>
      <ul>
        <li className="text-primary-900 hover:text-secondary-500 duration-200">
          <NavLink to="/map">
            <span>Map</span>
          </NavLink>
        </li>
        {/* <li>
          <NavLink to="/">
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
        </li> */}
      </ul>
    </nav>
  );
}

export default MainNav;
