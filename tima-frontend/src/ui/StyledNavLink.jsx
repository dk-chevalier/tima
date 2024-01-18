import { NavLink } from 'react-router-dom';

function StyledNavLink({ children, to, type }) {
  const base = 'duration-200 py-2 px-3 rounded-md border border-secondary-300';

  const styles = {
    main: base + ' hover:text-secondary-300 text-primary-100 bg-primary-900',
    secondary: 'py-2 px-3 rounded-sm bg-secondary-300 text-sm',
    sidebar:
      base +
      ' text-primary-100 duration-200 shadow-md transition-all duration-300 active:shadow-sm',
    active: {
      main:
        base +
        ' text-primary-900 border border-secondary-300 bg-secondary-300 ',
      secondary:
        'py-2 px-3 rounded-sm bg-secondary-300 text-sm text-primary-100',
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
