import { HiXMark } from 'react-icons/hi2';

function CustomToast({ children, onClick, type, t }) {
  console.log(t);
  if (type === 'error') {
    return (
      <div
        className={`${
          t.visible ? 'animate-slideInTop' : 'animate-slideOutTop'
        } relative max-w-96 rounded-md bg-red-500 px-5 py-3 text-center text-sm font-bold text-primary-100 shadow-md`}
      >
        {children}
        <button
          onClick={onClick}
          className="text-md absolute right-1 top-1 font-semibold"
        >
          <HiXMark />
        </button>
      </div>
    );
  }

  if (type === 'success') {
    return (
      <div
        className={`${
          t.visible ? 'animate-slideInTop' : 'animate-slideOutTop'
        } relative max-w-96 rounded-md bg-green-500 px-5 py-3 text-center text-sm font-bold text-primary-100 shadow-md`}
      >
        {children}
        <button
          onClick={onClick}
          className="text-md absolute right-1 top-1 font-semibold"
        >
          <HiXMark />
        </button>
      </div>
    );
  }
}

export default CustomToast;
