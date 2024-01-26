import { HiChevronDown } from 'react-icons/hi2';
import Button from '../ui/Button';
import RadioShowsList from '../features/radio/shows/RadioShowsList';
import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import StyledNavLink from './StyledNavLink';

function ListItem({
  type,
  name,
  contactName,
  contactEmail,
  city,
  website,
  id,
  query,
}) {
  const [showsOpen, setShowsOpen] = useState(false);

  const { latlng, distance, unit, id: openId } = useParams();
  console.log(openId);

  const { pathname } = useLocation();

  // allows filtered list to stay filtered when opening details
  let newPath;

  // console.log(url);

  // console.log(query);

  // const { pathname } = url;
  // writing query ? query : '' because for some reason it was adding undefined to the string if I didn't...
  if (pathname.includes('radio') && latlng)
    newPath = `/map/radio/${latlng}/${distance}/${unit}/${type}s/${id}`;
  if (pathname.includes('radio') && !latlng)
    newPath = `/map/radio/${type}s/${id}${query ? query : ''}`;

  const baseStyle =
    'flex h-min flex-col rounded-md px-3 py-2 text-primary-900 shadow-lg transition-all duration-300 hover:shadow-md border-secondary-300 border';

  const liStyle = {
    venue: baseStyle + ' bg-secondary-200',
    station: baseStyle + ' bg-secondary-200',
    show: baseStyle + ' bg-secondary-200',
  };

  function toggleRadioShows() {
    setShowsOpen(!showsOpen);
  }

  return (
    <>
      <li className={liStyle[type]}>
        <div className="text-end">
          <h2 className="text-base font-semibold">{name}</h2>
          <p className="text-sm">{city}</p>
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
              <StyledNavLink
                to={
                  // pathname.includes('radio')
                  //   ? `/map/radio/${type}s/${id}`
                  //   : `/map/${type}s/${id}`
                  newPath || `/map/${type}s/${id}${query ? query : ''}`
                  // `${openId ? '../' : ''}${id}`
                }
                type="secondary"
              >
                More info
              </StyledNavLink>
            </div>
            {type === 'station' && (
              <div className="flex items-center justify-center">
                <Button type="secondary" onClick={toggleRadioShows}>
                  <span className="pr-1">Shows</span>
                  <span
                    className={`flex origin-center duration-300 ${
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
