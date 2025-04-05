import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import GenreBooksComponent from "./GenreBooksComponent";
import AllTheBookComponent from "./AllTheBookComponent";
import CommentAreaComponent from "./CommentAreaComponent";
import booksData from "../Data/combinedBooks"; // creato file centralizzato

export default function BooksLayout({ searchTerm, selectedGenre }) {
  const [selectedAsin, setSelectedAsin] = useState(null);

  const filteredBooks = booksData.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = !selectedGenre || book.category.toLowerCase() === selectedGenre.toLowerCase();
    return matchesSearch && matchesGenre;
  });

  return (
    <Container fluid className="px-3">
      <Row>
        <Col xs={12} md={9} className="mb-4">
          <GenreBooksComponent
            onBookSelect={setSelectedAsin}
            selectedAsin={selectedAsin}
          />
          <AllTheBookComponent
            books={filteredBooks}
            selectedAsin={selectedAsin}
            onBookSelect={setSelectedAsin}
          />
        </Col>
        
        <Col xs={12} md={3} className="mt-5" >
          <CommentAreaComponent asin={selectedAsin} />
        </Col>
      </Row>
    </Container>
  );
}
