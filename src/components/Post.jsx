import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Post({ id, title, body, created_at, image }) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{body}</Card.Text>
        <Link to={`/posts/${id}`} variant="primary">
          View
        </Link>
      </Card.Body>
    </Card>
  );
}
