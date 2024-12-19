'use client';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import InsertExitTime from '@/_util/insertExitTime';
import { useRouter } from "next/navigation"

const EntryListTable = (props) => {
  const { data } = props;
  const router = useRouter(); // Soft refresh용(바뀐 부분만 새로고침)

  /* 퇴실처리 버튼 클릭 이벤트 처리 함수 */
  const handleExitClick = (id) => {
    const exitDateGmt9 = new Date(Date.now() + 9 * 60 * 60 * 1000)
      .toISOString()
      .replace('T', ' ')
      .slice(0, 19);
    const exitDate = new Date(exitDateGmt9);
    const data = {
      id, exitDate, exitDateGmt9
    }

    InsertExitTime(data);
    router.refresh(); 
  }

  return (
    <>
      {
        data.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr className="centered">
                <th>성명</th>
                <th>소속</th>
                <th>연락처<br/>(뒤4자리)</th>
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
                  <td>{item.lastContact}</td>
                  <td>{item.purpose}</td>
                  <td>{item.entryDateGmt9}</td>
                  <td>{
                    item.exitDateGmt9 
                      ? item.exitDateGmt9
                      : <Button variant="success" size="sm" onClick={() => handleExitClick(item._id)}>퇴실처리</Button>
                    }
                  </td>
                </tr>
              ))
            }</tbody>
          </Table>
        ) : (
          <div className="centered">
            <p>오늘은 출입자가 없습니다...</p>
          </div>
        )
      }
    </>
  );
}

export default EntryListTable;

