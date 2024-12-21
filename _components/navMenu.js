'use client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar } from 'react-bootstrap';

function NavMenu() {
  return (
    <>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand className="navbar-title" href="/">Entry Logger</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/list">출입이력조회</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavMenu;