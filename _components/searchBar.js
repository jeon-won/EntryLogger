'use client';
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const SearchBar = () => {
  const [period, setPeriod] = useState('month1');
  const [searchFilter, setSearchFilter] = useState({
    startDate: new Date(new Date(Date.now()).setMonth(new Date().getMonth() - 1))
      .toISOString().replace('T', ' ').slice(0, 10), // YYYY-MM-DD 형태로 변환
    endDate: new Date(Date.now() + 9 * 60 * 60 * 1000)
      .toISOString().replace('T', ' ').slice(0, 10),
  });

  /* 시작-종료 날짜가 유효한지 검증하는 함수 */
  const isDateValidated = (startDate, endDate) => {
    return new Date(startDate) <= new Date(endDate);
  }

  /* 시작날짜 변경 이벤트 처리 함수 */
  const handleStartDateChange = (e) => {
    setSearchFilter((prev) => ({ ...prev, startDate: e.target.value }));
  }

  /* 종료날짜 변경 이벤트 처리 함수 */
  const handleEndDateChange = (e) => {
    setSearchFilter((prev) => ({ ...prev, endDate: e.target.value }));
  }

  /* 날짜범위(최근 1개월 ~ 1년) 선택 이벤트 처리 함수 */
  const handleSelectChange = (e) => {
    let selectedValue = e.target.value;
    let startDate;
    let endDate = new Date(Date.now() + 9 * 60 * 60 * 1000)
      .toISOString().replace('T', ' ').slice(0, 10);
    switch(selectedValue){
      case 'month1':
        startDate = new Date(new Date(Date.now()).setMonth(new Date().getMonth() - 1))
          .toISOString().replace('T', ' ').slice(0, 10);
        break;
      case 'month3':
        startDate = new Date(new Date(Date.now()).setMonth(new Date().getMonth() - 3))
          .toISOString().replace('T', ' ').slice(0, 10);
        break;
      case 'month6':
        startDate = new Date(new Date(Date.now()).setMonth(new Date().getMonth() - 6))
          .toISOString().replace('T', ' ').slice(0, 10);
        break;
      case 'month12':
        startDate = new Date(new Date(Date.now()).setFullYear(new Date().getFullYear() - 1))
          .toISOString().replace('T', ' ').slice(0, 10);
        break;
      default:
        break;
    }
    setPeriod(selectedValue);
    setSearchFilter((prev) => ({ ...prev, startDate: startDate, endDate: endDate }));
  }

  /* 검색 버튼 클릭 이벤트 처리 함수 */
  const handleSubmit = (e) => {
    e.preventDefault();
    isDateValidated(searchFilter.startDate, searchFilter.endDate) 
      ? null
      : alert('시작일이 종료일보다 늦습니다. 날짜를 다시 선택해주세요.')
    alert(JSON.stringify(searchFilter, null, 2));
  }

  return (
    <Form 
      style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', flexWrap: 'wrap'}} 
      // noValidate validated={isValidated} 
      onSubmit={handleSubmit}>
      <Form.Control
        style={{ width: 'auto' }} 
        type="date"
        max="9999-12-31"
        value={searchFilter.startDate}
        onChange={handleStartDateChange}
      />
      <Form.Control
        style={{ width: 'auto' }} 
        type="date"
        max="9999-12-31"
        value={searchFilter.endDate}
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
}

export default SearchBar;
