import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import fantasy from "../Data/fantasy.json";
import history from "../Data/history.json";
import horror from "../Data/horror.json";
import romance from "../Data/romance.json";
import scifi from "../Data/scifi.json";
import SingleBookComponent from "./SingleBookComponent";
import { useTheme } from "../hooks/useTheme";

const booksData = [...fantasy, ...history, ...horror, ...romance, ...scifi];
const PAGE_SIZE = 20;

export default function AllTheBookComponent({ searchTerm, selectedGenre }) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const { theme } = useTheme();

  let books = booksData
  if (selectedGenre) {
    books = books.filter(book => book.category.toLowerCase() === selectedGenre.toLowerCase())
  }

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const visibleBooks = filteredBooks.slice(0, visibleCount);

  const mostraAltriLibri = () => {
    setVisibleCount(prevCount => prevCount + PAGE_SIZE);
  };

  return (
    <Container>
      <h1 className="text-center my-4">Tutti i libri</h1>

      <Row>
        {visibleBooks.map((book, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={3} xl={3} className="mb-4 d-flex align-items-stretch">
            <div className="w-100 h-100">
                <SingleBookComponent book={book} />
            </div>
          </Col>
        ))}
      </Row>

      {visibleCount < filteredBooks.length && (
        <div className="text-center my-4">
          <Button onClick={mostraAltriLibri}>Carica altri libri</Button>
        </div>
      )}
    </Container>
  );
}
