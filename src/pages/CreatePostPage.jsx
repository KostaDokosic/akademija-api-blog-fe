import React, { useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import PostService from "../services/posts.service";

const defaultData = { title: "", body: "", image: "" };
export default function CreatePostPage() {
  const [formData, setFormData] = useState(defaultData);
  const [errors, setErrors] = useState(defaultData);
  const [message, setMessage] = useState("");

  async function onSubmit() {
    try {
      setErrors(defaultData);
      const response = await PostService.create(formData);
      if (response) {
        setFormData(defaultData);
        setMessage("Post Created Successfully");
      }
    } catch (e) {
      const _errors = e?.response?.data?.errors;
      if (_errors) {
        setErrors({
          title: _errors?.title?.join(" ") || "",
          body: _errors?.body?.join(" ") || "",
          image: _errors?.image?.join(" ") || "",
        });
      }
    }
  }

  return (
    <Container
      style={{
        backgroundColor: "#d8d8d8d1",
        padding: "1rem",
        marginTop: "10rem",
      }}
    >
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter post title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          {errors.title && (
            <Alert
              variant="danger"
              style={{ background: "transparent", border: 0 }}
            >
              {errors.title}
            </Alert>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Body</Form.Label>
          <Form.Control
            type="text"
            placeholder="Post Body"
            as="textarea"
            value={formData.body}
            onChange={(e) => setFormData({ ...formData, body: e.target.value })}
          />
          {errors.body && (
            <Alert
              variant="danger"
              style={{ background: "transparent", border: 0 }}
            >
              {errors.body}
            </Alert>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="text"
            placeholder="Image url"
            value={formData.image}
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.value })
            }
          />
          {errors.image && (
            <Alert
              variant="danger"
              style={{ background: "transparent", border: 0 }}
            >
              {errors.image}
            </Alert>
          )}
        </Form.Group>

        {message && (
          <Alert
            variant="success"
            style={{ background: "transparent", border: 0 }}
          >
            {message}
          </Alert>
        )}

        <Button variant="primary" type="button" onClick={onSubmit}>
          Create Post
        </Button>
      </Form>
    </Container>
  );
}
