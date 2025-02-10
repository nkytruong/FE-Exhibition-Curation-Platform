import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

function CreateCollectionForm() {
  const [collectionName, setCollectionName] = useState("");
  const [error, setError] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!collectionName) {
      setError("Collection name is required");
      return;
    }
    axios
      .post(
        "https://be-exhibition-curation-platform.onrender.com/api/userCollections",
        { collection_name: collectionName },
        { withCredentials: true }
      )
      .then((response) => {
        navigate("/my-account");
      })
      .catch((err) => {
        console.error(
          "Error creating collection:",
          err.response || err.message || err
        );
        setError("Error creating collection");
      });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="collectionName">
        <Form.Label>Collection Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter collection name"
          value={collectionName}
          onChange={function (e) {
            setCollectionName(e.target.value);
          }}
          required
        />
      </Form.Group>
      {error && <p className="text-danger mt-2">{error}</p>}
      <Button variant="primary" type="submit" className="mt-3">
        Create Collection
      </Button>
      <br />
    </Form>
  );
}

export default CreateCollectionForm;
