import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { AiOutlineLogin } from 'react-icons/ai';
import { BsEnvelope, BsBell } from 'react-icons/bs';

const Header = () => {
  return (
    <header className='max-w-4xl m-auto py-2 flex items-center justify-between'>
      <Link href={'/'} className='flex items-center gap-4 text-2xl'>
        <Image
          src={'/assets/images/logo.png'}
          width={40}
          height={40}
          alt='abc'
        />
        <span className='flex font-semibold tracking-widest'>iManage</span>
      </Link>
      <nav>
        <ul className='flex gap-4'>
          <IconContainer icon={<BsBell />} link='/' />
          <IconContainer icon={<BsEnvelope />} link='#' />
          <IconContainer icon={<AiOutlineLogin link='#' />} />
        </ul>
      </nav>
    </header>
  );
};

export default Header;

const IconContainer = ({ icon, link }) => (
  <li className='text-2xl text-gray-400 hover:cursor-pointer font-extralight hover:bg-gray-200 p-2 rounded-md transition-all ease-in duration-300'>
    <Link href={link || '#'}>{icon}</Link>
  </li>
);
