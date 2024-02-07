import React, { useContext, useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import AuthService from "../../services/auth.service";
import { useNavigate } from "react-router";
import UserContext from "../../context/UserContext";
import { setSelectionRange } from "@testing-library/user-event/dist/utils";

const defaultData = {
  email: "",
  password: "",
};
export default function LoginPage() {
  const [formData, setFormData] = useState(defaultData);
  const [errors, setErrors] = useState(defaultData);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  async function onSubmit() {
    try {
      setErrors(defaultData);
      const response = await AuthService.login(formData);
      if (response) {
        setFormData(defaultData);
        setMessage(response.message);
        localStorage.setItem("user", JSON.stringify(response.user));
        localStorage.setItem("token", response.token);
        setUser(response.user);
        navigate("/posts");
      }
    } catch (e) {
      const _errors = e?.response?.data?.errors;
      if (_errors) {
        setErrors({
          email: _errors?.email?.join(" ") || "",
          password: _errors?.password?.join(" ") || "",
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
