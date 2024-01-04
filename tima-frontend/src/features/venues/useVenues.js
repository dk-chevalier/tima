import { useQuery } from '@tanstack/react-query';
import { getVenues } from '../../services/apiVenues';

// // TODO - Turn into query of database...this is temporary

// const tempVenues = [
//   {
//     venueName: 'The Wesley Anne',
//     address: {
//       street: '200 High Street',
//       city: 'Northcote',
//       state: 'Victoria',
//       country: 'Australia',
//       postcode: '3070',
//       venuePh: '03 9898 9898',
//       venueEmail: 'info@thewesleyanne.com',
//     },
//     website: 'www.thewesleyanne.com',
//     bookingContact: {
//       bookerName: 'Jeremy',
//       bookerEmail: 'jeremy@thewesleyanne.com',
//       bookerPh: '0404 040 040',
//     },
//     location: {
//       type: 'Point',
//       coordinates: [40, 109],
//     },
//     ratingsAverage: 4.5,
//     ratingsQuantity: 10,
//     days: [
//       'monday',
//       'tuesday',
//       'wednesday',
//       'thursday',
//       'friday',
//       'saturday',
//       'sunday',
//     ],
//     originals: true,
//     soundSystemProvided: true,
//     capacity: 100,
//     gigType: 'both',
//   },
//   {
//     venueName: 'Edingburgh Castle',
//     address: {
//       street: '100 Sydney Road',
//       city: 'Brunswick',
//       state: 'Victoria',
//       country: 'Australia',
//       postcode: '3058',
//       venuePh: '03 9191 9191',
//       venueEmail: 'info@edingburghcastle.com',
//     },
//     website: 'www.edingburghcastle.com',
//     bookingContact: {
//       bookerName: 'Jeremy',
//       bookerEmail: 'jeremy@thewesleyanne.com',
//       bookerPh: '0404 040 040',
//     },
//     location: {
//       type: 'Point',
//       coordinates: [33, 173],
//     },
//     ratingsAverage: 4.2,
//     ratingsQuantity: 17,
//     days: ['thursday', 'friday', 'saturday', 'sunday'],
//     originals: true,
//     soundSystemProvided: true,
//     capacity: 200,
//     gigType: 'both',
//   },
// ];

export function useVenues() {
  const {
    data: venues,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['venues'],
    queryFn: getVenues,
  });

  return { isLoading, venues, error };
}
