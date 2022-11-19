import Image from 'next/image';
import React from 'react';
import { AiOutlineLogin } from 'react-icons/ai';

const Header = () => {
  return (
    <header className='max-w-4xl m-auto py-2 flex items-center justify-between'>
      <div className='flex items-center gap-3 text-2xl'>
        <Image
          src={'/assets/images/logo.png'}
          width={40}
          height={40}
          alt='abc'
        />
        <span className='flex font-semibold tracking-widest'>iManage</span>
      </div>
      <nav>
        <ul>
          <Icons child={<AiOutlineLogin />} />
        </ul>
      </nav>
    </header>
  );
};

export default Header;

const Icons = ({ child }) => (
  <li className='text-2xl text-gray-400 hover:cursor-pointer hover:bg-gray-200 p-1 rounded-md transition-all ease-in-out duration-300'>
    {child}
  </li>
);
