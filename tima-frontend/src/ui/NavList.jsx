function NavList({ children, type }) {
  const base = 'flex gap-3';
  const styles = {
    main: base + ' flex-row justify-between',
  };
  return <ul className={styles[type]}>{children}</ul>;
}

export default NavList;
