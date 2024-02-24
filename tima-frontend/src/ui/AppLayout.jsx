import { Outlet, redirect } from 'react-router-dom';
import Header from './Header';
import { getIsLoggedIn } from '../services/apiUsers';
import Dialog from '../features/dialog/Dialog';
import Button from './Button';
import { HiPlus } from 'react-icons/hi2';
import SuggestVenueUpdates from '../features/venues/SuggestVenueUpdates';

function AppLayout() {
  return (
    <>
      <Header />
      <div className="fixed right-4 top-20 z-30">
        <Dialog>
          <Dialog.Open opens="suggest-venue-updates">
            <Button type="round">
              <HiPlus />
            </Button>
          </Dialog.Open>
          <Dialog.ModalWindow name="suggest-venue-updates">
            <SuggestVenueUpdates requestType="create" />
          </Dialog.ModalWindow>
        </Dialog>
      </div>
      <main className="bg-secondary-200">
        <Outlet />
      </main>
    </>
  );
}

export default AppLayout;

export const loader = (queryClient) => async () => {
  const { isLoggedIn } = await queryClient.fetchQuery({
    queryKey: ['isLoggedIn'],
    queryFn: getIsLoggedIn,
  });

  console.log(isLoggedIn);

  if (!isLoggedIn) throw redirect('/login');

  return null;
};
