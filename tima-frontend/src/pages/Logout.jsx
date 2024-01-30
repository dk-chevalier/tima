import { redirect } from 'react-router-dom';
import { logout } from '../services/apiUsers';

function Logout() {
  return <div>Logout</div>;
}

export default Logout;

export const loader = (queryClient) => async () => {
  const status = await queryClient.fetchQuery({
    queryKey: ['logout'],
    queryFn: logout,
  });

  if (status === 'success') {
    queryClient.removeQueries({ queryKey: ['isLoggedIn'] });
    queryClient.removeQueries({ queryKey: ['me'] });
    return redirect('/login');
  }
  return redirect('/app/account');
};
