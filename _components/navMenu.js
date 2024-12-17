'use client';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavMenu() {
  return (
    <>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand className="navbar-title" href="#home">Entry Logger</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">메뉴 1</Nav.Link>
            <Nav.Link href="#features">메뉴 2</Nav.Link>
            <Nav.Link href="#pricing">메뉴 3</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavMenu;