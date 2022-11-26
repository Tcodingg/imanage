import React, { useState } from 'react';
import Button from '../components/Button/Button';
import CustomSelection from '../components/CustomSelection/CustomSelection';
import {
  employeeStatusList,
  employeeTypeList,
  rolesList,
} from '../helpers/options';

const Edit = () => {
  const selectClass =
    'form-select font-sans capitalize appearance-none block w-full px-3 py-3 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 transition-all ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none';
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedEmployeeType, setSelectedEmployeeType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  return (
    <section className='max-w-4xl m-auto px-6 py-6'>
      <div>
        <div className='flex items-center '>
          <div className='border-4 h-40 w-40 rounded-full mt-3 overflow-hidden'>
            <img src='/assets/images/employee1.png' alt='' />
          </div>
          <div className='flex flex-col ml-6 gap-3'>
            <Button
              label={'change photo'}
              textColor={'text-white'}
              background={'bg-green-500'}
            />
            <Button
              label={'delete'}
              textColor={'text-black'}
              background={'bg-white'}
            />
          </div>
        </div>
        <p className='text-gray-500 mt-5 text-sm'>
          Recommended size is 256 X 256 or leave it blank.
        </p>
      </div>
      <form className='mt-10 flex flex-col gap-6'>
        <FormsContainer>
          <Label label={'name'} />
          <input className='border text-base px-2 py-3  ' type='text' />
        </FormsContainer>

        <CustomSelection
          optionsList={rolesList}
          selectedOption={selectedRole}
          setSelectedOption={setSelectedRole}
          label={'role'}
        />
        <CustomSelection
          optionsList={employeeTypeList}
          selectedOption={selectedEmployeeType}
          setSelectedOption={setSelectedEmployeeType}
          label={'type employee'}
        />
        <CustomSelection
          optionsList={employeeStatusList}
          selectedOption={selectedStatus}
          setSelectedOption={setSelectedStatus}
          label={'status'}
        />

        <FormsContainer>
          <Label label={'salary'} />
          <input
            className='border text-base px-2 py-3 appearance-none'
            type='text'
          />
        </FormsContainer>

        <FormsContainer>
          <Label label={'status'} />
          <select className={selectClass} name='' id=''>
            <Option value={'Active'} />
            <Option value={'Not Active'} />
          </select>
        </FormsContainer>
      </form>
      <div className='mt-10 flex gap-5'>
        <Button label={'save'} background={'bg-white'} width={'w-40'} />
        <Button
          label={'cancel'}
          background={'bg-red-400'}
          width={'w-40'}
          textColor={'text-white'}
        />
      </div>
    </section>
  );
};

export default Edit;

const Label = ({ label, id }) => (
  <label className='text-gray-500 capitalize' htmlFor={id}>
    {label}
  </label>
);

const FormsContainer = ({ children }) => {
  return <div className='flex flex-col gap-2 max-w-[340px]'>{children}</div>;
};

const Option = ({ value }) => (
  <option className='font-sans capitalize' value={value}>
    {value}
  </option>
);
