"use client";
import selectDocument from '@/_util/selectDocument';
import EntryListTable from '@/_components/entryListTable';
import SearchBar from '@/_components/searchBar';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

const List = () => {
  const [query, setQuery] = useState({
    startDate: new Date(new Date(Date.now()).setMonth(new Date().getMonth() - 1))
      .toISOString().slice(0, 10), // YYYY-MM-DD 형태로 변환
    endDate: new Date(Date.now() + 9 * 60 * 60 * 1000)
      .toISOString().slice(0, 10),
  });
  const [data, setData] = useState();

  /* 컴포넌트 최초 렌더링 또는 query 변경 시: DB 데이터 가져옴 */
  useEffect(() => {
    const fetchData = async () => {
      const result = await selectDocument(query);
      setData(result);
    };
    fetchData();
  }, [query]);

  /* 자식(검색) 컴포넌트가 부모 컴포넌트의 State(검색조건) 값을 변경하기 위한 함수 */
  const handleQueryChange = async (query) => {
    setQuery(query);
  };

  return (
    <Container className="mt-3">
      {/* 검색 컴포넌트는 handleQueryChange 함수를 사용하여 검색조건을 query State에 저장 */}
      <SearchBar handleQueryChange={handleQueryChange} />
      {/* DB 데이터를 테이블 컴포넌트에 전달 */}
      <EntryListTable result={data} />
    </Container>
  );
};

export default List;
