import { RiSearchLine } from 'react-icons/ri';

export default function Search() {
  return (
    <div className='border shadow-sm border-gray-300 bg-white rounded-md text-sm flex items-center justify-between'>
      <input
        type='text'
        placeholder='Search here...'
        className='h-12 indent-2 w-full rounded-md outline-none'
      />
      <span className='flex flex-shrink-0 items-center justify-center text-gray-400 mr-0.5 w-11 h-11 rounded-md bg-gray-200'>
        <RiSearchLine size={22} />
      </span>
    </div>
  );
}
