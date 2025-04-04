import React, { useState, useRef } from "react";
import { Container, Row, Col, Button, Card, Collapse } from "react-bootstrap";
import fantasy from "../Data/fantasy.json";
import history from "../Data/history.json";
import horror from "../Data/horror.json";
import romance from "../Data/romance.json";
import scifi from "../Data/scifi.json";
import { useTheme } from "../hooks/useTheme";

const allGenres = {
  fantasy,
  history,
  horror,
  romance,
  scifi,
};

export default function GenreBooksComponent() {
  const [openGenre, setOpenGenre] = useState(null);
  const [expandedGenres, setExpandedGenres] = useState({});
  const genreRefs = useRef({}); // Ref per ogni categoria
  const { theme } = useTheme();

  const handleToggle = (genre) => {
    setOpenGenre(openGenre === genre ? null : genre);
  };

  const handleShowMoreToggle = (genre) => {
    const isExpanding = !expandedGenres[genre];

    setExpandedGenres((prev) => ({
      ...prev,
      [genre]: isExpanding,
    }));

    // Se si sta "chiudendo", scorri su in alto alla categoria
    if (!isExpanding && genreRefs.current[genre]) {
      setTimeout(() => {
        genreRefs.current[genre].scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200); // Aspetta un po' per far chiudere il Collapse prima dello scroll
    }
  };

  return (
    <Container>
      <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
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

      {/* Sezione per ciascuna categoria */}
      {Object.keys(allGenres).map((genre) => {
        const books = allGenres[genre];
        const expanded = expandedGenres[genre];
        const visibleBooks = expanded ? books : books.slice(0, 12);

        return (
          <Collapse in={openGenre === genre} key={genre}>
            <div ref={(el) => (genreRefs.current[genre] = el)}>
              <h2 className="text-center mb-4">
                Libri {genre.charAt(0).toUpperCase() + genre.slice(1)}
              </h2>
              <Row className="justify-content-center">
                {visibleBooks.map((book) => (
                  <Col key={book.asin} xs={12} sm={6} md={4} lg={3} className="mb-4 d-flex">
                    <Card className="w-100 h-100 shadow-sm">
                      <Card.Img variant="top" src={book.img} alt={book.title}
                                style={{ height: "300px", objectFit: "cover" }} />
                      <Card.Body>
                        <Card.Title>{book.title}</Card.Title>
                        <Card.Text>
                          <strong>Prezzo:</strong> ${book.price}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>

              {/* Pulsante Mostra Altro/Meno */}
              {books.length > 12 && (
                <div className="text-center mt-3">
                  <Button variant="outline-secondary"
                          onClick={() => handleShowMoreToggle(genre)} >
                    {expanded ? "Mostra meno" : "Mostra altro"}
                  </Button>
                </div>
              )}
            </div>
          </Collapse>
        );
      })}
    </Container>
  );
}
