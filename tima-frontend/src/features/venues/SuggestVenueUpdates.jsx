import { Form } from 'react-router-dom';

function SuggestVenueUpdates({ venueId, onCloseModal }) {
  return (
    <div className="w-[40vw]">
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
                    <p className="mb-2 font-semibold">Postcode:</p>
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
            <p>Booker contact details:</p>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default SuggestVenueUpdates;
