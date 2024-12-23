"use client";
import EntryListTable from '@/_components/entryListTable';
import SearchBar from '@/_components/searchBar';
import { useState } from 'react';
import { Container } from 'react-bootstrap';

const List = () => {
  const [query, setQuery] = useState({
    startDate: new Date(new Date(Date.now()).setMonth(new Date().getMonth() - 1))
      .toISOString().replace('T', ' ').slice(0, 10), // YYYY-MM-DD 형태로 변환
    endDate: new Date(Date.now() + 9 * 60 * 60 * 1000)
      .toISOString().replace('T', ' ').slice(0, 10),
  });
  const [data, setData] = useState();

  const handleQueryChange = (query) => {
    setQuery(query);
    console.log(`query: ${JSON.stringify(query)}`);
  }

  return (
    <Container className="mt-3">
      <SearchBar handleQueryChange={handleQueryChange}/>
      <EntryListTable/>
    </Container>
  ) 
}

export default List;