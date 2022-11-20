import Image from 'next/image';
import React from 'react';
import { RiDeleteBinLine, RiEdit2Line } from 'react-icons/ri';

const TableData = () => {
  return (
    <tr className='flex bg-white py-3 rounded-md mb-5 w-full px-3'>
      <td className='flex gap-3 w-1/4 '>
        <Image
          className='rounded-full'
          src={'/assets/images/employee1.png'}
          width={40}
          height={40}
        />
        <div>
          <p className='capitalize text-sm text-gray-900 font-semibold '>
            john doe
          </p>
          <p className='capitalize text-xs text-gray-500'>software engineer</p>
        </div>
      </td>

      <td className='w-1/4 '>
        <p className=''>$300,000</p>
        <p className='text-gray-400 capitalize text-xs'>full time</p>
      </td>

      <td className='w-1/4 '>
        <p>Active</p>
      </td>

      <td className='w-1/4 flex  gap-5 text-gray-600'>
        <Button icon={<RiEdit2Line />} />
        <Button icon={<RiDeleteBinLine />} />
      </td>
    </tr>
  );
};

export default TableData;

const Button = ({ icon }) => <button className='text-xl'>{icon}</button>;
