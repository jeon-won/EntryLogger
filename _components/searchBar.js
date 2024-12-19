'use client';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

const Searchbar = () => {
  const [period, setPeriod] = useState('month1');
  const [searchFilter, setSearchFilter] = useState({
    startDate: new Date(new Date(Date.now()).setMonth(new Date().getMonth() - 1))
    .toISOString().replace('T', ' ').slice(0, 10), // YYYY-MM-DD;
    endDate: new Date(Date.now() + 9 * 60 * 60 * 1000)
      .toISOString().replace('T', ' ').slice(0, 10), // YYYY-MM-DD
  });

  const handleSelectChange = (e) => {
    setPeriod(e.target.value);
    console.log(period);
  }

  const handleStartDateChange = (e) => {
    setSearchFilter((prev) => ({ ...prev, startDate: e.target.value }));
    console.log(searchFilter.startDate);
  }

  const handleEndDateChange = (e) => {
    setSearchFilter((prev) => ({ ...prev, endDate: e.target.value }));
    console.log(searchFilter.endDate);
  }

  return (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
      <Form.Select 
        style={{ width: 'auto' }} 
        aria-label="Default select example"
        value={period}
        onChange={handleSelectChange}>
        <option value="month1">최근 1개월</option>
        <option value="month3">최근 3개월</option>
        <option value="month6">최근 6개월</option>
        <option value="year1">최근 1년</option>
      </Form.Select>
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
    </div>
  );
}

export default Searchbar;
