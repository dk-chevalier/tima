function DaysSelection({ numberCols }) {
  return (
    <div className={`grid grid-cols-${numberCols} gap-x-6 gap-y-4`}>
      <label className="cursor-pointer">
        <input
          type="checkbox"
          name="monday"
          value="monday"
          className="peer appearance-none"
        />
        <span className="rounded-full px-2 py-1 shadow-md transition-all duration-200 peer-checked:bg-secondary-300">
          Monday
        </span>
      </label>
      <label className="cursor-pointer">
        <input
          type="checkbox"
          name="tuesday"
          value="tuesday"
          className="peer appearance-none"
        />
        <span className="rounded-full px-2 py-1 shadow-md transition-all duration-200 peer-checked:bg-secondary-300">
          Tuesday
        </span>
      </label>
      <label className="cursor-pointer">
        <input
          type="checkbox"
          name="wednesday"
          value="wednesday"
          className="peer appearance-none"
        />
        <span className="rounded-full px-2 py-1 shadow-md transition-all duration-200 peer-checked:bg-secondary-300">
          Wednesday
        </span>
      </label>
      <label className="cursor-pointer">
        <input
          type="checkbox"
          name="thursday"
          value="thursday"
          className="peer appearance-none"
        />
        <span className="rounded-full px-2 py-1 shadow-md transition-all duration-200 peer-checked:bg-secondary-300">
          Thursday
        </span>
      </label>
      <label className="cursor-pointer">
        <input
          type="checkbox"
          name="friday"
          value="friday"
          className="peer appearance-none"
        />
        <span className="rounded-full px-2 py-1 shadow-md transition-all duration-200 peer-checked:bg-secondary-300">
          Friday
        </span>
      </label>
      <label className="cursor-pointer">
        <input
          type="checkbox"
          name="saturday"
          value="saturday"
          className="peer appearance-none"
        />
        <span className="rounded-full px-2 py-1 shadow-md transition-all duration-200 peer-checked:bg-secondary-300">
          Saturday
        </span>
      </label>
      <label className="cursor-pointer">
        <input
          type="checkbox"
          name="sunday"
          value="sunday"
          className="peer appearance-none"
        />
        <span className="rounded-full px-2 py-1 shadow-md transition-all duration-200 peer-checked:bg-secondary-300">
          Sunday
        </span>
      </label>
    </div>
  );
}
export default DaysSelection;
