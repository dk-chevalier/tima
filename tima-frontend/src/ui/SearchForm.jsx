import { HiXMark } from 'react-icons/hi2';
import Button from './Button';

function SearchForm({ onClick }) {
  return (
    <div className="w-m absolute left-[2.5%] top-[2.5%] z-50 h-[95%] w-[95%] rounded-md border border-secondary-300 bg-primary-100 shadow-lg">
      <div className="absolute right-4 top-4">
        <Button type="close" onClick={onClick}>
          <HiXMark />
        </Button>
      </div>
      SEARCH
    </div>
  );
}

export default SearchForm;
