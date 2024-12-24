"use client";
import { Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import Link from "next/link";

const EntryListTable = ({ result }) => {
  const [data, setData] = useState();

  /* result 값 변경 시 컴포넌트 재렌더링 */
  useEffect(() => {
    setData(result);
  }, [result]);

  return (
    <>{
      data ? (
        <Table striped bordered hover>
          <thead>
            <tr className="centered">
              <th>성명</th>
              <th>소속</th>
              <th>연락처</th>
              <th>방문목적</th>
              <th>입실시간</th>
              <th>퇴실시간</th>
            </tr>
          </thead>
          <tbody>{
            data.map((item, index) => (
              <tr key={index} className="centered">
                <td>{item.name}</td>
                <td>{item.affiliation}</td>
                <td><Link href={`tel:${item.contact}`}>{item.contact}</Link></td>
                <td>{item.purpose}</td>
                <td>{item.entryDateGmt9}</td>
                <td>{item.exitDateGmt9}</td>
              </tr>
            ))
          }</tbody>
        </Table>
      ) : (
        <div className="text-center">
          <p>해당 기간에 출입 내역이 없어요... 😑</p>
        </div>
      )
    }</>
  );
};

export default EntryListTable;
