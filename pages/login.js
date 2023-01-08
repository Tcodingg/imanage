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
  const [err, setErr] = useState(null);

  const { error } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();
  const router = useRouter();

  let isAuth = localStorage.getItem('isAuth');

  if (isAuth === 'true') {
    router.push(
      router.query.from ? decodeURIComponent(router.query.from) : '/'
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  // useEffect(() => {
  //   if (error) {
  //     setErr(true);
  //     console.log(error);
  //   }
  // }, [err]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(login(input)).then((result) => {
        let status = result.meta.requestStatus;
        if (status !== 'rejected') {
          router.push(
            router.query.from ? decodeURIComponent(router.query.from) : '/'
          );

          localStorage.setItem('isAuth', true);
        }
      });
    } catch (err) {}
    if (error) {
      setErr(true);
      console.log(error);
    }
  };

  return (
    <section className=' h-[calc(100vh-4rem)]  bg-gray-100'>
      <div className='flex flex-col items-center justify-center h-full px-3 max-w-4xl m-auto'>
        <h2 className='capitalize font-bold text-3xl '>login</h2>
        <form
          className='flex flex-col gap-3  w-[100%] md:w-[40%]  relative'
          action=''
        >
          <div className='flex flex-col'>
            <label htmlFor='email'>Email:</label>
            <input
              name='email'
              className='border py-3 px-1 outline-none rounded-sm w-full'
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
              className='border py-3 px-1 outline-none rounded-sm  w-full'
              type='password'
            />
          </div>
          <button
            onClick={handleSubmit}
            className='bg-blue-500 py-3 text-white rounded-sm  w-full'
          >
            Submit
          </button>
          {err && (
            <small className='absolute -bottom-6 text-center w-full bg-red-300'>
              You&apos;ve entered wrong email or password!
            </small>
          )}
        </form>
      </div>
    </section>
  );
};

export default Login;
