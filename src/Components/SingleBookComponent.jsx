import { Card } from "react-bootstrap";
import { useTheme } from "../hooks/useTheme";

export default function SingleBookComponent({ book, isSelected, onSelect }) {
  const { theme } = useTheme();

  return (
    <div onClick={onSelect} style={{ cursor: "pointer", width: "100%" }}>
      <Card
        className={`custom-book-card ${theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'}`}
        style={{ border: isSelected ? "4px solid yellow" : "2px solid transparent" }}
      >
        <Card.Img
          variant="top"
          src={book.img}
          style={{ height: "300px", objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title className="text-center">{book.title}</Card.Title>
          <Card.Text><strong>Categoria:</strong> {book.category}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
