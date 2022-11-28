import React, { useState } from 'react';
import Button from '../components/Button/Button';
import CustomSelection from '../components/CustomSelection/CustomSelection';
import {
  employeeStatusList,
  employeeTypeList,
  rolesList,
} from '../helpers/options';
import { AiOutlineUpload } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { createEmployee } from '../redux/employeesSlice';

const Create = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedEmployeeType, setSelectedEmployeeType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedSalary, setSelectedSalary] = useState();
  const [selectedName, setSelectedName] = useState('');

  const dispatch = useDispatch();

  async function handleCreate(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', selectedImage);
    formData.append('name', selectedName);
    formData.append('role', selectedRole);
    formData.append('typeEmployee', selectedEmployeeType);
    formData.append('status', selectedStatus);
    formData.append('salary', selectedSalary);
    dispatch(createEmployee(formData));
  }
  console.log(selectedImage);

  return (
    <section className='max-w-4xl m-auto px-6 py-6'>
      <div>
        <div className='flex items-center '>
          <label>
            <input
              onChange={(e) => setSelectedImage(e.target.files[0])}
              className='w-full h-full'
              type='file'
            />
          </label>
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
      <div className='mt-10 flex flex-col gap-6'>
        <FormsContainer>
          <Label label={'name'} />
          <input
            className='border text-base px-2 py-3  '
            type='text'
            onChange={(e) => setSelectedName(e.target.value)}
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
          onChange={(e) => setSelectedStatus(e.target.value)}
        />

        <FormsContainer>
          <Label label={'salary'} />
          <input
            className='border text-base px-2 py-3 appearance-none'
            type='text'
            onChange={(e) => setSelectedSalary(e.target.value)}
          />
        </FormsContainer>
      </div>
      <div className='mt-10 flex gap-5'>
        <Button
          handleClick={handleCreate}
          label={'create'}
          background={'bg-white'}
          width={'w-40'}
        />
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

export default Create;

const Label = ({ label, id }) => (
  <label className='text-gray-500 capitalize' htmlFor={id}>
    {label}
  </label>
);

const FormsContainer = ({ children }) => {
  return <div className='flex flex-col gap-2 max-w-[340px]'>{children}</div>;
};
