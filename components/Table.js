import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployees, sortEmployees } from '../redux/employeesSlice';
import TableData from './TableData';
import TableHeader from './TableHeader';

const Table = ({ search }) => {
  const headers = ['name', 'salary', 'status', 'action'];
  const dispatch = useDispatch();
  const [column, setColumn] = useState();
  const { employees, isLoading, error, order } = useSelector(
    (state) => state.employeesSlice
  );

  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);

  function handleSort(col) {
    dispatch(sortEmployees(col));
    setColumn(col);
  }

  return (
    <section className='relative ml-auto mr-auto max-w-4xl min-h-[calc(100vh - 4rem)] bg-gray-100'>
      <table className='text-left border-collapse border-spacing-0 w-full '>
        <thead className=''>
          <tr className='flex justify-between m-0 px-3 h-[3.5rem]'>
            {headers.map((name, index) => (
              <TableHeader
                key={index}
                title={name}
                index={index}
                col={column}
                order={order}
                handleSort={
                  name !== 'action' ? () => handleSort(name) : () => {}
                }
              />
            ))}
          </tr>
        </thead>
        <tbody
          className='h-[calc(100vh-11.3rem)] overflow-y-scroll block
        '
        >
          {employees
            ?.filter((data) =>
              data.name.toString().toLowerCase().includes(search.toLowerCase())
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
