import { Container, Alert, Row, Col } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import booksData from "../Data/combinedBooks";
import SingleBookComponent from "../Components/SingleBookComponent";
import { useState, useEffect } from "react";

export default function AccountPage() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [selectedAsin, setSelectedAsin] = useState(null);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    const favoriteBooks = booksData.filter((book) => favs.includes(book.asin));
    setFavorites(favoriteBooks);
  }, []);

  const handleFavoriteToggle = (asin) => {
    const updated = favorites.filter((book) => book.asin !== asin);
    setFavorites(updated);
    const currentFavs = JSON.parse(localStorage.getItem("favorites")) || [];
    localStorage.setItem("favorites", JSON.stringify(currentFavs.filter(id => id !== asin)));
  };

  if (!user) {
    return (
      <Container className="py-5">
        <Alert variant="warning">Effettua il login per accedere al tuo account.</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h2 className="mb-4">Benvenuto, {user.email}</h2>
      <p>Qui potrai vedere i tuoi libri preferiti e i commenti lasciati.</p>

      {favorites.length === 0 ? (
        <Alert variant="info" className="mt-4">Non hai ancora libri tra i preferiti.</Alert>
      ) : (
        <Row className="mt-4">
          {favorites.map((book) => (
            <Col key={book.asin} xs={12} sm={6} md={4} lg={3} className="mb-4 d-flex">
              <SingleBookComponent
                book={book}
                isSelected={selectedAsin === book.asin}
                onSelect={setSelectedAsin}
                onFavoriteToggle={handleFavoriteToggle}
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}