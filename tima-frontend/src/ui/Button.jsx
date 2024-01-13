import { Link } from 'react-router-dom';

function Button({ children, type, to }) {
  const base =
    'bg-primary-300 px-3 py-1 text-primary-900 shadow-md transition-all duration-300 active:shadow-sm inline-block';

  const styles = {
    primary: base,
    round: base + ' rounded-full size-8',
  };

  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );

  return <button className={styles[type]}>{children}</button>;
}

export default Button;
