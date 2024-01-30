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
    queryClient.invalidateQueries({ queryKey: ['isLoggedIn'] });
    return redirect('/login');
  }
  return redirect('/app/account');
};
