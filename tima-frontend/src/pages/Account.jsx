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

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function Account() {
  const data = useLoaderData();
  // const { currentUser, url } = data;

  const currentUser = data.currentUser.data;
  const url = data.url.href;

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
            Something went wrong canceling your subscription. Please try again,
            or contact us directly.
          </CustomToast>
        );
      });
    }
  };

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
      <div className="h-full w-full rounded-lg bg-primary-100 p-5">
        <div className="ml-auto mr-0 w-fit text-end">
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

        <div>
          <h3>Your account settings</h3>
          <p>
            <span>Name: </span>
            {currentUser.name}
          </p>
          <p>
            <span>Email: </span>
            {currentUser.email}
          </p>
        </div>

        <div>
          <h3>Your genres:</h3>
          <ul>
            {!currentUser.genres.length && (
              <p>
                You have not selected any genres yet, please add some to your
                account below
              </p>
            )}
            {currentUser.genres.length > 0 &&
              currentUser.genres.map((genre) => <li key={genre}>{genre}</li>)}
          </ul>
        </div>

        <Button type="secondary" onClick={handleUpdatePaymentDetails}>
          Update payment details
        </Button>

        <Button type="secondary" onClick={handleCancelSubscription}>
          Cancel subscription
        </Button>
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

    if (queryClient.getQueryData(['me']))
      return queryClient.getQueryData(['me']);

    const currentUser = await queryClient.fetchQuery({
      queryKey: ['me'],
      queryFn: getCurrentUser,
    });

    return { currentUser, url };
  };
