'use client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect, useRef } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import InfoModal from './infoModal';

const EntryForm = () => {
  /* State 및 Ref */
  const [formData, setFormData] = useState({
    purpose: '',      // 방문목적
    name: '',         // 성명
    dob: '',          // 생년월일
    affiliation: '',  // 소속
    contact: '',      // 연락처
    // entryDate: '', // 입실일은 즉시 반영 이슈 때문에 별도 객체로 만들어 쓸 예정
  });
  const [isValidated, setIsValidated] = useState(false); // 폼 입력정보 유효성 검증용 State
  const [isChecked, setIsChecked] = useState(false);     // 정보제공 동의 체크용 State
  const focusRef = useRef(null);                         // 폼 입력 포커스용 Ref

  /* 컴포넌트 렌더링 후 첫번째 입력 폼에 포커스 맞춤 */
  useEffect(() => {
    if(focusRef.current){
      focusRef.current.focus();
    }
  }, []);

  /* 날짜 유효성 검증 */
  const isValidDate = (dateString) => {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
  };

  /* 연락처 입력 이벤트 처리 함수 */
  const handleContactChange = (e) => {
    const value = e.target.value;
    const contact = value.replace(/[^0-9]/g, ""); // 숫자만 입력받게 함
    setFormData((prev) => ({ ...prev, contact }));
  };

  /* 생년월일 입력 이벤트 처리 함수 */
  const handleDobChange = (e) => {
    const value = e.target.value;
    const dob = value
      .replace(/[^0-9]/g, "")       // 숫자만 입력받게 하고
      .replace(/(\d{4})(\d{2})?(\d{2})?/, (match, p1, p2, p3) => {
        if (!p2) return p1;
        if (!p3) return `${p1}-${p2}`;
        return `${p1}-${p2}-${p3}`; // YYYY-MM-DD 형식으로 변환함
      });
    setFormData((prev) => ({ ...prev, dob }));
  }

  /* 그 외 입력 이벤트 처리 함수: 입력 값 그대로 State에 저장 */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  /* 정보 제공 동의여부 체크 이벤트 처리 함수 */
  const handleCheck = (e) => {
    setIsChecked(e.target.checked);
  }

  /* 등록 버튼 이벤트 처리 함수 */
  const handleSubmit = async (e) => {
    // 입력 값이 유효하지 않으면 경고
    const form = e.currentTarget;
    if (form.checkValidity() === false || !isChecked || !isValidDate(formData.dob)) {
      e.preventDefault();
      e.stopPropagation();
      alert('정확하게 입력했는지 확인좀요...');
      return;
    }

    // 입력값이 유효하면 POST 요청 보내고
    e.preventDefault()
    await fetch("/api/insert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({...formData, entryDate: new Date(Date.now() + 9 * 60 * 60 * 1000)
        .toISOString()
        .replace('T', ' ')
        .slice(0, 19)
      })
    });

    // State 초기화 및
    setIsValidated(false);
    setIsChecked(false);
    setFormData({
      purpose: '',
      name: '',
      dob: '',
      affiliation: '',
      contact: '',
    });

    // 첫번째 입력 폼에 포커스
    focusRef.current.focus();
  }

  return (
    <Container className="mt-2">
      <Form noValidate validated={isValidated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="formPurpose">
            <Form.Label className="form-label">1. 방문목적</Form.Label>
            <Form.Control 
              type="text"
              name="purpose"
              placeholder="예: OO시스템 점검"
              value={formData.purpose}
              onChange={handleChange}
              ref={focusRef}
              required
            />
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="formName">
            <Form.Label>2. 성명</Form.Label>
            <Form.Control 
              type="text"
              name="name"
              placeholder="예: 김OO"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="formDob">
            <Form.Label>3. 생년월일</Form.Label>
            <Form.Control 
              type="text"
              maxLength={10}
              name="dob"
              placeholder="예: 1990-12-31"
              value={formData.dob}
              onChange={handleDobChange}
              required
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="formAffiliation">
            <Form.Label>4. 소속</Form.Label>
            <Form.Control 
              type="text"
              name="affiliation"
              placeholder="예: OO시스템"
              value={formData.affiliation}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="formContact">
            <Form.Label>5. 연락처</Form.Label>
            <Form.Control 
              type="text"
              maxLength={12}
              name="contact"
              placeholder="예: 01012345678, 021234567"
              value={formData.contact}
              onChange={handleContactChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="formDob">
          <Form.Label>&nbsp;</Form.Label>
            <div className="d-grid gap-2">
              <Button type="submit" variant="primary">등록</Button>
            </div>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="8" controlId="formCheckbox" className="mb-3">
            <Form.Check
              type="checkbox"
              label="사전에 전산실 출입 신청서 및 보안서약서를 제출하였으며, 위의 정보를 제공하는 것에 동의합니다."
              checked={isChecked}
              onChange={handleCheck}
              required
            />
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="" className="mb-3">
            <div style={{ textAlign: 'center' }}>
              <InfoModal/>
            </div>
          </Form.Group>
        </Row>
      </Form>
    </Container>
  );
}

export default EntryForm;