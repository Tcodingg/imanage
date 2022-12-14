import React, { useState } from 'react';
import Form from '../components/Form';

const Create = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedEmployeeType, setSelectedEmployeeType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [salary, setSalary] = useState();
  const [name, setName] = useState('');
  const [newImage, setNewImage] = useState('');
  const [error, setError] = useState(null);

  let data = {
    action: 'create',
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
  };

  return <Form {...data} />;
};

export default Create;
