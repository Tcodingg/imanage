import React from 'react';

const Login = () => {
  return (
    <section className='m-auto max-w-4xl h-[calc(100vh-4rem)] '>
      <div className='flex flex-col items-center justify-center h-full'>
        <h2 className='capitalize font-bold text-3xl'>login</h2>
        <form className='flex flex-col gap-3' action=''>
          <div className='flex flex-col'>
            <label htmlFor='email'>Email:</label>
            <input
              className='border py-3 px-1 outline-none rounded-sm'
              type='email'
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='email'>Password:</label>
            <input
              className='border py-3 px-1 outline-none rounded-sm'
              type='password'
            />
          </div>
          <button className='bg-blue-400 py-3 text-white rounded-sm'>
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
