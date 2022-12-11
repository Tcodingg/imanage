import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/authSlice';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Login = () => {
  const [input, setInput] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const router = useRouter();

  const {
    authSlice: { isAuthenticated },
  } = useSelector((state) => state);

  useEffect(() => {
    if (isAuthenticated) {
      console.log(router.query.from);
      router.push(
        router.query.from ? decodeURIComponent(router.query.from) : '/'
      );
    }
  }, [isAuthenticated]);

  console.log(isAuthenticated);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(input));
  };

  return (
    <section className='m-auto max-w-4xl h-[calc(100vh-4rem)] '>
      <div className='flex flex-col items-center justify-center h-full'>
        <h2 className='capitalize font-bold text-3xl'>login</h2>
        <form className='flex flex-col gap-3' action=''>
          <div className='flex flex-col'>
            <label htmlFor='email'>Email:</label>
            <input
              name='email'
              className='border py-3 px-1 outline-none rounded-sm'
              type='email'
              onChange={handleChange}
              value={input.email}
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='email'>Password:</label>
            <input
              onChange={handleChange}
              value={input.password}
              name='password'
              className='border py-3 px-1 outline-none rounded-sm'
              type='password'
            />
          </div>
          <button
            onClick={handleSubmit}
            className='bg-blue-500 py-3 text-white rounded-sm'
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
