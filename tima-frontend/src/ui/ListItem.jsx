// FIXME: use DRY principle!!!!!!!!

function ListItem({ type, name, contactName, contactEmail, city, website }) {
  if (type === 'venue')
    return (
      <li className="flex h-28 flex-col rounded-md bg-primary-300 px-3 py-2 text-primary-900 shadow-sm">
        <div>
          <h2 className="text-base font-semibold">{name}</h2>
          <p className="text-xs text-primary-800">{city}</p>
        </div>
        <div className="text text-end">
          <h3 className="text-base font-medium">Booker:</h3>
          <p className="text-sm">{contactName}</p>
          <p className="text-sm">{contactEmail}</p>
        </div>
      </li>
    );

  if (type === 'station')
    return (
      <li className="flex h-28 flex-col rounded-md bg-primary-300 px-3 py-2 text-primary-900 shadow-sm">
        <div>
          <h2 className="text-base font-semibold">{name}</h2>
          <p className="text-xs text-primary-800">{city}</p>
        </div>
        <div className="text text-end">
          <h3 className="text-sm font-medium">Music Submissions:</h3>
          <p className="text-sm">{contactEmail}</p>
        </div>
      </li>
    );
}

export default ListItem;
