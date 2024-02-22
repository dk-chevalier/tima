function Toggle({
  children,
  onChange,
  type,
  state,
  optionOne,
  optionTwo,
  checked,
}) {
  const styles = {
    round:
      'ml-4 flex h-5 w-9 flex-shrink-0 items-center rounded-full bg-gray-300 p-1 duration-300 ease-in-out after:h-4 after:w-4 after:rounded-full after:bg-gray-100 after:shadow-md after:duration-300 peer-checked:bg-secondary-300 peer-checked:after:translate-x-3',
    unchecked: {
      round: 'text-gray-400',
    },
  };

  if (type === 'toggleOptions')
    return (
      <label className="mx-auto my-2 flex w-max cursor-pointer justify-between rounded-sm border border-secondary-300 bg-gray-200 p-1 shadow-lg duration-300 ease-in-out">
        {children}
        <input
          type="checkbox"
          checked={checked}
          value=""
          className="peer appearance-none"
          onChange={onChange}
        />
        <span className="flex h-min w-24 flex-shrink-0 items-center justify-center rounded-sm bg-secondary-300 p-2  shadow-md duration-300 ease-in-out peer-checked:bg-gray-200">
          {optionOne}
        </span>
        <span className="flex h-min w-24 flex-shrink-0 items-center justify-center rounded-sm bg-gray-200 p-2 shadow-md duration-300 ease-in-out peer-checked:bg-secondary-300">
          {optionTwo}
        </span>
      </label>
    );

  if (type === 'toggleOptionsSmall')
    return (
      <label className="mx-auto my-2 flex w-max cursor-pointer justify-between rounded-full border border-secondary-300 bg-gray-200 p-1 shadow-lg duration-300 ease-in-out">
        {children}
        <input
          type="checkbox"
          checked={checked}
          value=""
          className="peer appearance-none"
          onChange={onChange}
        />
        <span className="flex h-min w-max flex-shrink-0 items-center justify-center rounded-l-full bg-secondary-300 p-2  shadow-md duration-300 ease-in-out peer-checked:bg-gray-200">
          {optionOne}
        </span>
        <span className="flex h-min w-max flex-shrink-0 items-center justify-center rounded-r-full bg-gray-200 p-2 shadow-md duration-300 ease-in-out peer-checked:bg-secondary-300">
          {optionTwo}
        </span>
      </label>
    );

  return (
    <label
      className={`flex cursor-pointer justify-between duration-300 ease-in-out ${
        state ? '' : styles.unchecked[type]
      }`}
    >
      {children}
      <input
        type="checkbox"
        value=""
        className="peer appearance-none"
        onChange={onChange}
      />
      <span className={styles[type]}></span>
    </label>
  );
}

export default Toggle;
