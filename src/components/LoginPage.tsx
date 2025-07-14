import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";
// import { useState } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { LoginProps } from "../types";
import axios from "axios";

function LoginPage({
  email,
  setEmail,
  password,
  setPassword,
  error,
  setError,
}: LoginProps) {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  function onLogInButtonPressed(e: React.FormEvent) {
    e.preventDefault();

    axios
      .post(
        "https://be-exhibition-curation-platform.onrender.com/api/auth/login",
        { email, password },
        { withCredentials: true }
      )
      .then((_response) => {
        axios
          .get(
            "https://be-exhibition-curation-platform.onrender.com/api/auth/me",
            { withCredentials: true }
          )
          .then((meResponse) => {
            setUser(meResponse.data.user);
            navigate("/");
          })
          .catch((err) => {
            console.error("Error fetching user after login:", err);
          });
      })
      .catch((err) => {
        console.error("Login error:", err);
        const errorMsg =
          err.response?.data?.msg || "An error occurred during login.";
        setError(errorMsg);
      });
  }

  return (
    <div className="page-container">
      <h1>Login</h1>
      <div className="input-container">
        {error && <Alert variant="warning">{error}</Alert>}
        <Form onSubmit={onLogInButtonPressed}>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              id="inputPassword5"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <br />
          <Button variant="primary" type="submit">
            Log in
          </Button>
        </Form>
        <br />
        <p>
          Don't have an account? Sign up <Link to="/register">here</Link>{" "}
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
