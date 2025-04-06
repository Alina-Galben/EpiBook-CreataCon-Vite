import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import booksData from "../Data/combinedBooks";
import { Container, Row, Col, Card, Alert, Spinner, Button } from "react-bootstrap";
import CommentAreaComponent from "../Components/CommentAreaComponent";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";

export default function BookDetails() {
  const { asin } = useParams();
  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const timeout = setTimeout(() => {
      const foundBook = booksData.find((b) => b.asin === asin);
      setBook(foundBook);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, [asin]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favs.includes(asin));
  }, [asin]);

  const toggleFavorite = () => {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    let updated;
    if (favs.includes(asin)) {
      updated = favs.filter((id) => id !== asin);
    } else {
      updated = [...favs, asin];
    }
    localStorage.setItem("favorites", JSON.stringify(updated));
    setIsFavorite(!isFavorite);
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Caricamento dettagli libro...</p>
      </Container>
    );
  }

  if (!book) {
    return (
      <Container className="py-5">
        <Alert variant="danger">Libro non trovato!</Alert>
      </Container>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Container className="py-5">
        <Row>
          <Col md={4} xs={12} className="mb-4">
            <Card>
              <Card.Img variant="top" src={book.img} alt={book.title} />
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Text>
                  <strong>Categoria:</strong> {book.category}
                  <br />
                  <strong>Prezzo:</strong> ${book.price}
                </Card.Text>
                <div className="d-flex flex-column gap-2">
                  <Button
                    variant={isFavorite ? "success" : "outline-secondary"}
                    onClick={toggleFavorite}
                  >
                    {isFavorite ? "★ Rimuovi dai preferiti" : "☆ Aggiungi ai preferiti"}
                  </Button>
                  <Button variant="outline-primary" onClick={() => addToCart(book)}>
                  <i className="bi bi-cart"></i> Aggiungi al carrello
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={8} xs={12}>
            <h3 className="mb-3">Recensioni</h3>
            <CommentAreaComponent asin={asin} />
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
}