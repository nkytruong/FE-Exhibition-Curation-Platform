import Form from "react-bootstrap/Form";
import { LoginProps } from "../types";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

function CreateAccountPage({
  email,
  setEmail,
  password,
  setPassword,
  error,
  setError,
}: LoginProps) {
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const { setUser } = useAuth();
  const navigate = useNavigate();

  function onCreateAccountButtonPressed(e: React.FormEvent) {
    e.preventDefault();

    if (password === repeatPassword) {
      axios
        .post(
          "https://be-exhibition-curation-platform.onrender.com/api/auth/register",
          {
            email: email,
            first_name: firstName,
            surname: surname,
            password: password,
          },
          { withCredentials: true }
        )
        .then((response) => {
          setUser(response.data.user);
          navigate("/my-account");
        })
        .catch((err) => {
          console.error("Create Account Error:", err);
          const errorMsg =
            err.response?.data.msg ||
            "An error occured while creating account.";
          setError(errorMsg);
        });
    }
  }

  return (
    <div className="page-container">
      <h1>Create Account</h1>
      <div className="input-container">
        {error && <Alert variant="warning">{error}</Alert>}
        <Form onSubmit={onCreateAccountButtonPressed}>
          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Surname</Form.Label>
            <Form.Control
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </Form.Group>
          <br />
          <Button variant="primary" type="submit">
            Create Account
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default CreateAccountPage;
