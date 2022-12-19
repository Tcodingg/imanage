import SearchBar from '../components/SearchBar';
import Table from '../components/Table/Table';

export default function Home() {
  return (
    <div className='bg-gray-100'>
      <div className='m-auto max-w-4xl px-3 pt-5'>
        <SearchBar />
        <Table />
      </div>
    </div>
  );
}
