import React, { useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import AuthService from "../../services/auth.service";
import { useNavigate } from "react-router";

const defaultData = {
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
};
export default function RegisterPage() {
  const [formData, setFormData] = useState(defaultData);
  const [errors, setErrors] = useState(defaultData);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  async function onSubmit() {
    try {
      setErrors(defaultData);
      const response = await AuthService.register(formData);
      if (response) {
        setFormData(defaultData);
        setMessage(response.message);
        navigate("/login");
      }
    } catch (e) {
      const _errors = e?.response?.data?.errors;
      if (_errors) {
        setErrors({
          name: _errors?.name?.join(" ") || "",
          email: _errors?.email?.join(" ") || "",
          password: _errors?.password?.join(" ") || "",
          password_confirmation:
            _errors?.password_confirmation?.join(" ") || "",
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
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          {errors.name && (
            <Alert
              variant="danger"
              style={{ background: "transparent", border: 0 }}
            >
              {errors.name}
            </Alert>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          {errors.email && (
            <Alert
              variant="danger"
              style={{ background: "transparent", border: 0 }}
            >
              {errors.email}
            </Alert>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          {errors.password && (
            <Alert
              variant="danger"
              style={{ background: "transparent", border: 0 }}
            >
              {errors.password}
            </Alert>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={formData.password_confirmation}
            onChange={(e) =>
              setFormData({
                ...formData,
                password_confirmation: e.target.value,
              })
            }
          />
          {errors.password_confirmation && (
            <Alert
              variant="danger"
              style={{ background: "transparent", border: 0 }}
            >
              {errors.password_confirmation}
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
          Login
        </Button>
      </Form>
    </Container>
  );
}
