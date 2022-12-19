import { useRouter } from 'next/router';
import React from 'react';
import { useState } from 'react';

const SearchBar = ({ setSearch, search }) => {
  const [input, setInput] = useState();
  const router = useRouter();

  return (
    <div className='flex gap-3 justify-start'>
      <input
        className='px-2 py-3 rounded-md outline-none text-gray-600'
        type='text'
        placeholder='Search By Name'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        onClick={() => router.push('/create')}
        className='px-2 py-3 bg-green-500 text-white rounded-md'
      >
        Add Employee
      </button>
    </div>
  );
};

export default SearchBar;
