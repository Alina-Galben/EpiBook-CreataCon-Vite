import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import fantasy from "../Data/fantasy.json";
import history from "../Data/history.json";
import horror from "../Data/horror.json";
import romance from "../Data/romance.json";
import scifi from "../Data/scifi.json";
import SingleBookComponent from "./SingleBookComponent";

const booksData = [...fantasy, ...history, ...horror, ...romance, ...scifi];
const PAGE_SIZE = 20;

export default function AllTheBookComponent() {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBooks = booksData.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const visibleBooks = filteredBooks.slice(0, visibleCount);

  const mostraAltriLibri = () => {
    setVisibleCount(prevCount => prevCount + PAGE_SIZE);
  };

  return (
    <Container>
      <h1 className="text-center my-4">Tutti i libri</h1>

      {/* Input controllato */}
      <Form className="mb-4">
        <Form.Control
          type="text"
          placeholder="Cerca un libro per titolo..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setVisibleCount(PAGE_SIZE); // resetta la paginazione alla prima pagina quando si cerca
          }}
        />
      </Form>

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
