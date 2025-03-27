import React, { useState } from "react";
import { ListGroup, Form, Button } from "react-bootstrap";

export default function SingleCommentComponent({ comment, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(comment.comment);
  const [editedRate, setEditedRate] = useState(comment.rate);

  async function handleUpdateClick() {
    await onUpdate({ ...comment, comment: editedText, rate: editedRate });
    setIsEditing(false);
  }

  return (
    <ListGroup.Item>
      {isEditing ? (
        <>
          <Form.Control
            className="mb-2"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <Form.Select
            className="mb-2"
            value={editedRate}
            onChange={(e) => setEditedRate(e.target.value)}
          >
            {[1, 2, 3, 4, 5].map(n => <option key={n}>{n}</option>)}
          </Form.Select>
          <Button size="sm" variant="success" onClick={handleUpdateClick}>Salva</Button>{" "}
          <Button size="sm" variant="secondary" onClick={() => setIsEditing(false)}>Annulla</Button>
        </>
      ) : (
        <>
          <strong>Voto: {comment.rate}</strong> - {comment.comment}
          <Button variant="danger" size="sm" className="float-end ms-2" onClick={() => onDelete(comment._id)}>Elimina</Button>
          <Button variant="warning" size="sm" className="float-end" onClick={() => setIsEditing(true)}>Modifica</Button>
        </>
      )}
    </ListGroup.Item>
  );
}
