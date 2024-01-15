import { NavLink } from 'react-router-dom';

function StyledNavLink({ children, to, type }) {
  const base = 'text-primary-900 duration-200';

  const styles = {
    main: base + ' hover:text-secondary-500',
    sidebar:
      'text-primary-900 duration-200 bg-primary-300 py-2 px-3 rounded-md',
    active: {
      main: 'text-secondary-500',
      sidebar:
        'text-primary-900 duration-200 py-2 px-3 bg-secondary-300 rounded-md',
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
