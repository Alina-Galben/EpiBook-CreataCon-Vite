import { Button, Container, Form, Nav, Navbar, NavDropdown, Badge } from 'react-bootstrap';
import { useTheme } from "../hooks/useTheme";
import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function MyNavComponent({ searchTerm, setSearchTerm, onGenreSelect }) {
  const { theme, toggleTheme } = useTheme();
  const { cart } = useCart();
  const quantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <Navbar bg={theme === "dark" ? "dark" : "light"} variant={theme} expand="lg" fixed="top">
      <Container>
        <Navbar.Brand as={NavLink} to="/">Epi Books</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-4 my-lg-0" navbarScroll>
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/favorites">Preferiti</Nav.Link>
            <NavDropdown title="Generi Letterari" id="navbarScrollingDropdown">
              {["fantasy", "romance", "history", "horror", "scifi"].map((genre) => (
                <NavDropdown.Item
                  key={genre}
                  onClick={() => {
                    onGenreSelect(genre);
                    navigate("/");
                  }}
                >
                  {genre.charAt(0).toUpperCase() + genre.slice(1)}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
            <Nav.Link as={NavLink} to="/cart">
               <i className="bi bi-cart"></i> Carrello {quantity > 0 && <Badge bg="success">{quantity}</Badge>}
            </Nav.Link>
            {user ? (
              <Nav.Link as={NavLink} to="/account"><i className="bi bi-person-circle"></i> Account</Nav.Link>
            ) : (
              <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
            )}
          </Nav>

          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
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
  );
}