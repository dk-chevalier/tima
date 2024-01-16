import { Link } from 'react-router-dom';

function Button({ children, type, to, onClick }) {
  const base =
    'px-3 py-1 text-primary-900 shadow-md transition-all duration-300 active:shadow-sm inline-block flex justify-center items-center';

  const styles = {
    primary: base + ' bg-primary-300 rounded-sm',
    secondary: base + ' bg-secondary-200 text-sm rounded-sm',
    round: base + ' bg-primary-300 rounded-full size-10',
  };

  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );

  return (
    <button className={styles[type]} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
