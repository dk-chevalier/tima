function GenresSelection({ type, numberCols }) {
  console.log(numberCols);
  return (
    <fieldset className={`grid grid-cols-${numberCols} gap-x-3 gap-y-2`}>
      {type === 'search' && (
        <>
          <label className="cursor-pointer">
            <input
              type="checkbox"
              name="saved-genres"
              value="saved-genres"
              className="peer appearance-none"
            />
            <span className="rounded-full px-2 py-1 shadow-md transition-all duration-200 peer-checked:bg-secondary-300">
              My saved genres
            </span>
          </label>
          <label className="cursor-pointer">
            <input
              type="checkbox"
              name="all"
              value="all"
              className="peer appearance-none"
            />
            <span className="rounded-full px-2 py-1 shadow-md transition-all duration-200 peer-checked:bg-secondary-300">
              All
            </span>
          </label>
        </>
      )}
      <label className="cursor-pointer">
        <input
          type="checkbox"
          name="acoustic"
          value="acoustic"
          className="peer appearance-none"
        />
        <span className="rounded-full px-2 py-1 shadow-md transition-all duration-200 peer-checked:bg-secondary-300">
          Acoustic
        </span>
      </label>
      <label className="cursor-pointer">
        <input
          type="checkbox"
          name="blues"
          value="blues"
          className="peer appearance-none"
        />
        <span className="rounded-full px-2 py-1 shadow-md transition-all duration-200 peer-checked:bg-secondary-300">
          Blues
        </span>
      </label>
      <label className="cursor-pointer">
        <input
          type="checkbox"
          name="classical"
          value="classical"
          className="peer appearance-none"
        />
        <span className="rounded-full px-2 py-1 shadow-md transition-all duration-200 peer-checked:bg-secondary-300">
          Classical
        </span>
      </label>
      <label className="cursor-pointer">
        <input
          type="checkbox"
          name="countryGenre"
          value="country"
          className="peer appearance-none"
        />
        <span className="rounded-full px-2 py-1 shadow-md transition-all duration-200 peer-checked:bg-secondary-300">
          Country
        </span>
      </label>
      <label className="cursor-pointer">
        <input
          type="checkbox"
          name="disco"
          value="disco"
          className="peer appearance-none"
        />
        <span className="rounded-full px-2 py-1 shadow-md transition-all duration-200 peer-checked:bg-secondary-300">
          Disco
        </span>
      </label>
      <label className="cursor-pointer">
        <input
          type="checkbox"
          name="electronic"
          value="electronic"
          className="peer appearance-none"
        />
        <span className="rounded-full px-2 py-1 shadow-md transition-all duration-200 peer-checked:bg-secondary-300">
          Electronic
        </span>
      </label>

      <label className="cursor-pointer">
        <input
          type="checkbox"
          name="folk"
          value="folk"
          className="peer appearance-none"
        />
        <span className="rounded-full px-2 py-1 shadow-md transition-all duration-200 peer-checked:bg-secondary-300">
          Folk
        </span>
      </label>
      <label className="cursor-pointer">
        <input
          type="checkbox"
          name="funk"
          value="funk"
          className="peer appearance-none"
        />
        <span className="rounded-full px-2 py-1 shadow-md transition-all duration-200 peer-checked:bg-secondary-300">
          Funk
        </span>
      </label>
      <label className="cursor-pointer">
        <input
          type="checkbox"
          name="hipHop"
          value="hip-hop"
          className="peer appearance-none"
        />
        <span className="rounded-full px-2 py-1 shadow-md transition-all duration-200 peer-checked:bg-secondary-300">
          Hip-hop
        </span>
      </label>
      <label className="cursor-pointer">
        <input
          type="checkbox"
          name="indie"
          value="indie"
          className="peer appearance-none"
        />
        <span className="rounded-full px-2 py-1 shadow-md transition-all duration-200 peer-checked:bg-secondary-300">
          Indie
        </span>
      </label>
      <label className="cursor-pointer">
        <input
          type="checkbox"
          name="jazz"
          value="jazz"
          className="peer appearance-none"
        />
        <span className="rounded-full px-2 py-1 shadow-md transition-all duration-200 peer-checked:bg-secondary-300">
          Jazz
        </span>
      </label>
      <label className="cursor-pointer">
        <input
          type="checkbox"
          name="latin"
          value="latin"
          className="peer appearance-none"
        />
        <span className="rounded-full px-2 py-1 shadow-md transition-all duration-200 peer-checked:bg-secondary-300">
          Latin
        </span>
      </label>
      <label className="cursor-pointer">
        <input
          type="checkbox"
          name="metal"
          value="metal"
          className="peer appearance-none"
        />
        <span className="rounded-full px-2 py-1 shadow-md transition-all duration-200 peer-checked:bg-secondary-300">
          Metal
        </span>
      </label>
      <label className="cursor-pointer">
        <input
          type="checkbox"
          name="pop"
          value="pop"
          className="peer appearance-none"
        />
        <span className="rounded-full px-2 py-1 shadow-md transition-all duration-200 peer-checked:bg-secondary-300">
          Pop
        </span>
      </label>
      <label className="cursor-pointer">
        <input
          type="checkbox"
          name="punk"
          value="punk"
          className="peer appearance-none"
        />
        <span className="rounded-full px-2 py-1 shadow-md transition-all duration-200 peer-checked:bg-secondary-300">
          Punk
        </span>
      </label>
      <label className="cursor-pointer">
        <input
          type="checkbox"
          name="rnb"
          value="r&b"
          className="peer appearance-none"
        />
        <span className="rounded-full px-2 py-1 shadow-md transition-all duration-200 peer-checked:bg-secondary-300">
          R&B
        </span>
      </label>
      <label className="cursor-pointer">
        <input
          type="checkbox"
          name="reggae"
          value="reggae"
          className="peer appearance-none"
        />
        <span className="rounded-full px-2 py-1 shadow-md transition-all duration-200 peer-checked:bg-secondary-300">
          Reggae
        </span>
      </label>
      <label className="cursor-pointer">
        <input
          type="checkbox"
          name="rock"
          value="rock"
          className="peer appearance-none"
        />
        <span className="rounded-full px-2 py-1 shadow-md transition-all duration-200 peer-checked:bg-secondary-300">
          Rock
        </span>
      </label>
      <label className="cursor-pointer">
        <input
          type="checkbox"
          name="singerSongwriter"
          value="singer-songwriter"
          className="peer appearance-none"
        />
        <span className="rounded-full px-2 py-1 shadow-md transition-all duration-200 peer-checked:bg-secondary-300">
          Singer-songwriter
        </span>
      </label>
      <label className="cursor-pointer">
        <input
          type="checkbox"
          name="soul"
          value="soul"
          className="peer appearance-none"
        />
        <span className="rounded-full px-2 py-1 shadow-md transition-all duration-200 peer-checked:bg-secondary-300">
          Soul
        </span>
      </label>
    </fieldset>
  );
}

export default GenresSelection;
