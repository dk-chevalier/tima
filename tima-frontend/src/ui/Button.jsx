import { Link } from 'react-router-dom';

function Button({ children, type, to, onClick, href }) {
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

  if (href)
    return (
      <a
        className={styles[type]}
        href={href}
        target="_blank"
        rel="noreferrer noopener"
      >
        {children}
      </a>
    );

  return (
    <button className={styles[type]} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
