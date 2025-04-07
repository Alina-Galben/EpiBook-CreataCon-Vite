import React from "react";
import { ListGroup } from "react-bootstrap";
import SingleCommentComponent from "./SingleCommentComponent";

export default function CommentsListComponent({ comments, onDelete, onUpdate }) {
  return (
    <ListGroup data-testid="comments-list-component">
      {comments.map(c => (
        <SingleCommentComponent key={c._id} comment={c} onDelete={onDelete} onUpdate={onUpdate} />
      ))}
    </ListGroup>
  );
}
