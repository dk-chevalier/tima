import { HiArrowLeft, HiXMark } from 'react-icons/hi2';
import Button from './Button';
import { useLocation, useParams } from 'react-router-dom';

function Details({ children }) {
  const { pathname } = useLocation();
  const { venueId, stationId, showId } = useParams();

  let close;
  if (pathname.includes('stations'))
    close = pathname.replace(`/stations/${stationId}`, '');
  if (pathname.includes('shows'))
    close = pathname.replace(`/shows/${showId}`, '');
  if (venueId) {
    close = pathname.replace(venueId, '');
  }

  return (
    <section className="no-scrollbar absolute left-[24vw] top-[70px] z-50 grid h-[75vh] w-[35vw] min-w-[300px] grid-cols-2 grid-rows-[8rem_min-content_min-content] gap-6 overflow-y-scroll rounded-md border border-secondary-300 bg-primary-100 p-6 shadow-lg">
      <div className="absolute left-4 right-4 top-4 flex justify-between">
        <Button to="-1" type="back">
          <HiArrowLeft />
        </Button>
        <Button to={close} type="close">
          <HiXMark />
        </Button>
      </div>
      {children}
    </section>
  );
}

export default Details;
