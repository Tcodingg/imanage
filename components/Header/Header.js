import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { AiOutlineLogin } from 'react-icons/ai';
import { BsEnvelope, BsBell } from 'react-icons/bs';

const Header = () => {
  return (
    <header className=' bg-white h-16'>
      <nav className='max-w-4xl m-auto py-2 flex items-center justify-between'>
        <div className='flex items-center gap-4 text-2xl'>
          <Link href={'/'}>
            <a>
              <Image
                src={'/assets/images/logo.png'}
                width={40}
                height={40}
                alt='abc'
              />
            </a>
          </Link>
          <span className='flex font-semibold tracking-widest'>iManage</span>
        </div>
        <ul className='flex gap-4'>
          <IconContainer icon={<BsBell />} link='/' />
          <div className='relative'>
            <span className='bg-green-500 h-2 w-2 absolute rounded-full top-2 left-1'></span>
            <IconContainer icon={<BsEnvelope />} link='/' />
          </div>
          <IconContainer icon={<AiOutlineLogin link='/' />} />
        </ul>
      </nav>
    </header>
  );
};

export default Header;

const IconContainer = ({ icon, link }) => (
  <li className='text-xl text-gray-400 hover:cursor-pointer font-extralight hover:bg-gray-200 p-2 rounded-md transition-all ease-in duration-300'>
    <Link href={link || '#'}>{icon}</Link>
  </li>
);
