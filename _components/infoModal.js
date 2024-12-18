// React Bootstrap Modal 사용법 참고: https://react-bootstrap.netlify.app/docs/components/modal

import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const InfoModal = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="link" onClick={handleShow}>
        개인정보 수집 및 이용에 대한 안내
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>개인정보 수집 및 이용에 대한 안내</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <ol>
              <li><b>수집항목:</b> 성명, 생년월일, 소속 및 연락처</li>
              <li><b>이용목적:</b> 전산실 출입 이력관리 및 비상연락 등</li>
              <li><b>이용 및 보유 기간:</b> 수집일로부터 1년</li>
              <li>
                <b>개인정보 제공 등의 거부 권리 및 동의 거부에 따른 불이익 내용 또는 제한사항</b>
                <ul>
                  <li>귀하는 개인정보의 제공을 거부할 권리가 있습니다.</li>
                  <li>다만 개인정보를 제공하지 않을 시 전산실 출입 또는 콘솔룸 PC 사용이 불가합니다.</li>
                </ul>
              </li>
            </ol>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary">Understood</Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default InfoModal;