import React, { useEffect, useState } from "react";
import { Spinner, Alert } from "react-bootstrap";
import AddCommentComponent from "./AddCommentComponent";
import CommentsListComponent from "./CommentsListComponent";

const AUTH = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JkZWIyZjFlMTQwNjAwMTUzMTRkMTkiLCJpYXQiOjE3NDI5MjY5MzAsImV4cCI6MTc0NDEzNjUzMH0.kVGXkGAzv8M1ztqd2kA9dfAoLcISD6O-Bysczl6saRY";


export default function CommentAreaComponent({ asin }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("ASIN attuale:", asin);

    async function fetchComments() {
      setLoading(true);
      try {
        const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${asin}`, {
          headers: { Authorization: AUTH },
        });
        if (!response.ok) throw new Error("Errore nel recupero dei commenti");
        const data = await response.json();
        console.log("Commenti ricevuti:", data);
        setComments(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchComments();
  }, [asin]);

  async function handleDelete(commentId) {
    try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${commentId}`, {
        method: "DELETE",
        headers: { Authorization: AUTH },
      });
      if (response.ok) {
        setComments(comments.filter((c) => c._id !== commentId));
      }
    } catch (err) {
      alert("Errore nella cancellazione");
    }
  }

  async function handleUpdate(updatedComment) {
    try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${updatedComment._id}`, {
        method: "PUT",
        headers: {
          Authorization: AUTH,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedComment),
      });
      if (response.ok) {
        const updated = await response.json();
        setComments(comments.map(c => c._id === updated._id ? updated : c));
      }
    } catch (err) {
      alert("Errore nell'aggiornamento");
    }
  }

  return (
    <div className="mt-3">
      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}
      <AddCommentComponent asin={asin} onAdd={setComments} current={comments} />
      <CommentsListComponent comments={comments} onDelete={handleDelete} onUpdate={handleUpdate} />
    </div>
  );
}
