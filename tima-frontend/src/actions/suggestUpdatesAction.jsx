import axios from 'axios';
import toast from 'react-hot-toast';
import CustomToast from '../ui/CustomToast';

const URL = import.meta.env.VITE_LOCAL_URL;

async function suggestUpdatesAction({ request, params }) {
  const { id } = params;

  const formData = Object.fromEntries(await request.formData());
  console.log('DATA', formData);

  const [requestType, dataType] = formData.updateOptions.split(' ');
  console.log(requestType);
  console.log(dataType);

  if (dataType === 'venueUpdates') {
    venueUpdatesAction(formData, id, requestType);
  }

  if (dataType === 'radioStationUpdates') {
    radioStationUpdatesAction(formData, id, requestType);
  }

  return null;
}

export default suggestUpdatesAction;

async function radioStationUpdatesAction(data, id, requestType) {
  const {
    stationName,
    website,
    stationPh,
    stationEmail,
    street,
    city,
    state,
    country,
    postcode,
    musicSubmissionsName,
    musicSubmissionsEmail,
    interviewRequestsName,
    interviewRequestsEmail,
  } = data;

  console.log('REQUEST TYPE');
  console.log(requestType);

  const address = {
    street,
    city,
    state,
    country,
    postcode,
  };

  const musicSubmissions = {
    contactName: musicSubmissionsName,
    email: musicSubmissionsEmail,
  };

  const interviewRequests = {
    contactName: interviewRequestsName,
    email: interviewRequestsEmail,
  };

  if (requestType === 'update') {
    try {
      const { data } = await axios.patch(
        `${URL}/api/v1/radioStationUpdates/${id}`,
        {
          stationName,
          website,
          stationPh,
          stationEmail,
          address,
          musicSubmissions,
          interviewRequests,
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
            Updates successfully submitted. We will contact the radio station to
            confirm these details asap.
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
  if (requestType === 'create') {
    try {
      const { data } = await axios.post(
        `${URL}/api/v1/radioStationUpdates/${id ? id : ''}`,
        {
          stationName,
          website,
          stationPh,
          stationEmail,
          address,
          musicSubmissions,
          interviewRequests,
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
            Updates successfully submitted. We will contact the radio station to
            confirm these details asap.
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

async function venueUpdatesAction(data, id, requestType) {
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
  } = data;

  let originals;
  let soundSystemProvided;

  console.log('REQUEST TYPE');
  console.log(requestType);

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

  const address = {
    street,
    city,
    state,
    country,
    postcode,
  };

  const bookingContact = {
    bookerName,
    bookerEmail,
    bookerPh,
  };

  if (requestType === 'update') {
    try {
      const { data } = await axios.patch(
        `${URL}/api/v1/venueUpdates/${id}`,
        {
          venueName,
          website,
          venuePh,
          venueEmail,
          address,
          bookingContact,
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
  if (requestType === 'create') {
    try {
      const { data } = await axios.post(
        `${URL}/api/v1/venueUpdates/${id ? id : ''}`,
        {
          venueName,
          website,
          venuePh,
          venueEmail,
          address,
          bookingContact,
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
