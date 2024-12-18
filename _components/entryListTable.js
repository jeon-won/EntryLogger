'use client'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const EntryListTable = (props) => {
  const { data } = props;

  const handleClick = (e, id) => {
    alert(id);
    // TODO: 대충 id 값을 사용하여 퇴실시간 추가하는 코드 작성.
    // 클라이언트 컴포넌트라 fetch Ajax(Fetch) 사용해야 할 듯.
  }

  return (
    <>
      {
        data ? (
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
            <tbody>
              {
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
                        : <Button variant="success" onClick={(e) => handleClick(e, item._id)}>퇴실처리</Button>
                      }
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        ) : (
          <div>
            "오늘은 출입자가 없습니다..."
          </div>
        )
      }
    </>
  );
}

export default EntryListTable;

