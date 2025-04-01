import React, { useState, useContext } from "react";
import { Card, Button } from "react-bootstrap";
import CommentAreaComponent from './CommentAreaComponent';
import { ThemeContext } from '../context/ThemeContext';

export default function SingleBookComponent({ book }) {
  const [selected, setSelected] = useState(false);

  const handleCardClick = () => {
    setSelected(prevSelected => !prevSelected);
  };

  const closeCommentArea = (e) => {
    e.stopPropagation();
    setSelected(false);
  };

  const { theme } = useContext(ThemeContext);

  return (
    <div className="position-relative" onClick={handleCardClick} style={{ cursor: "pointer" }}>
      <Card className={`custom-book-card ${theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'}`}
          style={{
            height: "100%",
            minHeight: "580px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}>
        <Card.Img
          variant="top"
          src={book.img}
          style={{
            height: "400px",
            width: "100%",
            objectFit: "cover",
            objectPosition: "top",
            transition: "border 0.2s ease",
            border: selected ? "6px solid yellow" : "4px solid transparent",
            boxSizing: "border-box"
          }}/>
        <Card.Body className="d-flex flex-column justify-content-between flex-grow-1">
          <Card.Title className="text-center book-title">{book.title}</Card.Title>
          <Card.Text>
            <strong>Categoria:</strong> {book.category} <br />
          </Card.Text>
          <Button variant="primary" className="mt-auto">Scopri di più</Button>
        </Card.Body>
      </Card>

      {selected && (
        <div className="position-absolute top-0 start-0 w-100 h-100 comment-overlay"
          style={{backgroundColor: theme === "dark" ? "rgba(0, 0, 0, 0.85)" : "rgba(255,   255, 255, 0.95)", color: theme === "dark" ? "#fff" : "#000",
          zIndex: 10,
          overflowY: "auto",
          border: "2px solid #ffc107",
          padding: "10px"
          }}
          onClick={(e) => e.stopPropagation()}>
          <div className="d-flex justify-content-end mb-2">
            <Button variant="outline-danger" size="sm" onClick={closeCommentArea}>
              Chiudi ✕
            </Button>
          </div>
          <CommentAreaComponent asin={book.asin} />
        </div>
      )}
    </div>
  );
}
