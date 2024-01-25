import { HiXMark } from 'react-icons/hi2';
import Button from '../../ui/Button';
import { Form } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeSearchForm } from './searchFormSlice';

const MAP_TOKEN = import.meta.env.VITE_MAP_TOKEN;

function SearchForm({ onClick }) {
  const [searchFor, setSearchFor] = useState('venues');
  const [searchBy, setSearchBy] = useState('location');

  const [searchByOpen, setSearchByOpen] = useState(false);
  const [searchByGenres, setSearchByGenres] = useState(false);
  const [searchByGigType, setSearchByGigType] = useState(false);

  const dispatch = useDispatch();

  return (
    <div className="w-m absolute left-[2.5%] top-[2.5%] z-50 h-[95%] w-[95%] overflow-y-scroll rounded-md border border-secondary-300 bg-primary-100 px-3 pb-3 pt-10 text-primary-900 shadow-lg">
      <div className="absolute right-4 top-4">
        <Button type="close" onClick={onClick}>
          <HiXMark />
        </Button>
      </div>

      <Form
        method="get"
        action={`/map/${searchFor}`}
        onSubmit={() => dispatch(closeSearchForm())}
      >
        {/* SEARCHING FOR VENUES/RADIO/NEWSPAPERS/MAGAZINES ? */}
        <div className="flex flex-col gap-10 font-light">
          <div className="flex flex-col gap-1">
            <label>What are you searching for?</label>
            <select
              className="rounded-sm border border-secondary-300 bg-primary-100 shadow-md"
              name="searchFor"
              required
              defaultValue="venues"
              onChange={({ target }) => setSearchFor(target.value)}
            >
              <option value="venues">Venues</option>
              <option value="radio">Radio</option>
              <option value="newspapers">Newspapers</option>
              <option value="magazines">Music Magazines</option>
            </select>
          </div>

          {/* SEARCHING FOR NAME/LOCATION ? */}
          <div className="flex flex-col gap-1">
            <label
              className={`flex justify-between duration-300 ease-in-out ${
                searchByOpen ? '' : 'text-gray-400'
              }`}
            >
              Search by name or location?
              <input
                type="checkbox"
                value=""
                className="peer appearance-none"
                onChange={() => setSearchByOpen(!searchByOpen)}
              />
              <span className="bg-gray-300 after:bg-gray-100 ml-4 flex h-5 w-9 flex-shrink-0 items-center rounded-full p-1 duration-300 ease-in-out after:h-4 after:w-4 after:rounded-full after:shadow-md after:duration-300 peer-checked:bg-secondary-300 peer-checked:after:translate-x-3"></span>
            </label>
            {searchByOpen && (
              <>
                <select
                  className="rounded-sm border border-secondary-300 bg-primary-100 shadow-md"
                  name="searchBy"
                  required
                  onChange={({ target }) => {
                    setSearchBy(target.value);
                  }}
                >
                  <option value="location">Search by location:</option>
                  <option value="name">Search by name:</option>
                </select>
                {searchBy === 'location' && (
                  <input
                    className="rounded-sm border border-secondary-300 bg-primary-100 shadow-md"
                    type="text"
                    placeholder="Type in location"
                    name="searchLocation"
                    autoComplete="street-address country-name address-level1 address-level2 address-level3 address-level4"
                  />
                )}
                {searchBy === 'name' && (
                  <input
                    className="rounded-sm border border-secondary-300 bg-primary-100 shadow-md"
                    type="text"
                    placeholder="Type in name"
                    name="searchName"
                  ></input>
                )}
              </>
            )}
          </div>

          {/* SEARCHING BY GENRES ? */}
          {searchFor === 'venues' && (
            <div className="flex flex-col gap-1">
              <label
                className={`flex justify-between duration-300 ease-in-out ${
                  searchByGenres ? '' : 'text-gray-400'
                }`}
              >
                Search by genres supported
                <input
                  type="checkbox"
                  value=""
                  className="peer appearance-none"
                  onChange={() => setSearchByGenres(!searchByGenres)}
                />
                <span className="bg-gray-300 after:bg-gray-100 ml-4 flex h-5 w-9 flex-shrink-0 items-center rounded-full p-1 duration-300 ease-in-out after:h-4 after:w-4 after:rounded-full after:shadow-md after:duration-300 peer-checked:bg-secondary-300 peer-checked:after:translate-x-3"></span>
              </label>
              {searchByGenres && (
                <select
                  className="rounded-sm border border-secondary-300 bg-primary-100 shadow-md"
                  defaultValue="saved-genres"
                  name="genres"
                >
                  <option value="saved-genres">My saved genres</option>
                  <option value="all">All</option>
                  <option value="acoustic">Acoustic</option>
                  <option value="blues">Blues</option>
                  <option value="classical">Classical</option>
                  <option value="country">Country</option>
                  <option value="disco">Disco</option>
                  <option value="electronic">Electronic</option>
                  <option value="folk">Folk</option>
                  <option value="funk">Funk</option>
                  <option value="hip-hop">Hip-hop</option>
                  <option value="indie">Indie</option>
                  <option value="jazz">Jazz</option>
                  <option value="latin">Latin</option>
                  <option value="metal">Metal</option>
                  <option value="pop">Pop</option>
                  <option value="punk">Punk</option>
                  <option value="r&b">R&B</option>
                  <option value="reggae">Reggae</option>
                  <option value="rock">Rock</option>
                  <option value="singer-songwriter">Singer-songrwriter</option>
                  <option value="soul">Soul</option>
                </select>
              )}
            </div>
          )}

          {/* SEARCHING BY GIG TYPE ? */}
          {searchFor === 'venues' && (
            <div className="flex flex-col gap-1">
              <label
                className={`flex justify-between duration-300 ease-in-out ${
                  searchByGigType ? '' : 'text-gray-400'
                }`}
              >
                Search by types of gigs the venue hosts
                <input
                  type="checkbox"
                  value=""
                  className="peer appearance-none"
                  onChange={() => setSearchByGigType(!searchByGigType)}
                />
                <span className="bg-gray-300 after:bg-gray-100 ml-4 flex h-5 w-9 flex-shrink-0 items-center rounded-full p-1 duration-300 ease-in-out after:h-4 after:w-4 after:rounded-full after:shadow-md after:duration-300 peer-checked:bg-secondary-300 peer-checked:after:translate-x-3"></span>
              </label>
              {searchByGigType && (
                <select
                  className="rounded-sm border border-secondary-300 bg-primary-100 shadow-md"
                  name="gig-type"
                  defaultValue="both"
                >
                  <option value="both">Both</option>
                  <option value="ticketed">Ticketed</option>
                  <option value="free-entry">Free entry</option>
                </select>
              )}
            </div>
          )}

          <Button type="submit">Search</Button>
        </div>
      </Form>
    </div>
  );
}

export default SearchForm;

export async function action({ request }) {
  const formData = await request.formData();

  console.log(formData);
  return formData;
}
