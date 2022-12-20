import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployees } from '../../redux/employeesSlice';
import TableData from '../TableData/TableData';

const Table = ({ search }) => {
  const dispatch = useDispatch();
  const { employees, isLoading, error } = useSelector(
    (state) => state.employeesSlice
  );

  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);

  const [data, setData] = useState([...employees]);
  const [order, setOrder] = useState('ascending');

  function handleSort(key) {
    if (order === 'ascending') {
      const sort = [...data].sort((a, b) => (a[key] > b[key] ? 1 : -1));
      setData(sort);
      setOrder('descending');
    }
    if (order === 'descending') {
      const sort = [...data].sort((a, b) => (a[key] < b[key] ? 1 : -1));
      setOrder('ascending');
      setData(sort);
    }
  }

  return (
    <section className='relative ml-auto mr-auto max-w-4xl min-h-[calc(100vh-4rem)] bg-gray-100'>
      <table className='text-left border-collapse border-spacing-0 w-full '>
        <thead className=''>
          <tr className='flex justify-between m-0 px-3 h-[3.5rem]'>
            <TableHeader
              title='employee'
              handleSort={() => handleSort('name')}
            />
            <TableHeader
              title='salary'
              handleSort={() => handleSort('salary')}
            />
            <TableHeader
              title='status'
              handleSort={() => handleSort('status')}
            />
            <TableHeader title='manage' align='text-center' />
          </tr>
        </thead>
        <tbody
          className='h-[calc(100vh-10.5rem)] overflow-y-scroll block
        '
        >
          {data
            ?.filter(({ name }) =>
              name.toString().toLowerCase().includes(search.toLowerCase())
            )
            .map((data) => (
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

function TableHeader({ title, handleSort }) {
  return (
    <th className='flex-1 m-0 hover:cursor-pointer' onClick={handleSort}>
      <p className={'py-5  uppercase text-xs font-medium text-gray-600 '}>
        {title}
      </p>
    </th>
  );
}
