import SuggestVenueUpdates from '../features/venues/SuggestVenueUpdates';

function AddContacts() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-primary-900 p-4">
      <div className="flex justify-center rounded-lg border border-secondary-300 bg-primary-100 p-8">
        <SuggestVenueUpdates requestType="create" />
      </div>
    </div>
  );
}

export default AddContacts;
