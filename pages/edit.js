import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/Button/Button';
import CustomSelection from '../components/CustomSelection/CustomSelection';
import {
  employeeStatusList,
  employeeTypeList,
  rolesList,
} from '../helpers/options';

import { updateEmployee } from '../redux/employeesSlice';

const Edit = () => {
  const {
    editSlice: { employeeData },
  } = useSelector((state) => state);

  const [name, setName] = useState(employeeData?.name);
  const [id, setId] = useState(employeeData?.id);
  const [selectedRole, setSelectedRole] = useState(employeeData.role);
  const [selectedImage, setSelectedImage] = useState(employeeData?.image);
  const [salary, setSalary] = useState(employeeData?.salary);
  const [selectedEmployeeType, setSelectedEmployeeType] = useState(
    employeeData?.typeEmployee
  );
  const [selectedStatus, setSelectedStatus] = useState(employeeData?.status);
  const [newImage, setNewImage] = useState('');

  const dispatch = useDispatch();
  // console.log(employeeData);

  function handleSave(e) {
    e.preventDefault();
    const formData = new FormData();

    formData.append('id', id);
    formData.append('image', selectedImage);
    formData.append('name', name);
    formData.append('role', selectedRole);
    formData.append('typeEmployee', selectedEmployeeType);
    formData.append('status', selectedStatus);
    formData.append('salary', salary);

    dispatch(updateEmployee({ id, formData }));
  }

  return (
    <section className='max-w-4xl m-auto px-6 py-6'>
      <div>
        <div className='flex items-center '>
          <div className='border-4 h-40 w-40 rounded-full mt-3 overflow-hidden'>
            <img
              src={newImage ? URL.createObjectURL(newImage) : selectedImage}
              alt='employee_image'
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
                  // console.log(e.target.files[0]);
                }}
              />
            </label>
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
          handleClick={handleSave}
          label={'save'}
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

export default Edit;

const Label = ({ label, id }) => (
  <label className='text-gray-500 capitalize' htmlFor={id}>
    {label}
  </label>
);

const FormsContainer = ({ children }) => {
  return <div className='flex flex-col gap-2 max-w-[340px]'>{children}</div>;
};
