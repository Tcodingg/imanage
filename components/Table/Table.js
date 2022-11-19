import React from 'react';

const Table = () => {
  return (
    <section className='mt-5 ml-auto mr-auto overflow-auto min-h-[366px] max-w-4xl bg-gray-100'>
      <table className='text-left  border-collapse border-spacing-0 w-full '>
        <thead className='flex justify-between'>
          <TableHeader title='employee' />
          <TableHeader title='salary' />
          <TableHeader title='status' />
          <TableHeader title='manage' align='text-center' />
        </thead>
      </table>
    </section>
  );
};

export default Table;

function TableHeader({ title }) {
  return (
    <th className='flex-1'>
      <p className={'p-2 uppercase text-xs font-medium text-gray-600'}>
        {title}
      </p>
    </th>
  );
}
