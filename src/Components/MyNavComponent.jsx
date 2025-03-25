import React from "react"
import { Button, Container, Form, Nav, Navbar, NavDropdown} from 'react-bootstrap';

export default function MyNavComponent() {
  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark">
    <Container >
      <Navbar.Brand href="#">Epi Books</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="me-auto my-4 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
          <Nav.Link href="#action1">Home</Nav.Link>
          <Nav.Link href="#action2">About</Nav.Link>
          <Nav.Link href="#action3">Browse</Nav.Link>
          <NavDropdown title="Generi Letterari" id="navbarScrollingDropdown">
            <NavDropdown.Item href="#action4">Fantasy</NavDropdown.Item>
            <NavDropdown.Item href="#action5">Romance</NavDropdown.Item>
            <NavDropdown.Item href="#action6">History</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action7">Horror</NavDropdown.Item>
            <NavDropdown.Item href="#action8">Scifi</NavDropdown.Item>
          </NavDropdown>
          
        </Nav>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="success">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}