import Image from 'next/image';
import React from 'react';
import { RiDeleteBinLine, RiEdit2Line } from 'react-icons/ri';
import TableData from '../TableData/TableData';

const Table = () => {
  return (
    <section className='mt-5 ml-auto mr-auto overflow-auto min-h-[366px] max-w-4xl bg-gray-100'>
      <table className='text-left  border-collapse border-spacing-0 w-full '>
        <thead className=''>
          <tr className='flex justify-between m-0 px-3'>
            <TableHeader title='employee' />
            <TableHeader title='salary' />
            <TableHeader title='status' />
            <TableHeader title='manage' align='text-center' />
          </tr>
        </thead>
        <tbody>
          <TableData
            image={''}
            name={'john doe'}
            salary={300000}
            status={'active'}
          />
          <TableData
            image={'/assets/images/employee1.png'}
            name={'john doe'}
            salary={300000}
            status={'active'}
          />
          <TableData
            image={'/assets/images/employee1.png'}
            name={'john doe'}
            salary={300000}
            status={'active'}
          />
          <TableData
            image={'/assets/images/employee1.png'}
            name={'john doe'}
            salary={300000}
            status={'active'}
          />
          <TableData
            image={'/assets/images/employee1.png'}
            name={'john doe'}
            salary={300000}
            status={'active'}
          />
          <TableData
            image={'/assets/images/employee1.png'}
            name={'john doe'}
            salary={300000}
            status={'active'}
          />
          <TableData
            image={'/assets/images/employee1.png'}
            name={'john doe'}
            salary={300000}
            status={'active'}
          />
          <TableData
            image={'/assets/images/employee1.png'}
            name={'john doe'}
            salary={300000}
            status={'active'}
          />
          <TableData
            image={'/assets/images/employee1.png'}
            name={'john doe'}
            salary={300000}
            status={'active'}
          />
          <TableData
            image={'/assets/images/employee1.png'}
            name={'john doe'}
            salary={300000}
            status={'active'}
          />
          <TableData
            image={'/assets/images/employee1.png'}
            name={'john doe'}
            salary={300000}
            status={'active'}
          />
        </tbody>
      </table>
    </section>
  );
};

export default Table;

function TableHeader({ title }) {
  return (
    <th className='flex-1 m-0 '>
      <p className={'py-5  uppercase text-xs font-medium text-gray-600 '}>
        {title}
      </p>
    </th>
  );
}
