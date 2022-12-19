import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployees } from '../../redux/employeesSlice';
import TableData from '../TableData/TableData';

const Table = () => {
  const dispatch = useDispatch();
  const { employees, isLoading, error } = useSelector(
    (state) => state.employeesSlice
  );

  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);
  return (
    <section className='relative pt-5 ml-auto mr-auto max-w-4xl min-h-[calc(100vh-4rem)] bg-gray-100'>
      <div className='flex gap-3 justify-start'>
        <input
          className='px-2 py-3 rounded-md outline-none text-gray-600'
          type='text'
          placeholder='Search By Name'
        />
        <button className='px-2 py-3 bg-green-500 text-white rounded-md'>
          Add Employee
        </button>
      </div>
      <table className='text-left border-collapse border-spacing-0 w-full '>
        <thead className=''>
          <tr className='flex justify-between m-0 px-3 h-[3.5rem]'>
            <TableHeader title='employee' />
            <TableHeader title='salary' />
            <TableHeader title='status' />
            <TableHeader title='manage' align='text-center' />
          </tr>
        </thead>
        <tbody
          className='h-[calc(100vh-10.5rem)] overflow-y-scroll block
        '
        >
          {employees?.map((data) => (
            <TableData
              key={data?._id}
              id={data?._id}
              image={data?.image}
              name={data?.name}
              salary={data?.salary}
              status={data?.status}
              role={data?.role}
              typeEmployee={data?.typeEmployee}
            />
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Table;

function TableHeader({ title }) {
  return (
    <th className='flex-1 m-0 '>
      <p className={'py-5  uppercase text-xs font-medium text-gray-600 '}>
        {title}
      </p>
    </th>
  );
}
