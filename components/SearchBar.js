import { useRouter } from 'next/router';
import React from 'react';

const SearchBar = ({ setSearch, search }) => {
  const router = useRouter();

  return (
    <div className='flex gap-3 justify-between sm:justify-start md:min-w-[800px]  mb-5 flex-col md:flex-row'>
      <input
        className='px-2 py-2 rounded-md outline-none text-gray-600 sm:w-auto '
        type='text'
        placeholder='Search By Name'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        onClick={() => router.push('/create')}
        className='px-2 py-2 bg-green-500 text-white rounded-md '
      >
        Add Employee
      </button>
    </div>
  );
};

export default SearchBar;
