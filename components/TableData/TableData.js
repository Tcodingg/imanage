import Image from 'next/image';
import React from 'react';
import { RiDeleteBinLine, RiEdit2Line } from 'react-icons/ri';

const TableData = ({ image, name, salary, status }) => {
  let salaryInDollars = salary?.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  });

  let altImage;
  if (!image) {
    altImage = name?.substring(0, 1).toUpperCase();
  }

  return (
    <tr className='flex bg-white py-3 rounded-md mb-5 w-full px-3'>
      <td className='flex gap-3 w-1/4 '>
        <div className=' justify-center items-center flex w-[50px] h-[50px] border rounded-full'>
          {image ? (
            <Image
              className='rounded-full justify-center items-center border-2'
              src={image}
              width={50}
              height={50}
              alt={''}
            />
          ) : (
            altImage
          )}
        </div>
        <div>
          <p className='capitalize text-sm text-gray-900 font-semibold '>
            {name}
          </p>
          <p className='capitalize text-xs text-gray-500'>software engineer</p>
        </div>
      </td>

      <td className='w-1/4 '>
        <p className=''>{salaryInDollars}</p>
        <p className='text-gray-400 capitalize text-xs'>full time</p>
      </td>

      <td className='w-1/4 '>
        <p>{status}</p>
      </td>

      <td className='w-1/4 flex  gap-5 '>
        <Button icon={<RiEdit2Line />} />
        <Button icon={<RiDeleteBinLine />} />
      </td>
    </tr>
  );
};

export default TableData;

const Button = ({ icon }) => (
  <button className='text-2xl text-gray-400'>{icon}</button>
);
