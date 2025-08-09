import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const AUTH = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JkZWIyZjFlMTQwNjAwMTUzMTRkMTkiLCJpYXQiOjE3NDI5MjY5MzAsImV4cCI6MTc0NDEzNjUzMH0.kVGXkGAzv8M1ztqd2kA9dfAoLcISD6O-Bysczl6saRY";

export default function AddCommentComponent({ asin, onAdd, current }) {
  const [text, setText] = useState("");
  const [rate, setRate] = useState("1");

  async function sendComment() {
    
    try {
      const response = await fetch("https://striveschool-api.herokuapp.com/api/comments", {
        method: "POST",
        headers: {
          Authorization: AUTH,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment: text, rate, elementId: asin }),
      });
      if (response.ok) {
        const newComment = await response.json();
        onAdd([...(current || []), newComment]);
        setText("");
        setRate("1");
      } else if (response.status === 401) {
        alert("Sessione scaduta. Effettua di nuovo il login.");
      }
    } catch (err) {
      alert("Errore durante l'invio");
    }
  }

  return (
    <Form className="mb-3" data-testid="add-comment-component">
      <Form.Group>
        <Form.Label>Commento</Form.Label>
        <Form.Control value={text} onChange={(e) => setText(e.target.value)} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Voto</Form.Label>
        <Form.Select value={rate} onChange={(e) => setRate(e.target.value)}>
          {[1, 2, 3, 4, 5].map(n => <option key={n}>{n}</option>)}
        </Form.Select>
      </Form.Group>
      <Button onClick={sendComment} className="mt-2">Invia</Button>
    </Form>
  );
}
