import { Container, Row, Col, Button } from "react-bootstrap";
import SingleBookComponent from "./SingleBookComponent";
import { useEffect, useState, useRef } from "react";
import { useCart } from "../context/CartContext";

export default function AllTheBookComponent({ books, selectedAsin, onBookSelect }) {
  const [visibleCount, setVisibleCount] = useState(12);
  const commentAreaRef = useRef(null);
  const { addToCart } = useCart();

  useEffect(() => {
    if (selectedAsin) {
      if (window.innerWidth < 768 && commentAreaRef.current) {
        commentAreaRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  }, [selectedAsin]);

  const visibleBooks = books.slice(0, visibleCount);

  return (
    <Container fluid>
      <Row>
        {visibleBooks.map((book) => (
          <Col key={book.asin} xs={12} sm={6} md={4} lg={3} className="mb-4 d-flex">
            <div className="w-100">
              <SingleBookComponent
                book={book}
                isSelected={selectedAsin === book.asin}
                onSelect={() => onBookSelect(book.asin)}
              />
              <div className="d-flex justify-content-center gap-2 mt-2">
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => addToCart(book)}
                >
                  <i className="bi bi-cart"></i> Aggiungi al carrello
                </Button>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      {visibleCount < books.length && (
        <div className="text-center mb-4">
          <Button onClick={() => setVisibleCount((prev) => prev + 12)}>
            Mostra altri
          </Button>
        </div>
      )}

      <div ref={commentAreaRef}></div>
    </Container>
  );
}