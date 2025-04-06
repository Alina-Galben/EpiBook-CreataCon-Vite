import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Button, Card, Collapse } from "react-bootstrap";
import fantasy from "../Data/fantasy.json";
import history from "../Data/history.json";
import horror from "../Data/horror.json";
import romance from "../Data/romance.json";
import scifi from "../Data/scifi.json";
import { useTheme } from "../hooks/useTheme";
import { useCart } from "../context/CartContext";

const allGenres = {
  fantasy,
  history,
  horror,
  romance,
  scifi,
};

export default function GenreBooksComponent({ onBookSelect, selectedAsin }) {
  const [openGenre, setOpenGenre] = useState(null);
  const [visibleCounts, setVisibleCounts] = useState({});
  const genreRefs = useRef({});
  const commentRef = useRef(null);
  const { theme } = useTheme();
  const { addToCart } = useCart();

  useEffect(() => {
    if (selectedAsin) {
      if (window.innerWidth < 768 && commentRef.current) {
        commentRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  }, [selectedAsin]);

  const handleToggle = (genre) => {
    setOpenGenre(openGenre === genre ? null : genre);
  };

  const handleShowMoreBooks = (genre) => {
    setVisibleCounts((prev) => ({
      ...prev,
      [genre]: (prev[genre] || 12) + 12,
    }));
  };

  return (
    <Container>
      <div className="d-flex flex-wrap justify-content-center gap-4 mt-2 mb-4">
        {Object.keys(allGenres).map((genre) => (
          <Button
            key={genre}
            variant={openGenre === genre ? "dark" : "outline-dark"}
            onClick={() => handleToggle(genre)}
          >
            {genre.charAt(0).toUpperCase() + genre.slice(1)}
          </Button>
        ))}
      </div>

      {Object.keys(allGenres).map((genre) => {
        const books = allGenres[genre];
        const visible = visibleCounts[genre] || 12;
        const visibleBooks = books.slice(0, visible);

        return (
          <Collapse in={openGenre === genre} key={genre}>
            <div ref={(el) => (genreRefs.current[genre] = el)}>
              <h2 className="text-center mb-4">
                Libri {genre.charAt(0).toUpperCase() + genre.slice(1)}
              </h2>
              <Row className="justify-content-center">
                {visibleBooks.map((book) => (
                  <Col key={book.asin} xs={12} sm={6} md={4} lg={3} className="mb-4 d-flex">
                    <Card
                      className={`w-100 h-100 shadow-sm ${theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"}`}
                      onClick={() => onBookSelect(book.asin)}
                      style={{
                        border: selectedAsin === book.asin ? "4px solid yellow" : "2px solid transparent",
                        cursor: "pointer",
                      }}
                    >
                      <Card.Img
                        variant="top"
                        src={book.img}
                        alt={book.title}
                        style={{ height: "300px", objectFit: "cover" }}
                      />
                      <Card.Body>
                        <Card.Title>{book.title}</Card.Title>
                        <Card.Text><strong>Prezzo:</strong> ${book.price}</Card.Text>
                        <Button variant="outline-primary" size="sm" onClick={(e) => { e.stopPropagation(); addToCart(book); }}>
                        <i className="bi bi-cart"></i>
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>

              {visible < books.length && (
                <div className="text-center mt-3">
                  <Button variant="outline-secondary" onClick={() => handleShowMoreBooks(genre)}>
                    Mostra altri
                  </Button>
                </div>
              )}
              <div ref={commentRef}></div>
            </div>
          </Collapse>
        );
      })}
    </Container>
  );
}