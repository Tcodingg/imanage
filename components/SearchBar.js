import React from 'react';

const SearchBar = () => {
  return (
    <div className='flex gap-3 justify-start'>
      <input
        className='px-2 py-3 rounded-md outline-none text-gray-600'
        type='text'
        placeholder='Search By Name'
      />
      <button className='px-2 py-3 bg-green-500 text-white rounded-md'>
        Add Employee
      </button>
    </div>
  );
};

export default SearchBar;
