import React from 'react';
import { HiOutlineSortAscending } from 'react-icons/hi';
function TableHeader({ title, handleSort, order, col }) {
  return (
    <th
      // className={ 'flex-1 m-0 w-1/4 ' }
      className='min-w-[200px]'
    >
      <div
        onClick={handleSort}
        className={`w-full ${
          title !== 'action' ? 'hover:cursor-pointer' : ''
        } flex gap-3`}
      >
        <p
          className='font-medium text-gray-600 uppercase'
          // className={
          //   'py-5 flex items-center gap-4 uppercase text-xs font-medium text-gray-600 text-left'
          // }
        >
          {title}
        </p>
        <span
          className={`text-lg mt-1 ${
            col === title ? 'text-gray-800' : 'text-gray-400'
          } ${col === title && order === 'descending' ? 'rotate-180' : ''}`}
        >
          {title !== 'action' && <HiOutlineSortAscending />}
        </span>
      </div>
    </th>
  );
}

export default React.memo(TableHeader);
