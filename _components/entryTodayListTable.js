'use client';
import 'bootstrap/dist/css/bootstrap.min.css';
import InsertExitTime from '@/_util/insertExitTime';
import { Table, Button } from 'react-bootstrap';
import { useRouter } from "next/navigation"

const EntryTodayListTable = ({ data }) => {
  /* 변수 */
  const router = useRouter(); // 컴포넌트의 바뀐 부분만 새로고침용(Soft refresh)

  /* 퇴실처리 버튼 클릭 이벤트 처리 함수 */
  const handleExitClick = (id) => {
    // 퇴실시간을 현재시간으로 지정
    const exitDateGmt9 = new Date(Date.now() + 9 * 60 * 60 * 1000)
      .toISOString().replace('T', ' ').slice(0, 19); // YYYY-MM-DD HH:mm:ss 형식의 GMT+9 기준 시간
    const exitDate = new Date(exitDateGmt9);
    const data = { id, exitDateGmt9, exitDate };
    
    // 퇴실시간을 DB에 저장한 후 컴포넌트 재랜더링을 위해 Soft refresh
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
                <tr key={index} className="text-xl">
                  <td>{item.name}</td>
                  <td>{item.affiliation}</td>
                  <td>{item.lastContact}</td>
                  <td>{item.purpose}</td>
                  <td>{item.entryDateGmt9}</td>
                  <td>{
                    item.exitDateGmt9 
                      ? item.exitDateGmt9
                      : <Button 
                          variant="success" 
                          size="sm" 
                          onClick={() => handleExitClick(item._id)}
                        >퇴실처리</Button>
                    }
                  </td>
                </tr>
              ))
            }</tbody>
          </Table>
        ) : (
          <div className="text-center">
            <p>오늘은 출입자가 없어요... 😑</p>
          </div>
        )
      }
    </>
  );
}

export default EntryTodayListTable;

