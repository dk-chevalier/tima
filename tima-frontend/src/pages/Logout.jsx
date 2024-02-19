import { redirect } from 'react-router-dom';
import { logout } from '../services/apiUsers';
import CustomToast from '../ui/CustomToast';
import toast from 'react-hot-toast';

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
    queryClient.clear();
    toast.custom((t) => {
      t.duration = 3000;
      return (
        <CustomToast onClick={() => toast.remove(t.id)} type="success" t={t}>
          Logged out successfully
        </CustomToast>
      );
    });

    return redirect('/login');
  }

  // Failure logging out
  toast.custom((t) => {
    t.duration = 5000;
    return (
      <CustomToast onClick={() => toast.remove(t.id)} type="error" t={t}>
        Failed to log out, please try again
      </CustomToast>
    );
  });
  return redirect('/app/account');
};
