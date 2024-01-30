import { Outlet, redirect } from 'react-router-dom';
import Header from './Header';
import { getIsLoggedIn } from '../services/apiUsers';

function AppLayout() {
  return (
    <>
      <Header />
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
