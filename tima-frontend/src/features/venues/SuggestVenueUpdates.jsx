import { Form } from 'react-router-dom';

function SuggestVenueUpdates({ venueId, onCloseModal }) {
  return (
    <div className="h-[70vh] w-[40vw] overflow-y-scroll">
      <h2 className="p-3 text-2xl font-thin">
        Suggest updates to venue information
      </h2>
      <Form>
        <div className="flex flex-col gap-6">
          {/* Venue Contact Details */}
          <div>
            <p className="mb-2 font-semibold">Venue contact details:</p>
            <div className="flex flex-col gap-2 px-3">
              {/* Venue Name */}
              <div>
                <label>
                  <p>Venue name:</p>
                  <input
                    name="venueName"
                    type="text"
                    placeholder="Type venue's new name"
                    className="w-full rounded-sm border border-secondary-300 bg-primary-100 shadow-md"
                  />
                </label>
              </div>

              {/* Venue Website */}
              <div>
                <label>
                  <p>Venue website:</p>
                  <input
                    name="website"
                    type="text"
                    placeholder="Type venue's new website"
                    className="w-full rounded-sm border border-secondary-300 bg-primary-100 shadow-md"
                  />
                </label>
              </div>

              {/* Venue Phone */}
              <div>
                <label>
                  <p>Venue phone number:</p>
                  <input
                    name="venuePh"
                    type="text"
                    placeholder="Type venue's new phone number"
                    className="w-full rounded-sm border border-secondary-300 bg-primary-100 shadow-md"
                  />
                </label>
              </div>

              {/* Venue Email */}
              <div>
                <label>
                  <p>Venue email address:</p>
                  <input
                    name="venueEmail"
                    type="text"
                    placeholder="Type venue's new email address"
                    className="w-full rounded-sm border border-secondary-300 bg-primary-100 shadow-md"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Venue Address */}
          <div>
            <p className="mb-2 font-semibold">Address details:</p>
            <div className="flex flex-col gap-2 px-3">
              {/* Street */}
              <div>
                <label>
                  <p>Street:</p>
                  <input
                    name="street"
                    type="text"
                    placeholder="Type venue's new street address"
                    className="w-full rounded-sm border border-secondary-300 bg-primary-100 shadow-md"
                  />
                </label>
              </div>

              <div className="flex justify-between gap-3">
                {/* City */}
                <div className="w-1/2">
                  <label>
                    <p>City:</p>
                    <input
                      name="city"
                      type="text"
                      placeholder="Type venues new city"
                      className="w-full rounded-sm border border-secondary-300 bg-primary-100 shadow-md"
                    />
                  </label>
                </div>

                {/* State */}
                <div className="w-1/2">
                  <label>
                    <p>State:</p>
                    <input
                      name="state"
                      type="text"
                      placeholder="Type venues new state"
                      className="w-full rounded-sm border border-secondary-300 bg-primary-100 shadow-md"
                    />
                  </label>
                </div>
              </div>

              <div className="flex justify-between gap-3">
                {/* Country */}
                <div className="w-1/2">
                  <label>
                    <p>Country:</p>
                    <input
                      name="country"
                      type="text"
                      placeholder="Type venues new country"
                      className="w-full rounded-sm border border-secondary-300 bg-primary-100 shadow-md"
                    />
                  </label>
                </div>

                {/* Postcode */}
                <div className="w-1/2">
                  <label>
                    <p>Postcode:</p>
                    <input
                      name="postcode"
                      type="text"
                      placeholder="Type venues new postcode"
                      className="w-full rounded-sm border border-secondary-300 bg-primary-100 shadow-md"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Booker Details */}
          <div>
            <p className="mb-2 font-semibold">Booker contact details:</p>
            <div className="flex flex-col gap-2 px-3">
              {/* Booker Name */}
              <div>
                <label>
                  <p>New bookers name:</p>
                  <input
                    name="bookerName"
                    type="text"
                    placeholder="Type name of the new booker"
                    className="w-full rounded-sm border border-secondary-300 bg-primary-100 shadow-md"
                  />
                </label>
              </div>

              <div className="flex justify-between gap-3">
                {/* Booker Email */}
                <div className="w-1/2">
                  <label>
                    <p>New bookers email address:</p>
                    <input
                      name="bookerEmail"
                      type="text"
                      placeholder="Type bookers email address"
                      className="w-full rounded-sm border border-secondary-300 bg-primary-100 shadow-md"
                    />
                  </label>
                </div>

                {/* Booker Phone Number */}
                <div className="w-1/2">
                  <label>
                    <p>New bookers phone number:</p>
                    <input
                      name="bookerPh"
                      type="text"
                      placeholder="Type bookers phone number"
                      className="w-full rounded-sm border border-secondary-300 bg-primary-100 shadow-md"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Extra Details */}
          <div>
            <p className="mb-2 font-semibold">Extra details:</p>
            <div className="flex flex-col gap-2 px-3">
              {/* Days */}
              <div>
                <label>
                  <p>Select days that the venue has live music:</p>
                  <p className="text-xs font-thin text-gray-600">
                    hold ctrl/cmd to select multiple
                  </p>
                  <select
                    className="rounded-sm border border-secondary-300 bg-primary-100 shadow-md"
                    name="days"
                    multiple
                  >
                    <option value="monday">Monday</option>
                    <option value="tuesday">Tuesday</option>
                    <option value="wednesday">Wednesday</option>
                    <option value="thursday">Thursday</option>
                    <option value="friday">Friday</option>
                    <option value="saturday">Saturday</option>
                    <option value="sunday">Sunday</option>
                  </select>
                </label>
              </div>

              {/* Supports Originals */}
              <div>
                <label>
                  <p>Does the venue support original music?</p>
                  <p className="text-xs font-thin text-gray-600">
                    Y/y = yes | N/n = no
                  </p>
                  <input
                    name="originals"
                    type="text"
                    placeholder="Input Y if the venue supports originals, or N if it does not"
                    className="w-full rounded-sm border border-secondary-300 bg-primary-100 shadow-md"
                  />
                </label>
              </div>

              {/* Venue Provides PA */}
              <div>
                <label>
                  <p>Does the venue provide a PA system?</p>
                  <p className="text-xs font-thin text-gray-600">
                    Y/y = yes | N/n = no
                  </p>
                  <input
                    name="soundSystemProvided"
                    type="text"
                    placeholder="Input Y if the venue provides a PA, or N if it does not"
                    className="w-full rounded-sm border border-secondary-300 bg-primary-100 shadow-md"
                  />
                </label>
              </div>

              {/* Capacity */}
              <div>
                <label>
                  <p>What is the venue capacity?</p>
                  <input
                    name="capacity"
                    type="number"
                    className="w-full rounded-sm border border-secondary-300 bg-primary-100 shadow-md"
                  />
                </label>
              </div>

              {/* Supported Genres */}
              <div>
                <label>
                  <p>Select genres that the venue supports:</p>
                  <p className="text-xs font-thin text-gray-600">
                    hold ctrl/cmd to select multiple
                  </p>
                  <select
                    className="rounded-sm border border-secondary-300 bg-primary-100 shadow-md"
                    name="genres"
                    multiple
                  >
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
                    <option value="singer-songwriter">
                      Singer-songrwriter
                    </option>
                    <option value="soul">Soul</option>
                  </select>
                </label>
              </div>

              {/* Gig Type */}
              <div>
                <label>
                  <p>What types of gigs does the venue host?</p>
                  <select
                    className="rounded-sm border border-secondary-300 bg-primary-100 shadow-md"
                    name="gig-type"
                    defaultValue="both"
                  >
                    <option value="both">Both</option>
                    <option value="ticketed">Ticketed</option>
                    <option value="free-entry">Free entry</option>
                  </select>
                </label>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default SuggestVenueUpdates;
