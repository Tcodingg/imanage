import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployees } from '../../redux/employeesSlice';
import TableData from '../TableData/TableData';
import TableHeader from '../TableHeader';

const Table = ({ search }) => {
  const headers = ['name', 'salary', 'status', 'action'];
  const dispatch = useDispatch();
  const { employees, isLoading, error } = useSelector(
    (state) => state.employeesSlice
  );

  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);

  const [data, setData] = useState([...employees]);
  const [order, setOrder] = useState('ascending');
  const [column, setColumn] = useState();

  function handleSort(col) {
    if (order === 'ascending') {
      const sort = [...data].sort((a, b) => (a[col] > b[col] ? 1 : -1));
      setData(sort);
      setOrder('descending');
      setColumn(col);
    }
    if (order === 'descending') {
      const sort = [...data].sort((a, b) => (a[col] < b[col] ? 1 : -1));
      setOrder('ascending');
      setData(sort);
      setColumn(col);
    }
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
                handleSort={() => handleSort(name)}
              />
            ))}
          </tr>
        </thead>
        <tbody
          className='h-[calc(100vh-11.3rem)] overflow-y-scroll block
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
