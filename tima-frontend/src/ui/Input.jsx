function Input({ name, type, placeholder, labelPosition, width, children }) {
  const labelClass =
    labelPosition === 'left' ? 'flex items-center justify-between gap-4' : '';

  return (
    <label className={labelClass}>
      <h3 className="w-max">{children}</h3>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className={`${width} rounded-md border border-secondary-300 bg-primary-100 px-2 py-1 shadow-md`}
      />
    </label>
  );
}

export default Input;
