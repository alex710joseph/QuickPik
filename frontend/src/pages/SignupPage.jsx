import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";

export default function SignupPage({ onSignup }) {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  function updateFirstName(val) {
    setForm({
      first_name: val,
      last_name: form.last_name,
      username: form.username,
      password: form.password,
    });
  }

  function updateLastName(val) {
    setForm({
      first_name: form.first_name,
      last_name: val,
      username: form.username,
      password: form.password,
    });
  }

  function updateUsername(val) {
    setForm({
      first_name: form.first_name,
      last_name: form.last_name,
      username: val,
      password: form.password,
    });
  }

  function updatePassword(val) {
    setForm({
      first_name: form.first_name,
      last_name: form.last_name,
      username: form.username,
      password: val,
    });
  }

  async function handleSignup() {
    setError("");
    if (!form.first_name || !form.last_name || !form.username || !form.password)
      return setError("All fields are required");
    if (form.password.length < 4)
      return setError("Password must be at least 4 characters");

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim(),
        username: form.username.trim(),
        password: form.password,
      }),
    });
    const data = await res.json();
    if (!res.ok) return setError(data.error);
    onSignup(data.user);
  }

  return (
    <Container style={{ minHeight: "100vh" }}>
      <Row
        className="justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <Col xs={12} sm={8} md={5} lg={4}>
          <Card className="p-4 shadow-sm">
            <h4 className="mb-4 text-center">Create an Account</h4>
            {error && (
              <Alert variant="danger" className="py-2">
                {error}
              </Alert>
            )}

            <Row className="g-2 mb-3">
              <Col>
                <Form.Label for="first_name" style={{ fontSize: "0.85rem" }}>
                  First Name
                </Form.Label>
                <Form.Control
                  id="first_name"
                  size="sm"
                  value={form.first_name}
                  onChange={(e) => updateFirstName(e.target.value)}
                />
              </Col>
              <Col>
                <Form.Label for="last_name" style={{ fontSize: "0.85rem" }}>
                  Last Name
                </Form.Label>
                <Form.Control
                  id="last_name"
                  size="sm"
                  value={form.last_name}
                  onChange={(e) => updateLastName(e.target.value)}
                />
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label for="username" style={{ fontSize: "0.85rem" }}>
                Username
              </Form.Label>
              <Form.Control
                id="username"
                size="sm"
                value={form.username}
                onChange={(e) => updateUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label for="password" style={{ fontSize: "0.85rem" }}>
                Password
              </Form.Label>
              <Form.Control
                id="password"
                size="sm"
                type="password"
                value={form.password}
                onChange={(e) => updatePassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSignup()}
              />
            </Form.Group>

            <Button
              variant="primary"
              className="w-100 mb-2"
              onClick={handleSignup}
            >
              Sign Up
            </Button>
            <Button
              variant="link"
              className="w-100"
              onClick={() => onSignup(null)}
            >
              Already have an account? Log in
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
