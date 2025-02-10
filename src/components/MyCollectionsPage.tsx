// MyCollectionsPage.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import { useAuth } from "../AuthContext";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { Collection } from "../types";
import CreateCollectionForm from "./CreateCollectionForm";

function MyCollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { user } = useAuth();

  function fetchCollections() {
    axios
      .get(
        "https://be-exhibition-curation-platform.onrender.com/api/userCollections",
        { withCredentials: true }
      )
      .then((response) => {
        console.log("Fetched collections:", response.data.collections);
        setCollections(response.data.collections);
        setLoading(false);
      })
      .catch((err) => {
        console.error(
          "Error fetching collections:",
          err.response || err.message || err
        );
        setError("Error fetching collections");
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchCollections();
  }, []);

  function toggleCreateForm() {
    setShowCreateForm((prev) => {
      return !prev;
    });
  }

  function onDeleteButtonPressed(collectionId: string) {
    axios
      .delete(
        "https://be-exhibition-curation-platform.onrender.com/api/userCollections/" +
          collectionId,
        { withCredentials: true }
      )
      .then((response) => {
        fetchCollections();
      })
      .catch((err) => {
        console.error(
          "Error deleting collection:",
          err.response || err.message || err
        );
        setError("Error deleting collection");
      });
  }

  if (loading) {
    return <CircularProgress color="secondary" />;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">My Exhibitions</h2>
        <Button variant="primary" onClick={toggleCreateForm}>
          {showCreateForm ? "Cancel" : "Create New Collection"}
        </Button>
      </div>
      {showCreateForm && (
        <div className="mb-4">
          <CreateCollectionForm />
        </div>
      )}
      {collections.map((collection) => {
        return (
          <Card key={collection.collection_id} className="mb-3">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <Card.Title className="mb-0">
                  {collection.collection_name || "No Name Provided"}
                </Card.Title>
                <div className="d-flex flex-column align-items-end">
                  <Link to={`/collections/${collection.collection_id}`}>
                    <Button
                      variant="primary"
                      className="mb-2"
                      style={{ width: "150px" }}
                    >
                      View Collection
                    </Button>
                  </Link>
                  <Button
                    variant="secondary"
                    onClick={function () {
                      onDeleteButtonPressed(collection.collection_id);
                    }}
                    style={{ width: "150px" }}
                  >
                    Delete Collection
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
}

export default MyCollectionsPage;
