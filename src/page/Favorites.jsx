import { useEffect, useState } from "react";
import booksData from "../Data/combinedBooks";
import { Container, Row, Col, Alert } from "react-bootstrap";
import SingleBookComponent from "../Components/SingleBookComponent";

export default function Favorites() {
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [selectedAsin, setSelectedAsin] = useState(null);

  const refreshFavorites = () => {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    const filtered = booksData.filter((book) => favs.includes(book.asin));
    setFavoriteBooks(filtered);
  };

  useEffect(() => {
    refreshFavorites();
    window.addEventListener("storage", refreshFavorites);
    return () => window.removeEventListener("storage", refreshFavorites);
  }, []);

  return (
    <Container className="py-5">
      <h2 className="mb-4">📚 I tuoi libri preferiti</h2>
      {favoriteBooks.length === 0 ? (
        <Alert variant="info">Non hai ancora aggiunto nessun libro ai preferiti.</Alert>
      ) : (
        <Row>
          {favoriteBooks.map((book) => (
            <Col key={book.asin} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <SingleBookComponent
                book={book}
                isSelected={selectedAsin === book.asin}
                onSelect={() => {
                  setSelectedAsin(book.asin);
                  refreshFavorites();
                }}
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}