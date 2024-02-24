import { useState } from 'react';
import { Form, redirect } from 'react-router-dom';
import Toggle from '../../ui/Toggle';
import Button from '../../ui/Button';
import GenresSelection from '../../ui/GenresSelection';
import GigTypeSelection from '../../ui/GigTypeSelection';
import DaysSelection from '../../pages/DaysSelection';
import axios from 'axios';
import toast from 'react-hot-toast';
import CustomToast from '../../ui/CustomToast';

const URL = import.meta.env.VITE_LOCAL_URL;

function SuggestVenueUpdates({ venueId, onCloseModal, requestType }) {
  const [updateVenueContactDetails, setUpdateVenueContactDetails] =
    useState(false);
  const [updateAddressDetails, setUpdateAddressDetails] = useState(false);
  const [updateBookerDetails, setUpdateBookerDetails] = useState(false);
  const [updateExtraDetails, setUpdateExtraDetails] = useState(false);

  return (
    <div className="h-[70vh] w-[40vw] overflow-y-scroll">
      <h2 className="fixed w-[40vw] bg-primary-100 p-3 text-2xl font-thin">
        Suggest updates to venue information
      </h2>
      <Form method="post">
        <div className="mt-16 flex flex-col gap-6">
          {/* Venue Contact Details */}
          <div className="flex justify-between">
            <h3
              className={`mb-2 inline font-semibold ${
                updateVenueContactDetails ? '' : 'text-gray-400'
              }`}
            >
              Update venue contact details:
            </h3>
            <Toggle
              type="round"
              onChange={() =>
                setUpdateVenueContactDetails(!updateVenueContactDetails)
              }
            />
          </div>
          {updateVenueContactDetails && (
            <div className="mb-6 mt-[-1rem]">
              <div className="flex flex-col gap-5 px-3">
                {/* Venue Name */}
                <div>
                  <label className="flex items-center justify-between gap-4">
                    <h3 className="w-max">Venue name:</h3>
                    <input
                      name="venueName"
                      type="text"
                      placeholder="Type venue's new name"
                      className="w-[22vw] rounded-md border border-secondary-300 bg-primary-100 px-2 py-1 shadow-md"
                    />
                  </label>
                </div>

                {/* Venue Website */}
                <div>
                  <label className="flex items-center justify-between gap-4">
                    <h3 className="w-max">Venue website:</h3>
                    <input
                      name="website"
                      type="text"
                      placeholder="Type venue's new website"
                      className="w-[22vw] rounded-md border border-secondary-300 bg-primary-100 px-2 py-1 shadow-md"
                    />
                  </label>
                </div>

                {/* Venue Phone */}
                <div>
                  <label className="gap4 flex items-center justify-between">
                    <h3 className="w-max">Venue phone number:</h3>
                    <input
                      name="venuePh"
                      type="text"
                      placeholder="Type venue's new phone number"
                      className="w-[22vw] rounded-md border border-secondary-300 bg-primary-100 px-2 py-1 shadow-md"
                    />
                  </label>
                </div>

                {/* Venue Email */}
                <div>
                  <label className="flex items-center justify-between gap-4">
                    <h3 className="w-max">Venue email address:</h3>
                    <input
                      name="venueEmail"
                      type="text"
                      placeholder="Type venue's new email address"
                      className="w-[22vw] rounded-md border border-secondary-300 bg-primary-100 px-2 py-1 shadow-md"
                    />
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Venue Address */}
          <div className="flex justify-between">
            <h3
              className={`mb-2 inline font-semibold ${
                updateAddressDetails ? '' : 'text-gray-400'
              }`}
            >
              Update address details:
            </h3>
            <Toggle
              type="round"
              onChange={() => setUpdateAddressDetails(!updateAddressDetails)}
            />
          </div>
          {updateAddressDetails && (
            <div className="mb-6 mt-[-1rem]">
              <div className="flex flex-col gap-2 px-3">
                {/* Street */}
                <div>
                  <label>
                    <p>Street:</p>
                    <input
                      name="street"
                      type="text"
                      placeholder="Type venues new street address"
                      className="w-full rounded-md border border-secondary-300 bg-primary-100 px-2 py-1 shadow-md"
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
                        className="w-full rounded-md border border-secondary-300 bg-primary-100 px-2 py-1 shadow-md"
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
                        className="w-full rounded-md border border-secondary-300 bg-primary-100 px-2 py-1 shadow-md"
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
                        className="w-full rounded-md border border-secondary-300 bg-primary-100 px-2 py-1 shadow-md"
                      />
                    </label>
                  </div>

                  {/* Postcode */}
                  <div className="w-1/2">
                    <label>
                      <h3>Postcode:</h3>
                      <input
                        name="postcode"
                        type="text"
                        placeholder="Type venues new postcode"
                        className="w-full rounded-md border border-secondary-300 bg-primary-100 px-2 py-1 shadow-md"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Booker Details */}
          <div className="flex justify-between">
            <h3
              className={`mb-2 inline font-semibold ${
                updateBookerDetails ? '' : 'text-gray-400'
              }`}
            >
              Update booker contact details:
            </h3>
            <Toggle
              type="round"
              onChange={() => setUpdateBookerDetails(!updateBookerDetails)}
            />
          </div>
          {updateBookerDetails && (
            <div className="mb-6 mt-[-1rem]">
              <div className="flex flex-col gap-5 px-3">
                {/* Booker Name */}
                <div>
                  <label className="flex items-center justify-between gap-4">
                    <h3 className="w-max">New bookers name:</h3>
                    <input
                      name="bookerName"
                      type="text"
                      placeholder="Type name of the new booker"
                      className="w-[22vw] rounded-md border border-secondary-300 bg-primary-100 px-2 py-1 shadow-md"
                    />
                  </label>
                </div>

                {/* Booker Email */}
                <div>
                  <label className="flex items-center justify-between gap-4">
                    <h3 className="w-max">New bookers email address:</h3>
                    <input
                      name="bookerEmail"
                      type="text"
                      placeholder="Type bookers email address"
                      className="w-[22vw] rounded-md border border-secondary-300 bg-primary-100 px-2 py-1 shadow-md"
                    />
                  </label>
                </div>

                {/* Booker Phone Number */}
                <div>
                  <label className="flex items-center justify-between gap-4">
                    <h3 className="w-max">New bookers phone number:</h3>
                    <input
                      name="bookerPh"
                      type="text"
                      placeholder="Type bookers phone number"
                      className="w-[22vw] rounded-md border border-secondary-300 bg-primary-100 px-2 py-1 shadow-md"
                    />
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Extra Details */}
          <div className="flex justify-between">
            <h3
              className={`mb-2 inline font-semibold ${
                updateExtraDetails ? '' : 'text-gray-400'
              }`}
            >
              Update extra details:
            </h3>
            <Toggle
              type="round"
              onChange={() => setUpdateExtraDetails(!updateExtraDetails)}
            />
          </div>
          {updateExtraDetails && (
            <div className="mb-6 mt-[-1rem]">
              <div className="flex flex-col gap-12 px-3">
                {/* Days */}
                <div>
                  <h3 className="mb-3">
                    Select days that the venue has live music:
                  </h3>

                  <DaysSelection numberCols="3" />
                </div>

                {/* Supports Originals */}
                <div>
                  <label className="flex items-center justify-between gap-4">
                    <div className="w-max">
                      <h3 className="w-max">
                        Does the venue support original music?
                      </h3>
                      <p className="text-xs font-thin text-gray-600">
                        Y/y = yes | N/n = no
                      </p>
                    </div>
                    <input
                      name="originalsUpdate"
                      type="text"
                      placeholder="Y/N"
                      className="w-[15vw] rounded-md border border-secondary-300 bg-primary-100 px-2 py-1 shadow-md"
                    />
                  </label>
                </div>

                {/* Venue Provides PA */}
                <div>
                  <label className="flex items-center justify-between gap-4">
                    <div className="w-max">
                      <h3 className="w-max">
                        Does the venue provide a PA system?
                      </h3>
                      <p className="text-xs font-thin text-gray-600">
                        Y/y = yes | N/n = no
                      </p>
                    </div>
                    <input
                      name="soundSystemProvidedUpdate"
                      type="text"
                      placeholder="Y/N"
                      className="w-[15vw] rounded-md border border-secondary-300 bg-primary-100 px-2 py-1 shadow-md"
                    />
                  </label>
                </div>

                {/* Capacity */}
                <div>
                  <label className="flex items-center justify-between gap-4">
                    <h3 className="w-max">What is the venue capacity?</h3>
                    <input
                      name="capacity"
                      type="number"
                      placeholder="Number"
                      className="w-[15vw] rounded-md border border-secondary-300 bg-primary-100 px-2 py-1 shadow-md"
                    />
                  </label>
                </div>

                {/* Supported Genres */}
                <div>
                  <h3 className="mb-3">
                    Select genres that the venue supports:
                  </h3>
                  <GenresSelection numberCols="3" />
                </div>

                {/* Gig Type */}
                <GigTypeSelection withToggle={true}>
                  What types of gigs does the venue host?
                </GigTypeSelection>
              </div>
            </div>
          )}
          <div className="w-max self-center">
            <Button type="submit" name="requestType" value={requestType}>
              Submit updates
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default SuggestVenueUpdates;

export async function action({ request, params }) {
  const { id } = params;

  const {
    venueName,
    website,
    venuePh,
    venueEmail,
    street,
    city,
    state,
    country,
    postcode,
    bookerName,
    bookerEmail,
    bookerPh,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday,
    originalsUpdate,
    soundSystemProvidedUpdate,
    capacity,
    acoustic,
    blues,
    classical,
    countryGenre,
    disco,
    electronic,
    folk,
    funk,
    hipHop,
    indie,
    jazz,
    latin,
    metal,
    pop,
    punk,
    rnb,
    reggae,
    rock,
    singerSongwriter,
    soul,
    gigType,
    requestType,
  } = Object.fromEntries(await request.formData());

  let originals;
  let soundSystemProvided;

  if (originalsUpdate?.toLowerCase() === 'y') originals = true;
  if (originalsUpdate?.toLowerCase() === 'n') originals = false;

  if (soundSystemProvidedUpdate?.toLowerCase() === 'y')
    soundSystemProvided = true;
  if (soundSystemProvidedUpdate?.toLowerCase() === 'n')
    soundSystemProvided = false;

  // filter is used to eliminate undefined values
  const genresArr = [
    acoustic,
    blues,
    classical,
    countryGenre,
    disco,
    electronic,
    folk,
    funk,
    hipHop,
    indie,
    jazz,
    latin,
    metal,
    pop,
    punk,
    rnb,
    reggae,
    rock,
    singerSongwriter,
    soul,
  ].filter((el) => el);

  const genres = genresArr.length > 0 ? genresArr : null;

  const daysArr = [
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday,
  ].filter((el) => el);

  // this prevents backend from registering there was a value in 'days' (because prevents simply sending an empty array)
  const days = daysArr.length > 0 ? daysArr : null;

  if (requestType === 'update') {
    try {
      const { data } = await axios.patch(
        `${URL}/api/v1/venues/${id}/suggest-venue-updates`,
        {
          venueName,
          website,
          venuePh,
          venueEmail,
          street,
          city,
          state,
          country,
          postcode,
          bookerName,
          bookerEmail,
          bookerPh,
          originals,
          soundSystemProvided,
          days,
          capacity: +capacity,
          genres,
          gigType,
          requestType,
        },
        { withCredentials: true },
      );

      console.log('DATA!!!!!!!!!!!!!!!!!!');
      console.log(data);

      toast.custom((t) => {
        t.duration = 3000;
        return (
          <CustomToast onClick={() => toast.remove(t.id)} type="success" t={t}>
            Updates successfully submitted. We will contact the venue to confirm
            these details asap.
          </CustomToast>
        );
      });
    } catch (err) {
      console.error(err);
      toast.custom((t) => {
        t.duration = 5000;
        return (
          <CustomToast onClick={() => toast.remove(t.id)} type="error" t={t}>
            Something went wrong. Please try submitting your suggested updates
            again.
          </CustomToast>
        );
      });
    }
  }

  return null;
}
