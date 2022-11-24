import React from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';

const Edit = () => {
  return (
    <section className='max-w-4xl m-auto px-6'>
      <h3 className='capitalize font-medium pt-6'>Edit Profile</h3>
      <div>
        <div className='flex items-center '>
          <div className='border-4 h-40 w-40 rounded-full mt-3 overflow-hidden'>
            <img src='/assets/images/employee1.png' alt='' />
          </div>
          <div className='flex flex-col ml-6 gap-3'>
            <button className='w-40 text-center border p-3 bg-green-500 text-white rounded-md'>
              Change Photo
            </button>
            <button
              className='border p-3 w-40 text-center flex justify-center items-center
            gap-4'
            >
              <span className='text-red-600 text-lg'>
                <RiDeleteBinLine />
              </span>
              Delete
            </button>
          </div>
        </div>
        <p className='text-gray-500 mt-2 text-sm'>
          Recommended size is 256 X 256 or leave it blank.
        </p>
      </div>
      <form className='mt-10 flex flex-col'>
        <Label label={'name'} />
        <input
          className='border text-base px-2 py-3 max-w-[340px] '
          type='text'
        />
      </form>
    </section>
  );
};

export default Edit;

const Label = ({ label, id }) => (
  <label className='text-gray-500 capitalize pb-1' htmlFor={id}>
    {label}
  </label>
);
