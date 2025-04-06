import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Container className="text-center py-5">
      <h1 className="display-4">😕 Pagina non trovata</h1>
      <p className="lead">La pagina che stai cercando non esiste.</p>
      <Button variant="primary" onClick={() => navigate("/")}>Torna alla Home</Button>
    </Container>
  );
}