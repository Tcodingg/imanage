import { useRouter } from 'next/router';
import React from 'react';

const SearchBar = ({ setSearch, search }) => {
  const router = useRouter();

  return (
    <div className='flex gap-3 justify-start min-w-[800px] w-full'>
      <input
        className='px-2 py-2 rounded-md outline-none text-gray-600'
        type='text'
        placeholder='Search By Name'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        onClick={() => router.push('/create')}
        className='px-2 py-2 bg-green-500 text-white rounded-md'
      >
        Add Employee
      </button>
    </div>
  );
};

export default SearchBar;
