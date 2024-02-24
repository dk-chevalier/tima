import { Link, useNavigate } from 'react-router-dom';

function Button({ children, type, to, onClick, href, state, name, value }) {
  const navigate = useNavigate();
  const base =
    'px-3 py-1 shadow-md transition-all duration-300 active:shadow-sm inline-block flex justify-center items-center';

  const styles = {
    primary: base + ' bg-primary-300 rounded-sm text-primary-900',
    secondary: base + ' bg-secondary-300 text-sm rounded-sm text-primary-900',
    round:
      base +
      ' bg-primary-900 rounded-full size-10 border border-secondary-300 text-primary-100',
    roundActive:
      base +
      ' bg-secondary-300 rounded-full size-10 border border-secondary-300 text-primary-900',
    submit: base + ' bg-secondary-300 text-md rounded-sm text-primary-900',
  };

  // Note -1 is a string, not number!
  if (to === '-1')
    return (
      <button
        onClick={(e) => {
          // added preventDefault in case used with form
          e.preventDefault();
          navigate(-1);
        }}
        className={styles[type]}
      >
        {children}
      </button>
    );
  if (to) {
    return (
      <Link to={to} className={styles[type]} state={state}>
        {children}
      </Link>
    );
  }

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

  if (type === 'submit')
    return (
      // name and value are used to be able to pass necessary data from react routers form to the action
      <button className={styles[type]} type={type} name={name} value={value}>
        {children}
      </button>
    );

  return (
    <button className={styles[type]} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
