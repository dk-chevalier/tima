import { redirect, useLoaderData } from 'react-router-dom';
import { getCurrentUser, getIsLoggedIn } from '../services/apiUsers';

function Account() {
  const { data: currentUser } = useLoaderData();
  console.log(currentUser);

  return (
    <div className="h-screen w-screen bg-primary-900 p-12">
      <div className="h-full w-full rounded-lg bg-primary-100 p-5">
        <h2 className="text-end text-3xl font-thin">
          Welcome back {currentUser.name.split(' ')[0]}
        </h2>

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
            {currentUser.genres.length &&
              currentUser.genres.map((genre) => <li key={genre}>{genre}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Account;

export const loader = (queryClient) => async () => {
  const { isLoggedIn } = await queryClient.fetchQuery({
    queryKey: ['isLoggedIn'],
    queryFn: getIsLoggedIn,
  });

  if (!isLoggedIn) throw redirect('/login');

  if (queryClient.getQueryData(['me'])) return queryClient.getQueryData(['me']);

  const currentUser = await queryClient.fetchQuery({
    queryKey: ['me'],
    queryFn: getCurrentUser,
  });

  return currentUser;
};
