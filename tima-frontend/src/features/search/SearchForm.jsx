import { HiXMark } from 'react-icons/hi2';
import Button from '../../ui/Button';
import { Form, useActionData } from 'react-router-dom';
import { useState } from 'react';
import { AddressAutofill } from '@mapbox/search-js-react';
import { useDispatch } from 'react-redux';
import { closeSearchForm } from './searchFormSlice';

const MAP_TOKEN = import.meta.env.VITE_MAP_TOKEN;

function SearchForm({ onClick }) {
  const [searchFor, setSearchFor] = useState('venues');
  const [searchBy, setSearchBy] = useState('location');

  const dispatch = useDispatch();

  console.log(searchBy);

  return (
    <div className="w-m absolute left-[2.5%] top-[2.5%] z-50 h-[95%] w-[95%] overflow-y-scroll rounded-md border border-secondary-300 bg-primary-100 px-3 pb-3 pt-5 shadow-lg">
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
        <div className="flex flex-col gap-10 font-light">
          <div className="flex flex-col gap-1">
            <label>What are you searching for?</label>
            <select
              className="border border-secondary-300 bg-primary-200 shadow-md"
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

          <div className="flex flex-col gap-1">
            <label>Search by name or location?</label>
            <select
              name="searchBy"
              required
              onChange={({ target }) => {
                setSearchBy(target.value);
              }}
            >
              <option value="location">Search by location</option>
              <option value="name">Search by name</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            {searchBy === 'location' && (
              <>
                <label>Search by location</label>
                {/* <AddressAutofill
                  accessToken={MAP_TOKEN}
                  onSuggest={() => console.log('suggestions')}
                  onRetrieve={() => console.log('retrieve')}
                > */}
                <input
                  type="text"
                  placeholder="Search by location"
                  name="searchLocation"
                  autoComplete="street-address country-name address-level1 address-level2 address-level3 address-level4"
                />
                {/* </AddressAutofill> */}
              </>
            )}
            {searchBy === 'name' && (
              <>
                <label>Search by name</label>
                <input
                  type="text"
                  placeholder="Search by name"
                  name="searchName"
                ></input>
              </>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label>Search by genres supported</label>
            <select defaultValue="saved-genres" name="genres">
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
          </div>

          {searchFor === 'venues' && (
            <div className="flex flex-col gap-1">
              <label>Search by types of gigs the venue hosts</label>
              <select name="gig-type" defaultValue="both">
                <option value="both">Both</option>
                <option value="ticketed">Ticketed</option>
                <option value="free-entry">Free entry</option>
              </select>
            </div>
          )}

          <div className="flex flex-col gap-1"></div>

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
