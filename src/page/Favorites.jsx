import React, { useEffect, useState } from "react";
import booksData from "../Data/combinedBooks";
import { Container, Row, Col, Alert } from "react-bootstrap";
import SingleBookComponent from "../Components/SingleBookComponent";

export default function Favorites() {
  const [favoriteBooks, setFavoriteBooks] = useState([]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    const books = booksData.filter((book) => favs.includes(book.asin));
    setFavoriteBooks(books);
  }, []);

  const handleUnfavorite = (asin) => {
    const updatedFavorites = favoriteBooks.filter((book) => book.asin !== asin);
    const favs = updatedFavorites.map((book) => book.asin);
    localStorage.setItem("favorites", JSON.stringify(favs));
    setFavoriteBooks(updatedFavorites);
  };

  if (favoriteBooks.length === 0) {
    return (
      <Container className="py-5">
        <Alert variant="info">Non hai ancora libri nei preferiti.</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row>
        {favoriteBooks.map((book) => (
          <Col key={book.asin} xs={12} sm={6} md={4} lg={3} className="mb-4 d-flex">
            <SingleBookComponent
              book={book}
              isSelected={false}
              onSelect={() => {}}
              onUnfavorite={handleUnfavorite} // callback per rimuovere subito
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}