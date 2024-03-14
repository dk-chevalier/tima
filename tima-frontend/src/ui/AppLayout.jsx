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
        {/* FIXME: WHEN USING SAME SUGGESTVENUEUPDATES BUT WITH DIFFERENT REQUEST TYPE, CURRENTLY CAUSING IT TO BECOME CONFUSED AS TO WHICH IS OPEN, SO ref.current = the wrong one, so clicking means e.target always shows a different one, and so .contains() doesn't exist within it */}
        {/* <Dialog>
          <Dialog.Open opens="suggest-venue-updates">
            <Button type="round">
              <HiPlus />
            </Button>
          </Dialog.Open>
          <Dialog.ModalWindow name="suggest-venue-updates">
            <SuggestVenueUpdates requestType="create" />
          </Dialog.ModalWindow>
        </Dialog> */}
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
