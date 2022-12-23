import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';
import Button from './Button';
import CustomSelection from './CustomSelection';
import {
  employeeStatusList,
  employeeTypeList,
  rolesList,
} from '../helpers/options';

import { createEmployee, updateEmployee } from '../redux/employeesSlice';
import Image from 'next/image';

const Form = ({ ...data }) => {
  const {
    action,
    name,
    setName,
    selectedRole,
    setSelectedRole,
    selectedEmployeeType,
    setSelectedEmployeeType,
    selectedStatus,
    setSelectedStatus,
    salary,
    setSalary,
    selectedImage,
    setSelectedImage,
    newImage,
    setNewImage,
    error,
    setError,
    id,
  } = data;

  const dispatch = useDispatch();

  let validInput =
    name && selectedRole && salary && selectedEmployeeType && selectedStatus
      ? true
      : false;

  const router = useRouter();
  function handleClick(e) {
    e.preventDefault();
    if (validInput) {
      const formData = new FormData();

      formData.append('id', id);
      formData.append('image', selectedImage);
      formData.append('name', name);
      formData.append('role', selectedRole);
      formData.append('typeEmployee', selectedEmployeeType);
      formData.append('status', selectedStatus);
      formData.append('salary', salary);

      action !== 'create'
        ? dispatch(updateEmployee({ id, formData }))
        : dispatch(createEmployee(formData));
      router.push('/');
      setError(false);
    } else {
      setError(true);
    }
  }
  console.log(selectedImage);

  return (
    <section className='max-w-4xl m-auto px-6 py-6'>
      <div>
        <div className='flex items-center '>
          <div className='border-4 h-40 w-40 rounded-full mt-3 overflow-hidden'>
            <Image
              priority={true}
              src={
                newImage
                  ? URL.createObjectURL(newImage)
                  : `/assets/images/employees/${selectedImage}`
              }
              alt=''
            />
          </div>
          <div className='flex flex-col ml-6 gap-3'>
            <label
              className='max-w-[200px]'
              htmlFor='
            '
            >
              <input
                className='max-w-[200px]'
                type='file'
                accept='image/png, image/gif, image/jpeg'
                onChange={(e) => {
                  setNewImage(e.target.files[0]);
                  setSelectedImage(e.target.files[0]);
                }}
              />
            </label>
          </div>
        </div>
        <p className='text-gray-500 mt-5 text-sm'>
          Recommended size is 256 X 256 or leave it blank.
        </p>
      </div>
      <form className='mt-10 flex flex-col gap-6'>
        <FormsContainer>
          <Label label={'name'} />
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            className='border text-base px-2 py-3  '
            type='text'
          />
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
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
        </FormsContainer>
      </form>
      <div className='mt-10 flex gap-5'>
        <Button
          handleClick={handleClick}
          label={action === 'create' ? 'create' : 'save'}
          background={'bg-white'}
          width={'w-40'}
        />
        <Button
          handleClick={() => router.push('/')}
          label={'cancel'}
          background={'bg-red-400'}
          width={'w-40'}
          textColor={'text-white'}
        />
      </div>
      {error && (
        <small className='text-red-500 text-center'>
          Please fill out all fields!{' '}
        </small>
      )}
    </section>
  );
};

export default Form;

const Label = ({ label, id }) => (
  <label className='text-gray-500 capitalize' htmlFor={id}>
    {label}
  </label>
);

const FormsContainer = ({ children }) => {
  return <div className='flex flex-col gap-2 max-w-[340px]'>{children}</div>;
};
