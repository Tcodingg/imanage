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

  return (
    <Form
      action={'create'}
      name={name}
      setName={setName}
      selectedRole={selectedRole}
      setSelectedRole={setSelectedRole}
      selectedEmployeeType={selectedEmployeeType}
      setSelectedEmployeeType={setSelectedEmployeeType}
      selectedStatus={selectedStatus}
      setSelectedStatus={setSelectedStatus}
      salary={salary}
      setSalary={setSalary}
      selectedImage={selectedImage}
      setSelectedImage={setSelectedImage}
      newImage={newImage}
      setNewImage={setNewImage}
      error={error}
      setError={setError}
    />
  );
};

export default Create;
