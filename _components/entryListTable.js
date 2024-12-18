'use client'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const EntryListTable = (props) => {
  const { data } = props;
  console.log(`props: ${JSON.stringify(data, null, 2)}`)

  const handleClick = (e) => {
    alert(e.target);
  }

  return (
    <>
      {
        data ? (
          <Table striped="columns" bordered hover>
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
                        ? "있다고 가정" 
                        : <Button variant="success" onClick={handleClick}>퇴실처리</Button>
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