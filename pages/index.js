import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import Table from '../components/Table/Table';

export default function Home() {
  const [search, setSearch] = useState('');
  return (
    <div className='bg-gray-100'>
      <div className='m-auto max-w-4xl px-3 pt-5'>
        <SearchBar search={search} setSearch={setSearch} />
        <Table search={search} />
      </div>
    </div>
  );
}
