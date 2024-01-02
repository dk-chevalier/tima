function Button({ children, type }) {
  // const styles = {
  //   primary:,
  // };

  return (
    <button className="rounded-md bg-primary-500 px-3 py-1 text-primary-900 shadow-md transition-all duration-300 active:shadow-sm ">
      {children}
    </button>
  );
}

export default Button;
