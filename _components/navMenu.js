'use client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar } from 'react-bootstrap';

function NavMenu({ title }) {
  return (
    <>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand className="navbar-title" href="/">{title}</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">방문등록</Nav.Link>
            <Nav.Link href="/list">출입이력조회</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavMenu;