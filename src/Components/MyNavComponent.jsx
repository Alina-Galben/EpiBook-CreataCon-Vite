import React from "react";
import { Button, Container, Form, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import { useTheme } from "../hooks/useTheme";


export default function MyNavComponent({ searchTerm, setSearchTerm, onGenreSelect }) {
  const { theme, toggleTheme } = useTheme();
  return (
    <Navbar bg={theme === "dark" ? "dark" : "light"} variant={theme} expand="lg" fixed="top">
    <Container >
      <Navbar.Brand href="#">Epi Books</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav className="me-auto my-4 my-lg-0" style={{ maxHeight: '100px' }}  navbarScroll>
          <Nav.Link href="#action1">Home</Nav.Link>
          <Nav.Link href="#action2">About</Nav.Link>
          <Nav.Link href="#action3">Browse</Nav.Link>
          <NavDropdown title="Generi Letterari" id="navbarScrollingDropdown">
          {["fantasy", "romance", "history", "horror", "scifi"].map((genre) => (
            <NavDropdown.Item key={genre} onClick={() => onGenreSelect(genre)}>
              {genre.charAt(0).toUpperCase() + genre.slice(1)}
            </NavDropdown.Item>
          ))}
          </NavDropdown>
        </Nav>
        <Form className="d-flex">
          <Form.Control type="search" placeholder="Search" className="me-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button onClick={toggleTheme} variant="outline-secondary">
          Tema: {theme === "light" ? "🌞" : "🌙"}
          </Button>
        </Form>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}