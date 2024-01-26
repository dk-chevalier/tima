import { HiArrowLeft, HiXMark } from 'react-icons/hi2';
import Button from './Button';

function Details({ children, query }) {
  return (
    <section className="no-scrollbar absolute left-[105%] top-4 z-50 grid h-[75vh] w-[35vw] min-w-[300px] grid-cols-2 grid-rows-[8rem_min-content_min-content] gap-6 overflow-y-scroll rounded-md border border-secondary-300 bg-primary-100 p-6 shadow-lg">
      <div className="absolute left-4 right-4 top-4 flex justify-between">
        <Button to="-1" type="back">
          <HiArrowLeft />
        </Button>
        <Button to={`..${query ? query : ''}`} type="close">
          <HiXMark />
        </Button>
      </div>
      {children}
    </section>
  );
}

export default Details;
