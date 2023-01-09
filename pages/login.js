import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/authSlice';
import { useRouter } from 'next/router';
import { validateEmail, validatePassword } from '../helpers/validation';
const Login = () => {
  const [input, setInput] = useState({
    email: '',
    password: '',
  });
  const [isValid, setIsValid] = useState({
    email: null,
    password: null,
  });

  const { error } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();
  const router = useRouter();
  let isAuth = localStorage.getItem('isAuth');

  if (isAuth === 'true') {
    router.push(
      router.query.from ? decodeURIComponent(router.query.from) : '/'
    );
  }

  useEffect(() => {
    let isValidEmail = validateEmail(input.email.trim());
    let isValidPassword = validatePassword(input.password);

    setIsValid({
      ...isValid,
      password: isValidPassword,
      email: isValidEmail,
    });
  }, [input.email, input.password]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isValid.email && isValid.password) {
      dispatch(login(input));
    }
  };

  return (
    <section className=' h-[calc(100vh-4rem)]  bg-gray-100'>
      <div className='flex flex-col items-center justify-center h-full px-3 max-w-4xl m-auto'>
        <h2 className='capitalize font-bold text-3xl '>login</h2>
        <form
          className='flex flex-col gap-6  w-[100%] md:w-[40%]  relative'
          action=''
        >
          <div className='flex flex-col relative'>
            <label htmlFor='email'>Email:</label>
            <input
              name='email'
              className='border p-3 outline-none rounded-sm w-full'
              type='email'
              onChange={handleChange}
              value={input.email}
            />
            {isValid.email === false && (
              <small className='absolute -bottom-5'>
                {' '}
                Please enter a valid email.
              </small>
            )}
          </div>
          <div className='flex flex-col relative'>
            <label htmlFor='email'>Password:</label>
            <input
              onChange={handleChange}
              value={input.password}
              name='password'
              className='border p-3  outline-none rounded-sm  w-full'
              type='password'
            />
            {isValid.password === false && (
              <small className='absolute -bottom-5'>
                {' '}
                Please enter a valid password.
              </small>
            )}
          </div>
          <button
            onClick={handleSubmit}
            className='bg-blue-500 py-3 text-white rounded-sm  w-full'
          >
            Submit
          </button>
          {error && (
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
