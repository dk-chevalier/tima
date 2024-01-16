import { HiChevronDown, HiChevronUp } from 'react-icons/hi2';
import Button from '../ui/Button';
import { useRadioShows } from '../features/radio/useRadioShows';
import RadioShowsList from '../features/radio/RadioShowsList';
import { useState } from 'react';

function ListItem({
  type,
  name,
  contactName,
  contactEmail,
  city,
  website,
  id,
}) {
  const [showsOpen, setShowsOpen] = useState(false);

  const baseStyle =
    'flex h-min flex-col rounded-md bg-primary-300 px-3 py-2 text-primary-900 shadow-sm';

  const liStyle = {
    venue: baseStyle + ' bg-primary-300',
    station: baseStyle + ' bg-primary-300',
    show: baseStyle + ' bg-secondary-300',
  };

  function toggleRadioShows(e) {
    setShowsOpen(!showsOpen);
  }

  return (
    <>
      <li className={liStyle[type]}>
        <div className="text-end">
          <h2 className="text-base font-semibold">{name}</h2>
          <p className="text-sm text-primary-800">{city}</p>
        </div>
        <div className="flex items-end justify-between">
          <div>
            <h3 className="text-sm font-medium">
              {type === 'venue' && 'Booker:'}
              {type === 'station' && 'Music Submissions:'}
            </h3>
            {contactName && <p className="text-sm">{contactName}</p>}
            <p className="text-sm">{contactEmail}</p>
          </div>
          <div className="flex flex-col gap-2 pt-2">
            <Button href={website} type="secondary">
              Website
            </Button>
            <div>
              <Button type="secondary">More info</Button>
            </div>
            {type === 'station' && (
              <div className="flex items-center justify-center">
                <Button type="secondary" onClick={toggleRadioShows}>
                  Shows{' '}
                  <span
                    className={`flex origin-center items-center justify-center pl-1 duration-300 ${
                      showsOpen && 'rotate-180'
                    }`}
                  >
                    <HiChevronDown />
                  </span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </li>
      {showsOpen && (
        <ul className="pl-5">
          <RadioShowsList stationId={id} />
        </ul>
      )}
    </>
  );
}

export default ListItem;
