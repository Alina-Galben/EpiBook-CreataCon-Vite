import { Container, Row, Col, Button } from "react-bootstrap";
import SingleBookComponent from "./SingleBookComponent";
import { useEffect, useState, useRef } from "react";

export default function AllTheBookComponent({ books, selectedAsin, onBookSelect }) {
  const [visibleCount, setVisibleCount] = useState(12);
  const commentAreaRef = useRef(null); // riferimento alla sezione commenti

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
            <SingleBookComponent
              book={book}
              isSelected={selectedAsin === book.asin}
              onSelect={() => onBookSelect(book.asin)}
            />
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

      {/* REF alla comment area per scroll */}
      <div ref={commentAreaRef}></div>
    </Container>
  );
}
