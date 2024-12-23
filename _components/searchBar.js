'use client';
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const SearchBar = ({ handleQueryChange }) => {
  /* State */
  const [period, setPeriod] = useState('month1');
  const [query, setQuery] = useState({
    startDate: new Date(new Date(Date.now()).setMonth(new Date().getMonth() - 1))
      .toISOString().slice(0, 10),
    endDate: new Date(Date.now() + 9 * 60 * 60 * 1000)
      .toISOString().slice(0, 10),
  });

  /* 날짜 유효 범위 검증용 함수 */
  const isDateValidated = (startDate, endDate) => {
    return new Date(startDate) <= new Date(endDate);
  };

  /* 시작일 변경 이벤트 처리 함수 */
  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value
    setQuery((prev) => ({ ...prev, startDate: newStartDate }));
  };

  /* 종료일 변경 이벤트 처리 함수 */
  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value
    setQuery((prev) => ({ ...prev, endDate: newEndDate }));
  };

  /* 기간 선택 변경 이벤트 처리 함수 */
  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    let startDate;
    const endDate = new Date(Date.now() + 9 * 60 * 60 * 1000)
      .toISOString().slice(0, 10);
    switch (selectedValue) {
      case 'month1':
        startDate = new Date(new Date(Date.now()).setMonth(new Date().getMonth() - 1))
          .toISOString().slice(0, 10);
        break;
      case 'month3':
        startDate = new Date(new Date(Date.now()).setMonth(new Date().getMonth() - 3))
          .toISOString().slice(0, 10);
        break;
      case 'month6':
        startDate = new Date(new Date(Date.now()).setMonth(new Date().getMonth() - 6))
          .toISOString().slice(0, 10);
        break;
      case 'month12':
        startDate = new Date(new Date(Date.now()).setFullYear(new Date().getFullYear() - 1))
          .toISOString().slice(0, 10);
        break;
      default:
        break;
    }
    setPeriod(selectedValue);
    setQuery({ startDate, endDate });
  };

  /* 검색 버튼 클릭 이벤트 처리 함수 */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isDateValidated(query.startDate, query.endDate)) {
      alert('시작일이 종료일보다 늦습니다. 날짜를 다시 선택해주세요.');
      return;
    }
    handleQueryChange(query);
  };

  return (
    <Form 
      style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', flexWrap: 'wrap' }} 
      onSubmit={handleSubmit}>
      <Form.Control
        style={{ width: 'auto' }} 
        type="date"
        max="9999-12-31"
        value={query.startDate}
        onChange={handleStartDateChange}
      />
      <Form.Control
        style={{ width: 'auto' }} 
        type="date"
        max="9999-12-31"
        value={query.endDate}
        onChange={handleEndDateChange}
      />
      <Form.Select 
        style={{ width: 'auto' }} 
        aria-label="Default select example"
        value={period}
        onChange={handleSelectChange}>
        <option value="month1">최근 1개월</option>
        <option value="month3">최근 3개월</option>
        <option value="month6">최근 6개월</option>
        <option value="month12">최근 1년</option>
      </Form.Select>
      <Button variant="primary" type="submit">검색</Button>
    </Form>
  );
};

export default SearchBar;
