import { NavLink } from 'react-router-dom';

function StyledNavLink({ children, to, type }) {
  const base = 'duration-200 py-2 px-3 rounded-md border border-secondary-300';

  const styles = {
    main: base + ' hover:text-secondary-300 text-primary-100',
    secondary: 'py-2 px-3 rounded-md bg-secondary-300',
    sidebar:
      base +
      ' text-primary-100 duration-200 shadow-md transition-all duration-300 active:shadow-sm',
    active: {
      main: base + ' text-secondary-300 border border-secondary-300',
      sidebar: base + ' text-primary-900 duration-200 bg-secondary-300',
    },
  };

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? styles.active[type] : styles[type]
      }
    >
      {children}
    </NavLink>
  );
}

export default StyledNavLink;