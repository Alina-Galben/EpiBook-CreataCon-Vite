import { useState, useEffect } from "react";
import { Spinner, Alert } from "react-bootstrap";
import AddCommentComponent from "./AddCommentComponent";
import CommentsListComponent from "./CommentsListComponent";

const AUTH = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JkZWIyZjFlMTQwNjAwMTUzMTRkMTkiLCJpYXQiOjE3NDI5MjY5MzAsImV4cCI6MTc0NDEzNjUzMH0.kVGXkGAzv8M1ztqd2kA9dfAoLcISD6O-Bysczl6saRY";

export default function CommentAreaComponent({ asin }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!asin) return; // non fare nulla se asin non è selezionato

    async function fetchComments() {
      setLoading(true);
      try {
        const res = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${asin}`, {
          headers: { Authorization: AUTH },
        });

        if (!res.ok) throw new Error(`Errore: ${res.status}`);
        const data = await res.json();
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

  // Se nessun libro è selezionato
  if (!asin) {
    return (
      <Alert variant="info" className="mt-5">
        <h3>✨ Hai già scelto il tuo prossimo libro?</h3>
        <h3> Cliccane uno per leggere i commenti!</h3>
      </Alert>
    );
  }

  return (
    <div className="mt-3 px-3">
      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}

      <AddCommentComponent asin={asin} onAdd={setComments} current={comments} />

      <CommentsListComponent
        comments={comments}
        onDelete={(id) => setComments(prev => prev.filter(c => c._id !== id))}
        onUpdate={(updated) =>
          setComments(prev =>
            prev.map(c => c._id === updated._id ? updated : c)
          )
        }
      />
    </div>
  );
}
