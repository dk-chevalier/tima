import { redirect, useLoaderData } from 'react-router-dom';
import { getCurrentUser, getIsLoggedIn } from '../services/apiUsers';
import Button from '../ui/Button';
import {
  cancelSubscription,
  updateSubscriptionPaymentDetails,
} from '../services/apiSubscriptions';
import toast from 'react-hot-toast';
import CustomToast from '../ui/CustomToast';
import { loadStripe } from '@stripe/stripe-js';
import Dialog from '../features/dialog/Dialog';
import UpdateMe from '../features/account/UpdateMe';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function Account() {
  const data = useLoaderData();
  // const { currentUser, url } = data;
  // console.log(data);

  const currentUser = data.currentUser.data;
  const url = data.url.href;

  // cancel subscription using Stripes inbuilt functionality
  const handleCancelSubscription = async (e) => {
    const { data } = await cancelSubscription();

    if (data.status === 'success') {
      toast.custom((t) => {
        t.duration = 5000;
        return (
          <CustomToast onClick={() => toast.remove(t.id)} type="success" t={t}>
            {data.message}
          </CustomToast>
        );
      });
    } else {
      toast.custom((t) => {
        t.duration = 5000;
        return (
          <CustomToast onClick={() => toast.remove(t.id)} type="error" t={t}>
            Something went wrong cancelling your subscription. Please try again,
            or contact us directly.
          </CustomToast>
        );
      });
    }
  };

  // Send user to Stripes update payment details page
  const handleUpdatePaymentDetails = async (e) => {
    const { data } = await updateSubscriptionPaymentDetails(url);
    const { sessionId } = data;

    const stripe = await stripePromise;

    const { error } = await stripe.redirectToCheckout({
      sessionId,
    });

    if (error) {
      toast.custom((t) => {
        t.duration = 5000;
        return (
          <CustomToast onClick={() => toast.remove(t.id)} type="error" t={t}>
            {error.message}
          </CustomToast>
        );
      });
    }
  };

  return (
    <div className="h-screen w-screen bg-primary-900 p-12">
      <div className="grid h-full w-full grid-cols-2 grid-rows-4 gap-4 rounded-lg bg-primary-100 px-8 py-12">
        <div className="col-span-2 col-start-1 ml-auto mr-0 w-fit text-end">
          <h2 className="py-1 text-end text-3xl font-thin">
            Welcome back {currentUser.name.split(' ')[0]}
          </h2>
          {currentUser.accountPaid ? (
            ''
          ) : (
            <p className="inline-block rounded-md bg-red-500 px-2 py-1 text-sm font-bold text-primary-100 shadow-sm">
              Subscription unpaid
            </p>
          )}
        </div>

        {/* CURRENT ACCOUNT INFO */}
        <div className="col-span-2 col-start-1 flex flex-col justify-between">
          <h3 className="mb-2 font-semibold">Your account settings</h3>
          <div className="ml-2 flex flex-col gap-1">
            {/* USERS NAME */}
            <p>
              <span>Name: </span>
              {currentUser.name}
            </p>

            {/* USERS EMAIL */}
            <p>
              <span>Email: </span>
              {currentUser.email}
            </p>

            {/* USER'S ARTIST/BAND NAME */}
            <p>
              <span>Artist/Band Name: </span>
              {currentUser.artistName}
            </p>
          </div>
        </div>

        {/* GENRES LIST */}
        <div className="col-span-1 col-start-1 flex flex-col gap-1">
          <h3 className="mb-2 font-semibold">Your genres:</h3>
          <div className="ml-2">
            <ul className="grid grid-cols-3">
              {!currentUser.genres.length && (
                <p>
                  You have not selected any genres yet, please add some to your
                  account below
                </p>
              )}
              {currentUser.genres.length > 0 &&
                currentUser.genres.map((genre) => {
                  const capitalisedGenre =
                    genre.charAt(0).toUpperCase() + genre.slice(1);
                  return genre !== 'all' ? (
                    <li key={genre}>{capitalisedGenre}</li>
                  ) : (
                    ''
                  );
                })}
            </ul>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="col-span-2 col-start-1 row-start-[-1] flex h-full w-full justify-around">
          <div className="col-span-2 col-start-1 row-span-1 row-start-4 flex h-min place-content-around gap-3">
            <Dialog>
              <Dialog.Open opens="update-me">
                <Button type="secondary">Update Your Account Info</Button>
              </Dialog.Open>
              <Dialog.ModalWindow name="update-me">
                <UpdateMe />
              </Dialog.ModalWindow>
            </Dialog>
          </div>

          <Button type="secondary" onClick={handleUpdatePaymentDetails}>
            Update payment details
          </Button>

          <Button type="secondary" onClick={handleCancelSubscription}>
            Cancel subscription
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Account;

export const loader =
  (queryClient) =>
  async ({ request }) => {
    let url = new URL(request.url);
    console.log(request);

    const { isLoggedIn } = await queryClient.fetchQuery({
      queryKey: ['isLoggedIn'],
      queryFn: getIsLoggedIn,
    });

    if (!isLoggedIn) throw redirect('/login');

    if (queryClient.getQueryData(['me'])) {
      const currentUser = queryClient.getQueryData(['me']);
      return { currentUser, url };
    }

    const currentUser = await queryClient.fetchQuery({
      queryKey: ['me'],
      queryFn: getCurrentUser,
    });

    return { currentUser, url };
  };
