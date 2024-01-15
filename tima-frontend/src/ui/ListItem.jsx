function ListItem({ type, name, contactName, contactEmail, city, website }) {
  return (
    <li className="flex h-28 flex-col rounded-md bg-primary-300 px-3 py-2 text-primary-900 shadow-sm">
      <div className="text-end">
        <h2 className="text-base font-semibold">{name}</h2>
        <p className="text-xs text-primary-800">{city}</p>
      </div>
      <div>
        <h3 className="text-sm font-medium">
          {type === 'venue' && 'Booker:'}
          {type === 'station' && 'Music Submissions:'}
        </h3>
        {contactName && <p className="text-sm">{contactName}</p>}
        <p className="text-sm">{contactEmail}</p>
      </div>
    </li>
  );
}

export default ListItem;
