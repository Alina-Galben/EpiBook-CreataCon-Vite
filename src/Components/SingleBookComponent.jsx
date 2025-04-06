import { Card, Button } from "react-bootstrap";
import { useTheme } from "../hooks/useTheme";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function SingleBookComponent({ book, isSelected, onSelect }) {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favs.includes(book.asin));
  }, [book.asin]);

  const toggleFavorite = () => {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    let updated;
    if (favs.includes(book.asin)) {
      updated = favs.filter((id) => id !== book.asin);
    } else {
      updated = [...favs, book.asin];
    }
    localStorage.setItem("favorites", JSON.stringify(updated));
    setIsFavorite(!isFavorite);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-100"
    >
      <Card
        className={`custom-book-card ${theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'}`}
        style={{ border: isSelected ? "4px solid yellow" : "2px solid transparent" }}
      >
        <Card.Img
          variant="top"
          src={book.img}
          style={{ height: "300px", objectFit: "cover" }}
        />
        <Card.Body className="d-flex flex-column justify-content-between">
          <div>
            <Card.Title className="text-center">{book.title}</Card.Title>
            <Card.Text><strong>Categoria:</strong> {book.category}</Card.Text>
          </div>
          <div className="d-flex justify-content-between mt-3">
            <Button variant="info" size="sm" onClick={() => navigate(`/book/${book.asin}`)}>
              Info
            </Button>
            <Button variant="warning" size="sm" onClick={() => onSelect(book.asin)}>
              Commenti
            </Button>
            <Button
              variant={isFavorite ? "success" : "outline-secondary"}
              size="sm"
              onClick={toggleFavorite}
              title={isFavorite ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
            >
              {isFavorite ? "★" : "☆"}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  );
}