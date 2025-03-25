import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";

export default function SingleBookComponent({ book }) {
  const [selected, setSelected] = useState(false);

  const handleImageClick = () => {
    setSelected(prevSelected => !prevSelected);
  };

  return (
    <Card className="custom-book-card"
        style={{
          height: "100%",       // riempie tutta l'altezza della colonna
          minHeight: "580px",   // altezza minima per tutte
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
          backgroundColor: "#fff",
          cursor: "pointer",
          transition: "border 0.2s ease",
          border: selected ? "6px solid yellow" : "4px solid transparent",
          boxSizing: "border-box"
        }}
        onClick={handleImageClick}
      />
      <Card.Body className="d-flex flex-column justify-content-between flex-grow-1">
        <Card.Title className="text-center book-title">{book.title}</Card.Title>
        <Card.Text>
          <strong>Categoria:</strong> {book.category} <br />
        </Card.Text>
        <Button variant="primary" className="mt-auto">Scopri di più</Button>
      </Card.Body>
    </Card>
  );
}
