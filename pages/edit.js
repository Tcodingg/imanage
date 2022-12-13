import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Form from '../components/Form';

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
  const [error, setError] = useState(null);

  let data = {
    action: 'edit',
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
  };

  return <Form {...data} />;
};

export default Edit;
